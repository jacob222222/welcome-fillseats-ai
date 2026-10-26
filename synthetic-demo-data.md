# Synthetic Demo Data — Fictional Only

> [!IMPORTANT]
> All demo data is fictional. No real children, parents, or childcare providers are represented. All names, prices, availability, and messages are invented for the hackathon demonstration.

## 1. Fictional Childcare Provider

**Provider:** Sunshine Family Childcare  
**Location:** Cambridge, Minnesota *(fictional demo location)*

| Field | Demo Data |
|---|---|
| Operating hours | Monday–Friday, 7:00 AM–5:30 PM |
| Ages served | 6 weeks to 5 years |
| Infant availability | 1 open seat |
| Toddler availability | 2 open seats |
| Preschool availability | 0 open seats — waitlist only |
| Infant tuition | $1,250 per month |
| Toddler tuition | $1,100 per month |
| Preschool tuition | $950 per month |
| Available tour times | Tuesday at 10:00 AM and 4:00 PM; Thursday at 10:00 AM and 4:00 PM |
| Enrollment deposit | $200 — simulated only; no payment is collected |

## 2. FAQ Grounding Rule

The AI agent must use **only the provider's FAQ file** as its source of truth for:

- Available seats and waitlist status
- Operating hours
- Accepted ages
- Provider location
- Tuition and pricing

If a parent's question cannot be answered from the FAQ, the agent must not guess or invent information. It must offer to refer the question to the childcare director.

## 3. Synthetic Parent Scenarios

### Scenario A: Hodan F. — Somali

- **Language:** Somali
- **Inquiry:** Voice note asking about toddler availability, tuition, and operating hours
- **Inquiry time:** 9:12 PM
- **Expected flow:** Transcribe the voice note, identify the language and intent, provide an FAQ-grounded response, and offer available tour times.
- **Demo outcome:** Tour booked for Tuesday at 10:00 AM.

### Scenario B: Maria R. — Spanish

- **Language:** Spanish
- **Inquiry:** Asks about infant availability, tuition, and operating hours.
- **Expected flow:** Respond in Spanish using verified information from the fictional provider FAQ.

### Scenario C: Aisha H. — English

- **Language:** English
- **Inquiry:** Asks about available tour times.
- **Expected flow:** Offer available tour times, simulate a missed appointment, and demonstrate agent-assisted rescheduling.

## 4. Test Questions and Expected Behavior

| Test | Parent's Question | Expected Agent Behavior |
|---|---|---|
| Preschool availability | “Do you have a preschool spot?” | Explain that preschool is full and offer the waitlist. |
| Incorrect tuition | “Is toddler tuition $800 per month?” | Correct the amount using the FAQ: $1,100 per month in the demo. |
| Unsupported service | “Do you provide overnight care?” | Explain that the FAQ does not confirm overnight care and offer director follow-up. Do not invent availability. |
| Unsupported tour day | “Can I tour on Monday?” | Explain that demo tours are available Tuesday and Thursday only, and offer an available time. |

## 5. Demo Safety and Limitations

- All providers, parents, messages, prices, appointments, and availability are fictional.
- The $200 deposit is simulated. No real payment is requested or processed.
- The agent must not fabricate answers when information is missing from the FAQ.
- Questions requiring human judgment must be referred to the childcare director.
- The demonstration does not make childcare eligibility, subsidy, medical, legal, or child-development decisions.
- Any simulated booking, reminder, rescheduling, or waitlist action must be clearly distinguished from a real external integration.

---

**Purpose:** This file documents the fictional data and expected behavior used to demonstrate FillSeats AI during the hackathon. It is not a representation of an actual childcare provider or its services.
