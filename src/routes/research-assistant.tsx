import { createFileRoute } from "@tanstack/react-router";
import { ResearchAssistant } from "@/components/features/ResearchAssistant";
import { PageFooter } from "@/components/layout/AppLayout";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — ForgeAI" },
      {
        name: "description",
        content:
          "Get AI-powered summaries, insights, and recommendations on any topic — from remote work to cybersecurity.",
      },
      { property: "og:title", content: "AI Research Assistant — ForgeAI" },
      {
        property: "og:description",
        content: "Summaries, insights, and actionable recommendations on any topic.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <ResearchAssistant />
      <PageFooter />
    </div>
  );
}
