export const SECTION_IDS = ['home', 'about', 'work', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface NavItem {
  id: SectionId;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export interface SocialLink {
  id: string;
  label: string;
  /** Replace '#' with the real profile URL. */
  href: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'x', label: 'X (Twitter)', href: '#' },
  { id: 'pinterest', label: 'Pinterest', href: '#' },
  { id: 'behance', label: 'Behance', href: '#' },
];
