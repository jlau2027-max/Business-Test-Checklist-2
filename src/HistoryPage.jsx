import { useState, useEffect } from "react";
import {
  Container, Badge, Text, Group, Paper, Button, Box, Textarea, Collapse, Stack,
} from "@mantine/core";

// ─── localStorage helpers ──────────────────────────────────────────────────
function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ─── Level Descriptors (shared across all questions) ────────────────────────
const LEVEL_DESCRIPTORS = `Level Descriptors (15 marks):

13-15: Responses are clearly focused, showing a high degree of awareness of the demands and implications of the question. Answers are well structured and effectively organized. Knowledge of the world history topic is accurate and relevant. Events are placed in their historical context, and there is a clear understanding of historical concepts. The examples chosen are appropriate and relevant, and are used effectively to support the analysis/evaluation. The response makes effective links and/or comparisons. The response contains clear and coherent critical analysis. There is evaluation of different perspectives, and this evaluation is integrated effectively into the answer. All, or nearly all, of the main points are substantiated, and the response argues to a consistent conclusion.

10-12: The demands of the question are understood and addressed. Answers are generally well structured and organized. Knowledge of the world history topic is mostly accurate and relevant. Events are placed in their historical context, and there is some understanding of historical concepts. The examples chosen are appropriate and relevant, and are used to support the analysis/evaluation. The response makes effective links and/or comparisons. The response contains critical analysis, which is mainly clear and coherent. There is some awareness and evaluation of different perspectives. Most of the main points are substantiated and the response argues to a consistent conclusion.

7-9: The response indicates an understanding of the demands of the question, but these demands are only partially addressed. There is an attempt to follow a structured approach. Knowledge of the world history topic is mostly accurate and relevant. Events are generally placed in their historical context. The examples chosen are appropriate and relevant. The response makes links and/or comparisons. The response moves beyond description to include some analysis or critical commentary, but this is not sustained.

4-6: The response indicates some understanding of the demands of the question. While there may be an attempt to follow a structured approach, the response lacks clarity and coherence. Knowledge of the world history topic is demonstrated, but lacks accuracy and relevance. There is a superficial understanding of historical context. The student identifies specific examples to discuss, but these examples are vague or lack relevance. There is some limited analysis, but the response is primarily narrative/descriptive in nature rather than analytical.

1-3: There is little understanding of the demands of the question. The answer is poorly structured or, where there is a recognizable essay structure, there is minimal focus on the task. Little knowledge of the world history topic is present. The student identifies examples to discuss, but these examples are factually incorrect, irrelevant or vague. The response contains little or no critical analysis. The response may consist mostly of generalizations and poorly substantiated assertions.

0: Answers do not reach a standard described by the descriptors above.`;

