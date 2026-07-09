# ForgeAI — Build Plan

Build a premium dark-mode SaaS demo with 3 simulated AI tools. No backend, no auth, no persistence. Pure frontend with mock responses + streaming animation.

## Scope

- 4 routes: `/` (Dashboard), `/email-generator`, `/research-assistant`, `/chatbot`
- Persistent sidebar layout, mobile hamburger
- Simulated AI via keyword matching + template variations, streamed char-by-char
- Responsible AI modal + footer disclaimer on tool pages

## Design Tokens (src/styles.css)

Replace the default light theme with the amber/midnight dark palette. Force dark app-wide (add `dark` class to html, or just set `:root` values to the dark palette directly). Add semantic tokens:
- `--background` #0A0E1A, `--card` #1F2937, `--muted` #111827
- `--primary` #F59E0B, `--primary-foreground` #0A0E1A
- `--accent-secondary` #D97706, `--accent-tertiary` #FBBF24
- success/warning/error, gradient utilities via `@utility gradient-hero`
- Custom scrollbar, Inter font via `<link>` in `__root.tsx` head

## Routes (TanStack Start conventions)

Note: original prompt says React Router + `/pages/`, but this stack is TanStack Start. I'll use `src/routes/` file-based routing and place feature components under `src/components/features/`. Each route gets its own `head()` with unique title/description/og tags.

- `src/routes/__root.tsx` — update head (title "ForgeAI", favicon, Inter font link), wrap children in `<AppLayout>` (sidebar + topbar + Outlet + Toaster)
- `src/routes/index.tsx` — Dashboard (hero + 3 feature cards + stats row)
- `src/routes/email-generator.tsx`
- `src/routes/research-assistant.tsx`
- `src/routes/chatbot.tsx`

## Components

**Layout** (`src/components/layout/`)
- `AppLayout.tsx` — sidebar + main content shell, mobile drawer state
- `Sidebar.tsx` — logo, nav items (active state via `useRouterState`), Responsible AI button
- `TopBar.tsx` — hamburger (mobile) + breadcrumb
- `PageFooter.tsx` — the "⚡ Powered by ForgeAI..." disclaimer
- `ResponsibleAIModal.tsx` — shadcn Dialog with the disclaimer content

**Features** (`src/components/features/`)
- `EmailGenerator.tsx` — two-panel form + streamed output, tone pills, purpose select, copy/regenerate/clear
- `ResearchAssistant.tsx` — input + tabs (Summary / Insights / Recommendations)
- `Chatbot.tsx` — message list, streaming bubbles, suggestion chips, input bar, "thinking" indicator

**UI** — reuse existing shadcn components (Button, Card, Input, Textarea, Select, Tabs, Dialog, Badge). Use `sonner` for toasts (already available).

## Hooks & Data

- `src/hooks/useStreamingText.ts` — takes text + speed, returns `{ displayed, isStreaming }` using setInterval
- `src/data/emailTemplates.ts` — map of `{purpose}_{tone}` → array of template strings with `{{recipient}}`, `{{sender}}`, `{{points}}` placeholders (3+ variations each)
- `src/data/researchTopics.ts` — 5 pre-built topics (remote work, AI in business, climate, digital marketing, cybersecurity) + generic fallback generator
- `src/data/chatResponses.ts` — keyword→response map + greeting + fallback template

## Streaming Animation

Custom hook drives character-by-character reveal at ~30ms. Amber blinking cursor (`::after` with `animate-pulse` or css keyframe) while `isStreaming`. Applied to email output, research tab content on first render, and each new AI chat message.

## Responsive

- Desktop ≥1024px: sidebar 260px visible
- Tablet 768–1023px: icon-only rail 64px
- Mobile <768px: hidden, hamburger opens overlay drawer
- Two-panel layouts use `grid lg:grid-cols-2`, stack on mobile
- Chat input sticky bottom

## Simulated AI Behavior

- Email: pick random template variation for selected purpose+tone, interpolate user inputs, stream out
- Research: match topic keyword → prebuilt; else generic template with topic name interpolated throughout; adjust length by depth
- Chatbot: 1–2s delay with animated "ForgeAI is thinking..." dots, then stream response chosen by keyword match, fallback to generic template echoing user's message

## Out of Scope

No backend, no localStorage persistence (session-only React state), no real AI calls, no auth.

## Files to Create/Modify

Modify: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`
Create: 4 route files (or update index), ~10 component files, 3 data files, 1 hook
