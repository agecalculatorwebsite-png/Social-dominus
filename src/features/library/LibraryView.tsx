import React, { useState, useRef } from 'react';
import { useAppStore } from '../../services/store';
import { uploadMediaFile } from '../../firebase';
import { formatFileSize, isMediaVideo } from '../../logic/preview';
import { FolderOpen, Upload, Search, Image, Film, FileText, Trash2, Tag, Plus, Loader2 } from 'lucide-react';

export interface LibraryAsset {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  size: string;
  dimensions: string;
  tag: string;
  uploadedAt: string;
}

export const LibraryView: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { userProfile, firebaseUser } = useAppStore();
  const [activeTab, setActiveTab] = useState<'media' | 'templates' | 'captions'>('media');
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [assets, setAssets] = useState<LibraryAsset[]>(() => {
    const saved = localStorage.getItem('sd_library_assets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'ast-1',
        title: 'SaaS Growth Playbook Header',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        size: '1.2 MB',
        dimensions: '1920x1080',
        tag: 'Infographics',
        uploadedAt: '2026-10-18',
      },
      {
        id: 'ast-2',
        title: 'Agency Multi-Client Workspace Preview',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        size: '840 KB',
        dimensions: '1200x675',
        tag: 'Product Mockups',
        uploadedAt: '2026-10-15',
      },
      {
        id: 'ast-3',
        title: 'Dark Mode Engineering Sprint',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
        size: '1.9 MB',
        dimensions: '2048x1152',
        tag: 'Behind the Scenes',
        uploadedAt: '2026-10-12',
      },
    ];
  });

  const [savedCaptions] = useState([
    {
      id: 'cap-1',
      title: 'Standard Product Announcement CTA',
      text: 'Scale your social media publishing across 15 networks with Social Dominus. Start your zero-risk 14-day trial today: https://socialdominus.app',
      tags: ['CTA', 'Promotional'],
    },
    {
      id: 'cap-2',
      title: 'Weekly Community Question Hook',
      text: 'Question of the week for social media managers: Which social network currently delivers your highest conversion-to-engagement ratio?',
      tags: ['Engagement', 'Question'],
    },
  ]);

  const handleDeleteAsset = (id: string) => {
    setAssets((prev: any[]) => {
      const next = prev.filter((a) => a.id !== id);
      localStorage.setItem('sd_library_assets', JSON.stringify(next));
      return next;
    });
  };

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const fileList = Array.from(files);
    const newAssets: any[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const isVid = isMediaVideo(file.type || file.name);
      let mediaUrl = URL.createObjectURL(file);

      if (firebaseUser) {
        try {
          mediaUrl = await uploadMediaFile(file, firebaseUser.uid, (p) => {
            const overall = Math.round(((i + p / 100) / fileList.length) * 100);
            setUploadProgress(overall);
          });
        } catch (err) {
          console.warn('Firebase Storage upload failed, using local preview URL:', err);
        }
      }

      newAssets.push({
        id: `ast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        type: isVid ? 'video' : 'image',
        url: mediaUrl,
        size: formatFileSize(file.size),
        dimensions: isVid ? '1080p Video' : 'Original',
        tag: 'Uploaded',
        uploadedAt: new Date().toISOString().split('T')[0],
      });
    }

    setAssets((prev: any[]) => {
      const updated = [...newAssets, ...prev];
      localStorage.setItem('sd_library_assets', JSON.stringify(updated));
      return updated;
    });

    setIsUploading(false);
    setUploadProgress(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFilesSelected}
        multiple
        accept="image/*,video/mp4,video/quicktime,video/webm"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-violet-500" />
            Content & Asset Library
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Central repository for verified brand media, reusable templates, and approved captions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading {uploadProgress !== null ? `${uploadProgress}%` : '...'}</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Media</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'media' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Media Assets ({assets.length})
          </button>
          <button
            onClick={() => setActiveTab('captions')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'captions' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Saved Captions ({savedCaptions.length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets by tag or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Media Grid */}
      {activeTab === 'media' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:border-violet-500/40 transition-all group flex flex-col justify-between"
            >
              <div className="h-44 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <img src={asset.url} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/70 text-white backdrop-blur-xs">
                  {asset.dimensions}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-500 font-bold">
                    {asset.tag}
                  </span>
                  <span className="text-[10px] text-slate-400">{asset.size}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{asset.title}</h4>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => navigate('/app/compose')}
                    className="text-violet-600 dark:text-violet-400 font-bold hover:underline"
                  >
                    Use in Post →
                  </button>
                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Saved Captions */}
      {activeTab === 'captions' && (
        <div className="space-y-4">
          {savedCaptions.map((cap) => (
            <div
              key={cap.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{cap.title}</h4>
                <div className="flex gap-1.5">
                  {cap.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {cap.text}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => navigate('/app/compose')}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-violet-600 text-white"
                >
                  Insert into Composer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
