# Blue Hawke

A responsive, editorial agency website built in the existing React/Vite project. The redesign uses warm ivory, charcoal, electric blue, self-hosted Manrope / DM Sans / IBM Plex Mono, and original HTML/CSS project previews. SEO work is intentionally deferred.

## Run locally

```bash
cd hawk/bluehawke
npm install
npm run dev
```

If your terminal is already in this directory, skip the `cd` command. Open the URL Vite prints.

```bash
npm run lint
npm run build
npm run preview
```

## Browser checks

```bash
npx playwright install chromium
npm test
```

Playwright starts or reuses the development server. Tests cover route rendering, loaded imagery, project filters and navigation, keyboard FAQs, mobile menu focus/Escape, contact validation and downloads, overflow at eight viewport widths, and automated WCAG A/AA checks. Review screenshots are generated in `artifacts/`. Automated accessibility tests are a foundation, not a guarantee of full accessibility compliance.

The project retains the existing JavaScript setup; there is no TypeScript check. Lighthouse performance scores have not been measured.

## Pages

- `/` — Complete homepage: hero, capabilities, concepts, positioning, process, working principles, transparent client-story placeholder, FAQs, and closing invitation.
- `/work` — Filterable design explorations.
- `/work/form`, `/work/fieldnotes`, `/work/flow` — Reusable concept detail pages with objectives, approach, scope, and next-project navigation.
- `/services` — Four service areas with deliverables and project-type contact links.
- `/about` — Studio positioning and approach.
- `/pricing` — Explanation of custom quotations, without invented prices.
- `/contact` — Validated project brief and explicit email-app handoff; downloadable text fallback.
- Unknown routes — Custom 404 view.

## Content and implementation

- `src/content/site.js`: editable brand details, services, concept projects, process, principles, and FAQs.
- `src/components/Layout.jsx`: header, accessible mobile navigation, route/anchor behavior, closing CTA, and footer.
- `src/components/ProjectVisual.jsx`: original illustrative website/app interfaces.
- `src/components/Sections.jsx`: homepage sections and reusable project cards.
- `src/components/ui.jsx`: wordmark, mark, arrows, buttons, section labels, and page introductions.
- `src/pages/`: route content and contact behavior.
- `src/index.css`: fonts, palette, shared tokens, defaults, and reduced-motion preferences.
- `src/App.css`: compositions and responsive styling.

## Content integrity and remaining integrations

The brand spelling **Blue Hawke** and `hello@bluehawke.com` are retained from the existing sibling website in `other/src/components/Logo.jsx` and `Footer.jsx`. The mailbox has not been independently verified. The sibling project is unchanged.

No verified client imagery, testimonial permissions, team biographies, result metrics, booking URL, or approved pricing were supplied. The three portfolio pieces are explicitly labeled illustrative concepts. They do not imply commissioned client work. Client stories are visibly pending; no fake quotes, ratings, clients, or social links are included.

The contact form does not send to a server. It validates the brief and prepares an email to the configured address. The visitor must open their email app and send it; the interface explicitly states that nothing has been sent. A downloadable brief is available if no email app is configured. Data is not stored in local storage or transmitted by the application. Connect an approved backend/email provider if direct form delivery is needed later.

## Imagery

Photographs are locally stored, served as responsive WebP images, and used only inside illustrative portfolio interfaces, not as team or client images:

- Interior: `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0`
- Mountain landscape: `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b`

Fonts are bundled from the corresponding Fontsource packages, with their licenses included in those packages.

## Hosting later

`npm run build` produces `dist/`. Configure the eventual static host to serve `index.html` for frontend routes such as `/work/form` and `/contact` (SPA history fallback). No site was deployed as part of this local build.

## Dependency audit

The production dependency audit reports zero known vulnerabilities. The full audit reports four moderate advisories in the existing ESLint/minimatch development-tool chain; remediation requires a separate tooling compatibility decision. These packages are not shipped in the website bundle.
