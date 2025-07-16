// Custom Merlin language definition for Prism.js
export const merlinLanguage = {
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
