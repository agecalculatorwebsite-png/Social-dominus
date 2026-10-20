import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  fbSignOut,
  onAuthStateChanged,
  FirebaseUser,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocFromServer,
  onSnapshot,
  collection,
  query,
  where,
  testFirestoreConnection,
} from '../firebase';
import {
  UserProfile,
  Workspace,
  SocialChannel,
  SocialPost,
  AiDraft,
  ApprovalRequest,
  TeamMember,
  Invoice,
  CustomerRecord,
  AuditLogEntry,
  PlanTier,
  BillingInterval,
} from '../types';
import { INITIAL_PLANS, PricingPlan } from '../logic/pricing';

// Seed demonstration data
const DEMO_WORKSPACES: Workspace[] = [
  {
    id: 'ws-main',
    name: 'Social Dominus Media',
    slug: 'social-dominus-media',
    ownerId: 'demo-user-1',
    timezone: 'America/New_York (EST)',
    memberCount: 4,
    channelsCount: 6,
  },
  {
    id: 'ws-agency-1',
    name: 'Nexus Tech Global (Client)',
    slug: 'nexus-tech-global',
    ownerId: 'demo-user-1',
    timezone: 'America/Los_Angeles (PST)',
    memberCount: 2,
    channelsCount: 4,
    isClientWorkspace: true,
    clientName: 'Nexus Tech',
  },
  {
    id: 'ws-creator-labs',
    name: 'Creator Labs Studio',
    slug: 'creator-labs-studio',
    ownerId: 'demo-user-1',
    timezone: 'Europe/London (GMT)',
    memberCount: 3,
    channelsCount: 5,
  },
];

const DEMO_CHANNELS: SocialChannel[] = [
  {
    id: 'ch-twitter',
    workspaceId: 'ws-main',
    platform: 'twitter',
    accountName: 'Social Dominus Official',
    accountHandle: '@socialdominus',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    status: 'connected',
    followers: 48200,
    engagementRate: 4.8,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: true, listening: true },
  },
  {
    id: 'ch-linkedin',
    workspaceId: 'ws-main',
    platform: 'linkedin',
    accountName: 'Social Dominus SaaS',
    accountHandle: 'company/social-dominus',
    avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=100&auto=format&fit=crop&q=80',
    status: 'connected',
    followers: 24300,
    engagementRate: 6.2,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: true },
  },
  {
    id: 'ch-instagram',
    workspaceId: 'ws-main',
    platform: 'instagram',
    accountName: 'socialdominus.app',
    accountHandle: '@socialdominus.app',
    avatarUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80',
    status: 'connected',
    followers: 67100,
    engagementRate: 5.4,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: false },
  },
  {
    id: 'ch-facebook',
    workspaceId: 'ws-main',
    platform: 'facebook',
    accountName: 'Social Dominus Community',
    accountHandle: 'fb.com/socialdominus',
    avatarUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80',
    status: 'connected',
    followers: 18900,
    engagementRate: 3.1,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: true, listening: false },
  },
  {
    id: 'ch-youtube',
    workspaceId: 'ws-main',
    platform: 'youtube',
    accountName: 'Social Dominus Masterclasses',
    accountHandle: '@SocialDominusHQ',
    avatarUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1129f63?w=100&auto=format&fit=crop&q=80',
    status: 'connected',
    followers: 104000,
    engagementRate: 8.7,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: false },
  },
  {
    id: 'ch-tiktok',
    workspaceId: 'ws-main',
    platform: 'tiktok',
    accountName: 'socialdominus_tips',
    accountHandle: '@socialdominus_tips',
    avatarUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    status: 'connected',
    followers: 82500,
    engagementRate: 9.3,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: false },
  },
  {
    id: 'ch-threads',
    workspaceId: 'ws-main',
    platform: 'threads',
    accountName: 'socialdominus.app',
    accountHandle: '@socialdominus.app',
    avatarUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: false },
  },
  {
    id: 'ch-pinterest',
    workspaceId: 'ws-main',
    platform: 'pinterest',
    accountName: 'Social Dominus Inspiration',
    accountHandle: '@socialdominus',
    avatarUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: false, dms: false, listening: false },
  },
  {
    id: 'ch-whatsapp',
    workspaceId: 'ws-main',
    platform: 'whatsapp',
    accountName: 'Dominus VIP Broadcast',
    accountHandle: '+1 (555) 019-2831',
    avatarUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: false, comments: false, dms: true, listening: false },
  },
  {
    id: 'ch-google_business',
    workspaceId: 'ws-main',
    platform: 'google_business',
    accountName: 'Social Dominus HQ (New York)',
    accountHandle: 'Google Maps Business',
    avatarUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: true },
  },
  {
    id: 'ch-bluesky',
    workspaceId: 'ws-main',
    platform: 'bluesky',
    accountName: 'Social Dominus',
    accountHandle: 'socialdominus.bsky.social',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: false },
  },
  {
    id: 'ch-mastodon',
    workspaceId: 'ws-main',
    platform: 'mastodon',
    accountName: 'Dominus Tech',
    accountHandle: '@dominus@fosstodon.org',
    avatarUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: false },
  },
  {
    id: 'ch-reddit',
    workspaceId: 'ws-main',
    platform: 'reddit',
    accountName: 'u/SocialDominusApp',
    accountHandle: 'u/SocialDominusApp',
    avatarUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: true, comments: true, dms: false, listening: true },
  },
  {
    id: 'ch-snapchat',
    workspaceId: 'ws-main',
    platform: 'snapchat',
    accountName: 'dominus_stories',
    accountHandle: 'dominus_stories',
    avatarUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1129f63?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: false, comments: false, dms: false, listening: false },
  },
  {
    id: 'ch-telegram',
    workspaceId: 'ws-main',
    platform: 'telegram',
    accountName: 'Social Dominus News',
    accountHandle: 't.me/socialdominus',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    status: 'not_connected',
    followers: 0,
    engagementRate: 0,
    capabilities: { publishing: true, scheduling: true, media: true, analytics: false, comments: true, dms: false, listening: false },
  },
];

