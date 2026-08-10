export type InitiativeStat = { value: string; label: string };

export type Initiative = {
  slug: string;
  title: string;
  shortName: string;
  status: string;
  statusTone: "proposed" | "review" | "proof";
  description: string;
  stats?: InitiativeStat[];
  note?: string;
};

export const initiatives: Initiative[] = [
  {
    slug: "kosi",
    title: "Kick Out Stigma Initiative (KOSI)",
    shortName: "KOSI",
    status: "Proposed scale-up initiative; application submitted.",
    statusTone: "proposed",
    description:
      "KOSI builds on LABESE's school and community work to reduce HIV-related stigma affecting students and female school dropouts living with HIV in Dakar. The model uses peer clubs, girls' football, drama, music, storytelling, school dialogue, psychosocial support and confidential referral.",
    stats: [
      { value: "687", label: "Learners and out-of-school adolescents reached" },
      { value: "149", label: "Adolescent girls supported" },
      { value: "43", label: "Peer champions trained" },
      { value: "29", label: "School/community focal persons trained" },
      { value: "37", label: "Football and edutainment sessions" },
      { value: "116", label: "Referrals or follow-ups supported" },
    ],
    note: "Documented activities from 2024–2025.",
  },
  {
    slug: "mmhei",
    title: "Mobile Mental Health Education Initiative (MMHEI)",
    shortName: "MMHEI",
    status: "Proof of concept completed; scale-up application under review.",
    statusTone: "review",
    description:
      "MMHEI brings youth-friendly mental health education, peer dialogue, teacher and caregiver orientation, community outreach and referral into schools and nearby communities.",
    stats: [
      { value: "480", label: "Students reached" },
      { value: "32", label: "Teachers or school staff reached" },
      { value: "74", label: "Caregivers reached" },
      { value: "18", label: "Community influencers reached" },
    ],
    note: "Among 428 students with matched surveys: recognition of signs of emotional distress increased from 41% to 73%; stigmatizing beliefs fell from 58% to 31%; intention to seek support increased from 37% to 68%. All six schools requested continuation.",
  },
  {
    slug: "school-shield-24",
    title: "School Shield 24",
    shortName: "School Shield 24",
    status: "Proof-of-concept proposal submitted; not yet implemented.",
    statusTone: "proposed",
    description:
      "School Shield 24 is a proposed climate-health initiative for five Dakar schools. It would combine official heat and air-quality information with school-level monitoring and simple green, amber and red action protocols.",
    stats: [{ value: "~4,000", label: "Proposed learner reach (not yet achieved)" }],
    note: "This is a proposed initiative. The estimated reach of approximately 4,000 learners has not yet been achieved and should not be read as a completed result.",
  },
];
