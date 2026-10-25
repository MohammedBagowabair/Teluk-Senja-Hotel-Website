import { useRef, useState } from 'react';
import { Pic } from './Pic';

type Props = { photos: string[]; alts: string[]; label: string; note: string; photoOf: string; sizes: string; className?: string };

/** Swipeable room mini-gallery: scroll-snap slides, tappable dots, images lazy-loaded after page load. */
export function RoomGallery({ photos, alts, label, note, photoOf, sizes, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const t = photos.length;
  const onScroll = () => { const el = ref.current; if (el && el.clientWidth) setI(Math.max(0, Math.min(t - 1, Math.round(el.scrollLeft / el.clientWidth)))); };
  const go = (k: number) => { const el = ref.current; if (el) el.scrollTo({ left: k * el.clientWidth, behavior: 'smooth' }); };
  return (
    <div className={`rg ${className}`}>
      <div className="rg-track" ref={ref} onScroll={onScroll} role="group" aria-roledescription="gallery" aria-label={label}>
        {photos.map((p, k) => (
          <div className="rg-slide" key={p} aria-label={photoOf.replace('{n}', String(k + 1)).replace('{t}', String(t))} role="group">
            <Pic name={p} alt={alts[k] ?? alts[0] ?? ''} sizes={sizes} widths={[640, 1024]} />
          </div>
        ))}
      </div>
      <span className="rg-note">{note}</span>
      {t > 1 && (
        <div className="rg-dots">
          {photos.map((p, k) => (
            <button key={p} type="button" className={k === i ? 'on' : ''} aria-label={photoOf.replace('{n}', String(k + 1)).replace('{t}', String(t))} aria-current={k === i ? 'true' : undefined} onClick={() => go(k)} />
          ))}
        </div>
      )}
    </div>
  );
}
