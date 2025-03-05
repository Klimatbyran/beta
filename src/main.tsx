import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

// Import pages and components
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { MunicipalitiesPage } from './pages/MunicipalitiesPage';
import { MunicipalityDetailPage } from './pages/MunicipalityDetailPage';
import { AboutPage } from './pages/AboutPage';
import { MethodsPage } from './pages/MethodsPage';
import { InsightsPage } from './pages/InsightsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/companies",
        element: <CompaniesPage />,
      },
      {
        path: "/companies/:id",
        element: <CompanyDetailPage />,
      },
      {
        path: "/companies/:id/:slug",
        element: <CompanyDetailPage />,
      },
      {
        path: "/foretag/:slug-:id",
        element: <CompanyDetailPage />,
      },
      {
        path: "/municipalities",
        element: <MunicipalitiesPage />,
      },
      {
        path: "/municipalities/:id",
        element: <MunicipalityDetailPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/methodology",
        element: <MethodsPage />,
      },
      {
        path: "/insights",
        element: <InsightsPage />,
      },
      {
        path: "/insights/:slug",
        element: <InsightsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // Data stays fresh for 2 minutes
      cacheTime: 1000 * 60 * 5, // Cache persists for 5 minutes
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      retry: 2, // Retry failed requests twice
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
