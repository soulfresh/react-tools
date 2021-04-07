// import React from 'react';
import ReactGA from 'react-ga';
import { Analytics } from './analytics';

describe('Analytics', () => {
  let analytics;
  const trackingId = 'asabo028302';

  const category = 'Map';
  const action = 'Zoom';
  const label = 'Zoom In';
  const value = 7;

  const link = 'http://www.foo.bar';

  describe('before initialization', () => {
    beforeEach(() => {
      analytics = new Analytics(trackingId, {
        verbose: false,
        testMode: true,
      });
    });

    it('should not track pages.', () => {
      analytics.trackPage(link);
      expect(ReactGA.testModeAPI.calls).toEqual([]);
    });

    it('should not track events.', () => {
      analytics.trackEvent(category, action, label, value);
      expect(ReactGA.testModeAPI.calls).toEqual([]);
    });

    it('should not track events.', () => {
      analytics.trackExternalLink(link);
      expect(ReactGA.testModeAPI.calls).toEqual([]);
    });
  });

  describe('after initialization', () => {
    beforeEach(() => {
      analytics = new Analytics(trackingId, {
        verbose: false,
        testMode: true,
        queryBlacklist: ['from'],
      });
      analytics.initialize();
    });

    it('should initialize the GA tracker.', () => {
      expect(ReactGA.testModeAPI.calls)
        .toEqual(expect.arrayContaining([['create', trackingId, 'auto']]));
    });

    describe('getQuery', () => {
      it('should be able to get the query string.', () => {
        const location = {
          search: '?foo=a&bar=b',
        };
        const result = analytics.getQuery(location);

        expect(result).toContain('foo=a');
        expect(result).toContain('bar=b');
        expect(result).toContain('&');
        expect(result).toMatch(/^\??/);
      });

      it('should filter blacklisted query parameters.', () => {
        const location = {
          search: '?foo=a&bar=b&from=blah/blah',
        };
        const result = analytics.getQuery(location);

        expect(result).toContain('foo=a');
        expect(result).toContain('bar=b');
        expect(result).not.toContain('from=');
        expect(result).not.toContain('blah');
      });
    });

    describe('getPage', () => {
      it('should return the path with query string.', () => {
        const location = {
          pathname: 'bar/baz',
          search: '?foo=a&bar=b&from=blah/blah',
        };
        const result = analytics.getPage(location);

        expect(result).toMatch(/^\/bar\/baz\??/);
        expect(result).toContain('foo=a');
        expect(result).toContain('bar=b');
        expect(result).not.toContain('from=');
      });
    });

    describe('trackPage', () => {
      beforeEach(() => {
        analytics.trackPage(link);
      });

      it('should set the GA page URL.', () => {
        expect(ReactGA.testModeAPI.calls)
          .toEqual(expect.arrayContaining([
            ['set', { page: link }]
          ]));
      });

      it('should track the current pageview with the GA tracker.', () => {
        expect(ReactGA.testModeAPI.calls)
          .toEqual(expect.arrayContaining([
            ['send', {hitType: 'pageview', page: link}]
          ]));
      });
    });

    describe('trackEvent', () => {
      it('should track the event with the GA tracker.', () => {
        analytics.trackEvent(category, action, label, value);

        expect(ReactGA.testModeAPI.calls)
          .toEqual(expect.arrayContaining([
            ['send', {
              hitType: 'event',
              eventCategory: category,
              eventAction: action,
              eventLabel: label,
              eventValue: value,
              nonInteraction: false,
            }]
          ]));
      });

      it('should not track the event if category is not specified.', () => {
        ReactGA.testModeAPI.resetCalls();
        analytics.trackEvent(null, action, label, value);
        expect(ReactGA.testModeAPI.calls).toEqual([]);
      });

      it('should not track the event if action is not specified.', () => {
        ReactGA.testModeAPI.resetCalls();
        analytics.trackEvent(category, null, label, value);
        expect(ReactGA.testModeAPI.calls).toEqual([]);
      });

      it('should not track the event if label is not specified.', () => {
        ReactGA.testModeAPI.resetCalls();
        analytics.trackEvent(category, action, null, value);
        expect(ReactGA.testModeAPI.calls).toEqual([]);
      });
    });

    describe('trackExternalLink', () => {
      it('should track the event with the GA tracker.', () => {
        analytics.trackExternalLink(link);

        expect(ReactGA.testModeAPI.calls)
          .toEqual(expect.arrayContaining([
            ['send', {
              hitType: 'event',
              eventCategory: 'Outbound',
              eventAction: 'Click',
              eventLabel: link,
              hitCallback: expect.any(Function),
            }]
          ]));
      });
    });
  });

  describe('when initialized with options', () => {
    beforeEach(() => {
      analytics = new Analytics();
      analytics.initialize(trackingId, {
        verbose: false,
        testMode: true,
      });
    });

    it('should function the same way as if options are passed to the constructor.', () => {
      analytics.trackEvent(category, action, label, value);

      expect(ReactGA.testModeAPI.calls)
        .toEqual(expect.arrayContaining([
          ['send', {
            hitType: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
            nonInteraction: false,
          }]
        ]));
    });
  });
});

