import React from 'react';
import PropTypes from 'prop-types';
import { mergeRefs } from "react-laag";

import { combineClasses } from '@thesoulfresh/utils';

import { useDropdownAria } from '../../hooks/aria/useDropdownAria';
import { useFocusTrap } from '../../hooks/keyboard/useFocusTrap';
import { Popover, Trigger } from '../popover/Popover.jsx';

/**
 * @typedef {object|HTMLElement} DropdownProps
 * @property {*} [ref]
 * @property {*} content
 * @property {*} children
 * @property {function} [onClose]
 * @property {function} [onOpen]
 * @property {object} [layerOptions]
 * @property {string} [transitionProperty]
 * @property {boolean} [disableTransitions]
 * @property {boolean} [disableArrow]
 */
/**
 * `<Dropdown>` will give you an unstyled dropdown
 * component that follows the ARIA Dialog design pattern.
 * This means that this component is a focus trap so it
 * will not allow focus to leave the dropdown content
 * until the dropdown is closed.
 *
 * This component is intended
 * for use in situations where any arbitrary content can
 * be placed inside the overlay element and that
 * content should manage it's own keyboard events.
 * It is similar to a modal but it does not
 * cover the full window. This component is NOT
 * intended for use as a select, autocomplete or navigation
 * menu.
 *
 * Unlike `<Popover>`, the `content` prop of this component
 * must be a function. The function will receive `firstTarget`
 * and `lastTarget` parameters which you should attach to
 * the first and last elements in the dropdown content that
 * can receive focus. This is essential for the focus trap
 * to work and for accessibility to meet the ARIA dialog
 * requirements.
 *
 * #### Popover
 *
 * This component builds off of the `<Popover>` component
 * so all of its documentation is relavent to this component.
 * This includes all of the CSS styling options and
 * the `layerOptions` prop for customizing
 * the `useLayer()` hook from `react-laag`.
 *
 * #### Accessibility
 *
 * For more on the ARIA dialog pattern, see
 * https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
 *
 * @type React.FC<DropdownProps>
 */
export const Dropdown = React.forwardRef(({
  content,
  children,
  onOpen,
  onClose,
  ...rest
}, ref) => {
  // TODO Allow programatic control of the menu state.
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef();

  const [first, last] = useFocusTrap(isOpen);

  const handleClose = e => {
    setIsOpen(false);
    if (triggerRef.current) {
      // @ts-ignore
      triggerRef.current.focus({preventScroll: true});
    }
    if (onClose) onClose(e);
  }

  const handleOpen = e => {
    setIsOpen(true);
    if (onOpen) onOpen(e);
  }

  // Focus the first element in the details when it opens.
  React.useEffect(() => {
    const el = first.current;
    if (isOpen && el) {
      el.focus({preventScroll: true});
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const {triggerProps: triggerAria, menuProps: contentAria} = useDropdownAria(isOpen);

  const onTriggerClick = children.props.onClick;
  const triggerProps = {
    ...triggerAria,
    onClick: e => {
      if (isOpen) handleClose(e);
      else handleOpen(e);

      if (onTriggerClick) onTriggerClick(e);
    },
  };

  let contentFunc;
  if (typeof(content) !== 'function') {
    console.warn(
      '[Dropdown] The "content" prop provided was not of type "function". ' +
      'You should pass a function that accepts refs for the first and last elements ' +
      'that will receive tab focus. This is required by the ARIA dialog role.'
    );
    contentFunc = () => content;
  } else {
    contentFunc = content;
  }

  return (
    <Popover
      ref={ref}
      isOpen={isOpen}
      onClose={handleClose}
      layerOptions={{
        onOutsideClick: handleClose,
        onDisappear: handleClose,
      }}
      content={contentFunc(first, last)}
      {...contentAria}
      {...rest}
      children={
        <Trigger
          children={children}
          {...triggerProps}
          ref={mergeRefs(triggerRef, children?.ref)}
        />
      }
    />
  );
});

Dropdown.propTypes = {
  /**
   * A callback function that should return the
   * content to render.
   * @param {object} firstTabTarget - The first element
   *   in the content that will recieve tab focus.
   * @param {object} lastTabTarget - The last element
   *   in the content that will receive tab focus.
   */
  content: PropTypes.func.isRequired,
  /**
   * The trigger that should open the dropdown. This
   * can be any JSX content. If the trigger is text or
   * a number, then it will be wrapped in a `<span>`
   * in order to provide click handlers.
   */
  children: PropTypes.node.isRequired,
  /**
   * A callback that will be called when the dropdown
   * menu is closed.
   */
  onClose: PropTypes.func,
  /**
   * A callback that will be called when the dropdown
   * menu is opened.
   */
  onOpen: PropTypes.func,
  /**
   * Configure options for the tooltip layer.
   * Since this component uses `react-laag` under the
   * hood, these options are pass directly to the
   * `useLayer` hook.
   * See https://github.com/everweij/react-laag#uselayeroptions
   */
  layerOptions: PropTypes.object,
  /**
   * The property that the `useEnterExit()` hook should
   * listen to for `transitionend` events which signify
   * the popover content can be removed. See the
   * [useEnterExit](/?path=/docs/hooks-useenterexit--page)
   * for more information.
   */
  transitionProperty: PropTypes.string,
  /**
   * Disable the `useEnterExit()` hook from listening
   * to `transitionend` events before removing the popover content.
   */
  disableTransitions: PropTypes.bool,
  /**
   * Allows you to remove the arrow element from the popover content.
   */
  disableArrow: PropTypes.bool,
  /**
   * If you pass a `ref`, it will be attached to the
   * popover wrapping element. However, you shouldn't
   * need this as you can pass a ref to your `content`
   * or `children` outside of this component.
   */
  ref: PropTypes.node,
  /**
   * Any other props you pass will be applied to the
   * popover `content` div.
   */
  // @ts-ignore
  'other props...': PropTypes.any,
};


