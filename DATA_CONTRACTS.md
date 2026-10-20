# Data Contracts and Service Interfaces

## 1. Domain Types
- `UserProfile`: `uid`, `email`, `displayName`, `photoURL`, `role`, `planId`, `planInterval`, `subscriptionStatus`, `createdAt`
- `Workspace`: `id`, `name`, `slug`, `ownerId`, `timezone`, `memberCount`, `channelsCount`, `isClientWorkspace`
- `SocialPost`: `id`, `workspaceId`, `authorId`, `authorName`, `content`, `channels`, `status` ('draft' | 'needs_review' | 'approved' | 'scheduled' | 'published' | 'failed'), `scheduledAt`, `category`, `mediaUrls`, `metrics`
- `SocialChannel`: `id`, `workspaceId`, `platform`, `accountName`, `accountHandle`, `avatarUrl`, `status`, `followers`, `capabilities`
- `PricingPlan`: `id`, `name`, `tagline`, `monthlyPrice`, `annualPrice`, `channelLimit`, `workspaceLimit`, `teamSeatLimit`, `publishingJobLimit`, `aiCreditsMonthly`, `features`
- `Invoice`: `id`, `number`, `date`, `amount`, `currency`, `status`, `planName`, `billingInterval`
- `ApprovalRequest`: `id`, `postId`, `postContent`, `authorName`, `channels`, `submittedAt`, `status`, `reviewerComments`, `reviewedBy`

## 2. Cloud Firestore Security Architecture
Defined in `firestore.rules` and intermediate representation in `firebase-blueprint.json`:
- Collection `/users/{userId}`: Document owner or admin access only.
- Collection `/workspaces/{workspaceId}`: Restricted to workspace owner or admin.
- Collection `/posts/{postId}`: Scoped to workspace author or admin.
- Collection `/channels/{channelId}`: Restricted to authenticated account holder.
- Collection `/ai_drafts/{draftId}`: Restricted to creating user.
