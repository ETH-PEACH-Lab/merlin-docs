import siteConfig from '@generated/docusaurus.config';
import type * as PrismNamespace from 'prismjs';
import type {Optional} from 'utility-types';

// Merlin language definition
function defineMerlinLanguage(Prism: typeof PrismNamespace) {
  Prism.languages.merlin = {
    'keyword': {
      pattern: /\b(?:page|show|hide|visslides|data|draw)\b/,
      greedy: true
    },
    'component': {
      pattern: /\b(?:array|matrix|linkedlist|stack|tree|graph|text)\b/,
      greedy: true
    },
    'attribute': {
      pattern: /\b(?:id|value|color|arrow|nodes|edges|hidden|above|below|left|right|fontSize|fontWeight|fontFamily|align|lineSpacing|width|height|children)\b/,
      greedy: true
    },
    'positional': {
      pattern: /\b(?:tl|tr|bl|br|top-left|top-right|bottom-left|bottom-right|top|bottom|left|right|center|centre|\d+x\d+)\b/,
      greedy: true
    },
    'dot-command': {
      pattern: /\b(?:set|add|remove|insert)\w*\b/,
      greedy: true
    },
    'variable': {
      pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*-[a-zA-Z_][a-zA-Z0-9_]*\b|\b[a-zA-Z_][a-zA-Z0-9_]*\b/,
      greedy: true
    },
    'number': /\b\d+(?:\.\d+)?\b/,
    'string': {
      pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
      greedy: true
    },
    'symbol': /[:=*,@&()[\]{}]/,
    'comment': {
      pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
      greedy: true
    }
  };
}

export default function prismIncludeLanguages(
  PrismObject: typeof PrismNamespace,
): void {
  const {
    themeConfig: {prism},
  } = siteConfig;
  const {additionalLanguages} = prism as {additionalLanguages: string[]};

  // Prism components work on the Prism instance on the window, while prism-
  // react-renderer uses its own Prism instance. We temporarily mount the
  // instance onto window, import components to enhance it, then remove it to
  // avoid polluting global namespace.
  // You can mutate PrismObject: registering plugins, deleting languages... As
  // long as you don't re-assign it

  const PrismBefore = globalThis.Prism;
  globalThis.Prism = PrismObject;

  // Define Merlin language
  defineMerlinLanguage(PrismObject);

  additionalLanguages.forEach((lang) => {
    if (lang === 'php') {
      // eslint-disable-next-line global-require
      require('prismjs/components/prism-markup-templating.js');
    }
    if (lang === 'merlin') {
      // Merlin is already defined above, skip
      return;
    }
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`prismjs/components/prism-${lang}`);
  });

  // Clean up and eventually restore former globalThis.Prism object (if any)
  delete (globalThis as Optional<typeof globalThis, 'Prism'>).Prism;
  if (typeof PrismBefore !== 'undefined') {
    globalThis.Prism = PrismBefore;
  }
}
