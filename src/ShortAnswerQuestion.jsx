import { useState } from 'react';
import { Button, TextArea, Spinner } from '@heroui/react';
import ProgressBar from "./components/ProgressBar.jsx";

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

  const scoreColor = grade >= 4 ? 'var(--color-success)' : grade >= 2 ? 'var(--color-warning)' : 'var(--color-danger)';

  return (
    <div className="bg-[var(--bg-card)] rounded-lg p-4" style={{ border: '1px solid var(--border)' }}>
      <span className="font-semibold text-base text-[var(--text-primary)] block mb-4">{question}</span>

      <TextArea
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={submitted}
        rows={5}
        fullWidth
        className="rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] text-sm leading-relaxed placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] p-3"
        style={{ fontFamily: "'JSans', sans-serif", resize: "vertical" }}
      />

      {!submitted ? (
        <Button
          onPress={handleSubmitAnswer}
          isDisabled={loading || !studentAnswer.trim()}
          fullWidth
          isPending={loading}
          className={`rounded-full mt-4 font-semibold border-none ${
            studentAnswer.trim()
              ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-white shadow-[0_4px_16px_var(--accent-glow)]'
              : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] shadow-none'
          }`}
        >
          {({isPending}) => <>
            {isPending && <Spinner color="current" size="sm" />}
            {isPending ? "Grading..." : "Submit Answer"}
          </>}
        </Button>
      ) : (
        <Button variant="ghost" className="mt-4 text-[var(--text-secondary)]" onPress={reset}>
          Try Again
        </Button>
      )}

      {grade !== null && (
        <div
          className="rounded-2xl mt-4 p-4"
          style={{
            backgroundColor: scoreColor + '11',
            border: `1px solid ${scoreColor}44`,
          }}
        >
          <span className="font-bold block mb-2" style={{ fontFamily: "'JSans', sans-serif", color: scoreColor }}>
            Score: {grade}/5
          </span>
          <ProgressBar
            value={(grade / 5) * 100}
            color={scoreColor}
          />
          <span className="text-sm text-[var(--text-secondary)] block mt-2" style={{ lineHeight: 1.6 }}>{feedback}</span>
        </div>
      )}
    </div>
  );
}