const DEMO_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    workspaceId: 'ws-main',
    authorId: 'demo-user-1',
    authorName: 'Alex Rivera',
    content: 'Unveiling the 2026 SaaS Growth Playbook: How unified social publishing cuts marketing overhead by 40% while doubling cross-channel velocity. Thread below 🧵👇 #SaaS #Growth #Marketing',
    channels: ['twitter', 'linkedin'],
    status: 'published',
    publishedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    category: 'Educational',
    mediaUrls: [],
    metrics: { impressions: 14200, likes: 624, comments: 88, shares: 142, clicks: 531 },
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
  },
  {
    id: 'post-2',
    workspaceId: 'ws-main',
    authorId: 'demo-user-1',
    authorName: 'Alex Rivera',
    content: '5 Lessons from Scaling Content to 10M Impressions: Consistency beats viral spikes every time. Here is the daily scheduling routine our marketing department follows.',
    channels: ['linkedin', 'facebook'],
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 3600 * 1000 * 14).toISOString(),
    category: 'Product Updates',
    mediaUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'],
    aiGenerated: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'post-3',
    workspaceId: 'ws-main',
    authorId: 'demo-user-1',
    authorName: 'Sarah Lin',
    content: 'Excited to announce our new Agency White-Label Analytics dashboard! Multi-brand managers can now generate client-ready PDF and CSV reports in 3 clicks. Try it free today! ✨',
    channels: ['twitter', 'linkedin', 'instagram'],
    status: 'needs_review',
    scheduledAt: new Date(Date.now() + 3600 * 1000 * 36).toISOString(),
    category: 'Promotional',
    mediaUrls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'post-4',
    workspaceId: 'ws-main',
    authorId: 'demo-user-1',
    authorName: 'Marcus Vance',
    content: 'Behind the scenes at Social Dominus design sprints: How we crafted an accessible, high-contrast dark mode for marketing professionals working around the clock.',
    channels: ['instagram', 'tiktok'],
    status: 'draft',
    category: 'Behind the Scenes',
    mediaUrls: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'post-5',
    workspaceId: 'ws-main',
    authorId: 'demo-user-1',
    authorName: 'Alex Rivera',
    content: 'Failed to synchronize with Instagram API due to expired token permissions. Re-authorization required.',
    channels: ['instagram'],
    status: 'failed',
    failureReason: 'OAuth session token expired. Please re-authenticate the Instagram account in Channels.',
    category: 'Educational',
    mediaUrls: [],
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEMO_AI_DRAFTS: AiDraft[] = [
  {
    id: 'aid-1',
    workspaceId: 'ws-main',
    userId: 'demo-user-1',
    topic: 'Announcing our 14-day free trial without credit card',
    platform: 'twitter',
    tone: 'Confident & Engaging',
    result: 'Stop juggling 7 different social tools. With Social Dominus, draft, schedule, collaborate, and track in one crystal-clear workspace.\n\n🚀 14-day full feature trial\n🔒 Zero credit card required\n✨ Unified multi-platform queue\n\nScale your audience today: https://socialdominus.app',
    createdAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
  },
  {
    id: 'aid-2',
    workspaceId: 'ws-main',
    userId: 'demo-user-1',
    topic: 'How agencies save 15+ hours weekly with multi-client workspaces',
    platform: 'linkedin',
    tone: 'Professional & Authoritative',
    result: 'Managing social campaigns across 8 different clients used to mean browser profile chaos and missed approval deadlines.\n\nHere is how modern agencies streamline operations:\n1. Dedicated isolated workspaces per client\n2. Granular role-based approval gates\n3. Client-branded white label PDF analytics\n4. Reusable content libraries\n\nExplore how Social Dominus Agency Tier makes team publishing effortless.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
  },
];

