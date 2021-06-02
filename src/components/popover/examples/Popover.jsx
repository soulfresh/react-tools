import React from 'react';

import { isReactText } from '../../../utils/react';
import { Popover as PopoverBase, Trigger } from '../Popover.jsx';

import styles from './Popover.module.scss';

/**
 * @typedef {object} PopoverProps
 * @property {*} [ref]
 * @property {*} content
 * @property {*} children
 * @property {function} [onClose]
 * @property {function} [onOpen]
 * @property {object} [layerOptions]
 */
/**
 * This is an example Popover implementation. See
 * the Tooltip and Dropdown components for more
 * complete examples.
 *
 * @type React.FC<PopoverProps>
 */
export const Popover = React.forwardRef(({
  content,
  children,
  onClose,
  onOpen,
  layerOptions,
  ...rest
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = e => {
    setIsOpen(false);
    if (onClose) onClose(e);
  }

  // If the trigger has an onClick event already,
  // make sure that will get called as well as our version.
  const onTriggerClick = !isReactText(children) ? children.props.onClick : undefined;
  const contentProps = {
    onClick: e => {
      setIsOpen(!isOpen)
      if (isOpen && onClose) onClose(e);
      if (!isOpen && onOpen) onOpen(e);
      if (onTriggerClick) onTriggerClick(e);
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
        ...layerOptions,
      }}
      content={content}
      {...rest}
      children={<Trigger children={children} {...contentProps} />}
    />
  );
});


