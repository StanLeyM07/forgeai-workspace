const rules: Array<{ test: RegExp; reply: (msg: string) => string }> = [
  {
    test: /^(hi|hello|hey|yo|greetings)\b/i,
    reply: () =>
      `Hey there! 👋 I'm ForgeAI, your workplace productivity assistant. Here's how I can help:

• Brainstorming — creative ideas, frameworks, and angles you might not have considered
• Explaining concepts — from agile to zero-based budgeting, in plain English
• Planning — projects, meetings, timelines, and roadmaps
• Guidance — best practices across common workplace situations

You can also try our specialized tools: the Email Generator for polished outbound writing, or the Research Assistant for deeper topic analysis. What can I help with today?`,
  },
  {
    test: /email|draft|write.*message|compose/i,
    reply: () =>
      `For polished emails, I'd point you at our dedicated Email Generator — it lets you pick tone (formal, friendly, persuasive, concise, empathetic) and drops in your recipient and key points automatically.

That said, here's a quick framework for any email you write yourself:

• Lead with the ask — the reader should know what you need in the first two sentences
• Give just enough context — one paragraph, not five
• Make the next step obvious — a specific request beats a vague "let me know"
• Match tone to relationship — internal-warm, external-professional, escalation-crisp

Want me to redirect you to the Email Generator, or would you like help with something else?`,
  },
  {
    test: /research|summariz|analyz|deep.dive/i,
    reply: () =>
      `For structured research and summaries, jump into the Research Assistant — it produces a summary, key insights, and prioritized recommendations on any topic.

If you want a lighter-weight approach right here, try this framing:

• What's the actual question? Sharp questions produce sharp answers
• Who's the audience? An executive brief is different from a working doc
• What's the decision this informs? Research without a decision is entertainment
• What would change your mind? Pre-committing to disconfirming evidence prevents motivated reasoning

Want to tell me the topic and I'll take a first pass?`,
  },
  {
    test: /brainstorm|ideas?|creative/i,
    reply: () =>
      `Love a good brainstorm. Here are a few angles I'd try:

• Constraint flip — what if you had 10x the budget? Zero budget? Half the timeline?
• Adjacent industries — how does a different industry solve the same underlying problem?
• First principles — strip away conventions and rebuild from the goal outward
• Analogies — "this is like X, but for Y" often unlocks fresh framings
• Anti-goals — list what you're deliberately not optimizing for; often clarifies the real target

Tell me what you're brainstorming and I'll go deeper. Marketing campaign? Product concept? Team ritual? Something else?`,
  },
  {
    test: /productivity|framework|methodology|agile|scrum|kanban|okr/i,
    reply: () =>
      `A few of the productivity frameworks worth knowing:

• OKRs — Objectives (qualitative direction) paired with 3–5 measurable Key Results. Best for aligning direction across a team.
• Getting Things Done (GTD) — capture everything, clarify next actions, review weekly. Best for individual overwhelm.
• Deep Work — long uninterrupted blocks for high-cognitive tasks; batch shallow work separately.
• Eisenhower Matrix — urgent/important quadrants for triage.
• Kanban / WIP limits — visualize work, cap in-progress items to reduce context-switching.

The mistake most people make is adopting the framework wholesale instead of stealing the one or two ideas that fit their actual bottleneck. What's yours — too many priorities, too many interruptions, or unclear direction?`,
  },
  {
    test: /project|plan|timeline|roadmap|milestone/i,
    reply: () =>
      `Here's a project-planning skeleton that works for most efforts:

1. Outcome statement — one sentence: what will be true when this is done?
2. Success metrics — 2–3 measurable indicators, defined before you start
3. Phased milestones — typically Discovery → Design → Build → Launch → Learn, with a date per phase
4. RACI — for each phase, who is Responsible, Accountable, Consulted, Informed
5. Risks & mitigations — the top 3–5 things that could derail this, and your plan for each
6. Cadence — weekly async update + biweekly synchronous check-in works for most projects

Want me to sketch a timeline for a specific project? Just tell me the scope and target date.`,
  },
  {
    test: /meeting|agenda|standup|1[:\-\s]?on[:\-\s]?1/i,
    reply: () =>
      `Meeting prep is the highest-leverage 10 minutes you can spend. A quick checklist:

• Purpose — decide, align, inform, or brainstorm? Name it in the invite
• Desired outcome — what specifically should be true when we leave?
• Pre-read — send materials 24 hours ahead; expect people to actually read them
• Agenda with time boxes — otherwise you'll spend 40 minutes on the first item
• Decision-maker present — if not, it's an update, not a working meeting
• Actions captured live — owner, deadline, and channel for follow-up

For 1:1s specifically, let the report drive the agenda; use your time to remove blockers and give directional feedback, not to collect status.`,
  },
];

const fallback = (msg: string) =>
  `That's a great question. Here are a few thoughts on ${msg.slice(0, 80)}:

• Start by defining what "good" looks like — a clear outcome makes every downstream decision easier
• Look for the smallest experiment that would either validate or invalidate your current approach
• Talk to two or three people who've solved something similar; their compressed experience beats a week of research
• Watch for the pull to over-plan — momentum on a decent plan usually beats waiting for a perfect one

Want me to go deeper on any of these, or would one of our specialized tools — Email Generator or Research Assistant — be a better fit for what you're working on?`;

export function chatReply(message: string): string {
  const rule = rules.find((r) => r.test.test(message));
  return rule ? rule.reply(message) : fallback(message);
}

export const suggestionChips = [
  "Help me brainstorm marketing ideas",
  "Explain agile methodology simply",
  "Draft a project timeline",
  "What are the best productivity frameworks?",
];
