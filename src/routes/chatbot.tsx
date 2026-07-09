import { createFileRoute } from "@tanstack/react-router";
import { Chatbot } from "@/components/features/Chatbot";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — ForgeAI" },
      {
        name: "description",
        content:
          "Chat with ForgeAI, your intelligent workplace assistant. Brainstorm ideas, plan projects, and get instant AI-powered guidance.",
      },
      { property: "og:title", content: "AI Chatbot — ForgeAI" },
      {
        property: "og:description",
        content: "Your intelligent workplace assistant for brainstorming and guidance.",
      },
    ],
  }),
  component: ChatbotPage,
});

function ChatbotPage() {
  return <Chatbot />;
}
