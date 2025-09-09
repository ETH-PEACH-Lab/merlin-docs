import React from 'react';
import MermaidViewer from '@site/src/components/MermaidViewer';
import MermaidLiteViewer from '@site/src/components/MermaidLiteViewer';
import SideBySide from '@site/src/components/SideBySide';
import Icon from '@site/src/components/Icon';

// Make components available globally in MDX
const MDXComponents = {
  MermaidViewer,
  MermaidLiteViewer,
  SideBySide,
  Icon
};

export default MDXComponents;
