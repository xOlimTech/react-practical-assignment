import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost, deletePostAction, likePostAction, dislikePostAction } from '../actions/postActions';
import { createComment, editComment, deleteComment } from '../actions/commentActions';
import { MAIN_URL } from '../services/const';

const Post = ({ post }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(post.title);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(MAIN_URL + `post/${post.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editedTitle,
                    likes: post.likes,
                    dislikes: post.dislikes,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to edit post: ${response.status}`);
            }
            const updatedPost = await response.json();
            dispatch(editPost(updatedPost.result));
            setIsEditing(false);
        } catch (error) {
            console.error('Error when editing a post:', error);
        }
    };

    const handleDelete = () => {
        dispatch(deletePostAction(post.id));
    };

    const handleLike = () => {
        dispatch(likePostAction(post.id));
    };

    const handleDislike = () => {
        dispatch(dislikePostAction(post.id));
    };

    const handleComment = () => {
        // Создайте новый комментарий и отправьте на сервер
        const commentData = {
            text: commentText,
            postId: post.id,
            username: currentUser,
        };

        dispatch(createComment(commentData));

        // Очистите поле ввода комментария
        setCommentText('');
    };

    const handleEditComment = (commentId, commentText) => {
        // Переключение в режим редактирования комментария
        setEditingCommentId(commentId);
        setCommentText(commentText);
    };

    const handleSaveEditComment = async () => {
        try {
            const response = await fetch(MAIN_URL + `comment/${editingCommentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: commentText,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to edit comment: ${response.status}`);
            }
            const updatedComment = await response.json();
            dispatch(editComment(updatedComment.result));
            setEditingCommentId(null);
            setCommentText('');
        } catch (error) {
            console.error('Error when editing a comment:', error);
        }
    };

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId));
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>{post.title}</h3>
                    <p>Author: {post.username}</p>
                    <p>Likes: {post.likes.length}</p>
                    <p>Dislikes: {post.dislikes.length}</p>
                    <button onClick={handleLike}>Like</button>
                    <button onClick={handleDislike}>Dislike</button>
                    {currentUser === post.username && (
                        <>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                    <div>
                        <h4>Comments:</h4>
                        {post.comments && post.comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.username}: {comment.text}</p>
                                {currentUser === comment.username && (
                                    <>
                                        <button onClick={() => handleEditComment(comment.id, comment.text)}>Edit</button>
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        ))}
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        {editingCommentId ? (
                            <>
                                <button onClick={handleSaveEditComment}>Save Edit</button>
                                <button onClick={() => setEditingCommentId(null)}>Cancel Edit</button>
                            </>
                        ) : (
                            <button onClick={handleComment}>Comment</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
