# Security Specification for Social Dominus

## 1. Data Invariants
1. A User document at `/users/{userId}` can only be created and updated by the authenticated user whose `request.auth.uid == userId` with `email_verified == true`.
2. A user cannot elevate their own role to 'admin' or 'owner' without admin privileges.
3. A Post document must have `authorId == request.auth.uid` upon creation.
4. Posts can only be read or written by authenticated users in their workspace.
5. Channels must belong to the user's workspace with `userId == request.auth.uid`.
6. AI Drafts must have `userId == request.auth.uid`.
7. Admins (bootstrapped with `agecalculator.website@gmail.com`) have administrative oversight for moderation and support.
8. Catch-all rule denies any unauthorized document path.

## 2. The Dirty Dozen Payloads
1. **Ghost Field Injection**: User update payload containing `{ "isAdmin": true, "extraField": "malicious" }` -> DENIED via `hasOnly()`.
2. **Identity Spoofing**: User A attempts to write `/users/userB` -> DENIED.
3. **Unverified Email**: User with `email_verified == false` attempts write -> DENIED.
4. **Post Author Spoofing**: User creates post with `authorId: "victimUid"` -> DENIED.
5. **ID Poisoning**: Document creation with 5KB string as ID -> DENIED via `isValidId()`.
6. **Denial of Wallet String Bomb**: Content payload exceeding 10,000 characters -> DENIED via `size() <= 10000`.
7. **Cross-Tenant Post Deletion**: User deletes post from another user's workspace -> DENIED.
8. **Channel Stealing**: User attempts to update channel `userId` to take over connected credentials -> DENIED via immutable `userId`.
9. **Blanket Query Scraping**: Unauthorized client queries all users without `uid == request.auth.uid` -> DENIED.
10. **State Skipping**: Non-authorized role changing post from `draft` to `published` -> DENIED.
11. **Timestamp Tampering**: Client supplying future timestamp instead of `request.time` -> DENIED.
12. **Unauthenticated Access**: Guest accessing `/workspaces/{workspaceId}` or `/posts/{postId}` -> DENIED.
