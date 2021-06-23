import React from 'react';

/**
 * Console log changes to a component's props.
 * @param {object} props
 */
export function useLogPropChanges(props) {
  const prev = React.useRef(props);
  React.useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}

