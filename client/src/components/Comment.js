import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createComment} from '../actions/commentActions';

const CommentForm = ({postId, username}) => {
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
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Enter comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
