// Vercel Blob Storage Configuration
// This project uses Vercel Blob for both images and JSON data storage

import { put, list } from "@vercel/blob";

// Default static values to fall back on if no custom database values exist yet
import { site as defaultSite } from "@/data/site";
import { programmes as defaultProgrammes, programmeIntro as defaultProgrammeIntro } from "@/data/programmes";
import { initiatives as defaultInitiatives } from "@/data/initiatives";
import {
  homeImpactStats as defaultHomeImpactStats,
  impactPageStats as defaultImpactPageStats,
  impactCharts as defaultImpactCharts,
  impactChartsFootnote as defaultImpactChartsFootnote,
} from "@/data/impact";
import {
  advocacyPriorities as defaultAdvocacyPriorities,
  howWeAdvocate as defaultHowWeAdvocate,
  howWeWork as defaultHowWeWork,
  values as defaultValues,
  whatWeDo as defaultWhatWeDo,
  whoWeWorkWith as defaultWhoWeWorkWith,
  waysToPartner as defaultWaysToPartner,
} from "@/data/advocacy";

/**
 * Helper functions for using Vercel Blob as a Key-Value store
 * All data is stored as private JSON files in the /data/ folder
 */
async function readJsonDb<T>(key: string, defaultValue: T): Promise<T> {
  // If no Blob token configured (e.g., during build), use defaults
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return defaultValue;
  }

  try {
    // List blobs to find our data file
    const { blobs } = await list({ prefix: `data/${key}.json`, limit: 1 });
    
    if (blobs.length > 0) {
      // Fetch the JSON data from the blob URL
      const response = await fetch(blobs[0].url);
      if (response.ok) {
        const data = await response.json();
        return data as T;
      }
    }
    
    // If file doesn't exist, return default
    return defaultValue;
  } catch (e) {
    // If any error, return default
    console.log(`Using default data for ${key}:`, e);
    return defaultValue;
  }
}

async function writeJsonDb<T>(key: string, data: T): Promise<void> {
  // Check token exists
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN environment variable is not set");
  }

  try {
    const blobPath = `data/${key}.json`;
    const jsonString = JSON.stringify(data, null, 2);

    // Use the Vercel Blob SDK
    const { put } = await import("@vercel/blob");
    
    const blob = await put(blobPath, jsonString, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token: token,
    });
    
    console.log("Blob created:", blob.url);
  } catch (error) {
    console.error("Blob write error:", error);
    throw error; // Re-throw the original error with full details
  }
}

// 1. Site Metadata
export async function getSiteData() {
  return readJsonDb("site", defaultSite);
}

export async function saveSiteData(data: typeof defaultSite) {
  return writeJsonDb("site", data);
}

// 2. Programmes
export interface ProgrammesDbState {
  programmes: typeof defaultProgrammes;
  programmeIntro: string;
}

export async function getProgrammesData() {
  return readJsonDb<ProgrammesDbState>("programmes", {
    programmes: defaultProgrammes,
    programmeIntro: defaultProgrammeIntro,
  });
}

export async function saveProgrammesData(data: ProgrammesDbState) {
  return writeJsonDb("programmes", data);
}

// 3. Initiatives
export async function getInitiativesData() {
  return readJsonDb("initiatives", defaultInitiatives);
}

export async function saveInitiativesData(data: typeof defaultInitiatives) {
  return writeJsonDb("initiatives", data);
}

// 4. Impact metrics
export interface ImpactDbState {
  homeImpactStats: typeof defaultHomeImpactStats;
  impactPageStats: typeof defaultImpactPageStats;
  impactCharts: typeof defaultImpactCharts;
  impactChartsFootnote: string;
}

export async function getImpactData() {
  return readJsonDb<ImpactDbState>("impact", {
    homeImpactStats: defaultHomeImpactStats,
    impactPageStats: defaultImpactPageStats,
    impactCharts: defaultImpactCharts,
    impactChartsFootnote: defaultImpactChartsFootnote,
  });
}

export async function saveImpactData(data: ImpactDbState) {
  return writeJsonDb("impact", data);
}

// 5. Advocacy
export interface AdvocacyDbState {
  advocacyPriorities: string[];
  howWeAdvocate: typeof defaultHowWeAdvocate;
  howWeWork: string[];
  values: typeof defaultValues;
  whatWeDo: typeof defaultWhatWeDo;
  whoWeWorkWith: string[];
  waysToPartner: typeof defaultWaysToPartner;
}

