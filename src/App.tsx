import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CalendarHeart, Menu, Minus, Phone, Plane, Plus, X } from 'lucide-react';
import { COPY, ROOM_IMAGES } from '@/content';
import { CREDITS } from '@/credits';
import { useCopy } from '@/lib/lang';
import { PHONE_DISPLAY, TEL, waUrl } from '@/lib/wa';
import { todayISO, useBooking } from '@/lib/booking';
import { HeroPic, Pic } from '@/components/Pic';
import { LangSwitch } from '@/components/LangSwitch';
import { WaFab, WaIcon } from '@/components/WaFab';

const Logo = () => (
  <svg viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">
    <circle cx="24" cy="26" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 30h40M10 35h28M16 40h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function App() {
  const c = useCopy(COPY);
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [solid, setSolid] = useState(false);
  const b = useBooking();

  useEffect(() => {
    document.documentElement.style.overflow = menu || sheet ? 'hidden' : '';
  }, [menu, sheet]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on();
    window.addEventListener('scroll', on, { passive: true });
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setSheet(false); } };
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('keydown', esc); };
  }, []);
  const book = (room?: string) => { if (room) b.setRoom(room); setMenu(false); setSheet(true); };

  return (
    <>
      <a href="#main" className="skip">{c.skip}</a>
      <header className={`hdr ${solid ? 'solid' : ''}`}>
        <button className="ibtn mob" aria-label={c.openMenu} aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(true)}><Menu size={22} /></button>
        <a href="#top" className="logo"><Logo /><span>Teluk Senja</span></a>
        <nav className="dnav" aria-label="Primary">{c.nav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
        <div className="hdr-r">
          <LangSwitch label={c.langLabel} />
          <button className="pill-sm desk" onClick={() => book()}>{c.reserve}</button>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <HeroPic alt={c.heroAlt} className="hero-img" />
          <div className="hero-veil" />
          <div className="hero-txt">
            <p className="kick">{c.heroEyebrow}</p>
            <h1>{c.heroTitle[0]} <span>{c.heroTitle[1]}</span></h1>
            <p className="hero-p">{c.heroText}</p>
          </div>
          <a href="#bay" className="scroll-cue"><span>{c.scroll}</span><i /></a>
        </section>

        <section id="bay" className="bay">
          <p className="kick dark">{c.introEyebrow}</p>
          <h2>{c.introTitle}</h2>
          <p className="body">{c.introText}</p>
          <ul className="stats">{c.stats.map(([n, l]) => <li key={l}><strong>{n}</strong><span>{l}</span></li>)}</ul>
        </section>

        <Suites onAsk={book} />

        <section id="sea" className="sea">
          <div className="sea-head">
            <p className="kick dark">{c.seaEyebrow}</p>
            <h2>{c.seaTitle}</h2>
          </div>
          <div className="sea-grid">
            {c.sea.map((s) => (
              <article key={s.t} className="sea-card">
                <div className="sea-img"><Pic name={s.img} alt={s.alt} sizes="(min-width: 900px) 45vw, 92vw" /></div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="deck" className="deck">
          <Pic name="sunset" alt={c.deckAlt} sizes="100vw" />
          <div className="deck-veil" />
          <div className="deck-txt">
            <p className="kick">{c.deckEyebrow}</p>
            <h2>{c.deckTitle}</h2>
            <p>{c.deckText}</p>
          </div>
        </section>

        <section id="arrive" className="arrive">
          <Plane size={28} className="arrive-ic" aria-hidden="true" />
          <p className="kick dark">{c.arriveEyebrow}</p>
          <h2>{c.arriveTitle}</h2>
          <p className="body">{c.arriveText}</p>
          <div className="cta-row">
            <a className="b-wa" href={waUrl(c.waDefault)} target="_blank" rel="noopener noreferrer"><WaIcon size={20} /> {c.chat}</a>
            <a className="b-out" href={TEL}><Phone size={18} /> <span dir="ltr">{PHONE_DISPLAY}</span></a>
          </div>
        </section>
      </main>

      <footer className="ftr">
        <div className="ftr-in">
          <a href="#top" className="logo"><Logo /><span>Teluk Senja</span></a>
          <p>{c.footerTag}</p>
          <p className="ftr-c"><strong>{c.contact}</strong><br />
            <a href={waUrl(c.waDefault)} target="_blank" rel="noopener noreferrer">WhatsApp <span dir="ltr">{PHONE_DISPLAY}</span></a><br />
            <a href={TEL}>{c.call} <span dir="ltr">{PHONE_DISPLAY}</span></a></p>
          <p className="demo">{c.demo}</p>
          <details className="cred">
            <summary>{c.credits}</summary>
            <ul>{CREDITS.map((cr) => <li key={cr.page}><a href={cr.page} target="_blank" rel="noopener noreferrer">{cr.title.replace(/\.(jpe?g|png)$/i, '')}</a>, {cr.artist}, {cr.lic}</li>)}</ul>
          </details>
          <p className="legal">{c.rights}</p>
        </div>
      </footer>

      <button className="reserve-pill" onClick={() => book()} aria-haspopup="dialog"><CalendarHeart size={18} /> {c.reserve}</button>
      <WaFab text={c.waDefault} label={c.waLabel} />

      {menu && (
        <div id="menu" className="menu" role="dialog" aria-modal="true" aria-label={c.openMenu}>
          <div className="menu-hd">
            <button className="ibtn" aria-label={c.closeMenu} onClick={() => setMenu(false)} autoFocus><X size={24} /></button>
            <LangSwitch label={c.langLabel} />
          </div>
          <nav aria-label="Menu" className="menu-nav">
            {c.nav.map(([h, l]) => <a key={h} href={h} onClick={() => setMenu(false)}>{l}<ArrowUpRight size={22} aria-hidden="true" /></a>)}
          </nav>
          <div className="menu-ft">
            <button className="b-sun" onClick={() => book()}>{c.reserve}</button>
            <a className="b-wa" href={waUrl(c.waDefault)} target="_blank" rel="noopener noreferrer"><WaIcon size={20} /> {c.chat}</a>
          </div>
        </div>
      )}

      {sheet && <Sheet b={b} onClose={() => setSheet(false)} />}
    </>
  );
}

function Suites({ onAsk }: { onAsk: (r: string) => void }) {
  const c = useCopy(COPY);
  const ref = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);
  const [idx, setIdx] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProg(max > 0 ? el.scrollLeft / max : 0);
    const card = el.firstElementChild as HTMLElement | null;
    if (card) setIdx(Math.min(c.rooms.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + 12))));
  };
  const n = c.rooms.length;
  return (
    <section id="suites" className="suites">
      <div className="suites-head">
        <div>
          <p className="kick">{c.suitesEyebrow}</p>
          <h2>{c.suitesTitle}</h2>
        </div>
        <p className="counter" aria-live="polite"><span>{String(idx + 1).padStart(2, '0')}</span> {c.of} {String(n).padStart(2, '0')}</p>
      </div>
      <div className="s-track" ref={ref} onScroll={onScroll} role="region" aria-label={c.suitesTitle} tabIndex={0}>
        {c.rooms.map((r, i) => (
          <article className="s-card" key={r.name}>
            <Pic name={ROOM_IMAGES[i] ?? 'beach'} alt={r.alt} sizes="(min-width: 900px) 42vw, 86vw" />
            <div className="s-veil" />
            <div className="s-txt">
              <p className="s-meta">{r.meta}</p>
              <h3>{r.name}</h3>
              <p>{r.text}</p>
              <button className="s-ask" onClick={() => onAsk(r.name)}>{c.askRoom} <ArrowUpRight size={16} /></button>
            </div>
          </article>
        ))}
      </div>
      <div className="prog" aria-hidden="true"><i style={{ transform: `scaleX(${(1 / n) + prog * (1 - 1 / n)})` }} /></div>
      <p className="swipe" aria-hidden="true">{c.swipe} ⟶</p>
    </section>
  );
}

