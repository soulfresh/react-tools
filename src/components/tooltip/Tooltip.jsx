import React from 'react';
import PropTypes from 'prop-types';
import { useLayer, useHover, mergeRefs } from "react-laag";

import { combineClasses } from '@thesoulfresh/utils';

import { isReactText } from '../../utils/react';
import { useEnterExit } from '../../hooks/useEnterExit';
import { useId } from '../../hooks/useId';

import styles from './Tooltip.module.scss';

/**
 * `<Tooltip>` is a standard tooltip component that
 * uses CSS for styling and transitions. Wrap `<Tooltip>` around
 * the content you want to trigger the tooltip and pass the
 * tooltip content through the `content` prop. Both the `children`
 * and `content` can be any renderable JSX. The tooltip is
 * unstyled by default so you have full control over styling.
 * Enter and leave animations can also be controlled through CSS.
 *
 * The tooltip content and arrow are two separate `<div>` elements
 * that you can style through CSS. They are accessible through
 * the CSS classes `content` and `arrow` respectively.
 * The arrow element has no dimensions by default so you should
 * set the `width` and `height` properties of that div to give
 * it the dimensions you want.
 *
 * This component uses `react-laag` under the hood so you can
 * pass any of its
 * [`useLayer()`](https://github.com/everweij/react-laag#uselayeroptions)
 * or [`useHover`](https://github.com/everweij/react-laag#usehover)
 * properties in order
 * to configure the timing and positioning of the tooltip.
 *
 * Additionally, this component uses the `useEnterExit()`
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
 * Additionally, this component takes care of ARIA concerns
 * for you.
 *
 * @param {object} props
 * @param {string} [props.id]
 * @param {*} [props.content]
 * @param {*} [props.children]
 * @param {object} [props.hoverOptions]
 * @param {object} [props.layerOptions]
 * @param {string} [props.className]
 */
export function Tooltip({
  id,
  content,
  children,
  hoverOptions = {delayLeave: 0},
  layerOptions = {},
  className,
  ...rest
}) {
  const ariaId = useId('soulfresh-tooltip-');
  // If an id was passed, use that. Otherwise generate one.
  id = id || ariaId;

  // Tooltip aria properties.
  // TODO Is it ok for a tooltip to be removed from the DOM?
  const aria = {
    role: 'tooltip',
    tabIndex: 0,
    'aria-describedby': id,
  };

  // We use `useHover()` to determine whether we should show the tooltip.
  // Notice how we're configuring a small delay on enter / leave.
  const [isOver, hoverProps] = useHover(hoverOptions);

  // Tell `useLayer()` how we would like to position our tooltip
  const {
    triggerProps,
    layerProps: {ref: layerRef, ...layerProps},
    // Trap the 'layerSide' prop so it doesn't get
    // attached to the DOM.
    arrowProps: {layerSide, ...arrowProps},
    renderLayer,
  } = useLayer({
    isOpen: isOver,
    placement: "top-center",
    triggerOffset: 8,
    ...layerOptions,
  });

  const {ref: animRef, state: animState, visible} = useEnterExit(isOver, 'opacity');

  // when children equals text (string | number), we need to wrap it in an
  // extra span-element in order to attach props
  let trigger;
  if (isReactText(children)) {
    trigger = (
      <span
        {...triggerProps}
        {...hoverProps}
        {...aria}
      >
        {children}
      </span>
    );
  } else {
    // In case of an react-element, we need to clone it in order to attach our own props
    trigger = React.cloneElement(children, {
      ...triggerProps,
      ...hoverProps,
      ...aria,
    });
  }

  return (
    <>
      {trigger}
      {visible && renderLayer(
        <div
          ref={mergeRefs(animRef, layerRef)}
          data-testid="Tooltip"
          className={combineClasses(
            styles.Tooltip,
            className,
            animState,
            layerSide,
          )}
          {...layerProps}
          id={id}
        >
          <div
            {...arrowProps}
            className={combineClasses(
              styles.arrow,
              'arrow',
              styles[layerSide],
            )}
          />
          <div
            className={combineClasses(
              styles.content,
              'content',
            )}
            {...rest}
          >
            {content}
          </div>
        </div>
      )}
    </>
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
