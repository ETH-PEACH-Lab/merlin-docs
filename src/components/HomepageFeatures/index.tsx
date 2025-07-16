import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {useColorMode} from '@docusaurus/theme-common';
import CodeBlock from '@site/src/theme/CodeBlock';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  darkSvg?: React.ComponentType<React.ComponentProps<'svg'>>;
  codeBlock?: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    codeBlock: `array numbers = {
    value: [1, 2, 3]
    color: ["blue", "green", "red"]
}

page
show numbers`,
    description: (
      <>
        Merlin was designed from the ground up to have easily understandable, progressive syntax while also allowing you to make changes using GUI, which intern syncs with your code.
      </>
    ),
  },
  {
    title: 'Made for Teaching',
    Svg: require('@site/static/img/features-tree.svg').default,
    darkSvg: require('@site/static/img/features-tree-dark.svg').default,
    description: (
      <>
        Merlin provides pre-built components that can be used to create interactive tutorials and exercises, making it easier to teach programming concepts.
      </>
    ),
  },
  {
    title: 'Powered by Mermaid',
    Svg: require('@site/static/img/features-mermaid.svg').default,
    description: (
      <>
        Merlin is built on top of <a href="https://mermaid.js.org/">Mermaid</a>, a powerful diagramming tool that allows you to create diagrams and flowcharts using simple text syntax.
        This means you can easily visualize your code and its execution flow.
      </>
    ),
  },
];

function Feature({title, Svg, darkSvg, codeBlock, description}: FeatureItem & {darkSvg?: React.ComponentType<React.ComponentProps<'svg'>>, codeBlock?: string}) {
  const {colorMode} = useColorMode();
  const SvgComponent = colorMode === 'dark' && darkSvg ? darkSvg : Svg;
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {codeBlock ? (
            <CodeBlock
            className={`language-merlin text--left`}
            showLineNumbers={true}
          >
            {codeBlock}
          </CodeBlock>
        ) : SvgComponent ? (
          <SvgComponent className={styles.featureSvg} role="img" />
        ) : null}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
