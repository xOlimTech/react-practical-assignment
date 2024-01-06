// Modal.js
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createPost} from '../actions/postActions';

const Modal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSave = async () => {
        const post = {title: title, username: currentUser};
        await dispatch(createPost(post));
        onClose();
    };

    return (
        <div style={{display: isOpen ? 'block' : 'none'}}>
            <div>
                <label htmlFor="postTitle">Title: </label>
                <input
                    type="text"
                    id="postTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Modal;