export async function getAdvocacyData() {
  return readJsonDb<AdvocacyDbState>("advocacy", {
    advocacyPriorities: defaultAdvocacyPriorities,
    howWeAdvocate: defaultHowWeAdvocate,
    howWeWork: defaultHowWeWork,
    values: defaultValues,
    whatWeDo: defaultWhatWeDo,
    whoWeWorkWith: defaultWhoWeWorkWith,
    waysToPartner: defaultWaysToPartner,
  });
}

export async function saveAdvocacyData(data: AdvocacyDbState) {
  return writeJsonDb("advocacy", data);
}

// 6. About Page Content
export interface AboutDbState {
  storyTitle: string;
  storyImage: string;
  storyImageAlt: string;
  storyParagraph1: string;
  storyParagraph2: string;
  mission: string;
  vision: string;
  whoWeServe: Array<{ label: string; icon: string }>;
}

const defaultAboutData: AboutDbState = {
  storyTitle: "From one community response to a wider health platform",
  storyImage: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=900&auto=format&fit=crop",
  storyImageAlt: "A community facilitator leading a discussion group, illustrative of LABESE's community-led approach.",
  storyParagraph1: "LABESE was established in Dakar in 2016 with a simple belief: no young person should lose education, confidence, care or hope because of stigma. Our early work focused on students and female school dropouts living with or affected by HIV-related stigma. We listened to young people, caregivers, teachers, peer supporters and health providers and learned that health barriers are often social as well as medical.",
  storyParagraph2: "Today, LABESE uses that experience to support broader community health. We bring trusted information, prevention, psychosocial support, advocacy, safeguarding and referral into schools and communities. We do not replace hospitals or licensed professionals. We help communities understand, act, speak up and connect with appropriate services.",
  mission: "To improve health and wellbeing in Senegal through community health education, prevention, stigma reduction, rights-based advocacy, psychosocial support, safe referral and strong partnerships.",
  vision: "A Senegal where every person has the knowledge, dignity, voice and support needed to protect their health and access inclusive, respectful and quality services.",
  whoWeServe: [
    { label: "Children and adolescents", icon: "GraduationCap" },
    { label: "Young people and women", icon: "Users2" },
    { label: "People living with or affected by HIV", icon: "HeartHandshake" },
    { label: "People experiencing mental health stigma", icon: "ShieldAlert" },
    { label: "People with disabilities", icon: "Accessibility" },
    { label: "Communities facing poverty, exclusion or barriers to care", icon: "Coins" },
  ]
};

export async function getAboutData() {
  return readJsonDb<AboutDbState>("about", defaultAboutData);
}

export async function saveAboutData(data: AboutDbState) {
  return writeJsonDb("about", data);
}

// 7. Home Page Content
export interface HomeDbState {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  images: Array<{ src: string; alt: string }>;
}

const defaultHomeData: HomeDbState = {
  heroTitle: "Health Knowledge. Dignity. Action.",
  heroSubtitle: "La Belle Étoile du Sénégal",
  heroDescription: "We are a youth-led community-based organisation in Dakar, Senegal. Since 2016, we have worked on health education, stigma reduction, rights advocacy and community-led health solutions.",
  aboutTitle: "A youth-led health organisation rooted in Dakar",
  aboutParagraph1: "La Belle Étoile du Sénégal (LABESE) is a registered, youth-led community-based organisation established in Dakar in 2016. Our work began by addressing HIV-related stigma affecting adolescents and has grown into a wider community health, awareness and advocacy platform.",
  aboutParagraph2: "We help people understand health information, prevent avoidable risks, speak up for their rights and connect with qualified services. We work directly with communities and through partnerships with schools, health providers, public institutions, researchers and civil-society organisations.",
  images: [
    {
      src: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?q=80&w=800&auto=format&fit=crop",
      alt: "Students in a classroom setting participating in a health education session, illustrative of school-based health awareness work.",
    },
    {
      src: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop",
      alt: "A group of young women in discussion outdoors, illustrative of peer-led community dialogue.",
    },
    {
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
      alt: "Community members gathered for a group meeting, illustrative of community outreach and mobilisation.",
    },
  ],
};

export async function getHomeData() {
  return readJsonDb<HomeDbState>("home", defaultHomeData);
}

export async function saveHomeData(data: HomeDbState) {
  return writeJsonDb("home", data);
}
