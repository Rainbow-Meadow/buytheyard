import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, Phone, X } from "lucide-react";

const transport = new DefaultChatTransport({ api: "/api/chat" });
const ABBY_EMAIL = "abby@btymaterial.com";

function getText(m: UIMessage): string {
  return m.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");
}

function buildMailto(messages: UIMessage[]): string {
  const transcript = messages
    .map((m) => `${m.role === "user" ? "Visitor" : "BTY Helper"}: ${getText(m)}`)
    .join("\n\n");
  const body = encodeURIComponent(
    `Hi Abby,\n\nI was chatting with BTY Helper on your site and would like to follow up.\n\n— My name:\n— Best phone:\n— What I need:\n\n---\nChat transcript:\n${transcript || "(no messages yet)"}`,
  );
  const subject = encodeURIComponent("Question from buytheyard.lovable.app");
  return `mailto:${ABBY_EMAIL}?subject=${subject}&body=${body}`;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
  });

  // Focus input on open
  useEffect(() => {
    if (open) requestAnimationFrame(() => taRef.current?.focus());
  }, [open]);

  // Scroll on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const isLoading = status === "submitted" || status === "streaming";

  async function handleSubmit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage({ text: trimmed });
    requestAnimationFrame(() => taRef.current?.focus());
  }

  const quickPrompts = [
    "How much is a yard of mulch?",
    "Do you deliver to Holden?",
    "What are your Saturday hours?",
  ];

  return (
    <>
      {/* Bubble */}
      {!open && (
        <button
          type="button"
          aria-label="Open chat with BTY Helper"
          onClick={() => setOpen(true)}
          className="print:hidden fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-brand text-brand-foreground pl-4 pr-5 h-14 shadow-lg hover:opacity-90 transition-opacity font-semibold uppercase tracking-widest text-xs"
        >
          <MessageCircle className="size-5" />
          Ask BTY
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with BTY Helper"
          className="print:hidden fixed z-50 bg-white shadow-2xl ring-1 ring-zinc-300 flex flex-col overflow-hidden inset-x-3 bottom-3 top-3 sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:w-[380px] sm:h-[560px] sm:rounded-lg"
        >
          {/* Header */}
          <div className="bg-surface text-surface-foreground px-4 py-3 flex items-center gap-3 border-b border-white/5">
            <span className="inline-flex items-center justify-center size-9 rounded-full bg-brand/15 text-brand shrink-0">
              <MessageCircle className="size-5" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base uppercase leading-none">BTY Helper</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-1 truncate">
                AI assistant
              </p>
            </div>
            <a
              href={buildMailto(messages)}
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-foreground bg-brand hover:opacity-90 px-2.5 py-1.5 rounded shrink-0"
              title="Email Abby with the chat transcript"
            >
              Talk to Abby
            </a>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center size-8 rounded hover:bg-white/10 text-zinc-300"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm text-zinc-900">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-zinc-700 leading-relaxed">
                  Hi! I can answer questions about our materials, pricing, delivery, hours, or what's in stock today. For a real quote or to schedule, tap <span className="font-semibold">Talk to Abby</span> or call{" "}
                  <a href="tel:5085799897" className="text-brand font-semibold">508-579-9897</a>.
                </p>
                <div className="flex flex-col gap-2">
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSubmit(q)}
                      className="text-left text-xs px-3 py-2 rounded bg-kraft/60 hover:bg-kraft text-zinc-800 ring-1 ring-zinc-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m) => {
              const text = getText(m);
              if (m.role === "user") {
                return (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] bg-brand text-brand-foreground rounded-lg px-3 py-2 whitespace-pre-wrap leading-relaxed">
                      {text}
                    </div>
                  </div>
                );
              }
              return (
                <div key={m.id} className="text-zinc-800 whitespace-pre-wrap leading-relaxed">
                  {text}
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="text-zinc-500 text-xs italic">BTY Helper is thinking…</div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(input);
            }}
            className="border-t border-zinc-200 p-3 flex items-end gap-2"
          >
            <textarea
              ref={taRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSubmit(input);
                }
              }}
              rows={1}
              placeholder="Ask about mulch, delivery, hours…"
              className="flex-1 resize-none text-sm rounded-md ring-1 ring-zinc-300 px-3 py-2 max-h-32 focus:outline-none focus:ring-2 focus:ring-brand"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-9 px-3 rounded-md bg-brand text-brand-foreground text-xs font-semibold uppercase tracking-widest disabled:opacity-50"
            >
              Send
            </button>
          </form>

          {/* Footer actions */}
          <div className="border-t border-zinc-200 px-3 py-2 flex items-center justify-between gap-2 text-[11px] bg-zinc-50">
            <a
              href="tel:5085799897"
              className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-widest text-zinc-700 hover:text-brand"
            >
              <Phone className="size-3.5" /> 508.579.9897
            </a>
            <a
              href={buildMailto(messages)}
              className="sm:hidden font-semibold uppercase tracking-widest text-brand"
            >
              Talk to Abby
            </a>
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-zinc-500 hover:text-zinc-800 uppercase tracking-widest"
            >
              New chat
            </button>
          </div>
        </div>
      )}
    </>
  );
}