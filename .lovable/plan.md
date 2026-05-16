## Goal

Replace the chat widget's `mailto:` handoff with a real server-sent transcript email, then do a visual QA pass on the widget at mobile (440px) and desktop widths.

## 1. Real email handoff

**Recipient default:** `abby@btymaterial.com` (no staff list provided — easy to add later by editing one constant).

**Sender domain note:** The only verified email domain on this workspace is `notify.photobrief.ai` (from another project). Emails will send from `notify.photobrief.ai` with a friendly From name like `"BTY Helper <helper@notify.photobrief.ai>"`. If you'd rather emails come from a `buytheyard`-branded domain, we'd need to add and verify one — say the word and I'll kick off domain setup instead.

**Flow:**
1. Visitor chats with AI, taps **Talk to Abby**.
2. Inline form appears in the panel: Name, Phone (optional), Email (optional), "What you need" (optional, prefilled). Submitting POSTs the form + full transcript to a new server route.
3. Server route validates with Zod, then enqueues a transactional email to Abby. AI confirms in-chat: "Got it — Abby will follow up shortly."
4. Same form, on success, also clears the panel back to a thank-you state.

**Server-side pieces (auto-set-up via Lovable Emails):**
- Email infrastructure (queue, suppression, etc.) provisioned via the managed setup.
- One transactional template `chat-handoff` rendered as a React Email component: shows visitor name/phone/email/need + a clean transcript block. White body, BTY brand accents.
- One TanStack server route `src/routes/api/public/chat-handoff.ts` (public, Zod-validated, rate-limit-friendly) that calls the internal `send-transactional-email` route using the service role key. Public path is used because the visitor isn't logged in.

**Client-side pieces:**
- New `src/components/chat/HandoffForm.tsx` shown inside the existing panel when "Talk to Abby" is tapped.
- `ChatWidget.tsx`: replace the two `mailto:` anchors with buttons that toggle the handoff form; remove `buildMailto`.

**Recipient config:** single constant `HANDOFF_RECIPIENTS = ["abby@btymaterial.com"]` in the server route — edit the array to add staff later.

## 2. Visual QA pass on the widget

Check at the user's current mobile viewport (440×798) and a desktop width:
- Bubble position / safe-area on mobile (currently `bottom-6 right-6` — verify it doesn't collide with iOS home indicator on smaller phones).
- Panel layout at 440px: header truncation of "BTY Helper", quick-prompt buttons wrapping, composer textarea growing, footer row not overflowing.
- Desktop 380×560 panel: scroll behavior, message bubble max-width, "Talk to Abby" link visibility.
- New handoff form: field stacking, button states (idle / submitting / success / error), keyboard focus.
- Fix any issues found (Tailwind-only tweaks, no behavior changes).

## Files

**New**
- `src/components/chat/HandoffForm.tsx`
- `src/routes/api/public/chat-handoff.ts`
- `src/lib/email-templates/chat-handoff.tsx` (+ register in `registry.ts`)
- `src/lib/email/send.ts` (server-side helper to invoke send-transactional-email with service-role auth)

**Edited**
- `src/components/chat/ChatWidget.tsx` — swap mailto for form toggle, remove `buildMailto`/`ABBY_EMAIL` constants
- `src/lib/email-templates/registry.ts` — register `chat-handoff`

**Auto-managed (don't hand-edit)**
- Email infra migration + queue cron via the email setup tools
- `src/routes/lovable/email/*` server routes scaffolded by the email tools

## Out of scope

- Adding a `buytheyard.com`-branded sender domain (ask if you want this).
- Storing chat history in the database.
- Multi-staff recipient UI — for now it's a one-line array edit.
- Live operator takeover.

Approve to proceed.
