# Plan: AI chat with email-to-human handoff

A small chat bubble sits in the bottom-right corner of every page. The AI always answers first using context about Buy The Yard's products, prices, delivery policy, hours, service area, and active promos. Any time the visitor wants a real person, they tap **"Talk to Abby"** — the conversation transcript (plus their name/phone/email) gets emailed to Abby and her staff, and the AI tells the visitor she'll follow up. No accounts, no database for chat history.

## How it behaves

1. Visitor opens the chat bubble → sees a short welcome from "BTY Helper" with a couple suggested quick prompts ("How much is mulch?", "Do you deliver to Holden?", "What time are you open Saturday?").
2. Visitor types → AI streams a reply. AI is grounded in the site's real data, not free-form invention. If asked something it doesn't know (e.g. "is item X in stock today?"), it says so and offers the handoff.
3. At any point the visitor can click **Talk to Abby** in the chat header.
   - Inline form appears: name, phone (required), email (optional), short note (prefilled with last question).
   - On submit: transcript + form details are emailed to Abby + staff. The AI confirms in chat: "Thanks — Abby or one of the team will get back to you at <phone>. We're open Mon–Fri 8–5."
4. Chat lives in the browser tab only. Refresh = new conversation. No DB.

## Knowledge the AI is given (server-side system prompt + tools)

Built from the existing source files so it always matches the site:

- **Products & pricing** — categories, per-yard ranges, playground-chip specs, garden-center items pulled from `src/data/products.ts` + `categoryPricing`.
- **Delivery & pickup policy** — driveway-to-curbline, 1-yard minimum, 48-hour lead time, same-day if called before noon, 4% card fee. Sourced from `src/routes/delivery.tsx` copy.
- **Hours & location** — seasonal hours, Jefferson MA address, winter salt by-appointment rule. From the footer/about copy.
- **Service area** — Central Mass towns list from `src/routes/service-area.tsx`.
- **Active promos** — Mother's Day baskets and May WooSox raffle. Stored as a small editable array in `src/data/promos.ts` so Abby (or me) can update without touching prompt strings.

The AI is told to: keep replies short, never invent prices, always offer the phone number (508-579-9897) for anything time-sensitive, and recommend the handoff if the visitor wants a quote, scheduling, or out-of-stock confirmation.

## Files I'll add / change

**New**
- `src/data/promos.ts` — editable list of active promos with title, body, dates.
- `src/lib/ai-gateway.ts` — provider helper for Lovable AI Gateway.
- `src/lib/bty-knowledge.ts` — server-only builder that compiles products, policies, hours, service area, and promos into the system prompt.
- `src/routes/api/chat.ts` — TanStack server route. Streams AI replies via `streamText` + `toUIMessageStreamResponse`. Uses `google/gemini-3-flash-preview`.
- `src/routes/api/chat-handoff.ts` — server route. Validates name/phone/email/note + transcript with Zod, then sends one email via Lovable Emails to the recipient list.
- `src/components/chat/ChatWidget.tsx` — floating bubble + panel. Built on AI Elements (`Conversation`, `Message`, `MessageResponse`, `PromptInput`, `PromptInputTextarea`, `PromptInputFooter`, `PromptInputSubmit`, `Shimmer`). Uses `useChat` with `DefaultChatTransport({ api: "/api/chat" })`.
- `src/components/chat/HandoffForm.tsx` — inline form rendered inside the chat panel when the user clicks "Talk to Abby".
- `src/assets/chat-bty-mark.svg` — small BTY-styled chat icon (not the generic Sparkles).

**Changed**
- `src/routes/__root.tsx` — mount `<ChatWidget />` once so it appears sitewide.
- `package.json` — add `ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible`, `zod` if missing, plus AI Elements components installed via the AI Elements CLI (`conversation message prompt-input shimmer`).

## Prerequisites I'll set up

1. **Enable Lovable Cloud** — required for Lovable Emails (the transcript send) and for `LOVABLE_API_KEY` provisioning. No database tables are created for chat.
2. **Set up an email sender domain** via the email-setup dialog. Sender will be something like `chat@notify.btymaterial.com` once DNS verifies; can scaffold and stream chat immediately while DNS finishes.
3. **Recipient list** — I'll add a server constant `HANDOFF_RECIPIENTS` defaulting to `abby@btymaterial.com`. You tell me the staff emails to add (or leave it as just Abby for now).

## Visual & UX details

- Bubble: 56px circle, brand orange, mulch-pile / BTY mark icon, bottom-right with 24px margin. Hidden on print.
- Panel: 380px wide, ~560px tall on desktop; full-width sheet on mobile (≤640px). Rounded, ring-1, `bg-surface` header with brand accent, white message area.
- Assistant messages: no bubble background, plain text on white. User messages: filled `bg-brand text-brand-foreground` bubble.
- Typing indicator: "BTY Helper is thinking…" shimmer while `status === "submitted"`.
- Header right-side menu: **Talk to Abby** button (opens handoff form), **New chat** button (resets local messages).
- Composer: single textarea + right-aligned send button inside `PromptInputFooter`. Disabled while streaming. Auto-focused on open.
- Markdown rendering via `MessageResponse` for assistant replies (lists, bold, links).

## Out of scope (call-outs)

- **No live operator dashboard.** Staff are reached by email + phone, not by logging into a chat console. (Building that is a bigger project — I can plan it separately if you want it later.)
- **No conversation history across sessions.** Refreshing the page starts a fresh chat.
- **No SMS.** Handoff is email-only. Could be added with Twilio later.
- **No analytics on chat.** Can wire usage counts to Lovable Cloud later if useful.

## Cost note

Each AI reply uses Lovable AI credits (Gemini 3 Flash preview is the cheapest capable option; defaults to that). Email sends use the Lovable Emails queue with retry safety, free for normal volumes.

---

If this looks right, I'll execute: enable Cloud, kick off the email-domain setup dialog, then build the widget and routes. If you want to change the recipient list, the handoff button label, or use a different model (e.g. GPT-5-mini for higher-quality replies), say so and I'll fold it in before I start.
