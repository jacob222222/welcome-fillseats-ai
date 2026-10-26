import { runAgent } from "../../../lib/agent.js";

export async function POST(request) {
  const body = await request.json();
  const text = body.text || "";
  // Skeleton: mocked agent logic, no API key needed.
  // Full build: replace runAgent with a Muse Spark call via Meta Model API,
  // with Muse Voice Transcribe for voice input, and Muse Spark Open for classification.
  // Keep the grounding rule: only cite lib/faq.js, otherwise hand off.
  const result = runAgent(text);
  return Response.json(result);
}
