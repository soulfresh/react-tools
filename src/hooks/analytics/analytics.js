import React from 'react';
import ReactGA from 'react-ga';
import queryString from 'query-string';

// Top level event catagories.
export const ANALYTICS_CATEGORIES = {
  // Events for interacting with videos or pictures.
  MEDIA: 'Media',
};

// Work around for jsdoc not rendering output with classes
// that have constructor functions.
class Base {
  constructor(trackingId, options = {}) {
    this.options = options;
    this.trackingId = trackingId;
  }
}

/**
 * @typedef {object} AnalyticsOptions
 * @property {string[]} [queryBlacklist] - An array of query parameter
 *   names to filter from urls sent to tracking events. FYI, it's also possible
 *   to blacklist query parameters through the Google Analytics UI.
 * @property {boolean} [debug] - Output debug logging around ReactGA events.
 * @property {boolean} [titleCase] - Set this to false in order to disable
 *   converting strings to title case before they're sent to GA.
 * @property {object} [gaOptions] - Options for configuring the Google
 *   Analytics API.
 *   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options
 */

/**
 * A service for tracking page and user events to Google Analytics.
 *
 * @param {string} [trackingId] - The id of the analytics account to track
 *   events to. This can also be passed to the `initialize` method.
 * @param {AnalyticsOptions} [trackingOptions] - Options to pass to the underlying
 *   tracker object. This can also be passed to the `initialize` method.
 *   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options
 */
export class Analytics extends Base {
  /**
   * Initialize the underlying tracker, setting
   * the tracking id and session level analytics dimensions.
   * This must be called before you can do any event tracking.
   *
   * @param {string} [trackingId] - The id of the analytics account
   *   to track events to. This gets pulled from the environment
   *   variables if not specified.
   * @param {AnalyticsOptions} [trackingOptions] - Options to pass to the underlying
   *   tracker object. This can also be passed in the constructor.
   *   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options
   */
  initialize(
    trackingId = this.trackingId,
    trackingOptions = this.options,
  ) {
    if (!trackingId) {
      console.warn('[Analytics] ANALYTICS DISABLED: Tracking ID not specified.');
    }
    else if (!this.initialized) {
      this.trackingId = trackingId;
      if (trackingOptions) this.options = {...this.options, ...trackingOptions};

      // Ensure we never send analtyics events during tests.
      if (process?.env?.test === 'true') this.options.testMode = true;
      // Enable debug logging in verbose mode.
      if (this.options.verbose == null) this.options.debug = true;

      // Initialize the tracking id.
      ReactGA.initialize(trackingId, this.options);

      // TODO Allow passing through options
      // Set session variables.
      // ReactGA.set({
      //   dimension1: '???',
      // });

      // Do this last in case something blows up.
      this.initialized = true;
    }
  }

  /**
   * Get the search parameters from the URL, filtering
   * any parameters that are not relevant to analytics tracking.
   * @param {object} [location] - The location object from React Router or Window.
   */
  getQuery(location = window.location) {
    const query = queryString.parse(location.search);

    if (this.options?.queryBlacklist) {
      // Strip query parameters that aren't relavent to analytics.
      this.options.queryBlacklist.forEach(n => {
        if (typeof(n) === 'string') delete query[n];
      });
    }

    const out = queryString.stringify(query);
    return out ? `?${out}` : '';
  }

  /**
   * Determine the URL of the current page.
   * @param {object} [location] - The location object from React Router or Window.
   */
  getPage(location = window.location) {
    const query = this.getQuery(location);
    const page = location.pathname;
    let path = '/' + page + query;

    return path;
  }

  /**
   * Track the current page. This will both track a page view
   * and set the current page so that any other event tracking
   * is associated with the current page.
   *
   * @param {object} [url] - The url to track as the current page.
   *   If you don't pass this, then `getPage()` will be called
   *   to generate it for you using `window.location`.
   * @param {boolean} [setPage] - Allows you to disable saving the
   *   current page state to this location. Use this if you need to
   *   track the page but maintain the previously set page as the source
   *   of future event tracking.
   * @param {boolean} [trackPage] - Allows you to disable tracking a page view
   *   and instead just sets the current page for future event tracking.
   *   Use this if you want to set the page but you don't want to track
   *   a pageview.
   */
  trackPage(url = this.getPage(), setPage = true, trackPage = true) {
    if (this.initialized) {
      // Indicate what page subsequent events are associated with.
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications?hl=en
      if (setPage) ReactGA.set({page: url});
      // Track the current page load (required in addition to the previous line).
      if (trackPage) ReactGA.pageview(url);
    }
  }

  /**
   * Track a non-pageview event/interaction.
   * @see https://github.com/react-ga/react-ga#reactgaeventargs
   * @param {string} category
   * @param {string} action
   * @param {string} [label]
   * @param {number} [value]
   * @param {boolean} [userInteraction] - Whether this event was triggered by the user.
   */
  trackEvent(category, action, label, value, userInteraction = true) {
    // Requiring category, action AND label so we can ensure consistent tracking data.
    if (this.initialized && category && action && label) {
      ReactGA.event({category, action, label, value, nonInteraction: !userInteraction});
    }
  }

  /**
   * Track a link to an external site.
   * @see https://github.com/react-ga/react-ga#reactgaoutboundlinkargs-hitcallback
   * @param {string} url
   */
  trackExternalLink(url) {
    if (this.initialized) {
      ReactGA.outboundLink({label: url}, () => {});
    }
  }
}


export const AnalyticsContext = React.createContext(undefined);
export const AnalyticsProvider = AnalyticsContext.Provider;

export function useAnalyticsClient() {
  const service = React.useContext(AnalyticsContext);
  if (!service) console.warn('[useAnalyticsClient] No analytics client configured for your project!');
  return service;
}

