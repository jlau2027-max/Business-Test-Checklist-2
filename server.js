const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Use your preferred AI API - OpenAI or Claude
const { Anthropic } = require('@anthropic-ai/sdk'); // or use OpenAI

const app = express();
app.use(express.json());
app.use(cors());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/api/grade', async (req, res) => {
  const { question, studentAnswer, expectedAnswer } = req.body;

  const prompt = `You are an expert educator grading a short answer question.

Question: ${question}

Model Answer: ${expectedAnswer}

Student's Answer: ${studentAnswer}

Please evaluate the student's answer based on:
1. Accuracy and correctness of key concepts
2. Completeness of the response
3. Clarity and organization

Provide a score from 0-5 and specific feedback.

Format your response as JSON:
{
  "score": <number 0-5>,
  "feedback": "<constructive feedback>"
}`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].text;
    const result = JSON.parse(responseText);

    res.json({
      score: result.score,
      feedback: result.feedback
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to grade answer',
      details: error.message 
    });
  }
});

app.listen(3001, () => {
  console.log('Grading server running on port 3001');
});