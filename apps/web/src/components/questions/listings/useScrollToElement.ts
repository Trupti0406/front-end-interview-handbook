import { useEffect, useRef } from 'react';

export default function useScrollToElement<T extends HTMLElement>(
  hash: string,
  delay: number,
) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    if (window.location.hash === hash && elementRef != null) {
      timer = setTimeout(() => {
        window.scrollTo({
          left: 0,
          top: (elementRef?.current?.offsetTop ?? 0) - 24,
        });
      }, delay);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return elementRef;
}
