# How to use this skeleton

This folder is a starting skeleton, not the finished app. Copy these files into your GitHub repo welcome-fillseats-ai, keeping your existing README.md, LICENSE, and synthetic-demo-data.md.

Steps:
1. Copy package.json, .env.example, .gitignore, app/, lib/, and data/ if you add it, into the repo root.
2. Run: npm install
3. Run: npm run dev
4. Open http://localhost:3000 for the parent view, and http://localhost:3000/director for the director view.
5. Test: ask about a toddler spot, ask about preschool (should offer waitlist), ask about overnight care (should hand off).

Next steps after the skeleton works:
- Replace lib/agent.js runAgent with a real Muse Spark call via Meta Model API.
- Add voice upload, call Muse Voice Transcribe, then run the same agent flow.
- Add a vision route: upload a classroom photo, call SAM 3.1 to blur faces, call Muse Image to make a flyer.
- Replace the static director page with real booking state from the agent tools.
- Update the main README project structure and run instructions to match the actual files, and remove all placeholder notes before Nov 4 submission.

Do not commit .env.local. Do not commit real API keys.
