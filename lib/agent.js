// Agent tools and mocked reply logic for the skeleton.
// This version works WITHOUT an API key, so the demo runs today.
// TODO for the full build: replace runAgent with a real Meta Model API call
// to Muse Spark, with Muse Voice Transcribe for voice input, and
// Muse Spark Open via a partner endpoint for classification and routing.
// The grounding rule below must stay the same when the real model is plugged in:
// only cite lib/faq.js, otherwise hand off.

import { checkSeats, tourTimes, provider } from "./faq.js";

export function detectLanguage(text) {
  const lower = text.toLowerCase();
  // Simple skeleton detection. Replace with real language detection later.
  // Spanish keywords, Somali keywords are kept short for the demo.
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

export function bookTour(ageGroup, time) {
  // Skeleton booking: in-memory only, no real calendar yet.
  // In the full build, this becomes a real tool call with state saved.
  if (!tourTimes.includes(time)) {
    return { ok: false, message: `Tours in the demo are ${tourTimes.join(", ")}.` };
  }
  return {
    ok: true,
    ageGroup,
    time,
    message: `Tour booked for ${time}. Confirmation and reminder will be sent in the parent language.`,
  };
}

export function createBriefing(inquiries) {
  const tours = inquiries.filter((i) => i.tourBooked).length;
  return {
    inquiries: inquiries.length,
    toursBooked: tours,
    message: `${inquiries.length} inquiries overnight, ${tours} tours booked. Director briefing in English.`,
  };
}

export function runAgent(text) {
  const language = detectLanguage(text);
  const intent = classifyIntent(text);
  let ageGroup = "toddler";
  if (text.toLowerCase().includes("infant") || text.toLowerCase().includes("bebe")) ageGroup = "infant";
  if (text.toLowerCase().includes("preschool") || text.toLowerCase().includes("preescolar")) ageGroup = "preschool";

  const group = checkSeats(ageGroup);

  // Handoff rule: overnight care and anything not in FAQ must hand off.
  if (text.toLowerCase().includes("overnight") || text.toLowerCase().includes("weekend")) {
    return {
      language,
      intent,
      reply: "AI assistant: That is not in the information provided. The director will follow up, and I can offer you a tour. Tours are Tue and Thu, 10:00 am and 4:00 pm.",
      handoff: true,
    };
  }

  if (!group) {
    return { language, intent, reply: "AI assistant: I will ask the director to follow up on that question.", handoff: true };
  }

  if (group.open === 0) {
    return {
      language,
      intent,
      reply: `AI assistant: ${group.label} is full in the demo, waitlist only. Tuition in the demo is $${group.tuition} per month. Hours are ${provider.hours}. Would you like to join the waitlist?`,
      handoff: false,
    };
  }

  return {
    language,
    intent,
    reply: `AI assistant: Yes, ${group.open} ${ageGroup} seat(s) open in the demo. Tuition is $${group.tuition} per month. Hours are ${provider.hours}. Tours are ${tourTimes.join(", ")}. Which tour time would you like?`,
    handoff: false,
  };
}
