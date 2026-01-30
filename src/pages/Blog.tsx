import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../generated/blog';

const parseLocalDate = (value: string) => {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const formatDate = (value: string) => {
  const date = parseLocalDate(value);
  if (!date || Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
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
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function Blog() {
  return (
    <motion.section className="blog-section" variants={pageVariants} initial="hidden" animate="show">
      <motion.h1 variants={itemVariants}>Blog</motion.h1>
      <motion.p className="blog-subtext" variants={itemVariants}>
        Weekly notes, projects, and experiments.
      </motion.p>

      {blogPosts.length === 0 ? (
        <motion.p variants={itemVariants}>New posts are coming soon.</motion.p>
      ) : (
        <motion.div className="blog-list" variants={listVariants}>
          {blogPosts.map((post) => (
            <motion.article className="blog-card" key={post.slug} variants={cardVariants}>
              <div className="blog-card__meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.tags.length > 0 && (
                  <div className="blog-tags">
                    {post.tags.map((tag) => (
                      <span className="blog-tag" key={`${post.slug}-${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.summary && <p>{post.summary}</p>}
              <Link className="blog-readmore" to={`/blog/${post.slug}`}>
                Read the article
              </Link>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
