export type ImpactStatItem = { value: string; label: string };

// Homepage summary figures (uses the rounded combined "72" for peer champions
// and focal persons, per the source content).
export const homeImpactStats: ImpactStatItem[] = [
  {
    value: "687",
    label: "Learners and out-of-school adolescents reached with stigma-free HIV dialogue and education.",
  },
  { value: "149", label: "Adolescent girls supported through peer or psychosocial activities." },
  { value: "72", label: "Peer champions and school/community focal persons trained." },
  { value: "116", label: "Referrals or follow-ups supported." },
];

// Full impact-page figures (detailed breakdown: 43 peer champions + 29 focal persons).
export const impactPageStats: ImpactStatItem[] = [
  {
    value: "687",
    label: "Learners and out-of-school adolescents reached with stigma-free HIV dialogue and education.",
  },
  { value: "149", label: "Adolescent girls supported through peer or psychosocial activities." },
  { value: "43", label: "Peer champions trained." },
  { value: "29", label: "School and community focal persons trained." },
  { value: "37", label: "Football and edutainment dialogue sessions delivered." },
  { value: "116", label: "Referrals or follow-ups supported." },
  { value: "480", label: "Students reached during the MMHEI proof of concept in six schools." },
  { value: "428", label: "Students with matched mental health baseline and endline surveys." },
];

export type ImpactChartData = {
  title: string;
  before: number;
  after: number;
  unit: "%";
};

export const impactCharts: ImpactChartData[] = [
  {
    title: "Students correctly identifying at least three signs of emotional distress",
    before: 41,
    after: 73,
    unit: "%",
  },
  {
    title: "Students expressing one or more stigmatizing beliefs",
    before: 58,
    after: 31,
    unit: "%",
  },
  {
    title: "Students saying they would seek support",
    before: 37,
    after: 68,
    unit: "%",
  },
  {
    title: "Teacher and caregiver confidence in responding supportively",
    before: 29,
    after: 74,
    unit: "%",
  },
];

export const impactChartsFootnote = "All six participating schools requested continuation.";
