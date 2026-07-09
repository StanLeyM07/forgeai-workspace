export type Tone = "Formal" | "Friendly" | "Persuasive" | "Concise" | "Empathetic";

export interface EmailInput {
  recipient: string;
  sender: string;
  purpose: string;
  tone: Tone;
  points: string;
}

const fill = (tpl: string, vars: Record<string, string>) =>
  tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");

// Templates by tone. Each is an array of {subject, body} variants.
const templates: Record<Tone, Array<{ subject: string; body: string }>> = {
  Formal: [
    {
      subject: "Follow-Up: {{purpose}}",
      body: `Dear {{recipient}},

Thank you for your time regarding {{purpose}}. I wanted to formally follow up on the points we discussed and outline the next steps as I understand them.

{{points}}

Please review the above at your convenience. I would welcome any additional considerations you may have and remain available should you require further clarification on any of the items outlined.

I look forward to your response and to advancing this matter together.

Best regards,
{{sender}}`,
    },
    {
      subject: "Regarding {{purpose}}",
      body: `Dear {{recipient}},

I hope this message finds you well. I am writing in reference to {{purpose}}, and would like to provide a summary of the key considerations for your review.

{{points}}

I trust this information is helpful. Please do not hesitate to reach out should you require further detail, and I will make myself available at a time that suits your schedule.

Kind regards,
{{sender}}`,
    },
    {
      subject: "{{purpose}} — For Your Review",
      body: `Dear {{recipient}},

Further to our recent correspondence concerning {{purpose}}, I am pleased to share the following for your consideration.

{{points}}

I would be grateful for your feedback at your earliest convenience. Thank you for your continued attention to this matter.

Yours sincerely,
{{sender}}`,
    },
  ],
  Friendly: [
    {
      subject: "Quick note on {{purpose}} 👋",
      body: `Hi {{recipient}},

Hope you're doing great! Just wanted to circle back on {{purpose}} and share a few thoughts.

{{points}}

Let me know what you think — happy to jump on a quick call if that's easier. No rush at all, just wanted to keep the ball rolling.

Cheers,
{{sender}}`,
    },
    {
      subject: "Following up on {{purpose}}",
      body: `Hey {{recipient}},

Thanks so much for chatting with me the other day! I really enjoyed the conversation and wanted to send over a quick recap.

{{points}}

Would love to hear your thoughts whenever you have a moment. And of course, feel free to shoot back any questions.

Talk soon,
{{sender}}`,
    },
    {
      subject: "About {{purpose}} :)",
      body: `Hi {{recipient}},

Hope your week is going well! Wanted to drop you a quick note about {{purpose}}.

{{points}}

Let me know if any of this sparks ideas on your end. Always happy to bounce things around.

Warmly,
{{sender}}`,
    },
  ],
  Persuasive: [
    {
      subject: "An opportunity: {{purpose}}",
      body: `Hi {{recipient}},

I'll get right to it — {{purpose}} represents a meaningful opportunity, and I believe now is the right time to move on it.

{{points}}

The upside here is significant, and moving quickly will position us ahead of where we'd otherwise be. I'd love fifteen minutes on your calendar this week to walk through the specifics and align on next steps.

Ready when you are,
{{sender}}`,
    },
    {
      subject: "Why {{purpose}} matters now",
      body: `Hi {{recipient}},

I've been thinking hard about {{purpose}} and want to make the case for prioritizing it.

{{points}}

The cost of waiting is real, and the return on acting decisively is substantial. If we align this week, we can be executing by next. Can I put thirty minutes on your calendar?

Best,
{{sender}}`,
    },
    {
      subject: "{{purpose}} — worth a serious look",
      body: `{{recipient}},

Straight to the point: {{purpose}} deserves a serious look, and here's why.

{{points}}

I'm confident this moves the needle. Give me the green light and I'll take it from here — or better, give me thirty minutes and I'll show you exactly what I mean.

{{sender}}`,
    },
  ],
  Concise: [
    {
      subject: "{{purpose}}",
      body: `Hi {{recipient}},

Quick update on {{purpose}}:

{{points}}

Let me know if you need anything else.

{{sender}}`,
    },
    {
      subject: "Re: {{purpose}}",
      body: `{{recipient}},

Summary:

{{points}}

Happy to discuss.

{{sender}}`,
    },
    {
      subject: "{{purpose}} — next steps",
      body: `Hi {{recipient}},

{{points}}

Thanks,
{{sender}}`,
    },
  ],
  Empathetic: [
    {
      subject: "Thinking of you — {{purpose}}",
      body: `Dear {{recipient}},

I wanted to reach out personally regarding {{purpose}}. I understand this may not be an easy topic, and I want you to know I'm approaching it with care.

{{points}}

Please take whatever time you need. I'm here to support you however I can, and there is no pressure to respond immediately. If it would help to talk it through, I'd be glad to make the time.

With warm regards,
{{sender}}`,
    },
    {
      subject: "A note on {{purpose}}",
      body: `Hi {{recipient}},

I hope this finds you in a good moment. I've been thinking about {{purpose}} and wanted to share where I'm at, gently.

{{points}}

I really value where we are, and I want to make sure this lands the right way. Let me know your thoughts whenever it feels right — no urgency.

Take care,
{{sender}}`,
    },
    {
      subject: "Wanted to check in — {{purpose}}",
      body: `Dear {{recipient}},

Just a quiet check-in about {{purpose}}. I know there's a lot going on, so I appreciate you making space for this.

{{points}}

Whatever direction feels right for you, I'm here to support it. Thank you for your understanding.

Warmly,
{{sender}}`,
    },
  ],
};

export function generateEmail(input: EmailInput, seed = Math.random()) {
  const variants = templates[input.tone];
  const idx = Math.floor(seed * variants.length) % variants.length;
  const v = variants[idx];
  const vars = {
    recipient: input.recipient || "there",
    sender: input.sender || "Alex",
    purpose: input.purpose || "our recent discussion",
    points: input.points?.trim() || "I wanted to share a few thoughts and align on next steps.",
  };
  return {
    subject: fill(v.subject, vars),
    body: fill(v.body, vars),
  };
}
