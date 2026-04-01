import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export type SegmentedControlOption<T extends string> = {
  value: T;
  label: string;
  icon?: LucideIcon;
};

type SegmentedControlProps<T extends string> = {
  id: string;
  options: Array<SegmentedControlOption<T>>;
  value: T;
  onChange: (next: T) => void;
  className?: string;
};

export default function SegmentedControl<T extends string>({
  id,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={id}
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-full border border-zinc-200/80 bg-white/70 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]',
        className,
      )}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'text-zinc-950 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`segmented-${id}`}
                className="absolute inset-0 rounded-full bg-zinc-950/[0.06] ring-1 ring-zinc-950/6 dark:bg-white/[0.08] dark:ring-white/10"
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              <span>{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
