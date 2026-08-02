# mukeshmk.github.io

My personal website and portfolio, live at [mukeshmk.github.io](https://mukeshmk.github.io).

Built with Astro and Tailwind CSS. It's data-driven by design: most updates are a
JSON edit or a new Markdown file, with no component changes needed.

## Tech stack

- **[Astro](https://astro.build)** - static site output
- **[Tailwind CSS v4](https://tailwindcss.com)** - styling, via `@tailwindcss/vite`
- **TypeScript** - typed data and components
- **MDX, RSS, and sitemap** integrations
- **GitHub Pages + GitHub Actions** for hosting and deploys

## Features

- Light/dark theme with a no-flash init script and a persisted toggle
- SEO out of the box: per-page meta, Open Graph and Twitter cards, `Person` JSON-LD, `sitemap.xml`, and `robots.txt`
- Content collections with Zod schemas, so a bad data edit fails the build with a clear message
- Blog with an RSS feed, and per-project deep-dive pages
- Responsive and accessible (semantic HTML, focus states, skip link)

## Getting started

Prerequisites: **Node.js 20+** and **npm**.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:4321)
npm run dev

# type-check and validate content
npm run check

# production build into dist/
npm run build

# preview the production build locally
npm run preview
```

## Project structure

```
.
├── public/                 # served as-is: assets, PDFs, favicon, robots.txt
│   └── assets/             # images, resume, certificates
├── src/
│   ├── assets/             # images imported and optimized by Astro
│   ├── components/         # UI components (+ sections/ for the landing page)
│   ├── content/
│   │   ├── blog/           # one Markdown file per blog post
│   │   └── projects/       # one Markdown file per project deep dive
│   ├── content.config.ts   # content collections + Zod schemas
│   ├── data/               # structured content as JSON (+ site.ts)
│   ├── layouts/            # BaseLayout (head, SEO, nav, footer)
│   ├── pages/              # routes: index, 404, blog/, projects/, rss.xml
│   └── styles/             # global CSS and theme tokens
├── astro.config.mjs
└── .github/workflows/      # GitHub Pages deploy workflow
```

## Editing content

Most changes don't touch component code:

- **Profile, bio, socials, honors:** `src/data/profile.json`
- **Lists:** `experience.json`, `education.json`, `skills.json`, `certifications.json`, `stats.json` in `src/data/`
- **Projects:** add a Markdown file to `src/content/projects/` (frontmatter sets title, tech, links, order, and `featured`)
- **Blog posts:** add a Markdown file to `src/content/blog/`
- **Navigation and social icons:** `src/data/site.ts`

All schemas live in `src/content.config.ts`. Data is validated at build time, so a
missing or mistyped field is caught before it ships.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
with the official [`withastro/action`](https://github.com/withastro/action) and
publishes it to GitHub Pages. In the repository settings, set **Pages -> Source**
to **GitHub Actions**.

## License

Personal project. Code is free to reference; content and assets are not for reuse.
