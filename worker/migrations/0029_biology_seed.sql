-- Migration: 0029_biology_seed.sql
-- Seed biology fallback questions (Paper 1 & Paper 2)

INSERT OR IGNORE INTO biology_questions
  (id, paper, topic, question_number, question_text, marks, mark_scheme, sort_order, created_at, updated_at)
VALUES
  (
    'bio_p1_1',
    'paper1',
    'Cell Biology',
    1,
    'Explain the fluid mosaic model of membrane structure, including the roles of phospholipids, cholesterol, and integral and peripheral proteins.',
    8,
    'Phospholipids form a bilayer with hydrophilic heads facing outward and hydrophobic tails facing inward. The membrane is described as ''fluid'' because phospholipids can move laterally within each layer. ''Mosaic'' refers to the pattern created by scattered protein molecules. Cholesterol is found between phospholipid tails and regulates membrane fluidity — it restricts movement at high temperatures and prevents solidification at low temperatures. Integral (transmembrane) proteins span the entire bilayer and are involved in transport (channels, pumps) and cell signalling. Peripheral proteins are attached to the surface and function in cell signalling, enzymatic activity, and maintaining cell shape. Glycoproteins on the outer surface are involved in cell recognition and immune response.',
    1,
    datetime('now'),
    datetime('now')
  ),
  (
    'bio_p1_2',
    'paper1',
    'Cell Biology',
    2,
    'Compare and contrast the structure of prokaryotic and eukaryotic cells.',
    8,
    'Prokaryotic cells lack a membrane-bound nucleus; DNA is found in a nucleoid region. Eukaryotic cells have a membrane-bound nucleus containing chromosomal DNA. Prokaryotes have 70S ribosomes; eukaryotes have 80S ribosomes (though 70S ribosomes are found in mitochondria and chloroplasts). Prokaryotic cells are generally smaller (1-10 μm) compared to eukaryotic cells (10-100 μm). Prokaryotes lack membrane-bound organelles such as mitochondria, endoplasmic reticulum, and Golgi apparatus. Some prokaryotes have a cell wall made of peptidoglycan; plant eukaryotic cells have cell walls made of cellulose. Both have a plasma membrane, ribosomes, and DNA as genetic material. Prokaryotic DNA is circular and naked; eukaryotic DNA is linear and associated with histone proteins.',
    2,
    datetime('now'),
    datetime('now')
  ),
  (
    'bio_p1_3',
    'paper1',
    'Molecular Biology',
    3,
    'Describe the process of DNA replication, including the roles of helicase, DNA polymerase III, and ligase.',
    8,
    'DNA replication is semi-conservative — each new molecule contains one original and one new strand. Helicase unwinds the double helix by breaking hydrogen bonds between complementary base pairs. Each separated strand acts as a template. DNA polymerase III adds free nucleotides to the 3'' end of the growing strand in the 5'' to 3'' direction, following complementary base pairing rules (A-T, G-C). The leading strand is synthesized continuously. The lagging strand is synthesized in short Okazaki fragments. RNA primase adds short RNA primers to initiate synthesis. DNA polymerase I replaces RNA primers with DNA. DNA ligase seals the gaps (nicks) between Okazaki fragments on the lagging strand, creating a continuous strand.',
    3,
    datetime('now'),
    datetime('now')
  ),
  (
    'bio_p2_1',
    'paper2',
    'Genetics and Evolution',
    1,
    'Explain how natural selection can lead to speciation, using a named example.',
    8,
    'Natural selection acts on phenotypic variation within a population. Individuals with advantageous traits have higher fitness and are more likely to survive and reproduce. Over time, allele frequencies change in the population (evolution). Speciation occurs when populations become reproductively isolated. Geographic isolation (allopatric speciation) separates populations physically. Different selection pressures in different environments lead to divergent evolution. Over time, accumulated genetic differences prevent interbreeding even if populations come back into contact. Example: Darwin''s finches on the Galápagos Islands — ancestral finch species colonised different islands, different food sources led to selection for different beak shapes, reproductive isolation developed over time, resulting in 13+ distinct species.',
    4,
    datetime('now'),
    datetime('now')
  ),
  (
    'bio_p2_2',
    'paper2',
    'Human Physiology',
    2,
    'Explain the process of ventilation in the human lung, including the role of the diaphragm and intercostal muscles.',
    8,
    'Ventilation involves two processes: inspiration (inhalation) and expiration (exhalation). During inspiration: the external intercostal muscles contract, pulling the rib cage upward and outward; the diaphragm contracts and flattens; these actions increase the volume of the thoracic cavity; this decreases air pressure inside the lungs below atmospheric pressure; air flows into the lungs down the pressure gradient. During expiration (at rest): the external intercostal muscles relax, and the rib cage moves downward and inward; the diaphragm relaxes and returns to its dome shape; these actions decrease the volume of the thoracic cavity; this increases air pressure inside the lungs above atmospheric pressure; air is pushed out of the lungs. The internal intercostal muscles contract during forced expiration. The abdominal muscles also assist in forced expiration.',
    5,
    datetime('now'),
    datetime('now')
  );
