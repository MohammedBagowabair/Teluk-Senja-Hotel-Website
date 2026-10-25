import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'id';
export const LANGS: { code: Lang; short: string; label: string }[] = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'id', short: 'ID', label: 'Bahasa Indonesia' },
];

/** English is always the default. Only an explicit ?lang=id in the URL opens Indonesian. */
function initialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  return new URLSearchParams(window.location.search).get('lang') === 'id' ? 'id' : 'en';
}

type Meta = Record<Lang, { title: string; description: string }>;
type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {} });

export function LangProvider({ meta, children }: { meta: Meta; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = 'ltr';
    document.title = meta[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta[lang].description);
    const url = new URL(window.location.href);
    if (lang === 'id') url.searchParams.set('lang', 'id');
    else url.searchParams.delete('lang');
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
  }, [lang, meta]);
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Pick the current-language variant from a { en, id } content object. */
export function useCopy<T>(copy: Record<Lang, T>): T {
  return copy[useLang().lang];
}
