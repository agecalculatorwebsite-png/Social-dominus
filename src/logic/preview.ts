/**
 * Pure logic for social media post parsing, link metadata simulation, and preview stats.
 */

export interface PostEntity {
  type: 'text' | 'hashtag' | 'mention' | 'url';
  value: string;
}

export interface LinkPreviewData {
  url: string;
  domain: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface PlatformPreviewStats {
  currentChars: number;
  maxChars: number;
  remainingChars: number;
  percentage: number;
  isOverLimit: boolean;
  isWarning: boolean;
}

const PLATFORM_MAX_CHARS: Record<string, number> = {
  twitter: 280,
  linkedin: 3000,
  instagram: 2200,
  facebook: 63206,
  threads: 500,
  youtube: 5000,
  tiktok: 2200,
  pinterest: 500,
  bluesky: 300,
  mastodon: 500,
  reddit: 40000,
  telegram: 4096,
  whatsapp: 65536,
  google_business: 1500,
  snapchat: 250,
};

/**
 * Tokenizes post text into plain text, hashtags, mentions, and URLs.
 */
export function extractPostEntities(text: string): PostEntity[] {
  if (!text) return [];

  // Match URLs, hashtags, mentions, or normal text sequences
  const regex = /(https?:\/\/[^\s]+)|(#[a-zA-Z0-9_]+)|(@[a-zA-Z0-9_]+)|([^\s#@]+|\s+)/g;
  const entities: PostEntity[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const raw = match[0];
    if (match[1]) {
      entities.push({ type: 'url', value: raw });
    } else if (match[2]) {
      entities.push({ type: 'hashtag', value: raw });
    } else if (match[3]) {
      entities.push({ type: 'mention', value: raw });
    } else {
      entities.push({ type: 'text', value: raw });
    }
  }

  return entities;
}

/**
 * Finds the first valid URL in the text, if any.
 */
export function extractFirstUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s]+/i);
  return match ? match[0] : null;
}

/**
 * Generates realistic OpenGraph link preview metadata for social cards.
 */
export function getLinkPreviewMetadata(rawUrl: string): LinkPreviewData {
  try {
    const parsed = new URL(rawUrl);
    const domain = parsed.hostname.replace(/^www\./, '');

    if (domain.includes('github.com')) {
      return {
        url: rawUrl,
        domain,
        title: 'GitHub: Let’s build from here',
        description: 'GitHub is where over 100 million developers shape the future of software together.',
        imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=800&auto=format&fit=crop&q=80',
      };
    }

    if (domain.includes('techcrunch.com') || domain.includes('news')) {
      return {
        url: rawUrl,
        domain,
        title: 'Transforming Creator Workflows With Modern Social Orchestration',
        description: 'How modern businesses scale engagement through automated multi-channel queues and real-time previews.',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      };
    }

    if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
      return {
        url: rawUrl,
        domain,
        title: 'Mastering Social Media Growth in 2026 — Masterclass & Strategy',
        description: 'Watch step-by-step tactics to scale brand distribution across 15+ networks with high consistency.',
        imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80',
      };
    }

    // Default rich card
    const pathSlug = parsed.pathname.replace(/^\/|\/$/g, '').replace(/[-_]/g, ' ');
    const title = pathSlug
      ? pathSlug.charAt(0).toUpperCase() + pathSlug.slice(1)
      : `Explore updates on ${domain}`;

    return {
      url: rawUrl,
      domain,
      title: title || `${domain} — Official Release`,
      description: `Read the latest announcement, insights, and media updates published on ${domain}.`,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    };
  } catch {
    return {
      url: rawUrl,
      domain: 'external.link',
      title: 'Shared Link Preview',
      description: 'Click to open the destination resource in a secure browser tab.',
    };
  }
}

/**
 * Calculates accurate platform character counts and percentages.
 */
export function calculatePlatformStats(content: string, platformKey: string): PlatformPreviewStats {
  const maxChars = PLATFORM_MAX_CHARS[platformKey] || 280;
  const currentChars = content ? content.length : 0;
  const remainingChars = maxChars - currentChars;
  const percentage = Math.min(100, Math.round((currentChars / maxChars) * 100));
  const isOverLimit = currentChars > maxChars;
  const isWarning = !isOverLimit && remainingChars <= Math.max(20, Math.round(maxChars * 0.1));

  return {
    currentChars,
    maxChars,
    remainingChars,
    percentage,
    isOverLimit,
    isWarning,
  };
}

/**
 * Determines whether a given media URL or MIME type represents a video.
 */
export function isMediaVideo(urlOrType: string): boolean {
  if (!urlOrType) return false;
  const lower = urlOrType.toLowerCase();
  return (
    lower.startsWith('video/') ||
    lower.endsWith('.mp4') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.m4v') ||
    lower.includes('video')
  );
}

/**
 * Formats byte size into human readable string.
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i] || 'MB'}`;
}

export interface PlatformMediaLimits {
  maxImages: number;
  maxVideos: number;
  allowsMixed: boolean;
  maxFileSizeMB: number;
}

export const PLATFORM_MEDIA_LIMITS: Record<string, PlatformMediaLimits> = {
  twitter: { maxImages: 4, maxVideos: 1, allowsMixed: false, maxFileSizeMB: 512 },
  linkedin: { maxImages: 9, maxVideos: 1, allowsMixed: false, maxFileSizeMB: 200 },
  instagram: { maxImages: 10, maxVideos: 1, allowsMixed: true, maxFileSizeMB: 100 },
  facebook: { maxImages: 10, maxVideos: 1, allowsMixed: true, maxFileSizeMB: 500 },
  youtube: { maxImages: 0, maxVideos: 1, allowsMixed: false, maxFileSizeMB: 1024 },
  threads: { maxImages: 10, maxVideos: 1, allowsMixed: true, maxFileSizeMB: 100 },
  tiktok: { maxImages: 35, maxVideos: 1, allowsMixed: false, maxFileSizeMB: 287 },
  pinterest: { maxImages: 5, maxVideos: 1, allowsMixed: false, maxFileSizeMB: 100 },
};

/**
 * Validates selected media items against platform-specific constraints.
 */
export function validatePlatformMedia(
  items: { type: string; size: number }[],
  platformKey: string
): { isValid: boolean; error?: string } {
  if (!items || items.length === 0) return { isValid: true };
  const limits = PLATFORM_MEDIA_LIMITS[platformKey] || {
    maxImages: 4,
    maxVideos: 1,
    allowsMixed: false,
    maxFileSizeMB: 100,
  };

  const imageCount = items.filter((i) => !isMediaVideo(i.type)).length;
  const videoCount = items.filter((i) => isMediaVideo(i.type)).length;

  if (videoCount > limits.maxVideos) {
    return {
      isValid: false,
      error: `${platformKey.toUpperCase()} allows a maximum of ${limits.maxVideos} video per post.`,
    };
  }

  if (videoCount > 0 && imageCount > 0 && !limits.allowsMixed) {
    return {
      isValid: false,
      error: `${platformKey.toUpperCase()} does not allow mixing images and videos in a single post.`,
    };
  }

  if (imageCount > limits.maxImages) {
    return {
      isValid: false,
      error: `${platformKey.toUpperCase()} allows a maximum of ${limits.maxImages} images per post.`,
    };
  }

  const maxBytes = limits.maxFileSizeMB * 1024 * 1024;
  for (const item of items) {
    if (item.size > maxBytes) {
      return {
        isValid: false,
        error: `File size exceeds the ${limits.maxFileSizeMB}MB limit for ${platformKey.toUpperCase()}.`,
      };
    }
  }

  return { isValid: true };
}
