<a name="useMaybeControlled"></a>

## useMaybeControlled([value], [emitValue], [defaultValue]) ⇒ <code>Array</code>
Allows you to use a value that can either be set
externally or managed internally (ie. controlled vs
uncontrolled components). You can use this hook in place
of `React.useState` in your code and the value
of the first parameter will determine it's controlled
state. It will be uncontrolled if the first parameter
is `undefined`. It will be controlled if the first parameter
is anything other than `undefined` (including `null`).
This allows you to do the following:

```js
// Your component can accept `index` and `setIndex` props for
// controlling the index state of your component.
const MyComponent = ({index: indexProp, setIndex: setIndexProp}) => {
  // You can use `useMaybeControlled` in place of `React.useState`
  // and pass the `index` and `setIndex` props from the parent component.
  // You can rename the props inside your component if you want to
  // keep using the prop names inside your component for consistency/ease of use.
  const [index, setIndex] = useMaybeControlled(indexProp, setIndexProp);

  // This will log the value of index passed from outside
  // your component or the local value if the `index` prop was undefined.
  console.log('index:', index);

  // Now you can use `index` and `setIndex` as if you were
  // using `React.useState`.
  React.useEffect(() => {
    setIndex(20);
  });
}
```

#### Hook Return Value

The `useMaybeControlled` hook returns an array with the following:

- `[0]` gives you the state value.

- `[1]` gives you a function to set either the
  local value or the external value when the component
  is being controlled.

- `[2]` a boolean telling you if the value is controlled externally.
  You shouldn't really need this but maybe you'll find a use.

#### Default value

`useMaybeControlled` accepts a default value as the third parameter.
This allows you to specify a default value in uncontrolled situations.

```js
const MyComponent = ({index: indexProp, setIndex: setIndexProp}) => {
  // In this setup, 0 will be used as the initial value of `index`
  // if the `indexProp` is initially undefined (uncontrolled).
  // However, if `indexProp` is anything other than undefined,
  // then the default value will be ignored.
  const [index, setIndex] = useMaybeControlled(indexProp, setIndexProp, 0);
}
```

#### Value Emitter

In the above examples, if `MyComponent` is uncontrolled but the parent
component still passes through the `setIndex` prop, it will still be
called. This allows the parent component to use the `setIndex` callback
as an event listener.

#### Multipe setters

Sometimes it's useful to provide multiple setters for a state prop.
Here's an example of controlling an open state through
`onOpen` and `onClose` callbacks.

```js
function MyComponent({
  isOpen: open,
  onOpen,
  onClose,
}) {
  const [isOpen, setIsOpen] = useMaybeControlled(
    open,
    v => {
      if (!!v && onOpen) onOpen();
      else if (!v && onClose) onClose();
    }
  );

  React.useEffect(() => {
    // This will call the `onOpen` prop.
    setIsOpen(true);
    // This will call the `onClose` prop.
    setIsOpen(false);
  });
}
```

**Kind**: global function  
**Returns**: <code>Array</code> - Returns an array structured as
  [value: *, setValue: function, isControlled: boolean]  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>\*</code> | The possible external value to track. |
| [emitValue] | <code>function</code> | The external setter for changing   the external value or for listening for state changes when running   in an uncontrolled manner. |
| [defaultValue] | <code>\*</code> | A default value to use if the `value`   prop is not set. |

