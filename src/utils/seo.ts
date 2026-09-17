import { SITE_CONFIG } from '../config/site';

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/calculators?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getWebApplicationSchema(
  name: string,
  description: string,
  canonicalPath: string,
  category: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${name} - ${SITE_CONFIG.name}`,
    description: description,
    url: `${SITE_CONFIG.url}${canonicalPath}`,
    applicationCategory: category === 'Finance' ? 'FinanceApplication' : 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_CONFIG.url}${crumb.item}`,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