// ─── History Paper 2 Questions Data ─────────────────────────────────────────
const HISTORY_QUESTIONS = [
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

// ─── Group questions by topic ───────────────────────────────────────────────
const TOPICS = [...new Set(HISTORY_QUESTIONS.map(q => q.topic))];

// ─── Single Question Component ─────────────────────────────────────────────
function HistoryQuestion({ q }) {
  const [answer, setAnswer] = useState(() => loadLS(`hist_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [levelsRevealed, setLevelsRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`hist_grade_${q.id}`, null));

  useEffect(() => { saveLS(`hist_ans_${q.id}`, answer); }, [answer, q.id]);
  useEffect(() => { saveLS(`hist_grade_${q.id}`, gradeResult); }, [gradeResult, q.id]);

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
          expectedAnswer: q.markscheme + "\n\n" + LEVEL_DESCRIPTORS,
          marks: q.marks,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setGradeResult({ score: null, feedback: data.details || data.error });
      } else {
        setGradeResult({ score: data.score, maxMarks: data.maxMarks || q.marks, feedback: data.feedback });
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
    saveLS(`hist_ans_${q.id}`, "");
    saveLS(`hist_grade_${q.id}`, null);
  };

  return (
    <Paper bg="#12121A" radius="lg" p="lg" mb="md" style={{ border: "1px solid #252533" }}>
      {/* Question header */}
      <Group mb="sm" align="flex-start" wrap="nowrap">
        <Badge
          size="lg"
          radius="md"
          ff="'JetBrains Mono', monospace"
          fw={700}
          style={{ backgroundColor: "#F8717118", color: "#F87171", border: "none", flexShrink: 0 }}
        >
          Q{q.number}
        </Badge>
        <Badge
          size="sm"
          radius="md"
          ff="'JetBrains Mono', monospace"
          fw={600}
          style={{ backgroundColor: "#8B5CF618", color: "#8B5CF6", border: "none", flexShrink: 0 }}
        >
          {q.marks} marks
        </Badge>
      </Group>

      {/* Question text */}
      <Text fz={14} c="#F0EEE8" lh={1.7} mb="md" style={{ whiteSpace: "pre-line" }}>
        {q.question}
      </Text>

      {/* Answer textarea */}
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.currentTarget.value)}
        placeholder="Type your essay answer here..."
        minRows={16}
        autosize
        radius="md"
        mb="sm"
        styles={{
          input: {
            backgroundColor: "#09090F",
            borderColor: "#252533",
            color: "#F0EEE8",
            fontSize: 14,
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />

      {/* Action buttons */}
      <Group gap="sm" wrap="wrap">
        <Button
          size="sm"
          radius="md"
          ff="'JetBrains Mono', monospace"
          loading={grading}
          onClick={handleSolve}
          disabled={!answer.trim()}
          style={{
            backgroundColor: "#F8717122",
            color: "#F87171",
            border: "1px solid #F8717144",
          }}
        >
          {grading ? "Grading..." : "Solve"}
        </Button>

        <Button
          size="sm"
          radius="md"
          variant={revealed ? "subtle" : "light"}
          color={revealed ? "gray" : undefined}
          ff="'JetBrains Mono', monospace"
          onClick={() => setRevealed((r) => !r)}
          style={
            revealed
              ? {}
              : {
                  backgroundColor: "#8B5CF622",
                  color: "#8B5CF6",
                  border: "1px solid #8B5CF644",
                }
          }
        >
          {revealed ? "Hide Markscheme" : "Show Markscheme"}
        </Button>

        <Button
          size="sm"
          radius="md"
          variant={levelsRevealed ? "subtle" : "light"}
          color={levelsRevealed ? "gray" : undefined}
          ff="'JetBrains Mono', monospace"
          onClick={() => setLevelsRevealed((r) => !r)}
          style={
            levelsRevealed
              ? {}
              : {
                  backgroundColor: "#FBBF2422",
                  color: "#FBBF24",
                  border: "1px solid #FBBF2444",
                }
          }
        >
          {levelsRevealed ? "Hide Levels" : "Level Descriptors"}
        </Button>

        {(answer.trim() || gradeResult) && (
          <Button
            size="sm"
            radius="md"
            variant="subtle"
            color="gray"
            ff="'JetBrains Mono', monospace"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}

        <Badge size="xs" variant="light" color="red" ff="'JetBrains Mono', monospace" ml="auto">
          auto-saved
        </Badge>
      </Group>

      {/* AI Grade Result */}
      {gradeResult && (
        <Paper bg="#1A1A24" radius="md" p="md" mt="md" style={{ border: "1px solid #252533" }}>
          {gradeResult.score !== null && (
            <Group mb="xs">
              <Badge
                size="lg"
                radius="md"
                ff="'JetBrains Mono', monospace"
                fw={700}
                style={{
                  backgroundColor: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "#34D39922" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "#FBBF2422" : "#EF444422",
                  color: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "#34D399" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "#FBBF24" : "#EF4444",
                  border: "none",
                }}
              >
                {gradeResult.score} / {gradeResult.maxMarks}
              </Badge>
            </Group>
          )}
          <Text fz={13} c="#B0ADA6" lh={1.7} style={{ whiteSpace: "pre-line" }}>
            {gradeResult.feedback}
          </Text>
        </Paper>
      )}

      {/* Markscheme reveal */}
      <Collapse in={revealed}>
        <Box mt="md" pt="md" style={{ borderTop: "1px solid #252533" }}>
          <Text fz={11} ff="'JetBrains Mono', monospace" c="#34D399" lts={1} mb="sm">
            MARKSCHEME
          </Text>
          <Text fz={13} c="#B0ADA6" lh={1.7} style={{ whiteSpace: "pre-line" }}>
            {q.markscheme}
          </Text>
        </Box>
      </Collapse>

      {/* Level descriptors reveal */}
      <Collapse in={levelsRevealed}>
        <Box mt="md" pt="md" style={{ borderTop: "1px solid #252533" }}>
          <Text fz={11} ff="'JetBrains Mono', monospace" c="#FBBF24" lts={1} mb="sm">
            LEVEL DESCRIPTORS
          </Text>
          <Text fz={13} c="#B0ADA6" lh={1.7} style={{ whiteSpace: "pre-line" }}>
            {LEVEL_DESCRIPTORS}
          </Text>
        </Box>
      </Collapse>
    </Paper>
  );
}

// ─── Main History Page ────────────────────────────────────────────────────
export default function HistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const totalMarks = HISTORY_QUESTIONS.reduce((sum, q) => sum + q.marks, 0);

  return (
    <Box mih="100vh" bg="#09090F" style={{ fontFamily: "'Inter', sans-serif", color: "#F0EEE8" }}>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <Box
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 199,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      {/* Sidebar */}
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : -220,
          width: 220,
          height: "100vh",
          zIndex: 200,
          backgroundColor: "#0D0D14",
          borderRight: "1px solid #1A1A24",
          display: "flex",
          flexDirection: "column",
          padding: "20px 12px",
          gap: 8,
          transition: "left 0.25s ease",
        }}
      >
        <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" lts={1} mb={4} px={8}>
          SUBJECTS
        </Text>
        {[
          { label: "Business", active: false, href: "/" },
          { label: "History", active: true, href: "/history" },
        ].map(s => (
          <Button
            key={s.label}
            component={s.active ? "button" : "a"}
            href={s.active ? undefined : s.href}
            radius="md"
            ff="'JetBrains Mono', monospace"
            fw={600}
            onClick={() => setSidebarOpen(false)}
            style={{
              height: 44,
              justifyContent: "flex-start",
              paddingLeft: 14,
              fontSize: 14,
              backgroundColor: s.active ? "#F87171" : "transparent",
              color: s.active ? "#fff" : "#8B8B9E",
              border: s.active ? "none" : "1px solid transparent",
              boxShadow: s.active ? "0 0 12px #F8717133" : "none",
              textDecoration: "none",
            }}
          >
            {s.label}
          </Button>
        ))}

        <Box style={{ flex: 1 }} />
        <Text fz={10} c="#33334A" ff="'JetBrains Mono', monospace" ta="center">
          More subjects coming soon
        </Text>
      </Box>

      {/* Header */}
      <Box
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
        <Container size="lg" py="sm">
          <Group justify="center" mb={4} style={{ position: "relative" }}>
            {/* Sidebar toggle */}
            <Button
              onClick={() => setSidebarOpen(o => !o)}
              radius="md"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                color: "#8B8B9E",
                border: "1px solid #252533",
                padding: "4px 10px",
                minWidth: "auto",
                height: 32,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Button>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'JetBrains Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#F8717118", color: "#F87171", border: "none" }}
            >
              IB HL History
            </Badge>
          </Group>
          <Text
            ta="center"
            fw={800}
            fz={{ base: 22, sm: 30 }}
            c="#F0EEE8"
            style={{ letterSpacing: -0.5 }}
          >
            Paper 2 — Specimen
          </Text>
          <Text ta="center" fz="xs" c="#55556A" mb="sm">
            12 topics · {HISTORY_QUESTIONS.length} questions · {totalMarks} marks total
          </Text>
        </Container>
      </Box>

      {/* Content */}
      <Container size="lg" py="xl" px="md">
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
          {/* Exam info banner */}
          <Paper bg="#12121A" radius="lg" p="lg" mb="xl" style={{ border: "1px solid #252533" }}>
            <Text fz="sm" c="#F0EEE8" fw={600} mb={4}>
              IB History HL/SL — Paper 2 Specimen
            </Text>
            <Text fz="xs" c="#8B8B9E" lh={1.6}>
              Answer two questions, each chosen from a different topic. Each question is worth 15 marks.
              The maximum mark for this paper is 30. Type your essay answers below — everything auto-saves.
              Use "Solve" for AI grading, "Show Markscheme" for the rubric, and "Level Descriptors" for the marking bands.
            </Text>
            <Group mt="sm" gap="xs">
              <Badge size="xs" variant="light" color="red" ff="'JetBrains Mono', monospace">
                {HISTORY_QUESTIONS.length} questions
              </Badge>
              <Badge size="xs" variant="light" color="violet" ff="'JetBrains Mono', monospace">
                12 topics
              </Badge>
              <Badge size="xs" variant="light" color="yellow" ff="'JetBrains Mono', monospace">
                15 marks each
              </Badge>
            </Group>
          </Paper>

          {/* Questions grouped by topic */}
          {TOPICS.map(topic => (
            <Box key={topic} mb="xl">
              <Text
                fz={11}
                ff="'JetBrains Mono', monospace"
                c="#F87171"
                lts={1}
                mb="md"
                tt="uppercase"
                fw={700}
              >
                {topic}
              </Text>
              <Stack gap="md">
                {HISTORY_QUESTIONS.filter(q => q.topic === topic).map(q => (
                  <HistoryQuestion key={q.id} q={q} />
                ))}
              </Stack>
            </Box>
          ))}
        </div>
      </Container>

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
    </Box>
  );
}
