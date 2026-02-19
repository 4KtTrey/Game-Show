export type TrueFalseQuestion = {
  type: 'trueFalse';
  id: number;
  question: string;
  answer: boolean;
  explanation: string;
};

export type FillBlankQuestion = {
  type: 'fillBlank';
  id: number;
  question: string;
  blank: string; // the missing word(s)
  explanation: string;
};

export type StructuredQuestion = {
  type: 'structured';
  id: number;
  question: string;
  sampleAnswer: string;
};

export type Question = TrueFalseQuestion | FillBlankQuestion | StructuredQuestion;

export const trueFalseQuestions: TrueFalseQuestion[] = [
  {
    type: 'trueFalse',
    id: 1,
    question: "Participatory Monitoring and Evaluation (PME) involves only external evaluators assessing a project's progress.",
    answer: false,
    explanation: "PME actively involves stakeholders—especially beneficiaries and community members—in all stages of monitoring and evaluation."
  },
  {
    type: 'trueFalse',
    id: 2,
    question: "In PME, stakeholders help define the indicators used to measure success.",
    answer: true,
    explanation: "A core principle of PME is that stakeholders participate in deciding what to measure and how to measure it."
  },
  {
    type: 'trueFalse',
    id: 3,
    question: "PME is only suitable for large-scale international development projects.",
    answer: false,
    explanation: "PME can be applied to projects of any size, from small community initiatives to large national programmes."
  },
  {
    type: 'trueFalse',
    id: 4,
    question: "Empowerment of local communities is a key outcome of effective PME processes.",
    answer: true,
    explanation: "By involving communities in evaluation, PME builds local capacity, ownership, and empowerment."
  },
  {
    type: 'trueFalse',
    id: 5,
    question: "PME eliminates the need for any quantitative data collection.",
    answer: false,
    explanation: "PME uses both qualitative and quantitative methods. It does not eliminate quantitative data but complements it with participatory approaches."
  },
  {
    type: 'trueFalse',
    id: 6,
    question: "A logical framework (logframe) can be used as a tool within PME.",
    answer: true,
    explanation: "Logframes are commonly adapted for participatory use, helping stakeholders understand the project logic and track progress."
  },
  {
    type: 'trueFalse',
    id: 7,
    question: "Monitoring in PME is a one-time activity conducted at the end of a project.",
    answer: false,
    explanation: "Monitoring is an ongoing, continuous process throughout the life of a project, not a one-time event."
  },
  {
    type: 'trueFalse',
    id: 8,
    question: "PME promotes transparency and accountability between project implementers and beneficiaries.",
    answer: true,
    explanation: "Shared decision-making and open information flow are central to PME, enhancing transparency and accountability."
  },
  {
    type: 'trueFalse',
    id: 9,
    question: "The Most Significant Change (MSC) technique is a participatory evaluation method.",
    answer: true,
    explanation: "MSC is a qualitative, participatory method where stakeholders collect and select stories of significant change."
  },
  {
    type: 'trueFalse',
    id: 10,
    question: "In PME, the evaluator is the sole decision-maker regarding what constitutes project success.",
    answer: false,
    explanation: "Success criteria are defined collaboratively with stakeholders, not solely by the evaluator."
  },
  {
    type: 'trueFalse',
    id: 11,
    question: "Participatory Rural Appraisal (PRA) tools can be integrated into PME.",
    answer: true,
    explanation: "PRA tools like community mapping, seasonal calendars, and wealth ranking are commonly used in PME."
  },
  {
    type: 'trueFalse',
    id: 12,
    question: "PME only focuses on measuring outputs and not outcomes or impacts.",
    answer: false,
    explanation: "PME examines outputs, outcomes, and impacts, often with special attention to changes experienced by communities."
  },
  {
    type: 'trueFalse',
    id: 13,
    question: "Gender-sensitive indicators are an important consideration in PME design.",
    answer: true,
    explanation: "Effective PME ensures that indicators capture differential impacts on men, women, and marginalized groups."
  },
  {
    type: 'trueFalse',
    id: 14,
    question: "Feedback loops from PME findings should only be shared with donors.",
    answer: false,
    explanation: "PME findings should be shared with all stakeholders—including communities—to inform decision-making and improve the project."
  },
  {
    type: 'trueFalse',
    id: 15,
    question: "Capacity building of local stakeholders is often a necessary step before conducting PME.",
    answer: true,
    explanation: "Training and capacity building help stakeholders meaningfully participate in monitoring and evaluation activities."
  },
];

