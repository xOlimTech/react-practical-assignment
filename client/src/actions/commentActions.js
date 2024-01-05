// commentActions.js
// ... предыдущий код ...

import {DELETE_COMMENT, DISLIKE_COMMENT, EDIT_COMMENT, LIKE_COMMENT} from "../services/actionTypes";

export const editComment = (commentId, commentData) => async (dispatch, getState) => {
    const { user } = getState();
    try {
        const response = await api.editComment(commentId, commentData);
        dispatch({ type: EDIT_COMMENT, payload: response });
    } catch (error) {
        console.error('Error editing comment:', error);
    }
};

export const deleteCommentAction = (commentId) => async (dispatch, getState) => {
    const { user } = getState();
    try {
        const response = await api.deleteComment(commentId);
        dispatch({ type: DELETE_COMMENT, payload: response });
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};

export const likeCommentAction = (commentId) => async (dispatch) => {
    try {
        const response = await api.likeComment(commentId);
        dispatch({ type: LIKE_COMMENT, payload: response });
    } catch (error) {
        console.error('Error liking comment:', error);
    }
};

export const dislikeCommentAction = (commentId) => async (dispatch) => {
    try {
        const response = await api.dislikeComment(commentId);
        dispatch({ type: DISLIKE_COMMENT, payload: response });
    } catch (error) {
        console.error('Error disliking comment:', error);
    }
};

// ... остальной код ...
