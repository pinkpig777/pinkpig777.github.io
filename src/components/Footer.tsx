import { FolderGit2, Link2, Mail } from 'lucide-react';
import BentoPanel from './BentoPanel';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <BentoPanel className="flex flex-col gap-6 rounded-[28px] px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              Available for impactful product and AI engineering work
            </p>
            <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
              Designing reliable software systems, applied AI products, and polished user experiences.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="mailto:charly729.chiu@gmail.com"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-600 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/10 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/pinkpig777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-600 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/10 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
              aria-label="GitHub"
            >
              <FolderGit2 className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/charliechiu0729/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-600 transition hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/10 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
              aria-label="LinkedIn"
            >
              <Link2 className="h-4 w-4" />
            </a>
          </div>
        </BentoPanel>
        <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          © {year} Charlie Chiu. Built with React, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
