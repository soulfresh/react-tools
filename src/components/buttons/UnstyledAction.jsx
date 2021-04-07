import React from 'react';
import PropTypes from 'prop-types';

import { combineClasses } from '@thesoulfresh/utils';

import styles from './UnstyledAction.module.scss';

/**
 * @typedef {object} ActionButtonProps
 * @property {*} [children]
 * @property {string} [type]
 * @property {*} [ref]
 */
/**
 * @type React.FC<ActionButtonProps & HTMLButtonElement>
 */
export const ActionButton = React.forwardRef(({
  children,
  type = 'button',

  // Trap these...
  // @ts-ignore
  blank,

  ...rest
}, ref) => {
  return (
    <button
      type={type}
      {...rest}
      ref={ref}
      children={children}
    />
  );
});

/**
 * @typedef {object} ActionLinkProps
 * @property {*} [children]
 * @property {number} [tabIndex]
 * @property {boolean} [blank]
 * @property {*} [ref]
 */
/**
 * @type React.FC<ActionLinkProps & HTMLLinkElement>
 */
export const ActionLink = React.forwardRef(({
  blank,
  children,
  tabIndex = 0,
  ...rest
}, ref) => {
  const target = blank
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      {...rest}
      {...target}
      tabIndex={tabIndex}
      children={children}
      ref={ref}
    />
  );
});


/**
 * @typedef {object & ActionButtonProps & ActionLinkProps} UnstyledActionProps
 * @property {boolean}  [button]
 * @property {string}   [className]
 * @property {*}        [ref]
 */
/**
 * The `<UnstyledAction>` component provides a basis for your
 * project specific button and link components. It will render
 * either an `<a>` or `<button>` element depending on its
 * props. This makes it easy to implement buttons and
 * links throughout your application without having multiple
 * different components for all of your various link and button
 * needs. It also makes refactoring between button and link elements
 * a breaze because all you need to do is change a single prop.
 *
 * By default a `<button>` element will be rendered unless you
 * pass an `href` prop or the `link` prop which will result in
 * an `<a>` element.
 *
 * The `<UnstyledAction>` component renders buttons and links
 * without any styling (ie. it removes the default browser
 * styling for those elements). It inherits it's color and
 * font settings from it's parent element. This gives you
 * a good base for defining your own button and link styles.
 *
 * The intention of the `<UnstyledAction>` is to use as a base
 * for your own `<Action>` component. Simply wrap this component
 * (or one of the other Action components in this library) with
 * your own `<Action>` component. In your component you can
 * provide whatever styling and functionality you need for your project.
 *
 * @type React.FC<UnstyledActionProps>
 */
export const UnstyledAction = React.forwardRef(({
  link = false,
  href,
  className,
  children,
  ...rest
}, ref) => {
  // Default to being a button unless we received the link
  // prop or href info.
  const button = !href && !link;

  const props = {
    className: combineClasses(
      styles.UnstyledAction,
      className,
    ),
    href,
    children,
    ...rest
  };

  const Component = button ? ActionButton : ActionLink;
  return <Component {...props} ref={ref} />;
});

// TODO Rename UnstyledAction
UnstyledAction.propTypes = {
  /**
   * Force an `<a>` element to be rendered even
   * if no href was passed.
   */
  link: PropTypes.bool,
  /**
   * You can use `href` in place of the `to` prop but it must be a string.
   * This is only used when rendering a link and `to` takes precedence.
   */
  href: PropTypes.string,
  /**
   * __true__: set `target="_blank" rel="noopener noreferrer"`.
   */
  blank: PropTypes.bool,
  /**
   * Any other props will be passed through to the underlying
   * `<a>` or `<button>` elements.
   */
  '...other props': PropTypes.any,
};

