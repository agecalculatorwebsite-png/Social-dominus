import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const TwitterIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36zm1.4 9.74V9.93H5.06v8.57h2.8z" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const TikTokIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V16.3c-.02 2.05-.62 4.09-1.85 5.75-1.56 2.1-4.06 3.42-6.68 3.45-2.45.03-4.88-.93-6.55-2.72-2.02-2.15-2.8-5.26-2.11-8.15.65-2.73 2.63-4.99 5.28-5.87.97-.33 2-.49 3.02-.48v4.11c-.55-.06-1.12.01-1.64.21-1.19.46-2.08 1.54-2.27 2.8-.23 1.55.6 3.12 2.05 3.73 1.34.56 2.94.33 4.06-.57.65-.52 1.05-1.3 1.09-2.15V.02z"/>
  </svg>
);

export const PinterestIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.49.03-3.56.14-.97.94-6.44.94-6.44s-.24-.48-.24-1.2c0-1.12.65-1.96 1.46-1.96.69 0 1.02.52 1.02 1.14 0 .69-.44 1.73-.67 2.69-.19.81.4 1.47 1.2 1.47 1.44 0 2.55-1.52 2.55-3.71 0-1.94-1.4-3.3-3.39-3.3-2.31 0-3.66 1.73-3.66 3.52 0 .7.27 1.45.61 1.86.07.08.08.15.06.24-.06.26-.2.83-.23.95-.04.16-.13.2-.3.12-1.12-.52-1.82-2.16-1.82-3.48 0-2.83 2.06-5.43 5.93-5.43 3.12 0 5.54 2.22 5.54 5.19 0 3.1-1.95 5.59-4.66 5.59-.91 0-1.77-.47-2.06-1.03l-.56 2.14c-.2.78-.75 1.76-1.12 2.36A12 12 0 1 0 12 0z"/>
  </svg>
);

export const ThreadsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.84 14.3c-.93 1.14-2.22 1.74-3.84 1.74-2.82 0-4.9-1.83-4.9-4.7 0-3.07 2.29-5.1 5.4-5.1 3.01 0 4.96 1.84 4.96 4.71 0 1.04-.3 1.94-.85 2.58-.51.59-1.2.92-1.97.92-.68 0-1.24-.31-1.54-.86-.41.56-.99.86-1.71.86-1.29 0-2.21-.99-2.21-2.38 0-1.46.99-2.45 2.4-2.45.65 0 1.22.21 1.63.6v-.32c0-1.63-1.02-2.61-2.73-2.61-1.19 0-2.18.52-2.82 1.48l-1.39-1.05c.98-1.44 2.51-2.24 4.31-2.24 2.82 0 4.67 1.71 4.67 4.54v4.54c0 .35.15.54.43.54.21 0 .42-.1.64-.32l.85 1.25c-.48.48-1.07.74-1.75.74-.75 0-1.32-.38-1.52-1.04z"/>
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.176.2-.352.225-.653.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.525.15-.175.201-.3.301-.5.101-.2.051-.375-.025-.525-.075-.15-.678-1.635-.93-2.24-.244-.588-.493-.508-.678-.517-.176-.008-.377-.01-.578-.01s-.527.075-.803.375c-.276.3-1.054 1.03-1.054 2.51 0 1.48 1.079 2.91 1.23 3.11.15.2 2.124 3.243 5.145 4.547.719.31 1.28.496 1.718.635.722.23 1.38.197 1.9.12.58-.087 1.782-.728 2.033-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35zM12.04 2C6.5 2 2 6.5 2 12.04c0 1.95.56 3.77 1.53 5.31L2 22l4.82-1.49c1.48.88 3.2 1.38 5.22 1.38 5.54 0 10.04-4.5 10.04-10.04C22.08 6.5 17.58 2 12.04 2z"/>
  </svg>
);

export const GoogleBusinessIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/>
  </svg>
);