const DEMO_APPROVALS: ApprovalRequest[] = [
  {
    id: 'appr-1',
    postId: 'post-3',
    postContent: 'Excited to announce our new Agency White-Label Analytics dashboard! Multi-brand managers can now generate client-ready PDF and CSV reports in 3 clicks.',
    authorName: 'Sarah Lin',
    authorEmail: 'sarah.lin@nexus.io',
    channels: ['twitter', 'linkedin', 'instagram'],
    scheduledAt: new Date(Date.now() + 3600 * 1000 * 36).toISOString(),
    submittedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    status: 'pending',
  },
];

const DEMO_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Alex Rivera',
    email: 'agecalculator.website@gmail.com',
    role: 'owner',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    assignedWorkspaces: ['ws-main', 'ws-agency-1', 'ws-creator-labs'],
  },
  {
    id: 'tm-2',
    name: 'Sarah Lin',
    email: 'sarah.lin@company.org',
    role: 'editor',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    assignedWorkspaces: ['ws-main'],
  },
  {
    id: 'tm-3',
    name: 'David Zhao',
    email: 'david.zhao@agency.io',
    role: 'contributor',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    assignedWorkspaces: ['ws-agency-1'],
  },
  {
    id: 'tm-4',
    name: 'Elena Rostova',
    email: 'elena@brandlabs.com',
    role: 'analyst',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    status: 'invited',
    assignedWorkspaces: ['ws-main', 'ws-creator-labs'],
  },
];

const DEMO_INVOICES: Invoice[] = [
  {
    id: 'inv-1094',
    number: 'INV-2026-003',
    date: 'Oct 01, 2026',
    amount: 372.0,
    currency: 'USD',
    status: 'paid',
    planName: 'Growth (Annual Plan)',
    billingInterval: 'yearly',
  },
  {
    id: 'inv-1082',
    number: 'INV-2025-012',
    date: 'Oct 01, 2025',
    amount: 372.0,
    currency: 'USD',
    status: 'paid',
    planName: 'Growth (Annual Plan)',
    billingInterval: 'yearly',
  },
];

