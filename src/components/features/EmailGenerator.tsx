import { useEffect, useState } from "react";
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
import { Mail, Sparkles, Copy, RefreshCw, Trash2 } from "lucide-react";
import { generateEmail, type Tone, type EmailInput } from "@/data/emailTemplates";
import { useStreamingText } from "@/hooks/useStreamingText";
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
  const [streamKey, setStreamKey] = useState(0);
  const [editedBody, setEditedBody] = useState("");

  const doGenerate = () => {
    const input: EmailInput = {
      recipient,
      sender,
      purpose: purpose === "Custom" ? customPurpose || "our recent discussion" : purpose,
      tone,
      points,
    };
    const result = generateEmail(input);
    setOutput(result);
    setEditedBody(result.body);
    setStreamKey((k) => k + 1);
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

          <Button
            className="w-full gradient-hero text-[color:var(--primary-foreground)] hover:brightness-110"
            onClick={doGenerate}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Email
          </Button>
        </div>
      </Card>

      {/* Output */}
      <Card className="flex flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Generated Email</h2>
          <Badge className="border-transparent bg-[rgba(245,158,11,0.15)] text-[color:var(--primary)] hover:bg-[rgba(245,158,11,0.2)]">
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

            <EmailBody
              key={streamKey}
              text={output.body}
              value={editedBody}
              onChange={setEditedBody}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={copy}>
                <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
              </Button>
              <Button variant="outline" size="sm" onClick={doGenerate}>
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

function EmailBody({
  text,
  value,
  onChange,
}: {
  text: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const { displayed, isStreaming } = useStreamingText(text, 12);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!isStreaming && displayed === text) setDone(true);
  }, [isStreaming, displayed, text]);

  if (done) {
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.max(12, value.split("\n").length + 1)}
        className="min-h-[240px] resize-y rounded-md border-border bg-[color:var(--background)] leading-relaxed"
      />
    );
  }

  return (
    <div className="min-h-[240px] whitespace-pre-wrap rounded-md border border-border bg-[color:var(--background)] px-4 py-3 text-sm leading-relaxed">
      {displayed}
      {isStreaming && <span className="stream-cursor" aria-hidden />}
    </div>
  );
}
