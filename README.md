# Welcome by FillSeats AI

**Meta Global AI Developer Hackathon · Indie Track · Team Jesus**

**Theme:** Build for Your World  

- **Demo Video:** [ADD LINK HERE BEFORE SUBMISSION]
- **Live Demo:** [ADD LINK HERE BEFORE SUBMISSION]

---

## What Was Built During the Hackathon

All code in this repository was written between October 26 and November 4, 2026, during the hackathon, using Muse Code. No code from before the hackathon was reused.

The idea was discussed before the hackathon as a concept and pilot offer draft only, with no code. Everything a judge sees here, including the agent workflow, booking logic, briefing view, and privacy-safe flyer flow, is new work from the hackathon period.

## The Problem

A small childcare provider in Minnesota loses over $1,000 per month for every empty seat, while parent inquiries sit unanswered at night.

For Somali- and Spanish-speaking parents, the barrier is bigger than speed. An English-only reply, combined with tour and enrollment form steps that are difficult to follow, can block enrollment even when a spot is available.

## The Solution

**Welcome by FillSeats AI** is a voice-first, multilingual enrollment concierge that works alongside childcare management platforms such as Brightwheel and Procare. It does not replace them. It focuses exclusively on enrollment.

A parent speaks or types in Somali, Spanish, or English. Welcome transcribes the message, answers questions using only the provider's verified seat availability, hours, and prices, books tours, sends reminders, and reschedules missed tours. The childcare director receives an English-language morning briefing.

### Key Features

- **Multilingual communication:** Supports parent inquiries in Somali, Spanish, and English.
- **Voice-first experience:** Converts voice notes into text for processing.
- **Verified answers:** Uses the provider's FAQ as the source of truth for seats, hours, ages, location, and tuition.
- **Automated tour booking:** Offers available tour times and books the parent's selected time.
- **Automated reminders:** Sends confirmations and tour reminders in the parent's language.
- **No-show recovery:** Helps parents reschedule missed tours without requiring immediate director intervention.
- **Waitlist management:** Offers a waitlist when an age group is full instead of promising an unavailable spot.
- **Director briefing:** Summarizes overnight inquiries, languages, tours booked, and tuition associated with enrollment opportunities.
- **Privacy-safe marketing:** Uses SAM 3.1 to segment people and blur faces in classroom photos before creating promotional flyers with Muse Image.

## Demo Flow

The demo follows this sequence:

1. **Parent inquiry:** A parent sends a voice note or text in Somali, Spanish, or English. In the demo, a fictional Somali-speaking parent asks about toddler availability, tuition, and hours at 9:12 PM.
2. **Voice transcription:** Muse Voice Transcribe converts the voice note into text displayed on screen.
3. **Language and intent detection:** The agent identifies the parent's language and intent, then responds in the parent's language using information from the verified FAQ.
4. **Tour booking:** The agent offers available tour times, books the parent's selected time, and sends a confirmation and reminder in the parent's language.
5. **No-show recovery:** If the parent misses the tour, the agent offers rescheduling without requiring director input.
6. **Waitlist handling:** If the requested age group is full, the agent offers the waitlist instead of incorrectly promising a seat.
7. **Director briefing:** The next morning, the director opens an English-language briefing showing overnight inquiries, languages, tours booked, and tuition at stake.
8. **Privacy-safe flyer generation:** The director uploads a classroom photo. SAM 3.1 segments people and blurs faces, and Muse Image generates a promotional flyer for the available seat.

## Meta AI Models and Tools Used

| Model or Tool | Purpose |
|---|---|
| **Muse Spark** via Meta Model API | Powers the parent agent, tour-booking agent, and director briefing. |
| **Muse Voice Transcribe** via Meta Model API | Converts voice notes into text. |
| **SAM 3.1** via Meta Model API | Segments people in classroom photos and supports face blurring for privacy-safe marketing. |
| **Muse Image** via Meta Model API | Generates promotional flyers for open seats and visual tour checklists. |
| **Muse Spark Open** via an open-weight model partner | Handles inquiry classification and language and intent routing. |
| **Muse Code** | Used to build the repository during the hackathon. |
| **Muse Wonder** | Optional bonus feature, if implemented. Not required for the core workflow. |

**Open-weight model configuration:** Replace the placeholder below with the partner and endpoint actually used.

- **Partner:** `[Baseten, Modal, or Fireworks — confirm actual provider]`
- **Model:** `meta-models/muse-spark-open-1026` for Baseten, or the equivalent open-weight endpoint name for the provider actually used.

> **Important:** Only claim integrations and model usage that are actually implemented and verified in the submitted code.

## Guardrails and Verifiable Agent Design

Welcome is designed to prioritize reliable answers, transparent AI use, and appropriate human handoffs.

### 1. Verified Information Only

The agent can answer questions about seats, hours, ages, location, and tuition only using the provider FAQ file included in this repository.

If a question cannot be answered from that file, the agent hands it off to a human instead of guessing.

### 2. Test Cases Demonstrated

The demo includes the following scenarios:

- **Preschool availability:** Preschool is full, so the correct response is to offer the waitlist.
- **Incorrect tuition:** A wrong price is corrected using the verified FAQ price.
- **Unsupported service:** Overnight care is not listed in the FAQ, so the agent offers director follow-up rather than inventing availability or pricing.

### 3. Transparent AI Communication

Every response sent to a parent is clearly labeled as coming from an AI assistant.

### 4. Appropriate Boundaries

Welcome does not provide:

- Medical advice.
- Child development advice.
- Legal advice.
- Childcare subsidy eligibility decisions.

