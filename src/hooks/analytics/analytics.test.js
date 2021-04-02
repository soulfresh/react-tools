// import React from 'react';
import ReactGA from 'react-ga';
import { Analytics } from './analytics';

describe('Analytics', () => {
  let analytics;
  const trackingId = 'asabo028302';

  const page = 'foo/bar';
  const search = '?a=1&b=2';
  const pathname = `${page}`;

  const category = 'Map';
  const action = 'Zoom';
  const label = 'Zoom In';
  const value = 7;

  const link = 'http://www.foo.bar';

  beforeEach(() => {
    analytics = new Analytics({
      verbose: false,
      testMode: true,
    });
  });

  describe('before initialization', () => {
    it('should not track pages.', () => {
      analytics.trackPage({pathname, search});
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
      analytics.initialize(trackingId);
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

      // it('should filter blacklisted query parameters.', () => {
      //   const location = {
      //     search: '?foo=a&bar=b&from=blah/blah',
      //   };
      //   const result = analytics.getQuery(location);
      //
      //   expect(result).withContext('foo').toContain('foo=a');
      //   expect(result).withContext('bar').toContain('bar=b');
      //   expect(result).withContext('from').not.toContain('from=');
      //   expect(result).withContext('blah').not.toContain('blah');
      // });
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
        // TODO Test black listing
        // expect(result).not.toContain('from=');
      });
    });

    describe('trackPage', () => {
      beforeEach(() => {
        analytics.trackPage({pathname, search});
      });

      it('should set the GA page URL.', () => {
        expect(ReactGA.testModeAPI.calls)
          .toEqual(expect.arrayContaining([
            ['set', { page: '/' + page + search }]
          ]));
      });

      it('should track the current pageview with the GA tracker.', () => {
        expect(ReactGA.testModeAPI.calls)
          .toEqual(expect.arrayContaining([
            ['send', {hitType: 'pageview', page: '/' + page + search }]
          ]));
      });
    });

    // describe('trackEvent', () => {
    //   it('should track the event with the GA tracker.', () => {
    //     analytics.trackEvent(category, action, label, value);
    //
    //     expect(ReactGA.testModeAPI.calls)
    //       .toContain(['send', {
    //         hitType: 'event',
    //         eventCategory: category,
    //         eventAction: action,
    //         eventLabel: label,
    //         eventValue: value,
    //         nonInteraction: false,
    //       }]);
    //   });
    //
    //   it('should not track the event if category is not specified.', () => {
    //     ReactGA.testModeAPI.resetCalls();
    //     analytics.trackEvent(null, action, label, value);
    //     expect(ReactGA.testModeAPI.calls).toEqual([]);
    //   });
    //
    //   it('should not track the event if action is not specified.', () => {
    //     ReactGA.testModeAPI.resetCalls();
    //     analytics.trackEvent(category, null, label, value);
    //     expect(ReactGA.testModeAPI.calls).toEqual([]);
    //   });
    //
    //   it('should not track the event if label is not specified.', () => {
    //     ReactGA.testModeAPI.resetCalls();
    //     analytics.trackEvent(category, action, null, value);
    //     expect(ReactGA.testModeAPI.calls).toEqual([]);
    //   });
    // });
    //
    // describe('trackExternalLink', () => {
    //   it('should track the event with the GA tracker.', () => {
    //     analytics.trackExternalLink(link);
    //
    //     expect(ReactGA.testModeAPI.calls)
    //       .toContain(['send', {
    //         hitType: 'event',
    //         eventCategory: 'Outbound',
    //         eventAction: 'Click',
    //         eventLabel: link,
    //         hitCallback: jasmine.any(Function),
    //       }]);
    //   });
    // });
  });
});

