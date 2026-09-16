/**
 * Sumi — site configuration
 *
 * This is the only file you need to edit to make the theme yours. Everything
 * else reads from here: metadata, navigation, feeds, OG images.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  /** Shown as the link text, so keep it short. */
  label: string;
  href: string;
}

export const SITE = {
  /** Absolute origin of the deployed site. No trailing slash. */
  url: "https://michaelmarino.dev",
  title: "Michael Marino",
  /**
   * Short Japanese mark used for the vertical rail and the loading screen.
   * Set to an empty string to drop the Japanese accents entirely.
   */
  titleMark: "",
  tagline: "Build. Share. Repeat.",
  description:
    "Articles and experiments in .NET, TypeScript, and the web by Michael Marino, a software engineer in Richmond, Virginia.",
  /** BCP 47 language tag, written to <html lang>. */
  lang: "en",
  /** Used for og:locale. */
  locale: "en_US",
  /** Fallback OG image, relative to public/. Used for pages without one. */
  defaultOgImage: "/og-default.png",
} as const;

export const AUTHOR = {
  name: "Michael Marino",
  url: "https://michaelmarino.dev/about/",
  /** One or two sentences. Shown on /about and in structured data. */
  bio: "I’m Michael, a software engineer based in Richmond, Virginia. I build full-stack web applications and share what I learn along the way.",
} as const;

export const NAV: NavItem[] = [
  { label: "Articles", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Tags", href: "/tags" },
  { label: "About", href: "/about" },
];

export const SOCIAL: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/memarino92" },
  { label: "LinkedIn", href: "https://linkedin.com/in/michael-marino-8980b81a7/" },
  { label: "Email", href: "mailto:michael@michaelmarino.dev" },
];

export const BLOG = {
  /**
   * Posts per page on /blog and the tag archives. Deliberately low so that the
   * bundled sample posts spill onto a second page; 8–12 suits a real archive.
   */
  postsPerPage: 10,
  /** Latest posts shown on the home page. */
  postsOnHome: 4,
  /** Estimated reading speed used for the "N min read" label. */
  wordsPerMinute: 220,
  showReadingTime: true,
  /** Render the table of contents on article pages. */
  showTableOfContents: true,
  /** Minimum number of headings before the table of contents appears. */
  tocMinHeadings: 3,
} as const;

/** Generate a per-article OG image at build time with satori. */
export const OG = {
  enabled: true,
  width: 1200,
  height: 630,
} as const;
