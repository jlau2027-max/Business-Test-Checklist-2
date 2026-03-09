import { useState, useRef, useCallback, useLayoutEffect, useEffect } from "react";
import { RadioGroup, Radio, TextArea } from "@heroui/react";
import { gsap } from "gsap";
import { CheckCircle, ArrowLeft, ArrowRight, CornerDownLeft } from "lucide-react";

// ─── Question definitions ────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "impression",
    label: "What is your overall impression of the website?",
    type: "radio",
    options: ["Excellent", "Good", "Average", "Poor"],
  },
  {
    id: "likeMost",
    label: "What do you like most about the website?",
    type: "text",
    placeholder: "Type your answer here...",
    rows: 3,
  },
  {
    id: "confusing",
    label: "What do you find confusing or difficult?",
    type: "text",
    placeholder: "Type your answer here...",
    rows: 3,
  },
  {
    id: "nps",
    label: "How likely are you to recommend this website to a friend?",
    type: "nps",
  },
  {
    id: "goals",
    label: "What are you hoping to accomplish while visiting the website?",
    type: "text",
    placeholder: "Type your answer here...",
    rows: 3,
  },
  {
    id: "issues",
    label: "Are you experiencing any issues or errors? If so, please describe them.",
    type: "text",
    placeholder: "Type your answer here...",
    rows: 3,
  },
  {
    id: "suggestions",
    label: "Please share any additional suggestions for improvement.",
    type: "text",
    placeholder: "Type your answer here...",
    rows: 4,
  },
];

