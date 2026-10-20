# Known Limitations and Production Roadmap

1. **Background Job Runner / Cron Scheduler**: Scheduled post dispatch currently operates client-side and is persisted to Cloud Firestore. For true unauthenticated background publishing when the browser tab is closed, a server-side cron scheduler or Google Cloud Tasks worker is required.
2. **Third-Party Platform OAuth Approvals**: The 15 social network gateways currently utilize authenticated simulated handshakes. Production activation requires approved Developer App credentials and verified OAuth callback endpoints from Meta (Facebook/Instagram/Threads), X Developer Portal, Google Cloud, LinkedIn Marketing Solutions, ByteDance (TikTok), and Pinterest Developers.
3. **Payment Processor Webhook Listener**: The billing and coupon subsystem uses an authoritative central state model. Connecting live merchant accounts (Stripe, LemonSqueezy, or Paddle) requires configuring server-side webhook signing secrets in production.
4. **Permanent File Storage**: Media attachments are currently served via verified CDN visual assets and Firestore metadata. Production file uploads will bind directly to Firebase Storage or PocketBase file storage buckets.
