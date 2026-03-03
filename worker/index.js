export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { question, studentAnswer, expectedAnswer, marks } = await request.json();
    const maxMarks = marks || 5;

    if (!env.ANTHROPIC_API_KEY) {
      return Response.json(
        { error: "API key not configured", details: "ANTHROPIC_API_KEY secret is not set" },
        { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const prompt = `You are an expert educator grading a short answer question for IB Business Management.

Question: ${question}

Mark Scheme / Model Answer: ${expectedAnswer}

Student's Answer: ${studentAnswer}

This question is worth ${maxMarks} marks. Use the mark scheme above to award marks. Each mark point in the mark scheme (often shown as [1]) corresponds to one mark.

Provide a score from 0 to ${maxMarks} and specific constructive feedback explaining which mark points were awarded and which were missed.

Format your response ONLY as valid JSON (no markdown, no code blocks):
{
  "score": <number 0-${maxMarks}>,
  "maxMarks": ${maxMarks},
  "feedback": "<constructive feedback referencing the mark scheme points>"
}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 500,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();

      if (data.error) {
        return Response.json(
          { error: "API Error", details: data.error.message },
          { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
        );
      }

      const responseText = data.content[0].text;
      const result = JSON.parse(responseText);

      return Response.json(
        {
          score: Math.min(Math.max(result.score, 0), maxMarks),
          maxMarks: maxMarks,
          feedback: result.feedback,
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
    } catch (error) {
      return Response.json(
        { error: "Failed to grade answer", details: error.message },
        { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
  },
};
