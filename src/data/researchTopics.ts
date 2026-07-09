export type Depth = "Quick Summary" | "Detailed Analysis" | "Deep Dive";
export type Format = "Summary + Key Points" | "Bullet Points Only" | "Executive Brief";

export interface Insight {
  title: string;
  detail: string;
}
export interface Recommendation {
  priority: "High" | "Medium" | "Low";
  title: string;
  detail: string;
  why: string;
}
export interface ResearchResult {
  summary: string;
  insights: Insight[];
  recommendations: Recommendation[];
}

const prebuilt: Record<string, ResearchResult> = {
  "remote work": {
    summary: `Remote work has fundamentally reshaped modern productivity paradigms. Studies from Stanford, Microsoft, and Gallup consistently show that knowledge workers operating remotely report 13–20% higher output on focused, individual tasks, while collaborative and mentorship-heavy work sees a measurable dip. The productivity gain is not evenly distributed: senior individual contributors benefit most, while junior employees and new hires often struggle with reduced spontaneous learning.

The financial implications are substantial. Organizations report savings of $10,000–$11,000 per remote employee annually through reduced real-estate footprints and lower attrition. However, these gains are partially offset by increased technology spend, cybersecurity investment, and the ongoing cost of intentional culture-building.

Employee well-being presents a mixed picture. Autonomy and time reclaimed from commuting drive higher satisfaction, but "always-on" behavior, blurred boundaries, and loneliness have driven a parallel rise in reported burnout. Hybrid models — typically 2–3 days in office — are emerging as the pragmatic center of gravity, capturing most remote benefits while preserving intentional collaboration.

Long-term winners will be organizations that treat remote work as an operating model, not a perk: rewriting how they hire, onboard, communicate, and evaluate performance.`,
    insights: [
      { title: "Focused work wins remotely", detail: "Individual deep work sees measurable output gains without office interruptions." },
      { title: "Collaboration requires intent", detail: "Spontaneous ideation and mentorship suffer without deliberate structure." },
      { title: "Junior talent bears the cost", detail: "New hires lose osmotic learning and take longer to reach full productivity." },
      { title: "Real-estate savings are real", detail: "Organizations save $10k+ per remote employee annually on average." },
      { title: "Burnout risk is elevated", detail: "Boundary erosion and isolation drive higher self-reported burnout scores." },
      { title: "Hybrid is the emerging standard", detail: "A 2–3 day in-office cadence captures most benefits with fewer drawbacks." },
      { title: "Async is a competitive skill", detail: "Written communication and documentation quality become organizational moats." },
    ],
    recommendations: [
      { priority: "High", title: "Codify async-first defaults", detail: "Move status updates, decisions, and planning into written channels.", why: "Reduces meeting load and creates a durable record for distributed teams." },
      { priority: "High", title: "Invest in junior onboarding", detail: "Structured mentorship programs and paired work for the first 90 days.", why: "Counteracts the largest weakness of remote-first operations." },
      { priority: "Medium", title: "Set intentional in-person cadences", detail: "Quarterly team offsites plus optional coworking days.", why: "Preserves social capital and cross-team relationships." },
      { priority: "Medium", title: "Measure outcomes, not hours", detail: "Shift performance systems to output and impact metrics.", why: "Aligns evaluation with the realities of distributed work." },
      { priority: "Low", title: "Provide home-office stipends", detail: "$500–$1,500 one-time plus recurring internet allowance.", why: "Signals investment in employee experience at modest cost." },
    ],
  },
  "artificial intelligence": {
    summary: `Artificial intelligence has transitioned from a specialized capability to a general-purpose business technology. Large language models, in particular, are being embedded into knowledge work at unprecedented pace — from customer support and content generation to code assistance and analytical reasoning. McKinsey estimates the productivity impact of generative AI at $2.6–$4.4 trillion annually across the global economy.

Adoption is bifurcating. Digitally mature organizations are moving from experimentation to production deployment, capturing 10–40% efficiency gains in targeted workflows. Others remain stuck in pilot purgatory, held back by data readiness, governance uncertainty, and unclear ROI attribution.

The competitive dynamics are shifting quickly. Model capabilities are commoditizing, but proprietary data, workflow integration, and evaluation infrastructure are emerging as durable advantages. The organizations winning are those combining AI with human expertise rather than positioning it as a replacement.

Risk considerations — hallucination, bias, IP exposure, and regulatory uncertainty — remain material but are increasingly manageable with mature MLOps, retrieval-augmented generation, and human-in-the-loop patterns.`,
    insights: [
      { title: "General-purpose adoption is here", detail: "AI has crossed from specialist tooling into everyday knowledge work." },
      { title: "Efficiency gains are real but uneven", detail: "Targeted workflows see 10–40% gains; broad rollouts often underperform." },
      { title: "Data quality is the moat", detail: "Proprietary, well-curated data beats access to better base models." },
      { title: "Human-in-the-loop wins", detail: "Augmentation patterns outperform replacement in accuracy and adoption." },
      { title: "Governance is a bottleneck", detail: "Legal, privacy, and IP concerns slow production deployment more than technology." },
      { title: "Evaluation is under-invested", detail: "Most orgs lack rigor in measuring AI output quality and drift." },
    ],
    recommendations: [
      { priority: "High", title: "Prioritize workflow-level deployment", detail: "Ship AI inside existing processes rather than as standalone tools.", why: "Drives real adoption and measurable ROI." },
      { priority: "High", title: "Build an internal AI governance council", detail: "Cross-functional group covering security, legal, and product.", why: "Removes the biggest blocker to scaled production use." },
      { priority: "Medium", title: "Invest in evaluation infrastructure", detail: "Automated benchmarks, red-teaming, and quality dashboards.", why: "You cannot improve what you cannot measure." },
      { priority: "Medium", title: "Upskill knowledge workers", detail: "Structured training on prompting, verification, and workflow redesign.", why: "AI amplifies skilled users far more than unskilled ones." },
    ],
  },
  "climate": {
    summary: `Climate change and corporate sustainability have converged from a compliance concern into a strategic imperative. Physical climate risks — heat, flooding, wildfire, water stress — are already measurably affecting supply chains, insurance costs, and asset valuations. Regulatory disclosure regimes (CSRD in Europe, SEC climate rules in the US) are formalizing what was previously voluntary reporting.

Corporate emissions reduction is accelerating but remains insufficient. Scope 1 and 2 targets are broadly on track for leading companies; Scope 3 — value-chain emissions — remains the hardest and largest challenge, often representing 70–90% of total footprint.

The economics are shifting rapidly. Solar, wind, and battery storage are now the cheapest sources of new electricity in most markets. Green hydrogen, sustainable aviation fuel, and industrial heat solutions are still costly but scaling. Consumer demand for sustainable products is real but price-sensitive: willingness to pay a premium exists but rarely exceeds 5–10%.`,
    insights: [
      { title: "Physical risk is material now", detail: "Extreme weather is affecting operations, insurance, and asset values today." },
      { title: "Disclosure is becoming mandatory", detail: "CSRD and SEC rules formalize what was voluntary ESG reporting." },
      { title: "Scope 3 is the real challenge", detail: "Value-chain emissions dominate footprints and are hardest to reduce." },
      { title: "Renewables have won on cost", detail: "Solar, wind, and storage are cheapest for new capacity in most markets." },
      { title: "Green premium has limits", detail: "Consumers accept 5–10% price premiums but rarely more without regulation." },
    ],
    recommendations: [
      { priority: "High", title: "Complete a physical risk assessment", detail: "Map exposure across assets and top-tier suppliers.", why: "Increasingly required by regulators and insurers." },
      { priority: "High", title: "Set science-based Scope 3 targets", detail: "Engage suppliers on emissions reporting and reduction.", why: "Largest source of footprint and increasingly disclosed." },
      { priority: "Medium", title: "Electrify and procure clean energy", detail: "Signed PPAs plus on-site solar where economic.", why: "Cost-neutral or cost-positive path to Scope 2 reduction." },
    ],
  },
  "digital marketing": {
    summary: `Digital marketing is undergoing a structural rebuild driven by three converging forces: the deprecation of third-party cookies, the maturation of AI-generated content and targeting, and rising consumer skepticism of traditional advertising. The winners are shifting spend toward first-party data, owned channels, and creator-driven distribution.

Performance marketing effectiveness is declining across the major platforms as attribution windows shorten and signal loss accumulates. Meta and Google remain dominant but increasingly opaque. TikTok has captured cultural relevance but monetization remains behind engagement. Retail media networks — Amazon, Walmart, and vertical marketplaces — are the fastest-growing ad channel.

Content strategy is polarizing. Short-form video and creator partnerships dominate for reach; long-form written and video content is regaining traction for consideration and trust-building. SEO is fragmenting as AI-generated search results reshape click-through economics.`,
    insights: [
      { title: "First-party data is the new oil", detail: "Cookie deprecation makes owned customer data the durable asset." },
      { title: "Retail media is exploding", detail: "Amazon and Walmart ads growing 20%+ annually and capturing budget." },
      { title: "Creators outperform brand content", detail: "Native creator distribution drives higher engagement per dollar." },
      { title: "SEO is being restructured", detail: "AI answers compress click-throughs; brand and depth become defensive moats." },
      { title: "Attribution is broken", detail: "MMM and incrementality testing are replacing last-click as the source of truth." },
    ],
    recommendations: [
      { priority: "High", title: "Build first-party data infrastructure", detail: "CDP, loyalty program, and consented data collection.", why: "Only durable targeting asset in a post-cookie world." },
      { priority: "High", title: "Reallocate to retail media", detail: "Test Amazon, Walmart Connect, and category-specific networks.", why: "Highest-growth channel with clearest attribution." },
      { priority: "Medium", title: "Shift to incrementality testing", detail: "Geo holdouts and MMM to measure true marginal ROI.", why: "Last-click attribution systematically over-credits lower-funnel spend." },
    ],
  },
  "cybersecurity": {
    summary: `Cybersecurity has moved from an IT concern to a board-level risk category. Ransomware, supply-chain attacks, and identity-based intrusions have replaced perimeter breaches as the dominant threat pattern. The average cost of a data breach reached $4.88M in 2024, with regulated industries and cloud misconfigurations driving disproportionate exposure.

The threat landscape is professionalizing. Ransomware operates as a franchised industry with negotiators, affiliates, and specialized initial-access brokers. AI is accelerating both offense (deepfake phishing, automated reconnaissance) and defense (behavioral analytics, automated response).

Identity is the new perimeter. Compromised credentials remain the leading initial-access vector, driving urgent adoption of phishing-resistant MFA (passkeys, hardware keys) and zero-trust architectures. Legacy VPNs and password-based systems are being retired across mature organizations.`,
    insights: [
      { title: "Identity is the perimeter", detail: "Credential compromise drives the majority of successful intrusions." },
      { title: "Ransomware is industrialized", detail: "Affiliate networks and access brokers make attacks scalable and specialized." },
      { title: "Supply chain is under-defended", detail: "Third-party software and vendor access are frequent breach vectors." },
      { title: "AI accelerates both sides", detail: "Attackers use it for phishing and recon; defenders for detection and response." },
      { title: "Regulation is tightening", detail: "SEC disclosure, EU NIS2, and sector rules formalize breach reporting." },
    ],
    recommendations: [
      { priority: "High", title: "Deploy phishing-resistant MFA", detail: "Passkeys or hardware keys for all privileged and workforce accounts.", why: "Eliminates the most common intrusion vector." },
      { priority: "High", title: "Adopt zero-trust access", detail: "Replace VPN with per-application, identity-aware access.", why: "Contains blast radius when identity is compromised." },
      { priority: "Medium", title: "Formalize supply-chain review", detail: "SBOMs, vendor risk assessments, and access reviews.", why: "Third-party risk is the fastest-growing category." },
    ],
  },
};

