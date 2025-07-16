
import React, { useEffect, useRef, useState } from "react";
import mermaid from '@eth-peach-lab/mermaid-merlin/packages/mermaid/dist/mermaid.esm.mjs';
import clsx from 'clsx';
import styles from './styles.module.css';

// Global rendering queue to ensure sequential rendering and prevent conflicts
let renderQueue: Array<() => Promise<void>> = [];
let isProcessingQueue = false;
let globalRenderCounter = 0;

const processRenderQueue = async () => {
  if (isProcessingQueue) return;
  isProcessingQueue = true;
  
  while (renderQueue.length > 0) {
    const renderFn = renderQueue.shift();
    if (renderFn) {
      try {
        await renderFn();
      } catch (error) {
        console.error('Error in render queue:', error);
      }
    }
  }
  
  isProcessingQueue = false;
};

const addToRenderQueue = (renderFn: () => Promise<void>) => {
  renderQueue.push(renderFn);
  processRenderQueue();
};

interface MermaidViewerProps {
  children: React.ReactNode;
  className?: string;
  exampleSvg?: string;
  setSvgContent?: (svg: string) => void;
  currentPage?: number;
  update?: (el: HTMLElement) => void;
  theme?: 'default' | 'dark' | 'forest' | 'base' | 'neutral';
  bordered?: boolean | string;
  useMerlinFork?: boolean | string;
}

const MermaidViewer = ({
  children,
  className,
  exampleSvg,
  setSvgContent,
  currentPage = 1,
  update,
  theme = 'forest',
  bordered = true,
  useMerlinFork = true,
}: MermaidViewerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rendererId] = useState(() => {
    const randomSuffix = Math.random().toString(36).substr(2, 9);
    const timestamp = Date.now();
    return `mermaid-${timestamp}-${randomSuffix}`;
  });
  const isRenderingRef = useRef(false);

  // Convert string booleans to actual booleans if needed
  const borderedBool = typeof bordered === 'string' ? bordered === 'true' : bordered;
  const useMerlinForkBool = typeof useMerlinFork === 'string' ? useMerlinFork === 'true' : useMerlinFork;

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

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      theme: "forest",
      logLevel: 5,
    });

    const setPage = (svg: string, pageIndex: number) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');
      const svgElement = doc.querySelector('svg');
      if (!svgElement) return svg;
      const pages = svgElement.querySelectorAll('g.page');
      pages.forEach(page => {
        page.setAttribute('display', 'none');
      });
      if (pages[pageIndex]) {
        pages[pageIndex].setAttribute('display', 'inline');
      }
      return new XMLSerializer().serializeToString(svgElement);
    };

    const renderMermaid = async () => {
      if (ref.current && !isRenderingRef.current) {
        // Add to queue to ensure sequential rendering
        addToRenderQueue(async () => {
          if (!ref.current || isRenderingRef.current) return;
          
          isRenderingRef.current = true;
          
          try {
            // Small delay to ensure DOM is ready
            await new Promise(resolve => setTimeout(resolve, 50));
            
            if (!ref.current) return; // Check again after delay
            
            if (exampleSvg) {
              ref.current.innerHTML = exampleSvg;
              update && update(ref.current);
              setSvgContent && setSvgContent(exampleSvg);
            } else {
              const textContent = extractTextContent(children).trim();
              if (textContent !== "") {
                // Create unique render ID to prevent conflicts
                const uniqueRendererId = `${rendererId}-${++globalRenderCounter}`;
                
                // Clear container before rendering
                ref.current.innerHTML = "";
                
                const { svg } = await mermaid.mermaidAPI.render(uniqueRendererId, textContent);
                
                // Double-check ref is still valid after async operation
                if (ref.current) {
                  const pagedSvg = setPage(svg, currentPage - 1);
                  ref.current.innerHTML = pagedSvg;
                  update && update(ref.current);
                  setSvgContent && setSvgContent(pagedSvg);
                }
              } else {
                // If no content, clear the container
                ref.current.innerHTML = "";
              }
            }
          } catch (error) {
            console.error("Mermaid render error:", error);
            if (ref.current) {
              ref.current.innerHTML = `<div style="color: red; padding: 10px; border: 1px solid red;">Error rendering diagram: ${error.message}</div>`;
            }
          } finally {
            isRenderingRef.current = false;
          }
        });
      }
    };

    renderMermaid();

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
      isRenderingRef.current = false;
    };
  }, [children, exampleSvg, currentPage, update, setSvgContent, theme, borderedBool, useMerlinForkBool]);

  return (
    <div className={clsx(
      styles.mermaidViewer,
      borderedBool && styles.bordered,
      className
    )}>
      <div ref={ref} className={styles.diagramContainer} />
    </div>
  );
};

export default MermaidViewer;
