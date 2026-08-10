export const site = {
  name: "LABESE",
  fullName: "La Belle Étoile du Sénégal (LABESE)",
  tagline: "Health Knowledge. Dignity. Action.",
  location: "Dakar, Senegal",
  registrationNumber: "1735",
  email: "info@labese.org",
  phone: "+221 77 857 70 78",
  phoneHref: "+221778577078",
  url: "https://www.labese.org",
  founded: "2016",
  healthDisclaimer:
    "LABESE is not a hospital, clinic or emergency service. We provide health education, advocacy, non-clinical community support and referral. Diagnosis, testing, prescribing, treatment and emergency care must be provided by licensed professionals and authorised health facilities. For urgent symptoms or immediate danger, contact the nearest qualified health facility or appropriate emergency or protection service.",
  safeguardingStatement:
    "LABESE is committed to the safety and dignity of children, adolescents and adults who take part in our work. We use informed consent and assent, confidentiality, secure information handling, safe referral and child-safe feedback or complaint channels. No person is required to disclose HIV status, mental health experience, disability, violence or other sensitive information publicly.",
  privacyStatement:
    "LABESE collects only the information needed to respond to enquiries, deliver approved programmes, monitor results or support referrals. Personal information is handled confidentially, shared only when authorised or required for safety, and stored for no longer than necessary.",
};

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Impact", href: "/impact" },
  { label: "Advocacy", href: "/advocacy" },
  { label: "Partners", href: "/partners" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const footerExplore: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Impact", href: "/impact" },
  { label: "Advocacy", href: "/advocacy" },
];

export const footerInvolved: NavItem[] = [
  { label: "Partners", href: "/partners" },
  { label: "Support a Programme", href: "/get-involved" },
  { label: "Contact Us", href: "/contact" },
];