export const fillBlankQuestions: FillBlankQuestion[] = [
  {
    type: 'fillBlank',
    id: 16,
    question: "PME stands for Participatory _______ and Evaluation.",
    blank: "Monitoring",
    explanation: "PME stands for Participatory Monitoring and Evaluation."
  },
  {
    type: 'fillBlank',
    id: 17,
    question: "The process of collecting data during project implementation to track progress is called _______.",
    blank: "Monitoring",
    explanation: "Monitoring is the systematic collection of data during implementation to track progress against plans."
  },
  {
    type: 'fillBlank',
    id: 18,
    question: "_______ are specific, measurable variables used to track changes resulting from a project intervention.",
    blank: "Indicators",
    explanation: "Indicators are the measurable variables that help determine whether a project is achieving its objectives."
  },
  {
    type: 'fillBlank',
    id: 19,
    question: "A _______ analysis identifies individuals, groups, or organizations that have an interest in or are affected by a project.",
    blank: "Stakeholder",
    explanation: "Stakeholder analysis maps out all parties with an interest in or affected by the project."
  },
  {
    type: 'fillBlank',
    id: 20,
    question: "The _______ framework is a planning and management tool that summarises a project's objectives, activities, indicators, and assumptions.",
    blank: "Logical",
    explanation: "The Logical Framework (Logframe) summarises objectives, activities, indicators, means of verification, and assumptions."
  },
];

export const structuredQuestions: StructuredQuestion[] = [
  {
    type: 'structured',
    id: 21,
    question: "Explain three key differences between conventional Monitoring & Evaluation and Participatory Monitoring & Evaluation.",
    sampleAnswer: "1) Ownership: In conventional M&E, external experts design and control the process, while in PME, stakeholders co-own and co-manage the evaluation. 2) Purpose: Conventional M&E primarily serves upward accountability to donors, whereas PME also serves downward accountability to communities and promotes learning. 3) Methods: Conventional M&E relies heavily on standardized quantitative tools, while PME integrates qualitative, participatory tools like community mapping, storytelling, and focus group discussions that capture local perspectives."
  },
  {
    type: 'structured',
    id: 22,
    question: "Describe the role of stakeholders in each phase of the PME cycle (planning, data collection, analysis, and use of findings).",
    sampleAnswer: "Planning: Stakeholders help define evaluation questions, select indicators, and design data collection tools. Data Collection: Community members and beneficiaries actively gather data using participatory methods such as interviews, observation, and PRA tools. Analysis: Stakeholders participate in making sense of the data, identifying patterns, and drawing conclusions collaboratively. Use of Findings: Results are shared with all stakeholders, who jointly decide on corrective actions and improvements to the project."
  },
  {
    type: 'structured',
    id: 23,
    question: "Discuss at least four challenges of implementing PME in development projects and suggest strategies to overcome them.",
    sampleAnswer: "1) Power imbalances: Marginalized groups may be silenced. Strategy: Use facilitation techniques that ensure inclusive participation. 2) Time and resource constraints: PME is time-intensive. Strategy: Integrate PME into existing project activities and budgets. 3) Low literacy levels: Written tools may exclude some participants. Strategy: Use visual and oral participatory tools. 4) Resistance from staff: Staff may prefer conventional methods. Strategy: Provide training and demonstrate PME benefits through pilot exercises."
  },
  {
    type: 'structured',
    id: 24,
    question: "Explain how the Most Significant Change (MSC) technique works and why it is considered a participatory evaluation method.",
    sampleAnswer: "The MSC technique involves collecting stories of significant change from project beneficiaries and stakeholders. Stories are collected at the field level, then systematically selected by panels of stakeholders at different organizational levels. Each panel discusses why they consider a particular story the 'most significant.' It is participatory because: (a) beneficiaries generate the stories, (b) stakeholders at multiple levels are involved in selecting stories, (c) the selection process itself generates discussion about project values and impact, and (d) it does not require pre-set indicators, allowing unexpected changes to surface."
  },
  {
    type: 'structured',
    id: 25,
    question: "Design a simple PME plan for a community water supply project, including at least three participatory indicators and the methods you would use to collect data.",
    sampleAnswer: "PME Plan for Community Water Supply Project: Objective: Improve access to clean water. Participatory Indicators: 1) Number of households reporting reduced water collection time (survey + community scorecard). 2) Community satisfaction with water quality (focus group discussions + satisfaction ranking). 3) Frequency of waterpoint functionality/breakdowns (community monitoring log maintained by water committee). Data Collection Methods: Community scorecards administered quarterly, water committee monthly monitoring logs, seasonal community review meetings using participatory mapping to track coverage, and Most Significant Change stories collected biannually."
  },
];

export const allQuestions: Question[] = [
  ...trueFalseQuestions,
  ...fillBlankQuestions,
  ...structuredQuestions,
];
