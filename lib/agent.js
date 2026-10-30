// Welcome agent: Muse Spark via Meta Model API, grounded in lib/faq.js.
// Grounding rule: answer ONLY from lib/faq.js for Sunshine Family
// Childcare, Cambridge, MN. Never invent a price, seat count, or tour
// time. If the answer is not in lib/faq.js, hand off and offer a tour.

import { checkSeats, tourTimes, provider, seats } from "./faq.js";
import { recordInquiry, getInquiries } from "./bookings.js";

const SPARK_MODEL = "muse-spark-1.3";
const SPARK_URL = "https://api.meta.ai/v1/chat/completions";

export function detectLanguage(text) {
  const lower = text.toLowerCase();
  if (/(hola|precio|horario|guarderia|infantil)/.test(lower)) return "es";
  if (/(salaam|qiimo|saacad|caruur)/.test(lower)) return "so";
  return "en";
}

export function classifyIntent(text) {
  const lower = text.toLowerCase();
  if (lower.includes("tour")) return "book_tour";
  if (lower.includes("waitlist") || lower.includes("preschool")) return "waitlist";
  if (lower.includes("price") || lower.includes("cost") || lower.includes("precio") || lower.includes("qiimo") || lower.includes("tuition")) return "price_check";
  if (lower.includes("hour") || lower.includes("horario") || lower.includes("saacad")) return "hours_check";
  return "spot_check";
}

export function inferAgeGroup(text) {
  const lower = (text || "").toLowerCase();
  if (lower.includes("infant") || lower.includes("bebe")) return "infant";
  if (lower.includes("preschool") || lower.includes("preescolar")) return "preschool";
  return "toddler";
}

export function bookTour(ageGroup, time, meta = {}) {
  if (!tourTimes.includes(time)) {
    return { ok: false, message: `Tours in the demo are ${tourTimes.join(", ")}.` };
  }
  recordInquiry({
    language: meta.language || "en",
    ageGroup,
    intent: meta.intent || "book_tour",
    question: meta.question || "",
    tourTime: time,
  });
  return {
    ok: true,
    ageGroup,
    time,
    message: `Tour booked for ${time}. Confirmation and reminder will be sent in the parent language.`,
  };
}

export function addToWaitlist(ageGroup, meta = {}) {
  const group = checkSeats(ageGroup);
  if (!group) return { ok: false, message: "Unknown age group." };
  recordInquiry({
    language: meta.language || "en",
    ageGroup,
    intent: meta.intent || "waitlist",
    question: meta.question || "",
    waitlist: true,
  });
  return { ok: true, ageGroup, message: `Added to the ${ageGroup} waitlist.` };
}

export function sendReminder(time) {
  if (!tourTimes.includes(time)) {
    return { ok: false, message: `Tours in the demo are ${tourTimes.join(", ")}.` };
  }
  return { ok: true, time, message: `Reminder set for the ${time} tour.` };
}

export function rescheduleTour(oldTime, newTime) {
  if (!tourTimes.includes(newTime)) {
    return { ok: false, message: `Tours in the demo are ${tourTimes.join(", ")}.` };
  }
  return { ok: true, oldTime, newTime, message: `Tour moved from ${oldTime} to ${newTime}.` };
}

export function createBriefing(inquiries) {
  const tours = inquiries.filter((i) => i.tourBooked).length;
  return {
    inquiries: inquiries.length,
    toursBooked: tours,
    message: `${inquiries.length} inquiries overnight, ${tours} tours booked. Director briefing in English.`,
  };
}

