import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black-3">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