export const BlueskyIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 0 1.882 0 4.675c0 1.236.435 7.15 1.055 8.355.776 1.507 2.87 2.056 4.706 1.748-2.613 1.013-4.32 3.197-2.023 6.136 3.125 4 6.762-.914 8.262-4.114 1.5 3.2 5.137 8.114 8.262 4.114 2.297-2.939.59-5.123-2.023-6.136 1.836.308 3.93-.241 4.706-1.748.62-1.205 1.055-7.119 1.055-8.355 0-2.793-2.566-3.665-5.202-1.87C16.046 4.747 13.087 8.686 12 10.8z"/>
  </svg>
);

export const MastodonIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.18.046 3.484.225 4.542 2.055 8.98 8.01 9.387 2.825.193 5.378-.445 6.467-1.096l-.173-1.636c-.958.55-2.99.98-5.342.796-2.527-.197-3.957-1.464-4.14-2.748.74.195 1.513.315 2.308.358 1.954.106 3.844-.06 5.616-.395 2.457-.464 4.52-1.785 4.787-3.933.39-3.13.07-7.217.07-7.217zm-4.307 7.022h-2.186V9.827c0-1.203-.507-1.815-1.523-1.815-1.127 0-1.691.73-1.691 2.18v3.136h-2.176v-3.136c0-1.45-.564-2.18-1.69-2.18-1.017 0-1.524.612-1.524 1.815v5.761H4.053V9.584c0-1.204.308-2.164.925-2.88.636-.716 1.472-1.083 2.508-1.083 1.2 0 2.11.457 2.716 1.371l.623 1.042.623-1.042c.606-.914 1.517-1.371 2.716-1.371 1.036 0 1.872.367 2.508 1.083.617.716.925 1.676.925 2.88v6.004z"/>
  </svg>
);

export const RedditIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.248a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.492 1.207-.492.94 0 1.704.764 1.704 1.705 0 .616-.328 1.156-.819 1.454.048.243.076.495.076.753 0 2.766-3.218 5.01-7.195 5.01-3.977 0-7.195-2.244-7.195-5.01 0-.258.028-.51.076-.753a1.705 1.705 0 0 1-.82-1.454c0-.94.764-1.705 1.705-1.705.477 0 .899.183 1.207.492 1.194-.856 2.85-1.418 4.674-1.488l.8-3.747 2.597.547a1.248 1.248 0 0 1 1.248-.056z"/>
  </svg>
);

export const SnapchatIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12.001 2.2c-3.71 0-5.83 2.76-5.83 5.37 0 .93.33 2.05.5 2.55.08.24-.03.42-.23.51-.43.19-.94.46-1.39.81-.35.28-.46.6-.33.97.16.48.68.73 1.28.84.28.05.4.24.36.5-.23 1.43-1.04 2.21-2.18 2.51-.5.13-.67.43-.57.85.12.5.58.73 1.09.79.52.06 1.09.07 1.62-.05.3-.07.48.06.57.34.42 1.24 1.39 1.95 2.65 1.95.83 0 1.54-.26 2.26-.71.19-.12.44-.12.63 0 .72.45 1.43.71 2.26.71 1.26 0 2.23-.71 2.65-1.95.09-.28.27-.41.57-.34.53.12 1.1.11 1.62.05.51-.06.97-.29 1.09-.79.1-.42-.07-.72-.57-.85-1.14-.3-1.95-1.08-2.18-2.51-.04-.26.08-.45.36-.5.6-.11 1.12-.36 1.28-.84.13-.37.02-.69-.33-.97-.45-.35-.96-.62-1.39-.81-.2-.09-.31-.27-.23-.51.17-.5.5-1.62.5-2.55 0-2.61-2.12-5.37-5.83-5.37z"/>
  </svg>
);

export const TelegramIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.666 8.214-2.022 9.537c-.15.68-.556.848-1.12.528l-3.08-2.27-1.487 1.432c-.164.164-.303.303-.62.303l.222-3.14 5.72-5.168c.249-.222-.054-.345-.386-.124l-7.067 4.45-3.045-.953c-.662-.207-.676-.662.138-.98l11.9-4.586c.552-.2 1.034.138.847.971z"/>
  </svg>
);

