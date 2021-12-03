import React from 'react';

import { useFocusTrap } from '../keyboard/useFocusTrap';
import { useKeyWhenActive } from '../keyboard/useKeyWhenActive';
import { useId } from '../useId';

/**
 * A hook that generates the aria properties necessary to meet
 * the ARIA dialog pattern. In this pattern, a popover is opened/closed
 * by a trigger element and focus gets trapped within the popover
 * until it is closed. Keyboard events within the menu are dependent
 * on the contents of the menu.
 *
 * See: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
 *
 * This hook generates all of the necessary keyboard listeners
 * for the pattern as well as aria attributes. It does NOT handle
 * visibility/positioning of the menu or
 * mouse events for opening/closing the menu. It also follows the
 * controlled component pattern which means that you are responsible
 * for maintaining the open state of the menu.
 *
 * #### Usage
 *
 * This hook returns an object with properties that must be attached
 * to your trigger and menu elements. Additionally, there are 3 refs
 * you must attach to the trigger and the first/last elements in the
 * menu that can receive keyboard focus. These refs ensure that focus
 * is maintained within the menu when it is open and that the trigger
 * receives focus when the menu is closed.
 *
 * #### Options
 *
 * This hook will generate unique id attributes for both your
 * trigger and menu elements. However, you can pass your own
 * id values for these if you choose. This hook
 * will also set a tab index on your trigger element unless
 * you pass your own. This ensures that the trigger element
 * is keyboard reachable.
 *
 * #### Return Value
 *
 * Here is the structure of the object returned from this hook:
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | **triggerRef** | `object` | A ref to attach to the element that opens the menu. |
 * | **firstFocusRef** | `object` | A ref to attach to the first element that will receive keyboard focus within the menu. |
 * | **lastFocusRef** | `object` | A ref to attach to the last element that will receive keyboard focus within the menu. |
 * | **triggerProps** | `object` | An object of properties to spread on your trigger element. |
 * | **triggerProps.id** | `string` | A unique id attribute for the trigger element. |
 * | **triggerProps.aria-controls** | `string` | The id attribute of the menu element. |
 * | **triggerProps.aria-expanded** | `boolean` | Whether the menu is currently open. |
 * | **triggerProps.tabIndex** | `number` | The tab index of the trigger element. |
 * | **menuProps** | `object` | An object of properties for the root of your menu element. |
 * | **menuProps.id** | `string` | A unique id attribute for the menu element. |
 * | **menuProps.arial-labelledby** | `string` | The id attribute of the menu element. |
 *
 * #### API
 *
 * @param {boolean} isOpen - The current open state of the menu.
 * @param {function} onClose - A callback that will be called when
 *   the user tries to close the menu through keyboard events.
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
 * @return {object}
 */
export function useDialogAria(
  isOpen,
  onClose,
  {
    triggerId,
    menuId,
    prefix = 'sf-dialog',
    tabIndex = 0,
  } = {}
) {
  const id = useId(prefix);
  triggerId = triggerId || `${id}-trigger`;
  menuId = menuId || `${id}-menu`;

  const triggerRef = React.useRef();
  const initialized = React.useRef(false);

  // Keep focus trapped between the first and last
  // focusable elements in the dialog.
  const [firstFocusRef, lastFocusRef] = useFocusTrap(isOpen);

  const handleClose = e => {
    if (onClose) onClose(e);
  }

  useKeyWhenActive('Escape', handleClose, isOpen);

  // Move focus when the open state changes.
  React.useEffect(() => {
    if (isOpen) {
      const el = firstFocusRef.current;
      if (el) el.focus({preventScroll: true});
    } else if (initialized) {
      const el = triggerRef.current;
      if (el) el.focus({preventScroll: true});
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    // Ensure that we don't steal focus as soon as the
    // current component is created.
    initialized.current = true;
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    triggerRef,
    firstFocusRef,
    lastFocusRef,
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

