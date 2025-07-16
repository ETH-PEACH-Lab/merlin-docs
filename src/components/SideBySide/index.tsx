import React from 'react';
import clsx from 'clsx';
import copy from 'copy-text-to-clipboard';
import LZString from 'lz-string';
import MermaidLiteViewer from '@site/src/components/MermaidLiteViewer';
import CodeBlock from '@site/src/components/CodeBlock';
import styles from './styles.module.css';

interface SideBySideProps {
  /** The mermaid diagram source code */
  children: React.ReactNode;
  /** Custom CSS class name */
  className?: string;
  /** Language to use for syntax highlighting (defaults to 'mermaid') */
  language?: string;
  /** Whether to show line numbers in the code block */
  showLineNumbers?: boolean;
  /** Title for the code section */
  codeTitle?: string;
  /** Title for the diagram section */
  diagramTitle?: string;
  /** Split ratio (0.3 = 30% code, 70% diagram) */
  splitRatio?: number;
  /** Theme for the mermaid diagram */
  theme?: 'default' | 'dark' | 'forest' | 'base' | 'neutral';
  /** Whether the MermaidLiteViewer should be bordered */
  bordered?: boolean | string;
  /** Whether the component should be resizable */
  resizable?: boolean;
  /** Fixed width for the MermaidLiteViewer in pixels */
  diagramWidth?: number;
  /** Fixed height for the MermaidLiteViewer in pixels */
  diagramHeight?: number;
  /** Aspect ratio for the MermaidLiteViewer (width/height) */
  aspectRatio?: number;
  /** Override the size in the generated Mermaid code - default true */
  overrideSize?: boolean;
}

export default function SideBySide({
  children,
  className,
  language = 'mermaid',
  showLineNumbers = true,
  codeTitle = 'Source Code',
  diagramTitle = 'Rendered Diagram',
  splitRatio = 0.5,
  theme = 'default',
  bordered = true,
  resizable = true,
  diagramWidth,
  diagramHeight,
  aspectRatio,
  overrideSize = true
}: SideBySideProps): JSX.Element {
  const [currentSplitRatio, setCurrentSplitRatio] = React.useState(splitRatio);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState<number>(250);
  const copyTimeoutRef = React.useRef<NodeJS.Timeout>();

  // Responsive: ignore split ratio on mobile (column layout)
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  const codeWidth = isMobile ? '100%' : `${currentSplitRatio * 100}%`;
  const diagramSectionWidth = isMobile ? '100%' : `${(1 - currentSplitRatio) * 100}%`;

  // Calculate container height based on diagram dimensions
  React.useEffect(() => {
    if (diagramHeight) {
      // Add padding and header height (approximately 50px for header + padding)
      setContainerHeight(diagramHeight + 80);
    } else if (diagramWidth && aspectRatio) {
      const calculatedHeight = diagramWidth / aspectRatio;
      setContainerHeight(calculatedHeight + 80);
    }
  }, [diagramHeight, diagramWidth, aspectRatio]);

  // Helper function to extract text content from React children
  const extractTextContent = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (typeof children === 'number') {
      return children.toString();
    }
    if (React.isValidElement(children)) {
      // Handle code blocks and other elements
      if (children.props?.children) {
        return extractTextContent(children.props.children);
      }
    }
    if (Array.isArray(children)) {
      return children.map(child => extractTextContent(child)).join('');
    }
    return '';
  };

  const textContent = extractTextContent(children).trim();

  // Copy button handler
  const handleCopy = React.useCallback(() => {
    copy(textContent);
    setIsCopied(true);
    
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    
    copyTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [textContent]);

  // Playground button handler
  const handleOpenInPlayground = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Compress the code using LZ-string
    const compressedCode = LZString.compressToBase64(textContent);
    
    // Create the playground URL
    const playgroundUrl = `https://eth-peach-lab.github.io/merlin/#/url/${language}/${compressedCode}`;
    
    // Open in new tab
    window.open(playgroundUrl, '_blank');
  }, [textContent, language]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  // Handle mouse events for resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!resizable) return;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current || !resizable) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newRatio = (e.clientX - rect.left) / rect.width;
    const clampedRatio = Math.max(0.2, Math.min(0.8, newRatio));
    setCurrentSplitRatio(clampedRatio);
  }, [isDragging, resizable]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef}
      className={clsx(
        styles.sideBySide, 
        resizable && styles.resizable,
        isDragging && styles.dragging,
        className
      )}
      style={{ minHeight: `${containerHeight}px` }}
    >
      <div className={styles.codeSection} style={{ width: codeWidth }}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>{codeTitle}</h4>
          <div className={styles.headerButtons}>
            <button
              className={clsx(styles.headerButton, styles.copyButton, isCopied && styles.copied)}
              onClick={handleCopy}
              title={isCopied ? 'Copied!' : 'Copy code'}
              aria-label={isCopied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
            >
              {isCopied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                  </svg>
                  Copy
                </>
              )}
            </button>
            {(language === 'merlin' || language === 'mermaid') && (
              <button
                className={clsx(styles.headerButton, styles.playgroundButton)}
                onClick={handleOpenInPlayground}
                title="Open in Merlin Editor"
                aria-label="Open code in Merlin Editor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/>
                </svg>
                Merlin Editor
              </button>
            )}
          </div>
        </div>
        <div className={styles.codeWrapper}>
          <CodeBlock 
            className={`language-${language}`}
            showLineNumbers={showLineNumbers}
          >
            {textContent}
          </CodeBlock>
        </div>
      </div>
      
      {resizable && (
        <div 
          className={clsx(styles.divider, styles.resizeDivider)}
          onMouseDown={handleMouseDown}
        />
      )}
      
      {!resizable && <div className={styles.divider} />}
      
      <div className={styles.diagramSection} style={{ width: diagramSectionWidth }}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>{diagramTitle}</h4>
        </div>
        <div className={styles.diagramWrapper}>
          <MermaidLiteViewer
            className={styles.mermaidDiagram}
            theme={theme}
            bordered={false}
            width={diagramWidth || 400}
            height={diagramHeight || containerHeight || 250}
            aspectRatio={aspectRatio}
            overrideSize={overrideSize}
          >
            {children}
          </MermaidLiteViewer>
        </div>
      </div>
    </div>
  );
}
