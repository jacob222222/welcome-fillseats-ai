// Verified provider FAQ. This is the ONLY source for seats, hours, and prices.
// All data is fictional, for the hackathon demo only.
// If a question is not in this file, the agent must hand off, not guess.

export const provider = {
  name: "Sunshine Family Childcare",
  location: "Cambridge, MN",
  hours: "Mon to Fri, 7:00 am to 5:30 pm",
  ages: "6 weeks to 5 years",
};

export const seats = {
  infant: { label: "Infant, 6 weeks to 15 months", open: 1, tuition: 1250 },
  toddler: { label: "Toddler, 16 months to 33 months", open: 2, tuition: 1100 },
  preschool: { label: "Preschool, 34 months to 5 years", open: 0, tuition: 950 },
};

export const tourTimes = [
  "Tue 10:00 am",
  "Tue 4:00 pm",
  "Thu 10:00 am",
  "Thu 4:00 pm",
];

export function checkSeats(ageGroup) {
  const group = seats[ageGroup];
  if (!group) return null;
  return group;
}

export function getFaqAnswer(ageGroup) {
  const group = checkSeats(ageGroup);
  if (!group) return null;
  if (group.open > 0) {
    return `Yes, ${group.open} ${ageGroup} seat(s) open in the demo. Tuition is $${group.tuition} per month. Hours are ${provider.hours}. Tours are ${tourTimes.join(", ")}.`;
  }
  return `Preschool is full in the demo, waitlist only. Tuition in the demo is $${group.tuition} per month. Hours are ${provider.hours}.`;
}
