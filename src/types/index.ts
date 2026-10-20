export type Role = 'owner' | 'admin' | 'manager' | 'editor' | 'contributor' | 'analyst';
export type PlanTier = 'free' | 'starter' | 'growth' | 'agency' | 'enterprise';
export type BillingInterval = 'monthly' | 'yearly';
export type SubscriptionStatus = 'free' | 'trialing' | 'active' | 'past_due' | 'cancelled';
export type PostStatus = 'draft' | 'needs_review' | 'approved' | 'scheduled' | 'published' | 'failed' | 'cancelled';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: Role;
  planId: PlanTier;
  planInterval: BillingInterval;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt?: string;
  createdAt?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  timezone: string;
  memberCount: number;
  channelsCount: number;
  isClientWorkspace?: boolean;
  clientName?: string;
}

export interface SocialChannel {
  id: string;
  workspaceId: string;
  platform: string; // 'twitter', 'linkedin', 'instagram', 'facebook', 'youtube', 'tiktok', 'pinterest', 'threads', 'whatsapp', 'google_business', 'bluesky', 'mastodon', 'reddit', 'snapchat', 'telegram'
  accountName: string;
  accountHandle: string;
  avatarUrl: string;
  status: 'connected' | 'not_connected' | 'reauth_required' | 'error';
  followers: number;
  engagementRate: number;
  capabilities: {
    publishing: boolean;
    scheduling: boolean;
    media: boolean;
    analytics: boolean;
    comments: boolean;
    dms: boolean;
    listening: boolean;
  };
}

export interface SocialPost {
  id: string;
  workspaceId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  channels: string[]; // platform ids
  status: PostStatus;
  scheduledAt?: string; // ISO string
  publishedAt?: string;
  category: string;
  mediaUrls: string[];
  aiGenerated?: boolean;
  failureReason?: string;
  metrics?: {
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MediaAttachment {
  id: string;
  file?: File;
  name: string;
  size: number;
  type: string; // e.g. 'image/jpeg', 'video/mp4'
  previewUrl: string;
  storageUrl?: string;
  uploadProgress?: number;
  uploadStatus?: 'ready' | 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

export interface AiDraft {
  id: string;
  workspaceId: string;
  userId: string;
  topic: string;
  platform: string;
  tone: string;
  result: string;
  createdAt: string;
}

export interface ApprovalRequest {
  id: string;
  postId: string;
  postContent: string;
  authorName: string;
  authorEmail: string;
  channels: string[];
  scheduledAt?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewerComments?: string;
  reviewedBy?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
  status: 'active' | 'invited';
  assignedWorkspaces: string[];
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  planName: string;
  billingInterval: BillingInterval;
  pdfUrl?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  planId: PlanTier;
  subscriptionStatus: SubscriptionStatus;
  mrr: number;
  channelsUsed: number;
  workspacesCount: number;
  joinedAt: string;
  isSuspended?: boolean;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  actor: string;
  category: 'billing' | 'pricing' | 'security' | 'user' | 'system';
  details: string;
  timestamp: string;
}
