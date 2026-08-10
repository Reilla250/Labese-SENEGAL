# LABESE Website

## About

La Belle Étoile du Sénégal (LABESE) is a registered, youth-led
community-based organisation established in Dakar, Senegal in 2016. This
repository contains the production-ready marketing and information website
for LABESE — covering programmes, initiatives, documented impact, advocacy,
partnerships, and a secure contact channel.

Health Knowledge. Dignity. Action.

## Features

- Fully responsive design (320px through large desktop), with an accessible
  hamburger menu on mobile
- Nine detailed programme-area profiles, each with activities and advocacy
  focus
- Initiatives page that clearly separates **documented** results from
  **proposed** or **under review** initiatives, using status badges
- Impact dashboard with verified figures and accessible, text-labelled
  before/after charts for the MMHEI proof of concept
- Accessible contact form (React Hook Form + Zod) with client- and
  server-side validation, a honeypot field, basic rate limiting, and input
  sanitisation
- Dedicated Privacy, Safeguarding and Health Disclaimer pages
- Custom 404 page, route-level and global error boundaries, and loading
  states
- SEO: per-page metadata, canonical URLs, Open Graph and Twitter card
  images, `sitemap.xml`, `robots.txt`, and Organization structured data
- Semantic HTML, visible focus states, labelled form fields, alt text on
  every image, and `prefers-reduced-motion` support throughout

## Technology

- [Next.js](https://nextjs.org) (App Router) + TypeScript + React
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
  for form validation
- [Lucide](https://lucide.dev) icons
- Content is stored in `/data` as typed TypeScript modules, so copy changes
  do not require touching component code, and the structure is ready to be
  connected to a CMS later if LABESE wants non-technical editing.

## Installation

Requires Node.js LTS (18.18+ or 20+).

```bash
npm install
```

## Development

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values as needed:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL used in metadata and the sitemap
- `CONTACT_EMAIL` — inbox that should receive contact-form notifications
- `EMAIL_API_KEY` — API key for your transactional email provider (kept
  server-side only; the contact form works without it during development
  and simply logs submissions to the server console)

No secrets are ever read from client-side code.

## Build

```bash
npm run lint
npm run build
npm run start
```

Fix any lint or type errors before deploying.

## Deployment

The project is ready to deploy on [Vercel](https://vercel.com) or any
Node-compatible host:

1. Push this repository to GitHub.
2. In Vercel, import the repository.
3. Add the environment variables from `.env.example`.
4. Deploy.
5. Test all pages, the contact form, mobile navigation, and the sitemap
   (`/sitemap.xml`) and robots file (`/robots.txt`) on the deployed URL.

## Domain

To connect **labese.org**:

1. In your hosting provider's domain settings, add `labese.org` and
   `www.labese.org`.
2. Choose one as canonical (this project assumes `www.labese.org`) and
   redirect the other to it.
3. Verify DNS propagation and confirm HTTPS is issued and enforced.
4. Update `NEXT_PUBLIC_SITE_URL` to match the canonical domain and redeploy.

## Contact

info@labese.org
+221 77 857 70 78
