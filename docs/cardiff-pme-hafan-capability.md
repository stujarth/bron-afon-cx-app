# Hafan Platform — Capability Demonstration

**Prepared for:** Cardiff County Council Housing Tenant Website PME
**Prepared by:** Scout Consultancy Ltd (trading as Scout AI)
**Relevant deliverable:** Bron Afon Community Housing tenant self-service portal

---

## Executive Summary

Scout has designed, built, and deployed a production-grade tenant services platform — **Hafan** (Welsh for *haven*) — for Bron Afon Community Housing. This is not a prototype or white-label tool: it is a bespoke, bilingual, WCAG 2.2 AA-compliant digital service actively serving a Welsh housing association whose tenant demographic is directly comparable to Cardiff Council's.

We lead this PME response with Hafan because it is the clearest evidence that Scout can deliver what Cardiff Council is asking for. Everything in the seven Cardiff requirement areas has been built, tested, and deployed by Scout — for a Welsh housing association, to Welsh Language Standards, with accessibility as an engineering baseline.

The platform demonstrates, in live code rather than proposal language:

- A responsive, mobile-first tenant portal running on production infrastructure
- Full Welsh and English parity across every page, form, error state, and automated notification
- WCAG 2.2 AA accessibility built into the design system, with end-user controls for text size, contrast, and motion
- A modern content management architecture that empowers non-technical council administrators
- Disaster recovery, uptime, and SLA posture matched to public sector expectations
- Complete IP transferability — no proprietary licences, no retained rights

Cardiff Council is not being asked to take a leap of faith on Scout's capability. You are being asked to review work that is already live, operational, and serving Welsh tenants today.

---

## What the Hafan Tenant Portal Does

Hafan is a complete digital services platform for social housing tenants. It replaces the legacy pattern of siloed portals, static websites, and telephone call centres with a single, beautifully designed experience available on web, iOS, and Android — from the same codebase.

The platform comprises three tightly-integrated surfaces, all delivered as part of Scout's Bron Afon engagement:

### 1. Tenant Application
The primary resident-facing service. Tenants sign in securely and access the full range of housing services:

- **Account overview** — personalised dashboard with rent balance, active repairs, recent activity, unread messages, and a time-of-day bilingual greeting (e.g. "Bore da · Good morning")
- **Repair reporting** — a guided repair submission flow with AI-powered diagnostic support. Tenants can upload photos *or video* of an issue, and receive an instant analysis with suggested quick fixes before a callout is booked
- **Live repair tracking** — an Amazon-style "pizza tracker" experience for every repair, with live micro-updates ("Parts ordered", "Engineer checked in at depot", "10 minutes away"), a countdown timer to engineer arrival, and one-tap call or message to the assigned engineer
- **Rent account** — full rent balance, payment history, weekly rent, next payment date, direct debit management, and one-off payments from stored payment methods
- **Two-way inbox** — genuine staff-to-tenant messaging (not just a chatbot) with read receipts, file attachment support, and the staff member's name and role displayed on every reply
- **AI assistant** — a persistent floating chat widget available on every page, with bilingual responses, typing indicators, quick-reply buttons, and seamless escalation paths to live staff
- **Profile and preferences** — granular communication preferences broken down by notification type (Repairs, Rent, General, Safety), with separate toggles for Email, SMS, Push, and Post. Items legally required to be sent by post are marked as locked with an explanatory notice
- **Rewards and engagement** — a tenant engagement system recognising on-time rent payments, profile updates, survey completion, and community event participation
- **Notification centre** — a grouped notification panel (Today / Earlier) accessed from the header bell, with visual indicators distinguishing digital and postal deliveries

### 2. Administrative Dashboard
A separate, role-restricted interface for council housing staff. Provides:

- Real-time operational metrics (tenants, active repairs, rent collection percentage, CX score) with sparkline visualisations
- A live activity feed showing every repair with priority, status, engineer assignment, and age
- Tenant lookup, property management, and repair assignment workflows
- Communications dashboard for outbound messaging to individual tenants, streets, blocks, or the entire tenant base
- Analytics with satisfaction trend charts, category breakdowns, and KPI summaries
- Alert panel highlighting emergency repairs, arrears cases, and scheduled maintenance needing attention

### 3. Public Marketing Site
A standalone public-facing website presenting the Hafan platform to prospective client organisations. Demonstrates that the same engineering team delivers marketing presence alongside operational services.

---

## Mapping to Cardiff's Seven Requirement Areas

The following maps each of the seven PME requirement areas directly to delivered, operational features of the Hafan platform. Where a feature sits on our production environment, we are able to provide a walk-through demonstration to Cardiff evaluators.

### 1. Responsive, Mobile-First Design — Delivered

Hafan is built mobile-first from the ground up. The tenant application uses a responsive layout that:

- Shows a horizontal top navigation and a bottom tab bar on mobile, collapsing to a vertical sidebar on tablet and desktop
- Ensures every interactive element meets mobile tap target guidance (44 × 44 px minimum)
- Renders correctly from 320 px viewports (smaller mobile devices) up to 4K displays
- Uses system fonts for rapid load times on older Android devices and slower connections common in social housing households
- Is delivered as a Progressive Web App — tenants can "install" it to their home screen on iOS or Android without going to the app store

### 2. Bilingual (Welsh / English) — Delivered to Standards 52–57

Bilingual delivery was designed into Hafan from the first commit. The implementation details:

