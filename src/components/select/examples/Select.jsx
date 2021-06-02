import React from 'react';
import { combineClasses } from '@thesoulfresh/utils';

import { Select as SelectBase } from '../Select.jsx';

import styles from './Select.module.scss';

/**
 * @typedef {object} SelectProps
 * @property {*} [ref]
 * @property {string} [className]
 * @property {object} [layerOptions]
 */
/**
 * @type React.FC<SelectProps>
 */
export const Select = React.forwardRef(({
  className,
  layerOptions,
  ...rest
}, ref) => {
  return (
    <SelectBase
      className={combineClasses(styles.Select, styles.Popover, className)}
      layerOptions={{
        triggerOffset: styles.arrowSize,
        ...layerOptions,
      }}
      {...rest}
      ref={ref}
    />
  );
});

