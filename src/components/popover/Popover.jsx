import React from 'react';
import PropTypes from 'prop-types';
import { useLayer, mergeRefs } from "react-laag";
import { combineClasses } from '@thesoulfresh/utils';

import { isReactText } from '../../utils/react';
import { useEnterExit } from '../../hooks/useEnterExit';

import styles from './Popover.module.scss';

/**
 * @typedef {object} TriggerProps
 */
/**
 * Render a popover's trigger content. This handles the case
 * where the trigger is just text content in which case it
 * should be wrapped in a span element.
 *
 * @type React.FC<TriggerProps>
 */
export const Trigger = React.forwardRef(({
  children,
  ...props
}, ref) => {
  ref = children?.ref && ref
    ? mergeRefs(ref, children.ref)
    : children?.ref
      ? children.ref
      : ref;
  if (isReactText(children)) {
    return <span {...props} ref={ref}>{children}</span>;
  } else {
    // In case of an react-element, we need to clone it in order to attach our own props
    // @ts-ignore
    return React.cloneElement(children, {...props, ref});
  }
});

Trigger.propTypes = {
  // @ts-ignore
  children: PropTypes.node.isRequired,
};


/**
 * @typedef {object} PopoverContentProps
 * @property {*} [ref]
 * @property {string} [className]
 * @property {string} [visibleState]
 * @property {string} [layerSide]
 * @property {object} [layerProps]
 * @property {object} [arrowProps]
 * @property {boolean} [disableArrow]
 */
/**
 * Render the content for a popover. This takes care of
 * rendering a wrapping element around the content, rendering
 * the arrow and then rendering the children over the arrow.
 *
 * @type React.FC<PopoverContentProps>
 */
export const PopoverContent = React.forwardRef(({
  className,
  visibleState,
  layerSide,
  layerProps,
  arrowProps,
  disableArrow,
  children,
  ...rest
}, ref) => {
  // - Render an outer container that can be easily positioned
  //   relative to the trigger.
  //   - Render the arrow as a square positioned relative to the parent container.
  //     Using a square div instead of the SVG Arrow from react-laag so it
  //     can be more easily styled with CSS.
  //   - Render the content on top of the arrow. As long as the content
  //     has a background color, it should make the arrow square look like
  //     a triangle.
  return (
    <div
      ref={ref}
      data-testid="Popover"
      className={combineClasses(
        styles.PopoverContent,
        className,
        visibleState,
        layerSide,
        visibleState !== 'exited' ? 'open' : 'closed',
      )}
      {...layerProps}
      {...rest}
    >
      {!disableArrow &&
        <div
          {...arrowProps}
          className={combineClasses(
            styles.arrow,
            'arrow',
            styles[layerSide],
          )}
        />
      }
      <div
        className={combineClasses(
          styles.content,
          'content',
        )}
      >
        {children}
      </div>
    </div>
  );
});

PopoverContent.propTypes = {
  className: PropTypes.string,
  visibleState: PropTypes.string,
  layerSide: PropTypes.string,
  layerProps: PropTypes.object,
  arrowProps: PropTypes.object,
};


/**
 * Round a value if it is a number.
 * @param {*} s
 * @return {*}
 */
function round(s) {
  if (typeof(s) === 'number') {
    return isNaN(s) ? 0 : Math.round(s);
  } else {
    return s;
  }
}

/**
 * Force position values of a style object to be rounded
 * so scale transforms don't
 * cause positioning issues for the arrow element.
 * @param {object} s
 * @return {object}
 */
function roundStyles(s) {
  return {
    ...s,
    top    : round(s.top),
    bottom : round(s.bottom),
    left   : round(s.left),
    right  : round(s.right),
  };
}

/**
 * @typedef {object|HTMLElement} PopoverProps
 * @property {*} [ref]
 * @property {boolean} [isOpen]
 * @property {function} [onClose]
 * @property {*} [children]
 * @property {*} [content]
 * @property {object} [layerOptions]
 * @property {string} [transitionProperty]
 * @property {boolean} [disableTransitions]
 * @property {boolean} [disableArrow]
 * @property {boolean} [persistent]
 */
