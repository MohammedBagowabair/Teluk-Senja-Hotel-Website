import { LANGS, useLang, type Lang } from '@/lib/lang';

/** Segmented EN / ID switch: two real buttons, aria-pressed, 44px targets. */
export function LangSwitch({ className = '', label }: { className?: string; label: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label={label} className={`lang-switch ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={lang === l.code}
          title={l.label}
          onClick={() => setLang(l.code as Lang)}
        >
          <span aria-hidden="true">{l.short}</span>
          <span className="sr-only">{l.label}</span>
        </button>
      ))}
    </div>
  );
}
