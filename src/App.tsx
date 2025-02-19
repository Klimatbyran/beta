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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
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
          <Route path="emissions-test" element={<EmissionsTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
