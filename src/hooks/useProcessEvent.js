import { useIsMounted } from './useIsMounted';

/**
 * Use this hook to ensure that your async event handlers
 * are not called after the parent component is unmounted.
 * Simply wrap your callback in `processEvent` and it will
 * skip execuation if it is called after your component unmounts.
 * This helps to avoid errors where trying to set the component
 * state after it's unmounted thows an error.
 *
 * ```js
 * function MyComponent({asyncTask}) {
 *   const [state, setState] = Reqct.useState(false);
 *   const processEvent = useProcessEvent();
 *
 *   React.useEffect(() => {
 *     // This will do some asynchronous work that takes a
 *     // callback for when the work is done.
 *     asyncTask(
 *       // You can wrap your callback/event handler in processEvent
 *       processEvent(e => {
 *         // Now setState will only be called if your component
 *         // is still mounted when asyncTask is complete.
 *         setState(true);
 *       })
 *     );
 *   }, []);
 *
 *   ...
 * }
 * ```
 * @return {function} Returns a function that you can wrap
 * around your event callbacks. Use it
 * anywhere you need to pass an async callback (including promise handlers).
 */
export function useProcessEvent() {
  const isMounted = useIsMounted();
  return cb => {
    return (...args) => {
      if (isMounted()) {
        cb(...args);
      }
    }
  }
}

