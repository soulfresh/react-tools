import React from 'react';

import { useKeyWhenActive } from './useKeyWhenActive';

/**
 * Trap focus within two elements. Both elements must be
 * able to receive focus for this to work so ensure they
 * are either naturally focusable (ex. buttons) or they
 * have a `tabindex` specified.
 *
 * @param {boolean} active - Allows you to turn the focus
 *   trap on and off.
 *
 * @return{[object, object]} An array of references to
 *   attach to the first and last elements in the trap.
 */
export function useFocusTrap(active = true) {
  // The first and last elements that define the focus trap.
  const first = React.useRef();
  const last = React.useRef();

  useKeyWhenActive(
    'Tab',
    (e) => {
      if (document.activeElement === last.current && !e.shiftKey) {
        e.preventDefault();
        first.current.focus();
      }
      else if (document.activeElement === first.current && e.shiftKey) {
        e.preventDefault();
        last.current.focus();
      }
    },
    active
  );

  return [first, last];
}
