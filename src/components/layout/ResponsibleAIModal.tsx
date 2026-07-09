import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function ResponsibleAIModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-[color:var(--primary)]" />
            Responsible AI Practices
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            ForgeAI is committed to the responsible and ethical use of artificial intelligence.
          </p>
          <Section title="Transparency">
            All responses in this application are AI-generated simulations designed for demonstration purposes.
            They should not be treated as professional advice.
          </Section>
          <Section title="Human Oversight">
            AI-generated content should always be reviewed and edited by a human before being used in any
            professional context. AI assists — it does not replace human judgment.
          </Section>
          <Section title="Data Privacy">
            This application does not collect, store, or transmit any personal data. All interactions happen
            locally in your browser and are not saved.
          </Section>
          <Section title="Bias Awareness">
            AI systems can reflect biases present in their training data. Users should critically evaluate AI
            outputs and consider diverse perspectives.
          </Section>
          <Section title="Limitations">
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>AI-generated content may contain inaccuracies</li>
              <li>Responses are based on simulated templates, not real-time AI processing</li>
              <li>This tool is intended for productivity assistance, not as a replacement for domain expertise</li>
            </ul>
          </Section>
          <Section title="Ethical Use">
            Users are encouraged to use this tool ethically and responsibly. Do not use AI-generated content
            to mislead, deceive, or harm others.
          </Section>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>I Understand</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
