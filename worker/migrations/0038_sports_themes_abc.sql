-- Sports Science: Themes A, B, C
-- Checklists, Flashcards, MCQs, Written Questions

-- Checklist Sections
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a11', 'A.1.1 Inter-system Communication', '#B57A7A', 'A', 1);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a12', 'A.1.2 Maintaining Homeostasis', '#B57A7A', 'A', 2);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a13', 'A.1.3 Transport', '#B57A7A', 'A', 3);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a21', 'A.2.1 Water and Electrolyte Balance', '#B57A7A', 'A', 4);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a22', 'A.2.2 Fueling for Health and Performance', '#B57A7A', 'A', 5);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a23', 'A.2.3 Energy Systems', '#B57A7A', 'A', 6);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a31', 'A.3.1 Qualities of Training', '#B57A7A', 'A', 7);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a32', 'A.3.2 Benefits to Health of Being Active', '#B57A7A', 'A', 8);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_a33', 'A.3.3 Fatigue and Recovery', '#B57A7A', 'A', 9);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b11', 'B.1.1 Anatomical Position, Planes, and Movement', '#B57A7A', 'B', 10);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b12', 'B.1.2 Structure and Function of Connective Tissues and Joints', '#B57A7A', 'B', 11);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b13', 'B.1.3 Muscular Function', '#B57A7A', 'B', 12);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b14', 'B.1.4 Levers in Movement and Sport', '#B57A7A', 'B', 13);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b21', 'B.2.1 Newton''s Laws of Motion', '#B57A7A', 'B', 14);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b22', 'B.2.2 Fluid Mechanics', '#B57A7A', 'B', 15);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b23', 'B.2.3 Movement Analysis and Its Applications', '#B57A7A', 'B', 16);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b31', 'B.3.1 Cause of Injury', '#B57A7A', 'B', 17);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_b32', 'B.3.2 Interventions Related to Injury', '#B57A7A', 'B', 18);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c11', 'C.1.1 Personality', '#B57A7A', 'C', 19);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c12', 'C.1.2 Mental Toughness', '#B57A7A', 'C', 20);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c21', 'C.2.1 Motor Learning Processes', '#B57A7A', 'C', 21);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c22', 'C.2.2 Attentional Control', '#B57A7A', 'C', 22);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c31', 'C.3.1 Achievement Motivation', '#B57A7A', 'C', 23);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c32', 'C.3.2 Self-determination', '#B57A7A', 'C', 24);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c33', 'C.3.3 Motivational Climate', '#B57A7A', 'C', 25);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c41', 'C.4.1 Arousal and Anxiety', '#B57A7A', 'C', 26);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c42', 'C.4.2 Coping', '#B57A7A', 'C', 27);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c51', 'C.5.1 Goal Setting', '#B57A7A', 'C', 28);
INSERT INTO sports_checklist_sections (id, title, color, unit, sort_order) VALUES ('sport_chk_c52', 'C.5.2 Imagery', '#B57A7A', 'C', 29);

