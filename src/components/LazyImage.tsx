import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';

/**
 * A natively lazy-loaded <img> (`loading="lazy"`): the browser only downloads it when it is
 * about to scroll into view. It fades in once it has loaded, so it never pops in.
 * Always pass `width` and `height` so the space is reserved and the layout never jumps.
 */
export default function LazyImage({ className, onLoad, onError, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // already cached / complete by the time React attached the listener
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      loading="lazy"
      decoding="async"
      {...rest}
      className={['lazy-img', loaded && 'is-loaded', className].filter(Boolean).join(' ')}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setLoaded(true); // show the alt text instead of an invisible box
        onError?.(e);
      }}
    />
  );
}
