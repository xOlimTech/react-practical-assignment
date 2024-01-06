// // commentActions.js
// import {
//     CREATE_COMMENT,
//     EDIT_COMMENT,
//     DELETE_COMMENT,
//     LIKE_COMMENT,
//     DISLIKE_COMMENT,
// } from '../services/actionTypes';

//
// export const likeCommentAction = (commentId) => async (dispatch) => {
//     try {
//         // Здесь вызывайте соответствующий API-метод для лайка комментария
//         const response = await api.likeComment(commentId);
//         dispatch({ type: LIKE_COMMENT, payload: response });
//     } catch (error) {
//         console.error('Error liking comment:', error);
//     }
// };
//
// export const dislikeCommentAction = (commentId) => async (dispatch) => {
//     try {
//         // Здесь вызывайте соответствующий API-метод для дизлайка комментария
//         const response = await api.dislikeComment(commentId);
//         dispatch({ type: DISLIKE_COMMENT, payload: response });
//     } catch (error) {
//         console.error('Error disliking comment:', error);
//     }
// };
// actions/commentActions.js
import axios from 'axios';
import {DELETE_COMMENT, EDIT_COMMENT, MAIN_URL} from '../services/const';
import {fetchPosts} from "./postActions";
import * as api from '../services/api';

export const createComment = (commentData) => async (dispatch) => {
    try {
        const response = await axios.post(MAIN_URL + `comment`, commentData);
        dispatch({
            type: 'CREATE_COMMENT',
            payload: response.data.result,
        });
        dispatch(fetchPosts());
    } catch (error) {
        dispatch({
            type: 'CREATE_COMMENT_FAILURE',
            payload: error.message,
        });
    }
};

export const editComment = (commentId, commentData) => async (dispatch) => {
    try {
        const response = await api.updateComment(commentId, commentData);
        dispatch({ type: EDIT_COMMENT, payload: response });
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error editing comment:', error);
    }
};
export const deleteComment = (commentId) => async (dispatch) => {
    try {
        const response = await api.deleteComment(commentId);
        dispatch({ type: DELETE_COMMENT, payload: response });
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};
