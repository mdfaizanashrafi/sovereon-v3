/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { TOPIC_PAGES } from '../data/seoContent';

interface SEOManagerProps {
  activeRoute: string;
}

export default function SEOManager({ activeRoute }: SEOManagerProps) {
  useEffect(() => {
    // 1. Establish Default Fallback Values (Task 3 Requirement)
    let title = 'Sovereon LLP | SaaS & AI Automation Company';
    let description = 'Sovereon builds SaaS products and AI automation systems that solve specific real-world business pain points at scale.';
    let canonical = 'https://sovereon.online' + (activeRoute === '/' ? '' : activeRoute);
    let isBlogPost = false;
    let isTopicPage = false;
    let currentBlog: any = null;
    let currentTopic: any = null;

    // Remove trailing slashes for canonical correctness
    if (canonical.endsWith('/') && canonical !== 'https://sovereon.online') {
      canonical = canonical.slice(0, -1);
    }

    // 2. Route Matching Logic (Task 1 Primary SEO Routes + Fallbacks)
    if (activeRoute === '/philosophy') {
      title = 'Our Philosophy & Systems Engineering Beliefs | Sovereon LLP';
      description = 'Discover the core systems engineering principles behind Sovereon LLP. We believe in digital sovereignty, zero-trust modular monoliths, and mathematically-proven scalability.';
    } else if (activeRoute === '/solutions') {
      title = 'SaaS Solutions & Advanced Software Engineering | Sovereon LLP';
      description = 'Explore Sovereon LLP\'s advanced SaaS products, custom order engines, and high-performance AI automation models engineered for enterprise clients.';
    } else if (activeRoute === '/about') {
      title = 'About Sovereon LLP | Lead Systems Architect Md Faizan Ashrafi';
      description = 'Founded by Md Faizan Ashrafi, Sovereon LLP is an enterprise-grade software engineering firm based in Bangalore, India, building sovereign systems and SaaS.';
    } else if (activeRoute === '/contact') {
      title = 'Contact Sovereon LLP | Bangalore Engineering Dispatch Office';
      description = 'Connect with Sovereon LLP for a technical systems consultation. Open support tickets, reach our Bangalore HQ, or email partners directly.';
    } else if (activeRoute === '/blog') {
      title = 'Sovereon Engineering Blog | Software Architecture & AI Insights';
      description = 'Read technical articles and systems design guides from Sovereon LLP. Deep dives into modular monoliths, high-concurrency checkout flows, and AI automation.';
    } else if (activeRoute.startsWith('/blog/')) {
      const slug = activeRoute.substring(6);
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (post) {
        title = `${post.title} | Sovereon Blog`;
        description = post.excerpt;
        isBlogPost = true;
        currentBlog = post;
      }
    } else if (TOPIC_PAGES[activeRoute]) {
      const topic = TOPIC_PAGES[activeRoute];
      title = topic.title;
      description = topic.metaDescription;
      isTopicPage = true;
      currentTopic = topic;
    }

    // 3. Update Title & Meta Tags dynamically
    document.title = title;

    const updateOrCreateMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[property=')) {
          const propName = selector.slice(15, -2);
          element.setAttribute('property', propName);
        } else if (selector.startsWith('meta[name=')) {
          const nameValue = selector.slice(11, -2);
          element.setAttribute('name', nameValue);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    const updateOrCreateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta Updates
    updateOrCreateMeta('meta[name="description"]', 'content', description);
    updateOrCreateMeta('meta[name="robots"]', 'content', 'index, follow');
    updateOrCreateLink('canonical', canonical);

    // Open Graph updates
    updateOrCreateMeta('meta[property="og:title"]', 'content', title);
    updateOrCreateMeta('meta[property="og:description"]', 'content', description);
    updateOrCreateMeta('meta[property="og:url"]', 'content', canonical);
    updateOrCreateMeta('meta[property="og:image"]', 'content', 'https://res.cloudinary.com/dn8rbacc5/image/upload/v1783247054/founder_od2lw5.png');
    updateOrCreateMeta('meta[property="og:type"]', 'content', isBlogPost ? 'article' : 'website');

    // Twitter Updates
    updateOrCreateMeta('meta[name="twitter:title"]', 'content', title);
    updateOrCreateMeta('meta[name="twitter:description"]', 'content', description);
    updateOrCreateMeta('meta[name="twitter:url"]', 'content', canonical);
    updateOrCreateMeta('meta[name="twitter:image"]', 'content', 'https://res.cloudinary.com/dn8rbacc5/image/upload/v1783247054/founder_od2lw5.png');

    // 4. Push Google Analytics 4 Virtual Pageview
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: activeRoute,
        page_title: title,
        send_to: 'G-8BBE67ZXNH'
      });
    }

    // 5. Schema Graph JSON-LD Injection (Structured Data Graph)
    const existingScripts = document.querySelectorAll('script[data-seo="jsonld"]');
    existingScripts.forEach((script) => script.remove());

    // Assemble dynamic Breadcrumbs list
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://sovereon.online/'
      }
    ];

    if (activeRoute !== '/') {
      let relativePath = activeRoute;
      let name = activeRoute.substring(1).toUpperCase().replace('-', ' ');
      
      if (isBlogPost) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': 2,
          'name': 'Blog',
          'item': 'https://sovereon.online/blog'
        });
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': 3,
          'name': currentBlog ? currentBlog.title : name,
          'item': `https://sovereon.online${relativePath}`
        });
      } else {
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': 2,
          'name': isTopicPage && currentTopic ? currentTopic.h1 : name,
          'item': `https://sovereon.online${relativePath}`
        });
      }
    }

    // Standard Schema Graph Definitions
    const baseGraph: any[] = [
      {
        '@type': 'Organization',
        '@id': 'https://sovereon.online/#organization',
        'name': 'Sovereon LLP',
        'url': 'https://sovereon.online',
        'logo': 'https://sovereon.online/favicon.svg',
        'image': 'https://res.cloudinary.com/dn8rbacc5/image/upload/v1783247054/founder_od2lw5.png',
        'description': 'Sovereon LLP builds advanced SaaS products and AI automation systems that solve specific real-world business pain points at scale.',
        'telephone': '+91 7439368190',
        'email': 'sovereon@sovereon.online',
        'founder': {
          '@id': 'https://sovereon.online/#founder'
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+91 7439368190',
          'contactType': 'customer service',
          'email': 'sovereon@sovereon.online',
          'areaServed': ['IN', 'US', 'GB', 'DE', 'AE']
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://sovereon.online/#localbusiness',
        'name': 'Sovereon LLP',
        'telephone': '+91 7439368190',
        'email': 'sovereon@sovereon.online',
        'url': 'https://sovereon.online',
        'image': 'https://res.cloudinary.com/dn8rbacc5/image/upload/v1783247054/founder_od2lw5.png',
        'priceRange': '$$',
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '19:00'
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Door No. 675, 13th Cross, 29th Main Road, BTM 2nd Stage',
          'addressLocality': 'Bengaluru',
          'addressRegion': 'Karnataka',
          'postalCode': '560076',
          'addressCountry': 'IN'
        },
        'areaServed': [
          {
            '@type': 'AdministrativeArea',
            'name': 'India'
          },
          {
            '@type': 'AdministrativeArea',
            'name': 'Global'
          }
        ]
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://sovereon.online/#professionalservice',
        'name': 'Sovereon LLP Systems Engineering',
        'url': 'https://sovereon.online',
        'description': 'Enterprise-grade SaaS development, AI automation agents, and advanced full-stack systems engineering.',
        'telephone': '+91 7439368190',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Door No. 675, 13th Cross, 29th Main Road, BTM 2nd Stage',
          'addressLocality': 'Bengaluru',
          'addressRegion': 'Karnataka',
          'postalCode': '560076',
          'addressCountry': 'IN'
        }
      },
      {
        '@type': 'Person',
        '@id': 'https://sovereon.online/#founder',
        'name': 'Md Faizan Ashrafi',
        'jobTitle': 'Founder & CEO',
        'worksFor': {
          '@id': 'https://sovereon.online/#organization'
        },
        'sameAs': [
          'https://github.com/mdfaizanashrafi'
        ],
        'image': 'https://res.cloudinary.com/dn8rbacc5/image/upload/v1783247054/founder_od2lw5.png'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sovereon.online/#website',
        'name': 'Sovereon LLP',
        'url': 'https://sovereon.online',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://sovereon.online/?search={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://sovereon.online/#breadcrumb',
        'itemListElement': breadcrumbItems
      }
    ];

    // If activeRoute is a blog post, add Article and WebPage schema (Task 3 + Task 8)
    if (isBlogPost && currentBlog) {
      baseGraph.push({
        '@type': 'TechArticle',
        '@id': `https://sovereon.online${activeRoute}/#article`,
        'isPartOf': `https://sovereon.online${activeRoute}`,
        'headline': currentBlog.title,
        'description': currentBlog.excerpt,
        'inLanguage': 'en-US',
        'mainEntityOfPage': `https://sovereon.online${activeRoute}`,
        'datePublished': new Date(currentBlog.date).toISOString().split('T')[0],
        'dateModified': new Date(currentBlog.date).toISOString().split('T')[0],
        'author': {
          '@id': 'https://sovereon.online/#founder'
        },
        'publisher': {
          '@id': 'https://sovereon.online/#organization'
        },
        'image': 'https://res.cloudinary.com/dn8rbacc5/image/upload/v1783247054/founder_od2lw5.png'
      });
      baseGraph.push({
        '@type': 'WebPage',
        '@id': `https://sovereon.online${activeRoute}`,
        'url': `https://sovereon.online${activeRoute}`,
        'name': currentBlog.title,
        'isPartOf': {
          '@id': 'https://sovereon.online/#website'
        },
        'description': currentBlog.excerpt,
        'breadcrumb': {
          '@id': 'https://sovereon.online/#breadcrumb'
        }
      });
    } else if (isTopicPage && currentTopic) {
      // Add Article & WebPage schema for topical clusters
      baseGraph.push({
        '@type': 'Article',
        '@id': `https://sovereon.online${activeRoute}/#article`,
        'isPartOf': `https://sovereon.online${activeRoute}`,
        'headline': currentTopic.title,
        'description': currentTopic.metaDescription,
        'inLanguage': 'en-US',
        'mainEntityOfPage': `https://sovereon.online${activeRoute}`,
        'author': {
          '@id': 'https://sovereon.online/#founder'
        },
        'publisher': {
          '@id': 'https://sovereon.online/#organization'
        },
        'image': 'https://res.cloudinary.com/dn8rbacc5/image/upload/v1783247054/founder_od2lw5.png'
      });
      baseGraph.push({
        '@type': 'WebPage',
        '@id': `https://sovereon.online${activeRoute}`,
        'url': `https://sovereon.online${activeRoute}`,
        'name': currentTopic.title,
        'isPartOf': {
          '@id': 'https://sovereon.online/#website'
        },
        'description': currentTopic.metaDescription,
        'breadcrumb': {
          '@id': 'https://sovereon.online/#breadcrumb'
        }
      });
    }

    const schemaGraph = {
      '@context': 'https://schema.org',
      '@graph': baseGraph
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'jsonld');
    script.text = JSON.stringify(schemaGraph);
    document.head.appendChild(script);

  }, [activeRoute]);

  return null;
}
