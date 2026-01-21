import { useState, useEffect } from 'react';
import type { Post } from 'src/api/posts';
import { fetchAllPosts } from '../api/posts';

export function PostCrud() {
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = async () => {
    const data = await fetchAllPosts();
    setPosts(data);
  };


  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <section className="section">
        <h2>Recent Posts</h2>
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-content">
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </p>
              <ul className="post-meta">
                <li>
                  <span className="view-count">{post.view_count}</span> views
                </li>
                <li>
                  {post.published ? '✓ Published' : '✎ Draft'}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

}