export default function FeedbackPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const cardRef = useRef(null);
  const successRef = useRef(null);
  const isAnimating = useRef(false);

  const totalSteps = QUESTIONS.length;
  const progress = ((step + 1) / totalSteps) * 100;
  const currentQ = QUESTIONS[step];
  const isLastStep = step === totalSteps - 1;

  // ─── Update answer ───────────────────────────────────────────────────────────
  const setAnswer = useCallback((id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  // ─── GSAP transition between steps ─────────────────────────────────────────
  const animateTransition = useCallback((newStep, dir) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      opacity: 0,
      y: dir > 0 ? -30 : 30,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setStep(newStep);
        setDirection(dir);
        gsap.set(card, { opacity: 0, y: dir > 0 ? 30 : -30 });
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
          onComplete: () => {
            isAnimating.current = false;
          },
        });
      },
    });
  }, []);

  // ─── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (isAnimating.current) return;
    if (isLastStep) {
      handleSubmit();
      return;
    }
    animateTransition(step + 1, 1);
  }, [step, isLastStep, animateTransition]);

  const goBack = useCallback(() => {
    if (isAnimating.current || step === 0) return;
    animateTransition(step - 1, -1);
  }, [step, animateTransition]);

  // ─── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const card = cardRef.current;
    gsap.to(card, {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
        try {
          fetch((import.meta.env.VITE_API_URL || "") + "/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers),
          });
        } catch (_) { /* silent — thank-you shown regardless */ }
      },
    });
  }, [answers]);

  // ─── Entrance animation ────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (card && !submitted) {
      gsap.set(card, { opacity: 0, y: 30 });
      gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 });
    }
  }, []);

  // ─── Success entrance ──────────────────────────────────────────────────────
  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.set(successRef.current, { opacity: 0, scale: 0.92 });
      gsap.to(successRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.05,
      });
    }
  }, [submitted]);

  // ─── Keyboard: Enter to advance (not in textarea) ─────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (submitted) return;
      if (e.key === "Enter" && currentQ.type !== "text") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, currentQ, submitted]);

  // ─── Auto-advance on radio/nps selection ───────────────────────────────────
  const handleRadioChange = useCallback(
    (id, value) => {
      setAnswer(id, value);
      // small delay so user sees selection before advancing
      setTimeout(() => {
        if (!isAnimating.current && step < totalSteps - 1) {
          animateTransition(step + 1, 1);
        }
      }, 350);
    },
    [step, totalSteps, setAnswer, animateTransition]
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'JSans', sans-serif",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Progress bar */}
      {!submitted && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "var(--border)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--accent)",
              transition: "width 0.4s ease",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>
      )}

      {/* Top bar: back to home + step counter */}
      {!submitted && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 0",
            maxWidth: 640,
            width: "100%",
            margin: "0 auto",
          }}
        >
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Home
          </a>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text-muted)",
            }}
          >
            {step + 1} / {totalSteps}
          </span>
        </div>
      )}

      {/* Main content area — vertically centered */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px 120px",
        }}
      >
        {!submitted ? (
          <div
            ref={cardRef}
            style={{
              maxWidth: 560,
              width: "100%",
            }}
          >
            {/* Question number */}
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: 10,
                letterSpacing: 0.5,
              }}
            >
              Question {step + 1}
            </div>

            {/* Question label */}
            <h2
              style={{
                fontSize: "clamp(20px, 4vw, 28px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.35,
                marginBottom: 32,
              }}
            >
              {currentQ.label}
            </h2>

            {/* Input area */}
            {currentQ.type === "radio" && (
              <RadioGroup
                value={answers[currentQ.id] || ""}
                onChange={(val) => handleRadioChange(currentQ.id, val)}
                className="flex flex-col gap-3"
              >
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.id] === opt;
                  return (
                    <Radio
                      key={opt}
                      value={opt}
                      className="p-3 px-4 rounded-xl m-0"
                      style={{
                        background: selected
                          ? "var(--accent-soft, rgba(94,138,156,0.12))"
                          : "var(--bg-card)",
                        border: `1.5px solid ${selected ? "var(--accent)" : "var(--border)"}`,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <Radio.Control className="hidden">
                        <Radio.Indicator />
                      </Radio.Control>
                      <Radio.Content>
                        <span
                          className="text-[15px]"
                          style={{
                            color: selected
                              ? "var(--accent)"
                              : "var(--text-secondary)",
                            fontWeight: selected ? 600 : 400,
                            fontFamily: "'JSans', sans-serif",
                          }}
                        >
                          {opt}
                        </span>
                      </Radio.Content>
                    </Radio>
                  );
                })}
              </RadioGroup>
            )}

            {currentQ.type === "nps" && (
              <>
                <RadioGroup
                  value={answers[currentQ.id] || ""}
                  onChange={(val) => handleRadioChange(currentQ.id, val)}
                  orientation="horizontal"
                  className="flex flex-wrap gap-2 justify-center"
                >
                  {Array.from({ length: 10 }, (_, idx) => {
                    const i = idx + 1;
                    const selected = answers[currentQ.id] === String(i);
                    return (
                      <Radio
                        key={i}
                        value={String(i)}
                        className="m-0 p-0"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: selected ? "var(--accent)" : "var(--bg-card)",
                          border: `1.5px solid ${selected ? "var(--accent)" : "var(--border)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <Radio.Control className="hidden">
                          <Radio.Indicator />
                        </Radio.Control>
                        <Radio.Content>
                          <span
                            className="text-[14px] font-semibold"
                            style={{
                              color: selected ? "#fff" : "var(--text-secondary)",
                              fontFamily: "'JSans', sans-serif",
                            }}
                          >
                            {i}
                          </span>
                        </Radio.Content>
                      </Radio>
                    );
                  })}
                </RadioGroup>
                <div
                  className="flex justify-between mt-2 px-1"
                  style={{ fontSize: 12, color: "var(--text-muted)" }}
                >
                  <span>Not likely</span>
                  <span>Very likely</span>
                </div>
              </>
            )}

            {currentQ.type === "text" && (
              <TextArea
                aria-label={currentQ.label}
                placeholder={currentQ.placeholder}
                rows={currentQ.rows || 3}
                value={answers[currentQ.id] || ""}
                onChange={(e) => setAnswer(currentQ.id, e.target.value)}
                className="w-full rounded-xl text-[15px]"
                style={{
                  fontFamily: "'JSans', sans-serif",
                  background: "var(--bg-card)",
                  border: "1.5px solid var(--border)",
                  color: "var(--text-primary)",
                  padding: "14px 16px",
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
              />
            )}
          </div>
        ) : (
          /* ─── Success screen ─────────────────────────────────────────── */
          <div
            ref={successRef}
            style={{
              textAlign: "center",
              maxWidth: 400,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--color-success, #4ade80)22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <CheckCircle size={28} color="var(--color-success, #4ade80)" />
            </div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              Thank you!
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: 36,
              }}
            >
              Your feedback helps us make IBrev better for everyone.
            </p>
            <a
              href="/"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              &larr; Back to Home
            </a>
          </div>
        )}
      </div>

      {/* Bottom navigation bar */}
      {!submitted && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px 24px",
            background: "var(--bg-base)",
            borderTop: "1px solid var(--border)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: 560,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Back button */}
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                color: step === 0 ? "var(--text-muted)" : "var(--text-secondary)",
                background: "none",
                border: "none",
                cursor: step === 0 ? "default" : "pointer",
                fontFamily: "'JSans', sans-serif",
                opacity: step === 0 ? 0.4 : 1,
                transition: "opacity 0.2s",
                padding: "8px 0",
              }}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {/* Next / Submit button */}
            <button
              type="button"
              onClick={goNext}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "var(--accent)",
                border: "none",
                borderRadius: 10,
                padding: "10px 24px",
                cursor: "pointer",
                fontFamily: "'JSans', sans-serif",
                transition: "opacity 0.2s",
              }}
            >
              {isLastStep ? "Submit" : "OK"}
              {isLastStep ? (
                <CheckCircle size={16} />
              ) : (
                <CornerDownLeft size={14} style={{ opacity: 0.6 }} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
