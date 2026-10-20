# Integration Matrix

| Integration / Service | Provider | Status | Description |
|---|---|---|---|
| **Identity & Authentication** | Firebase Auth (Google Sign-In) | **Connected & Verified** | Seamless OAuth popup login with Firebase Auth SDK, storing profile records in Firestore. |
| **Cloud Persistence** | Cloud Firestore | **Connected & Deployed** | Real-time database for users, workspaces, posts, and AI drafts with hardened security rules. |
| **AI Content Engine** | Google Gemini API SDK | **Integration-Ready** | Configured via `@google/genai` TypeScript SDK with defensive client limits and mock fallback. |
| **X (Twitter)** | Official v2 API Gateway | **Simulated / Ready** | 280-char enforcement, thread authoring, media upload verification. |
| **LinkedIn** | Official Marketing API | **Simulated / Ready** | 3,000-char enforcement, company page publishing, professional formatting. |
| **Instagram** | Graph API & Reels | **Simulated / Ready** | 2,200-char enforcement, media attachment checks, carousel simulation. |
| **Facebook Pages** | Graph API | **Simulated / Ready** | Community page publishing, extended character bounds. |
| **YouTube Community** | Data API v3 | **Simulated / Ready** | Community post authoring and video asset linking. |
| **TikTok** | Content Posting API | **Simulated / Ready** | Short-form video tags and caption formatting. |
| **Threads** | Threads API | **Simulated / Ready** | 500-char conversational posting. |
| **Pinterest** | Pins API | **Simulated / Ready** | Visual discovery board pinning and destination URLs. |
| **WhatsApp Business** | Cloud API | **Simulated / Ready** | Broadcast lists and direct community messaging. |
| **Google Business Profile** | Business Profile API | **Simulated / Ready** | Local search updates, offers, and store hours. |
| **Bluesky** | AT Protocol | **Simulated / Ready** | Decentralized social publishing with 300-char limits. |
| **Mastodon** | ActivityPub / REST API | **Simulated / Ready** | Fediverse instance publishing with 500-char limits. |
| **Reddit** | OAuth API | **Simulated / Ready** | Subreddit discussion post staging. |
| **Snapchat** | Marketing API | **Simulated / Ready** | Story staging and short-form preview. |
| **Telegram** | Bot & Channel API | **Simulated / Ready** | Channel broadcast dispatch. |
| **Billing & Payments** | Stripe / LemonSqueezy Adapter | **Simulated / Ready** | Central plan registry, annual discount calculation, and coupon discount validation. |
