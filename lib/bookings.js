// Shared in-memory booking store for the Welcome demo.
// Bookings reset on server restart, this is not production persistence, calendar sync is a later step.

import { seats } from "./faq.js";

export const inquiries = [];

let nextId = 1;

export function recordInquiry({ language, ageGroup, intent, question, tourTime = null, waitlist = false, handoff = false }) {
  const group = ageGroup ? seats[ageGroup] : null;
  const entry = {
    id: nextId++,
    timestamp: new Date().toISOString(),
    language: language || "en",
    ageGroup: ageGroup || null,
    intent: intent || null,
    question: question || "",
    tourTime: tourTime || null,
    waitlist: Boolean(waitlist),
    handoff: Boolean(handoff),
    seatsOpen: group ? group.open : null,
    tuitionAtStake: tourTime && group ? group.tuition : null,
  };
  inquiries.push(entry);
  return entry;
}

export function getInquiries() {
  return inquiries;
}

export function clearInquiries() {
  inquiries.length = 0;
  nextId = 1;
}
