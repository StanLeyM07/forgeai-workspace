import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, Search, MessageSquare, Shield, Zap, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Email Generator", icon: Mail },
  { to: "/research-assistant", label: "Research Assistant", icon: Search },
  { to: "/chatbot", label: "AI Chatbot", icon: MessageSquare },
] as const;

export function Sidebar({
  onNavigate,
  onOpenResponsible,
  onClose,
  mobile,
}: {
  onNavigate?: () => void;
  onOpenResponsible: () => void;
  onClose?: () => void;
  mobile?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className="flex h-full w-[260px] flex-col border-r border-border bg-[color:var(--surface-2)]"
      aria-label="Primary"
    >
      <div className="flex items-center justify-between px-5 py-5">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-hero">
            <Zap className="h-4 w-4 text-[color:var(--primary-foreground)]" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight">ForgeAI</span>
        </Link>
        {mobile && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-[color:var(--surface-3)]"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-[rgba(245,158,11,0.08)] text-[color:var(--primary)]"
                  : "text-muted-foreground hover:bg-[color:var(--surface-3)] hover:text-foreground",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-[color:var(--primary)]" />
              )}
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <button
          onClick={onOpenResponsible}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-[color:var(--surface-3)] hover:text-foreground"
        >
          <Shield className="h-4 w-4 shrink-0" />
          <span>Responsible AI</span>
        </button>
      </div>
    </aside>
  );
}
