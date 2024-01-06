// Post.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    // editPost,
    deletePostAction,
    likePostAction,
    dislikePostAction,
} from '../actions/postActions';

const Post = ({ post }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleEdit = () => {
        // Implement edit logic here
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

    return (
        <div>
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
        </div>
    );
};

export default Post;
