import { Link } from "react-router-dom";
import { posts, formatDate } from "../lib/blog.js";
import { usePageTitle } from "../lib/usePageTitle.js";

export default function Blog() {
  usePageTitle("Blog", "Company news, product updates and practical guidance from Global Alfabet.");
  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <h1>Blog</h1>
          <p className="lead">Company news, product updates and practical guidance.</p>
        </div>
      </section>
      <section className="section tight-top">
        <div className="container">
          <div className={`post-grid${posts.length === 1 ? " single" : ""}`}>
            {posts.map((post) => (
              <Link className="post-card" to={`/blog/${post.slug}`} key={post.slug}>
                {post.cover && <img src={post.cover} alt="" />}
                <div>
                  <p className="eyebrow">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p className="muted">{post.summary}</p>
                  <p className="meta">{formatDate(post.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
