import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { combineClasses } from '@thesoulfresh/utils';

import { UnstyledAction } from './UnstyledAction.jsx';

import styles from './UnstyledAction.module.scss';

/**
 * Determine if a `to` prop contains a hash.
 * @param {object|string} to
 * @return {boolean}
 */
// TODO Testing
export function hasHash(to) {
  return (typeof(to) === 'object')
    ? !!to.hash
    : to
    ? to.split('#').length > 1
    : false;
}

/**
 * Convert a React Router `to` object and convert it
 * into a URL string.
 * @param {string|object} to
 * @return {string}
 */
// TODO Testing
export function makeLinkFromObject(to) {
  let href = '';
  if (to.pathname) href += to.pathname;
  if (to.hash) href += to.hash;
  if (to.search) href += to.search;
  return href;
}


/**
 * @typedef {UnstyledActionProps} RoutedActionProps
 * @property {*} [button]
 * @property {*} [blank]
 * @property {*} [unrouted]
 * @property {*} [href]
 * @property {*} [to]
 * @property {*} [className]
 * @property {*} [ref]
 */
/**
 * The `<RoutedAction>` component extends the `<UnstyledAction>`
 * to provide integration with [React Router](https://reactrouter.com/web/guides/quick-start).
 * It will render either a React Router Link component or an
 * `UnstyledAction` based on whether you want a link and if
 * that link should be handled by React Router.
 *
 * In the following cases, a React Router Link will NOT be rendered:
 *
 *   - `blank` is true
 *   - `unrouted` is true
 *   - `href` and `to` are not passed
 *
 * You can pass either the `to` property or the `href` property.
 * `href` must be a string but `to` allows you to pass an object
 * or string as expected by React Router. If you pass a `to` property and
 * the `blank` or `unrouted` properties, the `to` prop will be
 * transformed into an `href` string to be used by the unrouted
 * `<a>` element. If you don't pass an `href` or `to` prop or the
 * `link` prop, then a button will be rendered
 *
 * Similar to the `UnstyledAction` component, the rendered
 * button and link elements will be completely unstyled. You
 * should extend this component with your own `Action` component
 * which provides the styling for your project.
 *
 * @type React.FC<RoutedActionProps & UnstyledActionProps>
 */
export const RoutedAction = React.forwardRef(({
  link,
  blank = false,
  unrouted = false,
  href,
  to = href,
  className,
  ...rest
}, ref) => {
  const button = !to && !href && !link;

  // Hash links should be unrouted because react router
  // does not handle them well.
  if (button || blank || unrouted || hasHash(to)) {
    const href = (typeof(to) === 'object')
      ? makeLinkFromObject(to)
      : to;

    return (
      <UnstyledAction
        className={className}
        href={href}
        tabIndex={0}
        link={link}
        blank={blank}
        {...rest}
        ref={ref}
      />
    );
  }
  else {
    return (
      <RouterLink
        data-router-link
        className={combineClasses(
          styles.UnstyledAction,
          className,
        )}
        to={to}
        tabIndex={0}
        {...rest}
        ref={ref}
      />
    );
  }
});


RoutedAction.propTypes = {
  /**
   * This can be used to force rendering an `<a>` element
   * even if you don't pass an `href` or `to` prop.
   */
  link: PropTypes.bool,
  /**
   * Either an object as accepted by React Router or a string to
   * use as an href. Only useful if you are rendering a link.
   * See https://reactrouter.com/web/api/Link/to-object for React
   * Router docs.
   */
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * You can use `href` in place of the `to` prop but it must be a string.
   * This is only used when rendering a link and `to` takes precedence.
   */
  href: PropTypes.string,
  /**
   * __true__: set `target="_blank" rel="noopener noreferrer"`.
   * __false__: link internally using react router.
   * Only useful when rendering links.
   */
  blank: PropTypes.bool,
  /**
   * __true__: force this link to be a standard HTML link that will not
   * be routed by React Router. Only usefull when rendering links.
   */
  unrouted: PropTypes.bool,
  /**
   * Any other props will be passed through to the underlying
   * `<a>` or `<button>` elements or the `RouterLink` for
   * links that should be handled by React Router.
   */
  '...other props': PropTypes.any,
};
