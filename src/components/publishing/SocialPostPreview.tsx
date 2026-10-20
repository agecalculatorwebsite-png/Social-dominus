import React, { useState, useMemo } from 'react';
import {
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  ThreadsIcon,
  YouTubeIcon,
  BlueskyIcon,
  PLATFORM_CONFIG,
} from '../icons/SocialIcons';
import {
  extractPostEntities,
  extractFirstUrl,
  getLinkPreviewMetadata,
  calculatePlatformStats,
  isMediaVideo,
} from '../../logic/preview';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  Send,
  Globe,
  BadgeCheck,
  Smartphone,
  Monitor,
  Sparkles,
  ExternalLink,
  X,
  FileText,
  RotateCcw,
  Play,
} from 'lucide-react';

export interface SocialPostPreviewProps {
  content: string;
  mediaUrls?: string[];
  authorName: string;
  authorHandle?: string;
  authorAvatar?: string;
  activePlatform: string;
  onSelectPlatform?: (platform: string) => void;
  availablePlatforms?: string[];
  showDeviceToggle?: boolean;
  onRemoveMedia?: (index: number) => void;
  onAddSamplePost?: (sampleText: string, sampleMedia?: string) => void;
}

/**
 * Renders realistic social media layout for single/multiple images or video playback.
 */
