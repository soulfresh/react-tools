import React from 'react';
import PropTypes from 'prop-types';

import { useAnalyticsClient } from '../../hooks/analytics';

import { makeLinkFromObject } from './RoutedAction.jsx';

/**
 * @typedef {object} AnalyticsActionProps
 * @property {string} [href]
 * @property {object} [to]
 * @property {boolean} [blank]
 * @property {string} [category]
 * @property {string} [action]
 * @property {string} [label]
 * @property {number} [value]
 * @property {*} children
 * @property {function} [onClick]
 * @property {*} [ref]
 */
/**
 * The `<AnalyticsAction>` component provides analytics
 * tracking for external links and user event tracking.
 * By default it provides an AnalyticsService object
 * which assumes you are using Google Analytics. However,
 * you can supply your own AnalyticsService with the
 * same API in order to integrate with other services.
 *
 * This component can wrap any other component so
 * it's not necessarily required that you us it with
 * Action compoennts.
 *
 * @type React.FC<AnalyticsActionProps>
 */
export const AnalyticsAction = React.forwardRef(({
  // @ts-ignore: backwards compat
  button, // Trap this for backwards compatibility
  href,
  to = href,
  category,
  action,
  label,
  value,
  onClick,
  children,
  ...rest
}, ref) => {
  const analytics = useAnalyticsClient(true);

  const link = (typeof(to) === 'object')
    ? makeLinkFromObject(to)
    : to;

  // Don't consider mailto, tel or sms links "external" links.
  const external = link && link.indexOf('http') > -1;
  const trackEvent = category && action && label;

  const props = { href, to, onClick: undefined, ...rest };

  // If the intent is to track this event but the analytics
  // service is unconfigured, warn the user.
  if (trackEvent && !analytics) {
    console.warn('[AnalyticsAction] No analytics client configured for your project!');
  }

  // If this is an external link or we want to do event tracking
  // and if the analytics service is available,
  // add a click handler to perform the analytics tracking.
  if (
    analytics &&
    (external || trackEvent)
  ) {
    props.onClick = e => {
      // Ensure that analytics is configured and available
      // in this app.
      if (trackEvent) analytics.trackEvent(category, action, label, value);

      // If this is an external link, do external link tracking.
      if (external) analytics.trackExternalLink(href);

      // Ensure any outer onClick gets propegated.
      if (onClick) onClick(e);
    };
  } else if (onClick) {
    props.onClick = onClick;
  }

  return typeof(children) === 'string'
    ? <span {...props}>{ children }</span>
    : typeof(children) === 'function'
    ? children(props)
    : React.Children.map(children, c => React.cloneElement(c, props));
});

AnalyticsAction.propTypes = {
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
   * Analytics event tracking category. This is only used
   * by button actions and event tracking will only occur
   * if category, action and label are all supplied.
   * See https://github.com/react-ga/react-ga#reactgaeventargs
   */
  category: PropTypes.string,
  /**
   * Analytics event tracking action. This is only used
   * by button actions and event tracking will only occur
   * if category, action and label are all supplied.
   * See https://github.com/react-ga/react-ga#reactgaeventargs
   */
  action: PropTypes.string,
  /**
   * Analytics event tracking label. This is only used
   * by button actions and event tracking will only occur
   * if category, action and label are all supplied.
   * See https://github.com/react-ga/react-ga#reactgaeventargs
   */
  label: PropTypes.string,
  /**
   * Analytics event tracking value. This is only used
   * by button actions and event tracking will only occur
   * if category, action and label are all supplied.
   * See https://github.com/react-ga/react-ga#reactgaeventargs
   */
  value: PropTypes.number,
  /**
   * Any element you would like to track click events
   * or any link with an external href to track with
   * external link tracking.
   */
  children: PropTypes.any,
  /**
   * Any other props will be passed through to the underlying
   * `<RoutedAction>`, `<a>` or `<button>` elements.
   */
  '...other props': PropTypes.any,
};
