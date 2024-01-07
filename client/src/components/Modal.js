// Modal.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, uploadPostPicture } from '../actions/postActions';

const Modal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSave = async () => {
        try {
            const post = { title: title, username: currentUser };
            const createdPost = await dispatch(createPost(post));
            const postId = createdPost.payload.id;

            if (file) {
                const formData = new FormData();
                formData.append('picture', file);
                await dispatch(uploadPostPicture({ postId, formData }));
            }
            onClose();
        } catch (error) {
            console.error('Error when creating a post:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
                <label htmlFor="postTitle">Title: </label>
                <input
                    type="text"
                    id="postTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="postPicture">Picture: </label>
                <input
                    type="file"
                    id="postPicture"
                    onChange={handleFileChange}
                />
            </div>

            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Modal;

