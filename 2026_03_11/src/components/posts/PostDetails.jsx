import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:5000/api/posts/${id}`),
      fetch(`http://localhost:5000/api/posts/${id}/comments`)
    ])
      .then(([postRes, commentsRes]) => Promise.all([postRes.json(), commentsRes.json()]))
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Błąd:', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    fetch(`http://localhost:5000/api/posts/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newComment })
    })
      .then(response => response.json())
      .then(() => {
        setNewComment('');
        return fetch(`http://localhost:5000/api/posts/${id}/comments`);
      })
      .then(response => response.json())
      .then(commentsData => {
        setComments(commentsData);
        setSubmitting(false);
      })
      .catch(error => {
        console.error('Błąd dodawania:', error);
        setSubmitting(false);
      });
  };

  if (loading) return <div>Ładowanie...</div>;
  if (!post) return <div>Post nie istnieje</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <h3>Autor: {post.author}</h3>
      <p>{post.contents}</p>
      
      <h2>Komentarze ({comments.length})</h2>
      
      <form onSubmit={handleAddComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Dodaj komentarz..."
          rows="3"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Dodawanie...' : 'Dodaj komentarz'}
        </button>
      </form>
      
      {comments.map(comment => (
        <div key={comment.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <strong>{comment.name}</strong> ({comment.email})
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default PostDetails;