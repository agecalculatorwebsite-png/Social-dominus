import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import { validatePostContent } from '../../logic/pricing';
import { isMediaVideo, formatFileSize, validatePlatformMedia } from '../../logic/preview';
import { SocialPostPreview } from '../../components/publishing/SocialPostPreview';
import {
  PenSquare,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Film,
  Clock,
  Send,
  CheckCircle2,
  CheckSquare,
  Hash,
  X,
  AlertTriangle,
  FileText,
  Plus,
} from 'lucide-react';

interface ComposerViewProps {
  navigate: (path: string) => void;
}

export interface AttachedMediaItem {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
  isVideo: boolean;
  file?: File;
}

export const ComposerView: React.FC<ComposerViewProps> = ({ navigate }) => {
  const { createPost, userProfile } = useAppStore();

  const [selectedChannels, setSelectedChannels] = useState<string[]>(['twitter', 'linkedin']);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Educational');
  const [scheduledDate, setScheduledDate] = useState('2026-10-21T14:30');
  const [activePreviewPlatform, setActivePreviewPlatform] = useState<string>('twitter');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Real OS File Upload & Media Management State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedMedia, setAttachedMedia] = useState<AttachedMediaItem[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      attachedMedia.forEach((m) => {
        if (m.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(m.previewUrl);
        }
      });
    };
  }, []);

  const toggleChannel = (plat: string) => {
    setSelectedChannels((prev) => {
      const next = prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat];
      if (next.length > 0 && !next.includes(activePreviewPlatform)) {
        setActivePreviewPlatform(next[0]);
      }
      return next;
    });
  };

  const activeLimit = PLATFORM_CONFIG[activePreviewPlatform]?.maxChars || 280;
  const currentChars = content.length;
  const isOverLimit = currentChars > activeLimit;

  // Process selected files from OS file picker or drag-drop
  const processIncomingFiles = (files: File[]) => {
    setMediaError(null);
    const newItems: AttachedMediaItem[] = [];
    const unsupported: string[] = [];

    for (const file of files) {
      const isVid = isMediaVideo(file.type || file.name);
      const isImg = file.type.startsWith('image/');

      if (!isVid && !isImg) {
        unsupported.push(file.name);
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      newItems.push({
        id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type || (isVid ? 'video/mp4' : 'image/jpeg'),
        previewUrl,
        isVideo: isVid,
        file,
      });
    }

    if (unsupported.length > 0) {
      setMediaError(
        `Unsupported format for: ${unsupported.join(', ')}. Please select JPG, PNG, WebP, GIF, MP4, MOV, or WebM.`
      );
    }

    if (newItems.length > 0) {
      setAttachedMedia((prev) => {
        const merged = [...prev, ...newItems];
        // Validate merged media items against platform constraints
        const validation = validatePlatformMedia(
          merged.map((m) => ({ type: m.type, size: m.size })),
          activePreviewPlatform
        );
        if (!validation.isValid && validation.error) {
          setMediaError(validation.error);
        }
        setMediaUrls(merged.map((m) => m.previewUrl));
        return merged;
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processIncomingFiles(Array.from(e.target.files));
    }
    // Reset input so user can pick the same file again if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveMediaItem = (index: number) => {
    setAttachedMedia((prev) => {
      const item = prev[index];
      if (item && item.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(item.previewUrl);
      }
      const next = prev.filter((_, i) => i !== index);
      setMediaUrls(next.map((m) => m.previewUrl));

      const validation = validatePlatformMedia(
        next.map((m) => ({ type: m.type, size: m.size })),
        activePreviewPlatform
      );
      if (!validation.isValid && validation.error) {
        setMediaError(validation.error);
      } else {
        setMediaError(null);
      }
      return next;
    });
  };

  const handleClearAllMedia = () => {
    attachedMedia.forEach((m) => {
      if (m.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(m.previewUrl);
      }
    });
    setAttachedMedia([]);
    setMediaUrls([]);
    setMediaError(null);
  };

  const handleAddSamplePreset = (presetType: 'image' | 'video') => {
    setMediaError(null);
    if (presetType === 'image') {
      const sampleItem: AttachedMediaItem = {
        id: `sample-img-${Date.now()}`,
        name: 'social-growth-blueprint.jpg',
        size: 1420000,
        type: 'image/jpeg',
        previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        isVideo: false,
      };
      setAttachedMedia((prev) => {
        const next = [...prev, sampleItem];
        setMediaUrls(next.map((m) => m.previewUrl));
        return next;
      });
    } else {
      const sampleVideo: AttachedMediaItem = {
        id: `sample-vid-${Date.now()}`,
        name: 'product-demo-walkthrough.mp4',
        size: 7800000,
        type: 'video/mp4',
        previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        isVideo: true,
      };
      setAttachedMedia((prev) => {
        const next = [...prev, sampleVideo];
        setMediaUrls(next.map((m) => m.previewUrl));
        return next;
      });
    }
  };

  const handleAction = async (actionType: 'publish_now' | 'schedule' | 'queue' | 'draft' | 'submit_approval') => {
    const validation = validatePostContent(content, selectedChannels);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    setValidationErrors({});

    let postStatus: 'published' | 'scheduled' | 'draft' | 'needs_review' = 'scheduled';
    if (actionType === 'publish_now') postStatus = 'published';
    else if (actionType === 'draft') postStatus = 'draft';
    else if (actionType === 'submit_approval') postStatus = 'needs_review';
    else if (actionType === 'queue') postStatus = 'scheduled';

    await createPost({
      authorId: userProfile.uid,
      authorName: userProfile.displayName,
      content,
      channels: selectedChannels,
      status: postStatus,
      category,
      scheduledAt: actionType === 'draft' ? undefined : new Date(scheduledDate).toISOString(),
      mediaUrls,
      aiGenerated: false,
    });

    setStatusMessage({
      type: 'success',
      text:
        actionType === 'publish_now'
          ? 'Post published in Demo Mode — Real social dispatch simulated successfully!'
          : actionType === 'submit_approval'
          ? 'Submitted for manager review in Approvals queue.'
          : actionType === 'draft'
          ? 'Draft saved to workspace repository.'
          : 'Post scheduled successfully in calendar queue.',
    });

    setTimeout(() => {
      navigate('/app/planner');
    }, 1200);
  };

  const insertHashtag = (tag: string) => {
    setContent((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <PenSquare className="w-6 h-6 text-violet-500" />
            Multi-Platform Composer
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Author once, attach multiple media files, and preview across Twitter, LinkedIn, Instagram and 15 networks simultaneously.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/ai-studio')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open AI Studio</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Split Grid: Left Editor | Right Social Media Post Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor (7 columns) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Channel selector */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                1. Select Destination Channels ({selectedChannels.length} selected)
              </span>
              <span className="text-[11px] text-slate-400">Click to toggle channels</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
                const Icon = config.icon;
                const isSelected = selectedChannels.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleChannel(key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      isSelected
                        ? 'border-violet-500 bg-violet-600 text-white shadow-xs ring-1 ring-violet-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{config.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
            {validationErrors.platforms && (
              <p className="text-xs text-rose-500 font-semibold">{validationErrors.platforms}</p>
            )}
          </div>

          {/* Post Content Input Area */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">2. Author Post Content</span>
              <span
                className={`font-mono text-xs font-bold ${
                  isOverLimit ? 'text-rose-500' : 'text-slate-400'
                }`}
              >
                {currentChars} / {activeLimit} chars ({PLATFORM_CONFIG[activePreviewPlatform]?.name})
              </span>
            </div>

            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening? Share insights, thread announcements, or campaign launches... Try adding a link (e.g. https://techcrunch.com) or hashtag (#SocialDominus) to see live formatting!"
              className="w-full p-3.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 leading-relaxed transition-all"
            />

            {/* Quick Hashtag helper chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs text-slate-400">
              <span className="text-[11px] font-medium flex items-center gap-0.5 text-slate-500">
                <Hash className="w-3 h-3" /> Quick Tags:
              </span>
              {['#SocialDominus', '#Growth', '#SaaS', '#B2B', '#Productivity', '#AI'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => insertHashtag(tag)}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {validationErrors.general && (
              <p className="text-xs text-rose-500 font-semibold">{validationErrors.general}</p>
            )}
            {selectedChannels.map((p) => {
              if (validationErrors[p]) {
                return (
                  <p key={p} className="text-xs text-rose-500 font-semibold">
                    {validationErrors[p]}
                  </p>
                );
              }
              return null;
            })}

            {/* Category picker row */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">Content Category:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
              >
                <option>Educational</option>
                <option>Promotional</option>
                <option>Behind the Scenes</option>
                <option>Product Updates</option>
                <option>Community</option>
                <option>Evergreen</option>
              </select>
            </div>
          </div>

          {/* ============================================================== */}
          {/* STEP 3: FUNCTIONAL OPERATING SYSTEM FILE PICKER & MEDIA TRAY */}
          {/* ============================================================== */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            {/* Hidden native HTML file input targeting OS file picker */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm"
              className="hidden"
              onChange={handleFileInputChange}
            />

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  3. Media Attachments ({attachedMedia.length} attached)
                </span>
                <span className="text-[11px] text-slate-400">
                  Select multiple images (JPG, PNG, WebP) or video (MP4, MOV, WebM) from your computer.
                </span>
              </div>

              {attachedMedia.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllMedia}
                  className="text-xs text-rose-500 hover:text-rose-600 font-semibold underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Drag & Drop Surface with OS File Picker Trigger Button */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  processIncomingFiles(Array.from(e.dataTransfer.files));
                }
              }}
              className={`p-4 sm:p-5 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2.5 ${
                isDragging
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Choose Files from Computer</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleAddSamplePreset('image')}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium transition-colors"
                      title="Add sample photo"
                    >
                      + Sample Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddSamplePreset('video')}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium transition-colors"
                      title="Add sample video"
                    >
                      + Sample Video
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Or drag and drop files here • Images up to 25MB, Videos up to 100MB
                </p>
              </div>
            </div>

            {/* Validation / error banner if any */}
            {mediaError && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{mediaError}</span>
              </div>
            )}

            {/* Media Items Tray with Thumbnail Previews and Individual Deletion */}
            {attachedMedia.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Attached Files Queue:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {attachedMedia.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center gap-2.5 group relative"
                    >
                      {/* Media Thumbnail */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0 relative flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        {item.isVideo ? (
                          <>
                            <video
                              src={item.previewUrl}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                              <Film className="w-4 h-4 text-violet-400" />
                            </div>
                          </>
                        ) : (
                          <img
                            src={item.previewUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* File Details */}
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                          <span className="font-mono font-medium">{formatFileSize(item.size)}</span>
                          <span>•</span>
                          <span className="uppercase font-semibold text-violet-600 dark:text-violet-400">
                            {item.isVideo ? 'Video' : 'Image'}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveMediaItem(index)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0"
                        title="Remove file"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scheduling controls & publishing dispatch buttons */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">4. Scheduling Date & Time</span>
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleAction('publish_now')}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Now</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('schedule')}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-violet-600 hover:bg-violet-500 text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Schedule Post</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('submit_approval')}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-500 text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Submit Approval</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('draft')}
                className="py-2.5 px-3 rounded-xl font-semibold text-xs border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>

        {/* Live Social Media Post Preview Column (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <SocialPostPreview
            content={content}
            mediaUrls={mediaUrls}
            authorName={userProfile.displayName || 'Alex Morgan'}
            authorHandle={`@${(userProfile.displayName || 'socialdominus').toLowerCase().replace(/[^a-z0-9_]/g, '') || 'dominus'}`}
            authorAvatar={
              userProfile.photoURL ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
            }
            activePlatform={activePreviewPlatform}
            onSelectPlatform={(plat) => setActivePreviewPlatform(plat)}
            availablePlatforms={selectedChannels.length > 0 ? selectedChannels : ['twitter', 'linkedin']}
            showDeviceToggle={true}
            onRemoveMedia={(index) => handleRemoveMediaItem(index)}
            onAddSamplePost={(sampleText, sampleMedia) => {
              setContent(sampleText);
              if (sampleMedia) {
                const sampleItem: AttachedMediaItem = {
                  id: `preset-${Date.now()}`,
                  name: 'sample-campaign.jpg',
                  size: 1100000,
                  type: 'image/jpeg',
                  previewUrl: sampleMedia,
                  isVideo: false,
                };
                setAttachedMedia((prev) => [...prev, sampleItem]);
                setMediaUrls((prev) => [...prev, sampleMedia]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
