import { Link, useParams } from 'react-router-dom';
import { blogPostBySlug } from '../generated/blog';
import { formatBlogDate } from '../utils/blog';
import BentoPanel from '../components/BentoPanel';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? blogPostBySlug[slug] : undefined;

  if (!post) {
    return (
      <section className="mx-auto w-full max-w-4xl">
        <BentoPanel className="rounded-[32px] p-8">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
            Post not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            That article doesn&apos;t exist yet.
          </p>
          <Link
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
            to="/blog"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </BentoPanel>
      </section>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
      <Link
        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        to="/blog"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <article className="surface rounded-[36px] p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
          <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span>{post.tags.length > 0 ? `${post.tags.length} tags` : 'General note'}</span>
        </div>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] text-zinc-950 sm:text-5xl dark:text-white">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                className="rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                key={`${post.slug}-${tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          className="blog-content mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </div>
  );
}
