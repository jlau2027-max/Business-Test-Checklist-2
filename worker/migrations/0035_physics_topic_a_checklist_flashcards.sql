-- Physics Topic A: Space, Time & Motion — Checklists & Flashcards
-- Units A.1–A.5 (A.4 & A.5 are HL only)

-- ============================================================
-- CHECKLIST SECTIONS
-- ============================================================

INSERT INTO physics_checklist_sections (id, title, color, unit, sort_order) VALUES
('phys_a1', 'A.1 Kinematics', '#C4A36A', 'A.1', 1),
('phys_a2', 'A.2 Forces & Momentum', '#C4A36A', 'A.2', 2),
('phys_a3', 'A.3 Work, Energy & Power', '#C4A36A', 'A.3', 3),
('phys_a4', 'A.4 Rigid Body Mechanics [HL]', '#C4A36A', 'A.4', 4),
('phys_a5', 'A.5 Galilean & Special Relativity [HL]', '#C4A36A', 'A.5', 5);

-- ============================================================
-- CHECKLIST ITEMS — A.1 Kinematics (9 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_a1', 'Define displacement, distance, speed and velocity', 1),
('phys_a1', 'Distinguish between instantaneous and average values of velocity, speed and acceleration', 2),
('phys_a1', 'State and apply the four SUVAT equations for uniformly accelerated motion', 3),
('phys_a1', 'Analyse motion with uniform and non-uniform acceleration', 4),
('phys_a1', 'Sketch and interpret displacement–time, velocity–time and acceleration–time graphs', 5),
('phys_a1', 'Calculate displacement and velocity from the area under graphs and gradients', 6),
('phys_a1', 'Resolve projectile motion into horizontal and vertical components', 7),
('phys_a1', 'Solve projectile problems using equations of motion (no air resistance)', 8),
('phys_a1', 'Describe qualitative effects of fluid resistance on projectiles (trajectory, range, terminal speed)', 9);

-- ============================================================
-- CHECKLIST ITEMS — A.2 Forces & Momentum (11 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_a2', 'State Newton''s three laws of motion', 1),
('phys_a2', 'Draw and analyse free-body diagrams to find the resultant force', 2),
('phys_a2', 'Identify and apply contact forces: normal, friction, tension, elastic (Hooke''s law), viscous drag (Stokes''), buoyancy', 3),
('phys_a2', 'Identify and apply field forces: gravitational (mg), electric, magnetic', 4),
('phys_a2', 'Define linear momentum p = mv and state the law of conservation of momentum', 5),
('phys_a2', 'Define impulse J = FΔt and relate it to change in momentum', 6),
('phys_a2', 'Distinguish between F = ma (constant mass) and F = Δp/Δt (changing mass)', 7),
('phys_a2', 'Classify collisions as elastic or inelastic; analyse explosions with energy considerations', 8),
('phys_a2', 'Derive and apply centripetal acceleration a = v²/r = ω²r', 9),
('phys_a2', 'Explain that centripetal force acts perpendicular to velocity, changing direction but not speed', 10),
('phys_a2', 'Relate angular velocity ω to linear speed v = ωr = 2πr/T', 11);

-- ============================================================
-- CHECKLIST ITEMS — A.3 Work, Energy & Power (11 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_a3', 'State the principle of conservation of energy', 1),
('phys_a3', 'Define work done by a constant force: W = Fs cos θ', 2),
('phys_a3', 'Understand that work done by the resultant force equals the change in energy of the system', 3),
('phys_a3', 'Draw and interpret Sankey diagrams for energy transfers', 4),
('phys_a3', 'Calculate kinetic energy: Ek = ½mv² = p²/2m', 5),
('phys_a3', 'Calculate gravitational potential energy near Earth''s surface: ΔEp = mgΔh', 6),
('phys_a3', 'Calculate elastic potential energy: EH = ½k(Δx)²', 7),
('phys_a3', 'Apply conservation of mechanical energy (KE + GPE + EPE) in absence of friction', 8),
('phys_a3', 'Define and calculate power: P = ΔW/Δt = Fv', 9),
('phys_a3', 'Define and calculate efficiency: η = Eoutput / Einput = Poutput / Pinput', 10),
('phys_a3', 'Understand energy density of fuel sources', 11);

-- ============================================================
-- CHECKLIST ITEMS — A.4 Rigid Body Mechanics [HL] (9 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_a4', 'Define torque: τ = Fr sin θ [HL]', 1),
('phys_a4', 'State the condition for rotational equilibrium (resultant torque = 0) [HL]', 2),
('phys_a4', 'Describe rotational motion in terms of angular displacement, angular velocity, angular acceleration [HL]', 3),
('phys_a4', 'State and apply the rotational SUVAT equations [HL]', 4),
('phys_a4', 'Define moment of inertia: I = Σmr² and understand it depends on mass distribution [HL]', 5),
('phys_a4', 'Apply Newton''s second law for rotation: τ = Iα [HL]', 6),
('phys_a4', 'Define angular momentum: L = Iω [HL]', 7),
('phys_a4', 'State conservation of angular momentum and apply angular impulse: ΔL = τΔt [HL]', 8),
('phys_a4', 'Calculate rotational kinetic energy: Ek = ½Iω² = L²/2I [HL]', 9);

-- ============================================================
-- CHECKLIST ITEMS — A.5 Galilean & Special Relativity [HL] (14 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_a5', 'Define inertial reference frames and state Galilean relativity [HL]', 1),
('phys_a5', 'Apply Galilean transformations: x'' = x – vt, t'' = t [HL]', 2),
('phys_a5', 'Apply Galilean velocity addition: u'' = u – v [HL]', 3),
('phys_a5', 'State Einstein''s two postulates of special relativity [HL]', 4),
('phys_a5', 'Apply the Lorentz transformations: x'' = γ(x – vt), t'' = γ(t – vx/c²) [HL]', 5),
('phys_a5', 'Apply relativistic velocity addition: u'' = (u – v)/(1 – uv/c²) [HL]', 6),
('phys_a5', 'Define and calculate the spacetime interval: (Δs)² = (cΔt)² – (Δx)² [HL]', 7),
('phys_a5', 'Define proper time and proper length [HL]', 8),
('phys_a5', 'Apply time dilation: Δt = γΔt₀ [HL]', 9),
('phys_a5', 'Apply length contraction: L = L₀/γ [HL]', 10),
('phys_a5', 'Explain the relativity of simultaneity [HL]', 11),
('phys_a5', 'Draw, read and interpret spacetime diagrams [HL]', 12),
('phys_a5', 'Relate world line angle to speed: tan θ = v/c [HL]', 13),
('phys_a5', 'Describe muon decay as evidence for time dilation and length contraction [HL]', 14);

-- ============================================================
-- FLASHCARD TOPICS
-- ============================================================

INSERT INTO physics_flashcard_topics (id, label, color, unit, sort_order) VALUES
('phys_fc_a1', 'A.1 Kinematics', '#C4A36A', 'A.1', 1),
('phys_fc_a2', 'A.2 Forces & Momentum', '#C4A36A', 'A.2', 2),
('phys_fc_a3', 'A.3 Work, Energy & Power', '#C4A36A', 'A.3', 3),
('phys_fc_a4', 'A.4 Rigid Body Mechanics [HL]', '#C4A36A', 'A.4', 4),
('phys_fc_a5', 'A.5 Galilean & Special Relativity [HL]', '#C4A36A', 'A.5', 5);

-- ============================================================
-- FLASHCARDS — A.1 Kinematics (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_a1', 'What is the difference between distance and displacement?', 'Distance is the total path length travelled (scalar). Displacement is the change in position from start to finish measured in a straight line (vector).', NULL, 1),
('phys_fc_a1', 'State the four SUVAT equations.', 's = ((u+v)/2)t; v = u + at; s = ut + ½at²; v² = u² + 2as. These apply only when acceleration is constant.', 'v = u + at; s = ut + ½at²; v² = u² + 2as', 2),
('phys_fc_a1', 'How do you find displacement from a velocity–time graph?', 'Displacement equals the area under the v–t graph (including negative areas below the axis). The gradient gives acceleration.', NULL, 3),
('phys_fc_a1', 'How is projectile motion analysed?', 'Resolve into two independent components: horizontal (constant velocity, a = 0) and vertical (uniform acceleration g downwards). Time links both components.', NULL, 4),
('phys_fc_a1', 'What is terminal speed?', 'The constant maximum speed reached when the drag force on a falling object equals its weight, so net force and acceleration become zero.', NULL, 5),
('phys_fc_a1', 'Distinguish instantaneous velocity from average velocity.', 'Instantaneous velocity is the velocity at a specific moment (gradient of s–t curve at a point). Average velocity is total displacement divided by total time.', NULL, 6);

-- ============================================================
-- FLASHCARDS — A.2 Forces & Momentum (8 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_a2', 'State Newton''s First Law.', 'A body remains at rest or moves with constant velocity unless acted upon by a resultant external force. This defines inertia.', NULL, 1),
('phys_fc_a2', 'State Newton''s Second Law (both forms).', 'F = ma (constant mass) or F = Δp/Δt (general form allowing changing mass). The resultant force equals the rate of change of momentum.', 'F = ma; F = Δp/Δt', 2),
('phys_fc_a2', 'State Newton''s Third Law.', 'When body A exerts a force on body B, body B exerts an equal and opposite force on body A. The forces act on different bodies and are the same type.', NULL, 3),
('phys_fc_a2', 'What is the impulse–momentum theorem?', 'Impulse J = FΔt = Δp. The area under a force–time graph equals the change in momentum of the system.', 'J = FΔt = Δp', 4),
('phys_fc_a2', 'How do elastic and inelastic collisions differ?', 'In elastic collisions both momentum AND kinetic energy are conserved. In inelastic collisions momentum is conserved but kinetic energy is not (some converts to heat/sound). Perfectly inelastic: objects stick together.', NULL, 5),
('phys_fc_a2', 'Why does an object in uniform circular motion accelerate?', 'Although speed is constant, the velocity direction changes continuously. The centripetal acceleration a = v²/r is directed toward the centre, caused by a centripetal force perpendicular to velocity.', 'a = v²/r = ω²r', 6),
('phys_fc_a2', 'State Stokes'' law for viscous drag.', 'Fd = 6πηrv, where η is the dynamic viscosity of the fluid, r is the radius of the sphere, and v is its speed.', 'Fd = 6πηrv', 7),
('phys_fc_a2', 'State Hooke''s Law.', 'FH = –kx, where k is the spring constant and x is the extension/compression from the natural length. The negative sign indicates a restoring force.', 'F = –kx', 8);

-- ============================================================
-- FLASHCARDS — A.3 Work, Energy & Power (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_a3', 'Define work in physics.', 'Work W = Fs cos θ, where F is the force magnitude, s is the displacement, and θ is the angle between the force and displacement vectors. Work is a scalar measured in joules.', 'W = Fs cos θ', 1),
('phys_fc_a3', 'State the principle of conservation of energy.', 'Energy cannot be created or destroyed, only transferred from one form to another. The total energy of an isolated system remains constant.', NULL, 2),
('phys_fc_a3', 'What is a Sankey diagram?', 'A diagram showing energy transfers in a system. The width of each arrow is proportional to the amount of energy. Input on the left, useful output continues forward, wasted energy branches off.', NULL, 3),
('phys_fc_a3', 'How is power defined?', 'Power is the rate of doing work or rate of energy transfer: P = ΔW/Δt. Also P = Fv for a constant force on an object moving at velocity v. Unit: watt (W) = J s⁻¹.', 'P = ΔW/Δt = Fv', 4),
('phys_fc_a3', 'What conditions are needed for mechanical energy conservation?', 'Mechanical energy (KE + GPE + EPE) is conserved when no external non-conservative forces (friction, air resistance) do work on the system.', NULL, 5),
('phys_fc_a3', 'What is energy density?', 'The amount of energy stored per unit volume (J/m³) or per unit mass (J/kg, also called specific energy) of a fuel source. Higher energy density means more energy per unit of fuel.', NULL, 6);

-- ============================================================
-- FLASHCARDS — A.4 Rigid Body Mechanics [HL] (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_a4', 'Define torque.', 'Torque τ = Fr sin θ, where F is the force, r is the distance from the axis, and θ is the angle between F and r. It is the rotational equivalent of force. Unit: N m.', 'τ = Fr sin θ', 1),
('phys_fc_a4', 'What is the condition for rotational equilibrium?', 'The resultant torque about any axis is zero (Στ = 0). This means there is no angular acceleration, so the body either does not rotate or rotates with constant angular velocity.', 'Στ = 0', 2),
('phys_fc_a4', 'State the rotational analogue of Newton''s second law.', 'τ = Iα, where τ is the net torque, I is the moment of inertia, and α is the angular acceleration. Moment of inertia is the rotational analogue of mass.', 'τ = Iα', 3),
('phys_fc_a4', 'What is the moment of inertia?', 'I = Σmr² for point masses. It measures the resistance of a body to angular acceleration. It depends on the mass and how that mass is distributed relative to the axis of rotation.', 'I = Σmr²', 4),
('phys_fc_a4', 'State the law of conservation of angular momentum.', 'Angular momentum L = Iω remains constant if no resultant external torque acts on the system. If I decreases, ω increases (e.g. ice skater pulling arms in).', 'L = Iω', 5),
('phys_fc_a4', 'What are the rotational SUVAT equations?', 'Δθ = ((ωf+ωi)/2)t; ωf = ωi + αt; Δθ = ωit + ½αt²; ωf² = ωi² + 2αΔθ. Same structure as linear SUVAT but with angular quantities.', 'ωf = ωi + αt; Δθ = ωit + ½αt²', 6);

-- ============================================================
-- FLASHCARDS — A.5 Galilean & Special Relativity [HL] (8 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_a5', 'State Einstein''s two postulates of special relativity.', '1) The laws of physics are the same in all inertial reference frames. 2) The speed of light in a vacuum is the same for all inertial observers, regardless of relative motion of source or observer.', NULL, 1),
('phys_fc_a5', 'What is the Lorentz factor γ?', 'γ = 1/√(1 – v²/c²). It is always ≥ 1 and approaches infinity as v approaches c. It appears in time dilation, length contraction, and Lorentz transformations.', 'γ = 1/√(1 – v²/c²)', 2),
('phys_fc_a5', 'Explain time dilation.', 'Δt = γΔt₀. A clock moving relative to an observer runs slower. Δt₀ is the proper time (measured in the frame where the events occur at the same position). Moving clocks run slow.', 'Δt = γΔt₀', 3),
('phys_fc_a5', 'Explain length contraction.', 'L = L₀/γ. An object moving relative to an observer is measured to be shorter along the direction of motion. L₀ is the proper length (measured in the rest frame of the object).', 'L = L₀/γ', 4),
('phys_fc_a5', 'What is the spacetime interval?', '(Δs)² = (cΔt)² – (Δx)². It is invariant (same in all inertial frames). If (Δs)² > 0: time-like (causal connection possible). If (Δs)² < 0: space-like. If = 0: light-like.', '(Δs)² = (cΔt)² – (Δx)²', 5),
('phys_fc_a5', 'What is proper time?', 'The time interval measured by a clock present at both events, i.e. the events occur at the same spatial location in that frame. It is the shortest measured time interval between two events.', NULL, 6),
('phys_fc_a5', 'How does muon decay provide evidence for relativity?', 'Muons created in the upper atmosphere travel much farther than classical predictions allow (given their short half-life). Time dilation (from Earth''s frame) or length contraction (from the muon''s frame) explains their detection at ground level.', NULL, 7),
('phys_fc_a5', 'What does a spacetime diagram show?', 'Time (ct) on the vertical axis, position (x) on the horizontal. World lines show an object''s path. Light travels at 45°. The angle of a world line to the time axis satisfies tan θ = v/c.', 'tan θ = v/c', 8);
