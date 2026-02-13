import React from 'react';
import styles from './styles.module.css';
import {useColorMode} from '@docusaurus/theme-common';

interface Dictionary<T> {
    [key: string]: T;
}

const Svg: Dictionary<React.ComponentType<React.ComponentProps<'svg'>>> = {
    "add": require('@site/static/img/add.svg').default,
    "add-row": require('@site/static/img/add-row.svg').default,
    "add-column": require('@site/static/img/add-column.svg').default,
    "color": require('@site/static/img/color.svg').default,
    "delete": require('@site/static/img/delete.svg').default,
    "edit": require('@site/static/img/edit.svg').default,
    "grid": require('@site/static/img/grid.svg').default,
    "label": require('@site/static/img/label.svg').default,
    "remove": require('@site/static/img/remove.svg').default,
    "remove-column": require('@site/static/img/remove-column.svg').default,
    "remove-row": require('@site/static/img/remove-row.svg').default,
    "remove-subtree": require('@site/static/img/remove-subtree.svg').default,
    "structure": require('@site/static/img/structure.svg').default,
    "text": require('@site/static/img/text.svg').default,
    "export": require('@site/static/img/export.svg').default,
    "share": require('@site/static/img/share.svg').default,
    "save": require('@site/static/img/save.svg').default,
};

type HeaderItem = {
  svgName: string;
};


export default function Icon({svgName}: HeaderItem) {
  const {colorMode} = useColorMode();
  const SvgComponent = Svg[svgName];
  const style = colorMode === 'dark' ? styles.svgDark : styles.svg
  return (
    <SvgComponent className={style} role="img" />
  );
}

