import React from 'react';
import { combineClasses } from '@thesoulfresh/utils';

import { Dropdown as DropdownBase } from '../Dropdown.jsx';

import styles from './Dropdown.module.scss';

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {object} [props.layerOptions]
 */
export function Dropdown({
  className,
  layerOptions = {},
  ...rest
}) {
  return (
    <DropdownBase
      className={combineClasses(styles.Dropdown, className)}
      layerOptions={{
        triggerOffset: styles.arrowSize,
        ...layerOptions,
      }}
      {...rest}
    />
  );
}

