import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Błąd:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>
      <h1>Lista postów</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.contents?.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;