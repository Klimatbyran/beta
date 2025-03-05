import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { MunicipalitiesPage } from './pages/MunicipalitiesPage';
import { MunicipalityDetailPage } from './pages/MunicipalityDetailPage';
import { AboutPage } from './pages/AboutPage';
import { MethodsPage } from './pages/MethodsPage';
import { InsightsPage } from './pages/InsightsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useLanguage } from './components/LanguageProvider';
import { useEffect } from 'react';

export function AppRoutes() {
  const { currentLanguage } = useLanguage();
  
  // Define base path based on language
  const basePath = currentLanguage === 'sv' ? '' : '/en';
  
  // Log for debugging
  useEffect(() => {
    console.log(`Current language: ${currentLanguage}, base path: ${basePath}`);
  }, [currentLanguage, basePath]);

  return (
    <Routes>
      {/* Root path - matches both / and /en */}
      <Route path={`${basePath}`} element={<LandingPage />} />
      <Route path={`${basePath}/`} element={<LandingPage />} />
      
      {/* Companies routes */}
      <Route path={`${basePath}/companies`} element={<CompaniesPage />} />
      <Route path={`${basePath}/companies/:id`} element={<CompanyDetailPage />} />
      <Route path={`${basePath}/companies/:id/:slug`} element={<CompanyDetailPage />} />
      
      {/* Special Swedish route for companies */}
      {currentLanguage === 'sv' && (
        <Route path="/foretag/:slug-:id" element={<CompanyDetailPage />} />
      )}
      
      {/* Municipalities routes */}
      <Route path={`${basePath}/municipalities`} element={<MunicipalitiesPage />} />
      <Route path={`${basePath}/municipalities/:id`} element={<MunicipalityDetailPage />} />
      
      {/* Other pages */}
      <Route path={`${basePath}/about`} element={<AboutPage />} />
      <Route path={`${basePath}/methodology`} element={<MethodsPage />} />
      <Route path={`${basePath}/insights`} element={<InsightsPage />} />
      <Route path={`${basePath}/insights/:slug`} element={<InsightsPage />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
