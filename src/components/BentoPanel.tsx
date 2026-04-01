import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '../utils/cn';

type BentoPanelProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export default function BentoPanel<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: BentoPanelProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component
      className={cn(
        'surface rounded-[28px] p-6 sm:p-7',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
