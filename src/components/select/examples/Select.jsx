import React from 'react';
import { combineClasses } from '@thesoulfresh/utils';

import { Select as SelectBase } from '../Select.jsx';

import styles from './Select.module.scss';

/**
 * @param {object} props
 * @param {string} [props.className]
 */
export function Select({
  className,
  layerOptions,
  ...rest
}) {
  return (
    <SelectBase
      className={combineClasses(styles.Select, className)}
      layerOptions={{
        triggerOffset: styles.arrowSize,
        ...layerOptions,
      }}
      {...rest}
    />
  );
}

Select.propTypes = {
};
