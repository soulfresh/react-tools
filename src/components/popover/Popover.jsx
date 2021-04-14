import React from 'react';
import PropTypes from 'prop-types';
import { useLayer, mergeRefs } from "react-laag";
import { combineClasses } from '@thesoulfresh/utils';

import { isReactText } from '../../utils/react';
import { useEnterExit } from '../../hooks/useEnterExit';
import { useKeyWhenActive } from '../../hooks/keyboard/useKeyWhenActive';

import styles from './Popover.module.scss';

/**
 * @typedef {object} TriggerProps
 * @property {*} [ref]
 */
/**
 * @type React.FC<TriggerProps>
 */
export const Trigger = React.forwardRef(({
  children,
  ...props
}, ref) => {
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
      data-testid="Tooltip"
      className={combineClasses(
        styles.PopoverContent,
        className,
        visibleState,
        layerSide,
      )}
      {...layerProps}
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
        {...rest}
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
  return typeof(s) === 'number' ? Math.round(s) : s;
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
 */
/**
 * `<Popover>` is a base component you can use to create
 * more specific Popover type components like tooltips,
 * dropdowns, menus, etc. This component uses `react-laag`
 * under the hood but adds CSS based enter/leave animations and
 * listens to the `Escape` key to close the Popover.
 * If you don't need Escape handling and enter/leave animations,
 * you may be better off using `react-laag` directly.
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
 * provide it's open state and a method for setting the
 * open state to false.
 *
 * The `Popover` elements are completely stylable through
 * CSS. Your content will receive the class `content` and
 * there is an arrow element that can be targeted via the
 * `arrow` class. The arrow is just a square `<div>` on
 * which you should set the `width`, `height` and `background-color`
 * at minimum.
 *
 * This component uses the `useEnterExit()`
 * hook from this library so you can control the enter/leave transitions through
 * CSS. By default, the opacity property will be used to
 * transition your content but you can change which property
 * it listents to through the `transitionProperty` prop. Or you can turn off
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
 *
 * @type React.FC<PopoverProps>
 */
export const Popover = React.forwardRef(({
  isOpen = false,
  onClose,
  children,
  content,
  layerOptions = {},
  transitionProperty = 'opacity',
  disableTransitions = false,
  disableArrow = false,
  ...rest
}, ref) => {

  useKeyWhenActive('Escape', onClose, isOpen);

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
  const {ref: animRef, state: visibleState, visible} = useEnterExit(isOpen, transitionProperty);

  const showLayer = (!disableTransitions && visible) ||
    (disableTransitions && isOpen);

  // TODO What happens if the user attaches a ref to the trigger
  // outside of this component?
  // TODO What happens if the user attaches a ref to the content element.
  return (
    <>
      {<Trigger {...triggerProps} children={children} ref={triggerRef} />}
      {showLayer && renderLayer(
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
          ref={mergeRefs(layerRef, animRef, ref)}
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
   * A callback that should set the `isOpen` state to false.
   */
  onClose: PropTypes.func,
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
  'other props...': PropTypes.any,
};

/**
 * @param {object} props
 */
export function ExamplePopover({
  ...rest
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = e => {
    setIsOpen(false);
    // if (onClose) onClose(e);
  }

  return (
    <div
      style={{
        height: '50px',
      }}
    >
      <div
        style={{
          height: '200px',
        }}
      >
        <Popover
          isOpen={isOpen}
          layerOptions={{
            onOutsideClick: handleClose,
            onDisappear: handleClose,
          }}
          content={<div>Hello World</div>}
        >
          <button onClick={() => setIsOpen(!isOpen)}>
            Menu
          </button>
        </Popover>
      </div>
    </div>
  );
}

/**
 * @typedef {object} DropdownProps
 * @property {*} [ref]
 */
/**
 * @type React.FC<DropdownProps>
 */
export const Dropdown = React.forwardRef(({
  className,
  ...rest
}, ref) => {
  // TODO Focus trap
  // TODO aria
  return (
    <div className={combineClasses(styles.Dropdown, className)} {...rest}>
    </div>
  );
});

Dropdown.propTypes = {
};


