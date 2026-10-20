# Social Dominus — Product Specification

## 1. Vision & Architecture
Social Dominus is a commercial-grade social media management SaaS platform built for creators, marketing agencies, and multi-brand enterprises. It addresses cross-platform fragmentation by unifying authoring, queue dispatch, AI content adaptation, and analytics across 15 official social networks:
Facebook, Instagram, X (Twitter), LinkedIn, YouTube, TikTok, Pinterest, Threads, WhatsApp Business, Google Business Profile, Bluesky, Mastodon, Reddit, Snapchat, and Telegram.

## 2. Platform Architecture
- **Public Marketing Website**: Transparent pricing, 15-channel capability matrix, product feature pillars, and conversion onboarding.
- **Customer Application**: Multi-tenant workspace command center with visual planner, smart scheduling queue, multi-platform composer with preview, AI content studio, asset library, unified inbox, and team collaboration with approval workflows.
- **Owner Control Center**: Real-time SaaS administrative portal featuring live MRR/ARR tracking, customer management with suspension controls, central pricing editor (propagates live to public and checkout), coupon manager, and audit logs.
- **Backend & Cloud Persistence**: Integrated with Google Firebase Auth (Google Sign-In) and Cloud Firestore with Attribute-Based Access Control (ABAC) security rules, with clean service boundaries for future server-side schedulers and PocketBase migration.

## 3. Core Personas
1. **Solo Creator / Consultant**: Needs fast multi-platform scheduling, automated queue slots, and AI hook generation.
2. **Growth Marketing Team**: Requires platform-specific variants, brand voice guardrails, and unified cross-channel analytics.
3. **Agencies & Multi-Client Brands**: Needs isolated workspaces, multi-tiered role RBAC (Owner, Admin, Manager, Editor, Contributor, Analyst), approval gates, and white-label branded reports.