-- Checklist Items
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Describe the role of the nervous system in rapid, short-term communication', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Describe the role of the endocrine system in slower, longer-lasting communication', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Compare nervous and endocrine signalling (speed, duration, mode, specificity)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Explain the role of the hypothalamus as the link between nervous and endocrine systems', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Describe the function of the autonomic nervous system (sympathetic vs parasympathetic)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Explain how sensory receptors detect stimuli (baroreceptors, chemoreceptors, proprioceptors)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Outline the role of neurotransmitters and hormones (adrenaline/epinephrine, cortisol, insulin)', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Describe the fight-or-flight response and the role of the adrenal medulla', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a11', 'Explain the concept of target cells and receptor specificity for hormones', 9);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'Define homeostasis and explain its importance for optimal body function', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'Explain negative feedback mechanisms with examples (blood glucose regulation, thermoregulation)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'Explain positive feedback mechanisms with examples (oxytocin during childbirth, blood clotting)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'Describe thermoregulation: vasodilation, vasoconstriction, sweating, shivering', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'Explain blood glucose regulation: roles of insulin and glucagon', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'Describe the roles of the pancreas (endocrine: islets of Langerhans) in glucose homeostasis', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'Outline the effects of exercise on homeostatic mechanisms', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'Explain osmoregulation and the role of ADH (antidiuretic hormone)', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a12', 'HL: Describe hormonal regulation of metabolism (thyroid hormones, cortisol)', 9);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Describe the structure and function of the heart (chambers, valves, septum)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Explain the cardiac cycle (systole, diastole) and how blood pressure is generated', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Describe the conduction system of the heart (SA node, AV node, bundle of His, Purkinje fibres)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Explain heart rate regulation via the autonomic nervous system and hormones', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Describe the structure and function of arteries, veins, and capillaries', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Explain the mechanics of ventilation (inspiration and expiration, role of diaphragm and intercostals)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Describe gas exchange at the alveoli and in muscle tissue', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Explain oxygen transport (haemoglobin, oxygen-haemoglobin dissociation curve)', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Explain CO2 transport in the blood (dissolved, bicarbonate ions, carbaminohaemoglobin)', 9);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a13', 'Describe the cardiovascular and ventilatory responses to exercise', 10);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a21', 'Explain the importance of water for physiological functions', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a21', 'Describe the distribution of body water (intracellular vs extracellular fluid)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a21', 'Define dehydration, hypohydration, euhydration, and hyperhydration', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a21', 'Explain the effects of dehydration on exercise performance', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a21', 'Describe the role of electrolytes (sodium, potassium, chloride) in body function', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a21', 'Explain hyponatraemia and its causes during prolonged exercise', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a21', 'Outline effective hydration strategies before, during, and after exercise', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a21', 'Describe sweat composition and factors affecting sweat rate', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'Describe the roles of macronutrients: carbohydrates, fats, and proteins', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'Explain the concept of energy balance (energy intake vs energy expenditure)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'Describe glycogen storage and its importance for exercise', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'Explain carbohydrate loading and its effects on endurance performance', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'Outline the role of the gut microbiome in health and performance', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'Describe micronutrients (vitamins and minerals) and their roles in exercise', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'Explain the glycaemic index (GI) and its relevance to sport nutrition', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'HL: Discuss ergogenic aids (nutritional: caffeine, creatine, sodium bicarbonate)', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a22', 'HL: Discuss ethical considerations of performance-enhancing substances', 9);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'Describe the structure and role of ATP as the energy currency of the cell', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'Explain the three energy systems: ATP-PC (phosphocreatine), anaerobic glycolysis, aerobic', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'Describe the energy continuum and how systems interact during exercise', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'Explain oxygen consumption and the concept of VO2 max', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'Describe EPOC (excess post-exercise oxygen consumption) / oxygen debt', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'Explain the lactate threshold and onset of blood lactate accumulation (OBLA)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'Describe the factors affecting the predominance of an energy system during exercise', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'HL: Explain the Krebs cycle and electron transport chain in aerobic metabolism', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a23', 'HL: Describe beta-oxidation of fats for energy production', 9);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a31', 'Define and distinguish the principles of training (specificity, progressive overload, reversibility, variety, recovery)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a31', 'Describe the FITT principle (Frequency, Intensity, Time, Type)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a31', 'Explain different training methods (continuous, interval, fartlek, circuit, resistance, flexibility, plyometric)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a31', 'Describe periodisation and its phases (macrocycle, mesocycle, microcycle)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a31', 'Explain training adaptations for endurance and strength training', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a31', 'Describe the concept of training zones based on heart rate', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a31', 'Explain warm-up and cool-down and their physiological importance', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a32', 'Outline the health benefits of regular physical activity (cardiovascular, metabolic, psychological)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a32', 'Describe the relationship between physical inactivity and non-communicable diseases', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a32', 'Explain the dose-response relationship between physical activity and health outcomes', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a32', 'Describe physical activity guidelines for health (WHO recommendations)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a32', 'Explain the role of exercise in managing conditions (obesity, type 2 diabetes, hypertension, osteoporosis)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a32', 'Discuss the mental health benefits of exercise (anxiety, depression, self-esteem)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a33', 'Define fatigue and distinguish central from peripheral fatigue', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a33', 'Explain the causes of fatigue during exercise (glycogen depletion, lactate accumulation, dehydration, heat)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a33', 'Describe DOMS (delayed onset muscle soreness): causes, symptoms, and management', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a33', 'Explain recovery strategies (active recovery, sleep, nutrition, hydration, ice baths, compression)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a33', 'Describe supercompensation and its role in training adaptation', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a33', 'Explain overtraining syndrome: causes, symptoms, and prevention', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_a33', 'HL: Discuss the role of inflammation in recovery and adaptation', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b11', 'Describe the anatomical position and its importance as a reference point', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b11', 'Identify and describe the three anatomical planes (sagittal, frontal/coronal, transverse)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b11', 'Identify and describe the three anatomical axes (sagittal, frontal, longitudinal/vertical)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b11', 'Define and give sport examples for each movement: flexion, extension, hyperextension, abduction, adduction', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b11', 'Define and give sport examples for: rotation, circumduction, pronation, supination, dorsiflexion, plantarflexion', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b11', 'HL: Define and give examples of lateral flexion, inversion, eversion, elevation, depression', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b11', 'Relate movements to their planes and axes', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b12', 'Classify joints by structural type (fibrous, cartilaginous, synovial)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b12', 'Describe the structure of a synovial joint (cartilage, synovial membrane, synovial fluid, capsule, ligaments)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b12', 'Identify types of synovial joints (hinge, ball-and-socket, pivot, condyloid, saddle, gliding) with sport examples', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b12', 'Describe the structure and function of ligaments (bone-to-bone, stabilise joints)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b12', 'Describe the structure and function of tendons (muscle-to-bone, force transmission)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b12', 'Describe the structure and function of cartilage (articular cartilage, meniscus, intervertebral discs)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b12', 'Describe the properties of connective tissues (elasticity, plasticity, viscosity)', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b12', 'HL: Explain the role of proprioceptors in joint stability and movement awareness', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'Describe the structure of skeletal muscle (fascicles, muscle fibres, myofibrils, sarcomeres)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'Explain the sliding filament theory of muscle contraction', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'Describe the role of motor units in force production and recruitment', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'Define and distinguish isotonic (concentric and eccentric), isometric, and isokinetic contractions', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'Identify agonists, antagonists, synergists, and fixators in movement', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'Describe the types of muscle fibre (Type I slow-twitch, Type IIa fast-twitch oxidative, Type IIx fast-twitch glycolytic)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'Explain how fibre type distribution relates to sport performance', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'HL: Describe the all-or-none law and the size principle of motor unit recruitment', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b13', 'HL: Explain the length-tension relationship in muscle', 9);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b14', 'Define the components of a lever system (fulcrum, effort/force, load/resistance)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b14', 'Identify and describe first, second, and third class levers with body examples', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b14', 'Calculate mechanical advantage (MA = effort arm / resistance arm)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b14', 'Explain how lever systems affect speed and force of movement', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b14', 'Apply lever analysis to sporting movements (e.g., bicep curl = 3rd class lever)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b14', 'HL: Describe how changing lever lengths affects performance (e.g., choking up on a bat)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b21', 'State and explain Newton''s First Law (inertia) with sporting examples', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b21', 'State and explain Newton''s Second Law (F = ma) with sporting examples', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b21', 'State and explain Newton''s Third Law (action-reaction) with sporting examples', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b21', 'Define and calculate: force, mass, acceleration, momentum, impulse', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b21', 'Explain the impulse-momentum relationship (F x t = change in momentum)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b21', 'Apply Newton''s laws to analyse sporting techniques (e.g., sprinting, jumping, tackling)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b21', 'Describe the factors affecting friction and its role in sport', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b22', 'Describe the forces acting on a body moving through fluid (drag, lift)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b22', 'Explain Bernoulli''s principle and its application to sport (e.g., ball spin, aerodynamics)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b22', 'Describe the factors affecting drag (velocity, cross-sectional area, shape, fluid density)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b22', 'Explain how athletes can minimise drag to improve performance (streamlining, body position)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b22', 'Describe the Magnus effect and its role in ball flight (topspin, backspin, sidespin)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b22', 'HL: Explain laminar vs turbulent flow and their relevance to sport', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b23', 'Describe linear motion, angular motion, and general motion', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b23', 'Define and calculate: displacement, velocity, acceleration, distance, speed', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b23', 'Interpret distance-time, speed-time, and velocity-time graphs', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b23', 'Describe projectile motion: factors affecting trajectory (angle of release, speed of release, height of release)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b23', 'Explain the parabolic flight path and the effect of gravity and air resistance', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b23', 'HL: Describe angular motion concepts (torque, angular velocity, moment of inertia, angular momentum)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b23', 'HL: Explain conservation of angular momentum in sport (e.g., spinning in ice skating, diving)', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b31', 'Classify injuries as acute (sudden onset) or chronic (overuse)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b31', 'Describe common acute injuries: sprains, strains, fractures, dislocations, contusions', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b31', 'Describe common chronic/overuse injuries: tendinopathy, stress fractures, shin splints', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b31', 'Explain intrinsic risk factors for injury (age, sex, fitness, anatomy, previous injury)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b31', 'Explain extrinsic risk factors for injury (equipment, environment, training load, coaching)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b31', 'Describe mechanisms of injury (direct, indirect, overuse)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b31', 'HL: Explain the role of fatigue and inadequate recovery in injury risk', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b32', 'Describe immediate injury management (PRICE: Protection, Rest, Ice, Compression, Elevation)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b32', 'Outline the inflammatory response and its role in healing', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b32', 'Describe the stages of tissue healing (inflammatory, proliferation, remodelling)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b32', 'Explain the principles of rehabilitation (progressive loading, range of motion, proprioception, sport-specific)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b32', 'Describe injury prevention strategies (warm-up, flexibility, strength training, technique, equipment, rules)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b32', 'Explain the role of taping, bracing, and orthotics in injury prevention and management', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_b32', 'HL: Discuss return-to-play criteria and decision-making following injury', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c11', 'Define personality in the context of sport psychology', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c11', 'Describe trait theories of personality (e.g., Eysenck: introversion/extroversion, neuroticism/stability)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c11', 'Describe the interactionist approach to personality (Behavior = f(Personality x Environment))', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c11', 'Discuss social learning theory and personality development (Bandura: observation, imitation, reinforcement)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c11', 'Outline issues with measuring personality (self-report bias, social desirability, situation specificity)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c11', 'Evaluate the relationship between personality and sport performance', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c11', 'HL: Describe the Big Five personality model (OCEAN: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c12', 'Define mental toughness and outline its key characteristics (resilience, confidence, focus, determination)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c12', 'Describe the 4Cs model of mental toughness (Control, Commitment, Challenge, Confidence)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c12', 'Explain the relationship between mental toughness and performance under pressure', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c12', 'Describe how mental toughness can be developed (training environments, experience, psychological skills)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c12', 'HL: Discuss the nature vs nurture debate regarding mental toughness', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c21', 'Define motor learning and distinguish it from motor performance', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c21', 'Describe the stages of motor learning (cognitive, associative, autonomous - Fitts and Posner)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c21', 'Explain the characteristics of a learner at each stage', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c21', 'Describe types of practice (massed, distributed, variable, mental/imagery)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c21', 'Explain transfer of learning (positive, negative, bilateral, proactive, retroactive)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c21', 'Describe feedback types (intrinsic/extrinsic, knowledge of results/knowledge of performance, concurrent/terminal)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c21', 'Explain the role of feedback in skill acquisition and refinement', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c21', 'HL: Describe schema theory (recall schema and recognition schema)', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c22', 'Define attention and its importance in sport performance', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c22', 'Describe Nideffer''s model of attentional focus (broad/narrow, internal/external)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c22', 'Apply the attentional styles to different sporting situations', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c22', 'Explain selective attention and its role in filtering relevant information', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c22', 'Describe strategies for improving attentional control (cue words, pre-performance routines, mindfulness)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c22', 'HL: Explain the concept of attentional narrowing under pressure (perceptual narrowing)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c31', 'Define motivation and distinguish intrinsic from extrinsic motivation', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c31', 'Describe achievement motivation theory (Atkinson: need to achieve vs need to avoid failure)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c31', 'Explain characteristics of high achievers (nAch) vs low achievers (nAf)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c31', 'Describe attribution theory (Weiner: locus of causality, stability, controllability)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c31', 'Explain learned helplessness and attribution retraining', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c31', 'Apply achievement motivation concepts to coaching and performance contexts', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c32', 'Describe self-determination theory (Deci & Ryan: autonomy, competence, relatedness)', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c32', 'Explain the motivation continuum (amotivation to intrinsic motivation)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c32', 'Describe how coaches can enhance self-determined motivation', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c32', 'Explain the relationship between self-determination and long-term participation', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c32', 'HL: Describe the organismic integration theory (types of extrinsic motivation: external, introjected, identified, integrated)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c33', 'Define motivational climate and distinguish mastery (task) from performance (ego) climate', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c33', 'Describe the TARGET framework (Task, Authority, Recognition, Grouping, Evaluation, Time)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c33', 'Explain how coaches and teachers can create a mastery-oriented motivational climate', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c33', 'Discuss the effects of motivational climate on motivation, enjoyment, and dropout', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c33', 'HL: Discuss the interaction between motivational climate and individual goal orientation', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c41', 'Define arousal, state anxiety, and trait anxiety', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c41', 'Distinguish between cognitive anxiety (worry) and somatic anxiety (physical symptoms)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c41', 'Describe the inverted-U hypothesis (Yerkes-Dodson law)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c41', 'Describe drive theory of arousal and performance', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c41', 'Explain catastrophe theory (Hardy) and how it differs from inverted-U', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c41', 'Describe the zone of optimal functioning (ZOF) / individual zones of optimal functioning (IZOF - Hanin)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c41', 'Explain how anxiety impacts sport performance (attention, muscle tension, decision-making)', 7);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c41', 'HL: Discuss the relationship between arousal, anxiety, and task complexity', 8);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c42', 'Define coping and distinguish problem-focused from emotion-focused coping strategies', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c42', 'Describe stress management techniques (relaxation, breathing, cognitive restructuring, positive self-talk)', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c42', 'Explain the role of social support in coping with competitive stress', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c42', 'Describe somatic relaxation techniques (progressive muscular relaxation, breathing control, biofeedback)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c42', 'Describe cognitive techniques (positive self-talk, thought stopping, cognitive restructuring)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c42', 'HL: Discuss the effectiveness of different coping strategies in different contexts', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c51', 'Define goal setting and explain its role in motivation and performance', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c51', 'Describe types of goals: outcome, performance, and process goals', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c51', 'Apply the SMART principle (Specific, Measurable, Achievable, Realistic, Time-bound)', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c51', 'Explain how goal setting influences attention, effort, persistence, and strategy development', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c51', 'Describe the principles of effective goal-setting programmes in sport', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c51', 'Discuss potential problems with goal setting (unrealistic goals, outcome fixation, pressure)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c52', 'Define imagery (mental rehearsal / visualisation) and explain its purpose in sport', 1);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c52', 'Describe internal vs external imagery perspectives', 2);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c52', 'Describe the types of imagery: cognitive-specific, cognitive-general, motivational-specific, motivational-general', 3);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c52', 'Explain theories of how imagery works (psychoneuromuscular theory, symbolic learning theory)', 4);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c52', 'Outline guidelines for effective imagery use (vivid, controllable, multi-sensory, regular)', 5);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c52', 'Explain the PETTLEP model of imagery (Physical, Environment, Task, Timing, Learning, Emotion, Perspective)', 6);
INSERT INTO sports_checklist_items (section_id, text, sort_order) VALUES ('sport_chk_c52', 'HL: Evaluate the effectiveness of imagery across different sports and skill levels', 7);

