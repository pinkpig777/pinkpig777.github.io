import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BentoPanel from '../components/BentoPanel';

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <BentoPanel className="rounded-[32px] p-8">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          The page you requested does not exist or the link is outdated.
        </p>
        <Link
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
          to="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </BentoPanel>
    </section>
  );
}
