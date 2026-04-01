import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                setPost(data);
                return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            })
            .then(response => response.json())
            .then(userData => {
                setUser(userData);
                return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
            })
            .then(response => response.json())
            .then(commentsData => {
                setComments(commentsData);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Ładowanie...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            {user && (
                <div>
                    <h3>Autor: {user.name}</h3>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <p>{post.body}</p>

            <h2>Komentarze</h2>
            {comments.map(comment => (
                <div key={comment.id}>
                    <strong>{comment.name}</strong> ({comment.email})
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostDetails;