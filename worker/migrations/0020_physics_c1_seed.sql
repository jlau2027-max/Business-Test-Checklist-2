-- ============================================================
-- Physics Content Seed Data — C.1 Simple Harmonic Motion
-- Topic C: Wave Behaviour (First Assessment 2025)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO physics_category_colors (category, color) VALUES
  ('C.1 Simple Harmonic Motion', '#C4A36A');

-- ─── MCQ QUESTIONS ─────────────────────────────────────────

INSERT OR IGNORE INTO physics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('phys-c1-mcq-01', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A particle performs simple harmonic motion (SHM). What is the phase difference between the displacement and the acceleration of the particle?',
   '0',
   'π/4',
   'π',
   '2π',
   2,
   'In SHM, a = −ω²x. Acceleration is exactly antiphase (π radians) with displacement — when displacement is maximum positive, acceleration is maximum negative.',
   1),

  ('phys-c1-mcq-02', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'Which of the following correctly describes the variation with time of the kinetic energy of an object undergoing SHM with period T?',
   'KE oscillates between positive and negative values with period T',
   'KE is always positive and constant throughout the motion',
   'KE is always positive and varies sinusoidally with period T',
   'KE is always positive and varies sinusoidally with period T/2',
   3,
   'KE = ½mv² = ½m(ωx₀)²sin²(ωt). Since sin² has period T/2, KE oscillates between 0 and maximum with period T/2, always remaining positive or zero.',
   2),

  ('phys-c1-mcq-03', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A simple pendulum bob oscillates between positions A and C, passing through equilibrium position B. At which position is the resultant force on the pendulum bob zero?',
   'At position A',
   'At position B (equilibrium)',
   'At position C',
   'The resultant force is never zero during the oscillation',
   3,
   'At the equilibrium position, the bob has centripetal acceleration directed upward along the string. The tension exceeds mg to provide this centripetal force, so the resultant force is never zero at any point during the oscillation.',
   3),

  ('phys-c1-mcq-04', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'Object P moves vertically with SHM and object Q moves in a vertical circle with uniform speed. Both have the same time period T. When P is at the top of its motion, Q is at the bottom of its circle. What is the interval between successive times when the acceleration of P is equal and opposite to the acceleration of Q?',
   'T/4',
   'T/2',
   '3T/4',
   'T',
   1,
   'Since P and Q start in opposite positions and have the same period, their accelerations will be equal and opposite every half period. The interval between successive occurrences is T/2.',
   4),

  ('phys-c1-mcq-05', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A particle undergoes SHM. The velocity v varies sinusoidally with time t as v = v₀ cos(ωt). Which expression gives the variation of acceleration a with time?',
   'a = −v₀ω sin(ωt)',
   'a = v₀ω cos(ωt)',
   'a = v₀ω sin(ωt)',
   'a = −v₀ω cos(ωt)',
   0,
   'Acceleration is the time derivative of velocity. a = dv/dt = d/dt[v₀cos(ωt)] = −v₀ω sin(ωt).',
   5),

  ('phys-c1-mcq-06', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'An object performs SHM about a central point with velocity v and acceleration a at displacement x. Which ratio is constant?',
   'a/x',
   'v/x',
   'a/v',
   'v²/a',
   0,
   'In SHM, a = −ω²x, so a/x = −ω² which is constant. The other ratios depend on the instantaneous position and are not constant.',
   6),

  ('phys-c1-mcq-07', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A mass oscillates with SHM of amplitude x₀ and total energy 16 J. What is the kinetic energy of the mass when its displacement is x₀/2?',
   '4 J',
   '8 J',
   '12 J',
   '16 J',
   2,
   'KE = E_total − PE = E_total − ½kx² = E_total[1 − (x/x₀)²] = 16[1 − (1/2)²] = 16 × 3/4 = 12 J.',
   7),

  ('phys-c1-mcq-08', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A liquid in a U-tube is given an initial displacement and released. Which statement correctly describes the initial velocity-time behaviour of the liquid if it starts from maximum displacement?',
   'Velocity starts at a maximum and decreases as a cosine function',
   'Velocity is constant throughout the motion',
   'Velocity starts at maximum and decreases linearly',
   'Velocity starts at zero and initially increases as a sine function',
   3,
   'Released from maximum displacement, the liquid starts with zero velocity (all PE). Velocity then increases sinusoidally, reaching maximum at the equilibrium position — following a sine function.',
   8),

  ('phys-c1-mcq-09', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A particle undergoes SHM with time period T and angular frequency ω. The time period changes to 2T. What is the new value of the angular frequency?',
   'ω/4',
   'ω/2',
   '2ω',
   '4ω',
   1,
   'ω = 2π/T. If T doubles to 2T, then ω_new = 2π/(2T) = ω/2.',
   9),

  ('phys-c1-mcq-10', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A pendulum swings back and forth between points X and Y. The pendulum bob is:',
   'always in equilibrium',
   'only in equilibrium at X and Y',
   'in equilibrium as it passes through the central position',
   'never in equilibrium',
   3,
   'At the endpoints X and Y, there is a restoring component of gravity. At the centre, the bob has centripetal acceleration requiring a net upward force. The bob is therefore never in equilibrium during the oscillation.',
   10),

  ('phys-c1-mcq-11', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A displacement-time graph for SHM shows x = x₀ sin(ωt). Which expression correctly gives the acceleration-time relationship?',
   'a = −ω²x₀ cos(ωt)',
   'a = ω²x₀ sin(ωt)',
   'a = ω²x₀ cos(ωt)',
   'a = −ω²x₀ sin(ωt)',
   3,
   'a = −ω²x = −ω²x₀ sin(ωt). The acceleration graph is an inverted version of the displacement graph with amplitude ω²x₀.',
   11),

  ('phys-c1-mcq-12', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A mass on a spring has maximum displacement d, total energy E and time period T. An identical mass on an identical spring has maximum displacement 2d. What are the new time period and total energy?',
   'Time period T, total energy 4E',
   'Time period T, total energy 2E',
   'Time period 2T, total energy 4E',
   'Time period 2T, total energy 2E',
   0,
   'Period T = 2π√(m/k) is independent of amplitude. Energy E = ½kA² — doubling the amplitude quadruples the energy to 4E.',
   12),

  ('phys-c1-mcq-13', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A particle undergoes SHM with total mechanical energy E. What are the kinetic energies at maximum displacement and at the equilibrium position?',
   'Maximum displacement: E, Equilibrium: 0',
   'Maximum displacement: 0, Equilibrium: E',
   'Maximum displacement: E/2, Equilibrium: E/2',
   'Maximum displacement: 0, Equilibrium: 0',
   1,
   'At maximum displacement, all energy is potential (KE = 0). At equilibrium, all energy is kinetic (KE = E).',
   13),

  ('phys-c1-mcq-14', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A particle performs simple harmonic oscillations. Which quantity will be unaffected by a reduction in the amplitude of oscillations?',
   'The total energy',
   'The maximum speed',
   'The maximum acceleration',
   'The period',
   3,
   'The period T = 2π/ω depends only on the system properties (mass, spring constant), not on amplitude. Total energy (½kA²), max speed (ωA), and max acceleration (ω²A) all depend on amplitude.',
   14),

  ('phys-c1-mcq-15', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'An object on a spring oscillates with displacement x = x₀ cos(ωt). Which expression gives the velocity of the object?',
   'v = x₀ω cos(ωt)',
   'v = −x₀ω sin(ωt)',
   'v = x₀ω sin(ωt)',
   'v = −x₀ω cos(ωt)',
   1,
   'Velocity is the time derivative of displacement: v = dx/dt = d/dt[x₀cos(ωt)] = −x₀ω sin(ωt).',
   15),

  ('phys-c1-mcq-16', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A mass-spring system and a simple pendulum both oscillate with period T on Earth. They are taken to the Moon where g is smaller. What happens to the periods?',
   'Both periods increase',
   'Pendulum period increases; spring period stays the same',
   'Both periods stay the same',
   'Pendulum period stays the same; spring period increases',
   1,
   'Pendulum: T = 2π√(l/g) — smaller g means larger T. Mass-spring: T = 2π√(m/k) — independent of g, so T is unchanged.',
   16),

  ('phys-c1-mcq-17', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A simple pendulum has mass M and length l with period T. What is the period of a pendulum with mass 4M and length 0.25l?',
   '0.5T',
   'T',
   '2T',
   '4T',
   0,
   'T = 2π√(l/g) — period is independent of mass. With length 0.25l: T_new = 2π√(0.25l/g) = 0.5 × 2π√(l/g) = 0.5T.',
   17),

  ('phys-c1-mcq-18', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'A particle executes SHM with period T. How does the total energy E vary with time?',
   'E oscillates sinusoidally between 0 and a maximum',
   'E decreases exponentially with time',
   'E increases linearly with time',
   'E remains constant throughout the motion',
   3,
   'In the absence of damping, total mechanical energy in SHM is conserved. E = ½kA² = constant at all times.',
   18),

  ('phys-c1-mcq-19', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'An object undergoes SHM with period T and amplitude 0.5 m. At t = 0 the displacement is at its maximum. What is the displacement at time t = 3T/4?',
   '−0.50 m',
   '0.50 m',
   '0.25 m',
   '0 m',
   3,
   'x = 0.5 cos(ωt). At t = 3T/4: x = 0.5 cos(2π × 3/4) = 0.5 cos(3π/2) = 0.5 × 0 = 0 m.',
   19),

  ('phys-c1-mcq-20', 'C.1 Simple Harmonic Motion', 'SL/HL', 'C',
   'Which of the following correctly describes the velocity-displacement graph for a body undergoing SHM?',
   'An ellipse centred on the origin',
   'A circle centred on the origin',
   'A straight line through the origin',
   'A parabola opening downward',
   0,
   'v² = ω²(x₀² − x²), which rearranges to v²/(ωx₀)² + x²/x₀² = 1 — the equation of an ellipse centred on the origin.',
   20);


