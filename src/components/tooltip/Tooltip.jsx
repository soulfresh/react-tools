import React from 'react';
import PropTypes from 'prop-types';
import { useHover } from "react-laag";

import { useKeyWhenActive } from '../../hooks/keyboard/useKeyWhenActive';
import { useTooltipAria } from '../../hooks/aria/useTooltipAria';
import { Popover, Trigger } from '../popover/Popover.jsx';

/**
 * `<Tooltip>` is a standard tooltip component that provides
 * accessility and is fully stylable through CSS.
 * Wrap `<Tooltip>` around the content you want to trigger the tooltip and pass the
 * tooltip content through the `content` prop. Both the `children`
 * and `content` can be any renderable JSX. If `children` is plain
 * text, it will be wrapped in a span to enable mouse events.
 *
 * #### Styling
 *
 * `Tooltip` is completely unstyled by default.
 * The tooltip content and arrow are two separate `<div>` elements
 * that you can style through CSS. They are accessible through
 * the CSS classes `content` and `arrow` respectively.
 * The arrow element has no dimensions by default so you should
 * set the `width` and `height` properties of that div to give
 * it the dimensions you want.
 *
 * #### Positioning
 *
 * This component uses `react-laag` under the hood so you can
 * pass any of its
 * [`useLayer()`](https://github.com/everweij/react-laag#uselayeroptions)
 * or [`useHover`](https://github.com/everweij/react-laag#usehover)
 * properties in order
 * to configure the timing and positioning of the tooltip.
 *
 * #### Transitions
 *
 * This component uses the `useEnterExit()`
 * hook from this library so you can control the enter/leave transitions through
 * CSS.
 *
 * Enter/Leave state and layer side classes will also be
 * applied to the outer most wrapping div to allow you
 * to configure your animations. The following classes
 * will be available:
 *
 * - entering
 * - entered
 * - exiting
 * - exited
 * - top
 * - bottom
 * - left
 * - right
 *
 * #### Accessibility
 *
 * Additionally, this component takes care of ARIA concerns
 * for you. It follows the tooltip ARIA pattern so it will open the
 * tooltip on mouse events and keyboard focus events.
 *
 * See https://www.accede-web.com/en/guidelines/rich-interface-components/customized-tooltips/
 *
 * #### `Popover`
 *
 * Under the hood, this component uses `Popover`
 * so you can pass any of the same properties.
 *
 * @param {object} props
 * @param {string} [props.id]
 * @param {*} [props.content]
 * @param {*} [props.children]
 * @param {function} [props.onOpen]
 * @param {function} [props.onClose]
 * @param {object} [props.hoverOptions]
 * @param {object} [props.layerOptions]
 * @param {string} [props.className]
 */
export function Tooltip({
  id,
  content,
  children,
  hoverOptions = {},
  layerOptions = {},
  onClose,
  onOpen,
  className,
  ...rest
}) {
  const {triggerProps: triggerAria, tooltipProps: tooltipAria} = useTooltipAria({id});

  // We use `useHover()` to determine whether we should show the tooltip.
  // Notice how we're configuring a small delay on enter / leave.
  const [isOver, hoverProps] = useHover(hoverOptions);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = e => {
    setIsOpen(true);
    if (onOpen) onOpen(e);
  };

  const handleClose = e => {
    setIsOpen(false);
    if (onClose) onClose(e);
  };

  const onTriggerFocus = children?.props?.onFocus;
  const onFocus = e => {
    handleOpen(e);
    if (onTriggerFocus) onTriggerFocus(e);
  };

  const onTriggerBlur = children?.props?.onBlur;
  const onBlur = e => {
    handleClose(e);
    if (onTriggerBlur) onTriggerBlur(e);
  };

  useKeyWhenActive('Enter', handleOpen, !isOpen && !isOver);

  return (
    <Popover
      isOpen={isOver || isOpen}
      onClose={handleClose}
      layerOptions={{
        placement: "top-center",
        possiblePlacements: ['top-center', 'bottom-center', 'left-center', 'right-center'],
        snap: true,
        triggerOffset: 8,
        ...layerOptions,
      }}
      content={content}
      {...tooltipAria}
      className={className}
      {...rest}
    >
      <Trigger
        {...hoverProps}
        {...triggerAria}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        { children }
      </Trigger>
    </Popover>
  );
}

Tooltip.propTypes = {
  /**
   * This is the content inside the tooltip.
   * This can be any renderable JSX content.
   */
  content: PropTypes.node.isRequired,
  /**
   * The content that will trigger the tooltip.
   * This can be any renderable JSX content.
   */
  children: PropTypes.node.isRequired,
  /**
   * A callback that will be called when the tooltip
   * content is shown.
   */
  onOpen: PropTypes.func,
  /**
   * A callback that will be called when the tooltip
   * content is hidden.
   */
  onClose: PropTypes.func,
  /**
   * Configure the delay when showing/hiding
   * the tooltip on hover. These options are
   * passed directly to the `useHover` hook
   * from `react-laag`.
   * See https://github.com/everweij/react-laag#usehover
   */
  hoverOptions: PropTypes.object,
  /**
   * Configure options for the tooltip layer.
   * Since this component uses `react-laag` under the
   * hood, these options are pass directly to the
   * `useLayer` hook.
   * See https://github.com/everweij/react-laag#uselayeroptions
   */
  layerOptions: PropTypes.object,
  /**
   * The className will be applied to the outer div
   * that wraps both the `content` and `arrow` divs.
   * This allows you to scope the `content` and `arrow`
   * selectors to your specific tooltip component.
   */
  className: PropTypes.string,
  /**
   * Any other props you pass will be applied to the
   * tooltip `content` div.
   */
  'other props...': PropTypes.any,
};

