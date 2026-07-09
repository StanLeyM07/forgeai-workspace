import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { PageFooter } from "@/components/layout/AppLayout";
import { Mail, Search, MessageSquare, ArrowRight, Zap, Clock, Unlock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ForgeAI — AI Productivity Suite for Modern Work" },
      {
        name: "description",
        content:
          "Welcome to ForgeAI. Generate emails, research any topic, and chat with an AI workplace assistant — all in one premium suite.",
      },
      { property: "og:title", content: "ForgeAI — AI Productivity Suite" },
      {
        property: "og:description",
        content: "Your AI-powered productivity suite for the modern workplace.",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    to: "/email-generator" as const,
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Craft professional emails instantly. Choose your tone, provide context, and let AI generate polished, ready-to-send emails.",
  },
  {
    to: "/research-assistant" as const,
    icon: Search,
    title: "AI Research Assistant",
    desc: "Summarize complex topics, extract key insights, and get actionable recommendations powered by AI analysis.",
  },
  {
    to: "/chatbot" as const,
    icon: MessageSquare,
    title: "AI Chatbot",
    desc: "Your intelligent workplace assistant. Ask questions, brainstorm ideas, and get instant AI-powered guidance.",
  },
];

const stats = [
  { icon: Zap, label: "3 AI Tools Available" },
  { icon: Clock, label: "Instant Results" },
  { icon: Unlock, label: "No Sign-up Required" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="gradient-text">Welcome to ForgeAI</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Your AI-powered productivity suite for the modern workplace.
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Link key={f.to} to={f.to} className="group">
              <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(245,158,11,0.3)] hover:shadow-[0_10px_40px_-15px_rgba(245,158,11,0.3)]">
                <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-[rgba(245,158,11,0.1)]">
                  <Icon className="h-6 w-6 text-[color:var(--primary)]" />
                </span>
                <h2 className="mt-4 text-xl font-bold tracking-tight">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--primary)] transition-transform group-hover:translate-x-0.5">
                  Launch Tool <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface-2)] px-4 py-2 text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-[color:var(--primary)]" />
              {s.label}
            </div>
          );
        })}
      </section>

      <PageFooter />
    </div>
  );
}