-- ─── WRITTEN QUESTIONS ───────────────────────────────────────

INSERT OR IGNORE INTO physics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('phys-c1-wr-01', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'A particle in a metal sheet performs simple harmonic oscillations. When the displacement of P is 3.2 μm the magnitude of its acceleration is 7.9 m s⁻². Calculate the magnitude of the acceleration of P when its displacement is 2.3 μm. [2]',
   '✓ Expression or statement showing acceleration is proportional to displacement [1]
✓ a = 7.9 × (2.3 / 3.2) = 5.7 m s⁻² [1]',
   'Q1', 1),

  ('phys-c1-wr-02', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'A body is displaced from equilibrium. State the two conditions necessary for the body to execute simple harmonic motion. [2]',
   '✓ The force / acceleration is directed towards the equilibrium position [1]
✓ The force / acceleration is proportional to the displacement from equilibrium [1]',
   'Q2(a)', 2),

  ('phys-c1-wr-03', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 1,
   'In a model of a methane molecule, a hydrogen atom oscillates about the carbon atom. Using a displacement-time graph, determine the amplitude of oscillation of the hydrogen atom. [1]',
   '✓ Amplitude = 1.5 × 10⁻¹⁰ m [1]',
   'Q2(b)(i)', 3),

  ('phys-c1-wr-04', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'Show that the frequency of oscillation of the hydrogen atom is 9.1 × 10¹³ Hz. [2]',
   '✓ T = 1.1 × 10⁻¹¹ s (read from graph) [1]
✓ f = 1/T = 9.1 × 10¹³ Hz [1]',
   'Q2(b)(ii)', 4),

  ('phys-c1-wr-05', 'C.1 Simple Harmonic Motion', 'HL', 'short_answer', 'C', 2,
   'Show that the maximum kinetic energy of the hydrogen atom is 6.2 × 10⁻¹⁸ J. The mass of hydrogen atom is 1.7 × 10⁻²⁷ kg. [2]',
   '✓ ω = 2πf = 5.7 × 10¹⁴ rad s⁻¹ [1]
✓ E_max = ½mω²A² = ½ × 1.7 × 10⁻²⁷ × (5.7 × 10¹⁴)² × (1.5 × 10⁻¹⁰)² = 6.2 × 10⁻¹⁸ J [1]',
   'Q2(b)(iii)', 5),

  ('phys-c1-wr-06', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 3,
   'Sketch a graph showing the variation with time of the speed of the hydrogen atom for one period of oscillation, starting at t = 0 when the displacement is at maximum. [3]',
   '✓ Negative sine shape [1]
✓ Starting at zero speed [1]
✓ Same frequency/period as the displacement graph [1]',
   'Q2(c)', 6),

  ('phys-c1-wr-07', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 1,
   'The frequency of oscillation f is given by f = (1/2π)√(k/mₚ), where k is the force per unit displacement and mₚ is the mass of a proton (1.7 × 10⁻²⁷ kg). Show that k ≈ 560 N m⁻¹. [1]',
   '✓ k = 4π²f²mₚ = 4π² × (9.1 × 10¹³)² × 1.7 × 10⁻²⁷ ≈ 560 N m⁻¹ [1]',
   'Q2(d)(i)', 7),

  ('phys-c1-wr-08', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'Estimate, using k ≈ 560 N m⁻¹, the maximum acceleration of the hydrogen atom. [2]',
   '✓ Use of F = kx and F = ma (or a = kA/m) [1]
✓ a_max = kA/m = 560 × 1.5 × 10⁻¹⁰ / 1.7 × 10⁻²⁷ ≈ 4.9 × 10¹⁹ m s⁻² [1]',
   'Q2(d)(ii)', 8),

  ('phys-c1-wr-09', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 4,
   'A toy on a spring oscillates with SHM. Sketch: (a) a displacement-time graph for three oscillations [2], and (b) velocity-time and acceleration-time graphs for the same three oscillations [2].',
   '✓ Displacement: cosine curve with constant period and amplitude [1+1]
✓ Velocity: negative sine curve (leads displacement by π/2) [1]
✓ Acceleration: negative cosine curve (antiphase with displacement) [1]',
   'Q3', 9),

  ('phys-c1-wr-10', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'A speaker cone produces a 100 Hz sound and moves through a maximum distance of 2.0 mm with SHM. The displacement equation is x = 1.0 × 10⁻³ cos(628t). Show that the data leads to the numbers in this equation. [2]',
   '✓ Amplitude x₀ = 2.0/2 = 1.0 mm = 1.0 × 10⁻³ m [1]
✓ ω = 2πf = 2π × 100 = 628 rad s⁻¹ [1]',
   'Q4(a)', 10),

  ('phys-c1-wr-11', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 3,
   'For the speaker cone with x = 1.0 × 10⁻³ cos(628t), calculate: (i) the maximum acceleration, and (ii) the maximum speed. [3]',
   '✓ a_max = ω²x₀ = (628)² × 1.0 × 10⁻³ = 394 m s⁻² [1]
✓ v_max = ωx₀ [1]
✓ v_max = 628 × 1.0 × 10⁻³ = 0.63 m s⁻¹ [1]',
   'Q4(b)', 11),

  ('phys-c1-wr-12', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 4,
   'An object vibrates in air. The variation of acceleration a with displacement x is a straight line through the origin with negative gradient. State and explain two reasons why this graph indicates the object is executing SHM. [4]',
   '✓ Displacement is proportional to acceleration (graph is a straight line through the origin) [1]
✓ This is a requirement for SHM: a = −ω²x [1]
✓ Displacement and acceleration are in opposite directions (negative gradient) [1]
✓ This means the acceleration/force is always directed towards the equilibrium position [1]',
   'Q5(a)', 12),

  ('phys-c1-wr-13', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 4,
   'Using data from an acceleration-displacement graph for SHM, show that the frequency of oscillation is 350 Hz. [4]',
   '✓ Use of ω² = −(gradient) or ω² = a/x [1]
✓ Read gradient from graph (e.g. ω² ≈ 4.8 × 10⁶) [1]
✓ ω = 2πf [1]
✓ f = ω/(2π) = 350 Hz [1]',
   'Q5(b)', 13),

  ('phys-c1-wr-14', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 1,
   'State the amplitude of the vibrations from the acceleration-displacement graph. [1]',
   '✓ 0.60 mm (read from x-intercept of the a-x graph) [1]',
   'Q5(c)', 14),

  ('phys-c1-wr-15', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'A particle of mass m attached to a light spring executes SHM horizontally. State the condition relating to the net force acting on the particle that is necessary for SHM. [2]',
   '✓ The net force must be proportional to the displacement from the equilibrium position [1]
✓ The net force must be directed towards the equilibrium position (restoring force) [1]',
   'Q6(a)', 15),

  ('phys-c1-wr-16', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 4,
   'The mass of the particle on the spring is 0.30 kg. A kinetic energy vs displacement graph shows maximum KE at x = 0. Using data from the graph, show that the frequency f of oscillation is 2.0 Hz. [4]',
   '✓ Read x₀ (amplitude) from graph where KE = 0 [1]
✓ Read E_total (maximum KE at x = 0) from graph [1]
✓ Use E = ½mω²x₀² to find ω [1]
✓ f = ω/(2π) = 2.0 Hz [1]',
   'Q6(b)', 16),

  ('phys-c1-wr-17', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'A rectangular piece of wood of length l floats in water. It is pushed down a distance A and released. The acceleration is given by a = −(20/d)x, where d is the submerged length at equilibrium. Explain why this equation shows the wood executes SHM. [2]',
   '✓ The acceleration is proportional to the displacement x (a ∝ x because 20/d is constant) [1]
✓ The negative sign shows the acceleration is always directed towards the equilibrium position (restoring) [1]',
   'Q10(a)', 17),

  ('phys-c1-wr-18', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 3,
   'The period of oscillation of the floating wood is 1.4 s. Show that the length l of the wood is 0.70 m. [3]',
   '✓ ω = 2π/T = 2π/1.4 = 4.49 rad s⁻¹ [1]
✓ From ω² = 20/d: d = 20/(2π/1.4)² ≈ 0.995 m [1]
✓ Using the equilibrium condition and Archimedes'' principle: l = 0.70 m [1]',
   'Q10(b)', 18),

  ('phys-c1-wr-19', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'The floating wood is initially pushed down by A = 0.12 m. Calculate the magnitude of the maximum acceleration. [2]',
   '✓ a_max = ω²A [1]
✓ a_max = (2π/1.4)² × 0.12 = 2.4 m s⁻² [1]',
   'Q10(c)', 19),

  ('phys-c1-wr-20', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'A mass-spring system oscillates on a frictionless surface. The acceleration-displacement relationship is modelled by two graphs A and B. Outline two reasons why both models predict SHM when displacement is small. [2]',
   '✓ Displacement is proportional to acceleration/force (graph is straight and through origin for small x) [1]
✓ Displacement and acceleration/force are in opposite directions (gradient is negative) OR acceleration is always directed towards equilibrium [1]',
   'Q2a*', 20),

  ('phys-c1-wr-21', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 4,
   'Determine the time period of the mass-spring system when displacement is small, given the acceleration-displacement graph. [4]',
   '✓ Attempted use of ω² = |gradient| [1]
✓ Suitable read-offs leading to gradient of line ≈ 28 s⁻² [1]
✓ T = 2π/ω [1]
✓ T ≈ 1.2 s [1]',
   'Q2b*', 21),

  ('phys-c1-wr-22', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'Outline, without calculation, the change to the time period of the system for model B when the displacement is large. [2]',
   '✓ Time period increases [1]
✓ Because the average angular frequency ω is smaller for large amplitudes / the slope (acceleration/force) at large x is smaller for model B / the restoring force is weaker at large displacements [1]',
   'Q2c*', 22),

  ('phys-c1-wr-23', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'For model A, the elastic potential energy Ep stored in the spring varies parabolically with displacement x. Describe the Ep graph for model B. [2]',
   '✓ Same curve/shape as model A for small amplitudes (up to about 0.05 m) [1]
✓ For large amplitudes, Ep is smaller for model B / values are lower than the original parabola / the curve is wider [1]',
   'Q2d*', 23),

  ('phys-c1-wr-24', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 1,
   'A mass oscillates at the end of a vertical spring. From the speed-time graph of the oscillation, calculate the frequency. [1]',
   '✓ f = 1.3 Hz [1]',
   'Q4a*', 24),

  ('phys-c1-wr-25', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'Test 1 uses a 1.0 kg mass with spring constant k₁. Test 2 uses a 4.0 kg mass with spring constant k₂. Both have the same frequency. Deduce the ratio k₁/k₂. [2]',
   '✓ Using T = 2π√(m/k) and equal periods: k ∝ m [1]
✓ k₁/k₂ = m₁/m₂ = 1.0/4.0 = 0.25 [1]',
   'Q4b*', 25),

  ('phys-c1-wr-26', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'Determine the amplitude of oscillation for test 1. [2]',
   '✓ v_max = 4.8 m s⁻¹ (read from speed-time graph) [1]
✓ A = v_max / ω = v_max / (2πf) = 4.8 / (2π × 1.3) ≈ 0.59–0.61 m [1]',
   'Q4c*', 26),

  ('phys-c1-wr-27', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 4,
   'A motion sensor emits sound at 35 kHz. The speed of sound is 340 m s⁻¹. For test 2 with v_max from the graph, determine the maximum frequency change detected by the sensor. [4]',
   '✓ Read off v_max ≈ 9.4 m s⁻¹ from graph [1]
✓ Use Doppler formula: f'' = f × v_sound / (v_sound ± v_source) [1]
✓ Calculate shifted frequency ≈ 36 kHz or 34 kHz [1]
✓ Recognise two shifts (approaching and receding) so maximum change ≈ 2 kHz [1]',
   'Q4e*', 27),

  ('phys-c1-wr-28', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'On a guitar, the strings vibrate between two fixed points. Outline how a standing wave is produced on the string. [2]',
   '✓ A travelling wave moves along the string and reflects at the fixed end [1]
✓ Superposition/interference of the incident and reflected waves produces the standing wave [1]',
   'Q6a*', 28),

  ('phys-c1-wr-29', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'A guitar string vibrates in its first harmonic at 195 Hz with a sounding length of 62 cm. Show that the speed of the wave on the string is about 240 m s⁻¹. [2]',
   '✓ For the first harmonic: λ = 2L = 2 × 0.62 = 1.24 m [1]
✓ v = fλ = 195 × 1.24 = 242 ≈ 240 m s⁻¹ [1]',
   'Q6b*', 29),

  ('phys-c1-wr-30', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'Point P on a guitar string vibrates with SHM at 195 Hz and amplitude 0.4 cm. Calculate, in m s⁻¹, the maximum velocity of vibration of point P. [2]',
   '✓ v_max occurs at x = 0 (equilibrium); v_max = ωA = 2πfA [1]
✓ v_max = 2π × 195 × 0.004 = 4.9 m s⁻¹ [1]',
   'Q6d*', 30),

  ('phys-c1-wr-31', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'Calculate, in terms of g, the maximum acceleration of point P vibrating at 195 Hz with amplitude 0.4 cm. [2]',
   '✓ a_max = ω²A = (2π × 195)² × 0.004 ≈ 6020 m s⁻² [1]
✓ a_max ≈ 6020 / 9.81 ≈ 614g [1]',
   'Q6e*', 31),

  ('phys-c1-wr-32', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'Estimate the displacement needed to double the energy of the vibrating guitar string. The original amplitude is 0.4 cm. [2]',
   '✓ Energy is proportional to amplitude squared: E ∝ A² [1]
✓ For 2E: A'' = A√2 = 0.4 × √2 ≈ 0.57 cm [1]',
   'Q6f*', 32),

  ('phys-c1-wr-33', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 1,
   'The guitar string is made to vibrate in its third harmonic. The sounding length is 62 cm. State the distance between consecutive nodes. [1]',
   '✓ Distance = L/3 = 62/3 ≈ 20.7 cm [1]',
   'Q6g*', 33),

  ('phys-c1-wr-34', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 1,
   'Two points on a wave are oscillating in phase. What is the phase difference between them? [1]',
   '✓ 0 or 2π or 360° [1]',
   'Q7a*', 34),

  ('phys-c1-wr-35', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 3,
   'A pendulum bob oscillates with SHM. From the kinetic energy-time graph, calculate the length of the thread. State your answer to an appropriate number of significant figures. [3]',
   '✓ Identify T = 2.25 s from the KE graph (period between successive KE maxima × 2 or between successive zeroes) [1]
✓ Using T = 2π√(L/g): L = g(T/2π)² = 9.81 × (2.25/2π)² = 1.26 m [1]
✓ L = 1.3 m (to 2 significant figures) [1]',
   'Q8a*', 35),

  ('phys-c1-wr-36', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 2,
   'The mass of the pendulum bob is 75 g. The maximum kinetic energy from the graph is 20 mJ. Show that the maximum speed of the bob is about 0.7 m s⁻¹. [2]',
   '✓ ½mv² = 20 × 10⁻³ or ½ × 0.075 × v² = 0.020 [1]
✓ v = √(2 × 0.020/0.075) = 0.73 ≈ 0.7 m s⁻¹ [1]',
   'Q8c*', 36),

  ('phys-c1-wr-37', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 1,
   'The 75 g bob moves horizontally at 0.80 m s⁻¹ and collides with a stationary 75 g object. They stick together. Calculate the speed of the combined masses immediately after the collision. [1]',
   '✓ By conservation of momentum: m×0.80 = 2m×v, so v = 0.40 m s⁻¹ [1]',
   'Q8d*', 37),

  ('phys-c1-wr-38', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 3,
   'Show that the collision between the 75 g pendulum bob (moving at 0.80 m s⁻¹) and the stationary 75 g object is inelastic. [3]',
   '✓ Initial KE = ½ × 0.075 × 0.80² = 24 mJ [1]
✓ Final KE = ½ × 0.150 × 0.40² = 12 mJ [1]
✓ Kinetic energy is lost (24 mJ → 12 mJ), therefore the collision is inelastic [1]',
   'Q8e*', 38),

  ('phys-c1-wr-39', 'C.1 Simple Harmonic Motion', 'SL/HL', 'short_answer', 'C', 3,
   'A motion sensor emits sound of frequency f which reflects from the moving pendulum bob and is detected as frequency f''. Explain why f and f'' are different. [3]',
   '✓ This is due to the Doppler effect [1]
✓ The moving bob causes a change in the wavelength of the reflected sound wave [1]
✓ Since wave speed is constant, a change in wavelength means a change in frequency [1]',
   'Q8g*', 39);
