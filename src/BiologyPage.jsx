import { useState, useEffect, createContext, useContext } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  Container, Badge, Text, Group, Paper, Progress,
  Accordion, Checkbox, Collapse,
  Alert, Box, Stack,
} from "@mantine/core";
import { Button, TextArea, Spinner } from "@heroui/react";
import LoginButton from "./LoginButton.jsx";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useAttemptTracker } from "./useAttemptTracker.js";
import { syncToCloud } from "./stateSync.js";

function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  syncToCloud(key, value);
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST DATA
// ─────────────────────────────────────────────────────────────────────────────
const CHECKLIST_SECTIONS = [
  {
    id: "c42-energy-matter",
    title: "C4.2 – Transfers of Energy and Matter",
    color: "#34D399",
    items: [
      "C4.2.1 — Describe ecosystems as open systems where both energy and matter can enter and exit",
      "C4.2.2 — Explain why sunlight is the principal source of energy for most ecosystems",
      "C4.2.7 — Distinguish between photoautotrophs (use light) and chemoautotrophs (use oxidation reactions)",
      "C4.2.6 — Define autotrophs as organisms using external energy to synthesise carbon compounds from inorganic substances",
      "C4.2.8 — Define heterotrophs as organisms obtaining carbon compounds from other organisms",
      "C4.2.3 — Describe the flow of chemical energy through food chains",
      "C4.2.4 — Construct and label food chains and food webs",
      "C4.2.10 — Classify organisms into trophic levels (producers T1, primary consumers T2, secondary T3, tertiary T4)",
      "C4.2.11 — Construct and interpret energy pyramids",
      "C4.2.12 — Explain why energy availability decreases at each trophic level (~90% lost, ~10% transferred)",
      "C4.2.13 — Explain heat loss to the environment in autotrophs and heterotrophs via cell respiration",
      "C4.2.14 — Explain restrictions on the number of trophic levels due to energy losses",
      "C4.2.5 — Describe how decomposers receive energy from carbon compounds in dead organic matter",
      "C4.2.9 — Explain how both autotrophs and heterotrophs release energy via oxidation in cell respiration",
      "C4.2.22 — Explain how all chemical elements required by living organisms are recycled in ecosystems",
      "C4.2.15 — Define primary production as accumulation of carbon compounds in autotroph biomass",
      "C4.2.16 — Define secondary production as accumulation of carbon compounds in heterotroph biomass",
      "C4.2.17 — Construct and label carbon cycle diagrams",
      "C4.2.18 — Distinguish between carbon sinks and carbon sources in ecosystems",
      "C4.2.19 — Explain CO2 release during combustion of biomass, peat, coal, oil, and natural gas",
      "C4.2.20 — Analyse the Keeling Curve in terms of photosynthesis, respiration, and combustion",
      "C4.2.21 — Explain the interdependence of aerobic respiration and photosynthesis (O2 and CO2 cycling)",
    ],
  },
  {
    id: "c13-photosynthesis",
    title: "C1.3 – Photosynthesis",
    color: "#38BDF8",
    items: [
      "C1.3.1 — Explain transformation of light energy to chemical energy in photosynthesis",
      "C1.3.2 — Describe conversion of CO2 to glucose using hydrogen from water splitting",
      "C1.3.3 — Identify O2 as a by-product of photosynthesis in plants, algae, and cyanobacteria",
      "C1.3.4 — Describe chromatography to separate and identify photosynthetic pigments; calculate Rf values",
      "C1.3.5 — Describe absorption of specific wavelengths of light by photosynthetic pigments",
      "C1.3.6 — Compare and contrast absorption spectra and action spectra",
      "C1.3.7 — Describe techniques for investigating limiting factors: CO2, light intensity, temperature",
      "C1.3.8 — Explain how CO2 enrichment experiments (FACE) predict future photosynthesis rates",
      "(AHL) C1.3.9 — Describe photosystems as arrays of pigment molecules that generate and emit excited electrons",
      "(AHL) C1.3.10 — Explain advantages of the structured array of different pigment types in a photosystem",
      "(AHL) C1.3.11 — Describe photolysis of water in PSII and generation of O2",
      "(AHL) C1.3.12 — Explain ATP production by chemiosmosis in thylakoids",
      "(AHL) C1.3.13 — Describe reduction of NADP by Photosystem I",
      "(AHL) C1.3.14 — Describe thylakoids as the site of light-dependent reactions",
      "(AHL) C1.3.15 — Explain carbon fixation by Rubisco (CO2 + RuBP → 2 GP)",
      "(AHL) C1.3.16 — Describe synthesis of triose phosphate using reduced NADP and ATP",
      "(AHL) C1.3.17 — Explain regeneration of RuBP in the Calvin cycle using ATP",
      "(AHL) C1.3.18 — Describe synthesis of carbohydrates, amino acids, and other compounds from Calvin cycle products",
      "(AHL) C1.3.19 — Explain interdependence of light-dependent and light-independent reactions",
      "(AHL) B2.2.5 — Describe adaptations of the chloroplast for photosynthesis (double membrane, thylakoids, stroma, DNA)",
    ],
  },
  {
    id: "c12-respiration",
    title: "C1.2 – Cell Respiration",
    color: "#FB923C",
    items: [
      "C1.2.1 — Describe ATP as the molecule that distributes energy within cells",
      "C1.2.2 — List life processes supplied with energy by ATP (active transport, biosynthesis, movement)",
      "C1.2.3 — Explain energy transfers during interconversions between ATP and ADP",
      "C1.2.4 — Describe cell respiration as a system for producing ATP from carbon compounds",
      "C1.2.5 — Compare aerobic and anaerobic respiration in humans (substrates, products, yield, location)",
      "C1.2.6 — Identify variables affecting the rate of cell respiration",
      "(AHL) C1.2.7 — Explain role of NAD as hydrogen carrier; describe oxidation by removal of hydrogen",
      "(AHL) C1.2.8 — Describe glycolysis: glucose → 2 pyruvate with net yield of 2 ATP and 2 reduced NAD",
      "(AHL) C1.2.9 — Explain conversion of pyruvate to lactate to regenerate NAD in anaerobic respiration",
      "(AHL) C1.2.10 — Describe anaerobic respiration in yeast and its use in brewing and baking",
      "(AHL) C1.2.11 — Describe the link reaction: pyruvate → acetyl-CoA + CO2 + NADH (in matrix)",
      "(AHL) C1.2.12 — Explain the Krebs cycle: oxidation and decarboxylation of acetyl groups, yield of ATP and NADH",
      "(AHL) C1.2.13 — Explain transfer of energy by reduced NAD to the electron transport chain",
      "(AHL) C1.2.14 — Describe generation of proton gradient by electron flow along ETC",
      "(AHL) C1.2.15 — Explain chemiosmosis and ATP synthesis in the mitochondrion",
      "(AHL) C1.2.16 — Explain role of oxygen as terminal electron acceptor in aerobic respiration",
      "(AHL) C1.2.17 — Compare lipids and carbohydrates as respiratory substrates",
      "(AHL) B2.2.4 — Describe adaptations of the mitochondrion for ATP production (cristae, matrix, membranes, DNA)",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARD DATA
// ─────────────────────────────────────────────────────────────────────────────
const FLASHCARD_CATEGORIES = [
  {
    id: "energy-matter",
    label: "C4.2 Energy & Matter",
    color: "#34D399",
    cards: [
      { term: "Open system vs. closed system", def: "An open system allows both energy AND matter to enter and exit. A closed system allows only energy exchange. Ecosystems are open systems." },
      { term: "Energy source for most ecosystems", def: "Sunlight (solar energy) — captured by photoautotrophs via photosynthesis." },
      { term: "Exceptions to sunlight-dependent ecosystems", def: "Hydrothermal vent and cave ecosystems, which rely on chemosynthesis (chemical energy from inorganic oxidation reactions)." },
      { term: "Photoautotroph", def: "An organism that uses light as an external energy source to synthesise organic molecules from inorganic substances (e.g. plants, algae, cyanobacteria)." },
      { term: "Chemoautotroph", def: "An organism that uses energy from chemical oxidation reactions (not light) to synthesise organic compounds from inorganic substances (e.g. sulfur-oxidising bacteria at hydrothermal vents)." },
      { term: "Heterotroph", def: "An organism that obtains carbon compounds by consuming other organisms or organic matter. Cannot synthesise organic molecules from inorganic substances alone." },
      { term: "Decomposer", def: "Organisms that break down dead organic matter, releasing nutrients. Examples: fungi, bacteria (e.g. Streptomyces)." },
      { term: "The 10% rule in energy transfer", def: "Only approximately 10% of energy at one trophic level is passed to the next. Approximately 90% is lost, primarily as heat through cellular respiration." },
      { term: "Why energy is lost between trophic levels", def: "1. Heat released during cellular respiration. 2. Energy in indigestible material (e.g. cellulose) passed as faeces. 3. Energy used in metabolic processes/homeostasis." },
      { term: "Trophic level", def: "A position in a food chain or web. T1 = producers, T2 = primary consumers, T3 = secondary consumers, T4 = tertiary consumers." },
      { term: "Why trophic levels are limited", def: "Energy losses (~90%) at each trophic level mean insufficient energy remains to support organisms at higher levels. Typically no more than 4-5 levels are possible." },
      { term: "Primary production", def: "The accumulation of carbon compounds in biomass by autotrophs. GPP = total energy fixed. NPP = GPP minus energy lost in respiration." },
      { term: "Secondary production", def: "The accumulation of carbon compounds in biomass by heterotrophs after consuming other organisms. Always less than primary production due to energy losses." },
      { term: "Carbon sink", def: "An ecosystem or reservoir that absorbs more carbon than it releases (net uptake of CO2). Examples: tropical forests, peat bogs, oceans." },
      { term: "Carbon source", def: "An ecosystem or process that releases more carbon than it absorbs. Examples: deforestation, combustion of fossil fuels, peat fires." },
      { term: "The Keeling Curve", def: "A continuous, accelerating rise in atmospheric CO2 concentration from ~315 ppm in 1958 to over 420 ppm by 2023, measured at Mauna Loa, Hawaii." },
      { term: "Seasonal fluctuations in the Keeling Curve", def: "CO2 drops in spring/summer (Northern Hemisphere photosynthesis exceeds respiration) and rises in autumn/winter (less photosynthesis, more respiration and decomposition)." },
      { term: "Interdependence of aerobic respiration and photosynthesis", def: "Aerobic respiration depends on O2 produced by photosynthesis. Photosynthesis depends on CO2 produced by respiration. Both processes cycle O2 and CO2 between organisms and the atmosphere." },
    ],
  },
  {
    id: "photosynthesis",
    label: "C1.3 Photosynthesis",
    color: "#38BDF8",
    cards: [
      { term: "Overall equation for photosynthesis", def: "Carbon dioxide + Water → Glucose + Oxygen (using light energy)" },
      { term: "Energy transformation in photosynthesis", def: "Light energy (from sun) is transformed into chemical energy stored in organic molecules (glucose)." },
      { term: "Why O2 is a by-product of photosynthesis", def: "O2 is released from the splitting (photolysis) of water molecules. H2O → 2H+ + 2e- + 1/2 O2. The O2 comes from water, not CO2." },
      { term: "Chromatography in photosynthesis", def: "Used to separate and identify photosynthetic pigments (chlorophyll a, chlorophyll b, carotenoids, xanthophylls) based on their different solubilities/Rf values." },
      { term: "Rf value calculation", def: "Rf = distance travelled by pigment / distance travelled by solvent front. Values range from 0 to 1." },
      { term: "Absorption spectrum", def: "A graph showing which wavelengths of light are absorbed by a photosynthetic pigment. Chlorophyll absorbs mainly blue (~430 nm) and red (~680 nm) light; green is reflected (hence green colour)." },
      { term: "Action spectrum", def: "A graph showing the rate of photosynthesis at different wavelengths of light. It shows which wavelengths are most effective at driving photosynthesis." },
      { term: "Three limiting factors of photosynthesis", def: "1. Light intensity  2. CO2 concentration  3. Temperature" },
      { term: "FACE experiments", def: "Free Air Carbon-dioxide Enrichment experiments — growing plants in outdoor plots with artificially elevated CO2 to predict future rates of photosynthesis and plant growth as atmospheric CO2 rises." },
      { term: "(AHL) Photosystem", def: "An array of pigment molecules (antenna complex + reaction centre) in the thylakoid membrane that absorbs light energy and converts it to excited electrons." },
      { term: "(AHL) Photosystem II (PSII)", def: "Light excites electrons in P680 reaction centre. Photolysis of water replaces these electrons, releasing O2, H+ ions, and electrons. Electrons pass to the electron transport chain." },
      { term: "(AHL) Photosystem I (PSI)", def: "Excited electrons at P700 reaction centre are used to reduce NADP to NADPH (reduced NADP) with the help of electrons from the ETC and H+ ions." },
      { term: "(AHL) ATP synthesis location in photosynthesis", def: "In the thylakoid membrane. Protons (H+) accumulate in the thylakoid lumen (from photolysis and ETC pumping), flow through ATP synthase into the stroma — chemiosmosis." },
      { term: "(AHL) Rubisco", def: "Ribulose bisphosphate carboxylase/oxygenase — the enzyme that catalyses carbon fixation: CO2 + RuBP (5C) → unstable 6C compound → 2 molecules of GP (3C)." },
      { term: "(AHL) Triose phosphate (TP)", def: "A 3-carbon sugar phosphate produced when GP is reduced using ATP and reduced NADP (NADPH) in the Calvin cycle. It is the building block for glucose and other organic molecules." },
      { term: "(AHL) RuBP regeneration", def: "5 molecules of TP (using ATP) are used to regenerate 3 molecules of RuBP. This requires ATP from the light-dependent reactions." },
      { term: "(AHL) Advantage of multiple pigment types in a photosystem", def: "Different pigments absorb different wavelengths of light, maximising the range of the spectrum that can be harvested. Energy is funnelled to the reaction centre from a large antenna complex." },
    ],
  },
  {
    id: "respiration",
    label: "C1.2 Cell Respiration",
    color: "#FB923C",
    cards: [
      { term: "ATP and the energy currency of cells", def: "Adenosine Triphosphate. It is the molecule that distributes energy within cells. It is soluble, cannot pass through membranes (stays where needed), releases manageable amounts of energy, and is rapidly regenerated from ADP + Pi." },
      { term: "How ATP releases energy", def: "ATP is hydrolysed: ATP + H2O → ADP + Pi + energy. The energy released (from breaking the terminal phosphate bond) is used to drive cellular work." },
      { term: "Four life processes that use ATP", def: "1. Active transport (e.g. Na+/K+ pump)  2. Biosynthesis (e.g. protein synthesis)  3. Muscle contraction  4. Cell division / DNA replication" },
      { term: "Cell respiration", def: "A series of enzyme-controlled reactions that release energy from organic molecules (primarily glucose) and use it to produce ATP." },
      { term: "Aerobic vs. anaerobic respiration: products", def: "Aerobic: CO2 + H2O (+ large ATP yield ~30-32 ATP). Anaerobic (humans): lactate. Anaerobic (yeast): ethanol + CO2." },
      { term: "Aerobic vs. anaerobic respiration: location", def: "Aerobic: cytoplasm (glycolysis) + mitochondria (link reaction, Krebs, ETC). Anaerobic: cytoplasm only." },
      { term: "Why anaerobic respiration yields less ATP", def: "Only glycolysis produces ATP (net 2 ATP). The link reaction, Krebs cycle, and ETC cannot occur without oxygen as terminal electron acceptor. Reduced NAD is not fed into ETC." },
      { term: "(AHL) NAD+ role in respiration", def: "NAD+ (nicotinamide adenine dinucleotide) is a hydrogen carrier. It is reduced to NADH by accepting H atoms during oxidation reactions (glycolysis, link reaction, Krebs cycle), then delivers electrons to the ETC to drive ATP synthesis." },
      { term: "(AHL) Glycolysis", def: "The stepwise breakdown of glucose (6C) to 2 pyruvate (3C) in the cytoplasm. Net yield: 2 ATP (uses 2, produces 4) and 2 NADH per glucose molecule." },
      { term: "(AHL) Why pyruvate is converted to lactate in anaerobic respiration", def: "To regenerate NAD+ from NADH. NAD+ is essential for glycolysis to continue. Without NAD+ regeneration, glycolysis (and all ATP production) would stop under anaerobic conditions." },
      { term: "(AHL) Link reaction", def: "Pyruvate (3C) is decarboxylated (loses CO2) and oxidised; NAD+ is reduced to NADH. The 2C acetyl group combines with coenzyme A to form acetyl-CoA. Occurs in mitochondrial matrix." },
      { term: "(AHL) Products of one Krebs cycle turn", def: "Per acetyl-CoA: 3 NADH, 1 FADH2, 1 ATP (by substrate-level phosphorylation), 2 CO2. Per glucose: these values are doubled." },
      { term: "(AHL) Electron transport chain", def: "A series of protein complexes (I-IV) in the inner mitochondrial membrane. Electrons from NADH and FADH2 are passed along the chain, releasing energy to pump H+ across the membrane, creating a gradient for ATP synthesis." },
      { term: "(AHL) Chemiosmosis", def: "The synthesis of ATP using the energy from H+ ions (protons) flowing down their electrochemical gradient through ATP synthase, from the intermembrane space into the mitochondrial matrix." },
      { term: "(AHL) Role of oxygen in aerobic respiration", def: "Oxygen is the terminal electron acceptor at the end of the ETC. It accepts electrons and H+ ions to form water: O2 + 4H+ + 4e- → 2H2O. Without O2, the ETC stops and ATP synthesis by chemiosmosis ceases." },
      { term: "(AHL) Why lipids yield more ATP per gram than carbohydrates", def: "Lipids have more C-H bonds and fewer oxygen atoms relative to carbon, meaning they are more reduced. More hydrogen atoms mean more electrons available for the ETC, generating more NADH and a higher ATP yield per gram." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MCQ DATA
// ─────────────────────────────────────────────────────────────────────────────
const MCQ_QUESTIONS = [
  // C4.2 – Transfers of Energy and Matter
  { id: "bio_mcq_01", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "Which of the following correctly describes an open system?", options: ["Energy can enter and exit, but matter cannot", "Neither energy nor matter can enter or exit", "Both energy and matter can enter and exit freely", "Only matter can enter or exit"], answer: 2, explanation: "An open system allows both energy AND matter to enter and exit freely — which is why ecosystems are classified as open systems." },
  { id: "bio_mcq_02", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "Sunlight enters an ecosystem. What is the most accurate description of what happens to this energy?", options: ["It is stored permanently in biomass", "It is transformed to chemical energy in autotrophs, then lost as heat through all organisms' respiration", "It is transferred intact up through every trophic level", "It is immediately released as heat"], answer: 1, explanation: "Sunlight is converted to chemical energy by autotrophs during photosynthesis. This energy is then progressively lost as heat through cellular respiration at each trophic level." },
  { id: "bio_mcq_03", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "A food chain contains: Grass → Rabbit → Fox → Eagle. If the grass contains 500,000 kJ of energy, approximately how much is available to the eagle?", options: ["5,000 kJ", "500 kJ", "50 kJ", "50,000 kJ"], answer: 1, explanation: "Applying the 10% rule: Grass (500,000 kJ) → Rabbit (50,000 kJ) → Fox (5,000 kJ) → Eagle (500 kJ)." },
  { id: "bio_mcq_04", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "Which organisms are found at trophic level 1?", options: ["Herbivores", "Decomposers", "Primary consumers", "Producers (autotrophs)"], answer: 3, explanation: "Trophic level 1 (T1) consists of producers — autotrophs that fix energy from sunlight or chemical reactions into organic molecules." },
  { id: "bio_mcq_05", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "Iron-oxidising bacteria in acidic mine drainage are an example of which type of organism?", options: ["Photoautotrophs", "Mixotrophs", "Chemoautotrophs", "Heterotrophs"], answer: 2, explanation: "Chemoautotrophs use energy from chemical oxidation reactions (not light) to synthesise organic compounds. Iron-oxidising bacteria oxidise Fe2+ to Fe3+ for energy." },
  { id: "bio_mcq_06", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "Why are food webs more useful than food chains for studying ecosystems?", options: ["Food webs show decomposers, while food chains do not", "Food webs show multiple feeding relationships and interdependencies among many species", "Food webs always have more trophic levels than food chains", "Food webs only show energy flow, while food chains show matter flow"], answer: 1, explanation: "Food webs show the complex network of feeding relationships between many species, reflecting the reality that most organisms have multiple food sources." },
  { id: "bio_mcq_07", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "The Keeling Curve shows a consistent seasonal fluctuation superimposed on a rising trend. What causes the annual dip in CO2?", options: ["Increased combustion of fossil fuels in summer", "Increased photosynthesis in spring and summer in the Northern Hemisphere exceeds respiration", "Oceans absorb more CO2 in summer", "Decomposers are less active in summer"], answer: 1, explanation: "In spring and summer, Northern Hemisphere vegetation photosynthesises actively, removing more CO2 from the atmosphere than is added by respiration — causing the seasonal dip." },
  { id: "bio_mcq_08", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "A tropical rainforest ecosystem has high photosynthesis rates year-round. How would you classify it?", options: ["A carbon source", "A carbon neutral ecosystem", "A carbon sink", "A closed carbon system"], answer: 2, explanation: "A carbon sink absorbs more carbon than it releases. Tropical rainforests with high year-round photosynthesis rates fix more CO2 than they release through respiration." },
  { id: "bio_mcq_09", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "Which process explains why there is usually a maximum of 4-5 trophic levels in an ecosystem?", options: ["Predators at the top always go extinct", "Insufficient species diversity beyond 4 levels", "Each trophic level loses approximately 90% of energy to heat, leaving too little for further levels", "Decomposers remove all remaining carbon after level 4"], answer: 2, explanation: "With ~90% energy lost at each step, by trophic level 4 or 5, too little energy remains to support a viable population of organisms." },
  { id: "bio_mcq_10", cat: "Transfers of Energy and Matter", difficulty: "SL", q: "Net primary production (NPP) is best defined as:", options: ["The total energy absorbed by producers from sunlight", "Gross primary production minus energy used in producers' own respiration", "The energy transferred from producers to primary consumers", "The total biomass of all autotrophs in an ecosystem"], answer: 1, explanation: "NPP = GPP minus respiration by producers. It represents the carbon available to consumers after the producers have met their own energy needs." },
  // C1.3 – Photosynthesis
  { id: "bio_mcq_11", cat: "Photosynthesis", difficulty: "SL", q: "What is the overall equation for photosynthesis?", options: ["Glucose + O2 → CO2 + H2O + ATP", "CO2 + H2O → Glucose + O2 (using light energy)", "Glucose → Pyruvate + 2 ATP + 2 NADH", "CO2 + O2 → Glucose + H2O"], answer: 1, explanation: "Photosynthesis: CO2 + H2O → Glucose + O2. Light energy drives the conversion of inorganic molecules (CO2 and H2O) into organic glucose, releasing O2 as a by-product." },
  { id: "bio_mcq_12", cat: "Photosynthesis", difficulty: "SL", q: "From which molecule does the O2 released in photosynthesis originate?", options: ["Carbon dioxide (CO2)", "Glucose", "Water (H2O)", "NADPH"], answer: 2, explanation: "O2 is produced from the photolysis (light-splitting) of water molecules in Photosystem II. The oxygen atoms come from H2O, not CO2." },
  { id: "bio_mcq_13", cat: "Photosynthesis", difficulty: "SL", q: "In chromatography of leaf pigments, which pigment would travel the furthest up the chromatography paper?", options: ["Chlorophyll a (most soluble)", "Chlorophyll b (most polar)", "Carotene (least polar, most soluble in solvent)", "Xanthophyll (least soluble)"], answer: 2, explanation: "Carotene is the least polar pigment, making it most soluble in the non-polar organic solvent used in chromatography. It travels furthest up the paper (highest Rf value)." },
  { id: "bio_mcq_14", cat: "Photosynthesis", difficulty: "SL", q: "The action spectrum of photosynthesis most closely matches:", options: ["The absorption spectrum of carotene alone", "The combined absorption spectrum of all photosynthetic pigments", "The emission spectrum of the sun", "The absorption spectrum of water"], answer: 1, explanation: "The action spectrum reflects the photosynthetic activity of all pigments working together, so it matches the combined absorption spectrum of all chloroplast pigments (chlorophylls, carotenoids, xanthophylls)." },
  { id: "bio_mcq_15", cat: "Photosynthesis", difficulty: "SL", q: "A plant is placed in green light only. What would you expect regarding photosynthesis rate?", options: ["Maximum rate, as plants are green", "Very low rate, as chlorophyll reflects green light and absorbs little", "The same rate as in white light", "No effect on rate"], answer: 1, explanation: "Chlorophyll reflects green light rather than absorbing it. Very little green light energy is captured by photosystems, so photosynthesis rate is very low." },
  { id: "bio_mcq_16", cat: "Photosynthesis", difficulty: "AHL", q: "In the light-dependent reactions, what is the direct source of electrons for Photosystem II?", options: ["CO2 from the atmosphere", "Glucose in the stroma", "Water molecules (photolysis)", "NADPH from PSI"], answer: 2, explanation: "In PSII, electrons lost from the P680 reaction centre are replaced by electrons from the photolysis of water: 2H2O → 4H+ + 4e- + O2." },
  { id: "bio_mcq_17", cat: "Photosynthesis", difficulty: "AHL", q: "Where does ATP synthesis by chemiosmosis occur during photosynthesis?", options: ["In the stroma of the chloroplast", "In the outer membrane of the chloroplast", "In the thylakoid membrane (via ATP synthase)", "In the cytoplasm outside the chloroplast"], answer: 2, explanation: "ATP synthase is embedded in the thylakoid membrane. H+ ions accumulated in the thylakoid lumen flow through ATP synthase into the stroma, driving ATP synthesis." },
  { id: "bio_mcq_18", cat: "Photosynthesis", difficulty: "AHL", q: "What are the immediate products of carbon fixation by Rubisco?", options: ["Triose phosphate (TP) and RuBP", "Two molecules of glycerate-3-phosphate (GP)", "One molecule of glucose-6-phosphate", "Acetyl-CoA and CO2"], answer: 1, explanation: "Rubisco catalyses: CO2 + RuBP (5C) → unstable 6C compound → 2 molecules of GP (glycerate-3-phosphate, 3C each)." },
  { id: "bio_mcq_19", cat: "Photosynthesis", difficulty: "AHL", q: "Which molecules produced in the light-dependent reactions are required by the Calvin cycle?", options: ["O2 and CO2", "ATP and NADPH (reduced NADP)", "Glucose and RuBP", "Electrons and protons only"], answer: 1, explanation: "The Calvin cycle (light-independent reactions) requires ATP and NADPH, both produced only in the light-dependent reactions. Without light, these molecules are depleted and the cycle stops." },
  { id: "bio_mcq_20", cat: "Photosynthesis", difficulty: "AHL", q: "The advantage of having multiple types of pigments (e.g. carotenoids, chlorophylls) in a photosystem is:", options: ["They can all fix CO2 independently", "They absorb a broader range of wavelengths, increasing the efficiency of light energy capture", "They prevent photobleaching by absorbing excess UV radiation", "They provide structural support to the thylakoid membrane"], answer: 1, explanation: "Different pigments have different absorption peaks. Together, they capture a wider range of wavelengths, funnelling energy to the reaction centre and maximising photosynthetic efficiency." },
  // C1.2 – Cell Respiration
  { id: "bio_mcq_21", cat: "Cell Respiration", difficulty: "SL", q: "Which of the following best describes the role of ATP in cells?", options: ["It stores energy long-term in muscle tissue", "It distributes energy within cells, coupling energy-releasing to energy-consuming reactions", "It carries genetic information for protein synthesis", "It transports oxygen to mitochondria"], answer: 1, explanation: "ATP is the universal energy currency — it couples exergonic (energy-releasing) reactions to endergonic (energy-consuming) reactions throughout the cell." },
  { id: "bio_mcq_22", cat: "Cell Respiration", difficulty: "SL", q: "When ATP is hydrolysed to ADP and Pi, what happens?", options: ["Energy is absorbed from the surroundings", "The phosphate bond reforms immediately", "Energy is released and available for cellular work", "CO2 is produced"], answer: 2, explanation: "Hydrolysis of the terminal phosphate bond of ATP releases energy (approximately 30.5 kJ/mol), which is immediately available to drive endergonic cellular reactions." },
  { id: "bio_mcq_23", cat: "Cell Respiration", difficulty: "SL", q: "Which of the following is produced during anaerobic respiration in human muscle cells?", options: ["Ethanol and CO2", "Lactate (lactic acid)", "Acetyl-CoA", "Citric acid"], answer: 1, explanation: "In humans under anaerobic conditions, pyruvate is reduced to lactate (not ethanol). This regenerates NAD+ so glycolysis can continue." },
  { id: "bio_mcq_24", cat: "Cell Respiration", difficulty: "SL", q: "What is the main purpose of converting pyruvate to lactate in anaerobic respiration?", options: ["To produce extra ATP directly", "To store energy for later aerobic use", "To regenerate NAD+ so glycolysis can continue", "To export pyruvate from the cell"], answer: 2, explanation: "Converting pyruvate to lactate oxidises NADH back to NAD+. This NAD+ is needed as an electron acceptor in glycolysis, allowing ATP production to continue without oxygen." },
  { id: "bio_mcq_25", cat: "Cell Respiration", difficulty: "SL", q: "Where does glycolysis take place in the cell?", options: ["Mitochondrial matrix", "Thylakoid membrane", "Cytoplasm", "Nucleus"], answer: 2, explanation: "Glycolysis occurs in the cytoplasm (cytosol) of cells. It is the only stage of respiration that occurs outside the mitochondrion, making it available in both aerobic and anaerobic conditions." },
  { id: "bio_mcq_26", cat: "Cell Respiration", difficulty: "AHL", q: "During the link reaction, pyruvate is converted to acetyl-CoA. Which processes occur?", options: ["Phosphorylation and polymerisation", "Oxidation and decarboxylation", "Reduction and carboxylation", "Hydrolysis and phosphorylation"], answer: 1, explanation: "In the link reaction, pyruvate undergoes decarboxylation (removal of CO2) and oxidation (NAD+ reduced to NADH). The remaining 2C acetyl group binds coenzyme A to form acetyl-CoA." },
  { id: "bio_mcq_27", cat: "Cell Respiration", difficulty: "AHL", q: "Per molecule of glucose, how many NADH molecules are produced during glycolysis?", options: ["4 NADH", "1 NADH", "2 NADH", "6 NADH"], answer: 2, explanation: "Glycolysis converts glucose to 2 pyruvate, reducing 2 NAD+ to 2 NADH in the process (one for each 3C intermediate oxidised to pyruvate)." },
  { id: "bio_mcq_28", cat: "Cell Respiration", difficulty: "AHL", q: "What is the role of oxygen in the electron transport chain?", options: ["It activates the ATP synthase enzyme", "It acts as the terminal electron acceptor, combining with H+ and electrons to form water", "It pumps protons across the inner mitochondrial membrane", "It directly phosphorylates ADP to form ATP"], answer: 1, explanation: "At complex IV of the ETC, O2 accepts electrons and H+ ions to form water (O2 + 4H+ + 4e- → 2H2O). Without this final electron acceptor, the ETC stops." },
  { id: "bio_mcq_29", cat: "Cell Respiration", difficulty: "AHL", q: "Chemiosmosis in the mitochondrion refers to:", options: ["The diffusion of CO2 from the matrix to the cytoplasm", "The active pumping of H+ ions into the matrix", "ATP synthesis as H+ ions flow through ATP synthase down their electrochemical gradient", "The transfer of electrons from NADH to oxygen"], answer: 2, explanation: "Chemiosmosis specifically refers to ATP synthesis driven by the flow of H+ ions through ATP synthase, down their electrochemical gradient from the intermembrane space to the matrix." },
  { id: "bio_mcq_30", cat: "Cell Respiration", difficulty: "AHL", q: "Which best explains why fats yield more ATP per gram than carbohydrates?", options: ["Fats have higher molecular mass than carbohydrates", "Fats contain more carbon-hydrogen bonds and fewer oxygen atoms, so more electrons are available for the ETC", "Fats bypass glycolysis and enter the Krebs cycle directly as glucose", "Fats are broken down in the cytoplasm, saving energy"], answer: 1, explanation: "Fats are more reduced molecules with a higher proportion of C-H bonds. When oxidised, they yield more NADH and FADH2 per gram, producing more ATP via the ETC." },
];

// ─────────────────────────────────────────────────────────────────────────────
// WRITTEN QUESTIONS DATA
// ─────────────────────────────────────────────────────────────────────────────
const WRITTEN_QUESTIONS = [
  { id: "bio_wr_01", cat: "Transfers of Energy and Matter", difficulty: "SL", marks: 2, q: "Distinguish between a carbon source and a carbon sink. Give one example of each.", modelAnswer: "Carbon source: an ecosystem/process that releases more CO2 than it absorbs (net release of carbon into atmosphere). Example: combustion/burning fossil fuels, deforestation, or peat drainage. [1]\nCarbon sink: an ecosystem/reservoir that absorbs more CO2 than it releases (net removal of carbon from atmosphere). Example: tropical rainforest, peat bog, or ocean. [1]" },
  { id: "bio_wr_02", cat: "Transfers of Energy and Matter", difficulty: "SL", marks: 3, q: "Explain why food chains rarely have more than four or five trophic levels.", modelAnswer: "Approximately 90% of energy is lost at each trophic level (accept: only ~10% is transferred to the next level). [1]\nEnergy is lost primarily as heat through cellular respiration / used in metabolic processes / lost in indigestible material (faeces). [1]\nBy trophic level 4 or 5, so little energy remains that it is insufficient to support a viable population of organisms. [1]" },
  { id: "bio_wr_03", cat: "Transfers of Energy and Matter", difficulty: "SL", marks: 4, q: "Describe the role of decomposers in the carbon cycle and explain why they are essential for ecosystem function.", modelAnswer: "Decomposers (bacteria and fungi) break down/digest dead organic matter (detritus) from organisms at all trophic levels. [1]\nThey release CO2 back into the atmosphere through their own cellular respiration. [1]\nThey mineralise organic carbon compounds, returning inorganic minerals/nutrients to the soil/water. [1]\nWithout decomposers, nutrients would remain locked in dead organic matter and be unavailable to producers; carbon would not be recycled; ecosystems would cease to function. [1]" },
  { id: "bio_wr_04", cat: "Transfers of Energy and Matter", difficulty: "SL", marks: 3, q: "Compare primary production and secondary production in terms of the organisms involved and the energy available.", modelAnswer: "Primary production: accumulation of carbon compounds in biomass by autotrophs (producers) through photosynthesis or chemosynthesis. [1]\nSecondary production: accumulation of carbon compounds in biomass by heterotrophs (consumers) after consuming other organisms. [1]\nSecondary production is always lower than primary production because energy is lost in faeces / heat through respiration / metabolic processes in the organisms consumed. [1]" },
  { id: "bio_wr_05", cat: "Transfers of Energy and Matter", difficulty: "SL", marks: 3, q: "Explain the difference between photoautotrophs and chemoautotrophs, using a named example of each.", modelAnswer: "Photoautotrophs use light as their external energy source to synthesise organic molecules from inorganic substances (CO2 and H2O) via photosynthesis; example: plants / algae / cyanobacteria. [1]\nChemoautotrophs use energy from oxidation reactions of inorganic compounds (not light) to synthesise organic molecules. [1]\nExample: iron-oxidising bacteria (e.g. Acidithiobacillus ferrooxidans) in acidic mine drainage / sulfur-oxidising bacteria at hydrothermal vents. [1]" },
  { id: "bio_wr_06", cat: "Transfers of Energy and Matter", difficulty: "SL", marks: 4, q: "Describe how carbon is cycled between the atmosphere and living organisms in an ecosystem.", modelAnswer: "CO2 is absorbed from the atmosphere by autotrophs during photosynthesis / chemosynthesis, incorporated into organic molecules. [1]\nCarbon passes to heterotrophs through feeding/consumption along food chains. [1]\nCarbon is returned to the atmosphere as CO2 through cellular respiration by all organisms (autotrophs and heterotrophs). [1]\nCarbon in dead organisms is released by decomposers (bacteria/fungi) through decomposition and respiration. [1]" },
  { id: "bio_wr_07", cat: "Transfers of Energy and Matter", difficulty: "SL", marks: 3, q: "Analyse the Keeling Curve. Describe the overall trend and explain the regular seasonal fluctuation observed each year. [Data-Based]", modelAnswer: "Overall trend: atmospheric CO2 has increased steadily/accelerated from approximately 315 ppm in 1958 to over 420 ppm by 2023; due to increased combustion of fossil fuels / deforestation. [1]\nSeasonal fluctuation (dip): CO2 decreases in spring/summer — increased photosynthesis in Northern Hemisphere (more land mass) removes more CO2 than respiration releases. [1]\nCO2 increases in autumn/winter — decreased photosynthesis, increased decomposition / respiration adds CO2 to atmosphere. [1]" },
  { id: "bio_wr_08", cat: "Transfers of Energy and Matter", difficulty: "SL", marks: 2, q: "Using the 10% rule, calculate the energy available to tertiary consumers if producers fix 10,000,000 kJ. Show your working. [Calculation]", modelAnswer: "Producers: 10,000,000 kJ → Primary consumers (T2): 10% x 10,000,000 = 1,000,000 kJ. [1 for correct working]\nSecondary consumers (T3): 10% x 1,000,000 = 100,000 kJ → Tertiary consumers (T4): 10% x 100,000 = 10,000 kJ; answer: 10,000 kJ. [1 for correct final answer]" },
  { id: "bio_wr_09", cat: "Photosynthesis", difficulty: "SL", marks: 3, q: "Explain why light intensity, CO2 concentration, and temperature can all act as limiting factors for photosynthesis.", modelAnswer: "Light intensity: light energy is needed to drive the light-dependent reactions (excite electrons in photosystems, split water, produce ATP and NADPH); insufficient light limits these reactions. [1]\nCO2 concentration: CO2 is the substrate for carbon fixation by Rubisco in the Calvin cycle; low CO2 limits the rate of GP production and therefore TP synthesis. [1]\nTemperature: affects the rate of enzyme-catalysed reactions (Rubisco, Calvin cycle enzymes); too low slows reactions; too high denatures enzymes — an optimum exists. [1]" },
  { id: "bio_wr_10", cat: "Photosynthesis", difficulty: "SL", marks: 2, q: "A student performs chromatography on leaf pigments and measures the following distances: pigment spot = 4.2 cm, solvent front = 7.0 cm. Calculate the Rf value and suggest which pigment this might be. [Calculation]", modelAnswer: "Rf = distance travelled by pigment / distance travelled by solvent = 4.2 / 7.0 = 0.60. [1]\nRf of ~0.60 is consistent with chlorophyll a (typical Rf ~0.59-0.65 depending on solvent); accept chlorophyll b (~0.42-0.52 in some solvents) if justified. [1]" },
  { id: "bio_wr_11", cat: "Photosynthesis", difficulty: "AHL", marks: 4, q: "(AHL) Describe what happens during the light-dependent reactions of photosynthesis, from light absorption to the production of ATP and NADPH.", modelAnswer: "Light is absorbed by antenna pigments in Photosystem II (PSII) and energy is transferred to the P680 reaction centre, exciting electrons. [1]\nPhotolysis of water: 2H2O → 4H+ + 4e- + O2; electrons replace those lost from P680; O2 released as by-product. [1]\nExcited electrons pass along the electron transport chain; energy released pumps H+ into thylakoid lumen, creating proton gradient for ATP synthesis via chemiosmosis. [1]\nLight excites electrons in PSI (P700); reduced NADP (NADPH) is produced at the end of PSI by combining electrons with H+ and NADP+. [1]" },
  { id: "bio_wr_12", cat: "Photosynthesis", difficulty: "AHL", marks: 5, q: "(AHL) Describe the Calvin cycle, including the roles of CO2, RuBP, ATP, and reduced NADP, and explain how it depends on the light-dependent reactions.", modelAnswer: "CO2 is fixed by Rubisco: CO2 combines with RuBP (5C) to form an unstable 6C compound that immediately splits into 2 molecules of glycerate-3-phosphate (GP, 3C). [1]\nGP is phosphorylated and then reduced using ATP and reduced NADP (NADPH) to produce triose phosphate (TP, 3C). [1]\nMost TP (5/6 molecules) is used to regenerate RuBP using ATP; this maintains the cycle. [1]\nSome TP (1/6) is used to synthesise glucose, amino acids, fatty acids, and other organic molecules. [1]\nDependence on light reactions: the Calvin cycle requires ATP and NADPH, both produced only in the light-dependent reactions; without light, ATP and NADPH are not replenished and the cycle stops. [1]" },
  { id: "bio_wr_13", cat: "Photosynthesis", difficulty: "SL", marks: 3, q: "Compare the absorption spectrum and the action spectrum of chlorophyll. Explain any differences between them.", modelAnswer: "Similarity: both show peaks at similar wavelengths — blue/violet (~430-450 nm) and red (~640-680 nm); both show low values in the green (~500-560 nm) region. [1]\nDifference: the action spectrum may show slightly broader peaks and higher values in the green region compared to the chlorophyll absorption spectrum alone. [1]\nThis is because the action spectrum reflects the activity of ALL pigments present (carotenoids, xanthophylls, chlorophyll b also absorb in regions where chlorophyll a absorbs less, contributing to photosynthesis). [1]" },
  { id: "bio_wr_14", cat: "Photosynthesis", difficulty: "AHL", marks: 3, q: "(AHL) Explain how chemiosmosis produces ATP in the thylakoid membrane during photosynthesis.", modelAnswer: "H+ ions (protons) accumulate in the thylakoid lumen: from photolysis of water in PSII and from H+ pumped across the membrane by the ETC. [1]\nThis creates an electrochemical/concentration gradient of H+ across the thylakoid membrane (high concentration in lumen, low in stroma). [1]\nH+ ions flow down their gradient through ATP synthase (from lumen to stroma); energy released drives phosphorylation of ADP + Pi → ATP. [1]" },
  { id: "bio_wr_15", cat: "Cell Respiration", difficulty: "SL", marks: 3, q: "Explain the role of ATP in active transport across cell membranes.", modelAnswer: "Active transport moves substances against their concentration gradient, which requires energy. [1]\nATP is hydrolysed to ADP + Pi; the released energy is used to drive conformational changes in carrier/pump proteins (e.g. Na+/K+ ATPase). [1]\nThis allows ions/molecules to be moved across the membrane against their gradient; the inorganic phosphate released binds to the pump, changing its shape to transport the substance. [1]" },
  { id: "bio_wr_16", cat: "Cell Respiration", difficulty: "SL", marks: 4, q: "Compare aerobic and anaerobic respiration in humans using the following criteria: substrates used, requirement for oxygen, products formed, ATP yield, and location in cell.", modelAnswer: "Substrates: both use glucose; aerobic can also use fatty acids and amino acids; anaerobic limited to glucose. [1]\nOxygen: aerobic requires oxygen (as terminal electron acceptor); anaerobic occurs in absence of oxygen. [1]\nProducts: aerobic → CO2 + H2O; anaerobic (humans) → lactate (no CO2 from anaerobic step itself). [1]\nATP yield: aerobic ~30-32 ATP per glucose; anaerobic net 2 ATP per glucose (glycolysis only). [1]" },
  { id: "bio_wr_17", cat: "Cell Respiration", difficulty: "SL", marks: 2, q: "A flask of yeast in sugar solution was placed on a balance. Over 13 days, the mass decreased from 560 g to 545 g. Calculate the total mass loss and mean daily loss. [Calculation]", modelAnswer: "Total mass loss = 560 - 545 = 15 g. [1]\nMean daily loss = 15 / 13 = 1.15 g per day (accept 1.1-1.2 g/day). [1]" },
  { id: "bio_wr_18", cat: "Cell Respiration", difficulty: "SL", marks: 3, q: "Explain why mass decreases during anaerobic respiration in yeast, and suggest why the rate of mass loss slows after day 6 in an experiment.", modelAnswer: "Mass decreases because CO2 gas is produced during anaerobic respiration in yeast (glucose → ethanol + CO2); gas escapes the flask, reducing mass. [1]\nRate slows after day 6 because glucose/sugar substrate is being depleted, reducing rate of respiration. [1]\nOR: ethanol accumulates to toxic levels, inhibiting yeast enzymes/killing yeast cells. [1]" },
  { id: "bio_wr_19", cat: "Cell Respiration", difficulty: "AHL", marks: 4, q: "(AHL) Describe the process of glycolysis, including the inputs, outputs, and where it occurs.", modelAnswer: "Glycolysis occurs in the cytoplasm of cells. [1]\nGlucose (6C) is phosphorylated using 2 ATP (activation energy) and split into two 3C intermediates. [1]\nThe 3C intermediates are oxidised to 2 pyruvate; 4 ATP are produced (net 2 ATP per glucose). [1]\n2 NAD+ are reduced to 2 NADH (by accepting H atoms during oxidation reactions). [1]" },
  { id: "bio_wr_20", cat: "Cell Respiration", difficulty: "AHL", marks: 3, q: "(AHL) Describe the link reaction and explain its significance in aerobic respiration.", modelAnswer: "Pyruvate (3C) produced in glycolysis moves into the mitochondrial matrix; it is decarboxylated (CO2 removed) and oxidised. [1]\nNAD+ is reduced to NADH; the 2C acetyl group combines with coenzyme A to form acetyl-CoA. [1]\nSignificance: acetyl-CoA enters the Krebs cycle; NADH carries electrons to the ETC for ATP synthesis; CO2 is released as waste; links glycolysis in cytoplasm to aerobic pathways in mitochondria. [1]" },
  { id: "bio_wr_21", cat: "Cell Respiration", difficulty: "AHL", marks: 5, q: "(AHL) Explain how the electron transport chain and chemiosmosis produce ATP in aerobic respiration.", modelAnswer: "NADH (and FADH2) from glycolysis, link reaction, and Krebs cycle deliver electrons to protein complexes (I, II, III, IV) in the inner mitochondrial membrane. [1]\nElectrons pass along the ETC from higher to lower energy levels; energy released is used to pump H+ ions from the matrix into the intermembrane space. [1]\nA high concentration of H+ builds up in the intermembrane space, creating an electrochemical (proton) gradient. [1]\nH+ ions flow back through ATP synthase (down their concentration gradient) from intermembrane space into the matrix; this flow drives phosphorylation of ADP + Pi → ATP (chemiosmosis). [1]\nAt the end of the ETC, O2 accepts electrons and H+ ions to form water (O2 + 4H+ + 4e- → 2H2O); O2 is essential to keep electrons flowing and maintain the proton gradient. [1]" },
  { id: "bio_wr_22", cat: "Cell Respiration", difficulty: "AHL", marks: 3, q: "(AHL) Explain why lipids yield more ATP per gram than carbohydrates when used as respiratory substrates.", modelAnswer: "Lipids (triglycerides) are hydrolysed to glycerol and fatty acids; fatty acids are broken down by beta-oxidation into acetyl-CoA units, which enter the Krebs cycle. [1]\nLipids have a higher proportion of C-H bonds and fewer oxygen atoms than carbohydrates; they are more reduced molecules. [1]\nMore C-H bonds means more hydrogen atoms available to reduce NAD+ and FAD, producing more NADH and FADH2 per gram; these yield more ATP via the ETC than carbohydrates per unit mass. [1]" },
  { id: "bio_wr_23", cat: "Cell Respiration", difficulty: "AHL", marks: 3, q: "(AHL) Describe the roles of NAD+ in cell respiration and explain what happens when oxygen is not available.", modelAnswer: "NAD+ is reduced to NADH during glycolysis, the link reaction, and the Krebs cycle by accepting H atoms (electrons + protons) from oxidation reactions. [1]\nNADH then donates electrons to the ETC; energy from electron flow drives proton pumping and ATP synthesis via chemiosmosis; NAD+ is regenerated. [1]\nWhen O2 is absent: NADH cannot be oxidised back to NAD+ via ETC (no terminal electron acceptor); NAD+ becomes depleted; glycolysis stops unless NAD+ is regenerated by converting pyruvate to lactate (in animals) or ethanol + CO2 (in yeast). [1]" },
  { id: "bio_wr_24", cat: "Cell Respiration", difficulty: "AHL", marks: 4, q: "(AHL) A student claims that all the ATP produced in aerobic respiration comes from the electron transport chain. Evaluate this claim.", modelAnswer: "The claim is partially correct but not entirely accurate.\nGlycolysis produces net 2 ATP per glucose by substrate-level phosphorylation (in cytoplasm); the Krebs cycle produces 1 ATP per acetyl-CoA (2 per glucose) by substrate-level phosphorylation — these do NOT come from the ETC. [1]\nHowever, the vast majority (~26-28 of ~30-32 ATP total per glucose) is produced via the ETC and chemiosmosis using energy from NADH and FADH2. [1]\nThe student's claim is therefore incorrect in absolute terms but correct in recognising the ETC as by far the most productive stage. [1]\nConclusion: Most (not all) ATP comes from the ETC; substrate-level phosphorylation in glycolysis and Krebs cycle contribute a small but non-zero amount. [1]" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
const STATIC_CONTENT = {
  checklistSections: CHECKLIST_SECTIONS,
  flashcardCategories: FLASHCARD_CATEGORIES,
  mcqQuestions: MCQ_QUESTIONS,
  writtenQuestions: WRITTEN_QUESTIONS,
  catColors: {
    "Transfers of Energy and Matter": "#34D399",
    "Photosynthesis": "#38BDF8",
    "Cell Respiration": "#FB923C",
  },
};

const ContentCtx = createContext(STATIC_CONTENT);
const useContent = () => useContext(ContentCtx);

// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST VIEW
// ─────────────────────────────────────────────────────────────────────────────
function ChecklistView() {
  const { checklistSections } = useContent();
  const [checked, setChecked] = useState(() => loadLS("bio_checklist_checked", {}));
  const [openSections, setOpenSections] = useState(() => {
    const collapsed = loadLS("bio_checklist_collapsed", {});
    return checklistSections.filter(s => !collapsed[s.id]).map(s => s.id);
  });
  const toggle = id => setChecked(p => { const next = { ...p, [id]: !p[id] }; saveLS("bio_checklist_checked", next); return next; });
  const handleAccordion = (value) => {
    setOpenSections(value);
    const collapsed = {};
    checklistSections.forEach(s => { if (!value.includes(s.id)) collapsed[s.id] = true; });
    saveLS("bio_checklist_collapsed", collapsed);
  };
  const totalItems = checklistSections.reduce((s, sec) => s + sec.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);
  const progColor = progress < 30 ? "#F87171" : progress < 70 ? "#FBBF24" : "#34D399";

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
      <Paper bg="#12121A" radius="lg" p="xl" mb="xl" style={{ border: "1px solid #252533", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <Group justify="space-between" mb="xs">
          <Text fz="sm" c="#8B8B9E" ff="'JetBrains Mono', monospace">Overall Progress</Text>
          <Text fz={24} fw={800} c={progColor}>{progress}%</Text>
        </Group>
        <Progress value={progress} size="md" radius="xl" color={progColor} animated styles={{ root: { background: "#1E1E2A" } }} />
        <Group justify="space-between" mt="sm">
          <Text fz="xs" c="#55556A">{checkedCount} of {totalItems} topics covered</Text>
          <Badge size="xs" variant="light" color="teal" ff="'JetBrains Mono', monospace">auto-saved</Badge>
        </Group>
      </Paper>

      <Accordion multiple value={openSections} onChange={handleAccordion} variant="separated" radius="md"
        styles={{
          item: { backgroundColor: "#12121A", border: "1px solid #252533", marginBottom: 12 },
          control: { padding: "14px 20px" },
          content: { padding: "4px 20px 16px", borderTop: "1px solid #252533" },
          chevron: { color: "#55556A" },
        }}
      >
        {checklistSections.map(section => {
          const sectionChecked = section.items.filter((_, i) => checked[`${section.id}-${i}`]).length;
          const allDone = sectionChecked === section.items.length;
          return (
            <Accordion.Item value={section.id} key={section.id} style={{ borderLeft: `4px solid ${section.color}` }}>
              <Accordion.Control>
                <Group gap="sm">
                  <Badge variant="light" size="sm" fw={700} ff="'JetBrains Mono', monospace"
                    style={{ backgroundColor: section.color + "22", color: section.color, border: "none" }}>
                    {sectionChecked}/{section.items.length}
                  </Badge>
                  <Text fw={600} fz="sm" c={allDone ? section.color : "#F0EEE8"}>
                    {allDone && "✓ "}{section.title}
                  </Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap={4}>
                  {section.items.map((item, i) => {
                    const key = `${section.id}-${i}`;
                    const isChecked = checked[key];
                    const isAHL = item.startsWith("(AHL)");
                    return (
                      <Checkbox key={key} checked={!!isChecked} onChange={() => toggle(key)} label={item} color={section.color} radius="sm"
                        styles={{
                          root: { padding: "6px 4px", borderRadius: 8, cursor: "pointer", transition: "background 0.15s" },
                          label: { color: isChecked ? "#55556A" : isAHL ? "#FBBF24" : "#C8C4BC", textDecoration: isChecked ? "line-through" : "none", fontSize: 14, lineHeight: 1.5, cursor: "pointer" },
                          input: { cursor: "pointer" },
                        }}
                      />
                    );
                  })}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Text ta="center" mt="lg" c="#55556A" fz="xs">
        Click any item to mark it as revised ·{" "}
        <Text component="span" c="#34D399" style={{ cursor: "pointer" }} onClick={() => { setChecked({}); saveLS("bio_checklist_checked", {}); }}>Reset all</Text>
      </Text>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARD COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function FlashCard({ card, catColor }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flashcard-container" onClick={() => setFlipped(f => !f)}>
      <div className={`flashcard-inner${flipped ? " flipped" : ""}`}>
        <Paper className="flashcard-face" bg="#1A1A24"
          style={{ border: "1px solid #252533", boxShadow: "0 2px 8px rgba(0,0,0,0.3)", alignItems: "center", padding: 24, textAlign: "center" }}>
          <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" tt="uppercase" lts={2} mb="md">TERM</Text>
          <Text fz={20} fw={700} c="#F0EEE8" lh={1.3}>{card.term}</Text>
          <Text fz={11} c="#55556A" mt="lg">tap to reveal</Text>
        </Paper>
        <Paper className="flashcard-face flashcard-back" bg="#1A1A24"
          style={{ border: "1px solid #252533", boxShadow: "0 2px 8px rgba(0,0,0,0.3)", padding: 20, overflowY: "auto" }}>
          <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" tt="uppercase" lts={2} mb="sm">DEFINITION</Text>
          <Text fz={13} c="#C8C4BC" lh={1.65}>{card.def}</Text>
        </Paper>
      </div>
    </div>
  );
}

function FlashcardsView() {
  const { flashcardCategories } = useContent();
  const [activeCat, setActiveCat] = useState(() => loadLS("bio_fc_cat", flashcardCategories[0]?.id));
  const [cardIdx, setCardIdx] = useState(0);
  const currentCat = flashcardCategories.find(c => c.id === activeCat) || flashcardCategories[0];
  if (!currentCat || !currentCat.cards || currentCat.cards.length === 0) return <Text ta="center" c="#55556A" py="xl">Loading flashcards…</Text>;
  const currentCard = currentCat.cards[Math.min(cardIdx, currentCat.cards.length - 1)];

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 0 40px" }}>
      <Group gap={8} mb="lg" style={{ flexWrap: "wrap" }}>
        {flashcardCategories.map(cat => (
          <Button key={cat.id} size="sm" onPress={() => { setActiveCat(cat.id); saveLS("bio_fc_cat", cat.id); setCardIdx(0); }}
            className="rounded-full text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", backgroundColor: activeCat === cat.id ? cat.color : "#1A1A24", color: activeCat === cat.id ? "#fff" : "#8B8B9E", border: `1px solid ${activeCat === cat.id ? cat.color : "#252533"}` }}>
            {cat.label}
          </Button>
        ))}
      </Group>

      <Group justify="space-between" mb="md">
        <Text fz="xs" c="#55556A" ff="'JetBrains Mono', monospace">{cardIdx + 1} / {currentCat.cards.length} — {currentCat.label}</Text>
        <Box style={{ background: "#1A1A24", borderRadius: 99, height: 4, width: 140, overflow: "hidden" }}>
          <div style={{ width: `${((cardIdx + 1) / currentCat.cards.length) * 100}%`, height: "100%", background: currentCat.color, borderRadius: 99, transition: "width 0.3s" }} />
        </Box>
      </Group>

      <FlashCard key={`${activeCat}-${cardIdx}`} card={currentCard} catColor={currentCat.color} />

      <Group grow gap="sm" mt="md">
        <Button variant="ghost" size="md" isDisabled={cardIdx === 0} onPress={() => setCardIdx(i => Math.max(0, i - 1))}
          className="rounded-md bg-[#1A1A24] border border-[#252533] text-[#8B8B9E] disabled:bg-[#12121A] disabled:border-[#1E1E2A]">
          Previous
        </Button>
        <Button size="md" isDisabled={cardIdx === currentCat.cards.length - 1} onPress={() => setCardIdx(i => Math.min(currentCat.cards.length - 1, i + 1))}
          className="rounded-md border-none text-white"
          style={{ background: cardIdx === currentCat.cards.length - 1 ? "#1E1E2A" : currentCat.color }}>
          Next
        </Button>
      </Group>
      <Text ta="center" fz="xs" c="#55556A" mt="md">Tap any card to flip it</Text>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MCQ COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function MCQItem({ q, displayNum }) {
  const { catColors } = useContent();
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const color = catColors[q.cat] || "#34D399";
  const { recordAttempt } = useAttemptTracker(q.id, "mcq", q.cat, "biology", q.difficulty);

  return (
    <Paper bg="#1A1A24" radius="lg" mb="sm" style={{ border: "1px solid #252533", overflow: "hidden", transition: "all 0.2s" }}>
      <div style={{ borderLeft: `4px solid ${color}`, padding: "18px 20px" }}>
        <Group gap={8} mb="sm" style={{ flexWrap: "wrap" }}>
          <Badge size="xs" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color, color: "#fff" }}>MCQ</Badge>
          <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none" }}>{q.cat}</Badge>
          <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" style={{ backgroundColor: "#1E1E2A", color: "#8B8B9E", border: "none" }}>{q.difficulty}</Badge>
        </Group>
        <Text fz={15} c="#F0EEE8" lh={1.6} fw={600}>Q{displayNum}. {q.q}</Text>
      </div>
      <Stack gap={8} p="md" pt="sm">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.answer;
          let bg = "#12121A", border = "#252533", tc = "#C8C4BC";
          if (confirmed) {
            if (isCorrect) { bg = "#34D399" + "22"; border = "#34D399"; tc = "#6EE7B7"; }
            else if (isSelected && !isCorrect) { bg = "#F87171" + "22"; border = "#F87171"; tc = "#FCA5A5"; }
          } else if (isSelected) { bg = color + "22"; border = color; tc = "#F0EEE8"; }
          return (
            <Paper key={i} p="sm" radius="md" onClick={() => { if (!confirmed) setSelected(i); }}
              style={{ background: bg, border: `1.5px solid ${border}`, cursor: confirmed ? "default" : "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { if (!confirmed && !isSelected) e.currentTarget.style.borderColor = color + "66"; }}
              onMouseLeave={e => { if (!confirmed && !isSelected) e.currentTarget.style.borderColor = "#252533"; }}>
              <Group gap="sm" wrap="nowrap">
                <Box style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0, background: confirmed && isCorrect ? "#34D399" : confirmed && isSelected && !isCorrect ? "#F87171" : isSelected ? color : "#252533", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Text fz={11} ff="'JetBrains Mono', monospace" c="#fff" fw={700}>
                    {confirmed && isCorrect ? "✓" : confirmed && isSelected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}
                  </Text>
                </Box>
                <Text fz={14} c={tc} lh={1.4}>{opt}</Text>
              </Group>
            </Paper>
          );
        })}
        {!confirmed ? (
          <Button fullWidth isDisabled={selected === null}
            onPress={() => { if (selected !== null) { setConfirmed(true); recordAttempt({ userAnswer: selected, isCorrect: selected === q.answer }); } }}
            className="rounded-md mt-1 font-semibold border-none"
            style={{ background: selected !== null ? color : "#1E1E2A", color: selected === null ? "#55556A" : "#fff", fontFamily: "'JetBrains Mono', monospace" }}>
            Check Answer
          </Button>
        ) : (
          <Box mt="xs" p="sm" style={{ background: "#0D0D14", borderRadius: 8, borderLeft: `3px solid ${color}` }}>
            <Text fz={11} ff="'JetBrains Mono', monospace" c={color} lts={1} mb={4}>EXPLANATION</Text>
            <Text fz={13} c="#B0ADA6" lh={1.6}>{q.explanation}</Text>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

function PracticeView() {
  const { mcqQuestions, catColors } = useContent();
  const allCats = ["All", ...Array.from(new Set(mcqQuestions.map(q => q.cat)))];
  const [filterCat, setFilterCat] = useState("All");
  const filtered = filterCat === "All" ? mcqQuestions : mcqQuestions.filter(q => q.cat === filterCat);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 0 40px" }}>
      <Group gap={8} mb="lg" style={{ flexWrap: "wrap" }}>
        {allCats.map(cat => {
          const c = catColors[cat] || "#34D399";
          const active = filterCat === cat;
          return (
            <Button key={cat} size="sm" className="rounded-full" onPress={() => setFilterCat(cat)}
              style={{ backgroundColor: active ? c : "#1A1A24", color: active ? "#fff" : "#8B8B9E", border: `1px solid ${active ? c : "#252533"}`, boxShadow: "none", fontFamily: "'JetBrains Mono', monospace" }}>
              {cat}
            </Button>
          );
        })}
      </Group>

      <Text fz="xs" c="#55556A" ff="'JetBrains Mono', monospace" mb="lg">
        Showing {filtered.length} question{filtered.length !== 1 ? "s" : ""}{filterCat !== "All" ? ` · ${filterCat}` : ""}
      </Text>

      {filtered.length === 0 && <Text ta="center" py={40} c="#55556A" fz="sm">No questions match this filter.</Text>}
      {filtered.map((q, i) => <MCQItem key={q.id} q={q} displayNum={i + 1} />)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITTEN PRACTICE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function WrittenPracticeItem({ q, displayNum }) {
  const { catColors } = useContent();
  const [answer, setAnswer] = useState(() => loadLS(`bio_written_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`bio_written_grade_${q.id}`, null));
  const color = catColors[q.cat] || "#34D399";
  const { recordAttempt } = useAttemptTracker(q.id, "written", q.cat, "biology", q.difficulty);

  useEffect(() => { saveLS(`bio_written_ans_${q.id}`, answer); }, [answer, q.id]);
  useEffect(() => { saveLS(`bio_written_grade_${q.id}`, gradeResult); }, [gradeResult, q.id]);

  const handleSolve = async () => {
    if (!answer.trim()) return;
    setGrading(true);
    setGradeResult(null);
    try {
      const res = await fetch("https://ib-grading-hollen.c9tggsfst9.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.q, studentAnswer: answer, expectedAnswer: q.modelAnswer, marks: q.marks }),
      });
      const data = await res.json();
      if (data.error) {
        setGradeResult({ score: null, feedback: data.details || data.error });
      } else {
        setGradeResult({ score: data.score, maxMarks: data.maxMarks || q.marks, feedback: data.feedback });
        recordAttempt({ userAnswer: answer, score: data.score, maxMarks: data.maxMarks || q.marks });
      }
    } catch {
      setGradeResult({ score: null, feedback: "Could not connect to grading server. Please try again later." });
    } finally {
      setGrading(false);
    }
  };

  const scorePct = gradeResult?.score != null ? gradeResult.score / (gradeResult.maxMarks || q.marks) : 0;
  const scoreColor = gradeResult?.score != null ? scorePct >= 0.75 ? "#34D399" : scorePct >= 0.4 ? "#FBBF24" : "#F87171" : "#8B8B9E";

  return (
    <Paper bg="#1A1A24" radius="lg" mb="md" style={{ border: "1px solid #252533", overflow: "hidden" }}>
      <div style={{ borderLeft: `4px solid ${color}`, padding: "18px 20px" }}>
        <Group gap={8} mb="sm" style={{ flexWrap: "wrap" }}>
          <Badge size="xs" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none" }}>{q.cat}</Badge>
          <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" style={{ backgroundColor: "#1E1E2A", color: "#8B8B9E", border: "none" }}>{q.difficulty}</Badge>
          <Badge size="xs" ff="'JetBrains Mono', monospace" ml="auto" style={{ backgroundColor: "#2A2800", color: "#FBBF24", border: "1px solid #5A4A00" }}>[ {q.marks} marks ]</Badge>
        </Group>
        <Text fz={15} c="#F0EEE8" lh={1.6} fw={600} style={{ whiteSpace: "pre-line" }}>Q{displayNum}. {q.q}</Text>
      </div>

      <div style={{ padding: "12px 20px 16px" }}>
        <TextArea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer here..." rows={5} disabled={grading} fullWidth
          className="rounded-md bg-[#12121A] border border-[#252533] text-[#F0EEE8] text-sm leading-relaxed placeholder:text-[#55556A] p-3 mb-2"
          style={{ fontFamily: "'Inter', sans-serif", resize: "vertical" }} />

        <Group gap="sm">
          <Button size="sm" className="rounded-md border-none font-semibold" onPress={handleSolve} isPending={grading}
            isDisabled={!answer.trim() || grading}
            style={{ background: answer.trim() && !grading ? "#34D399" : "#1E1E2A", fontFamily: "'JetBrains Mono', monospace" }}>
            {({ isPending }) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Grading..." : "Solve"}</>}
          </Button>
          <Button size="sm" variant="ghost" className={revealed ? "rounded-md text-[#8B8B9E]" : "rounded-md"} onPress={() => setRevealed(r => !r)}
            style={revealed ? { fontFamily: "'JetBrains Mono', monospace" } : { backgroundColor: color + "22", color, border: `1px solid ${color}44`, fontFamily: "'JetBrains Mono', monospace" }}>
            {revealed ? "Hide Markscheme" : "Show Markscheme"}
          </Button>
          {answer.trim() && !grading && (
            <Button size="sm" variant="ghost" className="rounded-md text-[#8B8B9E]" style={{ fontFamily: "'JetBrains Mono', monospace" }}
              onPress={() => { setAnswer(""); setGradeResult(null); saveLS(`bio_written_ans_${q.id}`, ""); saveLS(`bio_written_grade_${q.id}`, null); }}>
              Clear
            </Button>
          )}
        </Group>

        {gradeResult && (
          <Alert mt="md" radius="md" variant="light"
            color={gradeResult.score == null ? "gray" : scorePct >= 0.75 ? "green" : scorePct >= 0.4 ? "yellow" : "red"}
            title={gradeResult.score != null ? `AI Score: ${gradeResult.score}/${gradeResult.maxMarks || q.marks}` : "Grading Error"}
            styles={{
              root: { backgroundColor: (gradeResult.score == null ? "#8B8B9E" : scoreColor) + "11", border: `1px solid ${gradeResult.score == null ? "#8B8B9E" : scoreColor}44` },
              title: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12 },
            }}>
            {gradeResult.score != null && (
              <Progress value={scorePct * 100} color={scoreColor} size="sm" radius="xl" mb="sm" animated styles={{ root: { background: "#1E1E2A" } }} />
            )}
            <Text fz="sm" c="#8B8B9E" lh={1.6}>{gradeResult.feedback}</Text>
          </Alert>
        )}

        <Collapse in={revealed}>
          <Box mt="md" pt="md" style={{ borderTop: "1px solid #252533" }}>
            <Text fz={11} ff="'JetBrains Mono', monospace" c="#34D399" lts={1} mb="sm">MARKSCHEME</Text>
            <Text fz={13} c="#B0ADA6" lh={1.7} style={{ whiteSpace: "pre-line" }}>{q.modelAnswer}</Text>
          </Box>
        </Collapse>
      </div>
    </Paper>
  );
}

function WrittenPracticeView() {
  const { writtenQuestions, catColors } = useContent();
  const [filterCat, setFilterCat] = useState("All");
  const writtenCats = ["All", ...Array.from(new Set(writtenQuestions.map(q => q.cat)))];
  const filtered = filterCat === "All" ? writtenQuestions : writtenQuestions.filter(q => q.cat === filterCat);

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
      <Paper bg="#12121A" radius="lg" p="lg" mb="xl" style={{ border: "1px solid #252533" }}>
        <Text fz="sm" c="#F0EEE8" fw={600} mb={4}>Written Practice</Text>
        <Text fz="xs" c="#8B8B9E" lh={1.5}>
          Answer each question in the text box, then use AI grading or reveal the markscheme to compare.
        </Text>
      </Paper>

      <Group gap={8} mb="lg" style={{ flexWrap: "wrap" }}>
        {writtenCats.map(cat => {
          const c = catColors[cat] || "#34D399";
          const active = filterCat === cat;
          return (
            <Button key={cat} size="sm" className="rounded-full" onPress={() => setFilterCat(cat)}
              style={{ backgroundColor: active ? c : "#1A1A24", color: active ? "#fff" : "#8B8B9E", border: `1px solid ${active ? c : "#252533"}`, boxShadow: "none", fontFamily: "'JetBrains Mono', monospace" }}>
              {cat}
            </Button>
          );
        })}
      </Group>

      <Text fz="xs" c="#55556A" ff="'JetBrains Mono', monospace" mb="lg">
        Showing {filtered.length} question{filtered.length !== 1 ? "s" : ""}{filterCat !== "All" ? ` · ${filterCat}` : ""}
      </Text>

      {filtered.length === 0 && <Text ta="center" py={40} c="#55556A" fz="sm">No questions match this filter.</Text>}
      {filtered.map((q, i) => <WrittenPracticeItem key={q.id} q={q} displayNum={i + 1} />)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function BiologyPage({ initialTab = "checklist" }) {
  const [tab] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ContentCtx.Provider value={STATIC_CONTENT}>
      <Box mih="100vh" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-primary)", background: "var(--bg-base)" }}>

        <Sidebar activeSubject="biology" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Sticky header */}
        <Box style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--header-bg)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(128,128,128,0.1)" }}>
          <Container size="lg" py="sm">
            <Group justify="center" mb={4} style={{ position: "relative" }}>
              <Button isIconOnly variant="outline" onPress={() => setSidebarOpen(o => !o)}
                className="rounded-md border-[#252533] text-[#8B8B9E] bg-transparent min-w-[auto] h-8 px-2.5"
                style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
              <Badge variant="light" size="sm" tt="uppercase" fw={700} ff="'JetBrains Mono', monospace"
                style={{ letterSpacing: 2, backgroundColor: "#34D39918", color: "#34D399", border: "none" }}>
                IB Biology SL & HL
              </Badge>
              <LoginButton />
            </Group>
            <Text ta="center" fw={800} fz={{ base: 22, sm: 30 }} c="#F0EEE8" style={{ letterSpacing: -0.5 }}>
              Unit 4: The Energy for Life
            </Text>
            <Text ta="center" fz="xs" c="#55556A" mb="sm">
              C4.2 · C1.3 · C1.2 · {STATIC_CONTENT.mcqQuestions.length} MCQs · {STATIC_CONTENT.writtenQuestions.length} Written Questions
            </Text>

            <Group gap={4} grow>
              {[
                { value: "checklist", label: "Checklist", href: "/biology/checklist" },
                { value: "flashcards", label: "Flashcards", href: "/biology/flashcards" },
                { value: "practice", label: "Multi-Choice", href: "/biology/multi-choice" },
                { value: "written", label: "Written", href: "/biology/written" },
              ].map(t => (
                <a key={t.value} href={t.href} style={{ flex: 1, textDecoration: "none" }}>
                  <Button fullWidth className="rounded-none font-semibold"
                    style={{ fontSize: 13, padding: "10px 4px 12px", backgroundColor: "transparent", color: tab === t.value ? "#F0EEE8" : "#55556A", borderBottom: tab === t.value ? "3px solid #34D399" : "3px solid transparent", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0, transition: "all 0.2s", fontFamily: "'Inter', sans-serif" }}>
                    {t.label}
                  </Button>
                </a>
              ))}
            </Group>
          </Container>
        </Box>

        {/* Content */}
        <Container size="lg" py="xl" px="md">
          {tab === "checklist" && <ChecklistView />}
          {tab === "flashcards" && <FlashcardsView />}
          {tab === "practice" && <PracticeView />}
          {tab === "written" && <WrittenPracticeView />}
        </Container>

        {/* Floating support button */}
        <a href="https://donate.stripe.com/aFa7sN64kbjBdj8ayH4ow01" target="_blank" rel="noopener noreferrer"
          style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999, width: 48, height: 48, borderRadius: "50%", backgroundColor: "#34D399", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(52,211,153,0.4)", border: "none", cursor: "pointer", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
          title="Support us"
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(52,211,153,0.6)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(52,211,153,0.4)"; }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </a>

        <Analytics />
      </Box>
    </ContentCtx.Provider>
  );
}