export const SocialDominusLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-400 text-white shadow-lg shadow-violet-500/20 ${className}`} style={{ width: size, height: size }}>
    <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4H4z" />
      <path d="M4 12h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H4z" />
    </svg>
  </div>
);

export const PLATFORM_CONFIG: Record<
  string,
  {
    name: string;
    icon: React.FC<IconProps>;
    color: string;
    bgColor: string;
    borderColor: string;
    maxChars: number;
    category: string;
  }
> = {
  twitter: {
    name: 'X (Twitter)',
    icon: TwitterIcon,
    color: 'text-slate-100',
    bgColor: 'bg-slate-900',
    borderColor: 'border-slate-700',
    maxChars: 280,
    category: 'Microblogging',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: LinkedInIcon,
    color: 'text-sky-400',
    bgColor: 'bg-sky-950/50',
    borderColor: 'border-sky-800/60',
    maxChars: 3000,
    category: 'Professional',
  },
  instagram: {
    name: 'Instagram',
    icon: InstagramIcon,
    color: 'text-pink-400',
    bgColor: 'bg-pink-950/40',
    borderColor: 'border-pink-800/60',
    maxChars: 2200,
    category: 'Visual & Reels',
  },
  facebook: {
    name: 'Facebook Pages',
    icon: FacebookIcon,
    color: 'text-blue-400',
    bgColor: 'bg-blue-950/40',
    borderColor: 'border-blue-800/60',
    maxChars: 63206,
    category: 'Community',
  },
  youtube: {
    name: 'YouTube',
    icon: YouTubeIcon,
    color: 'text-red-400',
    bgColor: 'bg-red-950/40',
    borderColor: 'border-red-800/60',
    maxChars: 5000,
    category: 'Video & Shorts',
  },
  tiktok: {
    name: 'TikTok',
    icon: TikTokIcon,
    color: 'text-teal-300',
    bgColor: 'bg-teal-950/40',
    borderColor: 'border-teal-800/60',
    maxChars: 2200,
    category: 'Short-Form Video',
  },
  threads: {
    name: 'Threads',
    icon: ThreadsIcon,
    color: 'text-slate-200',
    bgColor: 'bg-slate-900/60',
    borderColor: 'border-slate-700',
    maxChars: 500,
    category: 'Conversational',
  },
  pinterest: {
    name: 'Pinterest',
    icon: PinterestIcon,
    color: 'text-rose-400',
    bgColor: 'bg-rose-950/40',
    borderColor: 'border-rose-800/60',
    maxChars: 500,
    category: 'Visual Discovery',
  },
  whatsapp: {
    name: 'WhatsApp Business',
    icon: WhatsAppIcon,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/40',
    borderColor: 'border-emerald-800/60',
    maxChars: 1024,
    category: 'Direct Messaging',
  },
  google_business: {
    name: 'Google Business Profile',
    icon: GoogleBusinessIcon,
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/40',
    borderColor: 'border-amber-800/60',
    maxChars: 1500,
    category: 'Local Search & SEO',
  },
  bluesky: {
    name: 'Bluesky',
    icon: BlueskyIcon,
    color: 'text-sky-400',
    bgColor: 'bg-sky-950/40',
    borderColor: 'border-sky-800/60',
    maxChars: 300,
    category: 'Decentralized',
  },
  mastodon: {
    name: 'Mastodon',
    icon: MastodonIcon,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-950/40',
    borderColor: 'border-indigo-800/60',
    maxChars: 500,
    category: 'Fediverse',
  },
  reddit: {
    name: 'Reddit',
    icon: RedditIcon,
    color: 'text-orange-400',
    bgColor: 'bg-orange-950/40',
    borderColor: 'border-orange-800/60',
    maxChars: 40000,
    category: 'Communities',
  },
  snapchat: {
    name: 'Snapchat',
    icon: SnapchatIcon,
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-950/40',
    borderColor: 'border-yellow-800/60',
    maxChars: 250,
    category: 'Stories',
  },
  telegram: {
    name: 'Telegram Channels',
    icon: TelegramIcon,
    color: 'text-sky-300',
    bgColor: 'bg-sky-950/40',
    borderColor: 'border-sky-800/60',
    maxChars: 4096,
    category: 'Broadcasts',
  },
};
