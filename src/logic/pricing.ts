export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number; // total per year
  isRecommended?: boolean;
  channelLimit: number;
  workspaceLimit: number;
  teamSeatLimit: number;
  publishingJobLimit: number;
  aiCreditsMonthly: number;
  features: string[];
}

export const INITIAL_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Ideal for individuals exploring social automation',
    monthlyPrice: 0,
    annualPrice: 0,
    channelLimit: 3,
    workspaceLimit: 1,
    teamSeatLimit: 1,
    publishingJobLimit: 30,
    aiCreditsMonthly: 20,
    features: [
      'Up to 3 connected channel slots',
      '1 Workspace & 1 User seat',
      'Basic scheduling & calendar queue',
      '20 AI generation credits/mo',
      'Standard media library',
      'Community support',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For individual creators and independent consultants',
    monthlyPrice: 15,
    annualPrice: 144, // $12/mo equivalent
    channelLimit: 5,
    workspaceLimit: 1,
    teamSeatLimit: 1,
    publishingJobLimit: 500,
    aiCreditsMonthly: 100,
    features: [
      'Up to 5 connected channel slots',
      '1 Workspace & 1 User seat',
      '500 Publishing jobs per month',
      '100 AI generation credits/mo',
      'Smart queue & time slots',
      'CSV post export & basic analytics',
      'Email support within 24h',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For high-velocity marketing teams and small agencies',
    monthlyPrice: 39,
    annualPrice: 372, // $31/mo equivalent
    isRecommended: true,
    channelLimit: 15,
    workspaceLimit: 3,
    teamSeatLimit: 3,
    publishingJobLimit: 2000,
    aiCreditsMonthly: 500,
    features: [
      'Up to 15 connected channel slots',
      '3 Workspaces & 3 Team seats',
      '2,000 Publishing jobs per month',
      '500 AI credits & custom Brand Voices',
      'Platform-specific post variants',
      'Approval workflows & internal notes',
      'Advanced cross-channel analytics',
      'Priority support',
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    tagline: 'Multi-client power suite with white-label reporting',
    monthlyPrice: 99,
    annualPrice: 948, // $79/mo equivalent
    channelLimit: 50,
    workspaceLimit: 10,
    teamSeatLimit: 10,
    publishingJobLimit: 5000,
    aiCreditsMonthly: 2000,
    features: [
      'Up to 50 connected channel slots',
      '10 Client workspaces & 10 Seats',
      '5,000 Publishing jobs per month',
      '2,000 AI generation credits/mo',
      'Client approval portal with comment logs',
      'White-label branded PDF/CSV reports',
      'Dedicated account manager',
      '99.9% uptime SLA',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Custom scale, governance, and tailored security for large brands',
    monthlyPrice: 249,
    annualPrice: 2388,
    channelLimit: 200,
    workspaceLimit: 50,
    teamSeatLimit: 50,
    publishingJobLimit: 25000,
    aiCreditsMonthly: 10000,
    features: [
      'Unlimited / 200+ channel slots',
      '50+ Workspaces & custom team roles',
      'Custom publishing and AI throughput',
      'Enterprise SSO & SAML ready',
      'Full audit log & security compliance',
      'Custom API access & webhooks',
      'Dedicated migration specialist',
    ],
  },
];

export function calculateAnnualSavings(monthlyPrice: number, annualPrice: number): {
  monthlyEquivalent: number;
  savingsPercentage: number;
  totalSaved: number;
} {
  if (monthlyPrice <= 0 || annualPrice <= 0) {
    return { monthlyEquivalent: 0, savingsPercentage: 0, totalSaved: 0 };
  }
  const regularAnnualCost = monthlyPrice * 12;
  const totalSaved = Math.max(0, regularAnnualCost - annualPrice);
  const savingsPercentage = Math.round((totalSaved / regularAnnualCost) * 100);
  const monthlyEquivalent = Number((annualPrice / 12).toFixed(2));

  return {
    monthlyEquivalent,
    savingsPercentage,
    totalSaved,
  };
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiresAt?: string;
  applicablePlans?: string[];
}

export function applyCoupon(
  basePrice: number,
  coupon: Coupon,
  planId: string
): { finalPrice: number; discountAmount: number; isValid: boolean; error?: string } {
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) {
    return { finalPrice: basePrice, discountAmount: 0, isValid: false, error: 'Coupon has expired' };
  }
  if (coupon.applicablePlans && !coupon.applicablePlans.includes(planId)) {
    return { finalPrice: basePrice, discountAmount: 0, isValid: false, error: 'Coupon not applicable to this plan' };
  }

  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = (basePrice * coupon.discountValue) / 100;
  } else {
    discountAmount = coupon.discountValue;
  }

  const finalPrice = Math.max(0, Number((basePrice - discountAmount).toFixed(2)));
  return {
    finalPrice,
    discountAmount: Number(discountAmount.toFixed(2)),
    isValid: true,
  };
}

export const PLATFORM_LIMITS: Record<string, { maxChars: number; name: string }> = {
  twitter: { maxChars: 280, name: 'X / Twitter' },
  instagram: { maxChars: 2200, name: 'Instagram' },
  facebook: { maxChars: 63206, name: 'Facebook' },
  linkedin: { maxChars: 3000, name: 'LinkedIn' },
  threads: { maxChars: 500, name: 'Threads' },
  tiktok: { maxChars: 2200, name: 'TikTok' },
  youtube: { maxChars: 5000, name: 'YouTube Community' },
  pinterest: { maxChars: 500, name: 'Pinterest' },
  bluesky: { maxChars: 300, name: 'Bluesky' },
  mastodon: { maxChars: 500, name: 'Mastodon' },
  reddit: { maxChars: 40000, name: 'Reddit' },
  telegram: { maxChars: 4096, name: 'Telegram' },
  whatsapp: { maxChars: 1024, name: 'WhatsApp Business' },
  google_business: { maxChars: 1500, name: 'Google Business Profile' },
  snapchat: { maxChars: 250, name: 'Snapchat' },
};

export function validatePostContent(content: string, platforms: string[]): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!content || content.trim().length === 0) {
    errors.general = 'Post content cannot be empty';
    return { isValid: false, errors };
  }

  if (platforms.length === 0) {
    errors.platforms = 'Please select at least one social channel';
    return { isValid: false, errors };
  }

  for (const plat of platforms) {
    const limitInfo = PLATFORM_LIMITS[plat];
    if (limitInfo && content.length > limitInfo.maxChars) {
      errors[plat] = `Content exceeds ${limitInfo.name} limit (${content.length}/${limitInfo.maxChars} chars)`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
