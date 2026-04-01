import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

const thumbnailExtensions = ['jpg', 'jpeg', 'png', 'webp'] as const;

const getThumbnailCandidates = (projectId: string) => {
  const basenames = Array.from(
    new Set([projectId, projectId.toLowerCase(), projectId.toUpperCase()]),
  );
  const extensions = Array.from(
    new Set([
      ...thumbnailExtensions,
      ...thumbnailExtensions.map((extension) => extension.toUpperCase()),
    ]),
  );

  return basenames.flatMap((basename) =>
    extensions.map((extension) => `/assets/projects/${basename}.${extension}`),
  );
};

type ProjectThumbnailProps = {
  projectId: string;
  projectTitle: string;
  projectCategory: string;
  className?: string;
};

export default function ProjectThumbnail({
  projectId,
  projectTitle,
  projectCategory,
  className,
}: ProjectThumbnailProps) {
  const [thumbnailState, setThumbnailState] = useState({
    projectId,
    candidateIndex: 0,
  });
  const thumbnailCandidates = getThumbnailCandidates(projectId);
  const candidateIndex =
    thumbnailState.projectId === projectId ? thumbnailState.candidateIndex : 0;
  const currentThumbnail = thumbnailCandidates[candidateIndex];
  const hasThumbnail = candidateIndex < thumbnailCandidates.length;
  const placeholderMark = projectId
    .split('-')
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  const handleError = () => {
    setThumbnailState((current) => ({
      projectId,
      candidateIndex:
        current.projectId === projectId ? current.candidateIndex + 1 : 1,
    }));
  };

  return (
    <div
      className={cn(
        'relative aspect-video overflow-hidden rounded-[24px] border border-zinc-200/80 bg-zinc-950/[0.04] dark:border-white/10 dark:bg-white/[0.03]',
        className,
      )}
    >
      {hasThumbnail ? (
        <>
          <img
            src={currentThumbnail}
            alt={`${projectTitle} thumbnail`}
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
            onError={handleError}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
        </>
      ) : (
        <div className="flex h-full w-full flex-col justify-between bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_42%),linear-gradient(140deg,rgba(24,24,27,0.12),rgba(255,255,255,0.2))] p-5 dark:bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_42%),linear-gradient(140deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-700 backdrop-blur-md dark:bg-white/[0.08] dark:text-zinc-200">
            <Sparkles className="h-3.5 w-3.5" />
            {projectCategory}
          </span>
          <div className="flex items-end justify-between gap-4">
            <p className="max-w-[12rem] text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Screenshot coming soon
            </p>
            <span className="text-5xl font-semibold tracking-[-0.08em] text-zinc-900/80 dark:text-white/80">
              {placeholderMark}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
