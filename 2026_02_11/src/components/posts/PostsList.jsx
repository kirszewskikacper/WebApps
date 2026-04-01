import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function PostsList() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
                res.json()
            ),
    });

    if (isLoading) return <div>Ładowanie...</div>;
    if (error) return <div>Błąd: {error.message}</div>;

    return (
        <div>
            <h1>Lista postów</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p>{post.body.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}

export default PostsList;