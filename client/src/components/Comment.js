// Comment.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../actions/commentActions';

const CommentForm = ({ postId, username }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const commentData = {
            text,
            postId,
            username,
        };

        dispatch(createComment(commentData));

        // Опционально: очистите форму после отправки
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
      <textarea
          placeholder="Введите комментарий"
          value={text}
          onChange={(e) => setText(e.target.value)}
      />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default CommentForm;
