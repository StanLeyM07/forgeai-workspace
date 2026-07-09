import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Zap } from "lucide-react";
import { suggestionChips } from "@/data/chatResponses";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
}

const formatTs = (ts: number) => {
  const s = Math.round((Date.now() - ts) / 1000);
  if (s < 60) return "Just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || streaming) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: t, ts: Date.now() };
    const assistantId = crypto.randomUUID();
    const history = [...messages, userMsg];
    setMessages([...history, { id: assistantId, role: "assistant", content: "", ts: Date.now() }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        if (res.status === 429) toast.error("Rate limit reached. Please wait a moment.");
        else if (res.status === 402) toast.error("AI credits exhausted. Please add credits.");
        else toast.error("Something went wrong. Please try again.");
        setMessages((m) => m.filter((x) => x.id !== assistantId));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => m.map((x) => (x.id === assistantId ? { ...x, content: acc } : x)));
      }
    } catch {
      toast.error("Network error. Please try again.");
      setMessages((m) => m.filter((x) => x.id !== assistantId));
    } finally {
      setStreaming(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        {messages.length === 0 ? (
          <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl gradient-hero">
              <Zap className="h-8 w-8 text-[color:var(--primary-foreground)]" strokeWidth={2.5} />
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight">How can I help you today?</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask ForgeAI anything about your workplace, projects, or ideas.
            </p>
            <div className="mt-8 grid w-full gap-2 sm:grid-cols-2">
              {suggestionChips.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border border-border bg-[color:var(--surface-2)] px-4 py-3 text-left text-sm text-muted-foreground transition-all hover:border-[color:var(--primary)] hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            {messages.map((m, i) => (
              <MessageBubble
                key={m.id}
                msg={m}
                isLast={i === messages.length - 1}
                streaming={streaming}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-[color:var(--surface-2)] px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            placeholder="Ask ForgeAI anything..."
            className="flex-1 resize-none rounded-full border border-border bg-[color:var(--surface-3)] px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[rgba(245,158,11,0.2)]"
          />
          <Button
            onClick={() => send(input)}
            disabled={!input.trim() || streaming}
            className="h-11 w-11 shrink-0 rounded-full gradient-hero p-0 text-[color:var(--primary-foreground)] hover:brightness-110 disabled:opacity-50"
            aria-label="Send"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[0.7rem] text-[color:var(--muted-foreground)]/70">
          ForgeAI is powered by real AI. Responses may vary.
        </p>
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  isLast,
  streaming,
}: {
  msg: Message;
  isLast: boolean;
  streaming: boolean;
}) {
  const isUser = msg.role === "user";
  const isPending = !isUser && isLast && streaming && msg.content.length === 0;
  return (
    <div
      className={cn(
        "flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "items-end" : "items-start",
      )}
    >
      <div className="flex items-end gap-2">
        {!isUser && (
          <span className="mb-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[rgba(245,158,11,0.15)] text-[0.65rem] font-bold text-[color:var(--primary)]">
            AI
          </span>
        )}
        <div
          className={cn(
            "max-w-[75%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
            isUser
              ? "rounded-[16px_16px_4px_16px] bg-[color:var(--surface-3)] text-foreground"
              : "rounded-[16px_16px_16px_4px] bg-[color:var(--surface-2)] text-foreground",
          )}
        >
          {isPending ? (
            <span className="text-muted-foreground">
              <span className="mr-2">ForgeAI is thinking</span>
              <span className="thinking-dot" style={{ animationDelay: "0s" }}>•</span>
              <span className="thinking-dot" style={{ animationDelay: "0.2s" }}>•</span>
              <span className="thinking-dot" style={{ animationDelay: "0.4s" }}>•</span>
            </span>
          ) : (
            msg.content
          )}
        </div>
      </div>
      <span className={cn("text-[0.7rem] text-[color:var(--muted-foreground)]/70", isUser ? "mr-1" : "ml-9")}>
        {formatTs(msg.ts)}
      </span>
    </div>
  );
}
