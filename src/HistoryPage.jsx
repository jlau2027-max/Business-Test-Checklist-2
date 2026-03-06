import { useState, useEffect } from "react";
import { Button, TextArea, Spinner, Skeleton, Surface } from "@heroui/react";
import { fetchHistoryQuestions } from "./api/contentApi.js";
import LoginButton from "./LoginButton.jsx";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useAttemptTracker } from "./useAttemptTracker.js";
import { syncToCloud } from "./stateSync.js";

// ─── localStorage helpers ──────────────────────────────────────────────────
function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  syncToCloud(key, value);
}

// ─── Level Descriptors (Paper 2 — shared across all Paper 2 questions) ────
const LEVEL_DESCRIPTORS = `Level Descriptors (15 marks):

13-15: Responses are clearly focused, showing a high degree of awareness of the demands and implications of the question. Answers are well structured and effectively organized. Knowledge of the world history topic is accurate and relevant. Events are placed in their historical context, and there is a clear understanding of historical concepts. The examples chosen are appropriate and relevant, and are used effectively to support the analysis/evaluation. The response makes effective links and/or comparisons. The response contains clear and coherent critical analysis. There is evaluation of different perspectives, and this evaluation is integrated effectively into the answer. All, or nearly all, of the main points are substantiated, and the response argues to a consistent conclusion.

10-12: The demands of the question are understood and addressed. Answers are generally well structured and organized. Knowledge of the world history topic is mostly accurate and relevant. Events are placed in their historical context, and there is some understanding of historical concepts. The examples chosen are appropriate and relevant, and are used to support the analysis/evaluation. The response makes effective links and/or comparisons. The response contains critical analysis, which is mainly clear and coherent. There is some awareness and evaluation of different perspectives. Most of the main points are substantiated and the response argues to a consistent conclusion.

7-9: The response indicates an understanding of the demands of the question, but these demands are only partially addressed. There is an attempt to follow a structured approach. Knowledge of the world history topic is mostly accurate and relevant. Events are generally placed in their historical context. The examples chosen are appropriate and relevant. The response makes links and/or comparisons. The response moves beyond description to include some analysis or critical commentary, but this is not sustained.

4-6: The response indicates some understanding of the demands of the question. While there may be an attempt to follow a structured approach, the response lacks clarity and coherence. Knowledge of the world history topic is demonstrated, but lacks accuracy and relevance. There is a superficial understanding of historical context. The student identifies specific examples to discuss, but these examples are vague or lack relevance. There is some limited analysis, but the response is primarily narrative/descriptive in nature rather than analytical.

1-3: There is little understanding of the demands of the question. The answer is poorly structured or, where there is a recognizable essay structure, there is minimal focus on the task. Little knowledge of the world history topic is present. The student identifies examples to discuss, but these examples are factually incorrect, irrelevant or vague. The response contains little or no critical analysis. The response may consist mostly of generalizations and poorly substantiated assertions.

0: Answers do not reach a standard described by the descriptors above.`;

// ─── Level Descriptors (Paper 3 — History of Africa and the Middle East) ──
const LEVEL_DESCRIPTORS_P3 = `Level Descriptors (15 marks):

Marks   Level descriptor
13-15   Responses are clearly focused, showing a high degree of awareness of the demands and implications of the question. Answers are well structured and effectively organized. Knowledge is accurate, relevant and detailed. Events are placed in their historical context, and there is a clear understanding of historical concepts. Arguments are clearly substantiated and coherent. There is evaluation of different perspectives, and this evaluation is integrated effectively into the answer. The answer argues to a reasoned conclusion.

10-12   The demands of the question are understood and addressed. Answers are generally well structured and organized, although not always focused. Knowledge is mostly accurate and relevant. Events are generally placed in their historical context. Arguments are mainly substantiated and mostly coherent. There is some awareness and evaluation of different perspectives.

7-9     The response indicates an understanding of the demands of the question, but these demands are only partially addressed. There is an attempt to follow a structured approach. Knowledge is mostly accurate and relevant. Events are generally placed in their historical context. The response moves beyond description to include some analysis or critical commentary, but this is not sustained.

4-6     The response indicates some understanding of the demands of the question. While there may be an attempt to follow a structured approach, the response lacks clarity and coherence. Knowledge is demonstrated, but lacks accuracy and relevance. There is a superficial understanding of historical context. There is some limited analysis, but the response is primarily narrative/descriptive in nature rather than analytical.

1-3     There is little understanding of the demands of the question. The response is poorly structured or, where there is a recognizable essay structure, there is minimal focus on the task. Little knowledge is present. The response may consist mostly of generalizations and poorly substantiated assertions.

0       Answers do not reach a standard described by the descriptors above.`;

