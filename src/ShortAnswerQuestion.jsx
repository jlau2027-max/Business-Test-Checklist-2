import { useState } from 'react';
import { Paper, Text, Progress, Alert, Box } from '@mantine/core';
import { Button, TextArea, Spinner } from '@heroui/react';

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
    <Paper bg="var(--bg-surface)" radius="lg" p="lg" style={{ border: '1px solid var(--border-subtle)' }}>
      <Text fw={600} fz="md" c="var(--text-primary)" mb="md">{question}</Text>

      <TextArea
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={submitted}
        rows={5}
        fullWidth
        className="rounded-md text-sm leading-relaxed p-3"
        style={{ fontFamily: "'Inter', sans-serif", resize: "vertical", backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
      />

      {!submitted ? (
        <Button
          onPress={handleSubmitAnswer}
          isDisabled={loading || !studentAnswer.trim()}
          fullWidth
          isPending={loading}
          className="rounded-md mt-4 font-semibold border-none text-white"
          style={{
            background: studentAnswer.trim() ? 'linear-gradient(to bottom right, var(--accent), var(--accent-soft))' : 'var(--bg-overlay)',
            color: studentAnswer.trim() ? '#fff' : 'var(--text-muted)',
          }}
        >
          {({isPending}) => <>
            {isPending && <Spinner color="current" size="sm" />}
            {isPending ? "Grading..." : "Submit Answer"}
          </>}
        </Button>
      ) : (
        <Button variant="ghost" className="mt-4" style={{ color: 'var(--text-secondary)' }} onPress={reset}>
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
          <Text fz="sm" c="var(--text-secondary)" lh={1.6}>{feedback}</Text>
        </Alert>
      )}
    </Paper>
  );
}
