-- Physics Topics B–E: Checklists & Flashcards
-- B: The Particulate Nature of Matter (B.1–B.5)
-- C: Wave Behaviour (C.1–C.5)
-- D: Fields (D.1–D.4)
-- E: Nuclear & Quantum Physics (E.1–E.5)

-- ============================================================
-- CHECKLIST SECTIONS  (sort_order continues from 5 in Topic A)
-- ============================================================

INSERT INTO physics_checklist_sections (id, title, color, unit, sort_order) VALUES
-- Topic B
('phys_b1', 'B.1 Thermal Energy Transfers', '#C4A36A', 'B.1', 6),
('phys_b2', 'B.2 The Greenhouse Effect', '#C4A36A', 'B.2', 7),
('phys_b3', 'B.3 Gas Laws', '#C4A36A', 'B.3', 8),
('phys_b4', 'B.4 Thermodynamics [HL]', '#C4A36A', 'B.4', 9),
('phys_b5', 'B.5 Current & Circuits', '#C4A36A', 'B.5', 10),
-- Topic C
('phys_c1', 'C.1 Simple Harmonic Motion', '#C4A36A', 'C.1', 11),
('phys_c2', 'C.2 Wave Model', '#C4A36A', 'C.2', 12),
('phys_c3', 'C.3 Wave Phenomena', '#C4A36A', 'C.3', 13),
('phys_c4', 'C.4 Standing Waves & Resonance', '#C4A36A', 'C.4', 14),
('phys_c5', 'C.5 Doppler Effect', '#C4A36A', 'C.5', 15),
-- Topic D
('phys_d1', 'D.1 Gravitational Fields', '#C4A36A', 'D.1', 16),
('phys_d2', 'D.2 Electromagnetic Fields', '#C4A36A', 'D.2', 17),
('phys_d3', 'D.3 Electromagnetic Motion', '#C4A36A', 'D.3', 18),
('phys_d4', 'D.4 Induction [HL]', '#C4A36A', 'D.4', 19),
-- Topic E
('phys_e1', 'E.1 Atomic Structure', '#C4A36A', 'E.1', 20),
('phys_e2', 'E.2 Quantum Physics [HL]', '#C4A36A', 'E.2', 21),
('phys_e3', 'E.3 Radioactive Decay', '#C4A36A', 'E.3', 22),
('phys_e4', 'E.4 Fission', '#C4A36A', 'E.4', 23),
('phys_e5', 'E.5 Fusion & Stars', '#C4A36A', 'E.5', 24);

