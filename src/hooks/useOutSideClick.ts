import { useEffect } from 'react';

export function useOutSideClick(elementRef: any, handler: any, attached = true) {
  useEffect(() => {
    if (!attached) return;

    const handleClick = (e:any) => {
      if (!elementRef.current) return;
      if (!elementRef.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [elementRef, handler, attached]);
}
