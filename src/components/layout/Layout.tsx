import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-black-3">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}