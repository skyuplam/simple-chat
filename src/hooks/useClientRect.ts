/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, Ref } from 'react';


function useClientRect<T extends HTMLElement>(): [DOMRect | ClientRect | void, Ref<T>] {
  const [rect, setRect] = useState<DOMRect | ClientRect>();
  const ref = useCallback((node: T) => {
    if (node) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

export default useClientRect;
