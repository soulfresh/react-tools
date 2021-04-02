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
  constructor(trackerId, options = {trackerId}) {
    this.options = options;
  }
}

/**
 * A service for tracking page and user events to Google Analytics.
 *
 * @param {string} [trackerId] - The id of the analytics account to track
 *   events to. This can also be passed to the `initialize` method.
 * @param {object} [trackingOptions] - Options to pass to the underlying
 *   tracker object. This can also be passed to the `initialize` method.
 *   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options
 */
export class Analytics {
  /**
   * Initialize the underlying tracker, setting
   * the tracking id and session level analytics dimensions.
   * @param {string} [trackerId] - The id of the analytics account
   *   to track events to. This gets pulled from the environment
   *   variables if not specified.
   * @param {object} [trackingOptions] - Options to pass to the underlying
   *   tracker object. This can also be passed in the constructor.
   *   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options
   */
  initialize(
    trackerId,
    trackingOptions,
  ) {
    if (!trackerId) {
      console.warn('[Analytics] ANALYTICS DISABLED: Tracking ID not specified.');
    }
    else if (!this.initialized) {
      this.trackingId = trackerId;
      if (trackingOptions) this.options = {...this.options, trackingOptions};

      // Ensure we never send analtyics events during tests.
      if (process?.env?.test === 'true') this.options.testMode = true;
      // Enable debug logging in verbose mode.
      if (this.options.verbose == null) this.options.debug = true;

      // Initialize the tracking id.
      ReactGA.initialize(trackerId, this.options);

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

    // TODO Allow passing a black list through options
    // Strip query parameters that aren't relavent to analytics.
    // ['from'].forEach(n => {
    //   delete query[n];
    // });

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

    // TODO Allow passing a black list through options
    // Do any filtering you need here.

    return '/' + page + query;
  }

  /**
   * Track the current page.
   * @param {object} [location] - The location object from React Router or Window.
   */
  trackPage(location) {
    if (this.initialized) {
      const url = this.getPage(location);

      // Indicate what page subsequent events are associated with.
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications?hl=en
      ReactGA.set({page: url});
      // Track the current page load (required in addition to the previous line).
      ReactGA.pageview(url);
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
  return React.useContext(AnalyticsContext);
}

