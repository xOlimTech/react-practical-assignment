// Modal.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../actions/postActions';

const Modal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    // Используем useSelector для получения данных из глобального состояния
    const username = useSelector(state => state.user.username || 'admin');

    const handleSave = async () => {
        // Формируем postData с использованием title, text и username
        const post = { title, ...(username && { username }) };
        // Вызываем action creator, который сам по себе возвращает асинхронную функцию
        await dispatch(createPost(post));
        onClose();
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
                <label htmlFor="postText">Text: </label>
                <textarea
                    id="postText"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Modal;
