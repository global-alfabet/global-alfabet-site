import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import NotFound from "./NotFound.jsx";
import { postBySlug, formatDate } from "../lib/blog.js";

export default function Article() {
  const { slug } = useParams();
  const post = postBySlug[slug];
  if (!post) return <NotFound />;
  return (
    <article className="article">
      <div className="container narrow">
        <Link className="text-link back" to="/blog">
          <Icon name="chevron" size={16} stroke={2.2} className="flip" /> Blog
        </Link>
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        {post.subtitle && <p className="lead">{post.subtitle}</p>}
        <p className="meta">
          {post.author} · {formatDate(post.date)}
        </p>
      </div>
      {post.cover && (
        <div className="container">
          <img className="article-cover" src={post.cover} alt={post.coverAlt || ""} />
        </div>
      )}
      <div className="container narrow prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
