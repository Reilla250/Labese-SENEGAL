export type Programme = {
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  activities: string[];
  advocacyFocus: string;
  icon:
    | "megaphone"
    | "scale"
    | "heart-pulse"
    | "brain"
    | "baby"
    | "shield-plus"
    | "leaf"
    | "hand-heart"
    | "route";
};

export const programmes: Programme[] = [
  {
    number: 1,
    slug: "health-awareness-and-education",
    title: "Health Awareness and Education",
    shortTitle: "Awareness & Education",
    description:
      "We provide clear and practical health information in schools, communities and public spaces. Our awareness activities help people understand health risks, prevent illness, recognise warning signs and know where to seek support.",
    activities: [
      "School and community health sessions",
      "Peer education and community facilitator training",
      "Myth-versus-fact campaigns",
      "Health messages through sport, drama, music, storytelling, radio, print and digital channels",
      "Simple materials in accessible language and formats",
    ],
    advocacyFocus:
      "We advocate for accurate, age-appropriate, non-stigmatising and accessible health information.",
    icon: "megaphone",
  },
  {
    number: 2,
    slug: "health-rights-and-advocacy",
    title: "Health Rights and Advocacy",
    shortTitle: "Rights & Advocacy",
    description:
      "We help communities understand their health rights and speak safely about barriers to care. We bring community evidence into dialogue with schools, health providers, local authorities and other decision-makers.",
    activities: [
      "Health-rights and patient-rights education",
      "Community consultations and service-barrier mapping",
      "Youth- and women-led advocacy forums",
      "Community scorecards, feedback channels and learning briefs",
      "Dialogue on confidentiality, dignity, non-discrimination and respectful care",
    ],
    advocacyFocus:
      "We advocate for fair, confidential, youth-friendly, gender-responsive and disability-inclusive services.",
    icon: "scale",
  },
  {
    number: 3,
    slug: "hiv-tb-stis-and-srhr",
    title: "HIV, TB, STIs and Sexual and Reproductive Health",
    shortTitle: "HIV, TB, STIs & SRHR",
    description:
      "We reduce stigma and help adolescents, young people and women access trusted information and support. Our approach combines peer dialogue, treatment and prevention literacy, psychosocial support, school engagement and confidential referral.",
    activities: [
      "HIV, TB and STI prevention and treatment literacy",
      "Age-appropriate sexual and reproductive health information",
      "Peer clubs, girls' football and edutainment",
      "Support on self-worth, safe disclosure, adherence and school retention",
      "Confidential referral and follow-up with qualified providers",
    ],
    advocacyFocus:
      "We advocate for stigma-free, confidential and adolescent-friendly HIV, TB, STI and SRHR services.",
    icon: "heart-pulse",
  },
  {
    number: 4,
    slug: "mental-health-and-psychosocial-wellbeing",
    title: "Mental Health and Psychosocial Wellbeing",
    shortTitle: "Mental Health",
    description:
      "We promote mental health literacy, reduce shame and encourage early help-seeking. We work with students, peers, teachers, caregivers and community actors to create safer conversations and stronger referral pathways.",
    activities: [
      "School and community mental health education",
      "Peer-led dialogue on distress, bullying, grief, violence and exclusion",
      "Teacher and caregiver orientation",
      "Safe listening and non-clinical first-line psychosocial support within trained roles",
      "Referral and follow-up with qualified mental health providers",
    ],
    advocacyFocus:
      "We advocate for stronger school mental health education and accessible, youth-friendly support.",
    icon: "brain",
  },
  {
    number: 5,
    slug: "maternal-newborn-child-and-adolescent-health",
    title: "Maternal, Newborn, Child and Adolescent Health",
    shortTitle: "Maternal & Child Health",
    description:
      "We support families and communities with practical information on healthy pregnancy, newborn care, child health and adolescent wellbeing. Clinical care remains the responsibility of licensed health professionals.",
    activities: [
      "Awareness on antenatal and postnatal care and danger signs",
      "Information on breastfeeding, immunisation, nutrition and child development",
      "Adolescent health, puberty, menstrual health and healthy relationships education",
      "Caregiver and partner engagement",
      "Referral navigation through qualified health partners",
    ],
    advocacyFocus:
      "We advocate for respectful maternity care and accessible child- and adolescent-friendly services.",
    icon: "baby",
  },
  {
    number: 6,
    slug: "disease-prevention-nutrition-wash",
    title: "Disease Prevention, Nutrition, WASH and Healthy Living",
    shortTitle: "Prevention, Nutrition & WASH",
    description:
      "We promote practical action to prevent communicable and non-communicable diseases and support healthier daily living. This includes trusted information, community mobilisation and referral to authorised services.",
    activities: [
      "Awareness on malaria, respiratory infections, hepatitis and vaccine-preventable diseases",
      "Education on hypertension, diabetes, cancer warning signs and respiratory health",
      "Nutrition, food safety, physical activity and healthy lifestyle messages",
      "Water, sanitation, hygiene and menstrual hygiene education",
      "Community mobilisation for screening or vaccination delivered by qualified partners",
    ],
    advocacyFocus:
      "We advocate for affordable prevention, early detection, healthy environments and continuity of care.",
    icon: "shield-plus",
  },
  {
    number: 7,
    slug: "climate-environmental-and-school-health",
    title: "Climate, Environmental and School Health",
    shortTitle: "Climate & School Health",
    description:
      "We address health risks linked to heat, air pollution, unsafe environments and climate-related emergencies. We promote practical school and community action that protects health before risks become emergencies.",
    activities: [
      "Heat, air-quality and climate-health awareness",
      "School preparedness, hydration, safe ventilation and lower-exposure planning",
      "Environmental risk mapping with students and communities",
      "Early-warning messages linked to clear protective actions",
      "Referral pathways for people with urgent heat or respiratory symptoms",
    ],
    advocacyFocus:
      "We advocate for climate-resilient schools and stronger coordination between health, education and environmental actors.",
    icon: "leaf",
  },
  {
    number: 8,
    slug: "gbv-prevention-safeguarding-and-inclusive-health",
    title: "Gender-Based Violence Prevention, Safeguarding and Inclusive Health",
    shortTitle: "GBV Prevention & Safeguarding",
    description:
      "We place safety, confidentiality, consent and inclusion at the centre of every programme. We also support prevention education, safe first-line response and referral for people affected by violence, abuse or discrimination.",
    activities: [
      "Education on consent, healthy relationships and respectful communication",
      "Child safeguarding and safe complaints channels",
      "Confidential listening and referral within approved roles",
      "Disability-inclusive and gender-responsive communication",
      "Referral mapping with qualified medical, psychosocial, legal and protection providers",
    ],
    advocacyFocus:
      "We advocate for survivor-centred, confidential, accessible and non-discriminatory response systems.",
    icon: "hand-heart",
  },
  {
    number: 9,
    slug: "community-outreach-referral-and-health-system-strengthening",
    title: "Community Outreach, Referral and Health-System Strengthening",
    shortTitle: "Outreach & Referral",
    description:
      "We help turn health information into practical access to services. LABESE connects communities, schools, service providers and public institutions while avoiding duplication of clinical care.",
    activities: [
      "Community outreach and school-health engagement",
      "Service mapping and referral directories",
      "Confidential referral, follow-up and navigation support",
      "Training for peer champions and community focal persons",
      "Community advisory groups, coordination meetings and service-barrier reviews",
    ],
    advocacyFocus:
      "We advocate for simple, integrated and community-responsive referral systems.",
    icon: "route",
  },
];

export const programmeIntro =
  "Some areas build on documented experience, while others are developed through new funding and technical partnerships. In every area, LABESE focuses on awareness, prevention, advocacy, community support, referral and accountability. Clinical diagnosis and treatment are provided by qualified partners.";
