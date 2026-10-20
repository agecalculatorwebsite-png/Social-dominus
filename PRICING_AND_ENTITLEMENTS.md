# Pricing and Entitlements Configuration

## 1. Central Pricing Registry
All plan parameters are centralized in `src/logic/pricing.ts` and managed in real-time via `src/features/owner/OwnerPlansView.tsx`. When edited by the authorized owner, changes immediately reflect across public pricing and customer checkout.

| Tier | Monthly Price | Annual Price | Annual Savings | Channel Slots | Workspaces | Team Seats | AI Monthly Credits |
|---|---|---|---|---|---|---|---|
| **Free** | $0/mo | $0/yr | $0 (Free) | 3 | 1 | 1 | 20 |
| **Starter** | $15/mo | $144/yr | $36 saved (20%) | 5 | 1 | 1 | 100 |
| **Growth** | $39/mo | $372/yr | $96 saved (21%) | 15 | 3 | 3 | 500 |
| **Agency** | $99/mo | $948/yr | $240 saved (20%) | 50 | 10 | 10 | 2,000 |
| **Enterprise** | $249/mo | $2,388/yr | $600 saved (20%) | 200+ | 50 | 50 | 10,000 |

## 2. 14-Day Zero-Risk Trial
- Applies to all paid tiers (Starter, Growth, Agency).
- Zero credit card required upfront.
- Unconstrained access to scheduled slots and AI generation during the evaluation period.
