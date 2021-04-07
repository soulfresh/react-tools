## Classes

<dl>
<dt><a href="#Analytics">Analytics</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AnalyticsOptions">AnalyticsOptions</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="Analytics"></a>

## Analytics
**Kind**: global class  

* [Analytics](#Analytics)
    * [new Analytics([trackingId], [trackingOptions])](#new_Analytics_new)
    * [.initialize([trackingId], [trackingOptions])](#Analytics+initialize)
    * [.getQuery([location])](#Analytics+getQuery)
    * [.getPage([location])](#Analytics+getPage)
    * [.trackPage([url], [setPage], [trackPage])](#Analytics+trackPage)
    * [.trackEvent(category, action, [label], [value], [userInteraction])](#Analytics+trackEvent)
    * [.trackExternalLink(url)](#Analytics+trackExternalLink)

<a name="new_Analytics_new"></a>

### new Analytics([trackingId], [trackingOptions])
A service for tracking page and user events to Google Analytics.


| Param | Type | Description |
| --- | --- | --- |
| [trackingId] | <code>string</code> | The id of the analytics account to track   events to. This can also be passed to the `initialize` method. |
| [trackingOptions] | [<code>AnalyticsOptions</code>](#AnalyticsOptions) | Options to pass to the underlying   tracker object. This can also be passed to the `initialize` method.   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options |

<a name="Analytics+initialize"></a>

### analytics.initialize([trackingId], [trackingOptions])
Initialize the underlying tracker, setting
the tracking id and session level analytics dimensions.
This must be called before you can do any event tracking.

**Kind**: instance method of [<code>Analytics</code>](#Analytics)  

| Param | Type | Description |
| --- | --- | --- |
| [trackingId] | <code>string</code> | The id of the analytics account   to track events to. This gets pulled from the environment   variables if not specified. |
| [trackingOptions] | [<code>AnalyticsOptions</code>](#AnalyticsOptions) | Options to pass to the underlying   tracker object. This can also be passed in the constructor.   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options |

<a name="Analytics+getQuery"></a>

### analytics.getQuery([location])
Get the search parameters from the URL, filtering
any parameters that are not relevant to analytics tracking.

**Kind**: instance method of [<code>Analytics</code>](#Analytics)  

| Param | Type | Description |
| --- | --- | --- |
| [location] | <code>object</code> | The location object from React Router or Window. |

<a name="Analytics+getPage"></a>

### analytics.getPage([location])
Determine the URL of the current page.

**Kind**: instance method of [<code>Analytics</code>](#Analytics)  

| Param | Type | Description |
| --- | --- | --- |
| [location] | <code>object</code> | The location object from React Router or Window. |

<a name="Analytics+trackPage"></a>

### analytics.trackPage([url], [setPage], [trackPage])
Track the current page. This will both track a page view
and set the current page so that any other event tracking
is associated with the current page.

**Kind**: instance method of [<code>Analytics</code>](#Analytics)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>object</code> |  | The url to track as the current page.   If you don't pass this, then `getPage()` will be called   to generate it for you using `window.location`. |
| [setPage] | <code>boolean</code> | <code>true</code> | Allows you to disable saving the   current page state to this location. Use this if you need to   track the page but maintain the previously set page as the source   of future event tracking. |
| [trackPage] | <code>boolean</code> | <code>true</code> | Allows you to disable tracking a page view   and instead just sets the current page for future event tracking.   Use this if you want to set the page but you don't want to track   a pageview. |

<a name="Analytics+trackEvent"></a>

### analytics.trackEvent(category, action, [label], [value], [userInteraction])
Track a non-pageview event/interaction.

**Kind**: instance method of [<code>Analytics</code>](#Analytics)  
**See**: https://github.com/react-ga/react-ga#reactgaeventargs  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| category | <code>string</code> |  |  |
| action | <code>string</code> |  |  |
| [label] | <code>string</code> |  |  |
| [value] | <code>number</code> |  |  |
| [userInteraction] | <code>boolean</code> | <code>true</code> | Whether this event was triggered by the user. |

<a name="Analytics+trackExternalLink"></a>

### analytics.trackExternalLink(url)
Track a link to an external site.

**Kind**: instance method of [<code>Analytics</code>](#Analytics)  
**See**: https://github.com/react-ga/react-ga#reactgaoutboundlinkargs-hitcallback  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="AnalyticsOptions"></a>

## AnalyticsOptions : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [queryBlacklist] | <code>Array.&lt;string&gt;</code> | An array of query parameter   names to filter from urls sent to tracking events. FYI, it's also possible   to blacklist query parameters through the Google Analytics UI. |
| [debug] | <code>boolean</code> | Output debug logging around ReactGA events. |
| [titleCase] | <code>boolean</code> | Set this to false in order to disable   converting strings to title case before they're sent to GA. |
| [gaOptions] | <code>object</code> | Options for configuring the Google   Analytics API.   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options |