-- Flashcard Topics
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_a1', 'A.1 Communication', '#B57A7A', 'A', 1);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_a2', 'A.2 Hydration & Nutrition', '#B57A7A', 'A', 2);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_a3', 'A.3 Response', '#B57A7A', 'A', 3);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_b1', 'B.1 Generating Movement', '#B57A7A', 'B', 4);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_b2', 'B.2 Forces & Motion', '#B57A7A', 'B', 5);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_b3', 'B.3 Injury', '#B57A7A', 'B', 6);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_c1', 'C.1 Individual Differences', '#B57A7A', 'C', 7);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_c2', 'C.2 Motor Learning', '#B57A7A', 'C', 8);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_c3', 'C.3 Motivation', '#B57A7A', 'C', 9);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_c4', 'C.4 Stress & Coping', '#B57A7A', 'C', 10);
INSERT INTO sports_flashcard_topics (id, label, color, unit, sort_order) VALUES ('sport_fc_c5', 'C.5 Psychological Skills', '#B57A7A', 'C', 11);

-- Flashcards
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Homeostasis', 'The maintenance of a stable internal environment within narrow physiological limits despite changes in external conditions.', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Negative feedback', 'A regulatory mechanism where the output of a system opposes and reduces the initial stimulus, restoring the variable to its set point (e.g., insulin lowering blood glucose).', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Positive feedback', 'A mechanism where the output amplifies the original stimulus (e.g., oxytocin increasing uterine contractions during childbirth).', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Autonomic nervous system (ANS)', 'Part of the peripheral nervous system that controls involuntary functions. Divided into sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) branches.', NULL, 4);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Baroreceptor', 'Sensory receptor in blood vessel walls (aortic arch and carotid sinus) that detects changes in blood pressure and sends signals to the medulla oblongata.', NULL, 5);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Chemoreceptor', 'Receptor that detects changes in blood chemistry (O2, CO2, pH levels), located in the aortic and carotid bodies and the medulla.', NULL, 6);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Cardiac output', 'Volume of blood pumped by the heart per minute. Calculated as: CO = Heart Rate x Stroke Volume.', 'CO = HR × SV', 7);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'SA node (sinoatrial node)', 'The natural pacemaker of the heart, located in the right atrium. Generates electrical impulses that initiate each heartbeat.', NULL, 8);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Oxygen-haemoglobin dissociation curve', 'A graph showing the relationship between partial pressure of oxygen and percentage saturation of haemoglobin. A rightward shift (Bohr effect) means O2 is released more readily to active tissues.', NULL, 9);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Thermoregulation', 'The process of maintaining core body temperature (~37°C) through vasodilation/vasoconstriction, sweating, shivering, and behavioural responses.', NULL, 10);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Epinephrine (adrenaline)', 'Hormone released by the adrenal medulla during the fight-or-flight response. Increases heart rate, blood pressure, bronchodilation, and glycogenolysis.', NULL, 11);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Insulin', 'Hormone secreted by beta cells of the pancreas. Lowers blood glucose by facilitating cellular glucose uptake and promoting glycogen synthesis.', NULL, 12);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a1', 'Glucagon', 'Hormone secreted by alpha cells of the pancreas. Raises blood glucose by stimulating glycogenolysis and gluconeogenesis in the liver.', NULL, 13);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'ATP (adenosine triphosphate)', 'The universal energy currency of cells. Energy is released when the terminal phosphate bond is broken (ATP → ADP + Pi).', 'ATP → ADP + Pi', 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'ATP-PC system', 'The immediate energy system using stored phosphocreatine to regenerate ATP. Provides energy for ~8-10 seconds of maximal effort. Anaerobic and does not produce lactate.', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'Anaerobic glycolysis', 'Breakdown of glucose without oxygen to produce 2 ATP and lactate. Dominant for high-intensity exercise lasting ~10 seconds to 2-3 minutes.', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'VO2 max', 'The maximum rate of oxygen consumption during maximal exercise. A key indicator of cardiorespiratory fitness, measured in mL/kg/min.', NULL, 4);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'EPOC', 'Excess post-exercise oxygen consumption. The elevated oxygen uptake after exercise used to restore the body to its resting state (replenish ATP-PC, remove lactate, restore O2 to haemoglobin/myoglobin).', NULL, 5);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'Lactate threshold', 'The exercise intensity at which lactate begins to accumulate in the blood faster than it can be removed. Also called onset of blood lactate accumulation (OBLA), typically at ~4 mmol/L.', NULL, 6);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'Dehydration', 'A loss of body water exceeding intake, resulting in a negative water balance. Even 2% body mass loss can impair exercise performance.', NULL, 7);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'Hyponatraemia', 'Dangerously low blood sodium concentration, often caused by excessive water intake without electrolyte replacement during prolonged exercise.', NULL, 8);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'Glycaemic index (GI)', 'A ranking of carbohydrate-containing foods based on how quickly they raise blood glucose levels. High GI = rapid rise; Low GI = gradual rise.', NULL, 9);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'Gut microbiome', 'The community of microorganisms in the gastrointestinal tract. Influences digestion, immune function, nutrient absorption, and potentially exercise performance.', NULL, 10);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a2', 'Energy continuum', 'The concept that all three energy systems (ATP-PC, anaerobic glycolysis, aerobic) contribute to ATP production simultaneously, with dominance shifting based on exercise intensity and duration.', NULL, 11);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a3', 'Specificity (training principle)', 'Training adaptations are specific to the type of exercise performed. The body adapts to the particular demands placed upon it.', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a3', 'Progressive overload', 'Gradually increasing the training stimulus (frequency, intensity, time, or type) to continue producing adaptations.', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a3', 'DOMS', 'Delayed onset muscle soreness. Muscle pain and stiffness occurring 24-72 hours after unaccustomed or eccentric exercise, caused by microtrauma to muscle fibres.', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a3', 'Supercompensation', 'The process by which the body adapts beyond its previous capacity following appropriate training and recovery. The basis for progressive fitness gains.', NULL, 4);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a3', 'Overtraining syndrome', 'A condition resulting from excessive training without adequate recovery, leading to chronic fatigue, decreased performance, mood disturbances, and increased injury risk.', NULL, 5);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_a3', 'Periodisation', 'The systematic planning of training into phases (macrocycle, mesocycle, microcycle) to optimise performance and manage fatigue.', NULL, 6);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Anatomical position', 'Standard reference position: standing upright, facing forward, arms at sides, palms facing forward, feet together.', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Sagittal plane', 'Divides the body into left and right halves. Movements in this plane include flexion and extension.', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Frontal (coronal) plane', 'Divides the body into front (anterior) and back (posterior). Movements include abduction and adduction.', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Transverse plane', 'Divides the body into upper (superior) and lower (inferior). Movements include rotation.', NULL, 4);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Synovial joint', 'A freely movable joint with a fluid-filled capsule. Features: articular cartilage, synovial membrane, synovial fluid, joint capsule, ligaments.', NULL, 5);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Ligament', 'Tough, fibrous connective tissue connecting bone to bone. Stabilises joints and limits excessive movement.', NULL, 6);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Tendon', 'Strong connective tissue attaching muscle to bone. Transmits the force of muscle contraction to produce movement.', NULL, 7);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Sliding filament theory', 'The mechanism of muscle contraction. Myosin cross-bridges attach to actin, pull the thin filaments toward the centre of the sarcomere, shortening the muscle.', NULL, 8);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Motor unit', 'A motor neuron and all the muscle fibres it innervates. The functional unit of muscle contraction. More motor units recruited = greater force.', NULL, 9);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Concentric contraction', 'A type of isotonic contraction where the muscle shortens while generating force (e.g., lifting phase of a bicep curl).', NULL, 10);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Eccentric contraction', 'A type of isotonic contraction where the muscle lengthens while generating force (e.g., lowering phase of a bicep curl).', NULL, 11);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Isometric contraction', 'Muscle generates force without changing length. No visible joint movement (e.g., holding a plank).', NULL, 12);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Agonist', 'The primary muscle responsible for producing a movement. Also called the prime mover (e.g., biceps brachii in a bicep curl).', NULL, 13);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Antagonist', 'The muscle that opposes the agonist and relaxes to allow movement (e.g., triceps during a bicep curl).', NULL, 14);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Type I (slow-twitch) fibres', 'Fatigue-resistant, aerobic, slower contraction speed. High mitochondria and myoglobin. Suited for endurance activities.', NULL, 15);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Type IIx (fast-twitch) fibres', 'High force, rapid contraction, fatigue quickly. Low mitochondria, anaerobic. Suited for explosive, high-power activities.', NULL, 16);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'First class lever', 'Fulcrum is between the effort and load (like a seesaw). Body example: nodding the head (atlanto-occipital joint).', NULL, 17);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Second class lever', 'Load is between the fulcrum and effort. Favours force. Body example: calf raise (ankle joint, fulcrum at toes).', NULL, 18);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b1', 'Third class lever', 'Effort is between the fulcrum and load. Favours speed and range of motion. Most common in the body. Example: bicep curl.', NULL, 19);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b2', 'Newton''s First Law (Inertia)', 'An object remains at rest or in uniform motion unless acted upon by an external force. Greater mass = greater inertia.', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b2', 'Newton''s Second Law (F=ma)', 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.', 'F = ma', 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b2', 'Newton''s Third Law (Action-Reaction)', 'For every action, there is an equal and opposite reaction. Example: a sprinter pushes back on blocks, blocks push the sprinter forward.', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b2', 'Impulse', 'The product of force and the time over which it is applied (F x t). Equals the change in momentum. Increasing contact time can increase impulse.', 'Impulse = F × t', 4);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b2', 'Magnus effect', 'The curved flight path of a spinning ball caused by pressure differences created by spin. Topspin = ball dips; backspin = ball floats.', NULL, 5);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b2', 'Drag', 'A resistive force opposing motion through a fluid (air or water). Depends on velocity, cross-sectional area, shape, and fluid density.', NULL, 6);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b2', 'Projectile motion', 'Motion of an object through the air influenced only by gravity (and air resistance). Trajectory depends on angle, speed, and height of release.', NULL, 7);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b2', 'Angular momentum', 'The quantity of rotation of a body. L = I x omega (moment of inertia x angular velocity). Conserved when no external torque acts.', 'L = I × ω', 8);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b3', 'Acute injury', 'Sudden onset, resulting from a single traumatic event (e.g., sprain, fracture, dislocation).', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b3', 'Chronic injury', 'Gradual onset due to repetitive stress or overuse over time (e.g., tendinopathy, stress fracture, shin splints).', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_b3', 'PRICE protocol', 'Immediate injury management: Protection, Rest, Ice, Compression, Elevation. Aims to reduce swelling, pain, and further tissue damage.', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c1', 'Personality', 'The unique pattern of thoughts, feelings, and behaviours that characterise an individual and distinguish them from others.', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c1', 'Interactionist approach', 'Behaviour = f(Personality x Environment). Behaviour results from the interaction between personality traits and the specific situation.', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c1', 'Mental toughness', 'The ability to cope with pressure, adversity, and challenges in sport. The 4Cs model: Control, Commitment, Challenge, Confidence (Clough).', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Motor learning', 'A relatively permanent change in motor skill capability resulting from practice or experience. Distinguished from temporary performance changes.', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Cognitive stage (Fitts & Posner)', 'The first stage of learning. The learner tries to understand what to do. Characterised by many errors, inconsistency, and heavy reliance on feedback.', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Associative stage', 'The middle stage of learning. Fewer errors, movements become more consistent, learner refines technique and relies less on external feedback.', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Autonomous stage', 'The final stage. Skills are automatic, requiring minimal conscious thought. Performance is consistent, efficient, and the performer can focus on strategy.', NULL, 4);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Transfer of learning', 'The influence of previously learned skills on learning new skills. Positive transfer = helps; Negative transfer = hinders; Bilateral = limb-to-limb.', NULL, 5);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Knowledge of results (KR)', 'Extrinsic feedback about the outcome of a movement (e.g., the ball went in the goal). Useful for beginners.', NULL, 6);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Knowledge of performance (KP)', 'Extrinsic feedback about the quality/technique of the movement (e.g., your elbow was too low). Useful for refining technique.', NULL, 7);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Nideffer''s attentional model', 'Four attentional styles based on two dimensions: width (broad/narrow) and direction (internal/external). Different sports demand different styles.', NULL, 8);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c2', 'Selective attention', 'The ability to focus on relevant cues while filtering out irrelevant information. Critical for performance in complex sporting environments.', NULL, 9);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c3', 'Achievement motivation', 'The drive to succeed and persist in the face of challenges. Atkinson''s theory: behaviour = nAch (need to achieve) minus nAf (need to avoid failure).', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c3', 'Attribution theory (Weiner)', 'How individuals explain the causes of success and failure along three dimensions: locus of causality (internal/external), stability (stable/unstable), controllability.', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c3', 'Learned helplessness', 'A state where an individual believes they have no control over failure outcomes, leading to reduced effort and motivation. Attributed to stable, uncontrollable causes.', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c3', 'Self-determination theory', 'Deci & Ryan: intrinsic motivation is fostered when three basic needs are met: autonomy (choice), competence (mastery), relatedness (connection with others).', NULL, 4);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c3', 'Mastery (task) climate', 'A motivational environment that emphasises effort, improvement, learning, and personal progress rather than winning or social comparison.', NULL, 5);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c3', 'Performance (ego) climate', 'A motivational environment that emphasises outperforming others, winning, and social comparison. Can undermine intrinsic motivation.', NULL, 6);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c3', 'TARGET framework', 'A guide for creating motivational climates: Task (varied activities), Authority (shared decisions), Recognition (effort-based), Grouping (mixed), Evaluation (self-referenced), Time (flexible).', NULL, 7);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c4', 'Arousal', 'A general state of physiological and psychological activation, ranging from deep sleep to intense excitement. Not inherently positive or negative.', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c4', 'State anxiety', 'Temporary anxiety experienced in a particular situation (e.g., before a competition). Has cognitive (worry) and somatic (physical) components.', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c4', 'Trait anxiety', 'A general disposition to perceive situations as threatening. A personality characteristic that predisposes someone to experience anxiety.', NULL, 3);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c4', 'Inverted-U hypothesis', 'Performance increases with arousal up to an optimal point, then declines with further increases. Optimal arousal varies by task complexity and individual.', NULL, 4);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c4', 'Catastrophe theory', 'Hardy''s model: when cognitive anxiety is high and arousal exceeds the optimal point, performance drops suddenly and dramatically (a catastrophe), not gradually.', NULL, 5);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c4', 'IZOF (Hanin)', 'Individual Zones of Optimal Functioning. Each athlete has a unique zone of arousal that produces best performance. Differs from the inverted-U''s single optimum.', NULL, 6);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c4', 'Problem-focused coping', 'Strategies that directly address the source of stress (e.g., planning, seeking information, training harder, time management).', NULL, 7);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c4', 'Emotion-focused coping', 'Strategies that manage the emotional response to stress (e.g., relaxation, imagery, self-talk, seeking social support).', NULL, 8);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c5', 'SMART goals', 'Specific, Measurable, Achievable, Realistic, Time-bound. A framework for setting effective goals that enhance motivation and performance.', NULL, 1);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c5', 'Imagery (mental rehearsal)', 'The cognitive process of creating or recreating a sensory experience in the mind without physical movement. Used for preparation, skill refinement, and confidence.', NULL, 2);
INSERT INTO sports_flashcards (topic_id, term, definition, formula, sort_order) VALUES ('sport_fc_c5', 'PETTLEP model', 'Holmes & Collins: guidelines for effective imagery. Physical, Environment, Task, Timing, Learning, Emotion, Perspective. Imagery should be as realistic as possible.', NULL, 3);

