const DEFAULT_SYSTEM_PROMPT = `You are the summarization engine for the Ranger Intelligence Engine (RIE).
Produce an extremely concise summary in 3-5 bullet points maximum.
Focus only on: critical facts, key entities, primary events, and urgent actions.
Use short, direct sentences. Eliminate all redundancy.
Keep language neutral and factual.`;

export async function summarize(text) {

  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) {
    throw new Error("Missing PERPLEXITY_API_KEY. Ensure it is set server-side.");
  }

  const body = {
    model: "sonar",
    messages: [
      { role: "system", content: DEFAULT_SYSTEM_PROMPT },
      { role: "user", content: `Summarize in maximum 5 bullet points:\n\n${text}` }
    ],
    temperature: 0.2,
    max_tokens: 300 // Limit response length
  };

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "<no body>");
    console.error("Perplexity API error:", res.status, res.statusText, errText);
    throw new Error(`Perplexity API returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json().catch((err) => {
    console.error("Failed to parse Perplexity response JSON:", err);
    return null;
  });

  if (!data) {
    throw new Error("Empty response from Perplexity API.");
  }

  const content = data.choices[0].message.content;
  console.log("Perplexity response content length:", content.length);
  return content;
}