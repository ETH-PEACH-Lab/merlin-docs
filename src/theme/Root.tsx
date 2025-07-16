import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@site/src/components/MDXComponents';

export default function Root({ children }) {
  return <MDXProvider components={MDXComponents}>{children}</MDXProvider>;
}
