import React from 'react';
import { Highlight, themes, type HighlightProps } from 'prism-react-renderer';
import PlaygroundButton from '@site/src/theme/CodeBlock/Buttons/PlaygroundButton';
import { merlinLanguage } from '../../utils/merlinLanguage';
import styles from './styles.module.css';

interface CodeBlockProps {
  children: string;
  className?: string;
  showLineNumbers?: boolean;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  className = '', 
  showLineNumbers = false,
  title 
}) => {
  const language = className.replace(/language-/, '') || 'text';
  const code = children.trim();

  // Check if this is a Merlin code block
  const isMerlinCode = language === 'merlin';

  return (
    <div className={styles.codeBlockContainer}>
      {title && <div className={styles.codeBlockTitle}>{title}</div>}
      <div className={styles.codeBlockWrapper}>
        {React.createElement(Highlight as React.ComponentType<HighlightProps>, {
          code,
          language: isMerlinCode ? 'merlin' : language,
          theme: themes.github,
          children: ({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={`${highlightClassName} ${styles.codeBlock} ${isMerlinCode ? styles.merlinCodeBlock : ''}`} 
              style={style}
            >
              <code>
                {tokens.map((line, i) => {
                  const { key: lineKey, ...lineProps } = getLineProps({ line, key: i });
                  return (
                    <div key={i} {...lineProps} className={styles.codeLine}>
                    {showLineNumbers && (
                      <span className={styles.lineNumber}>{i + 1}</span>
                    )}
                    <span className={styles.lineContent}>
                      {line.map((token, key) => {
                        const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key });
                        
                        // Apply custom Merlin styling
                        if (isMerlinCode) {
                          const tokenText = token.content;
                          let customClassName = '';
                          
                          // Keywords
                          if (/\b(?:page|show|hide|visslides|data|draw)\b/.test(tokenText)) {
                            customClassName = styles.merlinKeyword;
                          }
                          // Components
                          else if (/\b(?:array|matrix|linkedlist|stack|tree|graph|text)\b/.test(tokenText)) {
                            customClassName = styles.merlinComponent;
                          }
                          // Attributes
                          else if (/\b(?:id|value|color|arrow|nodes|edges|hidden|above|below|left|right|fontSize|fontWeight|fontFamily|align|lineSpacing|width|height|children)\b/.test(tokenText)) {
                            customClassName = styles.merlinAttribute;
                          }
                          // Positional
                          else if (/\b(?:tl|tr|bl|br|top-left|top-right|bottom-left|bottom-right|top|bottom|left|right|center|centre|\d+x\d+)\b/.test(tokenText)) {
                            customClassName = styles.merlinPositional;
                          }
                          // Commands
                          else if (/\b(?:set|add|remove|insert)\w*\b/.test(tokenText)) {
                            customClassName = styles.merlinCommand;
                          }
                          // Variables/edges
                          else if (/\b[a-zA-Z_][a-zA-Z0-9_]*-[a-zA-Z_][a-zA-Z0-9_]*\b/.test(tokenText)) {
                            customClassName = styles.merlinVariable;
                          }
                          // Numbers
                          else if (/\b\d+(?:\.\d+)?\b/.test(tokenText)) {
                            customClassName = styles.merlinNumber;
                          }
                          // Strings
                          else if (/^["'].*["']$/.test(tokenText)) {
                            customClassName = styles.merlinString;
                          }
                          // Comments
                          else if (/^\/\/.*|^\/\*[\s\S]*?\*\/$/.test(tokenText)) {
                            customClassName = styles.merlinComment;
                          }
                          
                          if (customClassName) {
                            tokenProps.className = `${tokenProps.className} ${customClassName}`;
                          }
                        }
                        
                        return <span key={key} {...tokenProps} />;
                      })}
                    </span>
                  </div>
                  );
                })}
              </code>
            </pre>
          )
        })}
        {(isMerlinCode || language === 'merlin') && (
          <div className={styles.playgroundButtonContainer}>
            <PlaygroundButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
