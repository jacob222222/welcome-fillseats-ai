import { runAgent } from "../../../lib/agent.js";

export async function POST(request) {
  const body = await request.json();
  const text = body.text || "";
  // Muse Spark via Meta Model API. Grounding rule: only cite lib/faq.js, otherwise hand off.
  const result = await runAgent(text);
  return Response.json(result);
}
