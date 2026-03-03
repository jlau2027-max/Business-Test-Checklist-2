import { useState } from 'react';
import { Paper, Text, Textarea, Button, Progress, Alert, Box } from '@mantine/core';

export default function ShortAnswerQuestion({
  question,
  expectedAnswer,
  onGradeComplete
}) {
  const [studentAnswer, setStudentAnswer] = useState('');
  const [grade, setGrade] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim()) return;

    setLoading(true);
    setSubmitted(true);

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, studentAnswer, expectedAnswer })
      });

      const data = await response.json();
      setGrade(data.score);
      setFeedback(data.feedback);

      if (onGradeComplete) {
        onGradeComplete({ score: data.score, feedback: data.feedback });
      }
    } catch (error) {
      console.error('Error grading answer:', error);
      setFeedback('Error grading your answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStudentAnswer('');
    setGrade(null);
    setFeedback('');
    setSubmitted(false);
  };

  const scoreColor = grade >= 4 ? '#34D399' : grade >= 2 ? '#FBBF24' : '#F87171';

  return (
    <Paper bg="#12121A" radius="lg" p="lg" style={{ border: '1px solid #252533' }}>
      <Text fw={600} fz="md" c="#F0EEE8" mb="md">{question}</Text>

      <Textarea
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.currentTarget.value)}
        placeholder="Type your answer here..."
        disabled={submitted}
        minRows={5}
        radius="md"
        styles={{
          input: {
            backgroundColor: '#1A1A24',
            borderColor: '#252533',
            color: '#F0EEE8',
            '&:focus': { borderColor: '#7C6FFF' },
            '&::placeholder': { color: '#55556A' },
          },
        }}
      />

      {!submitted ? (
        <Button
          onClick={handleSubmitAnswer}
          disabled={loading || !studentAnswer.trim()}
          fullWidth
          radius="md"
          mt="md"
          loading={loading}
          loaderProps={{ type: 'dots' }}
          style={{
            background: studentAnswer.trim() ? 'linear-gradient(135deg, #7C6FFF, #A78BFA)' : '#1E1E2A',
            border: 'none',
            boxShadow: studentAnswer.trim() ? '0 4px 16px #7C6FFF30' : 'none',
          }}
          styles={{ root: { '&:disabled': { backgroundColor: '#1E1E2A', color: '#55556A' } } }}
        >
          Submit Answer
        </Button>
      ) : (
        <Button variant="subtle" color="gray" mt="md" onClick={reset}>
          Try Again
        </Button>
      )}

      {grade !== null && (
        <Alert
          color={grade >= 4 ? 'green' : grade >= 2 ? 'yellow' : 'red'}
          variant="light"
          radius="md"
          mt="md"
          title={`Score: ${grade}/5`}
          styles={{
            root: { backgroundColor: scoreColor + '11', border: `1px solid ${scoreColor}44` },
            title: { fontFamily: "'JetBrains Mono', monospace" },
          }}
        >
          <Progress
            value={(grade / 5) * 100}
            color={scoreColor}
            size="sm"
            radius="xl"
            mb="sm"
            animated
            styles={{ section: { boxShadow: `0 0 8px ${scoreColor}40` } }}
          />
          <Text fz="sm" c="#8B8B9E" lh={1.6}>{feedback}</Text>
        </Alert>
      )}
    </Paper>
  );
}
