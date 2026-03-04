import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, studentAnswer, expectedAnswer } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: 'API key not configured',
      details: 'ANTHROPIC_API_KEY is not set in environment variables',
    });
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
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = message.content[0].text;
    const result = JSON.parse(responseText);

    res.json({
      score: Math.min(Math.max(result.score, 0), 5),
      feedback: result.feedback,
    });
  } catch (error) {
    console.error('Error:', error);

    if (error.message?.includes('API')) {
      res.status(500).json({
        error: 'API Error',
        details: 'Failed to connect to Claude API. Check your API key.',
      });
    } else {
      res.status(500).json({
        error: 'Failed to grade answer',
        details: error.message,
      });
    }
  }
}