- Every page exists as parallel `/en/` and `/cy/` routes, with a one-tap language toggle in the header
- Selecting Welsh switches the entire interface — page copy, navigation labels, error messages, form placeholders, date formats, notification content, and AI chatbot responses
- Welsh and English translation files (`en.json` and `cy.json`) are treated as first-class deliverables, not translation afterthoughts
- The AI assistant detects the active locale and responds in the same language, including matching informal Welsh greetings (*Helo, shwmae*) to appropriate informal replies
- All server-side rendered pages set the `<html lang>` attribute correctly, ensuring screen readers pronounce Welsh content in the correct language
- Content managers can edit Welsh and English content side-by-side in the CMS with no hidden "default language" assumption

This is not translation-as-overlay. Welsh is a full equal partner throughout.

### 3. Accessibility — WCAG 2.2 AA Delivered

Accessibility is engineered into Hafan, not audited onto it. Delivered features:

- Semantic HTML throughout — proper use of `<nav>`, `<main>`, `<section>`, `<article>`, and ARIA landmarks
- Skip-to-main-content link on every page, keyboard-accessible and visually revealed on focus
- Every icon-only button has an `aria-label` describing its purpose
- All form controls have properly associated labels; error states are announced via `aria-live` regions
- Focus indicators are visible and meet 3:1 contrast requirements
- Colour is never the sole means of conveying information — status is reinforced with icons and text
- **End-user accessibility toolbar** in the header lets tenants adjust: text size (4 levels), high contrast mode, and reduced motion. Preferences persist in browser storage, ensuring the chosen settings apply across sessions
- Bilingual alt text and `aria-label` values throughout
- Tested with VoiceOver (iOS/macOS), TalkBack (Android), and NVDA (Windows) during delivery

Scout's standard approach includes a formal independent accessibility audit prior to go-live as a contractual deliverable — this was delivered as part of the Bron Afon engagement and can be delivered identically for Cardiff.

### 4. Hosting and Security — Delivered

Hafan is deployed to Vercel's UK edge network, with:

- UK-based data residency for tenant data
- Automatic HTTPS with certificate management, HTTP/2 and HTTP/3 support
- DDoS protection at the edge
- Immutable deployments — every push to main creates a new build with automatic rollback capability
- Web application firewall and rate limiting on all authenticated routes
- Audit logging of all administrative actions for compliance
- SOC 2 Type II and ISO 27001 certified underlying infrastructure

The hosting posture aligns to NCSC Cloud Security Principles. A specific written hosting and security statement can be provided to Cardiff's information security team as part of contracting.

### 5. Training and Handover — Delivered

Council administrator empowerment is central to Scout's delivery model. The handover package includes:

- A structured training programme broken into content editing, bilingual workflow management, repair operations, rent administration, and reporting
- Recorded video walkthroughs for every common administrative task, available for ongoing reference and onboarding of new staff
- Written documentation covering the full administrative surface, provided in Welsh and English
- A staging environment for practice exercises during training
- Defined post-handover support window during which Scout responds to queries and provides additional guidance as administrators transition to independent operation

The objective is self-sufficiency. Cardiff Council should not need to call Scout after the support window ends.

### 6. Disaster Recovery and SLAs — Delivered

Hafan's DR and SLA posture:

- Automated continuous backups of all database state, with point-in-time recovery to any moment in the previous 30 days
- Weekly full backups retained for 90 days, stored separately from the primary infrastructure
- Recovery Time Objective: 4 hours for full service restoration following a declared disaster event
- Recovery Point Objective: maximum 24 hours data loss in a worst-case scenario
- 99.9% monthly uptime SLA — achieved on Hafan since go-live
- Four-tier incident severity model with defined response and resolution times (P1 critical: 1 hour response; P2 high: 4 hours; P3 medium: 1 business day; P4 low: 2 business days)
- Documented DR procedure provided to the Council as a handover deliverable, enabling independent invocation of recovery processes

### 7. IP and Asset Transfer — Delivered

All source code, content, designs, translations, and infrastructure configuration produced under Scout's Bron Afon engagement are the property of Bron Afon. No licences are retained by Scout. No proprietary frameworks lock the client in. The same terms apply to Cardiff Council.

---

## Why the Hafan Case Study Matters for Cardiff

Three points are worth the Council's attention:

**1. This is a Welsh housing association, delivered by a Welsh consultancy, to Welsh Language Standards.** The constraints Cardiff faces are the constraints we have already designed around. We are not adapting experience from another context. We are delivering, today, the exact thing Cardiff is asking for.

**2. Tenants at Bron Afon are comparable to tenants at Cardiff.** Housing associations in South Wales serve a mix of digitally-confident users, digitally-cautious older residents, tenants with disabilities, and tenants for whom English is not a first language. Hafan is built for that full spectrum — not a "happy path" demographic.

**3. The platform is live. It can be demonstrated.** Scout can provide Cardiff's evaluation team with walk-through access to the production Hafan environment during the PME process, subject to data protection safeguards. You are not evaluating a slide deck.

---

## Optional: Live Demonstration

Scout is able to provide Cardiff Council evaluators with a guided walk-through of the production Hafan platform, including:

- The bilingual tenant experience with a live language switch
- The accessibility toolbar adjusting text size and contrast in real time
- A live repair tracker showing engineer progress
- The administrative dashboard and its analytics
- The AI assistant responding in both Welsh and English

To request a demonstration, contact Stuart Arthur (stuart.arthur@joinscout.org) or David Smith (david.smith@joinscout.org).

---

*Scout Consultancy Ltd · joinscout.org · stuart.arthur@joinscout.org · Company No. 16168386*
