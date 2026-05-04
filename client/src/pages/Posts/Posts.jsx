import { useState } from 'react';
import { useResource } from '../../hooks/useResource';
import { useUser } from '../../context/UserContext';
import DataViewer from '../../components/DataViewer/DataViewer';
import PostCard from "../../components/PostCard/PostCard";
import './Posts.css';

export default function Posts() {
    const { currentUser } = useUser();
    const { data: posts, add, remove, update, loading, error } = useResource('posts');
    const { data: users } = useResource('users');

    const [addPostInput, setAddPostInput] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [showMyPosts, setShowMyPosts] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.body) return;
        await add({ ...newPost, userId: currentUser.id });
        setNewPost({ title: '', body: '' });
        setAddPostInput(false);
    };

    const displayPosts = showMyPosts
        ? posts.filter(post => post.userId == currentUser?.id)
        : posts;

    return (
        <div className="posts-page">
            <div className="posts-header">
                <div className="posts-header-actions">
                    <button
                        className={`add-post-btn ${addPostInput ? 'cancel' : ''}`}
                        onClick={() => setAddPostInput(!addPostInput)}
                    >
                        {addPostInput ? 'Cancel' : 'Add New Post'}
                    </button>
                    <button
                        className={`my-posts-btn ${showMyPosts ? 'active' : ''}`}
                        onClick={() => setShowMyPosts(!showMyPosts)}
                    >
                        {showMyPosts ? 'All Posts' : 'My Posts'}
                    </button>
                </div>

                {addPostInput && (
                    <form className="add-post-form" onSubmit={handleAdd}>
                        <input
                            type="text"
                            placeholder="Title..."
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Content..."
                            value={newPost.body}
                            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                        />
                        <button type="submit">Save Post</button>
                    </form>
                )}
            </div>

            <DataViewer loading={loading} error={error} data={displayPosts}>
                <div className="posts-list">
                    {displayPosts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            deletePost={() => remove(post.id)}
                            updatePost={(updatedFields) => update(post.id, updatedFields)}
                            author={users?.find(u => u.id == post.userId)}
                        />
                    ))}
                </div>
            </DataViewer>
        </div>
    );
}