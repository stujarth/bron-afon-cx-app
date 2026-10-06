# Demo run sheet: "Report damp or mould"

Under 10 minutes. The demo shows an idea becoming a user story, then a ticket, tested code, a deployment, live data and finally an insight report, with Claude doing the heavy lifting and a human approving each step.

> **Accuracy note for the talk:** Awaab's Law (in force from 27 Oct 2025) applies to social landlords in **England**. The Welsh Government has consulted on equivalent duties. In this prototype, Bron Afon adopts the same timescales as a *service commitment*:
> - emergency: 24 hours
> - significant hazard: investigate within 10 working days
> - other damp and mould: 20 working days
>
> Say "Awaab's Law-style timescales", not "required by law in Wales".

## Pre-flight (the morning of the talk)

- [ ] **Re-seed the data.**
  - Supabase SQL editor (project `bron-afon-demo`): run `supabase/seed.sql`.
  - Or ask Claude: *"Run supabase/seed.sql against bron-afon-demo"*.
- [ ] **Check the deployed app.**
  - Vercel → tenant project → Settings → Environment Variables. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` must be set for Production and Preview.
  - `DAMP_REPORTS_MOCK` must **not** be set there.
- [ ] **Warm up the site.** Open the production URL and the PR preview URL once each so the first load on stage is fast.
- [ ] **Check the connectors.** In Claude, make sure the GitHub, Supabase and Vercel connectors are signed in.
- [ ] **Set up the laptop.**
  - Browser zoom at 125%.
  - Notifications off.
  - Tabs open in this order: Slides → Claude → GitHub PR → Vercel → app → Claude (data).
- [ ] **Have the fallbacks ready.**
  - `docs/demo/screenshots/` is open in a tab.
  - The pre-generated report artifact link is bookmarked.

## Beats

| Time | Beat | Screen | Live or fallback |
|---|---|---|---|
| 0:00 | The problem: damp and mould, Awaab's Law, Bron Afon's ~8,000 homes in Torfaen | Slide | — |
| 1:00 | **Story → ticket.** Paste prompt 1. Claude writes the story and Gherkin acceptance criteria, then creates the GitHub issue | Claude + GitHub | Live. Fallback: the pre-made issue |
| 2:30 | **Code + tests.** Open the PR. Show: <br>• the diff (`repairs/damp-mould/`) <br>• unit tests <br>• Playwright e2e on desktop and mobile <br>• the **axe accessibility scan** <br>• green CI <br>• the before/after rebrand screenshots in the PR body | GitHub PR | Pre-staged |
| 4:00 | **Deploy.** Merge the PR. Vercel builds and promotes to production | Vercel | Live. Fallback: the preview URL |
| 5:00 | **Use it.** Report as a tenant: <br>• Bedroom + Living room <br>• Widespread <br>• More than 3 months <br>• Yes (vulnerable) <br>• "Black mould across two walls of the baby's room, and our son has asthma." <br>Result: an **emergency** with a reference `DM-2026-xxxx`. Switch to **Cymraeg** to show the Welsh version | App (mobile view) | Live |
| 6:30 | **Ask the data.** Paste prompts 2–4. Claude queries Supabase and builds a board report. Point out that the report you just submitted is in the data | Claude | Live. Fallback: the pre-generated report |
| 9:00 | Wrap: what took a sprint now takes a morning, and a human approved every gate (story, PR review, merge, report) | Slide | — |

## Prompts to paste

**1. Story and ticket**

> We're Bron Afon Community Housing. Write a user story for tenants reporting damp and mould in the tenant portal, with Gherkin acceptance criteria. Cover: rooms affected, severity with plain-English guidance, how long it's been noticed, a flag for vulnerable occupants (young children, over-65s, pregnancy, respiratory/heart conditions), and a reference number plus an inspection date on submit. Use Awaab's Law-style timescales: 24h for emergencies, 10 working days for significant hazards, 20 for routine. Then create it as a GitHub issue in stujarth/bron-afon-cx-app with labels `feature` and `tenant-portal`.

**2. Overview**

> Using the Supabase project bron-afon-demo, look at the damp_mould_reports table. Give me the headline picture: volume by month, which wards have the most reports per year, and how many reports breached their inspection deadline.

**3. Dig in**

> Which properties have reported damp three or more times? What do they have in common: ward, wall type, build year, root cause? What did fixing them cost compared with homes that were fixed first time?

**4. Board report**

> Turn this into a one-page board report for Bron Afon's Board: key numbers, two charts (monthly reports with deadline breaches, and the ward breakdown), the top three risks, and three recommendations with rough costs. Publish it as an artifact I can show on screen.

## What the data will show (so you can narrate confidently)

The seed is deterministic: `supabase/scripts/generate-seed.mjs` generates 450 fictional reports from Oct 2024 to Sep 2026.

- **Winter peaks.** Each month from December to February has about 4× the reports of a summer month (May to August).
- **Hotspots.**
  - **Trevethin**: 1960s system-built flats.
  - **Blaenavon**: pre-1919 solid-wall terraces.
  - Between them they account for over half of all reports and about 70% of deadline breaches. Their breach rates are 35–42%; St Dials is next at about 29%, and most other wards are under 20%.
- **Repeat reports.** 43 homes have 3 or more reports. They are mostly solid-wall or system-built, with penetrating damp and rising damp the most expensive root causes. This supports the argument for planned fabric investment instead of repeated reactive treatment.
- **Phone vs portal.** Phone-reported cases breach their deadline about 34% of the time, against about 24% for portal reports. This is a channel-shift argument for the new form.

### Dry-run results (6 Oct 2026, against `bron-afon-demo`)

Prompts 2–4 were dry-run against the live database. The answers Claude should arrive at:

| Question | Answer |
|---|---|
| Total reports / missed deadlines | 450 / 131 (29%); last 12 months 30%, prior 12 months 28%, so no improvement |
| Winter (Dec–Feb) | 103 of the 131 misses; 54% missed in Dec–Feb vs 11% the rest of the year |
| Trevethin + Blaenavon | 55% of reports, 73% of misses, 60% of the £786k spend |
| Homes with 3+ reports | 43 homes, 169 reports, £302k; £7,027 per home vs £1,600 for homes fixed first time |
| Costliest causes | Rising damp ~£5,100/job, penetrating damp ~£3,900, condensation ~£800 |
| Emergencies | 39, of which 5 missed the 24h deadline, all in Dec–Feb |

Backup board report (prompt 4 fallback): https://claude.ai/artifact/HhCBWjjMjhdwe8CZXmSC3k. It's private; share it from its Share menu if anyone else needs it.

## Fallbacks

| If… | Do this |
|---|---|
| Issue creation hangs | Open the pre-made issue |
| CI still running | Show the last green run on the PR's Checks tab |
| Vercel build slow | Use the PR preview URL; it's the same build |
| Form submit fails (Supabase down) | The form shows a friendly error with the phone number, which is a good accessibility talking point. Then show `screenshots/after-damp-done-desktop.png` |
| Claude query slow or wrong | Open the [pre-generated board report](https://claude.ai/artifact/HhCBWjjMjhdwe8CZXmSC3k) |

## Reset after the talk

- Re-run `supabase/seed.sql`. This clears demo submissions and resets the reference sequence.
- Pause the `bron-afon-demo` Supabase project if you don't need it, to stop the Pro compute charge.