It provides general enrollment information and hands off eligibility questions to a human.

### 5. Synthetic Data Only

No real children, parents, providers, or payments are involved in the demo.

All demo data is synthetic and clearly labeled as fictional.

## Synthetic Demo Data

The demo uses the following fictional childcare provider and enrollment information.

| Field | Demo Value |
|---|---|
| Provider | Sunshine Family Childcare |
| Location | Cambridge, Minnesota |
| Provider status | Fictional |
| Infant seats | 1 available |
| Toddler seats | 2 available |
| Preschool seats | 0 available; waitlist only |
| Operating hours | Monday–Friday, 7:00 AM–5:30 PM |
| Infant tuition | $1,250/month |
| Toddler tuition | $1,100/month |
| Preschool tuition | $950/month |

All names, prices, availability, and messages above are fictional and used exclusively for demonstration purposes.

See [`synthetic-demo-data.md`](synthetic-demo-data.md) for the full list of synthetic demo data.

## Project Structure

> **Development note:** Update this section to match the actual repository structure as implementation progresses.

```text
.
├── app/
│   ├── parent/             # Next.js parent chat view
│   └── director/           # Director briefing view
├── lib/
│   ├── agent/              # Agent orchestration and workflow
│   │   ├── language/       # Language detection
│   │   ├── intent/         # Intent classification
│   │   ├── grounding/      # Verified FAQ lookup
│   │   └── tools/          # Enrollment and booking tools
│   ├── faq/                # Verified provider FAQ
│   └── vision/             # SAM 3.1 and Muse Image workflows
├── data/                   # Synthetic demo data only
├── synthetic-demo-data.md  # Synthetic data documentation
├── .env.example            # Environment variable template
├── README.md
└── package.json
```

The planned agent tools include:

- `check_seats`
- `book_tour`
- `send_reminder`
- `reschedule_tour`
- `add_to_waitlist`
- `create_briefing`

The verified provider FAQ is the only authorized source for enrollment facts such as prices, hours, and available seats.

**Note:** The structure above describes the intended organization. Update file names and directories to reflect the actual implementation before submission.

## How to Run Locally

> **Development note:** Replace these instructions with the exact commands and configuration required by the final implementation.

### Prerequisites

- Node.js and npm, if using the planned Next.js application.
- Access to the Meta Model API.
- An API key for the selected open-weight model provider, if that integration is implemented.
- Git.

### Setup

1. Clone this public repository:

   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   ```

2. Enter the project directory:

   ```bash
   cd <YOUR_REPOSITORY_DIRECTORY>
   ```

3. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Add the required API keys and configuration to `.env.local`.

5. Install dependencies:

   ```bash
   npm install
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the local application at the address displayed in your terminal, typically `http://localhost:3000`.

### Try the Demo

1. Open the parent chat view.
2. Send a test inquiry in English, Spanish, or Somali.
3. Ask about available seats, tuition, or operating hours.
4. Select an available tour time and verify the booking confirmation.
5. Test an unavailable age group and verify that the agent offers the waitlist.
6. Open the director view and review the briefing.

**Important:** The commands above assume a standard Next.js/npm setup. Verify them against the actual project files before submitting.

## Judging Criteria

| Category | Weight | How Welcome Addresses It |
|---|---:|---|
| **Impact** | 30% | Improves language access for New American families in Minnesota and helps childcare providers recover enrollment opportunities associated with empty seats. |
| **Use of Meta AI Tooling** | 25% | Integrates multiple Meta AI models into a multi-step enrollment workflow rather than relying on a single chatbot interaction. |
| **Demo** | 25% | Demonstrates the enrollment booking workflow and before-and-after face blurring in a three-minute video without slides. |
| **Technical Depth and Execution** | 20% | Demonstrates a grounded agent with tool calls, booking and rescheduling state, and human handoffs when information is uncertain. |

## Bonus Targets

### Best Agentic Use-Case

A multi-step agent that handles inquiries, books tours, sends reminders, reschedules missed tours, and prepares director briefings.

### Best Creative Build

A privacy-aware marketing workflow combining SAM 3.1 face blurring with Muse Image flyer generation.

### Best Build on Meta Open Weight Models

An inquiry-classification and routing workflow using Muse Spark Open through a verified partner integration.

> Bonus eligibility depends on the actual implementation and the hackathon's official judging requirements.

## Limitations and Honest Disclosures

- **Simulated integrations:** The demo inbox and calendar are simulated. Real Facebook, Google, and website inbox integrations are not included in this demo.
- **Language quality:** Somali and Spanish voice transcription quality must be evaluated during testing. A text fallback is included for cases where transcription is unreliable.
- **No payment processing:** The demo does not collect tuition or process payments.
- **No subsidy decisions:** The agent does not determine childcare subsidy eligibility.
- **No system replacement:** Welcome does not replace a childcare provider's existing management platform.
- **Synthetic data:** The provider, parents, enrollment inquiries, availability, and pricing used in the demo are fictional.
- **Privacy processing:** Face blurring and flyer generation must be tested to verify that the resulting images meet the intended privacy requirements.

## Future Opportunities

Potential future development includes:

- Integration with real parent communication channels.
- Integration with provider calendars and tour scheduling systems.
- Improved voice transcription and language evaluation for Somali and Spanish.
- Enrollment analytics and follow-up tracking.
- Additional childcare provider onboarding and configuration tools.

These are potential extensions, not claims about features already implemented.

## License

This project is licensed under the MIT License.

See the [`LICENSE`](LICENSE) file for details.
