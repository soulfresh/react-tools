<a name="useTimeout"></a>

## useTimeout()
Returns a wrapper around `setTimeout` that will
automatically clear the timeout if the component
is destroyed before the timeout. Use it in exactly
the same manner as `setTimeout`

```js
const wait = useTimeout();
if (something) {
  wait(() => console.log('Did it'), 1000);
}
```

**Kind**: global function  
