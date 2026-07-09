import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StreamingText } from "@/components/StreamingText";
import { Brain, BookOpen, Lightbulb, Target, Copy, Plus } from "lucide-react";
import { researchTopic, type Depth, type Format, type ResearchResult } from "@/data/researchTopics";
import { cn } from "@/lib/utils";

const DEPTHS: Depth[] = ["Quick Summary", "Detailed Analysis", "Deep Dive"];
const FORMATS: Format[] = ["Summary + Key Points", "Bullet Points Only", "Executive Brief"];

export function ResearchAssistant() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<Depth>("Quick Summary");
  const [format, setFormat] = useState<Format>("Summary + Key Points");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [key, setKey] = useState(0);

  const analyze = () => {
    if (!topic.trim()) {
      toast.error("Enter a topic to research");
      return;
    }
    setResult(researchTopic(topic, depth));
    setKey((k) => k + 1);
  };

  const copyAll = async () => {
    if (!result) return;
    const text = [
      "SUMMARY",
      result.summary,
      "",
      "KEY INSIGHTS",
      ...result.insights.map((i) => `• ${i.title}: ${i.detail}`),
      "",
      "RECOMMENDATIONS",
      ...result.recommendations.map((r) => `[${r.priority}] ${r.title}\n${r.detail}\nWhy: ${r.why}`),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const reset = () => {
    setTopic("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Research Assistant</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Get AI-powered summaries, insights, and recommendations on any topic.
        </p>

        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Research Topic or Paste Text
            </Label>
            <Textarea
              rows={6}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic to research (e.g., 'Impact of remote work on productivity') or paste an article/text to summarize..."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Research Depth
              </Label>
              <div className="flex flex-wrap gap-2">
                {DEPTHS.map((d) => (
                  <Pill key={d} active={depth === d} onClick={() => setDepth(d)}>
                    {d}
                  </Pill>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Output Format
              </Label>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map((f) => (
                  <Pill key={f} active={format === f} onClick={() => setFormat(f)}>
                    {f}
                  </Pill>
                ))}
              </div>
            </div>
          </div>

          <Button
            className="w-full gradient-hero text-[color:var(--primary-foreground)] hover:brightness-110"
            onClick={analyze}
          >
            <Brain className="mr-2 h-4 w-4" />
            Analyze
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-300" key={key}>
          <Tabs defaultValue="summary">
            <TabsList>
              <TabsTrigger value="summary" className="gap-2">
                <BookOpen className="h-4 w-4" /> Summary
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2">
                <Lightbulb className="h-4 w-4" /> Key Insights
              </TabsTrigger>
              <TabsTrigger value="recs" className="gap-2">
                <Target className="h-4 w-4" /> Recommendations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-6 leading-relaxed">
              <StreamingText text={result.summary} speed={10} className="text-sm" />
            </TabsContent>

            <TabsContent value="insights" className="mt-6 space-y-4">
              {result.insights.map((ins, i) => {
                const color = ["#F59E0B", "#10B981", "#60A5FA"][i % 3];
                return (
                  <div key={i} className="flex gap-3 rounded-lg border border-border p-4">
                    <span
                      className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                    />
                    <div>
                      <div className="font-semibold text-foreground">{ins.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{ins.detail}</div>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="recs" className="mt-6 space-y-4">
              {result.recommendations.map((r, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <PriorityBadge p={r.priority} />
                    <span className="font-semibold">{r.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.detail}</p>
                  <p className="mt-2 text-xs italic text-[color:var(--muted-foreground)]/70">
                    Why this matters: {r.why}
                  </p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
            <Button variant="outline" size="sm" onClick={copyAll}>
              <Copy className="mr-2 h-4 w-4" /> Copy Results
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              <Plus className="mr-2 h-4 w-4" /> New Research
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

function Pill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
        active
          ? "border-transparent bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
          : "border-[color:var(--surface-3)] text-muted-foreground hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]",
      )}
    >
      {children}
    </button>
  );
}

function PriorityBadge({ p }: { p: "High" | "Medium" | "Low" }) {
  const map = {
    High: "bg-[rgba(245,158,11,0.15)] text-[color:var(--primary)]",
    Medium: "bg-[rgba(96,165,250,0.15)] text-[#60A5FA]",
    Low: "bg-[color:var(--surface-3)] text-muted-foreground",
  } as const;
  return <Badge className={cn("border-transparent", map[p])}>{p} Priority</Badge>;
}
