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

    const { question, studentAnswer, expectedAnswer } = await request.json();

    if (!env.ANTHROPIC_API_KEY) {
      return Response.json(
        { error: "API key not configured", details: "ANTHROPIC_API_KEY secret is not set" },
        { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const prompt = `You are an expert educator grading a short answer question for IB Business Management.

Question: ${question}

Model Answer: ${expectedAnswer}

Student's Answer: ${studentAnswer}

Please evaluate the student's answer based on:
1. Accuracy and correctness of key concepts
2. Completeness of the response
3. Clarity and organization
4. Use of business terminology

Provide a score from 0-5 and specific constructive feedback.

Format your response ONLY as valid JSON (no markdown, no code blocks):
{
  "score": <number 0-5>,
  "feedback": "<constructive feedback about what they got right and what could be improved>"
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
          score: Math.min(Math.max(result.score, 0), 5),
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
