import React from 'react';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import LZString from 'lz-string';
import styles from './styles.module.css';

const PlaygroundButton: React.FC = () => {
  // Add defensive check for SSR
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Safely try to get the context
  let codeBlockContext;
  try {
    codeBlockContext = useCodeBlockContext();
  } catch (error) {
    // Context not available during SSR
    return null;
  }

  if (!codeBlockContext) {
    return null;
  }
  
  const { metadata } = codeBlockContext;
  const code = metadata.code;
  const language = metadata.language;

  const handleOpenInPlayground = () => {
    if (!isClient) return;
    
    // Compress the code using LZ-string
    const compressedCode = LZString.compressToBase64(code);
    
    // Create the playground URL
    const playgroundUrl = `https://eth-peach-lab.github.io/merlin/#/url/${language}/${compressedCode}`;
    
    // Open in new tab
    window.open(playgroundUrl, '_blank');
  };

  // Only show for merlin language and when client-side
  if (language !== 'merlin' || !isClient) {
    return null;
  }

  return (
    <button
      className={styles.playgroundButton}
      onClick={handleOpenInPlayground}
      title="Open in Merlin Editor"
      aria-label="Open code in Merlin Editor"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
        <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/>
      </svg>
      Open in Merlin Editor
    </button>
  );
};

export default PlaygroundButton;
