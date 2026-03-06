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

  const scoreColor = grade >= 4 ? '#34D399' : grade >= 2 ? '#FBBF24' : '#F87171';

  return (
    <div className="bg-[#12121A] rounded-lg p-4" style={{ border: '1px solid #252533' }}>
      <span className="font-semibold text-base text-[#F0EEE8] block mb-4">{question}</span>

      <TextArea
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={submitted}
        rows={5}
        fullWidth
        className="rounded-2xl bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] text-sm leading-relaxed placeholder:text-[#55556A] focus:border-[#7C6FFF] p-3"
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
              ? 'bg-gradient-to-br from-[#7C6FFF] to-[#A78BFA] text-white shadow-[0_4px_16px_#7C6FFF30]'
              : 'bg-[#1E1E2A] text-[#55556A] shadow-none'
          }`}
        >
          {({isPending}) => <>
            {isPending && <Spinner color="current" size="sm" />}
            {isPending ? "Grading..." : "Submit Answer"}
          </>}
        </Button>
      ) : (
        <Button variant="ghost" className="mt-4 text-[#8B8B9E]" onPress={reset}>
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
          <span className="text-sm text-[#8B8B9E] block mt-2" style={{ lineHeight: 1.6 }}>{feedback}</span>
        </div>
      )}
    </div>
  );
}
