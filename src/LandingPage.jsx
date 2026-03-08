import { useState, useEffect } from "react";
import { Button, Tabs } from "@heroui/react";
import { Show, SignInButton } from "@clerk/react";
import Grainient from "./components/Grainient.jsx";
import ASCIIText from "./components/ASCIIText.jsx";

export default function LandingPage() {
  // Reactive theme detection — re-renders when .dark class toggles
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'JSans', sans-serif", color: "#F0EEE8" }}>
      {/* Grainient full-page background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Grainient
          color1={isDark ? "#1A2E3A" : "#7BA3B5"}
          color2={isDark ? "#0D1520" : "#4F6A74"}
          color3={isDark ? "#2A1E14" : "#D4A572"}
          timeSpeed={0.15}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={4}
          warpSpeed={1.5}
          warpAmplitude={60}
          blendAngle={0}
          blendSoftness={0.08}
          rotationAmount={400}
          noiseScale={2}
          grainAmount={0.08}
          grainScale={2}
          grainAnimated={false}
          contrast={isDark ? 1.4 : 1.3}
          gamma={1}
          saturation={isDark ? 0.9 : 0.85}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hero */}
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center" style={{ paddingTop: 0, paddingBottom: 120 }}>
          {/* ASCII art title */}
          <div style={{ position: "relative", width: "280%", maxWidth: "2400px", height: "clamp(450px, 65vw, 800px)", marginBottom: -20 }}>
            <ASCIIText
              text="ib rev"
              enableWaves={false}
              asciiFontSize={8}
              textFontSize={200}
              textColor="#fdf9f3"
              planeBaseHeight={10}
            />
          </div>
          <div className="flex justify-center" style={{ marginBottom: 28 }}>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button
                  render={(props) => <button {...props} />}
                  size="md"
                  className="rounded-full border-none text-[15px] font-semibold"
                  style={{
                    fontFamily: "'JSans', sans-serif",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    paddingLeft: 28,
                    paddingRight: 28,
                  }}
                >
                  Sign In
                </Button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <a href="/business" style={{ textDecoration: "none" }}>
                <Button
                  render={(props) => <button {...props} />}
                  size="md"
                  className="rounded-full border-none text-[15px] font-semibold"
                  style={{
                    fontFamily: "'JSans', sans-serif",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    paddingLeft: 28,
                    paddingRight: 28,
                  }}
                >
                  Go to Material
                </Button>
              </a>
            </Show>
          </div>

          <div style={{ marginBottom: 64 }} />

          {/* Subject groups */}
          {(() => {
            const groups = {
              "Group 3 — Individuals & Societies": [
                { label: "Business", href: "/business/checklist", color: "#7BA3B5", subtitle: "Finance Unit" },
                { label: "History", href: "/history/specimen", color: "#D4A572", subtitle: "Paper 2 & 3" },
                { label: "Economics", href: "/economics/checklist", color: "#6BA3AD", subtitle: "Work in Progress" },
              ],
              "Group 4 — Sciences": [
                { label: "Biology", href: "/biology/checklist", color: "#5BA88C", subtitle: "Unit 3 & 4" },
                { label: "Chemistry", href: "/chemistry/checklist", color: "#8B7EB5", subtitle: "Work in Progress" },
                { label: "Physics", href: "/physics/checklist", color: "#C4A36A", subtitle: "Work in Progress" },
                { label: "Sports Science", href: "/sports-science/checklist", color: "#B57A7A", subtitle: "Work in Progress" },
              ],
            };
            const groupKeys = Object.keys(groups);
            return (
              <div className="w-full" style={{ maxWidth: 900 }}>
                <Tabs
                  variant="primary"
                  defaultSelectedKey={groupKeys[0]}
                  className="w-full"
                  style={{ fontFamily: "'JSans', sans-serif" }}
                >
                  <Tabs.ListContainer>
                    <Tabs.List
                      aria-label="IB Subject Groups"
                      className="w-full justify-center"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 9999,
                        padding: 4,
                        gap: 4,
                      }}
                    >
                      {groupKeys.map((group) => (
                        <Tabs.Tab
                          key={group}
                          id={group}
                          className="rounded-full px-5 py-2 text-sm font-semibold"
                          style={{ fontFamily: "'JSans', sans-serif", letterSpacing: 0.3 }}
                        >
                          {group}
                          <Tabs.Indicator />
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                  </Tabs.ListContainer>
                  {groupKeys.map((group) => {
                    const subjects = groups[group];
                    return (
                      <Tabs.Panel key={group} id={group}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${subjects.length}, 1fr)`,
                            gap: 12,
                            marginTop: 20,
                          }}
                        >
                          {subjects.map((s) => (
                            <a key={s.label} href={s.href} style={{ textDecoration: "none" }}>
                              <Button
                                render={(props) => <button {...props} />}
                                size="lg"
                                className="rounded-full w-full font-bold"
                                style={{
                                  fontFamily: "'JSans', sans-serif",
                                  height: 72,
                                  background: s.color,
                                  border: "none",
                                  color: "#fff",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: 3,
                                  padding: "10px 16px",
                                  boxShadow: `0 4px 24px ${s.color}50`,
                                  transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.filter = "brightness(1.15)";
                                  e.currentTarget.style.boxShadow = `0 6px 32px ${s.color}70`;
                                  e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.filter = "none";
                                  e.currentTarget.style.boxShadow = `0 4px 24px ${s.color}50`;
                                  e.currentTarget.style.transform = "none";
                                }}
                              >
                                <span style={{ fontSize: 16, letterSpacing: -0.3, lineHeight: 1.2 }}>{s.label}</span>
                                <span style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.8, opacity: 0.7, lineHeight: 1 }}>
                                  {s.subtitle}
                                </span>
                              </Button>
                            </a>
                          ))}
                        </div>
                      </Tabs.Panel>
                    );
                  })}
                </Tabs>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
