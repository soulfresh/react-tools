import React from 'react';
import PropTypes from 'prop-types';
import { useHover } from "react-laag";

import { useTooltipAria } from '../../hooks/aria/useTooltipAria';
import { useMaybeControlled } from '../../hooks/useMaybeControlled';
import { Popover, Trigger } from '../popover/Popover.jsx';
import { mergeCallbacks } from '../../utils/react';


/**
 * `<Tooltip>` is a standard tooltip component that provides
 * accessility and is fully stylable through CSS.
 * Wrap `<Tooltip>` around the content you want to trigger the tooltip and pass the
 * tooltip content through the `content` prop. Both the `children`
 * and `content` can be any renderable JSX. If `children` is plain
 * text, it will be wrapped in a span to enable mouse events.
 *
 * This component can be either controlled or uncontrolled. It becomes
 * controlled if `isOpen` is anything other than undefined. When this is
 * the case, you should provide the on `onOpen` and `onClose` callbacks
 * in order to show/hide the component.
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
 * @param {boolean} [props.isOpen]
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
  isOpen,
  className,
  ...rest
}) {

  // We use `useHover()` to determine whether we should show the tooltip.
  // Notice how we're configuring a small delay on enter / leave.
  const [isOver, hoverProps] = useHover(hoverOptions);

  const [isOpenLocal, setIsOpenLocal, isControlled] = useMaybeControlled(isOpen);

  // Whether to show the tooltip.
  const show = isControlled ? isOpen : (isOver || isOpenLocal);

  const handleOpen = e => {
    setIsOpenLocal(true);
    // Call onOpen directly so we can pass the event through.
    if (onOpen) onOpen(e);
  };

  const handleClose = e => {
    setIsOpenLocal(false);
    // Call onClose directly so we can pass the event through.
    if (onClose) onClose(e);
  };

  const {
    triggerProps: {
      onFocus: onFocusAria,
      onBlur: onBlurAria,
      ...triggerAria
    },
    // triggerProps: triggerAria,
    tooltipProps: tooltipAria
  } = useTooltipAria(
    isOpenLocal,
    handleOpen,
    handleClose,
    {id}
  );

  const onTriggerFocus = children?.props?.onFocus;
  const onFocus = mergeCallbacks(onFocusAria, onTriggerFocus);

  const onTriggerBlur = children?.props?.onBlur;
  const onBlur = mergeCallbacks(onBlurAria, onTriggerBlur);

  return (
    <Popover
      data-testid="Tooltip"
      isOpen={show}
      onClose={handleClose}
      layerOptions={{
        placement: "top-center",
        possiblePlacements: ['top-center', 'bottom-center', 'left-center', 'right-center'],
        snap: true,
        ...layerOptions,
      }}
      persistent
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
   * If you want to controll the open/closed state yourself,
   * use this to pass the current open state. You'll also
   * need to provide the `onOpen` and `onClose` callbacks.
   */
  isOpen: PropTypes.bool,
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

