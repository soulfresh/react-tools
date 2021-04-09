import React from 'react';

import { combineClasses } from '@thesoulfresh/utils';

import { Tooltip as TooltipBase } from '../Tooltip.jsx';

import styles from './Tooltip.module.scss';


export function Tooltip({
  className,
  ...rest
}) {
  return (
    <TooltipBase
      className={combineClasses(styles.Tooltip, className)}
      {...rest}
    />
  );
}

