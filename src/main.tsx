import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import TermsOfService from './TermsOfService.tsx';
import FreeGuide from './FreeGuide.tsx';
import './index.css';

function ScrollToTop() {
  const { pathname } = window.location;
  if (pathname !== '/') {
    window.scrollTo(0, 0);
  }
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/free-guide" element={<FreeGuide />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