// ─── History Paper 2 Questions Data (fallback) ──────────────────────────────
const HISTORY_QUESTIONS_FALLBACK = [
  // ── Topic 1: Society and economy (750–1400) ──
  {
    id: "hist1",
    number: 1,
    topic: "Topic 1: Society and economy (750\u20131400)",
    question: "Evaluate the importance of famines and disease as causes of social and economic change.",
    marks: 15,
    markscheme: `Candidates should refer to specific examples to support their argument, drawn from within the period 750-1400. This could include specific examples of famines such as the Great Famine in Europe (1315-1317) and specific examples of disease such as the Black Death.

Candidates are not expected to discuss large numbers of famines and diseases in their response, as this could potentially lead to superficial analysis. Discussion of two specific examples can be sufficient.

Discussion of the importance of famines and disease as causes of social change may focus on aspects such as resulting demographic change, migration in search of food, increased crime, etc. Candidates may also consider elements such as the importance of famines and disease as causes of religious change - sometimes famine and disease were seen as a punishment from God, sometimes they led to increased fanaticism, and in cases such as the Black Death they led to religious persecution as various religious groups were blamed for the crisis.

Discussion of the importance of famines and disease as causes of economic change may focus on the impact for survivors, such as their labour being in higher demand. It may also focus on increased government controls on prices and exports, or the increase in looters and black market traders.

Candidates may weigh the importance of famines and disease against other causes of social and economic change, such as climate changes, crop failures, the impact of wars, the development of cities, etc.

Responses achieving marks in the top bands will provide a clear judgment on the importance of famines and disease as causes of social and economic change.`,
  },
  {
    id: "hist2",
    number: 2,
    topic: "Topic 1: Society and economy (750\u20131400)",
    question: "With reference to one religion, examine the reasons for disputes between rulers and religious leaders.",
    marks: 15,
    markscheme: `Candidates will need to examine the factors that caused disputes between rulers and religious leaders in one religion they have studied, during the period 750-1400.

Candidates should make reference to specific examples of disputes between rulers and religious leaders to support their argument, from within the period 750-1400. Such examples could include the dispute between Philip IV of France and Pope Boniface VIII or the conflict between Pope Gregory VII and Henry IV the Holy Roman Emperor. Some candidates may choose to discuss examples of individual leaders who had roles as both secular rulers and religious leaders, which is also a valid approach.

The factors discussed will depend on the specific examples the candidate chooses to examine. They may include economic factors such as taxation of the clergy, or political factors such as rulers attempting to consolidate their authority. In the medieval period the power of rulers was often limited by the competing power of groups such as religious leaders, which sometimes led to tension and conflict between rulers and religious leaders.

Candidates should explore both long-term and short-term causes of disputes between rulers and religious leaders. For example, in the case of the dispute between King Henry II of England and Thomas Becket, candidates could explore causes such as the ongoing dispute that dated back to Henry I about the ability of the king to control the Church, the individual personalities of both men, and the immediate cause of the dispute regarding which court should have jurisdiction over churchmen who committed criminal offences.

Responses achieving marks in the top bands will provide a clear judgment on what the reasons were for disputes between rulers and religious leaders in the chosen religion.`,
  },

  // ── Topic 2: Causes and effects of medieval wars (750–1500) ──
  {
    id: "hist3",
    number: 3,
    topic: "Topic 2: Causes and effects of medieval wars (750\u20131500)",
    question: '\u201cDynastic disputes lay at the heart of most medieval conflicts.\u201d To what extent do you agree with this statement?',
    marks: 15,
    markscheme: `Candidates will need to discuss the extent to which they agree with the statement that dynastic disputes lay at the heart of most medieval conflicts.

Candidates should make reference to specific examples of conflicts from within the period 750-1500 to support their argument. A wide variety of examples of conflicts could be selected, such as the War of the Roses, the Crusades, the Song-Jin wars, or the Ming-Ho war.

Candidates are not expected to discuss a large number of different conflicts within their response, as this could potentially lead to superficial analysis of those conflicts. Discussion of two specific examples can be sufficient.

Candidates may weigh dynastic disputes against other factors that could be seen to lie at the heart of most medieval conflicts. These factors will depend on the specific examples of conflicts selected for discussion, but may include factors such as the idea that many rulers acquired their positions by war and conflict and it was therefore the tradition for changes in the power structure; religious motives for certain conflicts such as the Crusades; the economic motives for conflicts - wars were often over land, which was the principal source of wealth and power in the medieval period (the "booty economy" led to the need to conquer new territories and expansionist strategies).

Responses achieving marks in the top bands will provide a clear judgment on the extent to which the candidate agrees with the statement that dynastic disputes lay at the heart of most medieval conflicts.`,
  },
  {
    id: "hist4",
    number: 4,
    topic: "Topic 2: Causes and effects of medieval wars (750\u20131500)",
    question: "Compare and contrast the military tactics used in two medieval conflicts, each chosen from a different region.",
    marks: 15,
    markscheme: `Candidates must examine the similarities and also the differences between the military tactics used in two medieval conflicts, each chosen from a different region.

Candidates must make explicit reference to two examples of conflicts from within the period 750-1500, each chosen from a different region. A wide variety of examples of conflicts may be discussed, such as the Hundred Years' War (1337-1453); the Wars of the Roses (1455-1487); the Crusades (1095-1291); the Great Abassid Civil War (809-813); the Byzantine-Seljuq Wars (1048-1308); the Tepanec War with the Aztecs (1428-1430), etc.

The military tactics discussed will depend on the specific conflicts selected for discussion, as military tactics and equipment varied widely during the period. Responses may include, for example, discussion of the role and use of cavalry, the role and use of artillery, the use of tactics from military writers, the structure of armies, the use of fortifications, the use of tunnels, etc.

Candidates must give an account of the similarities and differences between the military tactics used in two conflicts, not simply give a description of the tactics used in each individual conflict. A thematic approach is therefore likely to be more successful for this question.

Responses achieving marks in the top bands will include a clear judgment on the similarities and differences between the military tactics used in the two medieval conflicts discussed.`,
  },

  // ── Topic 3: Dynasties and rulers (750–1500) ──
  {
    id: "hist5",
    number: 5,
    topic: "Topic 3: Dynasties and rulers (750\u20131500)",
    question: "With reference to one medieval ruler, evaluate the importance of non-military methods as a means to expand and consolidate their rule.",
    marks: 15,
    markscheme: `Candidates must discuss one specific medieval ruler in their response. A wide variety of rulers could be discussed, such as 'Abd al-Rahman III of Spain, Charlemagne, Matilda, Tamerlane, Frederick I (Barbarossa), Itzcoatl, Empress Theodora, Baibars, Hongwu, etc.

Medieval rulers used a variety of non-military methods to expand and consolidate their rule. For example, rulers often established hereditary and dynastic concepts for succession and the transmission of authority.

Rulers often adopted elaborate rituals and ceremonies, for example, coronation and consecration. Their ability to manipulate a ruler's image, appropriate signs and emblems of power, ceremonies and rituals gave them an enhanced impression of authority and made rebellion more difficult.

Rulers sometimes claimed to have a special/privileged relationship with God, making rebellion against their authority more difficult. Rulers often gained the support of the religious elites and institutions, which made obedience to the king a sacred duty and rebellion a sin.

Rulers often exerted control over wealth (the circulation of capital, coinage, taxation at points of exchange and production).

The state often claimed to monopolize violence by exerting control over crime and capital punishment etc.

Responses achieving marks in the top bands will provide a clear judgment on the importance of non-military methods as a means to expand and consolidate the rule of one medieval ruler.`,
  },
  {
    id: "hist6",
    number: 6,
    topic: "Topic 3: Dynasties and rulers (750\u20131500)",
    question: "Examine the extent to which the rule of two medieval leaders can be regarded as successful.",
    marks: 15,
    markscheme: `Candidates are required to provide a critical analysis of the leadership of two medieval leaders. It is important that candidates focus their discussion on the extent to which the rule of the two leaders can be regarded as successful, rather than simply describing the rule of two medieval leaders.

A wide variety of leaders could be discussed, such as 'Abd al-Rahman III of Spain, Charlemagne, Matilda, Tamerlane, Frederick I (Barbarossa), Itzcoatl, Empress Theodora, Baibars, Hongwu.

Candidates could focus their discussion on a variety of different indicators of success. For example, they may regard factors such as political stability, economic growth or territorial expansion under the leaders as indicators of success. Alternatively they may focus on factors such as social or cultural developments under the leaders.

Candidates may elect to give an account of the similarities and differences regarding the extent to which the rule of two medieval leaders can be regarded as successful.

Responses achieving marks in the top bands will include a clear judgment on the extent to which the rule of two medieval leaders can be considered successful.`,
  },

  // ── Topic 4: Societies in transition (1400–1700) ──
  {
    id: "hist7",
    number: 7,
    topic: "Topic 4: Societies in transition (1400\u20131700)",
    question: "Examine the social impact of two scientific or technological developments from the period 1400 to 1700.",
    marks: 15,
    markscheme: `It is important with this question that candidates focus their responses explicitly on examining the social impact of two scientific or technological developments, rather than simply describing the details of the two developments.

Candidates must examine the social impact of two scientific or technological developments from within the period 1400 to 1700. There is a wide variety of developments from which the candidate may choose, such as the Gutenberg printing press (1450), developments in shipbuilding, navigational instruments and cartography, advances in medicine, the Copernican Revolution, etc.

The social impact of the developments will depend on the specific examples of developments selected for discussion. For example, a discussion of the printing press may focus on elements such as increased access to information, the role of the printing press in spreading scientific ideas, the impact of mass literacy, the impact on the elite who had previously been the only group able to access certain information, issues around censorship, the religious impact in terms of the role played by the printing press in the Reformation, etc.

Responses achieving marks in the top bands will provide a clear judgment on the social impact of two scientific or technological developments in the period 1400 to 1700.`,
  },
  {
    id: "hist8",
    number: 8,
    topic: "Topic 4: Societies in transition (1400\u20131700)",
    question: "Evaluate the importance of merchants and travellers in bringing about economic change in the period 1400 to 1700.",
    marks: 15,
    markscheme: `In this case candidates must make an appraisal of the importance of merchants and travellers in bringing about economic change in the period 1400 to 1700.

Candidates should make reference to specific examples drawn from the period 1400-1700 to support their argument. A wide range of examples could be discussed, such as the impact of Zheng He (Cheng Ho), Christopher Columbus, Vasco da Gama, etc.

It is not expected that candidates will discuss large numbers of examples in their responses, as this could potentially lead to superficial analysis. Discussion of two specific examples can be sufficient.

Merchants and travellers played a crucial role in this period in bringing about changes to the patterns of trade. They helped to bring about an increase in international trade, particularly in luxury goods such as spices. They also facilitated the movements of goods, crops and animals around the world, for example the spread of chocolate and potatoes.

The rise in merchants and travellers also helped bring about other economic changes such as the formalization of insurance companies, and new sources of wealth through the exploitation of overseas resources. This in turn brought about other economic changes, such as the rise in trade in slaves to provide the labour needed to exploit those resources.

Candidates may weigh the importance of merchants and travellers against other factors that brought about economic change in the period, such as wars, environmental factors, government policies, etc.

Responses achieving marks in the top bands will provide a clear judgment on the importance of merchants and travellers in bringing about economic change in the period.`,
  },

  // ── Topic 5: Early Modern states (1450–1789) ──
  {
    id: "hist9",
    number: 9,
    topic: "Topic 5: Early Modern states (1450\u20131789)",
    question: "Examine the relationship between religion and the state in any one Early Modern state.",
    marks: 15,
    markscheme: `Candidates will need to examine, rather than simply describe, the relationship between religion and the state, and must focus their response explicitly on one example of an Early Modern state.

Candidates may draw from a wide variety of examples, such as attempts by Early Modern states to suppress Protestantism, the Catholic Church in Latin America, etc.

Candidates may discuss examples such as the relationship between religion and the state under King Henry VIII of England, where Henry made major religious reforms and declared himself Supreme Head of the Church of England, made radical changes to the constitution of England, and used money which would have gone to the Church to increase his income.

Candidates should discuss ways in which religion supported Early Modern states as well as ways in which religion challenged Early Modern states.

Responses achieving marks in the top bands will provide a clear judgment on the relationship between religion and the state in their chosen example.`,
  },
  {
    id: "hist10",
    number: 10,
    topic: "Topic 5: Early Modern states (1450\u20131789)",
    question: "Compare and contrast the reasons for resistance or rebellion in two colonial states, each chosen from a different region.",
    marks: 15,
    markscheme: `Candidates must give an account of both the similarities and differences regarding the reasons for resistance or rebellion in two colonial states from two different regions.

Candidates should make reference to two specific examples of colonial states from different regions. Candidates may choose from a wide variety of examples of resistance/rebellion, such as the resistance to British rule in American colonies which led to the American War of Independence (1775-1783). The examples chosen for discussion must come from within the period 1450 to 1789.

The specific reasons for resistance/rebellion will depend on the specific examples of colonial states selected for discussion, and many rebellions/acts of resistance came about for a variety of interrelated reasons. Discussions are likely to focus on dissatisfaction with colonial rule, economic reasons such as dissatisfaction with heavy taxation, ideological reasons such as the growth of nationalism, a lack of respect for existing social and cultural practices by the colonial powers, or reasons such as resistance to attempts to impose a particular religion on the people in colonial states.

Candidates must give an account of the similarities and differences regarding the reasons for resistance/rebellion, not simply describe rebellions/acts of resistance in those states. A thematic approach is therefore likely to be more successful for this question.

Responses achieving marks in the top bands will include a clear judgment on the similarities and differences between the reasons for resistance or rebellion in two colonial states.`,
  },

  // ── Topic 6: Causes and effects of Early Modern wars (1500–1750) ──
  {
    id: "hist11",
    number: 11,
    topic: "Topic 6: Causes and effects of Early Modern wars (1500\u20131750)",
    question: "Compare and contrast the short-term causes of two Early Modern wars, each chosen from a different region.",
    marks: 15,
    markscheme: `Candidates must discuss both the similarities and differences between the short-term causes of two Early Modern wars, each from a different region.

Candidates should make reference to two specific examples of Early Modern wars, each from a different region. Examples may be drawn from a wide variety of wars, such as the Ethiopian-Adal War (1529-1543), Dutch War of Independence (1568-1648) or the Japanese invasions of Korea (1592-1598).

Candidates may use cross-regional wars as their examples of wars. However, they may not then use the same war in a different region in the same response.

Candidates may discuss economic causes of wars, such as inequity in resource distribution, conflict over land ownership, etc. They may discuss political causes of wars, such as ideological disputes.

It is important that candidates focus their responses explicitly on the short-term of the two wars selected for discussion, rather than simply discussing all causes.

Candidates must give an account of both the similarities and differences between the causes of two wars, not simply list the causes of two wars. A thematic approach is therefore likely to be more successful for this question.

Responses achieving marks in the top bands will include a clear judgment on the similarities and differences between the short-term causes of the two wars discussed.`,
  },
  {
    id: "hist12",
    number: 12,
    topic: "Topic 6: Causes and effects of Early Modern wars (1500\u20131750)",
    question: "Evaluate the role and importance of mercenaries in one Early Modern war.",
    marks: 15,
    markscheme: `Candidates should make an appraisal of the role and importance of mercenaries in any one war they have studied from the period 1500 to 1750.

Candidates should make explicit reference to the role and importance of mercenaries in one Early Modern war they have studied. Examples may be drawn from a wide variety of wars, such as Scottish mercenaries in the Thirty Years War, Irish soldiers ("Wild Geese") in the Dutch War of Independence, etc.

At the start of the Early Modern period mercenaries (soldiers who fight for private financial gain) often played an active role in wars, although by the end of the period there had been a move towards more national/state-focused troops.

The specific role and importance of mercenaries will depend on the specific war chosen for discussion. Some mercenaries brought with them additional expertise or tactical knowledge; for example The "Stratioti" (mercenaries from the Balkans) helped to develop cavalry tactics. Mercenaries were often expensive, so mercenaries had an important impact through the ways that rulers raised the funds to pay them. Mercenaries could be unreliable, or have issues relating to morale; Machiavelli for example argued against the use of mercenaries, arguing that they would not have the same motivation to fight.

Responses achieving marks in the top bands will provide a clear judgment on the role and importance of mercenaries in one Early Modern war.`,
  },

  // ── Topic 7: Origins, development and impact of industrialization (1750–2005) ──
  {
    id: "hist13",
    number: 13,
    topic: "Topic 7: Origins, development and impact of industrialization (1750\u20132005)",
    question: '\u201cThe availability of natural resources was the most important cause of industrialization.\u201d With reference to two countries, each chosen from a different region, to what extent do you agree with this statement?',
    marks: 15,
    markscheme: `Candidates will need to discuss the extent to which they agree with the statement that the availability of natural resources was the most important cause of industrialization. Please note that as industrialization occurred at different times in different countries, the specific time frame focused on within the overall period (1750-2005) will depend on the example countries chosen for study, and it is not expected that candidates will cover the entire time period.

Candidates should make reference to two specific countries in their answer, each from a different region. The specifics of the discussion will depend on the specific countries selected. For example, in the case of industrialization in Great Britain candidates may discuss the importance of the preceding Agricultural Revolution as a cause of industrialization, or the availability of resources such as coal.

In addition to discussing the importance of natural resources, candidates should also discuss the relative importance of other causes of industrialization, such as the availability of capital for investment. Other causes of industrialization that may be discussed include motivation and desire of key individuals, technological advances, infrastructure, political stability, etc. Candidates should weigh the relative importance of the availability of natural resources in causing industrialization against these other factors.

Responses achieving marks in the top bands will include a clear judgment on the extent to which the candidate agrees with the statement that the availability of natural resources was the most important cause of industrialization.`,
  },
  {
    id: "hist14",
    number: 14,
    topic: "Topic 7: Origins, development and impact of industrialization (1750\u20132005)",
    question: "Examine the impact of industrialization on standards of living and working conditions in one country.",
    marks: 15,
    markscheme: `Candidates must examine the impact of industrialization on standards of living and working conditions in any one country. Please note that as industrialization occurred at different times in different countries, the specific time frame focused on within the overall period (1750-2005) will depend on the example countries chosen for study, and it is not expected that candidates will cover the entire time period.

Candidates must focus their response on industrialization in any one country. It is crucial that responses do not simply describe living and working conditions in the country discussed, but instead examine critically the impact of industrialization on those conditions.

In the long term industrialization often brought about higher standards of living, but at the time standards of living often varied considerably between the high standards for the wealthy factory owners and the poor standards for workers.

Industrialization often involved urbanization, with cities struggling to cope with the large population expansion. Cities expanded quickly leading to high levels of overcrowding, poor quality of buildings, lack of sanitation, etc. Often diseases such as cholera and typhoid were common, as was air pollution and malnutrition.

Working conditions were also often extremely poor. Workers were expected to work long hours, and conditions were often dangerous. Workers endured low wages, and in some countries there was still high unemployment. Often women and children also worked. There were attempts to improve standards of living and working conditions, for example through legislation such as the 1833 Factory Act in the UK, or through workers forming trade unions.

Responses achieving marks in the top bands will provide a clear judgment on the impact of industrialization on standards of living and working conditions.`,
  },

  // ── Topic 8: Independence movements (1800–2000) ──
  {
    id: "hist15",
    number: 15,
    topic: "Topic 8: Independence movements (1800\u20132000)",
    question: "Evaluate the importance of war as a cause or catalyst for two independence movements, each chosen from a different region.",
    marks: 15,
    markscheme: `Candidates should make an appraisal of the importance of war as a cause or catalyst for two independence movements, each chosen from a different region.

Candidates must make explicit reference to two examples of independence movements, each chosen from a different region. Examples may be drawn from a wide variety of independence movements, and the relative importance of war as a cause or catalyst for those movements will vary depending on the specific examples chosen for discussion.

For example, the rise of independence movements in the 20th century was often closely associated with the two world wars which progressively weakened the image, as well as the economic and military capabilities, of metropolitan states. The wars can be seen as catalysts in promoting the desire of indigenous populations to attain the freedoms (self-determination included) for which - ostensibly at least - the victors of both wars claimed they fought. The wars not only radicalized sections of the colonized states but also provided, in some cases, the military training that was to be used in physical struggles against the colonial power in the post-1945 era (for example, Indo-China, Algeria).

The Cold War is an acceptable choice of war, and may have had the effect of encouraging superpower involvement either in support of independence or in discouraging it.

Candidates may weigh the importance of war against other factors that may be considered to be a cause or catalyst, for example: effective leadership, that is, the ability to mobilize populations on a mass basis and to attract outside attention or world opinion through propaganda or successful nationalist campaigns, was also important (for example, India). The influence of the United Nations in promoting decolonization could also be examined.

Responses achieving marks in the top bands will provide a clear judgment on the importance of war as a cause or catalyst for two independence movements.`,
  },
  {
    id: "hist16",
    number: 16,
    topic: "Topic 8: Independence movements (1800\u20132000)",
    question: '\u201cThe greatest challenges facing newly independent states were economic.\u201d With reference to one newly independent state, to what extent do you agree with this statement?',
    marks: 15,
    markscheme: `Candidates will need to discuss the extent to which they agree with the statement that the greatest challenges facing newly independent states were economic.

Candidates must make explicit reference to one newly independent state in their response. Candidates may draw from a wide variety of states, and the specifics of the challenges facing the state will depend on the state chosen for discussion.

Economic challenges discussed may include: poor infrastructure, poverty and wealth distribution, continued dependence on a colonial power, lack of industrialization.

Responses should also consider the relative importance of other factors that challenged states such as: political issues - creating political unity, new political institutions; social divisions - religious and ethnic; lack of welfare provision and education; continued influence of foreign powers.

Responses achieving marks in the top bands will include a clear judgment on the extent to which the candidate agrees with the statement that the greatest challenges facing newly independent states were economic.`,
  },

  // ── Topic 9: Evolution and development of democratic states (1848–2000) ──
  {
    id: "hist17",
    number: 17,
    topic: "Topic 9: Evolution and development of democratic states (1848\u20132000)",
    question: "Compare and contrast the conditions that encouraged the demand for democratic reform in two states, each chosen from a different region.",
    marks: 15,
    markscheme: `Candidates should examine both the similarities and differences between the conditions that encouraged the demand for democratic reform in two states, each from a different region.

Candidates must make explicit reference to two states, each chosen from a different region. Candidates may draw from a wide variety of interesting democratic states from the period, such as Lebanon, Ghana, Argentina, Mexico, India, Australia, Spain, Poland, etc.

The particular conditions that encouraged the demand for democratic reform will depend upon the specific examples chosen for discussion. Likely areas for discussion include political factors, wars, nationalism, urbanization, industrialization, education and the growth of the middle class. For example, the demand for democracy might come from a need to accommodate a growing industrial working class, or it might follow the collapse of an authoritarian regime following war or major political change. Responses may also focus on factors such as the pressure for reform from unrepresented classes.

Candidates must give an account of the similarities and differences in the conditions that encouraged the demand for democratic reform in two states, not simply describe the demand in the two states. A thematic approach is therefore likely to be more successful for this question.

Responses achieving marks in the top bands will include a clear judgment on the similarities and differences between conditions that encouraged the demand for democratic reform in the two states chosen for discussion.`,
  },
  {
    id: "hist18",
    number: 18,
    topic: "Topic 9: Evolution and development of democratic states (1848\u20132000)",
    question: '\u201cGovernment policies in democratic states rarely affect the distribution of wealth.\u201d To what extent do you agree with this statement?',
    marks: 15,
    markscheme: `Candidates will need to discuss the extent to which they agree with the statement that government policies in democratic states rarely affect the distribution of wealth.

Candidates are expected to make reference to specific examples to support their argument. It is not expected that candidates will discuss large numbers of examples in their responses, as this could potentially lead to superficial analysis. Discussion of two specific examples can be sufficient.

Discussion may focus on the means by which states could affect the distribution of wealth. Was there a progressive taxation? Did the state take responsibility for social welfare and how extensive was it? Did the state encourage ownership of land and property beyond a narrow elite?

There may be consideration of the ideological stance of the governing party(ies) and their attitude to privilege and poverty: for some governments redistribution of wealth was not an aim, let alone a priority. However, in some cases the concept of a collectivist state did encourage redistribution of wealth, and governments adopted policies accordingly.

Assessment of the impact of policies will focus on pattern of wealth distribution. What was the gap between rich and poor? Was wealth concentrated in the hands of the few? Did the welfare system manage to help the unemployed, the sick and disabled?

Responses achieving marks in the top bands will include a clear judgment on the extent to which the candidate agrees with the statement that government policies in democratic states rarely affect the distribution of wealth.`,
  },

  // ── Topic 10: Authoritarian states (20th century) ──
  {
    id: "hist19",
    number: 19,
    topic: "Topic 10: Authoritarian states (20th century)",
    question: '\u201cSuccessful foreign policy was essential for the maintenance of power by authoritarian leaders.\u201d With reference to one authoritarian leader, to what extent do you agree with this statement?',
    marks: 15,
    markscheme: `Candidates will need to discuss the extent to which they agree with the statement that successful foreign policy was essential for the maintenance of power for one authoritarian leader they have studied.

Candidates should make explicit reference to one example of an authoritarian leader. Examples may be drawn from a wide variety of leaders, such as Nyerere, Peron, Pinochet, Mao, Pol Pot, Hitler, Stalin, and Mussolini.

Candidates should examine the extent to which a successful foreign policy was essential for the maintenance of power by the authoritarian leader being discussed. For example, in the case of Nasser, "Nasserism" was built on Egypt's opposition to "imperialist influence" in the Arab world and a belief in the benefits of pan-Arab unity. Nationalism required the building of a strong state with a powerful military and a mission to defend the Arab world against imperialism and Zionism. Nasser's charismatic leadership and nationalistic foreign policy legitimized the regime and helped him to maintain power.

Candidates may also weigh successful foreign policy against other factors that could be seen as essential for the maintenance of power. For example, domestic policies could be seen to play an essential role in the maintenance of power either as much as, or in fact more than, foreign policy. For example, in the case of Hitler policies such as reducing unemployment through government infrastructure projects, or expanding the armaments industries, providing employment, income, and a rising standard of living, which increased Hitler's popularity and reduced opposition.

In addition to domestic economic policies, other factors aside from foreign policy that may be considered essential to maintaining power could include factors such as the removal of political opponents; censorship; propaganda; coercion; personal qualities and charisma; and support from key groups such as the armed forces.

Responses achieving marks in the top bands will include a clear judgment on the extent to which they agree with the statement that a successful foreign policy was essential for the maintenance of power for their chosen example.`,
  },
  {
    id: "hist20",
    number: 20,
    topic: "Topic 10: Authoritarian states (20th century)",
    question: "Compare and contrast the impact on women of the policies of two authoritarian states, each chosen from a different region.",
    marks: 15,
    markscheme: `Candidates must discuss both the similarities and differences in the impact on women of the policies of two authoritarian states, from two different regions.

Candidates must discuss two specific examples of authoritarian states, from two different regions. Examples may be drawn from a wide variety of states, such as Egypt under Nasser, Iraq under Saddam Hussein, Cuba under Castro, Haiti under Duvalier, Indonesia under Sukarno, Pakistan under Zia ul Haq, Spain under Franco, or Poland under Pilsudski.

The focus should be explicitly on similarities and differences in the impact on women of the policies of the two authoritarian states selected. Discussion may focus on areas such as whether women received improved treatment in terms of employment, education, marriage/divorce legislation and inheritance laws; whether their social, political and economic status deteriorated under the new authoritarian state due to the withdrawal of rights previously held; the extent to which ideology, as opposed to pragmatism, was present in the treatment of women, for example, in the field of employment, in the interests of literally "building" the state or during time of conflict; legal rights, etc.

Candidates must give an account of the similarities and differences in the impact on women of the policies of two authoritarian states, not simply describe the policies. A thematic approach is therefore likely to be more successful for this question.`,
  },

  // ── Topic 11: Causes and effects of 20th-century wars ──
  {
    id: "hist21",
    number: 21,
    topic: "Topic 11: Causes and effects of 20th-century wars",
    question: "Examine the role of ideology in causing two 20th-century civil wars, each chosen from a different region.",
    marks: 15,
    markscheme: `Candidates should make an appraisal of the role of ideology in causing two 20th-century civil wars, each chosen from a different region.

Candidates should refer to two specific 20th-century civil wars, each chosen from a different region. Examples may be drawn from a wide variety of civil wars, such as the Nigerian Civil War (1967-1970), the North Yemen Civil War (1962-1970), the Chinese Civil War (1927-1937 and/or 1946-1949), the Spanish Civil War (1936-1939), the Russian Civil War (1917-1922), etc.

Different ideologies could be discussed, such as communism, socialism, nationalism or fascism.

Candidates should focus on critically examining the role of ideology in causing the two wars chosen for discussion, not on simply describing the features of these ideologies.

Candidates may also discuss the role of related factors in causing the wars chosen for discussion. For example, the political, economic and social circumstances that permitted the ideologies to take hold will probably be relevant.

Candidates may also weigh the role of ideology in causing the two wars chosen for discussion against other factors that could be seen to be the cause of the wars. Ideology did play a significant role in some civil wars, whereas in others the key factors were religious, ethnic, economic or a combination thereof. It is likely, for example, that civil wars will occur in countries where there is political instability, caused by, for example, the collapse of central authority, repression or the enactment of unpopular policies. The degree to which civil war leaders exploited poverty, social division or domination by a foreign power may also be considered.

Responses achieving marks in the top bands will provide a clear judgment on the role of ideology in causing the two 20th-century civil wars being discussed.`,
  },
  {
    id: "hist22",
    number: 22,
    topic: "Topic 11: Causes and effects of 20th-century wars",
    question: "Compare and contrast the role of technology in determining the outcome of two 20th-century wars.",
    marks: 15,
    markscheme: `Candidates should discuss both the similarities and differences in the role of technology in determining the outcome of two 20th-century wars.

Examples may be drawn from a wide variety of 20th-century wars, such as the First World War, the Second World War, the Iran-Iraq War (1980-1988), the first Gulf War (1990-1991), Vietnam (1964-1975), Falklands/Malvinas War (1982), etc.

Candidates should not simply describe the role of technological developments, but should link them explicitly to their role in determining the outcome of the wars being discussed.

Technological developments could include not only weaponry, but also means of communication and reconnaissance, and the development of industrial capacity. Some developments tipped the balance of conflict, while others enabled armies to hold their own, perhaps against superior forces.

In most cases technology alone was not enough to determine the outcome of conflict: superior manpower was sometimes more important, as were the tactics used. Economic factors may come into play as countries lose the means to fight on.

Candidates must give an account of the similarities and differences in the role of technology in determining the outcome of the two wars discussed. A thematic approach is therefore likely to be more successful for this question.

Responses achieving marks in the top bands will include a clear judgment on the similarities and differences in how the role of technology determined the outcome of two 20th-century wars.`,
  },

  // ── Topic 12: The Cold War: Superpower tensions and rivalries (20th century) ──
  {
    id: "hist23",
    number: 23,
    topic: "Topic 12: The Cold War: Superpower tensions and rivalries (20th century)",
    question: "Examine the impact of the US policy of containment on superpower relations between 1947 and 1964.",
    marks: 15,
    markscheme: `Candidates must examine the impact of containment on superpower relations, rather than simply describe a narrative of key events from the period.

Candidates are expected to refer to Cold War events that demonstrate the use and impact of the US policy of containment within the timeframe of 1947-1964. The starting point of 1947 may be linked to the Truman Doctrine. The end point of 1964 would allow candidates to consider the success or failure of the application of US policy to events up to the end of the Khrushchev era.

1947 - The Truman Doctrine and the Marshall Plan. The aim of both was to prevent the spread of Communism in the immediate aftermath of the war in Europe and can be seen as having been directed against the expansion of communism in Europe. The USSR response was to revive COMINTERN renamed as COMINFORM (1947) and to criticize the Marshall Plan as "dollar imperialism". This episode worsened superpower relations and may be seen as having provoked the Czech coup of 1948.

1948 - The Berlin blockade. This may be interpreted as the use of containment to prevent Soviet efforts to achieve the removal of the US, Britain and France from Berlin. The blockade and the Allied response demonstrated that relations were hampered by suspicion and rivalry but the blockade also indicated that US containment worked as it was called off in May 1949. Furthermore, it hastened the establishment of NATO (containment) and the division of Germany into two states.

1950-1953 - The Korean War. Via the UN, the US made efforts to push back the forces of North Korea from the South and so to contain the spread of communism. How far this affected superpower relations could be interpreted in a number of different ways and candidates may include a reference to China. What became clear was that both superpowers were reluctant to escalate or to come into direct conflict.

1958-1961 - Renewed efforts by Khrushchev (urged on by Ulbricht) to remove the Allies from Berlin failed and resulted in the building of the Berlin Wall, which may be viewed as an acknowledgement that containment has worked in Berlin.

1962 - The Cuban Missile Crisis. Containment becomes brinkmanship with near dire consequences for superpower relations that are, ultimately, strengthened as a result of this near-miss of nuclear war.

Other possible examples of containment may include: the removal of President Arbenz in Guatemala in 1954; the 1953 coup in Iran; the Chinese Off-Shore Island Crises (Taiwan).

Responses achieving marks in the top bands will provide a clear judgment on the impact of the US policy of containment on superpower relations between 1947 and 1964.`,
  },
  {
    id: "hist24",
    number: 24,
    topic: "Topic 12: The Cold War: Superpower tensions and rivalries (20th century)",
    question: "Evaluate the impact on the course of the Cold War of two crises, each chosen from a different region.",
    marks: 15,
    markscheme: `Candidates should make an appraisal of the impact on the course of the Cold War of two crises, each from a different region.

Candidates must make explicit reference to two examples of Cold War crises from different regions. Candidates may use cross-regional crises as examples in their response, but may not use the same crisis in different regions as both of their examples.

Cold War crises are "flashpoints" that involve a clear escalation in Cold War tensions. Superpower involvement in the crises may be direct, or may also be indirect. Examples may be drawn from a wide variety of Cold War crises, such as the Berlin blockade (1948-1949), the Suez Crisis (1956), the Cuban Missile Crisis (1962), the Prague spring (1968), US intervention in Chile (1973), or the Soviet invasion of Afghanistan (1979).

It is important that candidates focus their response explicitly on appraising the impact of their selected crises on the course of the Cold War, rather than simply describing the major events of two crises.

Responses achieving marks in the top bands will include a clear judgment on the impact upon the course of the Cold War of two crises, each from a different region.`,
  },
];