const PreviewMediaGrid: React.FC<{
  mediaUrls: string[];
  onRemoveMedia?: (index: number) => void;
  roundedClass?: string;
}> = ({ mediaUrls, onRemoveMedia, roundedClass = 'rounded-2xl' }) => {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  const firstUrl = mediaUrls[0];
  // If first item is a video, render video player
  if (isMediaVideo(firstUrl)) {
    return (
      <div className={`relative ${roundedClass} overflow-hidden border border-slate-200 dark:border-slate-800 bg-black aspect-video flex items-center justify-center group`}>
        <video
          src={firstUrl}
          controls
          playsInline
          preload="metadata"
          className="w-full h-full object-contain max-h-64"
        />
        {onRemoveMedia && (
          <button
            type="button"
            onClick={() => onRemoveMedia(0)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-rose-600 transition-colors opacity-90 shadow-md"
            title="Remove video"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  // Single Image
  if (mediaUrls.length === 1) {
    return (
      <div className={`relative ${roundedClass} overflow-hidden border border-slate-200 dark:border-slate-800 max-h-64 bg-slate-950 group`}>
        <img
          src={mediaUrls[0]}
          alt="Attached media"
          className="w-full h-full object-cover"
        />
        {onRemoveMedia && (
          <button
            type="button"
            onClick={() => onRemoveMedia(0)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-rose-600 transition-colors opacity-90 hover:opacity-100 shadow-md"
            title="Remove media"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  // 2 Images
  if (mediaUrls.length === 2) {
    return (
      <div className={`grid grid-cols-2 gap-1.5 ${roundedClass} overflow-hidden border border-slate-200 dark:border-slate-800 max-h-64`}>
        {mediaUrls.map((url, i) => (
          <div key={i} className="relative h-44 bg-slate-900 group">
            {isMediaVideo(url) ? (
              <video src={url} controls className="w-full h-full object-cover" />
            ) : (
              <img src={url} alt={`Media ${i + 1}`} className="w-full h-full object-cover" />
            )}
            {onRemoveMedia && (
              <button
                type="button"
                onClick={() => onRemoveMedia(i)}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-950/80 text-white hover:bg-rose-600 opacity-90"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 3 Images: 1 tall left, 2 stacked right
  if (mediaUrls.length === 3) {
    return (
      <div className={`grid grid-cols-2 gap-1.5 ${roundedClass} overflow-hidden border border-slate-200 dark:border-slate-800 max-h-64`}>
        <div className="relative h-52 bg-slate-900 group">
          <img src={mediaUrls[0]} alt="Media 1" className="w-full h-full object-cover" />
          {onRemoveMedia && (
            <button
              type="button"
              onClick={() => onRemoveMedia(0)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-950/80 text-white hover:bg-rose-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <div className="grid grid-rows-2 gap-1.5 h-52">
          {mediaUrls.slice(1, 3).map((url, i) => (
            <div key={i} className="relative h-[100px] bg-slate-900 group">
              <img src={url} alt={`Media ${i + 2}`} className="w-full h-full object-cover" />
              {onRemoveMedia && (
                <button
                  type="button"
                  onClick={() => onRemoveMedia(i + 1)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-white hover:bg-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4 or more Images: 2x2 grid with +N
  const displayUrls = mediaUrls.slice(0, 4);
  const remainingCount = mediaUrls.length - 4;

  return (
    <div className={`grid grid-cols-2 gap-1.5 ${roundedClass} overflow-hidden border border-slate-200 dark:border-slate-800 max-h-64`}>
      {displayUrls.map((url, i) => (
        <div key={i} className="relative h-28 bg-slate-900 group">
          <img src={url} alt={`Media ${i + 1}`} className="w-full h-full object-cover" />
          {i === 3 && remainingCount > 0 && (
            <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center text-white font-bold text-base">
              +{remainingCount}
            </div>
          )}
          {onRemoveMedia && (
            <button
              type="button"
              onClick={() => onRemoveMedia(i)}
              className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-white hover:bg-rose-600 z-10"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export const SocialPostPreview: React.FC<SocialPostPreviewProps> = ({
  content,
  mediaUrls = [],
  authorName,
  authorHandle = '@socialdominus',
  authorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  activePlatform = 'twitter',
  onSelectPlatform,
  availablePlatforms = ['twitter', 'linkedin', 'instagram', 'facebook', 'threads'],
  showDeviceToggle = true,
  onRemoveMedia,
  onAddSamplePost,
}) => {
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [seeMoreExpanded, setSeeMoreExpanded] = useState(false);

  // Compute stats and entities
  const stats = useMemo(
    () => calculatePlatformStats(content, activePlatform),
    [content, activePlatform]
  );

  const detectedUrl = useMemo(() => extractFirstUrl(content), [content]);
  const linkPreview = useMemo(
    () => (detectedUrl ? getLinkPreviewMetadata(detectedUrl) : null),
    [detectedUrl]
  );

  const entities = useMemo(() => extractPostEntities(content), [content]);

  // Platform brand colors
  const platformConfig = PLATFORM_CONFIG[activePlatform] || PLATFORM_CONFIG['twitter'];

  // Render tokens with platform-specific hashtag, mention, and link styles
  const renderFormattedTokens = (platformKey: string) => {
    if (!content || content.trim().length === 0) {
      return (
        <span className="text-slate-400 dark:text-slate-500 italic block py-4 text-center select-none">
          Draft your message in the editor to see an exact live {platformConfig.name} preview...
        </span>
      );
    }

    return (
      <span className="whitespace-pre-wrap leading-relaxed break-words">
        {entities.map((item, index) => {
          if (item.type === 'hashtag') {
            const hashtagColor =
              platformKey === 'twitter'
                ? 'text-[#1d9bf0] hover:underline cursor-pointer'
                : platformKey === 'linkedin'
                ? 'text-[#0a66c2] dark:text-[#70b5f9] font-medium hover:underline cursor-pointer'
                : platformKey === 'instagram'
                ? 'text-[#00376b] dark:text-sky-400 font-medium hover:underline cursor-pointer'
                : 'text-violet-600 dark:text-violet-400 font-medium hover:underline cursor-pointer';

            return (
              <span key={index} className={hashtagColor}>
                {item.value}
              </span>
            );
          }

          if (item.type === 'mention') {
            const mentionColor =
              platformKey === 'twitter'
                ? 'text-[#1d9bf0] font-medium hover:underline cursor-pointer'
                : platformKey === 'linkedin'
                ? 'text-[#0a66c2] dark:text-[#70b5f9] font-semibold hover:underline cursor-pointer'
                : 'text-violet-500 dark:text-violet-400 font-medium hover:underline cursor-pointer';

            return (
              <span key={index} className={mentionColor}>
                {item.value}
              </span>
            );
          }

          if (item.type === 'url') {
            return (
              <span
                key={index}
                className="text-[#1d9bf0] hover:underline cursor-pointer break-all"
                title={`Open destination: ${item.value}`}
              >
                {item.value}
              </span>
            );
          }

          return <span key={index}>{item.value}</span>;
        })}
      </span>
    );
  };

  // Sample post injection templates
  const applyPreset = (type: 'twitter' | 'linkedin' | 'image') => {
    if (!onAddSamplePost) return;
    if (type === 'twitter') {
      onAddSamplePost(
        `Excited to announce our Q4 product roadmap for multi-channel creators! 🚀\n\nAutomated cross-posting to 15 networks, instant live previews, and smart scheduling queues.\n\nLearn more at https://techcrunch.com/news #SocialDominus #ProductLaunch @socialdominus`
      );
      if (onSelectPlatform) onSelectPlatform('twitter');
    } else if (type === 'linkedin') {
      onAddSamplePost(
        `Why treating every social channel identically kills organic engagement in 2026.\n\nAfter analyzing over 500,000 scheduled dispatches across B2B and consumer brands, here are 3 key takeaways:\n\n1. LinkedIn favors long-form contextual insights with 2-3 focused hashtags.\n2. Visual storytelling wins when paired with verified native previews.\n3. Scheduling consistency beats raw publishing volume every time.\n\nRead the full industry breakdown: https://techcrunch.com/insights\n\n#B2BMarketing #SocialStrategy #GrowthHacking #Productivity`
      );
      if (onSelectPlatform) onSelectPlatform('linkedin');
    } else {
      onAddSamplePost(
        `Fresh visuals from our annual product conference. Scaling unified social dispatch with real-time feedback loops! 🎨✨ #Design #Community`,
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
      );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col">
      {/* Component Header / Toolbar */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-900/90">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Social Media Post Preview
            </h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Live native simulation for {platformConfig.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Character Counter Progress Pill */}
          <div
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 transition-colors ${
              stats.isOverLimit
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                : stats.isWarning
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                : 'bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <span>
              {stats.currentChars}/{stats.maxChars}
            </span>
            {stats.isOverLimit && <span className="font-sans text-[10px] uppercase">Limit exceeded</span>}
          </div>

          {/* Device Viewport Selector */}
          {showDeviceToggle && (
            <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded-xl text-slate-500">
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-lg transition-all ${
                  device === 'mobile'
                    ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-xs'
                    : 'hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Mobile View"
                aria-label="Switch to Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-lg transition-all ${
                  device === 'desktop'
                    ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-xs'
                    : 'hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Desktop View"
                aria-label="Switch to Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Platform Switcher Tabs */}
      {availablePlatforms.length > 0 && (
        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar bg-white dark:bg-slate-900">
          <div className="flex items-center gap-1.5">
            {availablePlatforms.map((platKey) => {
              const config = PLATFORM_CONFIG[platKey];
              if (!config) return null;
              const Icon = config.icon;
              const isSelected = activePlatform === platKey;

              return (
                <button
                  key={platKey}
                  type="button"
                  onClick={() => onSelectPlatform && onSelectPlatform(platKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{config.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Quick preset templates to test preview */}
          {onAddSamplePost && (
            <div className="flex items-center gap-1 shrink-0 pl-2">
              <span className="text-[10px] text-slate-400 hidden xl:inline">Test templates:</span>
              <button
                type="button"
                onClick={() => applyPreset('twitter')}
                className="px-2 py-0.5 rounded-lg text-[10px] font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Fill with sample Twitter post"
              >
                Twitter Demo
              </button>
              <button
                type="button"
                onClick={() => applyPreset('linkedin')}
                className="px-2 py-0.5 rounded-lg text-[10px] font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Fill with sample LinkedIn post"
              >
                LinkedIn Demo
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Preview Canvas Surface */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center bg-slate-100/70 dark:bg-slate-950/70 min-h-[420px]">
        <div
          className={`w-full transition-all duration-200 ${
            device === 'mobile'
              ? 'max-w-sm rounded-[36px] p-2.5 bg-slate-900 text-white shadow-2xl ring-4 ring-slate-800/80 border border-slate-700/60'
              : 'max-w-xl'
          }`}
        >
          {/* Mobile Phone Mockup Status Bar */}
          {device === 'mobile' && (
            <div className="pt-1.5 pb-2.5 px-4 flex items-center justify-between text-[11px] font-semibold text-slate-400 select-none">
              <span>9:41</span>
              <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto shadow-inner" />
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span className="w-5 h-2.5 border border-slate-400 rounded-xs flex items-center p-0.5">
                  <span className="w-full h-full bg-emerald-400 rounded-2xs" />
                </span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PLATFORM 1: TWITTER / X CARD REPRESENTATION */}
          {/* ============================================================== */}
          {activePlatform === 'twitter' ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 p-4 space-y-3 font-sans shadow-xs transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5 min-w-0">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-800"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-bold text-sm text-slate-950 dark:text-white truncate">
                        {authorName}
                      </span>
                      <BadgeCheck className="w-4 h-4 text-[#1d9bf0] fill-[#1d9bf0] shrink-0" />
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {authorHandle}
                      </span>
                      <span className="text-slate-400 text-xs">·</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">2m</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Verified Publisher</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <TwitterIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200" />
                </div>
              </div>

              {/* Tweet Content */}
              <div className="text-sm leading-relaxed text-slate-900 dark:text-slate-100">
                {renderFormattedTokens('twitter')}
              </div>

              {/* Attached Media */}
              {mediaUrls.length > 0 && (
                <PreviewMediaGrid
                  mediaUrls={mediaUrls}
                  onRemoveMedia={onRemoveMedia}
                  roundedClass="rounded-2xl"
                />
              )}

              {/* OpenGraph Link Card (if URL detected and no media attached) */}
              {mediaUrls.length === 0 && linkPreview && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all bg-slate-50 dark:bg-slate-900/60 cursor-pointer">
                  {linkPreview.imageUrl && (
                    <div className="h-32 sm:h-36 overflow-hidden relative">
                      <img
                        src={linkPreview.imageUrl}
                        alt="Link preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950/80 text-white backdrop-blur-xs flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {linkPreview.domain}
                      </span>
                    </div>
                  )}
                  <div className="p-3 space-y-1">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                      {linkPreview.domain}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                      {linkPreview.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {linkPreview.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Timestamp & Views metadata */}
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-900">
                <div className="flex items-center gap-1.5">
                  <span>2:30 PM · Oct 21, 2026</span>
                  <span>·</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">14.8K</span>
                  <span>Views</span>
                </div>

                {/* Twitter circular character progress */}
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200 dark:text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={
                          stats.isOverLimit
                            ? 'text-rose-500'
                            : stats.isWarning
                            ? 'text-amber-500'
                            : 'text-[#1d9bf0]'
                        }
                        strokeDasharray={`${Math.min(100, stats.percentage)}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="pt-2 flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs border-t border-slate-100 dark:border-slate-900">
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-[#1d9bf0] transition-colors p-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-[11px]">38</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors p-1"
                >
                  <Repeat2 className="w-4 h-4" />
                  <span className="text-[11px]">84</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-rose-500 transition-colors p-1"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-[11px]">392</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-[#1d9bf0] transition-colors p-1"
                >
                  <Bookmark className="w-4 h-4" />
                  <span className="text-[11px]">19</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-[#1d9bf0] transition-colors p-1"
                >
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : activePlatform === 'linkedin' ? (
            /* ============================================================== */
            /* PLATFORM 2: LINKEDIN POST CARD REPRESENTATION */
            /* ============================================================== */
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 space-y-3 font-sans shadow-xs transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={authorAvatar}
                      alt={authorName}
                      className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {authorName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">• 1st</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block line-clamp-1">
                      Lead Product Strategist & Enterprise Growth Architect
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                      <span>1h</span>
                      <span>•</span>
                      <span>Edited</span>
                      <span>•</span>
                      <Globe className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <LinkedInIcon className="w-4 h-4 text-[#0a66c2]" />
                  <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200" />
                </div>
              </div>

              {/* LinkedIn Post Content with see more toggle */}
              <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                {content.length > 220 && !seeMoreExpanded ? (
                  <div>
                    <span className="whitespace-pre-wrap leading-relaxed break-words">
                      {content.slice(0, 220)}...
                    </span>
                    <button
                      type="button"
                      onClick={() => setSeeMoreExpanded(true)}
                      className="text-[#0a66c2] dark:text-[#70b5f9] hover:underline font-semibold ml-1 cursor-pointer"
                    >
                      …see more
                    </button>
                  </div>
                ) : (
                  <div>
                    {renderFormattedTokens('linkedin')}
                    {seeMoreExpanded && (
                      <button
                        type="button"
                        onClick={() => setSeeMoreExpanded(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs block mt-1"
                      >
                        (collapse)
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Attached Media or Rich Link Preview Card */}
              {mediaUrls.length > 0 ? (
                <PreviewMediaGrid
                  mediaUrls={mediaUrls}
                  onRemoveMedia={onRemoveMedia}
                  roundedClass="rounded-xl"
                />
              ) : (
                linkPreview && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100/70 transition-colors">
                    {linkPreview.imageUrl && (
                      <div className="h-32 sm:h-36 overflow-hidden">
                        <img
                          src={linkPreview.imageUrl}
                          alt="Link preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-3 space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                        {linkPreview.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {linkPreview.description}
                      </p>
                      <span className="text-[11px] text-slate-400 block pt-0.5">
                        {linkPreview.domain} • 4 min read
                      </span>
                    </div>
                  </div>
                )
              )}

              {/* Social Proof Count */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="flex -space-x-1">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] shadow-xs">
                      👍
                    </span>
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] shadow-xs">
                      👏
                    </span>
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] shadow-xs">
                      💡
                    </span>
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 ml-1">
                    572
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>46 comments</span>
                  <span>•</span>
                  <span>14 reposts</span>
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="pt-1.5 flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
                >
                  <ThumbsUp className="w-4 h-4 text-[#0a66c2]" />
                  <span>Like</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Comment</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
                >
                  <Repeat2 className="w-4 h-4" />
                  <span>Repost</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          ) : activePlatform === 'instagram' ? (
            /* ============================================================== */
            /* PLATFORM 3: INSTAGRAM FEED CARD */
            /* ============================================================== */
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 p-4 space-y-3 font-sans shadow-xs transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                    <img
                      src={authorAvatar}
                      alt={authorName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-black"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">
                      {authorHandle.replace('@', '')}
                    </span>
                    <span className="text-[10px] text-slate-400">Original audio</span>
                  </div>
                </div>
                <InstagramIcon className="w-4 h-4 text-pink-500" />
              </div>

              {/* Media image/video container */}
              <div className="rounded-xl overflow-hidden aspect-square border border-slate-100 dark:border-slate-800 bg-slate-900 flex items-center justify-center relative">
                {mediaUrls.length > 0 ? (
                  isMediaVideo(mediaUrls[0]) ? (
                    <video
                      src={mediaUrls[0]}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={mediaUrls[0]}
                      alt="Media preview"
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="text-center p-6 text-slate-400 text-xs">
                    <InstagramIcon className="w-8 h-8 mx-auto mb-2 opacity-50 text-pink-500" />
                    <span>Visual asset preview</span>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Attach photo/reel for optimal feed framing
                    </p>
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between text-slate-800 dark:text-slate-200">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <MessageCircle className="w-5 h-5" />
                  <Send className="w-5 h-5" />
                </div>
                <Bookmark className="w-5 h-5" />
              </div>

              {/* Likes & Caption */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">
                  1,489 likes
                </span>
                <div className="leading-relaxed">
                  <strong className="mr-1.5 text-slate-950 dark:text-white">
                    {authorHandle.replace('@', '')}
                  </strong>
                  {renderFormattedTokens('instagram')}
                </div>
                <span className="text-[10px] text-slate-400 block pt-1 cursor-pointer">
                  View all 48 comments
                </span>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* PLATFORM 4: FACEBOOK / THREADS / GENERAL CARD */
            /* ============================================================== */
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 space-y-3 font-sans shadow-xs transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-800"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                      {authorName}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      15m · <Globe className="w-3 h-3" /> Public
                    </span>
                  </div>
                </div>
                <FacebookIcon className="w-4 h-4 text-blue-500" />
              </div>

              <div className="text-xs sm:text-sm leading-relaxed">
                {renderFormattedTokens(activePlatform)}
              </div>

              {mediaUrls.length > 0 && (
                <PreviewMediaGrid
                  mediaUrls={mediaUrls}
                  onRemoveMedia={onRemoveMedia}
                  roundedClass="rounded-xl"
                />
              )}

              {mediaUrls.length === 0 && linkPreview && (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  {linkPreview.imageUrl && (
                    <img
                      src={linkPreview.imageUrl}
                      alt="Link preview"
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <span className="text-[10px] uppercase text-slate-400 font-medium">
                      {linkPreview.domain}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                      {linkPreview.title}
                    </h5>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-blue-500 py-1"
                >
                  <ThumbsUp className="w-4 h-4 text-blue-500" /> Like
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-blue-500 py-1"
                >
                  <MessageCircle className="w-4 h-4" /> Comment
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-blue-500 py-1"
                >
                  <Share className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          )}

          {/* Mobile Phone Home Indicator Bar */}
          {device === 'mobile' && (
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-28 h-1 bg-slate-700 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