-- MCQ Questions
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a01', 'A.1 Communication', 'SL/HL', 'A', 'Which system provides rapid, short-duration signals via electrical impulses?', 'Endocrine system', 'Nervous system', 'Lymphatic system', 'Digestive system', 1, 'The nervous system transmits electrical impulses along neurons for rapid, short-duration communication.', 1);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a02', 'A.1 Communication', 'SL/HL', 'A', 'The hypothalamus primarily links which two body systems?', 'Muscular and skeletal', 'Respiratory and digestive', 'Nervous and endocrine', 'Circulatory and lymphatic', 2, 'The hypothalamus acts as the main link between the nervous and endocrine systems.', 2);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a03', 'A.1 Communication', 'SL/HL', 'A', 'Which is an example of a negative feedback mechanism?', 'Blood clotting cascade', 'Oxytocin release during labour', 'Insulin lowering blood glucose', 'Positive reinforcement of nerve impulses', 2, 'Insulin lowering blood glucose is a classic example of negative feedback, where the response opposes the stimulus.', 3);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a04', 'A.1 Communication', 'SL/HL', 'A', 'Thermoregulation in a hot environment involves:', 'Vasoconstriction and shivering', 'Vasodilation and sweating', 'Increased metabolic rate', 'Decreased heart rate', 1, 'In hot conditions, the body uses vasodilation (widening blood vessels near the skin) and sweating to dissipate heat.', 4);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a05', 'A.1 Communication', 'SL/HL', 'A', 'The SA node is also known as the:', 'Heartbeat regulator', 'Bundle of His', 'Natural pacemaker', 'Purkinje fibre network', 2, 'The SA (sinoatrial) node is the natural pacemaker of the heart, generating electrical impulses that initiate heartbeats.', 5);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a06', 'A.1 Communication', 'SL/HL', 'A', 'Most CO2 in the blood is transported as:', 'Dissolved CO2 in plasma', 'Carbaminohaemoglobin', 'Bicarbonate ions (HCO3-)', 'Bound to white blood cells', 2, 'About 70% of CO2 is transported as bicarbonate ions (HCO3-) in the plasma.', 6);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a07', 'A.2 Hydration & Nutrition', 'SL/HL', 'A', 'Hyponatraemia is caused by:', 'Excessive sodium intake', 'Dehydration', 'Excessive water intake diluting sodium', 'High potassium levels', 2, 'Hyponatraemia occurs when excessive water intake dilutes blood sodium to dangerously low levels.', 7);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a08', 'A.2 Hydration & Nutrition', 'SL/HL', 'A', 'Which macronutrient is the primary fuel for high-intensity exercise?', 'Protein', 'Fat', 'Carbohydrate', 'Vitamins', 2, 'Carbohydrates are the primary fuel source for high-intensity exercise due to their rapid availability for energy production.', 8);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a09', 'A.2 Hydration & Nutrition', 'SL/HL', 'A', 'The ATP-PC system provides energy for approximately:', '8-10 seconds', '1-3 minutes', '5-10 minutes', '30+ minutes', 0, 'The ATP-PC (phosphocreatine) system provides immediate energy for approximately 8-10 seconds of maximal effort.', 9);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a10', 'A.2 Hydration & Nutrition', 'SL/HL', 'A', 'VO2 max represents:', 'Maximum heart rate during exercise', 'Maximum volume of oxygen consumed per minute', 'Maximum ventilation rate', 'Maximum lactate production', 1, 'VO2 max is the maximum rate at which the body can consume oxygen during exercise, indicating cardiorespiratory fitness.', 10);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a11', 'A.3 Response', 'SL/HL', 'A', 'Which principle states that training should match the demands of the sport?', 'Progressive overload', 'Reversibility', 'Specificity', 'Variety', 2, 'The principle of specificity states that training adaptations are specific to the type of exercise performed.', 11);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a12', 'A.3 Response', 'SL/HL', 'A', 'DOMS typically peaks:', 'Immediately after exercise', '6-12 hours post-exercise', '24-72 hours post-exercise', '5-7 days post-exercise', 2, 'Delayed onset muscle soreness (DOMS) typically peaks 24-72 hours after unaccustomed or eccentric exercise.', 12);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a13', 'A.1 Communication', 'SL/HL', 'A', 'Which receptor detects changes in blood pressure?', 'Chemoreceptor', 'Baroreceptor', 'Proprioceptor', 'Thermoreceptor', 1, 'Baroreceptors are sensory receptors in blood vessel walls that detect changes in blood pressure.', 13);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a14', 'A.1 Communication', 'SL/HL', 'A', 'The parasympathetic nervous system generally:', 'Increases heart rate', 'Stimulates fight-or-flight', 'Promotes rest and digest', 'Releases adrenaline', 2, 'The parasympathetic nervous system promotes rest-and-digest functions, slowing heart rate and stimulating digestion.', 14);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a15', 'A.2 Hydration & Nutrition', 'SL/HL', 'A', 'Glycogen is primarily stored in the:', 'Brain and kidneys', 'Liver and skeletal muscles', 'Adipose tissue', 'Bone marrow', 1, 'Glycogen is primarily stored in the liver and skeletal muscles for energy during exercise.', 15);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a16', 'A.2 Hydration & Nutrition', 'SL/HL', 'A', 'EPOC refers to:', 'Maximum oxygen uptake', 'Oxygen consumed above resting levels after exercise', 'Oxygen deficit during exercise', 'Oxygen stored in muscles', 1, 'EPOC (excess post-exercise oxygen consumption) is the elevated oxygen uptake after exercise to restore the body to resting state.', 16);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a17', 'A.3 Response', 'SL/HL', 'A', 'Which training phase involves the longest time period?', 'Microcycle', 'Mesocycle', 'Macrocycle', 'Training session', 2, 'A macrocycle is the longest training phase, typically spanning an entire season or year of training.', 17);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a18', 'A.3 Response', 'SL/HL', 'A', 'Central fatigue primarily originates in the:', 'Muscles', 'Heart', 'Brain and central nervous system', 'Liver', 2, 'Central fatigue originates in the brain and central nervous system, reducing neural drive to muscles.', 18);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a19', 'A.1 Communication', 'SL/HL', 'A', 'ADH (antidiuretic hormone) primarily regulates:', 'Blood glucose', 'Body temperature', 'Water reabsorption in kidneys', 'Heart rate', 2, 'ADH regulates water reabsorption in the kidneys to maintain fluid balance (osmoregulation).', 19);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_a20', 'A.2 Hydration & Nutrition', 'SL/HL', 'A', 'The lactate threshold marks the point at which:', 'Fat becomes the primary fuel', 'Lactate accumulates faster than it can be removed', 'Aerobic metabolism completely stops', 'Heart rate reaches maximum', 1, 'The lactate threshold is the exercise intensity where lactate accumulates in the blood faster than it can be cleared.', 20);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b01', 'B.1 Generating Movement', 'SL/HL', 'B', 'Which plane divides the body into left and right halves?', 'Frontal', 'Transverse', 'Sagittal', 'Oblique', 2, 'The sagittal plane divides the body into left and right halves; movements include flexion and extension.', 21);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b02', 'B.1 Generating Movement', 'SL/HL', 'B', 'Abduction is best described as:', 'Movement toward the midline', 'Movement away from the midline', 'Rotation around the longitudinal axis', 'Bending a joint to decrease the angle', 1, 'Abduction is movement away from the midline of the body (e.g., raising the arm sideways).', 22);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b03', 'B.1 Generating Movement', 'SL/HL', 'B', 'Synovial fluid functions primarily to:', 'Attach bone to bone', 'Reduce friction and nourish cartilage', 'Provide structural support', 'Transmit nerve impulses', 1, 'Synovial fluid lubricates the joint, reduces friction between articular cartilage, and provides nutrients.', 23);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b04', 'B.1 Generating Movement', 'SL/HL', 'B', 'A ligament connects:', 'Muscle to bone', 'Bone to bone', 'Muscle to muscle', 'Nerve to muscle', 1, 'Ligaments are tough connective tissues that connect bone to bone, stabilising joints.', 24);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b05', 'B.1 Generating Movement', 'SL/HL', 'B', 'In the sliding filament theory, which myofilament pulls the thin filament?', 'Actin', 'Myosin', 'Troponin', 'Tropomyosin', 1, 'Myosin cross-bridges attach to actin (thin filament) and pull it toward the centre of the sarcomere during contraction.', 25);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b06', 'B.1 Generating Movement', 'SL/HL', 'B', 'An eccentric contraction occurs when:', 'The muscle shortens under tension', 'The muscle lengthens under tension', 'The muscle contracts without changing length', 'The muscle relaxes completely', 1, 'An eccentric contraction occurs when a muscle lengthens while generating force (e.g., lowering a weight).', 26);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b07', 'B.1 Generating Movement', 'SL/HL', 'B', 'Type I (slow-twitch) muscle fibres are best suited for:', 'High-intensity sprinting', 'Explosive jumping', 'Endurance activities like marathon running', 'Maximal weightlifting', 2, 'Type I fibres are fatigue-resistant with high aerobic capacity, making them ideal for endurance activities.', 27);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b08', 'B.1 Generating Movement', 'SL/HL', 'B', 'A third class lever has the effort located:', 'Between the fulcrum and load', 'At the end, with fulcrum in the middle', 'At the end, with load in the middle', 'Directly on the fulcrum', 0, 'In a third class lever, the effort (muscle force) is located between the fulcrum (joint) and the load.', 28);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b09', 'B.2 Forces & Motion', 'SL/HL', 'B', 'Newton''s Second Law is expressed as:', 'Every action has an equal and opposite reaction', 'F = ma', 'An object at rest stays at rest', 'Momentum = mass x velocity', 1, 'Newton''s Second Law states that force equals mass times acceleration (F = ma).', 29);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b10', 'B.2 Forces & Motion', 'SL/HL', 'B', 'The impulse-momentum relationship states that:', 'Force equals mass times acceleration', 'Work equals force times distance', 'Force applied over time equals change in momentum', 'Kinetic energy equals half mass times velocity squared', 2, 'The impulse-momentum relationship states that impulse (F × t) equals the change in momentum.', 30);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b11', 'B.2 Forces & Motion', 'SL/HL', 'B', 'The Magnus effect explains:', 'Why objects fall due to gravity', 'The curved flight path of a spinning ball', 'Friction between surfaces', 'The conservation of angular momentum', 1, 'The Magnus effect explains how spin causes pressure differences around a ball, curving its flight path.', 31);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b12', 'B.2 Forces & Motion', 'SL/HL', 'B', 'Which factor does NOT affect projectile trajectory?', 'Angle of release', 'Speed of release', 'Colour of the projectile', 'Height of release', 2, 'Projectile trajectory is affected by angle, speed, and height of release - not the colour of the object.', 32);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b13', 'B.3 Injury', 'SL/HL', 'B', 'A stress fracture is classified as:', 'An acute injury', 'A chronic/overuse injury', 'A dislocation', 'A contusion', 1, 'A stress fracture develops gradually from repetitive stress and is classified as a chronic/overuse injury.', 33);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b14', 'B.3 Injury', 'SL/HL', 'B', 'PRICE stands for:', 'Prevention, Rehabilitation, Ice, Compression, Exercise', 'Protection, Rest, Ice, Compression, Elevation', 'Pain, Recovery, Immobilisation, Cooling, Elevation', 'Protection, Rehabilitation, Ice, Cooling, Exercise', 1, 'PRICE stands for Protection, Rest, Ice, Compression, Elevation - the immediate injury management protocol.', 34);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b15', 'B.1 Generating Movement', 'SL/HL', 'B', 'Which is a first class lever in the body?', 'Bicep curl (elbow joint)', 'Calf raise (ankle joint)', 'Nodding the head (atlanto-occipital joint)', 'Knee extension', 2, 'Nodding the head is a first class lever where the fulcrum (atlanto-occipital joint) is between the effort and load.', 35);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b16', 'B.2 Forces & Motion', 'SL/HL', 'B', 'Bernoulli''s principle relates to:', 'Gravity and mass', 'Speed and pressure in fluid flow', 'Muscle contraction speed', 'Joint stability', 1, 'Bernoulli''s principle states that as fluid speed increases, pressure decreases - applied in aerodynamics and ball flight.', 36);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b17', 'B.1 Generating Movement', 'SL/HL', 'B', 'The agonist in a bicep curl is the:', 'Triceps brachii', 'Biceps brachii', 'Deltoid', 'Brachioradialis', 1, 'The biceps brachii is the agonist (prime mover) during a bicep curl, producing the flexion at the elbow.', 37);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b18', 'B.3 Injury', 'SL/HL', 'B', 'An intrinsic risk factor for injury is:', 'Playing surface', 'Equipment quality', 'Previous injury history', 'Weather conditions', 2, 'Previous injury history is an intrinsic (internal) risk factor, as it relates to the individual''s body.', 38);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b19', 'B.2 Forces & Motion', 'SL/HL', 'B', 'Conservation of angular momentum is demonstrated when:', 'A sprinter runs in a straight line', 'A diver tucks to spin faster', 'A swimmer uses drag to slow down', 'A cyclist changes gear', 1, 'When a diver tucks, they reduce moment of inertia, so angular velocity increases to conserve angular momentum.', 39);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_b20', 'B.1 Generating Movement', 'SL/HL', 'B', 'The frontal plane divides the body into:', 'Left and right', 'Top and bottom', 'Front and back', 'Diagonal halves', 2, 'The frontal (coronal) plane divides the body into front (anterior) and back (posterior) halves.', 40);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c01', 'C.1 Individual Differences', 'SL/HL', 'C', 'The interactionist approach to personality states that behaviour is a function of:', 'Traits alone', 'The situation alone', 'Personality and environment interaction', 'Genetic factors only', 2, 'The interactionist approach states that Behaviour = f(Personality x Environment).', 41);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c02', 'C.1 Individual Differences', 'SL/HL', 'C', 'Which is NOT one of the 4Cs of mental toughness?', 'Control', 'Commitment', 'Creativity', 'Challenge', 2, 'The 4Cs are Control, Commitment, Challenge, and Confidence. Creativity is not included.', 42);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c03', 'C.2 Motor Learning', 'SL/HL', 'C', 'In Fitts and Posner''s model, the autonomous stage is characterised by:', 'Many errors and high cognitive demand', 'Fewer errors but still requires concentration', 'Automatic performance with minimal conscious thought', 'Reliance on external feedback', 2, 'The autonomous stage features automatic, consistent performance requiring minimal conscious thought.', 43);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c04', 'C.2 Motor Learning', 'SL/HL', 'C', 'Knowledge of results (KR) is a type of:', 'Intrinsic feedback', 'Extrinsic feedback about the outcome', 'Concurrent feedback', 'Proprioceptive feedback', 1, 'KR is extrinsic feedback about the outcome of a movement (e.g., whether the ball went in).', 44);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c05', 'C.2 Motor Learning', 'SL/HL', 'C', 'A basketball player scanning the court for open teammates is using which attentional style?', 'Broad-external', 'Narrow-external', 'Broad-internal', 'Narrow-internal', 0, 'Scanning the court for teammates requires a broad-external attentional focus to assess the wider environment.', 45);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c06', 'C.3 Motivation', 'SL/HL', 'C', 'A person with high nAch (need to achieve) is likely to:', 'Avoid challenging tasks', 'Attribute failure to external factors only', 'Seek moderately difficult challenges', 'Show learned helplessness', 2, 'High achievers (high nAch) tend to seek moderately challenging tasks where success is possible but not guaranteed.', 46);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c07', 'C.3 Motivation', 'SL/HL', 'C', 'In attribution theory, ''effort'' is classified as:', 'Internal, unstable, controllable', 'External, stable, uncontrollable', 'Internal, stable, controllable', 'External, unstable, uncontrollable', 0, 'Effort is internal (within the person), unstable (can change), and controllable (the person can choose to try harder).', 47);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c08', 'C.3 Motivation', 'SL/HL', 'C', 'Self-determination theory identifies three basic psychological needs:', 'Competence, relatedness, autonomy', 'Achievement, power, affiliation', 'Control, commitment, challenge', 'Confidence, concentration, composure', 0, 'SDT (Deci & Ryan) identifies autonomy, competence, and relatedness as three basic psychological needs.', 48);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c09', 'C.3 Motivation', 'SL/HL', 'C', 'A mastery-oriented motivational climate emphasises:', 'Winning and beating others', 'Personal improvement and effort', 'Punishment for errors', 'Social comparison', 1, 'A mastery climate focuses on personal improvement, effort, and learning rather than winning.', 49);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c10', 'C.4 Stress & Coping', 'SL/HL', 'C', 'The inverted-U hypothesis predicts that performance is highest at:', 'Very low arousal', 'Very high arousal', 'Moderate arousal', 'Arousal has no effect on performance', 2, 'The inverted-U hypothesis predicts optimal performance at moderate arousal, with decline at extremes.', 50);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c11', 'C.4 Stress & Coping', 'SL/HL', 'C', 'Cognitive anxiety is best described as:', 'Increased heart rate and sweating', 'Mental worry and negative thoughts', 'Muscle tension and trembling', 'Butterflies in the stomach', 1, 'Cognitive anxiety is the mental component of anxiety involving worry, negative thoughts, and apprehension.', 51);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c12', 'C.4 Stress & Coping', 'SL/HL', 'C', 'Progressive muscular relaxation (PMR) is classified as:', 'A cognitive coping technique', 'A somatic relaxation technique', 'An attentional control strategy', 'A goal-setting technique', 1, 'PMR is a somatic (body-based) relaxation technique involving tensing and relaxing muscle groups.', 52);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c13', 'C.5 Psychological Skills', 'SL/HL', 'C', 'An outcome goal focuses on:', 'The process of performing a skill', 'Personal standards of performance', 'The result relative to others (winning/losing)', 'Effort and technique', 2, 'Outcome goals focus on competitive results such as winning or beating opponents.', 53);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c14', 'C.5 Psychological Skills', 'SL/HL', 'C', 'SMART goals must be:', 'Simple, Moderate, Achievable, Relevant, Tracked', 'Specific, Measurable, Achievable, Realistic, Time-bound', 'Strategic, Meaningful, Attainable, Recorded, Tested', 'Short, Manageable, Action-oriented, Reviewed, Tough', 1, 'SMART stands for Specific, Measurable, Achievable, Realistic, Time-bound.', 54);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c15', 'C.5 Psychological Skills', 'SL/HL', 'C', 'Internal imagery involves:', 'Watching yourself from an external perspective', 'Imagining the skill from your own viewpoint (first person)', 'Reading about the skill', 'Watching a video of someone else', 1, 'Internal imagery uses a first-person perspective, imagining the skill from your own viewpoint.', 55);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c16', 'C.5 Psychological Skills', 'SL/HL', 'C', 'The PETTLEP model of imagery includes which element?', 'Practice', 'Physical', 'Planning', 'Performance', 1, 'PETTLEP stands for Physical, Environment, Task, Timing, Learning, Emotion, Perspective.', 56);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c17', 'C.3 Motivation', 'SL/HL', 'C', 'Learned helplessness in sport occurs when an athlete:', 'Attributes success to effort', 'Believes failure is due to uncontrollable, stable factors', 'Has high self-efficacy', 'Uses process goals', 1, 'Learned helplessness occurs when athletes attribute failure to stable, uncontrollable factors like lack of ability.', 57);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c18', 'C.4 Stress & Coping', 'SL/HL', 'C', 'Catastrophe theory differs from the inverted-U because it predicts:', 'A gradual decline in performance', 'A sudden dramatic drop in performance beyond optimal arousal', 'Consistent improvement with arousal', 'No relationship between arousal and performance', 1, 'Catastrophe theory predicts a sudden, dramatic performance drop when cognitive anxiety is high and arousal exceeds optimal.', 58);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c19', 'C.2 Motor Learning', 'SL/HL', 'C', 'Negative transfer of learning occurs when:', 'A previously learned skill helps learning a new skill', 'A previously learned skill hinders learning a new skill', 'No transfer occurs between skills', 'Both skills improve simultaneously', 1, 'Negative transfer occurs when a previously learned skill interferes with learning a new skill.', 59);
INSERT INTO sports_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES ('sport_mcq_c20', 'C.3 Motivation', 'SL/HL', 'C', 'Which letter in TARGET stands for ''Authority''?', 'The role of the audience', 'How much decision-making control athletes have', 'Athletic achievement standards', 'Assessment methods used', 1, 'In TARGET, Authority refers to how much decision-making control and choice athletes are given.', 60);