// ─── History Paper 3 Questions Data (Africa and the Middle East, fallback) ──
const PAPER3_QUESTIONS_FALLBACK = [
  // ── The 'Abbasid dynasty (750–1258) ──
  { id: "p3q1", number: 1, topic: "The \u2018Abbasid dynasty (750\u20131258)", question: "Discuss the extent to which military power was responsible for the defeat of the Umayyads by the \u2018Abbasids.", marks: 15, markscheme: `The focus of this question is on reasons for the defeat of the Umayyads, not the rise of the Abbasids. Candidates should discuss the extent to which military power was responsible, and consider other factors.

Points discussed may include: the Abbasid revolution was in part a military campaign, but success depended on broad-based support including Shia groups, non-Arab Muslims (mawali), and discontented groups in Khurasan; the role of Abu Muslim in organizing the revolution; Umayyad weaknesses including internal rivalries, over-extension, alienation of non-Arab Muslims, and fiscal problems; the Battle of the Zab (750) as a decisive military encounter; the extent to which political and religious propaganda was as important as military force.

Responses achieving marks in the top bands will provide a clear judgment on the extent to which military power was responsible for the defeat of the Umayyads.` },
  { id: "p3q2", number: 2, topic: "The \u2018Abbasid dynasty (750\u20131258)", question: "Evaluate the political and cultural achievements of the first century of \u2018Abbasid rule.", marks: 15, markscheme: `The focus is on the political and cultural achievements in the first century of Abbasid rule (roughly 750-850).

Points discussed may include: the move of the capital to Baghdad and its significance; the development of a more inclusive, cosmopolitan empire; the establishment of an effective administrative system drawing on Persian traditions; the golden age of Islamic culture including the House of Wisdom (Bayt al-Hikma), translation movement, advances in science, mathematics, medicine and philosophy; patronage of arts and learning under caliphs such as Harun al-Rashid and al-Ma'mun; the development of Islamic law and theology; trade networks and economic prosperity. Candidates may also discuss limitations such as political instability, the growing power of Turkish military elites, and regional fragmentation.

Responses achieving marks in the top bands will provide a clear judgment on the political and cultural achievements of the first century of Abbasid rule.` },

  // ── The Fatimids (909–1171) ──
  { id: "p3q3", number: 3, topic: "The Fatimids (909\u20131171)", question: "Examine the ideological and cultural impact of the Fatimid dynasty.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the ideological and cultural impact of the Fatimid dynasty.

Points discussed may include: the Fatimids as an Ismaili Shia dynasty and their challenge to Sunni Abbasid authority; the establishment of Cairo as a center of learning (Al-Azhar mosque/university); the promotion of Ismaili ideology through da'wa (missionary) networks; religious tolerance towards Sunnis, Christians and Jews under most Fatimid rulers; cultural achievements in architecture, art, and scholarship; the role of trade in spreading Fatimid cultural influence; the impact on the wider Islamic world.

Responses achieving marks in the top bands will provide a clear judgment on the ideological and cultural impact of the Fatimid dynasty.` },
  { id: "p3q4", number: 4, topic: "The Fatimids (909\u20131171)", question: "To what extent were internal factors, rather than external threats, responsible for the collapse of the Fatimid dynasty?", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the relative importance of internal versus external factors in the collapse of the Fatimid dynasty.

Points discussed may include: internal factors such as succession disputes, the growing power of military commanders (especially Turkish and Armenian), administrative corruption, economic decline, and the erratic rule of al-Hakim; external factors such as the Crusades and the loss of territory, Seljuk Turkish expansion, and the rise of Saladin and the Ayyubids; the role of Saladin in finally ending Fatimid rule in 1171; the interaction between internal weaknesses and external pressures.

Responses achieving marks in the top bands will provide a clear judgment on the extent to which internal factors were responsible for the collapse of the Fatimid dynasty.` },

  // ── The Crusades (1095–1291) ──
  { id: "p3q5", number: 5, topic: "The Crusades (1095\u20131291)", question: "Examine the extent to which religious ideology was the main motive for the Crusades.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the extent to which religious ideology was the main motive for the Crusades.

Points discussed may include: the role of Pope Urban II and the idea of holy war/pilgrimage; the promise of spiritual rewards (indulgences, remission of sins); genuine religious fervor and the desire to recover Jerusalem; other motives such as economic opportunities (trade, land, wealth), political motives (papal authority, Byzantine requests for help), social factors (younger sons seeking fortunes, escape from feudal obligations), and the spirit of adventure; the extent to which motives varied between different Crusades and different participants.

Responses achieving marks in the top bands will provide a clear judgment on the extent to which religious ideology was the main motive for the Crusades.` },
  { id: "p3q6", number: 6, topic: "The Crusades (1095\u20131291)", question: "Evaluate the impact of the Crusades on the Islamic world.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case an evaluation of the impact of the Crusades on the Islamic world.

Points discussed may include: military impact including the loss and recovery of territory; political impact such as the unification of Muslim forces under leaders like Nur al-Din and Saladin; economic impact including disruption and stimulation of trade; cultural exchange including transfer of knowledge, technology and ideas; the relatively limited long-term impact on the Islamic world compared to the impact on Europe; the psychological impact and the concept of jihad; demographic changes in the region.

Responses achieving marks in the top bands will provide a clear judgment on the impact of the Crusades on the Islamic world.` },

  // ── The Ottomans (1281–1566) ──
  { id: "p3q7", number: 7, topic: "The Ottomans (1281\u20131566)", question: "Discuss the significance of the fall of Constantinople (1453) for the Ottoman Empire.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the significance of the fall of Constantinople for the Ottoman Empire.

Points discussed may include: the strategic and symbolic importance of Constantinople; the transformation of the city into the Ottoman capital Istanbul; the impact on trade routes and Ottoman control of east-west commerce; the psychological impact on both the Muslim and Christian worlds; the consolidation of Ottoman power in southeastern Europe; the development of Istanbul as a cultural and administrative center; the impact on the balance of power in the eastern Mediterranean; the flight of Greek scholars to the West and its contribution to the Renaissance.

Responses achieving marks in the top bands will provide a clear judgment on the significance of the fall of Constantinople for the Ottoman Empire.` },
  { id: "p3q8", number: 8, topic: "The Ottomans (1281\u20131566)", question: "Evaluate the contribution of either Selim I or Suleiman I to the Ottoman Empire.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the contribution of either Selim I or Suleiman I.

For Selim I: the conquest of Egypt and the Hejaz; defeat of the Safavids at Chaldiran (1514); expansion of the empire into the Arab world; assumption of the title of Caliph; control of holy cities of Mecca, Medina and Jerusalem.

For Suleiman I: military conquests in Europe (Belgrade, Rhodes, Hungary, siege of Vienna); legal reforms (Kanuni - the Lawgiver); administrative developments; patronage of arts, architecture and literature; the golden age of Ottoman culture; naval power in the Mediterranean; limitations and challenges during his reign.

Responses achieving marks in the top bands will provide a clear judgment on the contribution of the chosen ruler to the Ottoman Empire.` },

  // ── Trade and the rise and decline of African states and empires (800–1600) ──
  { id: "p3q9", number: 9, topic: "Trade and the rise and decline of African states and empires (800\u20131600)", question: "Examine the reasons for the decline of the Ghana Empire.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the reasons for the decline of the Ghana Empire.

Points discussed may include: the Almoravid attacks and their impact on trade; the loss of control over gold and salt trade routes; internal political instability and succession disputes; environmental factors such as drought and desertification; the rise of competing states such as Mali; the breakaway of subject peoples; the role of Islam in undermining traditional political structures; economic decline as trade routes shifted.

Responses achieving marks in the top bands will provide a clear judgment on the reasons for the decline of the Ghana Empire.` },
  { id: "p3q10", number: 10, topic: "Trade and the rise and decline of African states and empires (800\u20131600)", question: "Compare and contrast the role of trade in the development of the Mali Empire and the Kingdom of Kongo.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case a comparison and contrast of the role of trade in the development of Mali and Kongo.

Points discussed may include: Mali's control of trans-Saharan trade routes (gold, salt, copper); Mansa Musa's pilgrimage and its demonstration of Mali's wealth; Kongo's trade networks including regional trade and later Portuguese contact; the different types of goods traded; the impact of trade on political structures, urbanization, and cultural development in each state; the role of Islam in facilitating Mali's trade versus Christianity's later role in Kongo; the vulnerability of each state's economy to external disruption.

Candidates must give an account of both similarities and differences. A thematic approach is therefore likely to be more successful.

Responses achieving marks in the top bands will provide a clear judgment on the similarities and differences in the role of trade in the development of Mali and Kongo.` },

  // ── Pre-colonial African states (1800–1900) ──
  { id: "p3q11", number: 11, topic: "Pre-colonial African states (1800\u20131900)", question: "Examine the achievements of Tewodros II and Yohannes IV in the modernization of Ethiopia.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the achievements of Tewodros II and Yohannes IV in modernizing Ethiopia.

Points discussed may include: Tewodros II's attempts to unify Ethiopia, reduce the power of regional lords, modernize the army, reform taxation, and his efforts to establish diplomatic relations with European powers; his road-building program and attempts to create a centralized state; Yohannes IV's continuation of centralization efforts, his military achievements against Egyptian and Mahdist threats, his diplomatic skills, and his attempts to maintain Ethiopian independence; the limitations and challenges faced by both rulers; the extent to which their modernization efforts were successful.

Responses achieving marks in the top bands will provide a clear judgment on the achievements of Tewodros II and Yohannes IV in the modernization of Ethiopia.` },
  { id: "p3q12", number: 12, topic: "Pre-colonial African states (1800\u20131900)", question: "Compare and contrast the leadership and achievements of Moshoeshoe I and Shaka Zulu.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case a comparison and contrast of Moshoeshoe I and Shaka Zulu.

Points discussed may include: Shaka's military innovations (the short stabbing spear, the bull-horn formation), his creation of a powerful centralized Zulu state, the Mfecane/Difaqane and its widespread impact; Moshoeshoe's diplomatic skills, his ability to unite diverse groups, his use of natural defenses (Thaba Bosiu), his diplomatic engagement with Europeans and missionaries; comparison of their leadership styles (military vs diplomatic), their state-building achievements, and their legacies; the impact of each leader on southern African history.

Candidates must give an account of both similarities and differences.

Responses achieving marks in the top bands will provide a clear judgment on the similarities and differences between Moshoeshoe I and Shaka Zulu.` },

  // ── The slave trade in Africa and the Middle East (1500–1900) ──
  { id: "p3q13", number: 13, topic: "The slave trade in Africa and the Middle East (1500\u20131900)", question: "Examine the social and economic impact of the slave trade on any two African societies.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the social and economic impact of the slave trade on two African societies.

Points discussed may include: demographic impact (loss of young, productive population); social disruption including increased warfare, kidnapping, and insecurity; the transformation of political structures as some states became heavily involved in slave trading; economic effects including the development of a trade-dependent economy, the introduction of European goods, the disruption of local industries; the impact on gender relations as more men were taken than women; the psychological and cultural impact; regional variations in the impact of the slave trade.

Responses achieving marks in the top bands will provide a clear judgment on the social and economic impact of the slave trade on the two chosen African societies.` },
  { id: "p3q14", number: 14, topic: "The slave trade in Africa and the Middle East (1500\u20131900)", question: "To what extent were economic factors responsible for the decline of the slave trade?", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the extent to which economic factors were responsible for the decline of the slave trade.

Points discussed may include: economic factors such as the Industrial Revolution reducing the need for slave labor, the development of "legitimate" commerce (palm oil, groundnuts), the economic arguments against slavery; other factors such as the humanitarian/abolitionist movement (Wilberforce, Clarkson), the role of religion (Quakers, Evangelical Christians), slave resistance and revolts (Haiti), political factors including British naval enforcement, international treaties and agreements; the role of former slaves in the abolition movement; the gradual nature of abolition and the persistence of slavery in various forms.

Responses achieving marks in the top bands will provide a clear judgment on the extent to which economic factors were responsible for the decline of the slave trade.` },

  // ── European imperialism and the partition of Africa (1850–1900) ──
  { id: "p3q15", number: 15, topic: "European imperialism and the partition of Africa (1850\u20131900)", question: "Examine the reasons for the increased European interest in Africa in the second half of the 19th century.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the reasons for increased European interest in Africa.

Points discussed may include: economic motives (new markets, raw materials, investment opportunities); strategic/political motives (national prestige, rivalry between European powers, the "scramble for Africa"); the role of explorers and missionaries in opening up the interior; technological advantages (quinine, steamships, weapons); the Berlin Conference (1884-1885) and the formalization of partition; ideological justifications such as the "civilizing mission" and Social Darwinism; the role of individuals such as Cecil Rhodes, Leopold II, and Bismarck.

Responses achieving marks in the top bands will provide a clear judgment on the reasons for increased European interest in Africa.` },
  { id: "p3q16", number: 16, topic: "European imperialism and the partition of Africa (1850\u20131900)", question: "To what extent were weaknesses within Africa responsible for European colonization?", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the extent to which weaknesses within Africa were responsible for European colonization.

Points discussed may include: internal factors such as political fragmentation, inter-state rivalries, lack of military technology comparable to Europeans, the impact of the slave trade in weakening African societies, the role of African intermediaries and collaborators; external factors such as European technological superiority (weapons, medicine, transport), the organized nature of European imperialism, the Berlin Conference, economic motivations; the balance between internal and external factors varied across the continent.

Responses achieving marks in the top bands will provide a clear judgment on the extent to which weaknesses within Africa were responsible for European colonization.` },

  // ── Response to European imperialism (1870–1920) ──
  { id: "p3q17", number: 17, topic: "Response to European imperialism (1870\u20131920)", question: "Evaluate the reasons for the success of Menelik II in maintaining Ethiopian independence.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the reasons for Menelik II's success in maintaining Ethiopian independence.

Points discussed may include: Menelik's diplomatic skills in playing European powers against each other; the Treaty of Wuchale (1889) and the dispute over its interpretation; military modernization including the acquisition of European weapons; the decisive victory at the Battle of Adwa (1896); the unification of Ethiopian territories under central authority; Ethiopia's geographical advantages (mountainous terrain); the role of Ethiopian nationalism and a long tradition of independence; the international context and European rivalries that limited Italian ambitions.

Responses achieving marks in the top bands will provide a clear judgment on the reasons for Menelik II's success.` },
  { id: "p3q18", number: 18, topic: "Response to European imperialism (1870\u20131920)", question: "Examine the nature and effectiveness of Kabaka Mwanga's resistance to European imperialism in Uganda.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the nature and effectiveness of Kabaka Mwanga's resistance to European imperialism.

Points discussed may include: the context of European (particularly British) interest in Uganda; Mwanga's initial resistance to foreign influence including the persecution of Christian converts (the Uganda Martyrs); the complex political situation involving religious factions (Catholic, Protestant, Muslim) within Buganda; Mwanga's shifting alliances and attempts to play different groups against each other; the 1897 rebellion against British control; the ultimate failure of his resistance and his exile; the reasons for the failure including internal divisions, military weakness relative to British forces, and the lack of external support.

Responses achieving marks in the top bands will provide a clear judgment on the nature and effectiveness of Mwanga's resistance.` },

  // ── Africa under colonialism (1890–1980) ──
  { id: "p3q19", number: 19, topic: "Africa under colonialism (1890\u20131980)", question: "Examine the impact of Portuguese colonial rule on either Angola or Mozambique.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the impact of Portuguese colonial rule on either Angola or Mozambique.

Points discussed may include: the exploitative nature of Portuguese colonialism including forced labor (chibalo/contract labor), racial discrimination, lack of educational opportunities for Africans, economic exploitation of resources, the assimilado system and its limited social mobility; the role of the Catholic Church; the impact on traditional social structures; the economic underdevelopment of the colony for the benefit of Portugal; the comparison with other colonial systems; the long duration of Portuguese colonialism and its late end (1975); the legacy of Portuguese colonialism for post-independence challenges.

Responses achieving marks in the top bands will provide a clear judgment on the impact of Portuguese colonial rule.` },
  { id: "p3q20", number: 20, topic: "Africa under colonialism (1890\u20131980)", question: "Evaluate the effectiveness of indirect rule in Nigeria.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the effectiveness of indirect rule in Nigeria.

Points discussed may include: the theory and practice of indirect rule as developed by Lord Lugard; its implementation in Northern Nigeria through existing emirate structures; its relative success in areas with existing centralized political structures; its failure or difficulties in areas without existing hierarchies (such as southeastern Nigeria and the Igbo); the Aba Women's Riots (1929) as an example of resistance to imposed indirect rule structures; the creation of artificial chiefs (warrant chiefs); the impact on traditional political systems; the economic aspects of indirect rule; its role in creating or reinforcing ethnic divisions; the extent to which indirect rule served British interests while claiming to preserve African institutions.

Responses achieving marks in the top bands will provide a clear judgment on the effectiveness of indirect rule in Nigeria.` },

  // ── 20th-century nationalist and independence movements in Africa ──
  { id: "p3q21", number: 21, topic: "20th-century nationalist and independence movements in Africa", question: "Discuss the causes and consequences of the Mau Mau uprising in Kenya.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the causes and consequences of the Mau Mau uprising.

Points discussed may include: causes such as land alienation (the White Highlands), racial discrimination, limited political representation for Africans, squatter labor system, urbanization and unemployment, the failure of constitutional methods (KAU), and the influence of WWII veterans; the nature of the uprising including the declaration of a state of emergency (1952), detention camps, forest fighters, the role of the Kikuyu community; consequences including the military defeat of Mau Mau but the acceleration of political reform, the Lyttelton Constitution, Lancaster House conferences, and ultimately independence in 1963; the debate over whether Mau Mau accelerated or delayed independence; the role of Jomo Kenyatta.

Responses achieving marks in the top bands will provide a clear judgment on the causes and consequences of the Mau Mau uprising.` },
  { id: "p3q22", number: 22, topic: "20th-century nationalist and independence movements in Africa", question: "Evaluate the role played by individual leaders in the achievement of independence in any two African countries.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the role of individual leaders in achieving independence in two African countries.

Points discussed may include: the choice of leaders and countries (e.g., Nkrumah/Ghana, Kenyatta/Kenya, Nyerere/Tanzania, Mandela/South Africa, Lumumba/Congo, Senghor/Senegal, etc.); the specific contributions of each leader in terms of political organization, mobilization of popular support, ideology, diplomacy; the balance between the role of individuals and broader structural factors (economic changes, international context, colonial policies, pan-Africanism); the methods used (constitutional, militant, diplomatic); the challenges faced by each leader.

Responses achieving marks in the top bands will provide a clear judgment on the role played by individual leaders in the achievement of independence.` },

  // ── The Ottoman Empire (c1800–1923) ──
  { id: "p3q23", number: 23, topic: "The Ottoman Empire (c1800\u20131923)", question: "Examine the aims and impact of the Tanzimat reforms on the Ottoman Empire.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the aims and impact of the Tanzimat reforms.

Points discussed may include: the context of Ottoman decline and the need for reform; the Hatt-i Sharif of Gulhane (1839) and the Hatt-i Humayun (1856); aims including modernization of the military, legal and educational systems, equality for all Ottoman subjects regardless of religion, centralization of administration; the impact on different groups within the empire; resistance to reform from conservative elements; the limited success of reforms in preventing the empire's decline; the influence of European models; the relationship between the Tanzimat and later reform movements including the Young Ottomans and Young Turks.

Responses achieving marks in the top bands will provide a clear judgment on the aims and impact of the Tanzimat reforms.` },
  { id: "p3q24", number: 24, topic: "The Ottoman Empire (c1800\u20131923)", question: "Examine the reasons for the decline of the Ottoman Empire in the first half of the 19th century.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the reasons for the decline of the Ottoman Empire in the first half of the 19th century.

Points discussed may include: internal problems such as nationalist agitation within the empire, which led to Greek independence in 1831, loss of territory such as Egypt and constant unrest in areas such as Bulgaria; difficulty in implementing reforms because of the resistance of traditional elements; financial weakness; weak sultans; internationally the frequent intervention of the other major powers highlighted the weakness of the empire (Crimea, Russo/Turkish War, Congress of Berlin, etc) and contributed to continuing decline.

Responses achieving marks in the top bands will provide a clear judgment on the reasons for the decline of the Ottoman Empire in the first half of the 19th century.` },

  // ── War and change in the Middle East and North Africa 1914–1945 ──
  { id: "p3q25", number: 25, topic: "War and change in the Middle East and North Africa 1914\u20131945", question: "To what extent did ineffective Allied diplomacy in the Middle East during the First World War lead to instability in the region?", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the extent to which ineffective Allied diplomacy in the Middle East during the First World War lead to instability in the region.

Points discussed may include: key diplomatic events such as Hussein-McMahon, Sykes-Picot, Balfour Declaration; areas to consider could include the contradictory promises to Jews and Arabs over Palestine which made the British mandate difficult to govern; reasonable relations between the British and the rulers in Iraq and Transjordan could be cited as a counter-argument, especially as Iraq gained independence in 1932; diplomacy could include the final establishments of mandates at San Remo (1920) and comments could then be made regarding levels of Jewish immigration to Palestine, which contributed to tensions; candidates may discuss other factors which caused instability in the region at the time, such as underlying economic and religious issues.

Responses achieving marks in the top bands will provide a clear judgment on the extent to which ineffective Allied diplomacy in the Middle East during the First World War led to instability in the region.` },
  { id: "p3q26", number: 26, topic: "War and change in the Middle East and North Africa 1914\u20131945", question: "Evaluate Ataturk's impact on Turkish society.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case, an evaluation of Ataturk's impact on Turkish society.

Points discussed may include: Mustapha Kemal Ataturk (1881-1938) assumed the patronymic Ataturk, meaning "Father of the Turks" in 1934, when he wished all Turkish families to adopt Western-style surnames; as president, Ataturk sought to modernize and secularize Turkey, and to modernize and develop the Turkish economy; Ataturk introduced a new constitution establishing equal rights and eventually (in 1934) universal suffrage, and encouraged Western dress. The introduction of civil law and the abolition of the Caliphate were all designed to reduce the influence of religion, as was banning the fez and the chador; other developments such as the development of industry such as textiles, improvements in education, and the introduction of the Roman alphabet could also be commented on. Candidates may also discuss how he fostered national pride in Turkey rather than Islam; possible limits on his impact: the Sultanate was replaced by a dictatorial regime with one party (RPP) dominating. Islam continued to have a major influence, particularly in rural areas. Economic developments tended to be limited to urban areas and educational improvements were also slower in rural areas. There was a clear divide between the urban modern society and traditional rural society.

Responses achieving marks in the top bands will provide a clear judgment on the impact Ataturk had on Turkish society.` },

  // ── Africa, international organizations and the international community (20th century) ──
  { id: "p3q27", number: 27, topic: "Africa, international organizations and the international community (20th century)", question: "Discuss the role played by the Abyssinian Crisis in the failure of the League of Nations.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case a discussion of the role played by the Abyssinian Crisis in the failure of the League of Nations.

Points discussed may include: the League gave an opportunity to Haile Silassie to put his case before them; Italy was condemned by the League of Nations and asked to withdraw their troops from Abyssinia. Despite imposing economic sanctions on Italy, oil was not one of the items included in the sanctions; one reason why the League of Nations sanctions failed was because non League members such as the US continued trading with Italy; the foreign ministers of both Britain and France drew up a plan which gave out two thirds of Abyssinia to Italy. This plan led to an outcry against the League of Nations; in the end, Italy was able to occupy Abyssinia, proving that the League of Nations had failed; this crisis led to many countries losing faith in the League of Nations in being able to assist them against aggressors and from here on the League was not taken seriously; Abyssinia played an important role in the ultimate failure of the League of Nations, but candidates may also consider other factors that also contributed to its failure.

Responses achieving marks in the top bands will provide a clear judgment on the role played by the Abyssinian Crisis in the failure of the League of Nations.` },
  { id: "p3q28", number: 28, topic: "Africa, international organizations and the international community (20th century)", question: '\u201cThe East African Community (EAC) was more of a success than a failure in the 20th century.\u201d To what extent do you agree with this statement?', marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question. In this case, the extent to which the candidate agreed with the claim that the East African Community was more of a success than a failure in the 20th century. Candidates should discuss clear and specific examples of successes and failures, and success may be interpreted in a variety of ways such as cultural, social, economic and political.

Points discussed may include: Success: the role the East African Community played in encouraging trade among member states; improved means of transport and communication among the member countries; increased cultural exchange between member states; education benefits with members being able to receive education in any of the three countries involved. Failure: the disparity in development between the member states which eventually led to the collapse of the organization; the lack of economic unity among the East African countries; the differences between the leaders of the East African countries.

Responses achieving marks in the top bands will provide a clear judgment on the extent to which the candidate agrees with the claim that the East African Community was more of a success than a failure in the 20th century.` },

  // ── Developments in South Africa 1880–1994 ──
  { id: "p3q29", number: 29, topic: "Developments in South Africa 1880\u20131994", question: '\u201cThe Boers lost the war but won the peace.\u201d To what extent do you agree with this statement about the South African War (1899\u20131902)?', marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the extent to which the candidate agrees with the claim that "the Boers lost the war but won the peace" in the South African War of 1899 to 1902.

Points discussed may include: despite their resistance, the Boers found themselves in dire circumstances at the end of the war. Following two years of guerrilla warfare, the Boers surrendered following the scorched earth policies of the British which destroyed their land and forced hundreds of thousands of women and children into concentration camps; the Treaty of Vereeniging of 1902 was a very generous peace. Although the two republics were annexed, they were promised self-government in the near future. Following Milner's abortive policies of Anglicization, further reconciliation was promoted as the English and Dutch languages were given equal legal status. Measures were taken to rebuild the shattered South African economy and Boer political parties like Het Volk and Orangie Unie were legalized. The Transvaal and Orange Free State became self-governing in 1907; however, the country was already moving towards greater economic and political integration. Ultimately, it was recognition of the common interest of wealthy Boer farmers and Anglophone capitalists of need for a plentiful supply of cheap and pliable African labour that accelerated moves to unify the country; the Union of South Africa came into existence in 1910 with whites-only elections resulting in victory for Botha and Smuts's South African Party (SAP); candidates may also argue that the preferred policies of the Afrikaners - segregation and white domination - were pursued by the SAP government.

Responses achieving marks in the top bands will provide a clear judgment on the extent to which the candidate agrees with the claim.` },
  { id: "p3q30", number: 30, topic: "Developments in South Africa 1880\u20131994", question: "Examine the reasons for, and the effects of, the radicalization of resistance to the apartheid system in South Africa.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case both the reasons for, and the effects of, the radicalization of resistance to the apartheid system in South Africa.

Points discussed may include: the raft of apartheid laws passed by the new National Party government after 1948 had the effect of intensifying discrimination of the majority black population at the hands of the white minority, and played an important role in the radicalization of resistance to the apartheid system. For example: the Immorality Act of 1950; the Reservation of Separate Amenities Act of 1953; the Population Registration Act of 1950; the Group Areas Act of 1950 and the Bantu Authorities Act of 1951 together made residential separation compulsory; the Promotion of Bantu Self-Government Act of 1959; the Bantu Education Act of 1953; the brutal suppression by the authorities including the arrests and treason trials of ANC leaders, banning and banishing orders, the Sharpeville Massacre and the decision to ban the ANC; the frustration felt by a new generation of leaders in the ANC resulted in a radicalization through its youth wing, the Defiance Campaign, the Congress of the People, bus boycotts, and eventually through armed struggle; the emergence of other resistance movements such as the Pan Africanist Congress (PAC), Black Consciousness and the United Democratic Front (UDF), and the international boycott of the apartheid economy; the ultimate effect was the dismantling of the apartheid system in the 1980s and the ending of white minority rule in 1994.

Responses achieving marks in the top bands will provide a clear judgment on the reasons for, and effects of, the radicalization of resistance to the apartheid system in South Africa.` },

  // ── Social and cultural developments in Africa in the 19th and 20th centuries ──
  { id: "p3q31", number: 31, topic: "Social and cultural developments in Africa in the 19th and 20th centuries", question: "Examine the factors that promoted and those that inhibited the spread of Christianity in Africa in the 19th and 20th centuries.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the factors that both promoted and inhibited the spread of Christianity in Africa in the 19th and 20th centuries.

Points discussed may include: the role played by various Christian societies in promoting the spread of Christianity; the role played by the establishment of missionary centres many of which included a church, school, hospital etc in promoting the spread of Christianity; the role played by African leaders who embraced the Christian faith due to the benefits they gained from the missionaries in promoting the spread of Christianity; factors such as the existence of Islam and/or the role of tradition, culture and religion in inhibiting the spread of Christianity; the role played by poor means of transportation in inhibiting the spread of Christianity; the fear of hostile communities in inhibiting the spread of Christianity; the fear of diseases such as malaria, which hindered missionary movement into the interior of Africa.

Responses achieving marks in the top bands will provide a clear judgment on the factors that promoted and inhibited the spread of Christianity in Africa in the period.` },
  { id: "p3q32", number: 32, topic: "Social and cultural developments in Africa in the 19th and 20th centuries", question: "Discuss the impact of immigration and emigration on any two African countries in the 19th and 20th centuries.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case a discussion of the impact of both immigration and emigration in any two African countries in the 19th and 20th centuries.

Points discussed may include: candidates must clearly identify the two countries they have selected to discuss. The specific impact of immigration and emigration on each country will depend upon the examples chosen for discussion; discussion of the impact of immigration could include the development of tensions/animosity between the newcomers and the original inhabitants of the country; candidates may discuss how immigration has led to cultural exchange and mixing, including cross-cultural marriages; candidates may discuss the economic impact of immigration; for example, in some cases immigration may increase the availability of cheap labour, or immigration may add to the talent pool and contribute economic benefits to the country; in some cases immigrants may have played a role in contributing to political upheaval in a country; discussion of emigration may focus on the economic effects, for example, "brain drain", or loss of human resources which may adversely affect the economy; candidates may discuss the social impact of emigration such as separation of families, or the death of many emigrants in the process of moving to a new country.

Responses achieving marks in the top bands will provide a clear judgment on the impact of immigration and emigration on the two countries chosen for discussion.` },

  // ── Post-war developments in the Middle East (1945–2000) ──
  { id: "p3q33", number: 33, topic: "Post-war developments in the Middle East (1945\u20132000)", question: "Compare and contrast the economic and social policies of Nasser and Sadat in Egypt.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case discussion of the similarities and differences in both the economic and social policies of Nasser and Sadat in Egypt.

Points discussed may include: Comparison: both Nasser (1918-1970) and Sadat (1918-1981) realized that the Egyptian economy was weak, and tried to improve it; in both cases Egypt remained poor in spite of their efforts; both of their economic policies were affected by political considerations. As their economic policies differed considerably, candidates will probably find more to contrast, than compare; Contrast: Nasser's policies were socialist. He nationalized the Suez Canal, guaranteed employment in the public sector, nationalized industries, sought to redistribute land, and aimed at self-sufficiency. He introduced free education, and to a certain extent did champion the middle class, but his most important economic policy was probably the Aswan Dam; Contrast: Sadat tried to distance himself from Nasser's policies with his "open door" policy. He did consolidate the public sector, but allowed private sector growth, some capitalist measures related to a "free market economy". The continued closure of the Suez Canal caused revenue losses. Sadat encouraged foreign trade, but this caused a trade deficit, and exports fell. A new upper class of merchants developed and inflation increased; candidates must give an account of the similarities and differences in economic and social policies of the two leaders, not simply give a description of the two sets of policies. Thematic approaches are therefore likely to be more successful than end-on comparisons.

Responses achieving marks in the top bands will include a clear judgment on the similarities and differences between the economic and social policies of Nasser and Sadat in Egypt.` },
  { id: "p3q34", number: 34, topic: "Post-war developments in the Middle East (1945\u20132000)", question: "Evaluate the importance of religious factors in causing the outbreak of the Lebanese Civil War in 1975.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question; in this case the importance of religious factors in causing the outbreak of the Lebanese Civil War in 1975.

Points discussed may include: complex religious situation in Lebanon with Sunni Muslims, Shia Muslims and Maronite Christians; escalating sectarian violence in 1975; the Bus Massacre; it could be argued that it is impossible to separate religious and political factors because of the confessional nature of the state, with the president always a Maronite and the prime minister a Sunni and the allocation of cabinet posts being proportional on a confessional basis. The emergence of the militias on confessional lines was also a key factor; candidates may also consider the relative importance of other factors in causing the outbreak of the war, for example: the influx of Palestinian refugees after Black September, which upset the delicate balance of Lebanese society; militarization of the Palestinian refugee population; arrival of PLO forces; candidates may also discuss economic factors that contributed to the instability, such as economic disparity, and the fact that movement into the cities, especially Beirut, because of increasing tensions with Israel, led to an increasingly poor urban group who became attracted to the militias.

Responses achieving marks in the top bands will include a clear judgment on the importance of religious factors in causing the outbreak of the Lebanese Civil War in 1975.` },

  // ── Post-independence politics in Africa to 2005 ──
  { id: "p3q35", number: 35, topic: "Post-independence politics in Africa to 2005", question: '\u201cEconomic problems after independence were the main cause of civil war.\u201d With reference to one civil war you have studied, to what extent do you agree with this statement?', marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question. In this case, candidates must clearly identify one civil war from the region to discuss as an example, and must reach a clear judgment on the extent to which they agree that economic problems after independence, rather than other factors, were the main cause of the civil war.

Points discussed may include: the specific causes of the civil war will depend on the example chosen for discussion. Popular countries chosen for discussion are likely to be Angola, Burundi, Chad, Congo, Rwanda, Liberia, Nigeria, Sierra Leone, Somalia, Sudan, Uganda and Mozambique; economic causes such as economic marginalization of some communities may be discussed as a cause of civil wars; the need to control trade and economic activities by specific communities may also have contributed to civil war; candidates may discuss the importance of land issues as a cause of civil wars, or may discuss conflicts caused by fights over resources such as diamonds, oil etc; candidates may also discuss a range of other factors which could be regarded as the main cause of civil war, such as ethnic/tribal and religious differences, the role of political coups, bad governance and political inequalities, lack of political freedom for some groups in the chosen communities.

Responses achieving marks in the top bands will include a clear judgment on extent to which they agree that economic problems after independence, rather than other factors, were the main cause of the civil war.` },
  { id: "p3q36", number: 36, topic: "Post-independence politics in Africa to 2005", question: "Compare and contrast the factors that led to the return to multi-party democracy in two countries.", marks: 15, markscheme: `Candidates must demonstrate a clear understanding of the requirements of the question and effectively deploy knowledge of the key issue(s) raised by the question. In this case, candidates must clearly identify the two countries they are going to consider, and to examine both similarities and differences in the factors that meant these countries that had embraced one party politics eventually turned back to multi-party democracy.

Points discussed may include: the weaknesses and failures of the one party systems which made many countries turn back to multi-party democracy; political factors such as the fact that many of the single party states were seen to be dictatorial/totalitarian in nature; there was lack of political freedom with other political parties either being forbidden or having their operations restricted. Political opposition was forbidden and political opponents were ruthlessly dealt with; general lack of freedom eg lack of freedom of expression and association; the economy was usually controlled by and therefore not everyone was seen to benefit; with a return to multi-party democracy, there was hope that healthy democracy would be promoted, human rights would be respected and national development would be encouraged; with a return to multi-party democracy there was also hope that a lot of the failures of the single party states would be resolved; candidates must give an account of the similarities and differences in the factors that led to the return to multi-party democracy, not simply give a description of factors and events. Thematic approaches are therefore likely to be more successful than end-on comparisons.

Responses achieving marks in the top bands will include a clear judgment on the similarities and differences between the factors that led to the return to multi-party democracy in two countries.` },
];

// ─── Group questions by topic (from fallback — will be recomputed dynamically) ─

// ─── Single Question Component ─────────────────────────────────────────────
function HistoryQuestion({ q, levelDescriptors, prefix }) {
  const lsPrefix = prefix || "hist";
  const [answer, setAnswer] = useState(() => loadLS(`${lsPrefix}_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [levelsRevealed, setLevelsRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`${lsPrefix}_grade_${q.id}`, null));
  const { recordAttempt } = useAttemptTracker(q.id, "history", q.topic || "History", "history");

  useEffect(() => { saveLS(`${lsPrefix}_ans_${q.id}`, answer); }, [answer, q.id, lsPrefix]);
  useEffect(() => { saveLS(`${lsPrefix}_grade_${q.id}`, gradeResult); }, [gradeResult, q.id, lsPrefix]);

  const handleSolve = async () => {
    if (!answer.trim()) return;
    setGrading(true);
    setGradeResult(null);
    try {
      const res = await fetch("https://ib-grading-hollen.c9tggsfst9.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.question,
          studentAnswer: answer,
          expectedAnswer: q.markscheme + "\n\n" + levelDescriptors,
          marks: q.marks,
        }),
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

  const handleClear = () => {
    setAnswer("");
    setGradeResult(null);
    saveLS(`${lsPrefix}_ans_${q.id}`, "");
    saveLS(`${lsPrefix}_grade_${q.id}`, null);
  };

  return (
    <Surface className="rounded-2xl p-4 mb-3">
      {/* Question header */}
      <div className="flex items-start gap-2 mb-2" style={{ flexWrap: "nowrap" }}>
        <span
          className="text-sm px-2 py-1 rounded-full font-bold"
          style={{ backgroundColor: "#F8717118", color: "#F87171", border: "none", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}
        >
          Q{q.number}
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#8B5CF618", color: "#8B5CF6", border: "none", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {q.marks} marks
        </span>
      </div>

      {/* Question text */}
      <span className="block text-[#F0EEE8] mb-4" style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
        {q.question}
      </span>

      {/* Answer textarea */}
      <TextArea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your essay answer here..."
        rows={16}
        fullWidth
        className="rounded-2xl mb-2 bg-[#09090F] border border-[#252533] text-[#F0EEE8] text-sm leading-[1.7] placeholder:text-[#55556A] focus:border-[#F87171] p-3"
        style={{ fontFamily: "'Inter', sans-serif", resize: "vertical" }}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          isPending={grading}
          onPress={handleSolve}
          isDisabled={!answer.trim()}
          className="rounded-full bg-[#F87171] text-white"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {({isPending}) => <>
            {isPending && <Spinner color="current" size="sm" />}
            {isPending ? "Grading..." : "Solve"}
          </>}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onPress={() => setRevealed((r) => !r)}
          className={`rounded-full ${revealed ? "text-[#8B8B9E]" : "bg-[#8B5CF6] text-white"}`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {revealed ? "Hide Markscheme" : "Show Markscheme"}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onPress={() => setLevelsRevealed((r) => !r)}
          className={`rounded-full ${levelsRevealed ? "text-[#8B8B9E]" : "bg-[#FBBF24] text-black"}`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {levelsRevealed ? "Hide Levels" : "Level Descriptors"}
        </Button>

        {(answer.trim() || gradeResult) && (
          <Button
            size="sm"
            variant="ghost"
            onPress={handleClear}
            className="rounded-full text-[#8B8B9E]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Clear
          </Button>
        )}

        <span className="text-xs px-1.5 py-0.5 rounded-full ml-auto" style={{ backgroundColor: "rgba(248,113,113,0.1)", color: "#F87171", fontFamily: "'JetBrains Mono', monospace" }}>
          auto-saved
        </span>
      </div>

      {/* AI Grade Result */}
      {gradeResult && (
        <Surface variant="secondary" className="rounded-2xl p-3 mt-3">
          {gradeResult.score !== null && (
            <div className="flex items-center mb-1">
              <span
                className="text-sm px-2 py-1 rounded-full font-bold"
                style={{
                  backgroundColor: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "#34D39922" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "#FBBF2422" : "#EF444422",
                  color: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "#34D399" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "#FBBF24" : "#EF4444",
                  border: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {gradeResult.score} / {gradeResult.maxMarks}
              </span>
            </div>
          )}
          <span className="block text-[#B0ADA6]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {gradeResult.feedback}
          </span>
        </Surface>
      )}

      {/* Markscheme reveal */}
      {revealed && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #252533" }}>
          <span className="block text-[#34D399] mb-2" style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
            MARKSCHEME
          </span>
          <span className="block text-[#B0ADA6]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {q.markscheme}
          </span>
        </div>
      )}

      {/* Level descriptors reveal */}
      {levelsRevealed && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #252533" }}>
          <span className="block text-[#FBBF24] mb-2" style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
            LEVEL DESCRIPTORS
          </span>
          <span className="block text-[#B0ADA6]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {levelDescriptors}
          </span>
        </div>
      )}
    </Surface>
  );
}

// ─── Main History Page ────────────────────────────────────────────────────
export default function HistoryPage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paper, setPaper] = useState(() => loadLS("hist_paper_tab", "paper2"));
  const [paper2Questions, setPaper2Questions] = useState(null);
  const [paper3Questions, setPaper3Questions] = useState(null);
  const [loadingP2, setLoadingP2] = useState(true);
  const [loadingP3, setLoadingP3] = useState(true);

  useEffect(() => { saveLS("hist_paper_tab", paper); }, [paper]);

  // Fetch Paper 2 questions from API
  useEffect(() => {
    let cancelled = false;
    fetchHistoryQuestions("paper2")
      .then((data) => {
        if (cancelled) return;
        const transformed = data.map((q) => ({
          id: q.id,
          number: q.question_number,
          topic: q.topic,
          question: q.question_text,
          marks: q.marks,
          markscheme: q.mark_scheme,
        }));
        setPaper2Questions(transformed);
      })
      .catch(() => {
        if (!cancelled) setPaper2Questions(HISTORY_QUESTIONS_FALLBACK);
      })
      .finally(() => {
        if (!cancelled) setLoadingP2(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Fetch Paper 3 questions from API
  useEffect(() => {
    let cancelled = false;
    fetchHistoryQuestions("paper3")
      .then((data) => {
        if (cancelled) return;
        const transformed = data.map((q) => ({
          id: q.id,
          number: q.question_number,
          topic: q.topic,
          question: q.question_text,
          marks: q.marks,
          markscheme: q.mark_scheme,
        }));
        setPaper3Questions(transformed);
      })
      .catch(() => {
        if (!cancelled) setPaper3Questions(PAPER3_QUESTIONS_FALLBACK);
      })
      .finally(() => {
        if (!cancelled) setLoadingP3(false);
      });
    return () => { cancelled = true; };
  }, []);

  const HISTORY_QUESTIONS = paper2Questions || HISTORY_QUESTIONS_FALLBACK;
  const PAPER3_QUESTIONS = paper3Questions || PAPER3_QUESTIONS_FALLBACK;
  const questions = paper === "paper2" ? HISTORY_QUESTIONS : PAPER3_QUESTIONS;
  const topics = [...new Set(questions.map(q => q.topic))];
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const levelDesc = paper === "paper2" ? LEVEL_DESCRIPTORS : LEVEL_DESCRIPTORS_P3;
  const lsPrefix = paper === "paper2" ? "hist" : "p3";
  const loading = paper === "paper2" ? loadingP2 : loadingP3;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#09090F", fontFamily: "'Inter', sans-serif", color: "#F0EEE8" }}>

      <Sidebar activeSubject="history" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(9, 9, 15, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-4xl mx-auto py-2 px-4">
          <div className="flex items-center justify-center mb-1" style={{ position: "relative" }}>
            {/* Sidebar toggle */}
            <Button
              isIconOnly
              variant="outline"
              onPress={() => setSidebarOpen(o => !o)}
              className="rounded-full bg-transparent text-[#8B8B9E] border-[#252533] min-w-[auto] h-8 px-[10px]"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Button>
            <span
              className="text-xs px-2 py-0.5 rounded-full uppercase font-bold"
              style={{ letterSpacing: 2, backgroundColor: "#F8717118", color: "#F87171", border: "none", fontFamily: "'JetBrains Mono', monospace" }}
            >
              IB HL History
            </span>
            <LoginButton />
          </div>
          <span
            className="text-center block font-extrabold text-[#F0EEE8]"
            style={{ fontSize: "clamp(22px, 4vw, 30px)", letterSpacing: -0.5 }}
          >
            {paper === "paper2" ? "Paper 2 \u2014 Specimen" : "Paper 3 \u2014 Specimen"}
          </span>
          <span className="text-center block text-xs text-[#55556A] mb-2">
            {paper === "paper2"
              ? `12 topics \u00B7 ${questions.length} questions \u00B7 ${totalMarks} marks total`
              : `18 topics \u00B7 ${questions.length} questions \u00B7 ${totalMarks} marks total`}
          </span>

          {/* Paper 2 / Paper 3 tabs */}
          <div className="flex items-center justify-center gap-1 pb-1">
            {[
              { key: "paper2", label: "Paper 2" },
              { key: "paper3", label: "Paper 3" },
            ].map(t => (
              <Button
                key={t.key}
                size="sm"
                onPress={() => setPaper(t.key)}
                className="rounded-full font-semibold text-[13px]"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  backgroundColor: paper === t.key ? "#F0EEE8" : "transparent",
                  color: paper === t.key ? "#09090F" : "#55556A",
                  border: paper === t.key ? "none" : "1px solid #252533",
                  height: 34,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              >
                {t.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-6 px-3">
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
          {/* Exam info banner */}
          <Surface className="rounded-3xl p-4 mb-6">
            <span className="text-sm text-[#F0EEE8] font-semibold block" style={{ marginBottom: 4 }}>
              {paper === "paper2"
                ? "IB History HL/SL \u2014 Paper 2 Specimen"
                : "IB History HL \u2014 Paper 3 Specimen (Africa and the Middle East)"}
            </span>
            <span className="text-xs text-[#8B8B9E] block" style={{ lineHeight: 1.6 }}>
              {paper === "paper2"
                ? "Answer two questions, each chosen from a different topic. Each question is worth 15 marks. The maximum mark for this paper is 30. Type your essay answers below \u2014 everything auto-saves. Use \"Solve\" for AI grading, \"Show Markscheme\" for the rubric, and \"Level Descriptors\" for the marking bands."
                : "Answer three questions. Each question is worth 15 marks. The maximum mark for this paper is 45. 2 hours 30 minutes. HL only. Type your essay answers below \u2014 everything auto-saves. Use \"Solve\" for AI grading, \"Show Markscheme\" for the rubric, and \"Level Descriptors\" for the marking bands."}
            </span>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(248,113,113,0.1)", color: "#F87171", fontFamily: "'JetBrains Mono', monospace" }}>
                {questions.length} questions
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "#8B5CF6", fontFamily: "'JetBrains Mono', monospace" }}>
                {topics.length} topics
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(251,191,36,0.1)", color: "#FBBF24", fontFamily: "'JetBrains Mono', monospace" }}>
                15 marks each
              </span>
              {paper === "paper3" && (
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(34,211,238,0.1)", color: "#22D3EE", fontFamily: "'JetBrains Mono', monospace" }}>
                  HL only
                </span>
              )}
            </div>
          </Surface>

          {/* Questions grouped by topic */}
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mb-6">
                  <Skeleton className="h-3.5 w-[200px] rounded-sm mb-4" />
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: 2 }).map((_, j) => (
                      <Surface key={j} className="rounded-2xl p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Skeleton className="h-6 w-[40px] rounded-md" />
                          <Skeleton className="h-5 w-[70px] rounded-md" />
                        </div>
                        <Skeleton className="h-4 rounded-sm mb-1" />
                        <Skeleton className="h-4 rounded-sm mb-4 w-[80%]" />
                        <Skeleton className="h-[160px] rounded-md" />
                      </Surface>
                    ))}
                  </div>
                </div>
              ))
            : topics.map(topic => (
                <div key={topic} className="mb-6">
                  <span
                    className="block text-[#F87171] font-bold uppercase mb-4"
                    style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}
                  >
                    {topic}
                  </span>
                  <div className="flex flex-col gap-4">
                    {questions.filter(q => q.topic === topic).map(q => (
                      <HistoryQuestion key={q.id} q={q} levelDescriptors={levelDesc} prefix={lsPrefix} />
                    ))}
                  </div>
                </div>
              ))
          }
        </div>
      </div>

      {/* Floating support button */}
      <a
        href="https://donate.stripe.com/aFa7sN64kbjBdj8ayH4ow01"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 999,
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "#7C6FFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(124,111,255,0.4)",
          border: "none",
          cursor: "pointer",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        title="Support us"
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,111,255,0.6)"; const p = e.currentTarget.querySelector("path"); if(p) p.style.fill = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,111,255,0.4)"; const p = e.currentTarget.querySelector("path"); if(p) p.style.fill = "none"; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" style={{transition:"fill 0.25s ease"}}/>
        </svg>
      </a>
    </div>
  );
}
