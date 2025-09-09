import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {useColorMode} from '@docusaurus/theme-common';
import CodeBlock from '@site/src/theme/CodeBlock';

interface Dictionary<T> {
    [key: string]: T;
}

const Svg: Dictionary<React.ComponentType<React.ComponentProps<'svg'>>> = {
    "add": require('@site/static/img/add.svg').default,
    "add-dark": require('@site/static/img/add-dark.svg').default,
    "add-row": require('@site/static/img/add-row.svg').default,
    "add-row-dark": require('@site/static/img/add-row-dark.svg').default,
    "add-column": require('@site/static/img/add-column.svg').default,
    "add-column-dark": require('@site/static/img/add-column-dark.svg').default,
    "color": require('@site/static/img/color.svg').default,
    "color-dark": require('@site/static/img/color-dark.svg').default,
    "edit": require('@site/static/img/edit.svg').default,
    "edit-dark": require('@site/static/img/edit-dark.svg').default,
    "remove": require('@site/static/img/remove.svg').default,
    "remove-dark": require('@site/static/img/remove-dark.svg').default,
    "remove-column": require('@site/static/img/remove-column.svg').default,
    "remove-column-dark": require('@site/static/img/remove-column-dark.svg').default,
    "remove-row": require('@site/static/img/remove-row.svg').default,
    "remove-row-dark": require('@site/static/img/remove-row-dark.svg').default,
    "remove-subtree": require('@site/static/img/remove-subtree.svg').default,
    "remove-subtree-dark": require('@site/static/img/remove-subtree-dark.svg').default,
    "text": require('@site/static/img/text.svg').default,
    "text-dark": require('@site/static/img/text-dark.svg').default,
};

type HeaderItem = {
  title: string;
  svgName: string;
};


export default function GuiHeader({title, svgName}: HeaderItem) {
  const {colorMode} = useColorMode();
  const SvgComponent = colorMode === 'dark' ? Svg[svgName + "-dark"] : Svg[svgName];
  return (
    <Heading as="h3">{title}
      <SvgComponent className={styles.svg} role="img" />
    </Heading>
  );
}

