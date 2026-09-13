'use client';

import { useEffect, useRef } from 'react';

/**
 * DeveloperConsoleSignature Component
 * Injects a styled signature, developer branding, and interactive DevTools inspection API
 * into the browser console log.
 */
export default function ConsoleSignature() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Guard against non-browser environments
    if (typeof window === 'undefined') return;

    const titleStyle =
      'font-size: 15px; font-weight: 800; color: #6366f1; background: #0f172a; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(99,102,241,0.5); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;';
    const labelStyle = 'font-weight: 700; color: #06b6d4; font-family: ui-monospace, monospace;';
    const textStyle = 'color: #64748b; font-family: ui-monospace, monospace;';
    const linkStyle = 'color: #6366f1; font-weight: 600; text-decoration: underline; font-family: ui-monospace, monospace;';
    const highlightStyle = 'color: #10b981; font-weight: 600; font-family: ui-monospace, monospace;';

    console.log('%c⚡ AIToolBox.io — AI & LLM Engineering Suite', titleStyle);
    console.log(
      '%c👨‍💻 Developer: %cKarthikeyan T (@carthworks)\n' +
      '%c✉️  Email:     %ctkarthikeyan@gmail.com\n' +
      '%c💼 LinkedIn:  %chttps://www.linkedin.com/in/carthworks\n' +
      '%c🐙 GitHub:    %chttps://github.com/carthworks\n' +
      '%c📦 Repo:      %chttps://github.com/carthworks/aitoolsbox\n' +
      '%c📜 License:   %cMIT\n' +
      '%c🔒 Privacy:   %cClient-Side Zero-Retention by Design',
      labelStyle, textStyle,
      labelStyle, textStyle,
      labelStyle, linkStyle,
      labelStyle, linkStyle,
      labelStyle, linkStyle,
      labelStyle, textStyle,
      labelStyle, highlightStyle
    );

    console.log(
      '%c💡 Quick Tip:%c Run %cAIToolBox.help()%c in DevTools to inspect available tools & shortcuts!',
      'font-weight: bold; color: #f59e0b;',
      'color: #64748b;',
      'font-family: monospace; color: #06b6d4; background: rgba(6,182,212,0.12); padding: 1px 5px; border-radius: 4px; font-weight: 600;',
      'color: #64748b;'
    );

    // Global Interactive DevTools API
    (window as any).AIToolBox = {
      version: '0.1.0',
      developer: {
        name: 'Karthikeyan T',
        handle: '@carthworks',
        email: 'tkarthikeyan@gmail.com',
        github: 'https://github.com/carthworks',
        linkedIn: 'https://www.linkedin.com/in/carthworks'
      },
      project: {
        name: 'AIToolBox.io',
        url: 'https://aitoolbox.io',
        repository: 'https://github.com/carthworks/aitoolsbox',
        license: 'MIT',
        privacy: 'Client-side processing only. No prompts/data stored on servers.'
      },
      categories: [
        'Prompt Engineering & Testing',
        'Model Training & Fine-Tuning',
        'AI Safety & Moderation',
        'Dataset & Embedding Tools',
        'Cybersecurity & Network Tools'
      ],
      help: () => {
        console.table({
          'AIToolBox.developer': 'Author, GitHub, and contact information',
          'AIToolBox.project': 'Repository, license, and privacy architecture',
          'AIToolBox.categories': 'Listing of active AI tool suites',
          'AIToolBox.version': 'Current platform release version'
        });
        return '🚀 Ready to inspect AIToolBox.io!';
      }
    };
  }, []);

  return null;
}
