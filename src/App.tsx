import { ToastProvider } from "./contexts/ToastContext";
import { AppRoutes } from "./routes";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <ToastProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </ToastProvider>
  );
}

export default App;