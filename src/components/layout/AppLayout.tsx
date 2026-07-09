import { useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, Zap } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { ResponsibleAIModal } from "./ResponsibleAIModal";
import { Toaster } from "@/components/ui/sonner";

const crumbFor = (path: string) => {
  if (path === "/") return "Dashboard";
  if (path.startsWith("/email-generator")) return "Email Generator";
  if (path.startsWith("/research-assistant")) return "Research Assistant";
  if (path.startsWith("/chatbot")) return "AI Chatbot";
  return "";
};

export function AppLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [respOpen, setRespOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumb = crumbFor(pathname);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar onOpenResponsible={() => setRespOpen(true)} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 animate-in slide-in-from-left duration-200">
            <Sidebar
              mobile
              onNavigate={() => setMobileOpen(false)}
              onClose={() => setMobileOpen(false)}
              onOpenResponsible={() => {
                setMobileOpen(false);
                setRespOpen(true);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-[color:var(--surface-2)]/80 px-4 backdrop-blur">
          <button
            className="rounded-md p-2 text-muted-foreground hover:bg-[color:var(--surface-3)] lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1.5 font-semibold">
              <Zap className="h-4 w-4 text-[color:var(--primary)]" />
              ForgeAI
            </span>
            {crumb && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{crumb}</span>
              </>
            )}
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>

      <ResponsibleAIModal open={respOpen} onOpenChange={setRespOpen} />
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}

export function PageFooter() {
  return (
    <footer className="mt-10 border-t border-border pt-4 text-center text-xs text-[color:var(--muted-foreground)]/80">
      ⚡ Powered by ForgeAI — AI responses are simulated for demonstration. Always review AI-generated content
      before use.
    </footer>
  );
}
