import { Route, Routes, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { CompaniesPage } from "./pages/CompaniesPage";
import { CompanyDetailPage } from "./pages/CompanyDetailPage";
import { MunicipalitiesPage } from "./pages/MunicipalitiesPage";
import { MunicipalityDetailPage } from "./pages/MunicipalityDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { MethodsPage } from "./pages/MethodsPage";
import { InsightsPage } from "./pages/InsightsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ErrorPage } from "./pages/ErrorPage";
import { useLanguage } from "./components/LanguageProvider";
import { useEffect } from "react";

export function AppRoutes() {
  const { currentLanguage } = useLanguage();

  // Define base path based on language
  const basePath = currentLanguage === "sv" ? "/sv" : "/en";

  // Log for debugging
  useEffect(() => {
    console.log(`Current language: ${currentLanguage}, base path: ${basePath}`);
  }, [currentLanguage, basePath]);

  return (
    <Routes>
      {/* Redirect root path to Swedish version */}
      <Route path="/" element={<Navigate to="/sv/" replace />} />

      {/* Root path - matches both /sv and /en */}
      <Route path={`${basePath}`} element={<LandingPage />} />
      <Route path={`${basePath}/`} element={<LandingPage />} />

      {/* Companies routes */}
      <Route path={`${basePath}/companies`} element={<CompaniesPage />} />
      <Route
        path={`${basePath}/companies/:id`}
        element={<CompanyDetailPage />}
      />
      <Route
        path={`${basePath}/companies/:id/:slug`}
        element={<CompanyDetailPage />}
      />

      <Route path="/foretag/:slug-:id" element={<CompanyDetailPage />} />

      {/* Municipalities routes */}
      <Route
        path={`${basePath}/municipalities`}
        element={<MunicipalitiesPage />}
      />
      <Route
        path={`${basePath}/municipalities/:id`}
        element={<MunicipalityDetailPage />}
      />

      {/* Other pages */}
      <Route path={`${basePath}/about`} element={<AboutPage />} />
      <Route path={`${basePath}/methodology`} element={<MethodsPage />} />
      <Route path={`${basePath}/insights`} element={<InsightsPage />} />
      <Route path={`${basePath}/insights/:slug`} element={<InsightsPage />} />

      {/* Error pages */}
      <Route path={`${basePath}/error/:code`} element={<ErrorPage />} />

      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