-- Written Questions
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_a01', 'A.1 Communication', 'SL/HL', 'short_answer', 'A', 6, 'Compare and contrast the nervous and endocrine systems as mechanisms of inter-system communication.', 'Award [1] for each valid comparison point, up to [6]:
- Nervous system uses electrical impulses along neurons; endocrine uses chemical hormones via the bloodstream [1]
- Nervous responses are rapid (milliseconds); endocrine responses are slower (seconds to hours) [1]
- Nervous effects are short-lived; endocrine effects are longer-lasting [1]
- Nervous system targets specific cells/organs; endocrine targets can be widespread (any cell with receptors) [1]
- Both systems are coordinated by the hypothalamus [1]
- Both use chemical messengers (neurotransmitters vs hormones) [1]
- Example: sympathetic NS triggers adrenal medulla to release adrenaline (integration of both systems) [1]', 1);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_a02', 'A.1 Communication', 'SL/HL', 'short_answer', 'A', 5, 'Explain how negative feedback maintains blood glucose homeostasis. Include the roles of insulin and glucagon.', 'Award [1] for each valid point, up to [5]:
- After eating, blood glucose rises above normal / set point [1]
- Beta cells of pancreas detect high glucose and secrete insulin [1]
- Insulin promotes glucose uptake by cells / glycogen synthesis in liver and muscles, lowering blood glucose [1]
- When blood glucose falls below normal, alpha cells secrete glucagon [1]
- Glucagon stimulates glycogenolysis / gluconeogenesis in the liver, raising blood glucose [1]
- This is negative feedback because the response opposes the initial change [1]', 2);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_a03', 'A.1 Communication', 'SL/HL', 'short_answer', 'A', 8, 'Describe the cardiovascular and ventilatory responses to the onset of exercise.', 'Award [1] for each valid point, up to [8]:
Cardiovascular:
- Heart rate increases (due to sympathetic stimulation and adrenaline) [1]
- Stroke volume increases (due to increased venous return / Frank-Starling mechanism) [1]
- Cardiac output increases (CO = HR x SV) [1]
- Blood pressure increases (systolic rises due to increased CO) [1]
- Blood redistributed from visceral organs to working muscles [1]
Ventilatory:
- Breathing rate (frequency) increases [1]
- Tidal volume increases [1]
- Minute ventilation increases (VE = f x TV) [1]
- Chemoreceptors detect increased CO2 / decreased pH [1]', 3);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_a04', 'A.2 Hydration & Nutrition', 'SL/HL', 'short_answer', 'A', 6, 'Outline the three energy systems and explain the energy continuum concept.', 'Award [1] for each valid point, up to [6]:
- ATP-PC system: uses stored phosphocreatine to regenerate ATP; anaerobic; lasts ~8-10 seconds [1]
- Anaerobic glycolysis: breaks down glucose to pyruvate then lactate; produces 2 net ATP; dominant ~10s to 2-3 min [1]
- Aerobic system: uses carbohydrates and fats with O2; produces large amounts of ATP; dominant for prolonged exercise [1]
- The energy continuum: all three systems are active simultaneously during exercise [1]
- Relative contribution depends on exercise intensity and duration [1]
- At low intensity/long duration, aerobic dominates; at high intensity/short duration, anaerobic dominates [1]', 4);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_a05', 'A.2 Hydration & Nutrition', 'SL/HL', 'short_answer', 'A', 6, 'Discuss the effects of dehydration on exercise performance, and outline strategies for maintaining hydration.', 'Award [1] for each valid point, up to [6]:
Effects:
- Reduced blood volume leads to decreased stroke volume and cardiac output [1]
- Increased heart rate to compensate for reduced stroke volume [1]
- Impaired thermoregulation / reduced sweating / increased core temperature [1]
- Decreased VO2 max and endurance performance [1]
Strategies:
- Pre-exercise: drink 5-7 mL/kg body weight 2-4 hours before [1]
- During exercise: drink at regular intervals; match fluid intake to sweat rate [1]
- Post-exercise: replace 150% of fluid lost; include electrolytes [1]', 5);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_a06', 'A.3 Response', 'SL/HL', 'short_answer', 'A', 7, 'Explain the principles of training and apply them to designing a training programme for a distance runner.', 'Award [1] for each valid point, up to [7]:
Principles:
- Specificity: training should mimic the demands of distance running (aerobic endurance) [1]
- Progressive overload: gradually increase distance, pace, or frequency over time [1]
- Reversibility: adaptations are lost if training ceases; consistency is essential [1]
- Variety: mix training methods (long runs, tempo runs, intervals, cross-training) [1]
- Recovery: allow adequate rest between hard sessions for adaptation [1]
Application:
- Use continuous running for aerobic base development [1]
- Include interval training at or above lactate threshold to improve VO2 max [1]
- Apply periodisation with a macrocycle building toward a target race [1]', 6);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_a07', 'A.3 Response', 'SL/HL', 'short_answer', 'A', 5, 'Explain how DOMS occurs and evaluate two recovery strategies for managing it.', 'Award [1] for each valid point, up to [5]:
Explanation of DOMS:
- Caused by unaccustomed or eccentric exercise leading to microtrauma in muscle fibres [1]
- Results in inflammation, swelling, and pain peaking 24-72 hours post-exercise [1]
- Not caused by lactate accumulation (common misconception) [1]
Recovery strategies (any two evaluated):
- Active recovery: increases blood flow to aid removal of metabolic waste; evidence is mixed [1]
- Cold water immersion: may reduce inflammation and perceived pain; can impair long-term adaptation if overused [1]
- Adequate nutrition: supports muscle repair and glycogen replenishment; timing matters [1]
- Sleep: critical for growth hormone release and tissue repair [1]', 7);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_b01', 'B.1 Generating Movement', 'SL/HL', 'short_answer', 'B', 6, 'Describe the structure of a synovial joint and explain how its components facilitate movement and reduce injury risk.', 'Award [1] for each valid point, up to [6]:
- Joint capsule: encloses the joint and provides structural support [1]
- Synovial membrane: lines the capsule; secretes synovial fluid [1]
- Synovial fluid: lubricates the joint, reduces friction, nourishes articular cartilage [1]
- Articular cartilage: covers bone ends; absorbs shock and provides smooth surface [1]
- Ligaments: connect bone to bone; stabilise the joint and prevent excessive movement [1]
- Menisci: fibrocartilage discs that improve fit between bones and absorb shock [1]', 8);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_b02', 'B.1 Generating Movement', 'SL/HL', 'short_answer', 'B', 6, 'Explain the sliding filament theory of muscle contraction.', 'Award [1] for each valid point, up to [6]:
- Nerve impulse arrives at neuromuscular junction; acetylcholine is released [1]
- Calcium ions (Ca2+) released from sarcoplasmic reticulum [1]
- Ca2+ binds to troponin, causing tropomyosin to shift and expose binding sites on actin [1]
- Myosin heads (cross-bridges) attach to actin binding sites [1]
- Power stroke: myosin heads pivot, pulling actin filaments toward centre of sarcomere [1]
- ATP provides energy for cross-bridge detachment and resetting of myosin heads [1]', 9);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_b03', 'B.2 Forces & Motion', 'SL/HL', 'short_answer', 'B', 6, 'Apply Newton''s three laws of motion to analyse the biomechanics of a sprinter at the starting blocks.', 'Award [1] for each valid point, up to [6]:
First Law (Inertia):
- The sprinter is at rest in the blocks; they remain at rest until a force is applied [1]
- Greater body mass requires greater force to overcome inertia [1]
Second Law (F=ma):
- The sprinter applies a large force against the blocks to maximise acceleration [1]
- Acceleration depends on the magnitude of force relative to body mass [1]
Third Law (Action-Reaction):
- Sprinter pushes backward against blocks; blocks exert equal and opposite reaction force forward [1]
- Ground reaction force propels the sprinter forward out of the blocks [1]', 10);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_b04', 'B.3 Injury', 'SL/HL', 'short_answer', 'B', 8, 'Distinguish between acute and chronic injuries, giving two sporting examples of each. Explain two intrinsic and two extrinsic risk factors for injury.', 'Award [1] for each valid point, up to [8]:
Acute injuries:
- Sudden onset from a single traumatic event [1]
- Examples: ankle sprain, hamstring strain [1]
Chronic injuries:
- Gradual onset due to repetitive stress/overuse [1]
- Examples: Achilles tendinopathy, stress fracture [1]
Intrinsic risk factors (any two):
- Previous injury: scar tissue is weaker; incomplete rehab increases re-injury risk [1]
- Poor flexibility: tight muscles are more susceptible to strains [1]
Extrinsic risk factors (any two):
- Inappropriate equipment: worn-out shoes increase impact stress [1]
- Training errors: sudden increases in load without adequate progression [1]', 11);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_b05', 'B.2 Forces & Motion', 'SL/HL', 'short_answer', 'B', 4, 'Explain how the Magnus effect influences ball flight in sport. Use a specific example to support your answer.', 'Award [1] for each valid point, up to [4]:
- When a ball spins, it drags air around it due to friction [1]
- On one side, spin adds to air flow (faster air, lower pressure); on the other, it opposes (slower air, higher pressure) [1]
- The ball curves toward the low-pressure side (Bernoulli''s principle) [1]
- Example: a topspin tennis serve causes the ball to dip downward faster [1]', 12);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_b06', 'B.1 Generating Movement', 'SL/HL', 'short_answer', 'B', 6, 'Describe the three classes of levers in the human body, providing a sporting example and stating the mechanical advantage of each.', 'Award [1] for each valid point, up to [6]:
First class lever:
- Fulcrum between effort and load; e.g., nodding the head or triceps extending elbow [1]
- Can favour either force or speed depending on relative arm lengths [1]
Second class lever:
- Load between fulcrum and effort; e.g., calf raise (fulcrum at toes) [1]
- Favours force production because effort arm is longer (MA > 1) [1]
Third class lever:
- Effort between fulcrum and load; e.g., bicep curl [1]
- Favours speed and range of motion; resistance arm is longer (MA < 1); most common type [1]', 13);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_c01', 'C.2 Motor Learning', 'SL/HL', 'short_answer', 'C', 6, 'Describe the three stages of motor learning (Fitts and Posner) and explain how feedback needs change across stages.', 'Award [1] for each valid point, up to [6]:
Cognitive stage:
- Learner tries to understand what to do; many errors; inconsistent performance [1]
- Heavy reliance on extrinsic feedback, especially KR (knowledge of results) [1]
Associative stage:
- Movements become more refined; fewer errors; greater consistency [1]
- Benefits from specific KP (knowledge of performance) to fine-tune technique [1]
Autonomous stage:
- Performance is automatic; minimal conscious thought required [1]
- Performer uses intrinsic feedback; external feedback should be selective and technical [1]', 14);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_c02', 'C.4 Stress & Coping', 'SL/HL', 'short_answer', 'C', 6, 'Compare and contrast the inverted-U hypothesis and catastrophe theory in explaining the arousal-performance relationship.', 'Award [1] for each valid point, up to [6]:
Inverted-U:
- Performance increases with arousal up to an optimal point, then gradually decreases [1]
- Predicts a symmetrical, gradual decline beyond optimum [1]
Catastrophe theory:
- When cognitive anxiety is high and arousal exceeds optimal, performance drops suddenly and dramatically [1]
- Recovery requires significant reduction in arousal before performance can be restored [1]
Contrast:
- Inverted-U predicts gradual decline; catastrophe theory predicts sudden drop [1]
- Catastrophe theory accounts for interaction between cognitive anxiety and physiological arousal [1]', 15);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_c03', 'C.3 Motivation', 'SL/HL', 'short_answer', 'C', 6, 'Explain self-determination theory and discuss how a coach can foster intrinsic motivation using this theory.', 'Award [1] for each valid point, up to [6]:
SDT explanation:
- Deci & Ryan: intrinsic motivation supported when three basic psychological needs are satisfied [1]
- Autonomy: the need for choice and control over one''s actions [1]
- Competence: the need to feel capable and effective [1]
- Relatedness: the need to feel connected to and valued by others [1]
Coaching applications:
- Offer choices in training activities, allow athletes input in decision-making [1]
- Set appropriately challenging tasks, provide positive and specific feedback [1]', 16);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_c04', 'C.3 Motivation', 'SL/HL', 'short_answer', 'C', 5, 'Discuss the role of attribution retraining in combating learned helplessness in sport.', 'Award [1] for each valid point, up to [5]:
- Learned helplessness occurs when athletes attribute failure to stable, uncontrollable factors [1]
- This leads to reduced effort, motivation, and expectation of continued failure [1]
- Attribution retraining involves changing how the athlete explains failure [1]
- Shift attributions from stable/uncontrollable to unstable/controllable (e.g., effort) [1]
- Coach uses specific feedback linking performance to controllable factors [1]', 17);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_c05', 'C.5 Psychological Skills', 'SL/HL', 'short_answer', 'C', 7, 'Describe the PETTLEP model and explain how each element can improve the effectiveness of imagery.', 'Award [1] for each valid element described, up to [7]:
- Physical: adopt the physical position/stance used in actual performance [1]
- Environment: imagine performing in the actual competition environment [1]
- Task: imagery content should match the performer''s actual task demands [1]
- Timing: imagery should be performed in real time (same speed as actual performance) [1]
- Learning: imagery content should be updated as the performer develops [1]
- Emotion: include the emotions and feelings experienced during actual performance [1]
- Perspective: use the most appropriate perspective (internal or external) for the task [1]', 18);
INSERT INTO sports_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES ('sport_wq_c06', 'C.5 Psychological Skills', 'SL/HL', 'short_answer', 'C', 5, 'Compare outcome, performance, and process goals. Explain which type of goal is most appropriate for an athlete recovering from a loss of confidence.', 'Award [1] for each valid point, up to [5]:
Goal types:
- Outcome goals: focus on competitive results (winning, beating opponents); largely outside control [1]
- Performance goals: focus on personal standards (e.g., personal best time); self-referenced [1]
- Process goals: focus on actions and techniques during performance [1]
Application to confidence loss:
- Process goals are most appropriate because they focus attention on controllable actions [1]
- Success in achieving process goals builds competence and restores confidence incrementally [1]', 19);
