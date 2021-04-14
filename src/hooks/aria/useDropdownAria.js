import React from 'react';

import { useId } from '../useId';

/**
 * A hook that generates the aria properties necessary for
 * a dropdown component. It will generate ids for both your
 * trigger and menu elements unless you pass your own. It
 * will also set a tab index on your trigger element unless
 * you pass your own.
 *
 * @param {boolean} isOpen
 * @param {object} [options]
 * @param {string} [options.menuId] - An id to use for the menu element
 *   rather than generating one.
 * @param {string} [options.triggerId] - An id to use for the trigger element
 *   rather than generating one.
 * @param {number} [options.tabIndex] - The tab index to use for your trigger
 *   element. If not passed, then tabIndex will be 0, ensuring the button is part
 *   of the standard tab order.
 * @param {string} [options.prefix] - A prefix to use for the id names generated
 *   for the trigger and menu elements.
 * @return {object} - An object with `triggerProps` and `menuProps`
 *   to attach to the associated elements.
 *   `triggerProps` includes 'id', `tabIndex`, 'aria-controls' and 'aria-expanded' props.
 *   `menuProps` includes 'id' and 'aria-labelledby' props.
 */
export function useDropdownAria(isOpen, {
  triggerId,
  menuId,
  prefix = 'custom-popover',
  tabIndex = 0,
} = {}) {
  const id = useId(prefix);
  triggerId = triggerId || `${id}-trigger`;
  menuId = menuId || `${id}-menu`;

  return {
    triggerProps: {
      id: triggerId,
      'aria-controls': menuId,
      'aria-expanded': isOpen ? 'true' : 'false',
      tabIndex,
    },
    menuProps: {
      id: menuId,
      'aria-labelledby': triggerId,
    }
  };
}

