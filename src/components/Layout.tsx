import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { cn } from '../utils/cn';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-[-8rem] h-80 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_60%)]" />
        <div className="absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-indigo-500/12 blur-3xl dark:bg-indigo-500/18" />
        <div className="absolute left-[-8rem] top-56 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(113,113,122,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,113,122,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 dark:opacity-20" />
      </div>
      <Header />
      <main
        className={cn(
          'mx-auto flex w-full max-w-7xl flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-8',
          isHome ? 'lg:pt-10' : 'lg:pt-12',
        )}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
