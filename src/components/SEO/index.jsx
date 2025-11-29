import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component for managing dynamic meta tags
 */
export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}) {
  const location = useLocation();
  const baseUrl = 'https://alrehleh.web.app';
  const currentUrl = url || `${baseUrl}${location.pathname}`;
  const defaultImage = `${baseUrl}/src/assets/images/icons/logo-colored.png`;

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (property, content, isProperty = false) => {
      if (!content) return;

      const selector = isProperty
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update meta tags
    if (title) {
      updateMetaTag('title', title);
    }
    if (description) {
      updateMetaTag('description', description);
    }
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image || defaultImage, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);

    // Update Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image || defaultImage, true);
    updateMetaTag('twitter:url', currentUrl, true);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
  }, [title, description, keywords, image, url, type, currentUrl, defaultImage]);

  return null;
}

