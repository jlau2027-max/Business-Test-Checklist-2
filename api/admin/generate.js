import Anthropic from '@anthropic-ai/sdk';
import { verifyAdmin } from '../lib/verify-admin.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PROMPTS = {
  mcq: (text, count, difficulty) => `You are an expert IB Business Management educator. Generate ${count} multiple-choice questions from the following study material.

Material:
${text}

For each question, provide:
- category: The IB Business Management topic category
- difficulty: "${difficulty}"
- question: The question text
- options: Exactly 4 answer choices as an array of strings
- answer_index: The 0-based index of the correct answer
- explanation: A brief explanation of why the correct answer is right

Return ONLY a valid JSON array of objects. No markdown, no code blocks.`,

  flashcard: (text, count) => `You are an expert IB Business Management educator. Generate ${count} flashcards from the following study material.

Material:
${text}

For each flashcard, provide:
- term: The key term or concept
- definition: A clear, concise definition
- formula: The formula if applicable (null if not a formula-based concept)

Return ONLY a valid JSON array of objects. No markdown, no code blocks.`,

  written: (text, count, difficulty) => `You are an expert IB Business Management educator. Generate ${count} written/short answer questions from the following study material.

Material:
${text}

For each question, provide:
- category: The IB Business Management topic category
- difficulty: "${difficulty}"
- marks: The mark allocation (2, 4, 6, or 10)
- question: The question text (use IB command terms like Define, Explain, Analyse, Evaluate)
- model_answer: A detailed model answer / mark scheme with mark allocation breakdown
- question_type: "short" for 2-6 marks, "extended" for 10 marks

Return ONLY a valid JSON array of objects. No markdown, no code blocks.`,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await verifyAdmin(req);
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }

  const { text, contentType, count = 5, difficulty = 'SL' } = req.body;

  if (!text || !contentType) {
    return res.status(400).json({ error: 'text and contentType are required' });
  }

  const promptFn = PROMPTS[contentType];
  if (!promptFn) {
    return res.status(400).json({ error: 'Invalid contentType. Use: mcq, flashcard, written' });
  }

  try {
    const prompt = promptFn(text, count, difficulty);
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = message.content[0].text;
    const generated = JSON.parse(responseText);

    res.json({ generated, contentType, count: generated.length });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Failed to generate content', details: error.message });
  }
}
