import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/bodoni-moda/wght-italic.css';
import '@fontsource-variable/bodoni-moda/wght.css';
import '@fontsource-variable/outfit';
import './index.css';
import App from './App';
import { LangProvider } from '@/lib/lang';
import { META } from '@/content';

const el = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <LangProvider meta={META}>
      <App />
    </LangProvider>
  </StrictMode>
);
// The HTML is prerendered in English. Hydrate it; for ?lang=id render fresh to avoid a mismatch.
if (el.hasChildNodes() && new URLSearchParams(location.search).get('lang') !== 'id') hydrateRoot(el, tree);
else { el.textContent = ''; createRoot(el).render(tree); }
