import { MetadataRoute } from 'next';

const BASE_URL = 'https://aipokerschool.com';

const variants = [
  'no-limit-holdem',
  'limit-holdem',
  'pot-limit-omaha',
  'omaha-hi-lo',
  'five-card-omaha',
  'seven-card-stud',
  'seven-card-stud-hi-lo',
  'razz',
  'two-seven-triple-draw',
  'two-seven-single-draw',
  'five-card-draw',
  'badugi',
  'badeucy',
  'a5-triple-draw',
  'short-deck-holdem',
  'chinese-poker',
  'open-face-chinese-poker',
  'pineapple',
  'crazy-pineapple',
  'irish-poker',
  'horse',
  'eight-game',
  'dealers-choice',
  'courchevel',
  'big-o',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/play`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/coach`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/learn`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/gto`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/history`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/trivia`, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE_URL}/pricing`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly' as const, priority: 0.5 },
  ];

  const variantPages = variants.map((variant) => ({
    url: `${BASE_URL}/learn/${variant}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...variantPages];
}
