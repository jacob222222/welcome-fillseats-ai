Welcome by FillSeats AI
Meta Global AI Developer Hackathon, Indie Track, Team Jesus
Theme: Build for Your World
Submission deadline: November 4, 2026 at 9:00 pm ET
Demo video: [ADD LINK HERE BEFORE SUBMISSION]
Live demo: [ADD LINK HERE BEFORE SUBMISSION]
What was built during the hackathon
All code in this repository was written October 26 to November 4, 2026, during the hackathon, using Muse Code. No code from before the hackathon was reused.
The idea was discussed before the hackathon as a concept and pilot offer draft only, with no code. Everything a judge sees here, including the agent workflow, booking logic, briefing view, and privacy-safe flyer flow, is new work from the hackathon period.
Problem
A small childcare provider in Minnesota loses over $1,000 per month for every empty seat, while parent inquiries sit unanswered at night.
For Somali and Spanish speaking parents, the barrier is bigger than speed. A reply in English only, plus tour and form steps that are hard to follow, can block enrollment even when a spot is open.
Solution
Welcome is a voice-first, multilingual enrollment concierge that sits next to Brightwheel or Procare. It does not replace them. It only handles enrollment.
A parent speaks or types in Somali, Spanish, or English. Welcome transcribes the message, answers only from the provider's verified seats, hours, and prices, books a tour, sends reminders, and reschedules a no-show. The director gets an English morning briefing.
Demo flow, in order
Parent sends a voice note or text in Somali, Spanish, or English. Example in the demo: a fictional Somali speaking parent asks about a toddler spot, price, and hours at 9:12 pm.
Muse Voice Transcribe turns voice into text, shown on screen.
The agent detects language, classifies intent, and replies in the parent's language, citing only the verified FAQ file.
The agent offers real tour times, books the tour the parent picks, and sends a confirmation and reminder in the parent's language.
If the parent misses the tour, the agent reschedules without director input.
If the age group is full, the agent offers the waitlist instead of saying yes.
The next morning, the director opens a briefing in English: inquiries overnight, languages, tours booked, and tuition at stake.
The director uploads a classroom photo. SAM 3.1 segments people and blurs faces. Muse Image creates a privacy-safe flyer for the open spot.
Meta models used
Muse Spark, via Meta Model API: parent agent, tour booking agent, and director briefing.
Muse Voice Transcribe, via Meta Model API: voice note to transcript.
SAM 3.1, via Meta Model API: segment people in a classroom photo and blur faces for privacy-safe marketing.
Muse Image, via Meta Model API: generate the open-seat flyer and visual tour checklist.
Muse Spark Open, via [ADD PARTNER NAME HERE: Baseten, Modal, or Fireworks, whichever is actually used]: inquiry classification and language and intent routing. Model name: meta-models/muse-spark-open-1026 for Baseten, or the equivalent open-weight endpoint name for the partner actually used.
Muse Code: used to build this repository.
Muse Wonder: bonus only, if added. It is not required for the core loop.
Guardrails, verifiable agent design
Grounding file only: the agent may cite only seats, hours, ages, location, and tuition from the provider FAQ file in this repo. Anything not in that file triggers a human handoff, not a guess.
Test cases in the demo: preschool is full, so the correct answer is waitlist only. A wrong price is corrected to the FAQ price. Overnight care is not in the FAQ, so the agent offers a director follow up instead of inventing it.
Every parent reply is labeled as an AI assistant.
No medical advice, no child development advice, no legal advice, and no subsidy eligibility decisions. General information only, with handoff for eligibility questions.
No real children, parents, providers, or payments in the demo. All data is synthetic and clearly labeled fictional.
Synthetic demo data only
Provider in the demo: Sunshine Family Childcare, Cambridge, MN, fictional.
Open seats in the demo: infant 1, toddler 2, preschool 0, waitlist only.
Hours in the demo: Mon to Fri, 7:00 am to 5:30 pm.
Tuition in the demo: infant $1,250 per month, toddler $1,100 per month, preschool $950 per month, fictional.
Parents in the demo: fictional names and messages only. See synthetic-demo-data.md for the full list.
Project structure
[UPDATE THIS SECTION AS CODE LANDS]
app: Next.js parent chat view and director briefing view.
lib/agent: language detection, intent classification, grounding lookup, and tool calls for check_seats, book_tour, send_reminder, reschedule_tour, add_to_waitlist, and create_briefing.
lib/faq: verified provider FAQ file, the only source for prices, hours, and seats.
lib/vision: SAM 3.1 face blur flow and Muse Image flyer flow.
data: synthetic demo data only.
How to run locally
[UPDATE WITH EXACT COMMANDS AS CODE LANDS]
Clone this public repository.
Copy .env.example to .env.local and add your Meta Model API key and, if used, your open-weight partner key. Never commit real keys.
Install dependencies and run the development server.
Open the parent view, send a test message in English, Spanish, or Somali, and watch a tour get booked. Open the director view to see the briefing.
Judging mapping
Impact, 30 percent: language access for New American families in Minnesota, plus filled seats worth over $1,000 per month each for small providers.
Use of Meta AI Tooling, 25 percent: five Meta models in one multi-step workflow, not a single chatbot call.
Demo, 25 percent: live booking loop plus before and after face blur, shown in a 3 minute video with no slides.
Technical Depth and Execution, 20 percent: verifiable agent with grounding, tool calls, state for booking and rescheduling, and handoff on uncertainty.
Bonus targets
Best Agentic Use-Case: multi-step agent that books, reminds, reschedules, and briefs.
Best Creative Build: SAM blur plus Muse Image flyer.
Best Build on Meta Open Weight Models: Muse Spark Open step, partner verified, name the partner actually used above.
Limitations, honest
Demo inbox and calendar are simulated for the hackathon. Real Facebook, Google, and website inbox integrations are not in this demo.
Voice transcription quality for Somali and Spanish must be tested in the demo. Text fallback is included if transcription is weak.
This demo does not take payments, does not decide subsidy eligibility, and does not replace a provider's management system.
License
MIT
