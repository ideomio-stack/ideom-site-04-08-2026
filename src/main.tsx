import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import TermsOfService from './TermsOfService.tsx';
import FreeGuide from './FreeGuide.tsx';
import CaseStudyPage from './CaseStudyPage.tsx';
import Work from './Work.tsx';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<Work />} />
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/free-guide" element={<FreeGuide />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
