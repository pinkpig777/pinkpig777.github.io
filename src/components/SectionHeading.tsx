import { cn } from '../utils/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={cn(
        'max-w-3xl',
        isCentered && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500 dark:text-emerald-400">
          {eyebrow}
        </p>
      )}
      <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl lg:text-6xl dark:text-white">
        {title}
      </h1>
      {description && (
        <p className="mt-5 text-pretty text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
