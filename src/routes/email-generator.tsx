import { createFileRoute } from "@tanstack/react-router";
import { EmailGenerator } from "@/components/features/EmailGenerator";
import { PageFooter } from "@/components/layout/AppLayout";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — ForgeAI" },
      {
        name: "description",
        content:
          "Generate polished, professional emails in seconds. Choose your tone and let ForgeAI draft it for you.",
      },
      { property: "og:title", content: "Smart Email Generator — ForgeAI" },
      { property: "og:description", content: "Professional emails, drafted by AI in seconds." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <EmailGenerator />
      <PageFooter />
    </div>
  );
}
