import React from 'react';

import { Popover as PopoverBase } from '../Popover.jsx';

import styles from './Popover.module.scss';

/**
 * @typedef {object} PopoverProps
 * @property {*} [ref]
 * @property {*} content
 * @property {*} children
 * @property {function} [onClose]
 */
/**
 * @type React.FC<PopoverProps>
 */
export const Popover = React.forwardRef(({
  content,
  children,
  onClose,
  ...rest
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = e => {
    setIsOpen(false);
    if (onClose) onClose(e);
  }

  const contentProps = {
    onClick: () => {
      setIsOpen(!isOpen)
    },
  };

  return (
    <PopoverBase
      ref={ref}
      className={styles.Popover}
      isOpen={isOpen}
      onClose={handleClose}
      layerOptions={{
        onOutsideClick: handleClose,
        onDisappear: handleClose,
        triggerOffset: 8,
      }}
      content={content}
      {...rest}
      children={React.cloneElement(children, contentProps)}
    />
  );
});


