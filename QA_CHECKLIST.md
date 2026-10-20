# QA Checklist and Verification Audit

## 1. Unit Tests (`node:test`)
- [x] Annual pricing calculation and 20% savings percentage accuracy.
- [x] Coupon discount validation (percentage deduction, fixed deduction, expired coupon rejection).
- [x] Post content character length validation across platforms (X 280, LinkedIn 3000, Instagram 2200, Facebook 63206).
- [x] Zero-channel submission rejection.
- [x] Central plan tier definitions integrity.

## 2. Customer Journeys
- [x] **Journey A (New Customer)**: Landing page → Pricing → Select Plan → Sign Up → Onboarding wizard → Workspace creation → Command Center.
- [x] **Journey B (Free Tier)**: Direct free signup without payment barriers.
- [x] **Journey C (Paid Plan & Trial)**: 14-day trial activation without mandatory credit card.
- [x] **Journey D (Create & Schedule Post)**: Composer channel selection → Live preview update → Validation check → Calendar queue.
- [x] **Journey E (Approval Flow)**: Contributor draft submission → Manager approval queue → Comments → Approval authorization.
- [x] **Journey F (AI Studio)**: Topic & tone parameters → Variant generation → "Send to Composer" seamless transfer.
- [x] **Journey G (Owner Pricing Administration)**: Owner edits tier pricing in `/owner/plans` → Changes synchronize across `/pricing` and `/app/billing`.
- [x] **Journey H (Theme Toggle)**: Instant transition between Dark Mode, Light Mode, and System preferences with persistent localStorage.
