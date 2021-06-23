import React from 'react';
import { useId } from '../useId';

import { useKeyWhenActive } from '../keyboard/useKeyWhenActive';

/**
 * A hook that generates the aria properties necessary to meet the
 * ARIA tooltip pattern. In this pattern, a popover is opened/closed
 * by a trigger element when it is focused. The popover element cannot
 * receive focus itself but provides additional information about the
 * trigger element.
 *
 * See https://www.accede-web.com/en/guidelines/rich-interface-components/customized-tooltips/
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
 * This hook returns an object with properties that must be
 * attached to the trigger and menu elements.
 *
 * ```js
 * const [isOpen, setIsOpen] = React.useState(false);
 * const onOpen = () => setIsOpen(true);
 * const onClose = () => setIsOpen(false);
 * const {triggerProps, tooltipProps} = useTooltipAria(isOpen, onOpen, onClose);
 * return (
 *   <Tooltip isOpen={isOpen} {...triggerProps} content={<p>My Content</p>}>focus me</Tooltip>
 * );
 * ```
 *
 * #### Return Value
 *
 * Here is the structure of the object returned from this hook:
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | **triggerProps** | `object` | An object of properties to spread on your trigger element. |
 * | **triggerProps.aria-describedby** | `string` | The id attribute of the tooltip element. |
 * | **triggerProps.tabIndex** | `number` | The tab index of the trigger element. |
 * | **triggerProps.onFocus** | `number` | A focus handler that must be attached to the trigger element in order to open the menu. |
 * | **triggerProps.onBlur** | `number` | A blur handler that must be attached to the trigger element in order to close the menu. |
 * | **tooltipProps** | `object` | An object of properties for the root of your menu element. |
 * | **tooltipProps.id** | `string` | A unique id attribute for the menu element. |
 * | **tooltipProps.role** | `string` | The element's role attribute. |
 *
 * #### API
 *
 * @param {boolean} isOpen - Whether the tooltip is currently open.
 * @param {function} onOpen - A callback that will be called when
 *   the users tries to open the tooltip through keyboard events.
 * @param {function} onClose - A callback that will be called when
 *   the user tries to close the tooltip through keyboard events.
 * @param {object} [options]
 * @param {string} [options.id] - The id value to use in order to
 *   connect the tooltip element to its trigger. If you do
 *   not pass this, then an id will be automatically generated
 *   for you.
 * @param {string} [options.prefix] - If you want to customize the
 *   name of the auto-generated id, you can pass a prefix
 *   which will then have a unique number suffixed to it.
 * @return {object} Returns an object with `triggerProps` and
 *   `tooltipProps` which should be applied to their associated
 *   elements.
 */
export function useTooltipAria(
  isOpen,
  onOpen,
  onClose,
  {
    id,
    prefix = 'sf-tooltip',
  } = {},
) {
  const ariaId = useId(prefix);
  const [isFocused, setIsFocused] = React.useState(false);

  // If an id was passed, use that. Otherwise generate one.
  id = id || ariaId;

  const handleOpen = e => {
    if (onOpen) onOpen(e);
  };

  const handleClose = e => {
    if (onClose) onClose(e);
  };

  const onFocus = e => {
    setIsFocused(true);
    handleOpen(e);
  };
  const onBlur = e => {
    setIsFocused(false);
    handleClose(e);
  };

  useKeyWhenActive('Enter', handleOpen, isFocused && !isOpen);
  useKeyWhenActive('Escape', handleClose, isFocused && isOpen);

  return {
    triggerProps: {
      tabIndex: 0,
      'aria-describedby': id,
      onFocus,
      onBlur,
    },
    tooltipProps: {
      id,
      role: 'tooltip',
      'aria-hidden': !isOpen,
    }
  };
}