-- ============================================================
-- CHECKLIST ITEMS — B.1 Thermal Energy Transfers (15 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_b1', 'Describe molecular theory in solids, liquids and gases', 1),
('phys_b1', 'Define and calculate density: ρ = m/V', 2),
('phys_b1', 'Convert between Kelvin and Celsius; understand that ΔT is the same in both scales', 3),
('phys_b1', 'Relate Kelvin temperature to average KE of particles: Ek = (3/2)kBT', 4),
('phys_b1', 'Define internal energy as the sum of total random KE and intermolecular PE', 5),
('phys_b1', 'Explain that temperature difference determines direction of thermal energy transfer', 6),
('phys_b1', 'Explain phase changes in terms of energy change at constant temperature', 7),
('phys_b1', 'Apply Q = mcΔT and Q = mL for thermal energy transfer calculations', 8),
('phys_b1', 'Describe conduction, convection and thermal radiation as transfer mechanisms', 9),
('phys_b1', 'Apply Fourier''s law for conduction: ΔQ/Δt = kA(ΔT/Δx)', 10),
('phys_b1', 'Describe convection qualitatively in terms of fluid density differences', 11),
('phys_b1', 'Apply the Stefan–Boltzmann law: L = σAT⁴ for black-body radiation', 12),
('phys_b1', 'Define apparent brightness and luminosity: b = L/(4πd²)', 13),
('phys_b1', 'Apply Wien''s displacement law: λmax T = 2.9 × 10⁻³ m K', 14),
('phys_b1', 'Recall the solar constant S', 15);

-- ============================================================
-- CHECKLIST ITEMS — B.2 The Greenhouse Effect (8 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_b2', 'Define emissivity as the ratio of power radiated per unit area compared to a perfect black body', 1),
('phys_b2', 'Define albedo = total scattered power / total incident power', 2),
('phys_b2', 'Explain that Earth''s albedo varies daily with cloud cover and latitude', 3),
('phys_b2', 'Explain why mean incoming solar intensity = S/4 (projected area vs total surface area)', 4),
('phys_b2', 'Name the main greenhouse gases: CH₄, H₂O, CO₂, N₂O', 5),
('phys_b2', 'Explain greenhouse gas absorption of IR in terms of molecular energy levels and re-emission', 6),
('phys_b2', 'Explain the greenhouse effect using both resonance model and molecular energy levels', 7),
('phys_b2', 'Define the enhanced greenhouse effect as augmentation due to human activities', 8);

-- ============================================================
-- CHECKLIST ITEMS — B.3 Gas Laws (8 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_b3', 'Define pressure: P = F/A', 1),
('phys_b3', 'Relate amount of substance to number of particles: n = N/NA', 2),
('phys_b3', 'Describe the kinetic theory assumptions for ideal gases', 3),
('phys_b3', 'Derive the ideal gas law from empirical gas laws: PV/T = constant', 4),
('phys_b3', 'Apply PV = NkBT and PV = nRT', 5),
('phys_b3', 'Derive that pressure relates to molecular speed: P = (1/3)ρv²', 6),
('phys_b3', 'Relate internal energy of monatomic ideal gas to temperature: U = (3/2)NkBT = (3/2)nRT', 7),
('phys_b3', 'State conditions under which real gases approximate ideal behaviour', 8);

-- ============================================================
-- CHECKLIST ITEMS — B.4 Thermodynamics [HL] (13 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_b4', 'State and apply the first law of thermodynamics: Q = ΔU + W [HL]', 1),
('phys_b4', 'Calculate work done by/on a gas: W = PΔV [HL]', 2),
('phys_b4', 'Relate ΔU to temperature change: ΔU = (3/2)NkBΔT = (3/2)nRΔT [HL]', 3),
('phys_b4', 'Define entropy S as a measure of disorder [HL]', 4),
('phys_b4', 'Apply ΔS = ΔQ/T (macroscopic) and S = kB ln Ω (microscopic) [HL]', 5),
('phys_b4', 'State the second law of thermodynamics: entropy of an isolated system always increases [HL]', 6),
('phys_b4', 'Distinguish irreversible and reversible processes [HL]', 7),
('phys_b4', 'Explain that local entropy can decrease if surroundings'' entropy increases more [HL]', 8),
('phys_b4', 'Identify isovolumetric, isobaric, isothermal and adiabatic processes on P–V diagrams [HL]', 9),
('phys_b4', 'Apply PV^(5/3) = constant for adiabatic processes in monatomic ideal gases [HL]', 10),
('phys_b4', 'Describe cyclic gas processes and heat engines [HL]', 11),
('phys_b4', 'Calculate heat engine efficiency: η = useful work / input energy [HL]', 12),
('phys_b4', 'Apply Carnot efficiency: η_Carnot = 1 – Tc/Th [HL]', 13);

-- ============================================================
-- CHECKLIST ITEMS — B.5 Current & Circuits (11 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_b5', 'Identify cells, circuit components and read circuit diagrams', 1),
('phys_b5', 'Define direct current: I = Δq/Δt', 2),
('phys_b5', 'Define potential difference: V = W/q (work done per unit charge)', 3),
('phys_b5', 'Distinguish conductors and insulators in terms of charge carrier mobility', 4),
('phys_b5', 'Define resistance: R = V/I and explain its origin', 5),
('phys_b5', 'Define and apply resistivity: ρ = RA/L', 6),
('phys_b5', 'Explain Ohm''s law; distinguish ohmic and non-ohmic behaviour', 7),
('phys_b5', 'Calculate electrical power: P = IV = I²R = V²/R', 8),
('phys_b5', 'Calculate total resistance for series and parallel combinations', 9),
('phys_b5', 'Apply emf and internal resistance: ε = I(R + r)', 10),
('phys_b5', 'Describe variable resistors and their uses', 11);

-- ============================================================
-- CHECKLIST ITEMS — C.1 Simple Harmonic Motion (10 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_c1', 'State the conditions that lead to simple harmonic motion (restoring force proportional to displacement)', 1),
('phys_c1', 'State the defining equation of SHM: a = –ω²x', 2),
('phys_c1', 'Define T, f, ω, amplitude, equilibrium position and displacement for SHM', 3),
('phys_c1', 'Relate T, f and ω: T = 1/f = 2π/ω', 4),
('phys_c1', 'Apply T = 2π√(m/k) for a mass–spring system', 5),
('phys_c1', 'Apply T = 2π√(l/g) for a simple pendulum', 6),
('phys_c1', 'Describe energy changes during one cycle (KE ↔ PE exchange)', 7),
('phys_c1', 'Understand phase angle in SHM [HL]', 8),
('phys_c1', 'Apply x = x₀ sin(ωt + φ), v = ωx₀ cos(ωt + φ), v = ±ω√(x₀² – x²) [HL]', 9),
('phys_c1', 'Apply ET = ½mω²x₀² and Ep = ½mω²x² [HL]', 10);

-- ============================================================
-- CHECKLIST ITEMS — C.2 Wave Model (5 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_c2', 'Distinguish transverse and longitudinal travelling waves', 1),
('phys_c2', 'Apply v = fλ = λ/T', 2),
('phys_c2', 'Describe the nature of sound waves (longitudinal, mechanical)', 3),
('phys_c2', 'Describe the electromagnetic spectrum and EM wave properties', 4),
('phys_c2', 'Distinguish mechanical waves (need a medium) from EM waves (travel in vacuum)', 5);

-- ============================================================
-- CHECKLIST ITEMS — C.3 Wave Phenomena (13 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_c3', 'Describe wavefronts and rays for waves in 2D and 3D', 1),
('phys_c3', 'Describe reflection, refraction and transmission at boundaries', 2),
('phys_c3', 'Describe diffraction around bodies and through apertures', 3),
('phys_c3', 'Draw and interpret wavefront–ray diagrams for refraction and diffraction', 4),
('phys_c3', 'Apply Snell''s law: n₁/n₂ = sin θ₂/sin θ₁ = v₂/v₁', 5),
('phys_c3', 'Define critical angle and total internal reflection', 6),
('phys_c3', 'Explain superposition of waves and wave pulses', 7),
('phys_c3', 'State that double-source interference requires coherent sources', 8),
('phys_c3', 'Apply path difference conditions: constructive = nλ, destructive = (n+½)λ', 9),
('phys_c3', 'Apply Young''s double-slit formula: s = λD/d', 10),
('phys_c3', 'Describe single-slit diffraction pattern; apply θ = λ/b [HL]', 11),
('phys_c3', 'Explain that single-slit pattern modulates double-slit pattern [HL]', 12),
('phys_c3', 'Apply diffraction grating equation: nλ = d sin θ [HL]', 13);

-- ============================================================
-- CHECKLIST ITEMS — C.4 Standing Waves & Resonance (5 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_c4', 'Explain formation of standing waves by superposition of two identical waves travelling in opposite directions', 1),
('phys_c4', 'Identify nodes and antinodes; describe relative amplitude and phase difference', 2),
('phys_c4', 'Sketch standing wave patterns in strings and pipes (open/closed)', 3),
('phys_c4', 'Define natural frequency and explain resonance', 4),
('phys_c4', 'Describe damping (light, critical, heavy) and its effect on resonance amplitude and frequency', 5);

-- ============================================================
-- CHECKLIST ITEMS — C.5 Doppler Effect (6 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_c5', 'Describe the Doppler effect for sound and EM waves', 1),
('phys_c5', 'Draw wavefront diagrams for moving source or moving observer', 2),
('phys_c5', 'Apply the approximate Doppler formula for light: Δf/f = Δλ/λ ≈ v/c', 3),
('phys_c5', 'Explain how spectral line shifts reveal motion of stars and galaxies', 4),
('phys_c5', 'Apply the full Doppler formula for moving source: f'' = f(v/(v ± us)) [HL]', 5),
('phys_c5', 'Apply the full Doppler formula for moving observer: f'' = f((v ± uo)/v) [HL]', 6);

-- ============================================================
-- CHECKLIST ITEMS — D.1 Gravitational Fields (13 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_d1', 'State Kepler''s three laws of orbital motion', 1),
('phys_d1', 'Apply Newton''s law of gravitation: F = Gm₁m₂/r²', 2),
('phys_d1', 'State when extended bodies can be treated as point masses', 3),
('phys_d1', 'Define gravitational field strength: g = F/m = GM/r²', 4),
('phys_d1', 'Draw and interpret gravitational field lines', 5),
('phys_d1', 'Define gravitational PE for a two-body system: Ep = –Gm₁m₂/r [HL]', 6),
('phys_d1', 'Define gravitational potential: Vg = –GM/r [HL]', 7),
('phys_d1', 'Relate g to potential gradient: g = –ΔVg/Δr [HL]', 8),
('phys_d1', 'Calculate work done moving a mass: W = mΔVg [HL]', 9),
('phys_d1', 'Draw and interpret equipotential surfaces [HL]', 10),
('phys_d1', 'Derive and apply escape speed: vesc = √(2GM/r) [HL]', 11),
('phys_d1', 'Derive and apply orbital speed: vorbital = √(GM/r) [HL]', 12),
('phys_d1', 'Describe qualitative effect of atmospheric drag on orbiting bodies [HL]', 13);

-- ============================================================
-- CHECKLIST ITEMS — D.2 Electromagnetic Fields (14 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_d2', 'Describe forces between like and unlike charges', 1),
('phys_d2', 'Apply Coulomb''s law: F = kq₁q₂/r²', 2),
('phys_d2', 'State conservation of electric charge', 3),
('phys_d2', 'Describe Millikan''s experiment as evidence for charge quantisation', 4),
('phys_d2', 'Explain charge transfer: friction, induction, contact and grounding', 5),
('phys_d2', 'Define electric field strength: E = F/q', 6),
('phys_d2', 'Draw electric field lines; relate line density to field strength', 7),
('phys_d2', 'Apply uniform field between parallel plates: E = V/d', 8),
('phys_d2', 'Draw and describe magnetic field lines', 9),
('phys_d2', 'Define electric PE for two charges: Ep = kq₁q₂/r [HL]', 10),
('phys_d2', 'Define electric potential: Ve = kQ/r (scalar, zero at infinity) [HL]', 11),
('phys_d2', 'Relate E to potential gradient: E = –ΔVe/Δr [HL]', 12),
('phys_d2', 'Calculate work done moving a charge: W = qΔVe [HL]', 13),
('phys_d2', 'Draw and interpret equipotential surfaces for electric fields [HL]', 14);

-- ============================================================
-- CHECKLIST ITEMS — D.3 Electromagnetic Motion (5 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_d3', 'Describe motion of a charged particle in a uniform electric field', 1),
('phys_d3', 'Describe motion of a charged particle in perpendicular E and B fields', 2),
('phys_d3', 'Apply the force on a moving charge in a B field: F = qvB sin θ', 3),
('phys_d3', 'Apply the force on a current-carrying conductor: F = BIL sin θ', 4),
('phys_d3', 'Apply force per unit length between parallel wires: F/L = μ₀I₁I₂/(2πr)', 5);

-- ============================================================
-- CHECKLIST ITEMS — D.4 Induction [HL] (6 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_d4', 'Define magnetic flux: Φ = BA cos θ [HL]', 1),
('phys_d4', 'Apply Faraday''s law: ε = –N(ΔΦ/Δt) [HL]', 2),
('phys_d4', 'Apply emf for a conductor moving in a B field: ε = BvL [HL]', 3),
('phys_d4', 'State and apply Lenz''s law (direction of induced emf opposes change) [HL]', 4),
('phys_d4', 'Describe how a coil rotating in a uniform B field produces sinusoidal emf [HL]', 5),
('phys_d4', 'Explain the effect of changing rotation frequency on induced emf [HL]', 6);

-- ============================================================
-- CHECKLIST ITEMS — E.1 Atomic Structure (11 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_e1', 'Describe the Geiger–Marsden–Rutherford experiment and the nuclear model', 1),
('phys_e1', 'Use nuclear notation: A/Z X (mass number, atomic number)', 2),
('phys_e1', 'Explain how emission and absorption spectra show discrete energy levels', 3),
('phys_e1', 'Explain photon emission/absorption during atomic transitions', 4),
('phys_e1', 'Apply E = hf for photon energy from energy level transitions', 5),
('phys_e1', 'Explain how spectra reveal chemical composition', 6),
('phys_e1', 'Apply nuclear radius: R = R₀ A^(1/3) and its density implications [HL]', 7),
('phys_e1', 'Describe deviations from Rutherford scattering at high energies [HL]', 8),
('phys_e1', 'Calculate distance of closest approach in head-on scattering [HL]', 9),
('phys_e1', 'Apply Bohr model energy levels: E = –13.6/n² eV [HL]', 10),
('phys_e1', 'Apply quantisation of angular momentum: mvr = nh/(2π) [HL]', 11);

-- ============================================================
-- CHECKLIST ITEMS — E.2 Quantum Physics [HL] (8 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_e2', 'Describe the photoelectric effect as evidence for particle nature of light [HL]', 1),
('phys_e2', 'Define threshold frequency and explain why it is needed [HL]', 2),
('phys_e2', 'Apply Einstein''s photoelectric equation: Emax = hf – Φ [HL]', 3),
('phys_e2', 'Describe electron diffraction as evidence for wave nature of matter [HL]', 4),
('phys_e2', 'Explain wave–particle duality [HL]', 5),
('phys_e2', 'Apply de Broglie wavelength: λ = h/p [HL]', 6),
('phys_e2', 'Describe Compton scattering as further evidence for photon model [HL]', 7),
('phys_e2', 'Apply Compton wavelength shift: Δλ = (h/mec)(1 – cos θ) [HL]', 8);

-- ============================================================
-- CHECKLIST ITEMS — E.3 Radioactive Decay (19 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_e3', 'Define isotopes', 1),
('phys_e3', 'Define nuclear binding energy and mass defect', 2),
('phys_e3', 'Sketch and interpret the binding energy per nucleon curve', 3),
('phys_e3', 'Apply mass–energy equivalence: E = mc²', 4),
('phys_e3', 'Describe the strong nuclear force (short-range, attractive between nucleons)', 5),
('phys_e3', 'Explain the random and spontaneous nature of radioactive decay', 6),
('phys_e3', 'Describe alpha, beta and gamma decay and nuclear changes', 7),
('phys_e3', 'Write decay equations for α, β⁻, β⁺ and γ', 8),
('phys_e3', 'State the existence of neutrinos and antineutrinos', 9),
('phys_e3', 'Compare penetration and ionising abilities of α, β, γ', 10),
('phys_e3', 'Define activity, count rate and half-life', 11),
('phys_e3', 'Calculate activity/count rate changes using integer half-lives', 12),
('phys_e3', 'Explain the effect of background radiation on count rate', 13),
('phys_e3', 'Explain the role of neutron-to-proton ratio in nuclear stability [HL]', 14),
('phys_e3', 'Explain how α and γ spectra show discrete nuclear energy levels [HL]', 15),
('phys_e3', 'Explain how continuous β spectrum provides evidence for the neutrino [HL]', 16),
('phys_e3', 'Apply the radioactive decay law: N = N₀ e^(–λt) [HL]', 17),
('phys_e3', 'Apply A = λN = λN₀ e^(–λt) [HL]', 18),
('phys_e3', 'Relate half-life to decay constant: T½ = ln 2 / λ [HL]', 19);

-- ============================================================
-- CHECKLIST ITEMS — E.4 Fission (4 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_e4', 'Explain that energy is released in spontaneous and neutron-induced fission', 1),
('phys_e4', 'Describe the role of chain reactions in nuclear fission', 2),
('phys_e4', 'Describe the roles of control rods, moderators, heat exchangers and shielding in nuclear power plants', 3),
('phys_e4', 'Discuss properties of fission products and their management (nuclear waste)', 4);

-- ============================================================
-- CHECKLIST ITEMS — E.5 Fusion & Stars (7 items)
-- ============================================================

INSERT INTO physics_checklist_items (section_id, text, sort_order) VALUES
('phys_e5', 'Explain stellar equilibrium between radiation pressure (outward) and gravity (inward)', 1),
('phys_e5', 'State that fusion is the energy source in stars', 2),
('phys_e5', 'Describe conditions for fusion: extremely high temperature and density', 3),
('phys_e5', 'Explain how stellar mass affects the evolution of a star', 4),
('phys_e5', 'Identify main regions of the Hertzsprung–Russell diagram and describe star properties', 5),
('phys_e5', 'Apply stellar parallax: d (parsec) = 1/p (arc-second)', 6),
('phys_e5', 'Describe how to determine stellar radii', 7);

-- ============================================================
-- FLASHCARD TOPICS  (sort_order continues from 5 in Topic A)
-- ============================================================

INSERT INTO physics_flashcard_topics (id, label, color, unit, sort_order) VALUES
-- Topic B
('phys_fc_b1', 'B.1 Thermal Energy Transfers', '#C4A36A', 'B.1', 6),
('phys_fc_b2', 'B.2 The Greenhouse Effect', '#C4A36A', 'B.2', 7),
('phys_fc_b3', 'B.3 Gas Laws', '#C4A36A', 'B.3', 8),
('phys_fc_b4', 'B.4 Thermodynamics [HL]', '#C4A36A', 'B.4', 9),
('phys_fc_b5', 'B.5 Current & Circuits', '#C4A36A', 'B.5', 10),
-- Topic C
('phys_fc_c1', 'C.1 Simple Harmonic Motion', '#C4A36A', 'C.1', 11),
('phys_fc_c2', 'C.2 Wave Model', '#C4A36A', 'C.2', 12),
('phys_fc_c3', 'C.3 Wave Phenomena', '#C4A36A', 'C.3', 13),
('phys_fc_c4', 'C.4 Standing Waves & Resonance', '#C4A36A', 'C.4', 14),
('phys_fc_c5', 'C.5 Doppler Effect', '#C4A36A', 'C.5', 15),
-- Topic D
('phys_fc_d1', 'D.1 Gravitational Fields', '#C4A36A', 'D.1', 16),
('phys_fc_d2', 'D.2 Electromagnetic Fields', '#C4A36A', 'D.2', 17),
('phys_fc_d3', 'D.3 Electromagnetic Motion', '#C4A36A', 'D.3', 18),
('phys_fc_d4', 'D.4 Induction [HL]', '#C4A36A', 'D.4', 19),
-- Topic E
('phys_fc_e1', 'E.1 Atomic Structure', '#C4A36A', 'E.1', 20),
('phys_fc_e2', 'E.2 Quantum Physics [HL]', '#C4A36A', 'E.2', 21),
('phys_fc_e3', 'E.3 Radioactive Decay', '#C4A36A', 'E.3', 22),
('phys_fc_e4', 'E.4 Fission', '#C4A36A', 'E.4', 23),
('phys_fc_e5', 'E.5 Fusion & Stars', '#C4A36A', 'E.5', 24);

-- ============================================================
-- FLASHCARDS — B.1 Thermal Energy Transfers (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_b1', 'What is internal energy?', 'The total random kinetic energy of all molecules (from their random motion) PLUS the total intermolecular potential energy (from forces between molecules).', NULL, 1),
('phys_fc_b1', 'State Fourier''s law of thermal conduction.', 'ΔQ/Δt = kA(ΔT/Δx). The rate of heat transfer depends on thermal conductivity k, cross-sectional area A, and the temperature gradient ΔT/Δx.', 'ΔQ/Δt = kA(ΔT/Δx)', 2),
('phys_fc_b1', 'What happens during a phase change?', 'Temperature remains constant. Energy input goes into changing the potential energy between molecules (breaking/forming bonds) rather than increasing kinetic energy. Q = mL applies.', 'Q = mL', 3),
('phys_fc_b1', 'State the Stefan–Boltzmann law.', 'L = σAT⁴, where L is luminosity (power radiated), σ is Stefan''s constant, A is surface area, and T is absolute temperature in Kelvin. Applies to ideal black bodies.', 'L = σAT⁴', 4),
('phys_fc_b1', 'State Wien''s displacement law.', 'λmax × T = 2.9 × 10⁻³ m K. As temperature increases, the peak wavelength of emission shifts to shorter wavelengths (hotter = bluer).', 'λmax T = 2.9 × 10⁻³ m K', 5),
('phys_fc_b1', 'How does Kelvin temperature relate to particle KE?', 'Ek = (3/2)kBT. Kelvin temperature is directly proportional to the average translational kinetic energy of particles.', 'Ek = (3/2)kBT', 6);

-- ============================================================
-- FLASHCARDS — B.2 The Greenhouse Effect (5 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_b2', 'What is albedo?', 'The ratio of total scattered (reflected) power to total incident power on a surface. Ranges from 0 (absorbs all) to 1 (reflects all). Fresh snow ≈ 0.8, ocean ≈ 0.06.', NULL, 1),
('phys_fc_b2', 'Why is mean incoming solar intensity S/4?', 'The Earth intercepts sunlight over its projected circular cross-section (πr²) but this energy is spread over the full spherical surface (4πr²). Ratio = 1/4, so mean intensity = S/4.', NULL, 2),
('phys_fc_b2', 'How do greenhouse gases warm the Earth?', 'They absorb outgoing infrared radiation (photon energy matches molecular vibrational energy levels), then re-emit it in all directions. Some is directed back to the surface, raising temperature.', NULL, 3),
('phys_fc_b2', 'What is the enhanced greenhouse effect?', 'The additional warming beyond the natural greenhouse effect, caused by increased concentrations of greenhouse gases from human activities (burning fossil fuels, agriculture, deforestation).', NULL, 4),
('phys_fc_b2', 'What is emissivity?', 'The ratio of power radiated per unit area by a real surface to that of a black body at the same temperature. Emissivity = 1 for a perfect black body, < 1 for real surfaces.', NULL, 5);

-- ============================================================
-- FLASHCARDS — B.3 Gas Laws (5 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_b3', 'State the ideal gas law (both forms).', 'PV = NkBT (using number of molecules and Boltzmann constant) or PV = nRT (using moles and gas constant R = 8.31 J mol⁻¹ K⁻¹).', 'PV = NkBT; PV = nRT', 1),
('phys_fc_b3', 'What are the assumptions of the kinetic theory of ideal gases?', 'Molecules are point particles with negligible volume; no intermolecular forces except during collisions; collisions are perfectly elastic; molecules move randomly; collision time is negligible compared to time between collisions.', NULL, 2),
('phys_fc_b3', 'When does real gas behaviour approximate ideal gas behaviour?', 'At high temperature and low pressure (low density). Under these conditions intermolecular forces are negligible and molecular volume is small compared to container volume.', NULL, 3),
('phys_fc_b3', 'How is gas pressure explained by kinetic theory?', 'Gas molecules collide with container walls, each collision transferring momentum. The rate of momentum change per unit area gives rise to pressure: P = (1/3)ρv².', 'P = (1/3)ρv²', 4),
('phys_fc_b3', 'What is the internal energy of a monatomic ideal gas?', 'U = (3/2)NkBT = (3/2)nRT. Since ideal gas has no intermolecular PE, internal energy is purely translational KE, directly proportional to absolute temperature.', 'U = (3/2)NkBT = (3/2)nRT', 5);

-- ============================================================
-- FLASHCARDS — B.4 Thermodynamics [HL] (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_b4', 'State the first law of thermodynamics.', 'Q = ΔU + W. Heat added to a system equals the change in internal energy plus work done BY the system. It is conservation of energy applied to closed thermodynamic systems.', 'Q = ΔU + W', 1),
('phys_fc_b4', 'What is entropy?', 'A thermodynamic quantity measuring the degree of disorder. Macroscopically: ΔS = ΔQ/T. Microscopically: S = kB ln Ω, where Ω is the number of microstates.', 'ΔS = ΔQ/T; S = kB ln Ω', 2),
('phys_fc_b4', 'State the second law of thermodynamics.', 'The total entropy of an isolated system can never decrease over time. In real (irreversible) processes, entropy always increases. This sets the direction of natural processes.', NULL, 3),
('phys_fc_b4', 'What is the Carnot efficiency?', 'η_Carnot = 1 – Tc/Th, where Tc and Th are the absolute temperatures of the cold and hot reservoirs. It is the maximum possible efficiency for any heat engine operating between those temperatures.', 'η_Carnot = 1 – Tc/Th', 4),
('phys_fc_b4', 'Describe an adiabatic process.', 'No heat enters or leaves the system (Q = 0), so ΔU = –W. For monatomic ideal gas: PV^(5/3) = constant. Adiabatic compression raises temperature; expansion lowers it.', 'PV^(5/3) = constant', 5),
('phys_fc_b4', 'Compare the four thermodynamic processes.', 'Isovolumetric: ΔV = 0, W = 0. Isobaric: ΔP = 0, W = PΔV. Isothermal: ΔT = 0, ΔU = 0. Adiabatic: Q = 0, PV^(5/3) = const. Each is defined by one variable held fixed.', NULL, 6);

-- ============================================================
-- FLASHCARDS — B.5 Current & Circuits (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_b5', 'Define electric current.', 'Current I = Δq/Δt, the rate of flow of electric charge. Conventional current flows from positive to negative terminal. SI unit: ampere (A).', 'I = Δq/Δt', 1),
('phys_fc_b5', 'State Ohm''s law.', 'For an ohmic conductor at constant temperature, the current is directly proportional to the potential difference across it (V = IR with constant R). I–V graph is a straight line through the origin.', 'V = IR', 2),
('phys_fc_b5', 'What is emf and internal resistance?', 'EMF (ε) is the total energy per unit charge supplied by the cell. Internal resistance (r) is the resistance within the cell. ε = I(R + r), so terminal p.d. = ε – Ir.', 'ε = I(R + r)', 3),
('phys_fc_b5', 'How do you combine resistors?', 'Series: Rtotal = R₁ + R₂ + ... (same current, voltages add). Parallel: 1/Rtotal = 1/R₁ + 1/R₂ + ... (same voltage, currents add).', NULL, 4),
('phys_fc_b5', 'What is resistivity?', 'ρ = RA/L. An intrinsic property of the material (not the component). R depends on resistivity, length L and cross-sectional area A. Unit: Ω m.', 'ρ = RA/L', 5),
('phys_fc_b5', 'State the power dissipation formulas.', 'P = IV = I²R = V²/R. Power is the rate of energy transfer in a circuit component. For resistors, electrical energy is converted to thermal energy.', 'P = IV = I²R = V²/R', 6);

-- ============================================================
-- FLASHCARDS — C.1 Simple Harmonic Motion (5 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_c1', 'What conditions produce SHM?', 'A restoring force that is directly proportional to displacement from equilibrium and directed towards that equilibrium position. This gives a = –ω²x.', 'a = –ω²x', 1),
('phys_fc_c1', 'State the period of a mass–spring system.', 'T = 2π√(m/k). It depends on mass m and spring constant k, NOT on amplitude. Doubling mass increases T by factor √2.', 'T = 2π√(m/k)', 2),
('phys_fc_c1', 'How does energy vary during SHM?', 'Total energy ET = ½mω²x₀² is constant. At equilibrium: all KE, zero PE. At maximum displacement: all PE, zero KE. Energy continuously exchanges between KE and PE.', 'ET = ½mω²x₀²', 3),
('phys_fc_c1', 'What is the velocity equation for SHM? [HL]', 'v = ±ω√(x₀² – x²). Maximum speed vmax = ωx₀ occurs at equilibrium (x = 0). Speed is zero at extremes of displacement.', 'v = ±ω√(x₀² – x²)', 4),
('phys_fc_c1', 'How are x, v and a related in SHM?', 'x = x₀ sin(ωt + φ); v = dx/dt = ωx₀ cos(ωt + φ); a = –ω²x. Velocity leads displacement by π/2; acceleration is antiphase to displacement.', 'x = x₀ sin(ωt + φ)', 5);

-- ============================================================
-- FLASHCARDS — C.2 Wave Model (3 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_c2', 'What is the difference between transverse and longitudinal waves?', 'Transverse: oscillations are perpendicular to direction of energy transfer (e.g. EM waves, waves on a string). Longitudinal: oscillations are parallel to energy transfer (e.g. sound waves).', NULL, 1),
('phys_fc_c2', 'State the wave equation.', 'v = fλ = λ/T. Wave speed equals frequency times wavelength. This applies to all waves.', 'v = fλ', 2),
('phys_fc_c2', 'How do mechanical and electromagnetic waves differ?', 'Mechanical waves require a medium to propagate (sound, water waves). EM waves are self-propagating oscillations of electric and magnetic fields and can travel through a vacuum at speed c.', NULL, 3);

-- ============================================================
-- FLASHCARDS — C.3 Wave Phenomena (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_c3', 'State Snell''s law.', 'n₁ sin θ₁ = n₂ sin θ₂. Also n₁/n₂ = v₂/v₁ = sin θ₂/sin θ₁. When light enters a denser medium it slows down and bends toward the normal.', 'n₁ sin θ₁ = n₂ sin θ₂', 1),
('phys_fc_c3', 'What are the conditions for constructive and destructive interference?', 'Constructive: path difference = nλ (waves arrive in phase). Destructive: path difference = (n + ½)λ (waves arrive in antiphase). Sources must be coherent.', NULL, 2),
('phys_fc_c3', 'State Young''s double-slit formula.', 's = λD/d, where s is fringe spacing, λ is wavelength, D is distance to screen, and d is slit separation. Requires coherent, monochromatic light.', 's = λD/d', 3),
('phys_fc_c3', 'What is total internal reflection?', 'When light travels from a denser to a less dense medium and the angle of incidence exceeds the critical angle, all light is reflected back. Critical angle: sin θc = n₂/n₁.', 'sin θc = n₂/n₁', 4),
('phys_fc_c3', 'State the diffraction grating equation. [HL]', 'nλ = d sin θ, where d is the slit spacing, θ is the diffraction angle, and n is the order. Gratings produce sharp, well-separated maxima, useful for measuring wavelengths.', 'nλ = d sin θ', 5),
('phys_fc_c3', 'How does single-slit diffraction affect double-slit patterns? [HL]', 'The single-slit diffraction envelope modulates the double-slit interference pattern. The intensity of the interference fringes varies according to the single-slit intensity profile.', NULL, 6);

-- ============================================================
-- FLASHCARDS — C.4 Standing Waves & Resonance (5 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_c4', 'How are standing waves formed?', 'By the superposition of two identical waves travelling in opposite directions (same frequency, wavelength and amplitude). Energy is stored, not transmitted.', NULL, 1),
('phys_fc_c4', 'What are nodes and antinodes?', 'Nodes: points of zero displacement (destructive interference). Antinodes: points of maximum displacement (constructive interference). Distance between adjacent nodes = λ/2.', NULL, 2),
('phys_fc_c4', 'What is resonance?', 'Resonance occurs when the driving frequency matches the natural frequency of a system, causing maximum energy transfer and maximum amplitude of oscillation.', NULL, 3),
('phys_fc_c4', 'How does damping affect resonance?', 'Damping reduces the maximum amplitude at resonance and slightly lowers the resonant frequency. Light damping: sharp resonance peak. Heavy damping: broad, low peak. Critical damping: fastest return to equilibrium without oscillation.', NULL, 4),
('phys_fc_c4', 'What are the harmonics for a string fixed at both ends?', 'Fundamental (1st harmonic): L = λ/2 (1 antinode). 2nd harmonic: L = λ (2 antinodes). nth harmonic: L = nλ/2. Both ends are nodes.', 'L = nλ/2', 5);

-- ============================================================
-- FLASHCARDS — C.5 Doppler Effect (4 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_c5', 'What is the Doppler effect?', 'The change in observed frequency (or wavelength) when there is relative motion between a wave source and an observer. Approaching: higher frequency (blueshift). Receding: lower frequency (redshift).', NULL, 1),
('phys_fc_c5', 'State the approximate Doppler equation for light.', 'Δf/f = Δλ/λ ≈ v/c. Valid when v ≪ c. Used for redshift/blueshift of spectral lines from stars.', 'Δf/f ≈ v/c', 2),
('phys_fc_c5', 'How do spectral line shifts indicate stellar motion?', 'Absorption lines from a star are shifted compared to lab spectra. Redshift (lines shifted to longer λ) means the star is moving away. Blueshift means approaching. The shift gives the radial velocity.', NULL, 3),
('phys_fc_c5', 'State the Doppler formula for a moving source. [HL]', 'f'' = f × v/(v ± us). Use minus when source approaches (higher f''), plus when receding (lower f''). v is wave speed, us is source speed.', 'f'' = fv/(v ± us)', 4);

-- ============================================================
-- FLASHCARDS — D.1 Gravitational Fields (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_d1', 'State Kepler''s three laws.', '1) Orbits are ellipses with the central body at one focus. 2) A line from planet to star sweeps equal areas in equal times. 3) T² ∝ r³ (period squared is proportional to semi-major axis cubed).', 'T² ∝ r³', 1),
('phys_fc_d1', 'State Newton''s law of gravitation.', 'F = Gm₁m₂/r². Every point mass attracts every other with a force proportional to the product of their masses and inversely proportional to the square of separation.', 'F = Gm₁m₂/r²', 2),
('phys_fc_d1', 'What is gravitational potential? [HL]', 'Vg = –GM/r. The work done per unit mass to bring a test mass from infinity to that point. Always negative (bound system). At infinity, Vg = 0.', 'Vg = –GM/r', 3),
('phys_fc_d1', 'Derive escape speed. [HL]', 'Set KE = |GPE|: ½mv² = GMm/r. Solving: vesc = √(2GM/r). The minimum speed needed to escape to infinity (KE = 0 at infinity).', 'vesc = √(2GM/r)', 4),
('phys_fc_d1', 'What is the relationship between field lines and equipotential surfaces? [HL]', 'Field lines are always perpendicular to equipotential surfaces. Field lines point from high to low potential. Closer equipotentials mean stronger field.', NULL, 5),
('phys_fc_d1', 'What happens when atmospheric drag acts on an orbiting body? [HL]', 'The body spirals inward to a lower orbit. Paradoxically it speeds up (orbital speed increases as r decreases) while losing total energy. KE increases but GPE decreases more.', NULL, 6);

-- ============================================================
-- FLASHCARDS — D.2 Electromagnetic Fields (5 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_d2', 'State Coulomb''s law.', 'F = kq₁q₂/r², where k = 1/(4πε₀) ≈ 8.99 × 10⁹ N m² C⁻². Like charges repel, unlike charges attract. Force is along the line joining the charges.', 'F = kq₁q₂/r²', 1),
('phys_fc_d2', 'What did Millikan''s experiment show?', 'Electric charge is quantised: it always comes in integer multiples of the elementary charge e ≈ 1.6 × 10⁻¹⁹ C. Millikan measured charges on oil droplets suspended in an electric field.', NULL, 2),
('phys_fc_d2', 'What is the electric field between parallel plates?', 'E = V/d (uniform field). Field lines are straight, parallel and equally spaced, pointing from positive to negative plate. The field is constant everywhere between the plates.', 'E = V/d', 3),
('phys_fc_d2', 'What is electric potential? [HL]', 'Ve = kQ/r. Work done per unit positive charge to bring a test charge from infinity to that point. Scalar quantity. Positive charges create positive potential; negative charges create negative potential.', 'Ve = kQ/r', 4),
('phys_fc_d2', 'Compare gravitational and electric fields.', 'Both follow inverse-square laws. Gravitational: always attractive, field source is mass. Electric: attractive or repulsive, field source is charge. Both have potential, PE, field strength, equipotentials and field lines with analogous relationships.', NULL, 5);

-- ============================================================
-- FLASHCARDS — D.3 Electromagnetic Motion (4 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_d3', 'What force acts on a charge moving in a magnetic field?', 'F = qvB sin θ. Direction given by the right-hand rule (or left-hand for negative charges). Force is perpendicular to both v and B, so it changes direction but not speed. If θ = 0, F = 0.', 'F = qvB sin θ', 1),
('phys_fc_d3', 'What force acts on a current-carrying wire in a magnetic field?', 'F = BIL sin θ. Direction given by Fleming''s left-hand rule. Maximum force when wire is perpendicular to field (θ = 90°), zero when parallel.', 'F = BIL sin θ', 2),
('phys_fc_d3', 'Why does a charge move in a circle in a uniform B field?', 'The magnetic force is always perpendicular to velocity, providing centripetal force. qvB = mv²/r, so r = mv/(qB). Speed is constant; only direction changes.', 'r = mv/(qB)', 3),
('phys_fc_d3', 'What is the force between two parallel current-carrying wires?', 'F/L = μ₀I₁I₂/(2πr). Currents in the same direction attract; opposite directions repel. This is the basis of the SI definition of the ampere.', 'F/L = μ₀I₁I₂/(2πr)', 4);

-- ============================================================
-- FLASHCARDS — D.4 Induction [HL] (4 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_d4', 'State Faraday''s law of electromagnetic induction. [HL]', 'ε = –N(ΔΦ/Δt). The induced emf equals the negative rate of change of magnetic flux linkage. Greater rate of flux change = larger emf.', 'ε = –N(ΔΦ/Δt)', 1),
('phys_fc_d4', 'State Lenz''s law. [HL]', 'The direction of the induced emf (and hence current) is such that it opposes the change in flux that produces it. This is a consequence of conservation of energy (the minus sign in Faraday''s law).', NULL, 2),
('phys_fc_d4', 'What is magnetic flux? [HL]', 'Φ = BA cos θ, where B is the magnetic field strength, A is the area of the surface, and θ is the angle between B and the normal to the surface. Unit: weber (Wb).', 'Φ = BA cos θ', 3),
('phys_fc_d4', 'How does a rotating coil generate AC? [HL]', 'As the coil rotates in a uniform B field, the flux through it changes sinusoidally. By Faraday''s law, this induces a sinusoidal emf. Doubling the rotation frequency doubles both the peak emf and the frequency.', NULL, 4);

-- ============================================================
-- FLASHCARDS — E.1 Atomic Structure (5 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_e1', 'What did the Geiger–Marsden experiment show?', 'Most alpha particles passed straight through gold foil (atom is mostly empty space). A few deflected at large angles, and very few bounced back (small, dense, positively charged nucleus).', NULL, 1),
('phys_fc_e1', 'How do emission spectra provide evidence for energy levels?', 'Atoms emit photons of specific frequencies only. Each photon corresponds to a transition between two discrete energy levels: E = hf = E₂ – E₁. Discrete lines mean discrete levels.', 'E = hf', 2),
('phys_fc_e1', 'State the Bohr model energy level equation. [HL]', 'En = –13.6/n² eV (for hydrogen). n = 1 is the ground state. As n → ∞, E → 0 (ionisation). Angular momentum is quantised: mvr = nh/(2π).', 'En = –13.6/n² eV', 3),
('phys_fc_e1', 'What is the nuclear radius formula? [HL]', 'R = R₀ A^(1/3), where R₀ ≈ 1.2 × 10⁻¹⁵ m. Since volume ∝ A, this implies nuclear density is approximately constant (~10¹⁷ kg m⁻³) regardless of nucleus size.', 'R = R₀ A^(1/3)', 4),
('phys_fc_e1', 'Why do high-energy scattering experiments deviate from Rutherford predictions? [HL]', 'At very high energies, particles probe the nuclear interior. The strong nuclear force (short-range, attractive) and the finite nuclear size cause deviations from the pure Coulomb (1/r²) scattering pattern.', NULL, 5);

-- ============================================================
-- FLASHCARDS — E.2 Quantum Physics [HL] (5 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_e2', 'Describe the photoelectric effect. [HL]', 'Light shining on a metal surface ejects electrons, but only if f ≥ f₀ (threshold frequency). Increasing intensity increases the number of photoelectrons but not their maximum KE. Only frequency affects max KE.', NULL, 1),
('phys_fc_e2', 'State Einstein''s photoelectric equation. [HL]', 'Emax = hf – Φ, where hf is the photon energy, Φ is the work function (minimum energy to release an electron), and Emax is the maximum KE of emitted photoelectrons.', 'Emax = hf – Φ', 2),
('phys_fc_e2', 'What is the de Broglie wavelength? [HL]', 'λ = h/p = h/(mv). All matter has wave-like properties. The wavelength is significant only for very small masses (electrons, neutrons). Faster particles have shorter wavelengths.', 'λ = h/p', 3),
('phys_fc_e2', 'What does Compton scattering demonstrate? [HL]', 'Photons scatter off electrons like particles, transferring momentum. The scattered photon has a longer wavelength (lower energy). The shift Δλ = (h/mec)(1 – cos θ) confirms the photon''s particle nature.', 'Δλ = (h/mec)(1 – cos θ)', 4),
('phys_fc_e2', 'Explain wave–particle duality. [HL]', 'All entities exhibit both wave and particle properties. Light shows wave behaviour (diffraction, interference) and particle behaviour (photoelectric effect, Compton scattering). Electrons show both too (diffraction patterns + discrete impacts).', NULL, 5);

-- ============================================================
-- FLASHCARDS — E.3 Radioactive Decay (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_e3', 'What is binding energy?', 'The energy required to completely separate all nucleons in a nucleus. Equivalently, the energy released when nucleons assemble into a nucleus. Related to mass defect by E = Δmc².', 'E = Δmc²', 1),
('phys_fc_e3', 'Describe the binding energy per nucleon curve.', 'Rises steeply for light nuclei, peaks around Fe-56 (~8.8 MeV/nucleon), then slowly decreases. Fusion of light nuclei and fission of heavy nuclei both move toward the peak, releasing energy.', NULL, 2),
('phys_fc_e3', 'Compare α, β and γ radiation.', 'α: He-4 nucleus, +2 charge, most ionising, least penetrating (stopped by paper). β: electron/positron, ±1 charge, moderate ionising/penetrating (stopped by aluminium). γ: EM radiation, no charge, least ionising, most penetrating (reduced by lead).', NULL, 3),
('phys_fc_e3', 'Why does β decay have a continuous energy spectrum? [HL]', 'Energy is shared between the β particle and a neutrino (or antineutrino). The variable energy split gives a continuous spectrum, from zero up to a maximum. This was evidence for the neutrino''s existence.', NULL, 4),
('phys_fc_e3', 'State the radioactive decay law. [HL]', 'N = N₀ e^(–λt), where λ is the decay constant. Activity: A = λN. Half-life: T½ = ln 2 / λ. Decay is random and spontaneous; λ gives the probability of decay per unit time.', 'N = N₀ e^(–λt); T½ = ln 2/λ', 5),
('phys_fc_e3', 'What is mass defect?', 'The difference between the total mass of separated nucleons and the mass of the assembled nucleus. Δm = Zmp + Nmn – Mnucleus. This missing mass has been converted to binding energy (E = Δmc²).', 'Δm = Zmp + Nmn – M', 6);

-- ============================================================
-- FLASHCARDS — E.4 Fission (4 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_e4', 'What is nuclear fission?', 'A heavy nucleus (e.g. U-235) splits into two lighter daughter nuclei, releasing energy (because products have higher binding energy per nucleon), neutrons, and gamma radiation.', NULL, 1),
('phys_fc_e4', 'How does a chain reaction work?', 'Each fission releases 2–3 neutrons. These can cause further fissions in nearby fuel nuclei. Controlled chain reaction: exactly 1 neutron per fission causes another fission (criticality). Uncontrolled: exponential growth.', NULL, 2),
('phys_fc_e4', 'What are the key components of a nuclear reactor?', 'Fuel rods (U-235/Pu-239), moderator (slows neutrons – water/graphite), control rods (absorb neutrons – boron/cadmium), heat exchanger (transfers thermal energy to turbine), shielding (concrete/lead – absorbs radiation).', NULL, 3),
('phys_fc_e4', 'Why must fission products be managed carefully?', 'Fission products are highly radioactive with varying half-lives. Short-lived isotopes produce intense radiation. Long-lived ones require secure storage for thousands of years. Products include radioactive gases, liquids and solids.', NULL, 4);

-- ============================================================
-- FLASHCARDS — E.5 Fusion & Stars (6 cards)
-- ============================================================

INSERT INTO physics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
('phys_fc_e5', 'What maintains the equilibrium of a star?', 'Hydrostatic equilibrium: the outward radiation pressure (and gas pressure from fusion) balances the inward gravitational force. If fusion stops, gravity wins and the core collapses.', NULL, 1),
('phys_fc_e5', 'What conditions are needed for fusion?', 'Extremely high temperature (~10⁷ K) to give nuclei enough KE to overcome electrostatic repulsion, and high density to increase the probability of collisions. Both conditions exist in stellar cores.', NULL, 2),
('phys_fc_e5', 'Describe the main regions of the HR diagram.', 'Main sequence: diagonal band (H fusion, most stars). Red giants/supergiants: upper right (large, cool, luminous). White dwarfs: lower left (small, hot, dim). Stars evolve off the main sequence when core H is exhausted.', NULL, 3),
('phys_fc_e5', 'How does stellar mass affect evolution?', 'More massive stars burn fuel faster, have shorter lifetimes, and end more dramatically. Low mass → red giant → white dwarf. High mass → supergiant → supernova → neutron star or black hole.', NULL, 4),
('phys_fc_e5', 'How is stellar parallax used to measure distance?', 'd (parsec) = 1/p (arc-second). Parallax is the apparent shift of a nearby star against distant background stars as Earth orbits the Sun. Only works for relatively nearby stars (p measurable).', 'd = 1/p', 5),
('phys_fc_e5', 'How can stellar radii be determined?', 'Using L = σAT⁴ = σ4πR²T⁴. If luminosity L (from apparent brightness and distance) and surface temperature T (from Wien''s law or spectral class) are known, R can be calculated.', 'L = σ4πR²T⁴', 6);
