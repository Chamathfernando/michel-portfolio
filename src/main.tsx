import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LayoutProvider } from './context/LayoutProvider';
import './styles/base.css';
import './styles/desktop.css';
import './styles/mobile.css';
import './styles/reveal.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </StrictMode>,
);
