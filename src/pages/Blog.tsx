import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../generated/blog';
import { formatBlogDate } from '../utils/blog';
import BentoPanel from '../components/BentoPanel';
import SectionHeading from '../components/SectionHeading';
import { ArrowRight } from 'lucide-react';

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Blog() {
  return (
    <motion.section className="w-full space-y-6 lg:space-y-8" variants={pageVariants} initial="hidden" animate="show">
      <SectionHeading
        eyebrow="Writing"
        title="Weekly notes, experiments, and systems thinking."
        description="A place for technical reflections, side-project logs, and things worth documenting after the work ships."
      />

      {blogPosts.length === 0 ? (
        <motion.div variants={itemVariants}>
          <BentoPanel className="rounded-[32px] p-8">
            <p className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
              New posts are coming soon.
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              The writing section is live, but I&apos;m still curating what should go public first.
            </p>
          </BentoPanel>
        </motion.div>
      ) : (
        <motion.div className="grid gap-5" variants={listVariants}>
          {blogPosts.map((post) => (
            <motion.article key={post.slug} variants={cardVariants}>
              <BentoPanel className="rounded-[30px] p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                  <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span>{post.tags.length > 0 ? post.tags[0] : 'General note'}</span>
                </div>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
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
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.summary && (
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {post.summary}
                  </p>
                )}
                <Link
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                  to={`/blog/${post.slug}`}
                >
                  Read the article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </BentoPanel>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
