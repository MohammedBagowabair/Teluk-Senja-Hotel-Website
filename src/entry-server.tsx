import { renderToString } from 'react-dom/server';
import App from './App';
import { LangProvider } from '@/lib/lang';
import { META } from '@/content';

export function render() {
  return renderToString(<LangProvider meta={META}><App /></LangProvider>);
}
