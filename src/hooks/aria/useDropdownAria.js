import React from 'react';

let count = 0;

/**
 * A hook that generates the aria properties necessary for
 * a dropdown component.
 *
 * @param {boolean} isOpen
 * @param {string} [prefix] - A prefix to use for the id names generated
 *   for the trigger and menu elements.
 * @return {object} - An object with `triggerProps` and `menuProps`
 *   to attach to the associated elements.
 *   `triggerProps` includes 'id', 'aria-controls' and 'aria-expanded' props.
 *   `menuProps` includes 'id' and 'aria-labelledby' props.
 */
export function useDropdownAria(isOpen, prefix = 'custom-popover') {
  // TODO useId
  const [id] = React.useState(() => `${prefix}-${++count}`);
  const triggerId = `${id}-trigger`;
  const menuId = `${id}-menu`;

  return {
    triggerProps: {
      id: triggerId,
      'aria-controls': menuId,
      'aria-expanded': isOpen ? 'true' : 'false',
    },
    menuProps: {
      id: menuId,
      'aria-labelledby': triggerId,
    }
  };
}
