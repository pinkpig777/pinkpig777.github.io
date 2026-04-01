import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, MoonStar, Sparkles, SunMedium, X } from 'lucide-react';
import { cn } from '../utils/cn';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [openLocationKey, setOpenLocationKey] = useState<string | null>(null);
  const location = useLocation();
  const isBlog = location.pathname.startsWith('/blog');
  const isOpen = openLocationKey === location.key;

  const toggleMenu = () => {
    setOpenLocationKey((current) =>
      current === location.key ? null : location.key,
    );
  };

  const closeMenu = () => {
    setOpenLocationKey(null);
  };

  const isActive = (href: string) =>
    href === '/blog'
      ? isBlog
      : location.pathname === href;

  return (
    <header className="sticky top-0 z-50 pt-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'surface px-3 py-3 sm:px-4 transition-[border-radius] duration-200',
            isOpen ? 'rounded-[32px] lg:rounded-full' : 'rounded-full',
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1.5 transition hover:bg-zinc-950/[0.04] dark:hover:bg-white/[0.06]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">
                  Charlie Chiu
                </p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  AI + Full-Stack Engineer
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive(item.href)
                      ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                      : 'text-zinc-500 hover:bg-zinc-950/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-white',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white"
              >
                {theme === 'dark' ? (
                  <SunMedium className="h-4 w-4" />
                ) : (
                  <MoonStar className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 lg:hidden dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-3 grid gap-2 border-t border-zinc-200/80 pt-3 lg:hidden dark:border-white/10"
              >
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMenu}
                    className={cn(
                      'rounded-2xl px-4 py-3 text-sm font-medium transition',
                      isActive(item.href)
                        ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                        : 'text-zinc-600 hover:bg-zinc-950/[0.04] hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
