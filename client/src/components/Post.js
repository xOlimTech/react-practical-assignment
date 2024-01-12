import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    editPost,
    deletePostAction,
    likePost,
    dislikePost,
} from '../actions/postActions';
import {
    createComment,
    editComment,
    deleteComment,
} from '../actions/commentActions';
import {MAIN_URL} from '../services/const';

const Post = ({post}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [file, setFile] = useState(null);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(post.title);
        setFile(null);
    };

    const handleSaveEdit = async () => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append('picture', file);
                const pictureResponse = await fetch(
                    `${MAIN_URL}post/${post.id}/picture`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );
                if (!pictureResponse.ok) {
                    throw new Error(`Failed to upload picture: ${pictureResponse.status}`)
                }
            }
            const response = await fetch(`${MAIN_URL}post/${post.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
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

    const like = () => {
        const updatedLikes = post.likes.includes(currentUser)
            ? post.likes.filter(author => author !== currentUser)
            : [...post.likes, currentUser];

        const updatedDislikes = post.dislikes.includes(currentUser)
            ? post.dislikes.filter(author => author !== currentUser)
            : [...post.dislikes];

        dispatch(editPost(post.id, {likes: updatedLikes, dislikes: updatedDislikes}));
    };

    const dislike = () => {
        const updatedLikes = post.likes.includes(currentUser)
            ? post.likes.filter(author => author !== currentUser)
            : [...post.likes];

        const updatedDislikes = post.dislikes.includes(currentUser)
            ? post.dislikes.filter(author => author !== currentUser)
            : [...post.dislikes, currentUser];

        dispatch(editPost(post.id, {likes: updatedLikes, dislikes: updatedDislikes}));
    };

    const handleLike = () => {
        if (post.likes.includes(currentUser)) {
            dislike();
        } else {
            like();
        }
    };

    const handleDislike = () => {
        if (post.dislikes.includes(currentUser)) {
            like();
        } else {
            dislike();
        }
    };


    const handleComment = () => {
        const commentData = {
            text: commentText,
            postId: post.id,
            username: currentUser,
        };
        dispatch(createComment(commentData));
        setCommentText('');
    };

    const handleEditComment = (commentId, commentText) => {
        setEditingCommentId(commentId);
        setCommentText(commentText);
    };

    const handleSaveEditComment = async () => {
        try {
            const response = await fetch(`${MAIN_URL}comment/${editingCommentId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
                    <input type="file" onChange={handleFileChange}/>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>{post.title}</h3>
                    {post.imageSrc && <img src={post.imageSrc} alt="Post"/>}
                    <p>Author: {post.username}</p>
                    <button className="btn btn-outline-success btn-sm ml-2"
                            onClick={handleLike}>Like {post.likes.length}</button>
                    <button className="btn btn-outline-danger btn-sm ml-2"
                            onClick={handleDislike}>Dislike {post.dislikes.length}</button>
                    {currentUser === post.username && (
                        <>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                    <div>
                        <h4>Comments:</h4>
                        {post.comments &&
                            post.comments.map((comment) => (
                                <div key={comment.id}>
                                    <p>
                                        {comment.username}: {comment.text}
                                    </p>
                                    {currentUser === comment.username && (
                                        <>
                                            <button className="btn btn-outline-info btn-sm ml-2" onClick={() =>
                                                handleEditComment(comment.id, comment.text)
                                            }
                                            > Edit comment
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm ml-2"
                                                    onClick={() => handleDeleteComment(comment.id)}
                                            > Delete comment
                                            </button>
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
                                <button onClick={handleSaveEditComment}>Save</button>
                                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                            </>
                        ) : (
                            <button className="btn btn-warning ml-2 mt-2" onClick={handleComment}>Add comment</button>
                        )}
                    </div>
                    <hr/>
                </>
            )}
        </div>
    );
};

export default Post;
