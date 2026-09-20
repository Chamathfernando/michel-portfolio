export type WorkKey = 'tote' | 'brighter' | 'people' | 'good' | 'story';

export interface WorkItem {
  /** File inside src/assets/ */
  file: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  category: string;
  year: string;
  subtitle: string;
  description: string;
}

/** Case-study copy shown in the modal. Replace the text with the real project details. */
export const WORKS: Record<WorkKey, WorkItem> = {
  tote: {
    file: 'ideas-people-impact.webp', width: 720, height: 1031,
    alt: 'Canvas tote bag printed with the words Ideas People Impact',
    title: 'Ideas People Impact', category: 'Campaign Merchandise', year: '2024',
    subtitle: 'Canvas Tote Campaign',
    description: 'A simple everyday carry piece that turns a three-word philosophy into a walking brand statement.',
  },
  brighter: {
    file: 'brighter-tomorrow.webp', width: 720, height: 1018,
    alt: 'A Brighter Tomorrow book cover in a kraft sleeve',
    title: 'A Brighter Tomorrow', category: 'Editorial & Packaging', year: '2025',
    subtitle: 'Book Cover and Kraft Sleeve',
    description: 'A hopeful publication paired with natural kraft packaging, where botanical illustration signals growth, care and renewal.',
  },
  people: {
    file: 'people-make-brands.webp', width: 720, height: 1053,
    alt: 'People Make Brands billboard on a brick building',
    title: 'Civic Architecture Voices', category: 'Environmental Identity', year: '2024',
    subtitle: 'Cultural Pavilion Outdoor Wayfinding',
    description: 'Massive vertical fabric banners installed along metropolitan boulevards to celebrate community resilience and civic progress.',
  },
  good: {
    file: 'good-brands.webp', width: 720, height: 1005,
    alt: 'Black notebook debossed with Good Brands Better People',
    title: 'Good Brands Better People', category: 'Print & Stationery', year: '2024',
    subtitle: 'Debossed Notebook Collection',
    description: 'A tactile stationery series built around one conviction: that the best brands are shaped by better people.',
  },
  story: {
    file: 'our-story.webp', width: 720, height: 1063,
    alt: 'Open Our Story brand publication beside coloured covers',
    title: 'Our Story', category: 'Brand Publication', year: '2023',
    subtitle: 'Brand Narrative Publication',
    description: 'A publication that gathers a company’s origins, people and purpose into a single, beautifully paced narrative.',
  },
};

/**
 * The grid, one array per page (12 per page). Replace page 2 with your remaining
 * projects; the keys above are the 5 supplied mock-ups.
 */
export const PAGES: readonly (readonly WorkKey[])[] = [
  ['tote', 'brighter', 'people', 'good', 'story', 'people', 'good', 'tote', 'brighter', 'story', 'people', 'good'],
  ['story', 'good', 'tote', 'brighter', 'people', 'tote', 'brighter', 'good', 'story', 'people', 'good', 'tote'],
];

export const WORKS_PER_PAGE = 12;
export const TOTAL_WORKS = 24;