/**
 * `<Popover>` is a base component you can use to create
 * more specific Popover type components like tooltips,
 * dropdowns, menus, etc. This component uses `react-laag`
 * for positioning but adds CSS based enter/leave animations.
 *
 * Be aware that there are more specific `Tooltip` and `Dropdown`
 * components in this library that provide more concret implementations
 * of `Popover`.
 *
 * #### Usage
 *
 * To use `Popover`, wrap the content that you want to trigger
 * the popover (ex. a button or link element) with the `<Popover>`
 * component and then pass the content to render in the popover
 * via the `content` prop. In most cases, you won't use this
 * component directly in your application but you'll wrap it
 * in a more specific component that provides the styling you
 * need in your project.
 *
 * Popover is a controlled component so you will need to
 * provide it's open state.
 *
 * #### Styling
 *
 * The `Popover` elements are completely stylable through
 * CSS. Your content will receive the class `content` and
 * there is an arrow element that can be targeted via the
 * `arrow` class. The arrow is just a square `<div>` that
 * is positioned for you but is unstyled otherwise. Since
 * it is unstyled, it will not have dimensions so you will
 * need to give it a `width` and `height` through CSS.
 *
 * #### Transitions
 *
 * This component uses the `useEnterExit()`
 * hook from this library so you can control the enter/leave transitions through
 * CSS. By default, the opacity property will be used to
 * transition your content but you can change which property
 * it listens to through the `transitionProperty` prop. Or you can turn off
 * transitions by passing the `disableTransitions` prop.
 *
 * In order to customize the transitions, the following
 * classes will be set on the `<div>` wrapping your content
 * and the arrow:
 *
 * - entering
 * - entered
 * - exiting
 * - exited
 * - top
 * - bottom
 * - left
 * - right
 * - open
 * - closed
 *
 * #### Positioning
 *
 * This component builds off of `react-laag` to provide the popover
 * layer positioning. If you don't need CSS enter/leave animations
 * provided by this component, you may be better off using `react-laag` directly.
 *
 * @type React.FC<PopoverProps>
 */
export const Popover = React.forwardRef(({
  isOpen = false,
  children,
  content,
  layerOptions = {},
  transitionProperty = 'opacity',
  disableTransitions = false,
  disableArrow = false,
  persistent = false,
  ...rest
}, ref) => {
  const {
    triggerProps: {ref: triggerRef, ...triggerProps},
    layerProps: {ref: layerRef, style: layerStyle, ...layerProps},
    // Trap the 'layerSide' prop so it doesn't get
    // attached to the DOM.
    arrowProps: {layerSide, style: arrowStyle, ...arrowProps},
    renderLayer,
  } = useLayer({
    isOpen,
    auto: true,
    placement: "bottom-center",
    ...layerOptions,
  });

  // TODO Reset the element styles when the layerSide changes so the
  // next show event starts in the correct location.
  // TODO I think using the visible prop to decide whether to render
  // the tip is breaking the animation sometimes.
  const {ref: animRef, state: visibleState, visible} = useEnterExit(isOpen, transitionProperty, {enterDelay: 60});

  const showLayer = persistent ||
    (!disableTransitions && visible) ||
    (disableTransitions && isOpen);

  return (
    <>
      {
        <Trigger
          {...triggerProps}
          children={children}
          ref={mergeRefs(triggerRef, children?.ref)}
        />
      }
      { showLayer && renderLayer(
        <PopoverContent
          visibleState={visibleState}
          layerSide={layerSide}
          layerProps={{
            ...layerProps,
            style: roundStyles(layerStyle),
          }}
          arrowProps={{
            ...arrowProps,
            style: roundStyles(arrowStyle),
          }}
          disableArrow={disableArrow}
          ref={mergeRefs(ref, layerRef, animRef)}
          children={content}
          {...rest}
        />
      )}
    </>
  );
});

Popover.propTypes = {
  /**
   * Whether or not the popover is currently open.
   */
  isOpen: PropTypes.bool,
  /**
   * The content that will trigger the tooltip.
   * This can be any renderable JSX content.
   */
  children: PropTypes.node.isRequired,
  /**
   * The content to place inside of the popover.
   * This can be any rederable JSX content.
   */
  content: PropTypes.node.isRequired,
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
   * By default, your menu content will be removed from the
   * DOM for efficiency purposes. However, you can pass this
   * prop to keep the content in the DOM and hide it with CSS.
   * This is useful for content like tooltips and select boxes
   * where the browser should always have access to the data.
   */
  persistent: PropTypes.bool,
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
   * Any other props you pass will be applied to the
   * popover menu wrapper div.
   */
  'other props...': PropTypes.any,
};

