import { storage, storageRef, uploadBytesResumable, getDownloadURL, deleteObject, db, doc, setDoc, auth, serverTimestamp } from '../firebase';

export interface UploadResult {
  downloadUrl: string;
  storagePath: string;
  isLocalFallback: boolean;
  error?: string;
}

/**
 * Uploads a file (image or video) to Firebase Storage under the workspace or user path.
 * Tracks upload progress and stores a metadata document in Cloud Firestore `/media/{id}`.
 */
export async function uploadMediaToStorage(
  file: File,
  workspaceId: string,
  userId: string,
  onProgress?: (progressPercent: number) => void
): Promise<UploadResult> {
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueId = `media-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const storagePath = `workspaces/${workspaceId || 'default'}/media/${Date.now()}_${sanitizedName}`;

  // If user is not authenticated or in demo mode, use local blob URL
  if (!auth.currentUser) {
    const localUrl = URL.createObjectURL(file);
    if (onProgress) onProgress(100);
    return {
      downloadUrl: localUrl,
      storagePath,
      isLocalFallback: true,
    };
  }

  try {
    const fileRef = storageRef(storage, storagePath);
    const uploadTask = uploadBytesResumable(fileRef, file, {
      contentType: file.type || 'application/octet-stream',
      customMetadata: {
        originalName: file.name,
        workspaceId,
        uploadedBy: userId,
      },
    });

    return new Promise((resolve) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0 && onProgress) {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            onProgress(percent);
          }
        },
        (error) => {
          console.warn('Firebase Storage upload error, using local fallback preview:', error);
          const fallbackUrl = URL.createObjectURL(file);
          if (onProgress) onProgress(100);
          resolve({
            downloadUrl: fallbackUrl,
            storagePath,
            isLocalFallback: true,
            error: error.message,
          });
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            if (onProgress) onProgress(100);

            // Persist media metadata in Firestore
            try {
              await setDoc(doc(db, 'media', uniqueId), {
                id: uniqueId,
                name: file.name,
                size: file.size,
                type: file.type,
                url: downloadUrl,
                storagePath,
                workspaceId,
                userId,
                createdAt: new Date().toISOString(),
              });
            } catch (fsErr) {
              console.warn('Firestore media metadata record notice:', fsErr);
            }

            resolve({
              downloadUrl,
              storagePath,
              isLocalFallback: false,
            });
          } catch (urlErr) {
            console.warn('Error fetching download URL:', urlErr);
            const fallbackUrl = URL.createObjectURL(file);
            resolve({
              downloadUrl: fallbackUrl,
              storagePath,
              isLocalFallback: true,
            });
          }
        }
      );
    });
  } catch (err: unknown) {
    console.warn('Storage initiation failed, using local object URL fallback:', err);
    return {
      downloadUrl: URL.createObjectURL(file),
      storagePath,
      isLocalFallback: true,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
