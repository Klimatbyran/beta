import AuthProvider from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthCallback } from "./pages/AuthCallback";
import { UnauthorizedErrorPage } from './pages/error/UnauthorizedErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import { CompanyEditPage } from './pages/CompanyEditPage';
import { AppRoutes } from "./routes";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route element={<ProtectedRoute/>}>
                  <Route path="companies/:id/edit" element={<CompanyEditPage/>}/>
              </Route>             
              <Route path="403" element={<UnauthorizedErrorPage/>} />
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
        <AppRoutes />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;