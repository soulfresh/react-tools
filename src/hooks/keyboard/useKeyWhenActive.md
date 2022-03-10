<a name="useKeyWhenActive"></a>

## useKeyWhenActive(key, cb, active, [el])
Calls the provided callback on key down once while
the active flag is true. Toggling the flag resets the
counter allowing the callback to be tracked again.

For efficiency, all event listeners are removed when active is false.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The event.key value |
| cb | <code>function</code> |  |
| active | <code>boolean</code> | Whether or not event listening is   currently enabled. |
| [el] | <code>Window</code> \| <code>HTMLElement</code> | The element on which to listen for key events.   Defaults to window. |

