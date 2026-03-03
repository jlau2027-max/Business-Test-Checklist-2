import React, { useState } from 'react';
import './ShortAnswerQuestion.css';

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
    if (!studentAnswer.trim()) {
      alert('Please enter an answer');
      return;
    }

    setLoading(true);
    setSubmitted(true);

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          studentAnswer,
          expectedAnswer
        })
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

  return (
    <div className="short-answer-question">
      <h3>{question}</h3>
      
      <textarea
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={submitted}
        rows="5"
      />

      {!submitted ? (
        <button 
          onClick={handleSubmitAnswer} 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Grading...' : 'Submit Answer'}
        </button>
      ) : (
        <button 
          onClick={() => {
            setStudentAnswer('');
            setGrade(null);
            setFeedback('');
            setSubmitted(false);
          }}
          className="retry-btn"
        >
          Try Again
        </button>
      )}

      {grade !== null && (
        <div className="grade-result">
          <div className="score">Score: {grade}/5</div>
          <div className="feedback">{feedback}</div>
        </div>
      )}
    </div>
  );
}