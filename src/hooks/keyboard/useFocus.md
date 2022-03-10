<a name="useFocus"></a>

## useFocus([onFocus], [onBlur], [active]) ⇒ <code>object</code>
Track focus inside of a component. This is useful for
components that may have multiple focusable children
and will only call the blur callback if none of the
children have focus. Because of focus event ordering,
the blur event will occure one tick after focus leaves
the component.

**Kind**: global function  
**Returns**: <code>object</code> - Returns an object with a `ref` to attach
to the root of your component and `focused` which tells
you if the component is currently focused.  

| Param | Type | Description |
| --- | --- | --- |
| [onFocus] | <code>function</code> | This callback will be called   after focus is first recieved by the component or any   of it's children. |
| [onBlur] | <code>function</code> | This callback will be called   after blur of the component and all of it's children. |
| [active] | <code>boolean</code> | Allows you to toggle listening   on and off. When off, all event listeners are removed   for efficiency. |

