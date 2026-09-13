import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aitoolbox.io';
  const currentDate = new Date().toISOString();

  const coreRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/how-to-use',
    '/prompt-template',
    '/token-counter',
    '/rag-chunking',
    '/content-moderation',
    '/jailbreak-tester',
    '/bias-detector',
    '/dataset-cleaner',
    '/finetune-config',
    '/model-comparison',
    '/ai-glossary',
    '/api-tester',
    '/embedding-visualizer',
    '/text-labeler',
    '/web-security-scan',
    '/cve-feed',
    '/jwt',
    '/cert-parser',
    '/password-strength',
  ];

  return coreRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
