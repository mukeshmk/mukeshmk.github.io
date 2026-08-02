/**
 * Typed presentation layer over the site's profile data.
 *
 * The editable *facts* (name, role, contact details, socials, bio) live in
 * `profile.json` so content can be updated without touching code. This module
 * imports that JSON and exposes it as a strongly-typed `site` object, plus the
 * navigation config and inline social icon SVGs (which are presentation, not
 * content, so they stay here).
 */
import profile from './profile.json';

export const site = {
  name: profile.name,
  role: profile.role,
  company: profile.company,
  url: profile.url,
  location: profile.location,
  email: profile.email,
  phone: profile.phone,
  description: profile.description,
  ogImage: profile.ogImage,
  resume: profile.resume,
} as const;

/** Full profile record (bio, focus areas, honors, etc.) for richer sections. */
export { profile };

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation. In-page anchors on the landing page + the blog route. */
export const navLinks: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export interface SocialLink {
  label: string;
  href: string;
  /** Inline SVG icon markup rendered with set:html. */
  icon: string;
}

// Simple, dependency-free inline SVG icons (currentColor, 24x24).
const icons: Record<string, string> = {
  github:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3.01-.4c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>',
  email:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-5 w-5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
};

/** Socials come from profile.json; icons are matched by their `key`. */
export const socials: SocialLink[] = profile.socials.map((s) => ({
  label: s.label,
  href: s.href,
  icon: icons[s.key] ?? '',
}));
