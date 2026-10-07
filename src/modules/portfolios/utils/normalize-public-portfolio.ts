import type { Portfolio, PortfolioAddon, PortfolioMetricCard, PortfolioStepCard } from '@/types';

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function labels(value: unknown): string[] {
  return Array.isArray(value) ? value.map(text).filter(Boolean) : [];
}

function imageUrl(value: unknown): string | null {
  const url = text(value);
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' &&
      ['images.unsplash.com', 'res.cloudinary.com'].includes(parsed.hostname)
      ? url
      : null;
  } catch {
    return null;
  }
}

function stepCards(value: unknown): PortfolioStepCard[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    const card = record(item);
    if (!card || !text(card.title) || !text(card.desc)) return [];
    return [{ title: text(card.title), duration: text(card.duration), desc: text(card.desc) }];
  });
}

function metricCards(value: unknown): PortfolioMetricCard[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    const card = record(item);
    if (!card || !text(card.label) || !text(card.value)) return [];
    return [
      { label: text(card.label), value: text(card.value), caption: text(card.caption) || null },
    ];
  });
}

function addons(value: unknown, portfolioId: string): PortfolioAddon[] {
  if (!Array.isArray(value)) return [];
  const titles = {
    CHALLENGE: 'Challenge',
    APPROACH: 'Approach',
    DELIVERY: 'Delivery',
    RESULTS: 'Results',
  } as const;

  return value.flatMap((item, index) => {
    const addon = record(item);
    if (!addon || typeof addon.type !== 'string' || !(addon.type in titles)) return [];
    const type = addon.type as keyof typeof titles;
    return [
      {
        id: text(addon.id) || `${portfolioId}-${type}`,
        portfolioId,
        type,
        title: text(addon.title) || titles[type],
        content: text(addon.content) || null,
        imageUrl: imageUrl(addon.imageUrl),
        cards:
          type === 'DELIVERY'
            ? stepCards(addon.cards)
            : type === 'RESULTS'
              ? metricCards(addon.cards)
              : [],
        sortOrder: typeof addon.sortOrder === 'number' ? addon.sortOrder : index,
        createdAt: text(addon.createdAt),
        updatedAt: text(addon.updatedAt),
      },
    ];
  });
}

export function normalizePublicPortfolio(value: unknown): Portfolio | null {
  const portfolio = record(value);
  if (!portfolio || !text(portfolio.slug)) return null;

  const slug = text(portfolio.slug);
  const id = text(portfolio.id) || slug;
  return {
    id,
    slug,
    title: text(portfolio.title) || 'Portfolio',
    description: text(portfolio.description),
    overview: text(portfolio.overview) || null,
    imageUrl: imageUrl(portfolio.imageUrl),
    client: text(portfolio.client) || null,
    year: text(portfolio.year) || null,
    industry: text(portfolio.industry) || null,
    duration: text(portfolio.duration) || null,
    tags: labels(portfolio.tags),
    services: labels(portfolio.services),
    tech: labels(portfolio.tech),
    isPublished: portfolio.isPublished !== false,
    isFeatured: portfolio.isFeatured === true,
    sortOrder: typeof portfolio.sortOrder === 'number' ? portfolio.sortOrder : 0,
    addons: addons(portfolio.addons, id),
    createdAt: text(portfolio.createdAt),
    updatedAt: text(portfolio.updatedAt),
  };
}

export function normalizePublicPortfolioPage(
  value: unknown,
): { portfolios: Portfolio[]; totalPages: number } | null {
  const page = record(value);
  if (!page || !Array.isArray(page.items)) return null;

  const pagination = record(page.pagination);
  const totalPages = pagination?.totalPages;
  return {
    portfolios: page.items
      .map(normalizePublicPortfolio)
      .filter((portfolio): portfolio is Portfolio => portfolio !== null && portfolio.isPublished),
    totalPages:
      typeof totalPages === 'number' && Number.isInteger(totalPages) && totalPages > 0
        ? totalPages
        : 1,
  };
}
