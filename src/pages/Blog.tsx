import { Link } from 'react-router-dom';
import { blogPosts } from '../generated/blog';

const formatDate = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function Blog() {
  return (
    <section className="blog-section">
      <h1>Blog</h1>
      <p className="blog-subtext">Weekly notes, projects, and experiments.</p>

      {blogPosts.length === 0 ? (
        <p>New posts are coming soon.</p>
      ) : (
        <div className="blog-list">
          {blogPosts.map((post) => (
            <article className="blog-card" key={post.slug}>
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
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
