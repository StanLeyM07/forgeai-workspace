import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StreamingText } from "@/components/StreamingText";
import { Mail, Sparkles, Copy, RefreshCw, Trash2 } from "lucide-react";
import { generateEmail, type Tone, type EmailInput } from "@/data/emailTemplates";
import { cn } from "@/lib/utils";

const PURPOSES = [
  "Follow-up after meeting",
  "Project update",
  "Request for information",
  "Job application",
  "Thank you note",
  "Complaint / Issue",
  "Introduction / Networking",
  "Custom",
];
const TONES: Tone[] = ["Formal", "Friendly", "Persuasive", "Concise", "Empathetic"];

export function EmailGenerator() {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [purpose, setPurpose] = useState("Follow-up after meeting");
  const [customPurpose, setCustomPurpose] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [points, setPoints] = useState("");

  const [output, setOutput] = useState<{ subject: string; body: string } | null>(null);
  const [editedBody, setEditedBody] = useState("");
  const [seed, setSeed] = useState(0);

  const doGenerate = (fresh = true) => {
    const input: EmailInput = {
      recipient,
      sender,
      purpose: purpose === "Custom" ? customPurpose || "our recent discussion" : purpose,
      tone,
      points,
    };
    const s = fresh ? Math.random() : seed + 0.37;
    setSeed(s);
    const result = generateEmail(input, s);
    setOutput(result);
    setEditedBody(result.body);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(`Subject: ${output.subject}\n\n${editedBody}`);
    toast.success("Copied to clipboard!");
  };

  const clear = () => {
    setOutput(null);
    setEditedBody("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">Smart Email Generator</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate professional emails in seconds.
        </p>

        <div className="mt-6 space-y-5">
          <Field label="Recipient Name">
            <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Sarah Johnson" />
          </Field>
          <Field label="Your Name / Role">
            <Input value={sender} onChange={(e) => setSender(e.target.value)} placeholder="e.g. Alex, Marketing Manager" />
          </Field>
          <Field label="Email Purpose">
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PURPOSES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            {purpose === "Custom" && (
              <Input
                className="mt-2"
                value={customPurpose}
                onChange={(e) => setCustomPurpose(e.target.value)}
                placeholder="Describe your custom purpose..."
              />
            )}
          </Field>
          <Field label="Tone">
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                    tone === t
                      ? "border-transparent bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                      : "border-[color:var(--surface-3)] text-muted-foreground hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Key Points to Include">
            <Textarea
              rows={4}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Briefly describe the main points you want the email to cover..."
            />
          </Field>

          <Button className="w-full gradient-hero text-[color:var(--primary-foreground)] hover:brightness-110" onClick={() => doGenerate(true)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Email
          </Button>
        </div>
      </Card>

      {/* Output */}
      <Card className="flex flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Generated Email</h2>
          <Badge className="bg-[rgba(245,158,11,0.15)] text-[color:var(--primary)] hover:bg-[rgba(245,158,11,0.2)]">
            AI Generated
          </Badge>
        </div>

        {!output ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
            <Mail className="h-12 w-12 text-[color:var(--muted-foreground)]/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              Your generated email will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            <div className="mb-3 rounded-md border border-border bg-[color:var(--background)] px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Subject:
              </span>
              <div className="mt-1 font-semibold">{output.subject}</div>
            </div>

            <StreamingKey k={`${output.subject}-${seed}`}>
              <div className="rounded-md border border-border bg-[color:var(--background)] px-4 py-3">
                <StreamingBody
                  text={output.body}
                  onDone={(t) => setEditedBody(t)}
                  edited={editedBody}
                  setEdited={setEditedBody}
                />
              </div>
            </StreamingKey>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={copy}>
                <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
              </Button>
              <Button variant="outline" size="sm" onClick={() => doGenerate(true)}>
                <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={clear}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function StreamingKey({ k, children }: { k: string; children: React.ReactNode }) {
  // Force re-mount to restart streaming when key changes
  return <div key={k} className="flex-1">{children}</div>;
}

function StreamingBody({
  text,
  edited,
  setEdited,
}: {
  text: string;
  edited: string;
  setEdited: (v: string) => void;
  onDone: (t: string) => void;
}) {
  const [done, setDone] = useState(false);
  // Reset when text changes
  useResetOnChange(text, () => setDone(false));

  if (done) {
    return (
      <Textarea
        value={edited}
        onChange={(e) => setEdited(e.target.value)}
        rows={Math.max(10, edited.split("\n").length + 1)}
        className="min-h-[220px] resize-y border-0 bg-transparent p-0 leading-relaxed focus-visible:ring-0 shadow-none"
      />
    );
  }

  return (
    <StreamingWithDone text={text} onDone={() => setDone(true)} />
  );
}

function StreamingWithDone({ text, onDone }: { text: string; onDone: () => void }) {
  const { displayed, isStreaming } = useStreamingWithComplete(text, onDone);
  return (
    <div className="whitespace-pre-wrap leading-relaxed text-sm">
      {displayed}
      {isStreaming && <span className="stream-cursor" aria-hidden />}
    </div>
  );
}

// small hook helpers inline to avoid extra files
import { useEffect, useRef } from "react";
import { useStreamingText } from "@/hooks/useStreamingText";

function useResetOnChange(dep: string, fn: () => void) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}

function useStreamingWithComplete(text: string, onDone: () => void) {
  const { displayed, isStreaming } = useStreamingText(text, 15);
  const prev = useRef(true);
  useEffect(() => {
    if (prev.current && !isStreaming) {
      prev.current = false;
      onDone();
    } else if (isStreaming) {
      prev.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStreaming]);
  return { displayed, isStreaming };
}