function Sheet({ b, onClose }: { b: ReturnType<typeof useBooking>; onClose: () => void }) {
  const c = useCopy(COPY);
  return (
    <div className="sheet-bg" onClick={onClose}>
      <form className="sheet" role="dialog" aria-modal="true" aria-labelledby="st" onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => { e.preventDefault(); if (!b.datesInvalid) window.open(waUrl(b.compose({ ...c.msg })), '_blank', 'noopener'); }}>
        <div className="handle" aria-hidden="true" />
        <div className="sheet-hd">
          <h2 id="st">{c.sheetTitle}</h2>
          <button type="button" className="ibtn" aria-label={c.f.close} onClick={onClose} autoFocus><X size={22} /></button>
        </div>
        <p className="sheet-p">{c.sheetText}</p>
        <div className="dates">
          <label><span>{c.f.arrival}</span><input type="date" min={todayISO()} value={b.arrival} onChange={(e) => b.setArrival(e.target.value)} /></label>
          <label><span>{c.f.departure}</span><input type="date" min={b.arrival || todayISO(1)} value={b.departure} onChange={(e) => b.setDeparture(e.target.value)} aria-invalid={b.datesInvalid} /></label>
        </div>
        {b.datesInvalid ? <p className="err" role="alert">{c.f.dateError}</p> : b.nights > 0 ? <p className="nights">{b.nights === 1 ? c.f.night : c.f.nights.replace('{n}', String(b.nights))}</p> : null}
        <fieldset className="chips">
          <legend>{c.f.room}</legend>
          {['', ...c.rooms.map((r) => r.name)].map((name) => (
            <label key={name || 'any'} className={b.room === name ? 'on' : ''}>
              <input type="radio" name="room" value={name} checked={b.room === name} onChange={() => b.setRoom(name)} />
              {name || c.f.anyRoom}
            </label>
          ))}
        </fieldset>
        <div className="guests">
          <span id="gl">{c.f.guests}</span>
          <div role="group" aria-labelledby="gl" className="step">
            <button type="button" aria-label={c.f.less} disabled={b.guests <= 1} onClick={() => b.setGuests(b.guests - 1)}><Minus size={18} /></button>
            <output aria-live="polite">{b.guests}</output>
            <button type="button" aria-label={c.f.more} disabled={b.guests >= 8} onClick={() => b.setGuests(b.guests + 1)}><Plus size={18} /></button>
          </div>
        </div>
        <label className="note"><span>{c.f.note}</span><textarea rows={2} placeholder={c.f.notePh} value={b.note} onChange={(e) => b.setNote(e.target.value)} /></label>
        <button type="submit" className="b-wa full" disabled={b.datesInvalid}><WaIcon size={20} /> {c.f.send}</button>
      </form>
    </div>
  );
}
