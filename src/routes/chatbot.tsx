import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare, Send, Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ToolHeader } from "@/components/tool-page";
import { AI_DISCLAIMER, WaypointMark } from "@/components/brand";
import { CHAT_GREETING, delay, generateChatReply } from "@/lib/generators";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI neXtstep" },
      {
        name: "description",
        content:
          "Ask the AI neXtstep assistant about workplace communication, productivity, research and career preparation.",
      },
      { property: "og:title", content: "AI Chatbot — AI neXtstep" },
      {
        property: "og:description",
        content: "A friendly assistant for work, study and career questions.",
      },
    ],
  }),
  component: Chatbot,
});

type Message = { id: number; role: "assistant" | "user"; content: string };

const greeting: Message = { id: 0, role: "assistant", content: CHAT_GREETING };

function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = async () => {
    const text = input.trim();
    if (!text || thinking) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    await delay(800 + Math.random() * 600);
    setMessages((m) => [
      ...m,
      { id: Date.now() + 1, role: "assistant", content: generateChatReply(text) },
    ]);
    setThinking(false);
  };

  return (
    <div className="space-y-6">
      <ToolHeader
        icon={MessagesSquare}
        title="AI Chatbot"
        description="Ask anything about workplace communication, productivity, research and career preparation."
      />

      <Card className="border-border shadow-sm">
        <CardContent className="flex h-[62vh] min-h-[420px] flex-col gap-4 py-5">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((m) =>
              m.role === "assistant" ? (
                <div key={m.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                  <WaypointMark className="h-7 w-7 shrink-0 rounded-md" />
                  <p className="min-w-0 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {m.content}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
                    {m.content}
                  </p>
                </div>
              ),
            )}

            {thinking ? (
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <WaypointMark className="h-7 w-7 shrink-0 rounded-md" />
                <p className="animate-pulse text-sm text-muted-foreground">Thinking…</p>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2 border-t border-border pt-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Ask about emails, meetings, planning, research or your career…"
              className={cn("min-h-[52px] resize-none")}
              aria-label="Message"
            />
            <Button onClick={send} disabled={thinking || !input.trim()} size="icon" className="h-10 w-10">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="flex min-w-0 items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-px h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0">{AI_DISCLAIMER}</span>
            </p>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() => {
                setMessages([greeting]);
                setInput("");
              }}
            >
              <Trash2 className="h-4 w-4" />
              Clear chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
