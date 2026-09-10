/**
 * Mock "AI" generators. Purely client-side, deterministic-ish text builders that
 * produce realistic looking output for the MVP.
 */

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const sentences = (text: string) =>
  text
    .split(/\n+|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

const bullets = (text: string) =>
  text
    .split(/\n+|;|•|\u2022/)
    .map((s) => s.replace(/^[-*\d.)\s]+/, "").trim())
    .filter(Boolean);

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ---------------------------------- Email --------------------------------- */

export type EmailInput = {
  purpose: string;
  recipient: string;
  tone: string;
  keyPoints: string;
};

export function generateEmail({ purpose, recipient, tone, keyPoints }: EmailInput) {
  const name = recipient.trim() || "there";
  const points = bullets(keyPoints);
  const topic = sentences(purpose)[0] ?? purpose.trim();
  const subject = titleCase(topic.replace(/\.$/, "")).slice(0, 78);

  const openings: Record<string, string> = {
    Professional: `Dear ${name},\n\nI hope this message finds you well.`,
    Formal: `Dear ${name},\n\nI am writing to you regarding the matter set out below.`,
    Friendly: `Hi ${name},\n\nHope you're doing well!`,
    Concise: `Hi ${name},`,
  };

  const closings: Record<string, string> = {
    Professional: "Thank you for your time and consideration.\n\nKind regards,\n[Your name]",
    Formal:
      "I would be grateful for your response at your earliest convenience.\n\nYours sincerely,\n[Your name]",
    Friendly: "Thanks so much — let me know what you think!\n\nBest,\n[Your name]",
    Concise: "Thanks,\n[Your name]",
  };

  const body =
    tone === "Concise"
      ? `${topic.replace(/\.$/, "")}.`
      : `I am reaching out about ${topic.charAt(0).toLowerCase() + topic.slice(1).replace(/\.$/, "")}. Below is a short summary of the relevant details for your review.`;

  const pointBlock = points.length
    ? `\n\n${points.map((p) => `• ${titleCase(p)}`).join("\n")}`
    : "";

  const extra = sentences(purpose).slice(1).join(" ");

  return [
    `Subject: ${subject}`,
    "",
    openings[tone] ?? openings.Professional,
    "",
    body + pointBlock,
    extra ? `\n${extra}` : "",
    "",
    closings[tone] ?? closings.Professional,
  ]
    .filter((l) => l !== undefined)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

/* ------------------------------ Meeting notes ------------------------------ */

export type MeetingInput = { title: string; notes: string };

export function generateMeetingSummary({ title, notes }: MeetingInput) {
  const lines = bullets(notes);
  const decisionWords = /(decid|agree|approv|confirm|sign off|final)/i;
  const actionWords = /(will|action|todo|to do|follow up|assign|send|prepare|draft|owner)/i;
  const dateWords =
    /(by |due|deadline|monday|tuesday|wednesday|thursday|friday|next week|end of|\d{1,2}\/\d{1,2}|\d{1,2} (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))/i;

  const decisions = lines.filter((l) => decisionWords.test(l));
  const actions = lines.filter((l) => actionWords.test(l) && !decisionWords.test(l));
  const deadlines = lines.filter((l) => dateWords.test(l));
  const keyPoints = lines.filter((l) => !decisions.includes(l) && !actions.includes(l));

  const section = (heading: string, items: string[], empty: string) =>
    `${heading}\n${items.length ? items.map((i) => `• ${titleCase(i)}`).join("\n") : `• ${empty}`}`;

  return [
    title.trim() ? `MEETING: ${title.trim()}` : "MEETING SUMMARY",
    "",
    "OVERVIEW",
    `This meeting covered ${lines.length} discussion point${lines.length === 1 ? "" : "s"}. ${
      decisions.length
        ? `${decisions.length} decision${decisions.length === 1 ? " was" : "s were"} recorded`
        : "No formal decisions were recorded"
    } and ${actions.length || "no"} follow-up action${actions.length === 1 ? "" : "s"} identified.`,
    "",
    section("KEY POINTS", keyPoints.slice(0, 8), "No additional discussion points captured."),
    "",
    section("DECISIONS", decisions, "No decisions were explicitly recorded."),
    "",
    section(
      "ACTION ITEMS",
      actions.map((a) => `${titleCase(a)} — owner: [assign]`),
      "No action items identified.",
    ),
    "",
    section("DEADLINES", deadlines, "No deadlines mentioned."),
  ].join("\n");
}

/* ------------------------------- Task planner ------------------------------ */

export type PlannerInput = {
  goal: string;
  tasks: string;
  deadline: string;
  priority: string;
};

export function generateTaskPlan({ goal, tasks, deadline, priority }: PlannerInput) {
  const items = bullets(tasks);
  const phases = ["Prepare", "Execute", "Review"];
  const grouped = phases.map((phase, i) => ({
    phase,
    items: items.filter((_, idx) => idx % 3 === i),
  }));

  const effort = ["30 min", "1 hr", "2 hrs", "half day"];

  return [
    `GOAL\n${goal.trim()}`,
    "",
    `PRIORITY: ${priority}${deadline.trim() ? `   |   TARGET DATE: ${deadline.trim()}` : ""}`,
    "",
    "SUGGESTED PLAN",
    ...grouped
      .filter((g) => g.items.length)
      .flatMap((g, gi) => [
        `\nPhase ${gi + 1} — ${g.phase}`,
        ...g.items.map(
          (t, i) => `  ${gi + 1}.${i + 1} ${titleCase(t)}  (est. ${effort[(gi + i) % effort.length]})`,
        ),
      ]),
    "",
    "MILESTONES",
    `• Kick-off: confirm scope and gather everything needed for "${goal.trim().slice(0, 60)}"`,
    "• Midpoint check: review progress and re-prioritise anything at risk",
    `• Completion: final review${deadline.trim() ? ` before ${deadline.trim()}` : ""} and hand-off`,
    "",
    "SUGGESTED ORDER OF WORK",
    ...items.slice(0, 10).map((t, i) => `${i + 1}. ${titleCase(t)}`),
    "",
    "RISKS TO WATCH",
    "• Under-estimating the first phase — add buffer time.",
    priority === "High" || priority === "Urgent"
      ? "• High priority: block focused time daily and flag blockers early."
      : "• Keep momentum with a short weekly review.",
  ].join("\n");
}

/* ----------------------------- Research assistant -------------------------- */

export type ResearchInput = { topic: string; context: string; outputType: string };

export function generateResearch({ topic, context, outputType }: ResearchInput) {
  const t = topic.trim().replace(/\.$/, "");
  const ctx = context.trim();
  const ctxLine = ctx ? `\nCONTEXT CONSIDERED\n${ctx}\n` : "";

  const blocks: Record<string, string> = {
    "Research Summary": [
      `RESEARCH SUMMARY — ${t}`,
      ctxLine,
      "OVERVIEW",
      `${titleCase(t)} is an area where current thinking centres on definitions, drivers and measurable outcomes. A useful summary separates what is well established from what remains contested.`,
      "",
      "WHAT THE LITERATURE GENERALLY AGREES ON",
      `• Core terminology around ${t} is broadly settled, though applied definitions vary by sector.`,
      `• Evidence points to several consistent drivers shaping outcomes in ${t}.`,
      "• Context (scale, sector, region) strongly moderates results.",
      "",
      "WHERE VIEWS DIVERGE",
      "• Measurement approaches and which indicators matter most.",
      "• The weight given to short-term versus long-term effects.",
      "",
      "IMPLICATIONS",
      `Work on ${t} is strongest when claims are tied to a clearly stated context and a defined measure of success.`,
    ].join("\n"),

    "Key Concepts": [
      `KEY CONCEPTS — ${t}`,
      ctxLine,
      `1. Definition and scope\n   What counts as ${t}, and what sits just outside it.`,
      `2. Drivers and mechanisms\n   The forces that cause change within ${t}.`,
      "3. Stakeholders\n   Who is affected, who decides, and who measures.",
      "4. Measurement\n   Indicators, data sources and their known limitations.",
      "5. Constraints\n   Cost, time, ethics, regulation and access to data.",
      `6. Outcomes\n   The results used to judge success in ${t}.`,
    ].join("\n"),

    "Research Questions": [
      `RESEARCH QUESTIONS — ${t}`,
      ctxLine,
      "PRIMARY QUESTION",
      `• How does ${t} influence outcomes within the setting you are studying?`,
      "",
      "SUPPORTING QUESTIONS",
      `• What factors most strongly shape ${t}?`,
      `• How is ${t} currently measured, and how reliable are those measures?`,
      `• Which groups benefit or lose out from changes in ${t}?`,
      `• What would meaningful improvement in ${t} look like in practice?`,
      "",
      "QUESTIONS TO AVOID",
      "• Questions answerable with a single yes/no.",
      "• Questions with no realistic data source available to you.",
    ].join("\n"),

    "Literature Review Outline": [
      `LITERATURE REVIEW OUTLINE — ${t}`,
      ctxLine,
      `1. Introduction\n   Scope, rationale and why ${t} matters now.`,
      "2. Search strategy\n   Databases, keywords, inclusion and exclusion criteria.",
      "3. Theoretical framing\n   Models and frameworks commonly applied.",
      "4. Thematic review\n   4.1 Definitions and scope\n   4.2 Drivers and mechanisms\n   4.3 Measurement and evidence\n   4.4 Critiques and counter-evidence",
      "5. Gaps in the literature\n   What is under-studied or methodologically weak.",
      "6. Conclusion\n   Synthesis and the space your work occupies.",
    ].join("\n"),

    "Research Plan": [
      `RESEARCH PLAN — ${t}`,
      ctxLine,
      "PHASE 1 — Scoping (week 1)\n• Refine the question and define key terms.\n• Run initial searches and log sources.",
      "PHASE 2 — Review (weeks 2-3)\n• Read and annotate core sources.\n• Build a thematic matrix of findings.",
      "PHASE 3 — Method (week 4)\n• Choose an approach and justify it.\n• Prepare instruments and address ethics.",
      "PHASE 4 — Analysis (weeks 5-6)\n• Collect and analyse data.\n• Compare results against the literature.",
      "PHASE 5 — Write-up (weeks 7-8)\n• Draft, revise and reference thoroughly.",
      "",
      "DELIVERABLES\n• Annotated source list\n• Thematic matrix\n• Final written output",
    ].join("\n"),
  };

  return (blocks[outputType] ?? blocks["Research Summary"]).replace(/\n{3,}/g, "\n\n");
}

/* --------------------------------- Chatbot -------------------------------- */

export const CHAT_GREETING =
  "Hi! I\u2019m your AI neXtstep assistant. I can help with workplace communication, productivity, research and career preparation. What\u2019s your neXt step?";

export function generateChatReply(message: string) {
  const m = message.toLowerCase();

  if (/(cv|resume|curriculum)/.test(m)) {
    return "For a CV that gets read: keep it to one or two pages, lead each bullet with an action verb, and quantify results where you can (\u201ccut turnaround from 5 days to 2\u201d). Tailor the top third to the specific role \u2014 that is the part recruiters actually scan. Want me to help you rewrite a particular bullet?";
  }
  if (/(interview)/.test(m)) {
    return "Interview prep works best in three layers: (1) know the role \u2014 re-read the description and map each requirement to an example of yours; (2) prepare 5\u20136 STAR stories you can flex to different questions; (3) prepare two thoughtful questions to ask them. Would you like practice questions for a specific role?";
  }
  if (/(email|write|message|reply)/.test(m)) {
    return "A strong workplace email has a specific subject line, one clear ask in the first two sentences, supporting detail underneath, and a stated next step. If you tell me the recipient and what you need, I can sketch a draft \u2014 or use the Smart Email Generator for a full version.";
  }
  if (/(meeting|notes|minutes)/.test(m)) {
    return "After a meeting, capture four things while it is fresh: decisions made, actions with owners, deadlines, and anything left unresolved. Everything else is context. Paste your raw notes into the Meeting Notes Summarizer and I will structure them for you.";
  }
  if (/(plan|task|deadline|organis|organiz|productiv|time)/.test(m)) {
    return "Try this: write the goal as one sentence, list every task without judging it, then group tasks into prepare / execute / review. Give each an honest time estimate and schedule only the first phase. The AI Task Planner will build that structure for you automatically.";
  }
  if (/(research|study|dissertation|thesis|source)/.test(m)) {
    return "Good research starts with a question narrow enough to answer and broad enough to matter. Define your key terms, decide what evidence would count, then search deliberately rather than widely. The AI Research Assistant can turn a topic into concepts, questions or a full plan.";
  }
  if (/(career|job|graduate|intern)/.test(m)) {
    return "Early career progress usually comes from three things: visible reliability, one skill you are known for, and a small network of people who have seen your work. Pick one role you want in 12 months and work backwards to the gaps. Which part would you like to dig into?";
  }
  if (/(hello|hi|hey|thanks|thank you)/.test(m)) {
    return "Happy to help! Tell me what you are working on \u2014 an email, a set of meeting notes, a plan, a research topic, or career prep \u2014 and we will take the neXt step together.";
  }

  return `Here is how I would approach "${message.trim().slice(0, 120)}":\n\n1. Clarify the outcome you want and who it is for.\n2. List what you already know and what is missing.\n3. Take the smallest useful next action today, and review tomorrow.\n\nIf you can share a little more detail, I can give you something more specific \u2014 or try one of the dedicated tools in the sidebar.`;
}
