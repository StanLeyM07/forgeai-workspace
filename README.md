# ForgeAI

ForgeAI is a premium, dark-mode AI productivity suite that helps professionals automate everyday workplace tasks. It combines a polished dashboard with three specialized AI tools — an Email Generator, a Research Assistant, and a Conversational Chatbot — all wrapped in a responsive, sidebar-driven layout.

> **Status:** Frontend demo with simulated AI for Email & Research, and live AI streaming for the Chatbot via the Lovable AI Gateway. No backend, auth, or persistence is required to run the app locally.

---

## Project Overview

ForgeAI is built as a single-page application (SPA) using TanStack Start. The design language is dark-first, using an amber-on-midnight palette, custom gradients, and smooth streaming animations to make AI outputs feel alive.

The app is structured around:

- A **Dashboard** landing page with feature cards and stats.
- An **Email Generator** that produces polished outbound emails from purpose, tone, and key points.
- A **Research Assistant** that delivers structured topic analysis across summary, insights, and recommendation tabs.
- A **Chatbot** that streams live AI responses for open-ended workplace questions.

---

## Architecture

```text
src/
├── routes/                     # TanStack Start file-based routes
│   ├── __root.tsx              # Root layout, head metadata, providers
│   ├── index.tsx               # / Dashboard
│   ├── email-generator.tsx     # /email-generator
│   ├── research-assistant.tsx  # /research-assistant
│   ├── chatbot.tsx             # /chatbot
│   └── api/chat.ts             # Server route for live AI chat streaming
├── components/
│   ├── features/               # Tool-specific UI (Email, Research, Chatbot)
│   ├── layout/                 # AppLayout, Sidebar, Responsible AI modal
│   └── StreamingText.tsx       # Reusable streaming text wrapper
├── data/                       # Mock AI templates and response data
│   ├── chatResponses.ts        # Chatbot fallback / keyword data
│   ├── emailTemplates.ts       # Email template variations by purpose + tone
│   └── researchTopics.ts       # Pre-built research topics
├── hooks/
│   ├── useStreamingText.ts     # Character-by-character streaming animation
│   └── use-mobile.tsx          # Mobile breakpoint detection
├── styles.css                  # Tailwind v4 theme tokens + custom utilities
└── router.tsx                  # TanStack Router bootstrap
```

### Routing

TanStack Start uses file-based routing under `src/routes/`. The root route (`__root.tsx`) provides the HTML shell, global metadata, and wraps every page in `AppLayout`. Child routes render inside the layout via `<Outlet />`.

### State & Data

- **Local React state** drives all UI interactions.
- **No database or auth** is required; session data lives only in component state.
- **Email & Research** use deterministic, keyword/template-based simulated AI responses.
- **Chatbot** calls the `/api/chat` server route, which streams responses from the Lovable AI Gateway.

### AI Behavior

| Tool | AI Source | Behavior |
|------|-----------|----------|
| Email Generator | Simulated templates | Random template variation selected by `purpose + tone`, interpolated with user inputs, then streamed character-by-character. |
| Research Assistant | Simulated templates | Keyword-matched topic data or a generic fallback; content length adjusted by selected depth. |
| Chatbot | Lovable AI Gateway (Gemini) | Live streaming SSE response with a typing-style reveal and error handling. |

---

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 full-stack framework)
- **Router:** [TanStack Router](https://tanstack.com/router) (file-based, type-safe)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with custom `@theme` tokens
- **UI Components:** shadcn/ui primitives built on Radix UI
- **State/Data:** React state + TanStack Query
- **AI / Streaming:** `ai` / `@ai-sdk/react`, Lovable AI Gateway
- **Build Tool:** Vite 8
- **Package Manager:** Bun

---

## Features Implemented

### Core Application

- Dark-mode-first responsive layout with persistent sidebar and mobile hamburger drawer.
- Custom design tokens: midnight background (`#0A0E1A`), amber primary (`#F59E0B`), and semantic surface colors.
- Reusable streaming text animation with a blinking amber cursor.
- "Responsible AI" disclaimer modal and footer disclaimer on tool pages.
- SEO-friendly route-level `head()` metadata (title, description, Open Graph, Twitter cards).
- 404 and error boundaries on the root route.

### Dashboard (`/`)

- Hero section with gradient headline and CTA.
- Three feature cards linking to the specialized tools.
- Stats row showcasing productivity metrics.

### Email Generator (`/email-generator`)

- Two-panel layout: input form on the left, streamed output on the right.
- Purpose selector, tone pills (e.g., Professional, Friendly, Persuasive), recipient/sender fields, and key points textarea.
- Actions: copy to clipboard, regenerate, and clear.
- Simulated AI picks from multiple template variations and interpolates user input.

### Research Assistant (`/research-assistant`)

- Topic input with depth and format selectors.
- Tabbed output: Summary, Insights, Recommendations.
- Pre-built research packs for common workplace topics plus a generic fallback generator.
- Streaming reveal on first render of each tab.

### Chatbot (`/chatbot`)

- Message list with user and assistant bubbles.
- Live AI streaming via server route `/api/chat`.
- "ForgeAI is thinking..." animated indicator.
- Suggestion chips for quick prompts.
- Error handling for rate limits and unavailable AI service.

---

## Technologies and Tools Used

### Production Dependencies

| Category | Packages |
|----------|----------|
| Core Framework | `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin` |
| React Ecosystem | `react`, `react-dom`, `@tanstack/react-query` |
| AI / Streaming | `ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible` |
| Styling | `tailwindcss`, `@tailwindcss/vite`, `tailwind-merge`, `clsx`, `tw-animate-css` |
| UI Primitives | `@radix-ui/react-*` (dialog, tabs, select, tooltip, etc.) |
| shadcn Helpers | `class-variance-authority`, `lucide-react` |
| Forms / Validation | `react-hook-form`, `@hookform/resolvers`, `zod` |
| Notifications | `sonner` |
| Date / Carousel | `date-fns`, `embla-carousel-react` |
| Misc | `cmdk`, `input-otp`, `react-resizable-panels`, `recharts`, `vaul` |

### Development Dependencies

- `typescript`, `vite`, `@vitejs/plugin-react`
- `eslint`, `prettier`, `typescript-eslint`, `eslint-plugin-react-hooks`
- `@lovable.dev/vite-tanstack-config`
- `nitro` (TanStack Start server runtime)

---

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js with a compatible package manager
- A Lovable AI Gateway API key if you want live chat responses (optional — the chatbot will show a fallback error message without one)

### 1. Clone the Repository

```bash
git clone https://github.com/StanLeyM07/forgeai-workspace.git
cd forgeai-workspace
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Optional — only needed for live chat AI
LOVABLE_API_KEY=your_lovable_ai_gateway_key
```

> The Email Generator and Research Assistant work entirely offline using local templates, so only the Chatbot requires an API key.

### 4. Start the Development Server

```bash
bun dev
```

The app will be available at `http://localhost:8080`.

### 5. Build for Production

```bash
bun run build
```

To preview the production build locally:

```bash
bun run preview
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start Vite dev server |
| `bun run build` | Build for production |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |

---

## Notes

- The project follows **TanStack Start** conventions: routes live in `src/routes/`, and `src/routes/__root.tsx` is the only root layout.
- `src/routeTree.gen.ts` is auto-generated by the TanStack Router Vite plugin — do not edit it manually.
- The app is designed to run on edge/serverless runtimes; avoid Node-only packages in server functions.
