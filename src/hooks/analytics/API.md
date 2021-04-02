<a name="Analytics"></a>

## Analytics
A service for tracking page and user events to Google Analytics.

**Kind**: global class  

* [Analytics](#Analytics)
    * [new exports.Analytics([trackerId], [trackingOptions])](#new_Analytics_new)
    * [.initialize([trackerId], [trackingOptions])](#Analytics+initialize)
    * [.getQuery([location])](#Analytics+getQuery)
    * [.getPage([location])](#Analytics+getPage)
    * [.trackPage([location])](#Analytics+trackPage)
    * [.trackEvent(category, action, [label], [value], [userInteraction])](#Analytics+trackEvent)
    * [.trackExternalLink(url)](#Analytics+trackExternalLink)

<a name="new_Analytics_new"></a>

### new exports.Analytics([trackerId], [trackingOptions])

| Param | Type | Description |
| --- | --- | --- |
| [trackerId] | <code>string</code> | The id of the analytics account to track   events to. This can also be passed to the `initialize` method. |
| [trackingOptions] | <code>object</code> | Options to pass to the underlying   tracker object. This can also be passed to the `initialize` method.   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options |

<a name="Analytics+initialize"></a>

### analytics.initialize([trackerId], [trackingOptions])
Initialize the underlying tracker, setting
the tracking id and session level analytics dimensions.

**Kind**: instance method of [<code>Analytics</code>](#Analytics)  

| Param | Type | Description |
| --- | --- | --- |
| [trackerId] | <code>string</code> | The id of the analytics account   to track events to. This gets pulled from the environment   variables if not specified. |
| [trackingOptions] | <code>object</code> | Options to pass to the underlying   tracker object. This can also be passed in the constructor.   See https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options |

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

### analytics.trackPage([location])
Track the current page.

**Kind**: instance method of [<code>Analytics</code>](#Analytics)  

| Param | Type | Description |
| --- | --- | --- |
| [location] | <code>object</code> | The location object from React Router or Window. |

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