const DEMO_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust-1',
    name: 'Alex Rivera',
    email: 'agecalculator.website@gmail.com',
    planId: 'growth',
    subscriptionStatus: 'active',
    mrr: 31,
    channelsUsed: 6,
    workspacesCount: 3,
    joinedAt: '2025-10-01',
  },
  {
    id: 'cust-2',
    name: 'Horizon Media Partners',
    email: 'billing@horizonmedia.com',
    planId: 'agency',
    subscriptionStatus: 'active',
    mrr: 99,
    channelsUsed: 38,
    workspacesCount: 9,
    joinedAt: '2026-02-14',
  },
  {
    id: 'cust-3',
    name: 'Venture Pulse LLC',
    email: 'growth@venturepulse.co',
    planId: 'starter',
    subscriptionStatus: 'trialing',
    mrr: 15,
    channelsUsed: 4,
    workspacesCount: 1,
    joinedAt: '2026-10-12',
  },
  {
    id: 'cust-4',
    name: 'Summit Creator Collective',
    email: 'admin@summitcollective.org',
    planId: 'free',
    subscriptionStatus: 'free',
    mrr: 0,
    channelsUsed: 2,
    workspacesCount: 1,
    joinedAt: '2026-09-08',
  },
  {
    id: 'cust-5',
    name: 'Acme Global Marketing',
    email: 'billing@acmeglobal.net',
    planId: 'enterprise',
    subscriptionStatus: 'active',
    mrr: 249,
    channelsUsed: 112,
    workspacesCount: 22,
    joinedAt: '2025-11-20',
  },
];

const DEMO_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-1',
    action: 'Plan Pricing Updated',
    actor: 'Owner (agecalculator.website@gmail.com)',
    category: 'pricing',
    details: 'Growth annual price tuned to $372/yr with 21% calculated customer savings.',
    timestamp: '2026-10-19 14:22',
  },
  {
    id: 'aud-2',
    action: 'Coupon Activated',
    actor: 'Owner',
    category: 'billing',
    details: 'Created coupon LAUNCH25 (25% off all recurring plans).',
    timestamp: '2026-10-18 10:15',
  },
  {
    id: 'aud-3',
    action: 'Workspace Created',
    actor: 'Alex Rivera',
    category: 'system',
    details: 'New client workspace "Nexus Tech Global" provisioned with 4 channel slots.',
    timestamp: '2026-10-15 09:30',
  },
];

