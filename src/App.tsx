import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { CompaniesPage } from "./pages/CompaniesPage";
import { CompanyDetailPage } from "./pages/CompanyDetailPage";
import { MunicipalitiesPage } from "./pages/MunicipalitiesPage";
import { MunicipalityDetailPage } from "./pages/MunicipalityDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { InsightsPage } from "./pages/InsightsPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { EmissionsTestPage } from "./pages/EmissionsTestPage";
import { MethodsPage } from "./pages/MethodsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import AuthProvider from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthCallback } from "./pages/AuthCallback";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="auth/callback" element={<AuthCallback />} />
              <Route path="companies" element={<CompaniesPage />} />
              <Route path="companies/:id" element={<CompanyDetailPage />} />
              <Route path="municipalities" element={<MunicipalitiesPage />} />
              <Route
                path="municipalities/:id"
                element={<MunicipalityDetailPage />}
              />
              <Route path="about" element={<AboutPage />} />
              <Route path="insights" element={<InsightsPage />} />
              <Route path="insights/:id" element={<BlogDetailPage />} />
              <Route path="methodology" element={<MethodsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="emissions-test" element={<EmissionsTestPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