const keywords: Array<[RegExp, keyof typeof prebuilt]> = [
  [/remote|hybrid|work.from.home|wfh/i, "remote work"],
  [/\bai\b|artificial intelligence|machine learning|llm|generative/i, "artificial intelligence"],
  [/climate|sustain|carbon|emission|esg|green/i, "climate"],
  [/marketing|advertis|seo|brand|growth/i, "digital marketing"],
  [/security|cyber|hack|breach|ransomware|phish/i, "cybersecurity"],
];

function genericResult(topic: string): ResearchResult {
  const t = topic.trim() || "your topic";
  return {
    summary: `${t} sits at an interesting inflection point today. Multiple forces — technological acceleration, shifting stakeholder expectations, and evolving regulatory attention — are reshaping how organizations approach ${t} in practice.

Leading practitioners treat ${t} as a strategic capability rather than a discrete initiative. That framing changes what "success" looks like: rather than a single outcome, it becomes a system of aligned decisions across strategy, operations, talent, and measurement.

The most common failure mode with ${t} is under-scoping. Organizations tackle the visible surface layer without addressing the underlying operating model, and see initial gains fade within 12–18 months. The alternative — treating ${t} as an operating model change — is harder but produces more durable results.

Looking forward, expect continued convergence between ${t} and adjacent domains. The organizations positioning best today are building cross-functional muscle, investing in measurement, and being disciplined about what to say no to.`,
    insights: [
      { title: `${t} is a system, not a project`, detail: "Durable results require operating model change, not one-off initiatives." },
      { title: "Under-scoping is the default failure", detail: "Surface-level interventions fade within 12–18 months without deeper change." },
      { title: "Measurement lags execution", detail: "Most organizations act before they can measure, and struggle to iterate as a result." },
      { title: "Talent is the binding constraint", detail: "Access to skilled practitioners often gates the pace of progress." },
      { title: "Cross-functional wins", detail: "Siloed ownership underperforms integrated operating structures." },
      { title: "Discipline beats ambition", detail: "Saying no is the highest-leverage decision most teams do not make." },
    ],
    recommendations: [
      { priority: "High", title: `Define what "good" looks like for ${t}`, detail: "Concrete outcomes, timeframes, and measurement approach.", why: "Ambiguity is the leading driver of stalled progress." },
      { priority: "High", title: "Assign integrated ownership", detail: "Single accountable leader with cross-functional authority.", why: "Prevents the siloed execution that defeats most initiatives." },
      { priority: "Medium", title: "Invest in measurement early", detail: "Baseline metrics and instrumentation before scaling activity.", why: "You cannot iterate on outcomes you cannot see." },
      { priority: "Low", title: "Publish a short 'not-doing' list", detail: "Explicit scope boundaries reviewed quarterly.", why: "Focus produces disproportionate returns." },
    ],
  };
}

export function researchTopic(topic: string, depth: Depth): ResearchResult {
  const match = keywords.find(([re]) => re.test(topic));
  const base = match ? prebuilt[match[1]] : genericResult(topic);
  if (depth === "Quick Summary") {
    return {
      summary: base.summary.split("\n\n").slice(0, 2).join("\n\n"),
      insights: base.insights.slice(0, 4),
      recommendations: base.recommendations.slice(0, 2),
    };
  }
  if (depth === "Deep Dive") {
    return {
      ...base,
      summary:
        base.summary +
        `\n\nFor deeper context, it is worth noting that the pace of change in this area continues to accelerate. Practitioners who commit to a structured operating cadence — measure, learn, adjust — consistently outperform those pursuing ambitious one-off transformations. Investment in foundational capabilities compounds over time and creates optionality for future strategic moves.`,
    };
  }
  return base;
}
