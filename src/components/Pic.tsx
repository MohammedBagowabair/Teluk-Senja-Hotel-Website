import { useEffect, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

/** True once the page has finished loading, so below-the-fold images never compete with the first screen. */
function useAfterLoad() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.readyState === 'complete') { const t = setTimeout(() => setReady(true), 50); return () => clearTimeout(t); }
    const on = () => setReady(true);
    window.addEventListener('load', on, { once: true });
    return () => window.removeEventListener('load', on);
  }, []);
  return ready;
}

type Props = {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
  widths?: number[];
};

/** Responsive AVIF/WebP picture served from /public/img. */
export function Pic({ name, alt, sizes = '100vw', className, eager, widths = [640, 1024, 1600] }: Props) {
  const ready = useAfterLoad();
  if (!ready && !eager) return <span className="pic-ph" aria-hidden="true" />;
  const set = (ext: string) => widths.map((w) => `${BASE}img/${name}-${w}.${ext} ${w}w`).join(', ');
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`${BASE}img/${name}-1024.webp`}
        alt={alt}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        fetchPriority={eager ? 'high' : 'auto'}
        width={1600}
        height={1067}
      />
    </picture>
  );
}

/** Hero picture: portrait crop on phones, landscape on larger screens. */
export function HeroPic({ alt, className }: { alt: string; className?: string }) {
  return (
    <picture>
      <source type="image/avif" media="(max-width: 767px)" srcSet={`${BASE}img/hero-m480.avif 480w, ${BASE}img/hero-m750.avif 750w`} sizes="100vw" />
      <source type="image/webp" media="(max-width: 767px)" srcSet={`${BASE}img/hero-m480.webp 480w, ${BASE}img/hero-m750.webp 750w`} sizes="100vw" />
      <source type="image/avif" srcSet={`${BASE}img/hero-1024.avif 1024w, ${BASE}img/hero-1600.avif 1600w`} sizes="100vw" />
      <source type="image/webp" srcSet={`${BASE}img/hero-1024.webp 1024w, ${BASE}img/hero-1600.webp 1600w`} sizes="100vw" />
      <img src={`${BASE}img/hero-1024.webp`} alt={alt} className={className} decoding="async" width={1600} height={1067} />
    </picture>
  );
}
