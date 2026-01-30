import { Link, useParams } from 'react-router-dom';
import { blogPostBySlug } from '../generated/blog';

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

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? blogPostBySlug[slug] : undefined;

  if (!post) {
    return (
      <section className="blog-section">
        <h1>Post not found</h1>
        <p>That article doesn’t exist yet.</p>
        <Link className="blog-back" to="/blog">
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <article className="blog-post">
      <Link className="blog-back" to="/blog">
        ← Back to blog
      </Link>
      <h1>{post.title}</h1>
      <div className="blog-post__meta">
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
      <div
        className="blog-post__content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
