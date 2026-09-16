# Michael Marino

Personal portfolio and articles, built with Astro and the [Sumi theme](https://github.com/kpab/astro-sumi). Static output, Markdown by default, and MDX for interactive tutorials.

## Start writing

Use Node 24 LTS (see `.nvmrc`). From the repository root:

```sh
npm ci
npm run dev
npm run new:post -- "My next article"
```

Open the address printed by Astro. The new post lives in `src/content/blog/my-next-article/index.md`; put its images beside it. Drafts appear in development but are omitted from production pages, RSS, tags, sitemap, and social images. Set `draft: false` when ready to publish.

On Windows, use `npm.cmd` if the PowerShell `npm` shim fails. The commands otherwise work the same way.

```yaml
---
title: "My next article"
description: "A short summary for the article list and search results."
pubDate: 2026-09-15
tags: [typescript]
draft: true
# updatedDate: 2026-09-20
# heroImage: ./cover.jpg
# heroImageAlt: "Describe the cover image"
---
```

The filename (or folder containing `index.md`) determines the URL. Keep it stable after publishing. For revisions, add `updatedDate` without changing `pubDate`.

## Interactive articles

```sh
npm run new:post -- "An interactive example" --mdx
```

Use MDX when a post needs imported components. Put imports **after** the frontmatter, not in a `setup:` field. Preact is configured for interactive TSX components:

```mdx
import Demo from '../../../components/demos/Demo.tsx';

<Demo client:visible />
```

Ordinary Markdown supports code fences, tables, and HTML. The restored Caesar’s Box and jsPDF posts demonstrate MDX components. jsPDF is only loaded with the PDF tutorial's islands.

## Validate and publish

```sh
npm run check
npm run build
npm run preview
```

Commit and push after checking the preview. This repository includes a Cloudflare Pages configuration in `wrangler.jsonc`: its project name is `michael-marino-portfolio`, its build command is `npm run build`, and its output directory is `dist`. Create a Pages project with that name, connect this repository, and select Node 24. Subsequent pushes can deploy automatically through Cloudflare Pages.

For a direct Wrangler deployment, authenticate once with `npx wrangler login`, then run:

```sh
npm run deploy
```

To serve the production build locally with Cloudflare Pages behavior, run `npm run preview:cloudflare`.

`src/config.ts` contains the public URL (`https://michaelmarino.dev`), profile, social links, and theme options. Confirm the URL before deploying. The homepage uses a static background; the ink animation has been removed.

## Structure

- `src/content/blog/`: the eight restored articles and new posts.
- `src/components/demos/`: interactive tutorial examples.
- `src/pages/`: homepage, About, Speaking, article and tag archives, feeds.
- `src/assets/photos/`: personal photographs from the original portfolio.
- `src/styles/`: Sumi styles and article demo styles.
- `scripts/new-post.mjs`: creates a draft without overwriting an existing post.

Existing `/blog/<slug>/` addresses are retained. `/articles/<slug>` redirects to `/blog/<slug>` and `/articles` to `/blog/`. Both `/feed.xml` and `/rss.xml` serve the same RSS feed. Astro emits HTML redirects for static hosting; configure equivalent HTTP 301 redirects on your host when available.

## Migration and credits

The original Next.js portfolio and nested Astro site remain in Git history. Local migration backups, if present, are ignored under `.migration/`. The separate `blog` repository is unchanged.

Restored: Caesar’s Box; jsPDF and You; The Monty Hall Problem; Networking Problems in WSL 2; Building WebStore; Building a dialog component in Blazor; Applying arbitrary attributes to Blazor components; Functions as Component Parameters in Blazor. Original publication dates and prose are retained; legacy layout/setup fields were converted to the current content format. Older tutorials describe APIs from their original publication period.

Sumi source: `kpab/astro-sumi`, commit `c6bbdd91417cb0a624e7abbb570544c951ac5c6f`. Its MIT license is preserved in `LICENSE-SUMI`; font licenses are in `public/fonts/LICENSE.txt`. Sumi's license applies to its theme code, not automatically to the articles and personal photographs.
