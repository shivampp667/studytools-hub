import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/site';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string[];
  jsonLd?: object | object[] | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  keywords = [],
  jsonLd,
}) => {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
  const fullDescription = description || SITE_CONFIG.description;
  const canonicalUrl = `${SITE_CONFIG.url}${canonicalPath}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to set meta tag content
    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('meta[name="description"]', 'name', 'description', fullDescription);
    if (keywords.length > 0) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    }

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', fullDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_CONFIG.name);

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', fullDescription);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 3. Inject JSON-LD Schema
    const scriptId = 'json-ld-structured-data';
    let existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [fullTitle, fullDescription, canonicalUrl, keywords, jsonLd]);

  return null;
};