interface AppContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  // Auth state
  firebaseUser: FirebaseUser | null;
  userProfile: UserProfile;
  isFirebaseLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Workspaces
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  setCurrentWorkspaceId: (id: string) => void;
  createWorkspace: (name: string, timezone: string, isClient?: boolean) => void;

  // Social channels
  channels: SocialChannel[];
  toggleChannelStatus: (channelId: string) => void;

  // Social posts
  posts: SocialPost[];
  createPost: (post: Omit<SocialPost, 'id' | 'createdAt' | 'updatedAt' | 'workspaceId'>) => Promise<SocialPost>;
  updatePostStatus: (postId: string, status: SocialPost['status']) => void;
  deletePost: (postId: string) => void;

  // AI Content
  aiDrafts: AiDraft[];
  saveAiDraft: (topic: string, platform: string, tone: string, result: string) => void;

  // Approvals
  approvals: ApprovalRequest[];
  reviewApproval: (approvalId: string, status: 'approved' | 'rejected', comments?: string) => void;

  // Team
  team: TeamMember[];
  inviteTeamMember: (name: string, email: string, role: TeamMember['role'], workspaces: string[]) => void;
  removeTeamMember: (id: string) => void;

  // Plans & Pricing (Central registry)
  plans: PricingPlan[];
  updatePlanPrice: (planId: string, monthly: number, annual: number) => void;

  // Invoices & Billing
  invoices: Invoice[];
  subscribeToPlan: (planId: PlanTier, interval: BillingInterval) => void;

  // Owner controls
  customers: CustomerRecord[];
  toggleCustomerSuspension: (customerId: string) => void;
  auditLogs: AuditLogEntry[];
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('sd_theme') as 'light' | 'dark' | 'system';
    return saved || 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sd_theme', theme);
  }, [theme]);

  const setTheme = (t: 'light' | 'dark' | 'system') => {
    setThemeState(t);
  };

  // Firebase auth state
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sd_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      uid: 'demo-user-1',
      email: 'agecalculator.website@gmail.com',
      displayName: 'Alex Rivera',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'owner',
      planId: 'growth',
      planInterval: 'yearly',
      subscriptionStatus: 'active',
      trialEndsAt: undefined,
      createdAt: '2025-10-01',
    };
  });

  // Test Firestore on boot
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Listen to Firebase auth changes & synchronize real-time Firestore collections
  useEffect(() => {
    let unsubs: (() => void)[] = [];

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      setIsFirebaseLoading(false);

      // Clean up previous collection listeners
      unsubs.forEach((unsub) => unsub());
      unsubs = [];

      if (fbUser) {
        // 1. Sync or fetch user profile from Firestore
        const isOwnerAdmin = fbUser.email === 'agecalculator.website@gmail.com';
        const profile: UserProfile = {
          uid: fbUser.uid,
          email: fbUser.email || 'user@example.com',
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Social Dominus Member',
          photoURL: fbUser.photoURL || undefined,
          role: isOwnerAdmin ? 'owner' : 'admin',
          planId: isOwnerAdmin ? 'enterprise' : 'growth',
          planInterval: 'yearly',
          subscriptionStatus: 'active',
          createdAt: new Date().toISOString(),
        };

        setUserProfile(profile);
        localStorage.setItem('sd_user_profile', JSON.stringify(profile));

        // Attempt writing or updating profile in Firestore
        try {
          await setDoc(
            doc(db, 'users', fbUser.uid),
            {
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: profile.displayName,
              photoURL: profile.photoURL || '',
              role: profile.role,
              planId: profile.planId,
              planInterval: profile.planInterval,
              subscriptionStatus: profile.subscriptionStatus,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.warn('Firestore profile sync note:', err);
        }

        // 2. Real-time Firestore sync for Workspaces
        try {
          const wsQuery = query(collection(db, 'workspaces'), where('ownerId', '==', fbUser.uid));
          const unsubWs = onSnapshot(
            wsQuery,
            (snapshot) => {
              const loadedWs: Workspace[] = [];
              snapshot.forEach((docSnap) => {
                loadedWs.push(docSnap.data() as Workspace);
              });
              if (loadedWs.length > 0) {
                setWorkspaces(loadedWs);
                localStorage.setItem('sd_workspaces', JSON.stringify(loadedWs));
              } else {
                // Initialize primary workspace for this user in Firestore
                const initialWs: Workspace = {
                  id: `ws-${fbUser.uid.slice(0, 12)}`,
                  name: `${profile.displayName}'s Workspace`,
                  slug: 'primary-workspace',
                  ownerId: fbUser.uid,
                  timezone: 'America/New_York (EST)',
                  memberCount: 1,
                  channelsCount: 0,
                };
                setDoc(doc(db, 'workspaces', initialWs.id), initialWs).catch(console.warn);
              }
            },
            (err) => console.warn('Firestore workspace sync note:', err)
          );
          unsubs.push(unsubWs);
        } catch (err) {
          console.warn('Workspace query init note:', err);
        }

        // 3. Real-time Firestore sync for Posts
        try {
          const postsQuery = query(collection(db, 'posts'), where('authorId', '==', fbUser.uid));
          const unsubPosts = onSnapshot(
            postsQuery,
            (snapshot) => {
              const loadedPosts: SocialPost[] = [];
              snapshot.forEach((docSnap) => {
                loadedPosts.push(docSnap.data() as SocialPost);
              });
              if (loadedPosts.length > 0) {
                // Sort by createdAt descending
                loadedPosts.sort(
                  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setPosts(loadedPosts);
                localStorage.setItem('sd_posts', JSON.stringify(loadedPosts));
              }
            },
            (err) => console.warn('Firestore posts sync note:', err)
          );
          unsubs.push(unsubPosts);
        } catch (err) {
          console.warn('Posts query init note:', err);
        }

        // 4. Real-time Firestore sync for AI Drafts
        try {
          const draftsQuery = query(collection(db, 'ai_drafts'), where('userId', '==', fbUser.uid));
          const unsubDrafts = onSnapshot(
            draftsQuery,
            (snapshot) => {
              const loadedDrafts: AiDraft[] = [];
              snapshot.forEach((docSnap) => {
                loadedDrafts.push(docSnap.data() as AiDraft);
              });
              if (loadedDrafts.length > 0) {
                setAiDrafts(loadedDrafts);
                localStorage.setItem('sd_ai_drafts', JSON.stringify(loadedDrafts));
              }
            },
            (err) => console.warn('Firestore AI drafts sync note:', err)
          );
          unsubs.push(unsubDrafts);
        } catch (err) {
          console.warn('AI drafts query init note:', err);
        }
      }
    });

    return () => {
      unsubscribeAuth();
      unsubs.forEach((unsub) => unsub());
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setIsFirebaseLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      console.error('Google Sign-In failed:', err);
      alert('Sign-in cancelled or blocked by browser popup setting. Please allow popups.');
    } finally {
      setIsFirebaseLoading(false);
    }
  };

  const signOut = async () => {
    await fbSignOut(auth);
    setFirebaseUser(null);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('sd_user_profile', JSON.stringify(next));
      if (firebaseUser) {
        setDoc(doc(db, 'users', firebaseUser.uid), updates, { merge: true }).catch(console.warn);
      }
      return next;
    });
  };

  // Workspaces state
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    const saved = localStorage.getItem('sd_workspaces');
    return saved ? JSON.parse(saved) : DEMO_WORKSPACES;
  });
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string>(workspaces[0]?.id || 'ws-main');

  const currentWorkspace = workspaces.find((w) => w.id === currentWorkspaceId) || workspaces[0];

  const createWorkspace = async (name: string, timezone: string, isClient?: boolean) => {
    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ownerId: userProfile.uid,
      timezone: timezone || 'America/New_York (EST)',
      memberCount: 1,
      channelsCount: 0,
      isClientWorkspace: isClient,
      clientName: isClient ? name : undefined,
    };
    const next = [...workspaces, newWs];
    setWorkspaces(next);
    localStorage.setItem('sd_workspaces', JSON.stringify(next));
    setCurrentWorkspaceId(newWs.id);

    // Save to Firestore
    if (firebaseUser) {
      try {
        await setDoc(doc(db, 'workspaces', newWs.id), newWs);
      } catch (err) {
        console.warn('Firestore workspace save error:', err);
      }
    }
  };

  // Channels state
  const [channels, setChannels] = useState<SocialChannel[]>(() => {
    const saved = localStorage.getItem('sd_channels');
    return saved ? JSON.parse(saved) : DEMO_CHANNELS;
  });

  const toggleChannelStatus = async (channelId: string) => {
    let updatedCh: SocialChannel | undefined;
    setChannels((prev) => {
      const next = prev.map((ch) => {
        if (ch.id === channelId) {
          const newStatus = ch.status === 'connected' ? 'not_connected' : 'connected';
          updatedCh = {
            ...ch,
            status: newStatus as SocialChannel['status'],
            followers: newStatus === 'connected' && ch.followers === 0 ? 1250 : ch.followers,
          };
          return updatedCh;
        }
        return ch;
      });
      localStorage.setItem('sd_channels', JSON.stringify(next));
      return next;
    });

    if (firebaseUser && updatedCh) {
      try {
        await setDoc(doc(db, 'channels', channelId), {
          id: channelId,
          workspaceId: currentWorkspace.id,
          userId: firebaseUser.uid,
          platform: (updatedCh as SocialChannel).platform,
          accountName: (updatedCh as SocialChannel).accountName,
          accountHandle: (updatedCh as SocialChannel).accountHandle,
          status: (updatedCh as SocialChannel).status,
          connectedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore channel update note:', err);
      }
    }
  };

  // Social posts state
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('sd_posts');
    return saved ? JSON.parse(saved) : DEMO_POSTS;
  });

  const createPost = async (
    newPostData: Omit<SocialPost, 'id' | 'createdAt' | 'updatedAt' | 'workspaceId'>
  ): Promise<SocialPost> => {
    const post: SocialPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      workspaceId: currentWorkspace.id,
      authorId: userProfile.uid,
      authorName: userProfile.displayName,
      authorAvatar: userProfile.photoURL,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: { impressions: 0, likes: 0, comments: 0, shares: 0, clicks: 0 },
    };

    const next = [post, ...posts];
    setPosts(next);
    localStorage.setItem('sd_posts', JSON.stringify(next));

    // Also persist to Firestore if logged in
    if (firebaseUser) {
      try {
        await setDoc(doc(db, 'posts', post.id), {
          id: post.id,
          workspaceId: post.workspaceId,
          authorId: firebaseUser.uid,
          content: post.content,
          channels: post.channels,
          status: post.status,
          category: post.category,
          mediaUrls: post.mediaUrls || [],
          scheduledAt: post.scheduledAt || null,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        });
      } catch (err) {
        console.warn('Firestore post save note:', err);
      }
    }

    return post;
  };

  const updatePostStatus = async (postId: string, status: SocialPost['status']) => {
    const updatedAt = new Date().toISOString();
    setPosts((prev) => {
      const next = prev.map((p) => (p.id === postId ? { ...p, status, updatedAt } : p));
      localStorage.setItem('sd_posts', JSON.stringify(next));
      return next;
    });

    if (firebaseUser) {
      try {
        await updateDoc(doc(db, 'posts', postId), { status, updatedAt });
      } catch (err) {
        console.warn('Firestore post status update note:', err);
      }
    }
  };

  const deletePost = async (postId: string) => {
    setPosts((prev) => {
      const next = prev.filter((p) => p.id !== postId);
      localStorage.setItem('sd_posts', JSON.stringify(next));
      return next;
    });

    if (firebaseUser) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
      } catch (err) {
        console.warn('Firestore post delete note:', err);
      }
    }
  };

  // AI Drafts state
  const [aiDrafts, setAiDrafts] = useState<AiDraft[]>(() => {
    const saved = localStorage.getItem('sd_ai_drafts');
    return saved ? JSON.parse(saved) : DEMO_AI_DRAFTS;
  });

  const saveAiDraft = async (topic: string, platform: string, tone: string, result: string) => {
    const draft: AiDraft = {
      id: `aid-${Date.now()}`,
      workspaceId: currentWorkspace.id,
      userId: userProfile.uid,
      topic,
      platform,
      tone,
      result,
      createdAt: new Date().toISOString(),
    };
    const next = [draft, ...aiDrafts];
    setAiDrafts(next);
    localStorage.setItem('sd_ai_drafts', JSON.stringify(next));

    if (firebaseUser) {
      try {
        await setDoc(doc(db, 'ai_drafts', draft.id), {
          id: draft.id,
          workspaceId: draft.workspaceId,
          userId: firebaseUser.uid,
          topic: draft.topic,
          platform: draft.platform,
          tone: draft.tone,
          result: draft.result,
          createdAt: draft.createdAt,
        });
      } catch (err) {
        console.warn('Firestore AI draft save note:', err);
      }
    }
  };

  // Approvals state
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(() => {
    const saved = localStorage.getItem('sd_approvals');
    return saved ? JSON.parse(saved) : DEMO_APPROVALS;
  });

  const reviewApproval = (approvalId: string, status: 'approved' | 'rejected', comments?: string) => {
    setApprovals((prev) => {
      const next = prev.map((appr) => {
        if (appr.id === approvalId) {
          return {
            ...appr,
            status,
            reviewerComments: comments,
            reviewedBy: userProfile.displayName,
          };
        }
        return appr;
      });
      localStorage.setItem('sd_approvals', JSON.stringify(next));
      return next;
    });
  };

  // Team state
  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('sd_team');
    return saved ? JSON.parse(saved) : DEMO_TEAM;
  });

  const inviteTeamMember = (name: string, email: string, role: TeamMember['role'], assignedWss: string[]) => {
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name,
      email,
      role,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`,
      status: 'invited',
      assignedWorkspaces: assignedWss.length > 0 ? assignedWss : [currentWorkspace.id],
    };
    const next = [...team, newMember];
    setTeam(next);
    localStorage.setItem('sd_team', JSON.stringify(next));
  };

  const removeTeamMember = (id: string) => {
    setTeam((prev) => {
      const next = prev.filter((m) => m.id !== id);
      localStorage.setItem('sd_team', JSON.stringify(next));
      return next;
    });
  };

  // Pricing Plans (Single Source of Truth)
  const [plans, setPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem('sd_plans');
    return saved ? JSON.parse(saved) : INITIAL_PLANS;
  });

  const updatePlanPrice = (planId: string, monthly: number, annual: number) => {
    setPlans((prev) => {
      const next = prev.map((p) => (p.id === planId ? { ...p, monthlyPrice: monthly, annualPrice: annual } : p));
      localStorage.setItem('sd_plans', JSON.stringify(next));
      return next;
    });
  };

  // Invoices & subscriptions
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('sd_invoices');
    return saved ? JSON.parse(saved) : DEMO_INVOICES;
  });

  const subscribeToPlan = (planId: PlanTier, interval: BillingInterval) => {
    const plan = plans.find((p) => p.id === planId) || plans[1];
    const amount = interval === 'yearly' ? plan.annualPrice : plan.monthlyPrice;

    updateUserProfile({
      planId,
      planInterval: interval,
      subscriptionStatus: 'active',
    });

    if (amount > 0) {
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        number: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        amount,
        currency: 'USD',
        status: 'paid',
        planName: `${plan.name} (${interval === 'yearly' ? 'Annual Plan' : 'Monthly Plan'})`,
        billingInterval: interval,
      };
      const nextInvoices = [newInvoice, ...invoices];
      setInvoices(nextInvoices);
      localStorage.setItem('sd_invoices', JSON.stringify(nextInvoices));
    }
  };

  // Owner customer list
  const [customers, setCustomers] = useState<CustomerRecord[]>(() => {
    const saved = localStorage.getItem('sd_customers');
    return saved ? JSON.parse(saved) : DEMO_CUSTOMERS;
  });

  const toggleCustomerSuspension = (customerId: string) => {
    setCustomers((prev) => {
      const next = prev.map((c) => (c.id === customerId ? { ...c, isSuspended: !c.isSuspended } : c));
      localStorage.setItem('sd_customers', JSON.stringify(next));
      return next;
    });
  };

  // Audit Logs
  const [auditLogs] = useState<AuditLogEntry[]>(DEMO_AUDIT_LOGS);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        firebaseUser,
        userProfile,
        isFirebaseLoading,
        signInWithGoogle,
        signOut,
        updateUserProfile,
        workspaces,
        currentWorkspace,
        setCurrentWorkspaceId,
        createWorkspace,
        channels,
        toggleChannelStatus,
        posts,
        createPost,
        updatePostStatus,
        deletePost,
        aiDrafts,
        saveAiDraft,
        approvals,
        reviewApproval,
        team,
        inviteTeamMember,
        removeTeamMember,
        plans,
        updatePlanPrice,
        invoices,
        subscribeToPlan,
        customers,
        toggleCustomerSuspension,
        auditLogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
