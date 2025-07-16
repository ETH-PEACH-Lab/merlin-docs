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

interface MermaidLiteViewerProps {
  children: React.ReactNode;
  className?: string;
  setSvgContent?: (svg: string) => void;
  currentPage?: number;
  update?: (el: HTMLElement) => void;
  theme?: 'default' | 'dark' | 'forest' | 'base' | 'neutral';
  bordered?: boolean | string;
  /** Fixed width in pixels */
  width?: number;
  /** Fixed height in pixels */
  height?: number;
  /** Aspect ratio (width/height) - overrides height if both height and aspectRatio are provided */
  aspectRatio?: number;
  /** Override the size in the generated Mermaid code - default true */
  overrideSize?: boolean;
}

interface CompilationResult {
  success: boolean;
  parsed?: any;
  mermaid?: string;
  pages?: any;
  error?: string;
  line?: number | null;
  col?: number | null;
  extractedSize?: {width: number, height: number} | null;
}

const MermaidLiteViewer = ({
  children,
  className,
  setSvgContent,
  currentPage = 1,
  update,
  theme = 'forest',
  bordered = true,
  width = 500,
  height = 300,
  aspectRatio,
  overrideSize = true,
}: MermaidLiteViewerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [compilationError, setCompilationError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [rendererId] = useState(() => {
    // Create a truly unique ID that includes component position, content hash, and timestamp
    const randomSuffix = Math.random().toString(36).substr(2, 9);
    const timestamp = Date.now();

    return `merlin-lite-${timestamp}-${randomSuffix}`;
  });
  const isRenderingRef = useRef(false);

  // Helper function to extract text content from React children
  const extractTextContent = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (typeof children === 'number') {
      return children.toString();
    }
    if (React.isValidElement(children)) {
      return extractTextContent(children.props.children);
    }
    if (Array.isArray(children)) {
      return children.map(child => extractTextContent(child)).join('');
    }
    return '';
  };

  // Memoize the extracted content to prevent unnecessary re-renders
  const merlinLiteContent = React.useMemo(() => {
    const baseContent = extractTextContent(children).trim();
    // CRITICAL: Inject unique identifier into the source content to ensure no two components
    // can ever have the same content, even if the user provides identical source
    const uniqueSourceComment = `// Unique component: ${rendererId}`;
    return uniqueSourceComment + '\n' + baseContent;
  }, [children, rendererId]);

  // Generate a content-based identifier to ensure proper isolation
  const contentHash = React.useMemo(() => {
    return merlinLiteContent.split('').reduce((hash, char) => {
      return ((hash << 5) - hash + char.charCodeAt(0)) & 0xffffffff;
    }, 0).toString(36);
  }, [merlinLiteContent]);
  const [extractedSize, setExtractedSize] = useState<{width: number, height: number} | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [internalCurrentPage, setInternalCurrentPage] = useState<number>(currentPage - 1); // Convert to 0-based indexing

  // Convert string booleans to actual booleans if needed
  const borderedBool = typeof bordered === 'string' ? bordered === 'true' : bordered;

  // Sync internal page state with prop changes
  useEffect(() => {
    setInternalCurrentPage(currentPage - 1); // Convert 1-based to 0-based
  }, [currentPage]);

  // Calculate final dimensions - memoized to prevent infinite re-renders
  const finalDimensions = React.useMemo(() => {
    if (width && aspectRatio) {
      return { width, height: width / aspectRatio };
    }
    if (width && height) {
      return { width, height };
    }
    if (extractedSize) {
      return extractedSize;
    }
    return null;
  }, [width, height, aspectRatio, extractedSize]);

  // Function to compile Merlin Lite to Mermaid following the guide
  const compileMerlinLiteToMerlin = async (merlinLiteCode: string): Promise<CompilationResult> => {
    try {
      console.log(`[${rendererId}] Starting compilation of:`, merlinLiteCode);
      
      // Step 1: Parse Merlin Lite using dynamic import
      console.log(`[${rendererId}] Importing parseText...`);
      const { default: parseText } = await import('@eth-peach-lab/merlin/src/parser/parseText.mjs');
      console.log(`[${rendererId}] parseText imported successfully`);
      
      console.log(`[${rendererId}] Parsing text...`);
      const parsedData = parseText(merlinLiteCode);
      console.log(`[${rendererId}] Parse successful:`, parsedData);
      
      // Step 2: Compile to Mermaid/Merlin using dynamic import
      console.log(`[${rendererId}] Importing compiler...`);
      const { default: compiler } = await import('@eth-peach-lab/merlin/src/compiler/compiler.mjs');
      console.log(`[${rendererId}] Compiler imported successfully`);
      
      console.log(`[${rendererId}] Compiling...`);
      const { mermaidString, compiled_pages } = compiler(parsedData);
      console.log(`[${rendererId}] Compilation successful, generated mermaid:`, mermaidString);
      
      // Extract size from mermaid string
      const sizeMatch = mermaidString.match(/size:\s*\((\d+),(\d+)\)/);
      let extractedSize = null;
      if (sizeMatch) {
        extractedSize = {
          width: parseInt(sizeMatch[1], 10),
          height: parseInt(sizeMatch[2], 10)
        };
        console.log(`[${rendererId}] Extracted size:`, extractedSize);
      }
      
      return {
        success: true,
        parsed: parsedData,
        mermaid: mermaidString,
        pages: compiled_pages,
        extractedSize
      };
    } catch (error: any) {
      console.error(`[${rendererId}] Compilation error:`, error);
      console.error(`[${rendererId}] Error details:`, {
        message: error.message,
        line: error.line,
        col: error.col,
        stack: error.stack
      });
      
      return {
        success: false,
        error: error.message,
        line: error.line || null,
        col: error.col || null
      };
    }
  };

  useEffect(() => {
    const initializeMermaid = async () => {
      // First, ensure mermaid is properly initialized
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "forest",
        logLevel: 5,
      });
      
      // CRITICAL: Register external diagrams to make visual diagrams available
      try {
        console.log('🔧 MermaidLiteViewer: Registering external diagrams...');
        await mermaid.registerExternalDiagrams([]);
        console.log('✅ MermaidLiteViewer: External diagrams registered successfully');
        
        // Test if visual diagram is now detected
        try {
          const testResult = mermaid.detectType('visual\nsize: (400,300)\npage\ntree');
          console.log('🎯 MermaidLiteViewer: Visual diagram detection test:', testResult);
        } catch (e) {
          console.warn('❌ MermaidLiteViewer: Visual diagram detection test failed:', e.message);
        }
        
        // Additional debugging - check what diagrams are available
        console.log('🔍 MermaidLiteViewer: Available mermaid methods:', Object.keys(mermaid));
        console.log('🔍 MermaidLiteViewer: Mermaid version check - this should be the updated component');
      } catch (e) {
        console.error('💥 MermaidLiteViewer: Failed to register external diagrams:', e);
      }
    };
    
    initializeMermaid();

    const setPage = (svg: string, pageIndex: number) => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');
        if (!svgElement) {
          console.warn('No SVG element found in rendered output');
          return svg;
        }
        
        // Find all page groups - they have id="pageX" and class="page"
        const pages = svgElement.querySelectorAll('g.page[id^="page"]');
        if (pages.length === 0) {
          console.warn('No pages found in SVG');
          setTotalPages(1);
          return svg;
        }
        
        // Update total pages count
        setTotalPages(pages.length);
        
        // Hide all pages first
        pages.forEach(page => {
          if (page && page.setAttribute) {
            page.setAttribute('display', 'none');
          }
        });
        
        // Show the requested page (ensure pageIndex is within bounds)
        const targetPageIndex = Math.max(0, Math.min(pageIndex, pages.length - 1));
        if (pages[targetPageIndex] && pages[targetPageIndex].setAttribute) {
          pages[targetPageIndex].setAttribute('display', 'inline');
        }
        
        return new XMLSerializer().serializeToString(svgElement);
      } catch (error) {
        console.error('Error in setPage function:', error);
        return svg;
      }
    };

    const renderMermaidLite = async () => {
      if (ref.current && !isRenderingRef.current) {
        // Add to queue to ensure sequential rendering
        addToRenderQueue(async () => {
          if (!ref.current || isRenderingRef.current) return;
          
          isRenderingRef.current = true;
          setIsCompiling(true);
          setCompilationError(null);
          
          try {
          if (merlinLiteContent === "") {
            ref.current.innerHTML = "";
            setIsCompiling(false);
            isRenderingRef.current = false;
            return;
          }

          // Clear any existing content to prevent conflicts
          if (ref.current) {
            ref.current.innerHTML = "";
          }

          // Compile Merlin Lite to Mermaid
          const compilationResult = await compileMerlinLiteToMerlin(merlinLiteContent);
          
          if (!compilationResult.success) {
            const errorMessage = compilationResult.line 
              ? `Error at line ${compilationResult.line}, column ${compilationResult.col}: ${compilationResult.error}`
              : `Compilation error: ${compilationResult.error}`;
            
            setCompilationError(errorMessage);
            ref.current.innerHTML = `
              <div class="${styles.error}">
                <strong>Merlin Lite Compilation Error:</strong>
                <pre>${errorMessage}</pre>
              </div>
            `;
            console.error("Merlin Lite compilation error:", compilationResult.error);
            setIsCompiling(false);
            return;
          }

          // Update extracted size if found
          if (compilationResult.extractedSize) {
            setExtractedSize(compilationResult.extractedSize);
          }

          // Render the compiled Mermaid
          if (compilationResult.mermaid) {
            let mermaidCode = compilationResult.mermaid;
            
            // Override size in the Mermaid code if overrideSize is true and we have dimensions
            if (overrideSize && finalDimensions) {
              const newSize = `size: (${finalDimensions.width},${finalDimensions.height})`;
              // Replace existing size directive or add it if not present
              if (mermaidCode.includes('size:')) {
                mermaidCode = mermaidCode.replace(/size:\s*\(\d+,\d+\)/, newSize);
              } else {
                // Add size directive after the first line (usually "visual")
                const lines = mermaidCode.split('\n');
                if (lines.length > 0) {
                  lines.splice(1, 0, newSize);
                  mermaidCode = lines.join('\n');
                }
              }
            }

            // CRITICAL: Add unique comment to force Mermaid to treat this as completely unique content
            // This prevents any internal caching based on content similarity
            const uniqueComment = `%% Unique render: ${rendererId}-${contentHash}-${Date.now()}-${Math.random()} %%`;
            const componentComment = `%% Component ID: ${rendererId} %%`;
            mermaidCode = uniqueComment + '\n' + componentComment + '\n' + mermaidCode;
            




            
            try {
              // CRITICAL: Complete Mermaid state isolation
              // Clear any existing mermaid cache/state that might cause conflicts
              if (typeof window !== 'undefined' && window.document && ref.current) {
                // Remove any existing mermaid elements that might conflict, but avoid clearing current element
                const existingElements = document.querySelectorAll(`[id*="mermaid"], [id*="mermaidChart"], svg[id*="mermaid"]`);
                existingElements.forEach(el => {
                  // Don't remove elements that are inside our current ref container
                  if (!ref.current?.contains(el)) {
                    el.remove();
                  }
                });
              }
              
              // Force complete reset of Mermaid state - multiple approaches
              try {
                if (mermaid?.mermaidAPI?.clearCache) {
                  mermaid.mermaidAPI.clearCache();
                }
                if (mermaid?.diagrams) {
                  mermaid.diagrams.clear();
                }
                if (window && (window as any).mermaid) {
                  (window as any).mermaid.diagrams?.clear();
                  (window as any).mermaid.mermaidAPI?.clearCache();
                  // Additional state clearing attempts
                  if ((window as any).mermaid.parseDirective) {
                    (window as any).mermaid.parseDirective.clear?.();
                  }
                }

                // NUCLEAR OPTION: Force re-initialize Mermaid completely for this render
                // This ensures no state leakage between components
                delete (mermaid as any).__currentState;
                delete (mermaid as any).__diagrams;
                delete (mermaid as any).__config;
                delete (mermaid as any).__cache;
                delete (mermaid as any).parseDirective;
                
                // Clear any global mermaid state
                if (typeof window !== 'undefined') {
                  delete (window as any).mermaidAPI;
                  delete (window as any).mermaid;
                }
              } catch (e) {
                // Ignore errors
              }
              
              // Ensure mermaid is properly initialized for this instance with unique config
              mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'loose',
                theme: theme || 'forest',
                themeVariables: {
                  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                },
                // Force disable any caching mechanisms
                deterministicIds: false,
                deterministicIDSeed: rendererId + '-' + Date.now(),
                // Additional isolation parameters
                maxTextSize: 50000,
                useMaxWidth: false,
              });
              
              // No delay needed since we're using sequential queue
              
              // Use a unique rendererId that includes content hash to prevent any caching issues
              const uniqueRendererId = `${rendererId}-${contentHash}-${++globalRenderCounter}`;
              
              console.log(`[${rendererId}] About to render mermaid with ID: ${uniqueRendererId}`);
              console.log(`[${rendererId}] Mermaid code to render:`, mermaidCode);

              
              // Debug: Check if Mermaid has any internal state before rendering
              try {
                if ((window as any).mermaid && (window as any).mermaid.diagrams) {

                }
              } catch (e) {
                // Ignore
              }
              
              console.log(`[${rendererId}] Calling mermaid.mermaidAPI.render...`);
              const renderResult = await mermaid.mermaidAPI.render(uniqueRendererId, mermaidCode);
              console.log(`[${rendererId}] Mermaid render successful, SVG length:`, renderResult.svg.length);
              const svg = renderResult.svg;
              


              
              let finalSvg;
              try {
                finalSvg = setPage(svg, internalCurrentPage); // Use internalCurrentPage instead of currentPage - 1
              } catch (pageError) {
                console.warn(`[${rendererId}] Error in page setting, using original SVG:`, pageError);
                finalSvg = svg;
              }
              
              if (ref.current) {
                ref.current.innerHTML = finalSvg;


              
              // Check if our SVG actually contains unique elements
              const svgElement = ref.current.querySelector('svg');
              if (svgElement) {
                const textElements = svgElement.querySelectorAll('text');
                const textContent = Array.from(textElements).map(el => el.textContent).join(', ');

              }
              }
              update && update(ref.current);
              setSvgContent && setSvgContent(finalSvg);
            } catch (mermaidError: any) {
              console.error(`[${rendererId}] Mermaid rendering error:`, mermaidError);
              console.error(`[${rendererId}] Error name:`, mermaidError.name);
              console.error(`[${rendererId}] Error message:`, mermaidError.message);
              console.error(`[${rendererId}] Error stack:`, mermaidError.stack);
              
              if (mermaidError.cause) {
                console.error(`[${rendererId}] Error cause:`, mermaidError.cause);
              }
              
              if (mermaidError.line || mermaidError.col) {
                console.error(`[${rendererId}] Error position: line ${mermaidError.line}, col ${mermaidError.col}`);
              }
              
              const errorMessage = `Mermaid rendering error: ${mermaidError.message}`;
              setCompilationError(errorMessage);
              if (ref.current) {
                ref.current.innerHTML = `
                  <div class="${styles.error}">
                    <strong>Mermaid Rendering Error:</strong>
                    <pre>${errorMessage}</pre>
                    <details>
                      <summary>Generated Mermaid Code:</summary>
                      <pre>${mermaidCode}</pre>
                    </details>
                    <details>
                      <summary>Full Error Details:</summary>
                      <pre>${mermaidError.stack || mermaidError.toString()}</pre>
                    </details>
                  </div>
                `;
              }
            }
          }
          
        } catch (error: any) {
          console.error("Mermaid Lite render error:", error);
          const errorMessage = `Rendering error: ${error.message}`;
          setCompilationError(errorMessage);
          if (ref.current) {
            ref.current.innerHTML = `
              <div class="${styles.error}">
                <strong>Mermaid Rendering Error:</strong>
                <pre>${errorMessage}</pre>
              </div>
            `;
          }
          } finally {
            setIsCompiling(false);
            isRenderingRef.current = false;
          }
        });
      }
    };

    renderMermaidLite();

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
      isRenderingRef.current = false;
      // Clear any potential mermaid cached data for this renderer
      try {

        // Clear mermaid cache
        if (mermaid?.mermaidAPI?.clearCache) {
          mermaid.mermaidAPI.clearCache();
        }
        // Remove any DOM elements that might have been created by this renderer
        if (typeof window !== 'undefined' && window.document) {
          const elementsToRemove = document.querySelectorAll(`[id*="${rendererId}"], [id*="${contentHash}"]`);
          elementsToRemove.forEach(el => {
            try {
              el.remove();
            } catch (e) {
              // Ignore errors if element is already removed
            }
          });
        }
      } catch (error) {
        console.warn(`[${rendererId}] Error during cleanup:`, error);
      }
    };
  }, [merlinLiteContent, internalCurrentPage, update, setSvgContent, theme, borderedBool, width, height, aspectRatio, overrideSize, contentHash]); // Use internalCurrentPage in dependencies

  return (
    <div 
      key={`${rendererId}-${contentHash}`}
      className={clsx(
        styles.mermaidLiteViewer,
        borderedBool && styles.bordered,
        className
      )}
      style={finalDimensions ? {
        width: `${finalDimensions.width}px`,
        height: `${finalDimensions.height}px`,
        minHeight: `${finalDimensions.height}px`
      } : undefined}
    >
      {isCompiling && (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <span>Compiling Merlin Lite...</span>
        </div>
      )}
      <div 
        ref={ref} 
        className={`${styles.diagramContainer} diagram-${rendererId}`}
        data-renderer-id={rendererId}
        style={finalDimensions ? {
          width: `${finalDimensions.width}px`,
          height: `${finalDimensions.height}px`,
        } : undefined}
      />
      {totalPages > 1 && (
        <div className={styles.pageControls}>
          <button 
            className={styles.pageButton} 
            onClick={() => setInternalCurrentPage(Math.max(0, internalCurrentPage - 1))}
            disabled={internalCurrentPage === 0}
          >
            ◀
          </button>
          <span className={styles.pageInfo}>
            {internalCurrentPage + 1} / {totalPages}
          </span>
          <button 
            className={styles.pageButton} 
            onClick={() => setInternalCurrentPage(Math.min(totalPages - 1, internalCurrentPage + 1))}
            disabled={internalCurrentPage === totalPages - 1}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default MermaidLiteViewer;
