import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function PostDetails() {
    const { id } = useParams();

    const { data: post, isLoading: postLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
                res.json()
            ),
    });

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user', post?.userId],
        enabled: !!post?.userId,
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(
                (res) => res.json()
            ),
    });

    const { data: comments, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', id],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(
                (res) => res.json()
            ),
    });

    if (postLoading) return <div>Ładowanie posta...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            {!userLoading && user && (
                <div>
                    <h3>Autor: {user.name}</h3>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <p>{post.body}</p>

            <h2>Komentarze</h2>
            {commentsLoading && <div>Ładowanie komentarzy...</div>}
            {comments?.map((comment) => (
                <div key={comment.id}>
                    <strong>{comment.name}</strong> ({comment.email})
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostDetails;