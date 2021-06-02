<a name="useEnterExit"></a>

## useEnterExit(visible, property, [options]) ⇒ <code>object</code>
Enable CSS animation of the entering and exiting of an element/component.
This hook is intended for use in situations where you want to conditionally
render an element and when it is present you want to animate it
entering/exiting using CSS transitions.

This hook gives you full control over how elements are transitioned
and does not modify the element being transitioned. It simply tracks
the transition state of your element by listening to the `transitionend`
events of the element.

This hook returns the states 'entering', 'entered', 'exiting'
and 'exited' which you can use to attach classes/styles to your element which
indicate the styling of the element in each state. Usually you
only need to set a default invisible state and add a class for
the 'entered' state.

In order to work, this component returns a `ref` that you need to
apply to the element being transitioned (or one of it's parent nodes).
You also have to tell this hook which CSS property is being transitioned
so it can listen for that `transitionend` event. If you transition
multiple properties, simply pass the property that takes the
longest to transition (or pick any if they all have the same
duration).

State values are returned under the following circumstances:
- entering - As soon as the visible parameter changes to true
- entered - One tick after the visible parameter becomes true
- exiting - As soon as the visible parameter changes to false
- exited - After the first transitionend event that matches the property
  parameter passed.

```js
const {ref, state, visible} = useEnterExit(isOpen, 'opacity');
if (visible) {
  return (
    <div
      ref={ref}
      className={state}
      style={{
        opacity: state === 'entered' ? 1 : 0;
      }}
    >
      Show/Hide Item
    </div>
  );
} else {
  return null;
}
```

**Kind**: global function  
**Returns**: <code>object</code> - - An object with `ref`, `state` and `visible` props.
  `ref` is the ref to attach to your component.
  `state` is a string equal to one of 'entering', 'entered', 'exiting', 'exited'
  `visible` indicates if the element is visible (ie. state != 'exited')  

| Param | Type | Description |
| --- | --- | --- |
| visible | <code>boolean</code> | Whether to show the entered state or the exited state. |
| property | <code>string</code> | A property to watch for transition end events (ex. 'opacity', 'transform').   This should match the `propertyName` value of the transition end event you   want to use as the signal for your "exited" state. |
| [options] | <code>object</code> |  |
| [options.enterDelay] | <code>number</code> | Number of milliseconds to delay the transition from   the entered state to the entering state. Defaults to the next tick (0 milliseconds). |
| [options.silent] | <code>boolean</code> | Disable warnings if a transition end event isn't   detected within 20 seconds of the first enter event. |