const TOOLS = [
  {
    type: "function",
    function: {
      name: "check_seats",
      description: "Look up open seats and tuition for an age group from the verified FAQ.",
      parameters: {
        type: "object",
        properties: { ageGroup: { type: "string", enum: ["infant", "toddler", "preschool"] } },
        required: ["ageGroup"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "book_tour",
      description: "Book a tour at one of the verified tour times.",
      parameters: {
        type: "object",
        properties: {
          ageGroup: { type: "string", enum: ["infant", "toddler", "preschool"] },
          time: { type: "string", description: "One of the verified tour times." },
        },
        required: ["ageGroup", "time"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add_to_waitlist",
      description: "Add the parent to the waitlist for a full age group.",
      parameters: {
        type: "object",
        properties: { ageGroup: { type: "string", enum: ["infant", "toddler", "preschool"] } },
        required: ["ageGroup"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "send_reminder",
      description: "Set a confirmation reminder for a booked tour time.",
      parameters: {
        type: "object",
        properties: { time: { type: "string", description: "The booked tour time." } },
        required: ["time"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "reschedule_tour",
      description: "Move a tour to another verified tour time.",
      parameters: {
        type: "object",
        properties: {
          oldTime: { type: "string" },
          newTime: { type: "string", description: "One of the verified tour times." },
        },
        required: ["oldTime", "newTime"],
      },
    },
  },
];

function runLocalTool(name, args, meta = {}) {
  if (name === "check_seats") return checkSeats(args.ageGroup) || { error: "Unknown age group." };
  if (name === "book_tour") return bookTour(args.ageGroup, args.time, meta);
  if (name === "add_to_waitlist") return addToWaitlist(args.ageGroup, meta);
  if (name === "send_reminder") return sendReminder(args.time);
  if (name === "reschedule_tour") return rescheduleTour(args.oldTime, args.newTime);
  return { error: `Unknown tool: ${name}` };
}

function buildSystemPrompt(language) {
  const langName = language === "es" ? "Spanish" : language === "so" ? "Somali" : "English";
  const faq = JSON.stringify({ provider, seats, tourTimes });
  return [
    `You are Welcome, the AI assistant for Sunshine Family Childcare, Cambridge, MN.`,
    `Reply in ${langName}. Start every reply with exactly "AI assistant: ".`,
    `Answer ONLY from this verified FAQ: ${faq}`,
    `Never invent a price, seat count, or tour time. Only state what the tools return.`,
    `You MUST call check_seats before stating seats or tuition.`,
    `You MUST call book_tour to book, add_to_waitlist for full groups, send_reminder for reminders, reschedule_tour to move a tour.`,
    `If the answer is not in the FAQ (for example overnight or weekend care), say it is not in the information provided, say the director will follow up, and offer a tour from the verified times.`,
  ].join(" ");
}

function buildFallback(text, language, intent) {
  const ageGroup = inferAgeGroup(text);
  const lower = text.toLowerCase();
  if (lower.includes("overnight") || lower.includes("weekend")) {
    return {
      language, intent, ageGroup, handoff: true,
      reply: `AI assistant: That is not in the information provided. The director will follow up, and I can offer you a tour. Tours are ${tourTimes.join(", ")}.`,
    };
  }
  const group = checkSeats(ageGroup);
  if (!group) {
    return { language, intent, ageGroup, handoff: true, reply: "AI assistant: I will ask the director to follow up on that question." };
  }
  if (group.open === 0) {
    return {
      language, intent, ageGroup, handoff: false,
      reply: `AI assistant: ${group.label} is full in the demo, waitlist only. Tuition in the demo is $${group.tuition} per month. Hours are ${provider.hours}. Would you like to join the waitlist?`,
    };
  }
  return {
    language, intent, ageGroup, handoff: false,
    reply: `AI assistant: Yes, ${group.open} ${ageGroup} seat(s) open in the demo. Tuition is $${group.tuition} per month. Hours are ${provider.hours}. Tours are ${tourTimes.join(", ")}. Which tour time would you like?`,
  };
}

function fallbackReply(text, language, intent) {
  const result = buildFallback(text, language, intent);
  recordInquiry({
    language, ageGroup: result.ageGroup, intent,
    question: text, handoff: result.handoff,
  });
  return { language, intent, handoff: result.handoff, reply: result.reply };
}

function mentionsInventedPrice(reply) {
  const allowed = new Set(Object.values(seats).map((s) => s.tuition));
  const found = reply.match(/\$(\d[\d,]*)/g) || [];
  return found.some((m) => !allowed.has(Number(m.slice(1).replace(/,/g, ""))));
}

async function callSpark(apiKey, messages) {
  const res = await fetch(SPARK_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: SPARK_MODEL, messages, tools: TOOLS, tool_choice: "auto", temperature: 0 }),
  });
  if (!res.ok) throw new Error(`Spark request failed: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message;
}

export async function runAgent(text) {
  const language = detectLanguage(text);
  const intent = classifyIntent(text);
  const apiKey = process.env.META_MODEL_API_KEY;
  if (!apiKey) return fallbackReply(text, language, intent);

  const before = getInquiries().length;
  const meta = { language, intent, question: text };
  try {
    const messages = [
      { role: "system", content: buildSystemPrompt(language) },
      { role: "user", content: text },
    ];
    let replyText = "";
    for (let step = 0; step < 4; step++) {
      const msg = await callSpark(apiKey, messages);
      messages.push(msg);
      const calls = msg.tool_calls || [];
      if (calls.length === 0) {
        replyText = msg.content || "";
        break;
      }
      for (const call of calls) {
        let args = {};
        try { args = JSON.parse(call.function.arguments || "{}"); } catch { args = {}; }
        const result = runLocalTool(call.function.name, args, meta);
        messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(result) });
      }
    }
    if (!replyText) {
      if (getInquiries().length !== before) {
        const safe = buildFallback(text, language, intent);
        return { language, intent, handoff: safe.handoff, reply: safe.reply };
      }
      return fallbackReply(text, language, intent);
    }
    let reply = replyText.trim();
    if (!reply.startsWith("AI assistant:")) reply = `AI assistant: ${reply}`;
    if (mentionsInventedPrice(reply)) {
      if (getInquiries().length !== before) {
        const safe = buildFallback(text, language, intent);
        return { language, intent, handoff: safe.handoff, reply: safe.reply };
      }
      return fallbackReply(text, language, intent);
    }
    const handoff = /not in the information|director will follow up/i.test(reply);
    if (getInquiries().length === before) {
      recordInquiry({
        language, ageGroup: inferAgeGroup(text), intent,
        question: text, handoff,
      });
    }
    return { language, intent, reply, handoff };
  } catch {
    if (getInquiries().length !== before) {
      const safe = buildFallback(text, language, intent);
      return { language, intent, handoff: safe.handoff, reply: safe.reply };
    }
    return fallbackReply(text, language, intent);
  }
}
