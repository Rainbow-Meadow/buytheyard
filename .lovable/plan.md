## Goal
Remove the Ask BTY chat tool end-to-end — the floating launcher, the chat panel, and its server endpoint.

## Changes

1. **`src/routes/__root.tsx`** — remove the `ChatLauncher` import and the `<ChatLauncher />` render (line 14 and line 271).
2. **Delete files**
   - `src/components/chat/ChatLauncher.tsx`
   - `src/components/chat/ChatWidget.tsx`
   - `src/components/chat/` (empty afterward — remove the folder)
   - `src/routes/api/chat.ts` (server route powering the chat)
   - `src/lib/bty-knowledge.server.ts` (system prompt only consumed by the chat route)

## Verification
- Grep for `ask.?bty`, `ChatLauncher`, `ChatWidget`, `bty-knowledge`, `/api/chat` to confirm no stragglers.
- Build passes; preview no longer shows the floating "Ask BTY" pill.

## Notes
- No other component references these files, so removal is clean.
- If a `LOVABLE_API_KEY` was added solely for this chat, it can stay (harmless) or be deleted later — not part of this change.