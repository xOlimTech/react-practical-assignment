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

export const likeComment = (commentId) => async (dispatch, getState) => {
    try {
        const { user } = getState(); // Предположим, что у вас есть редюсер user, где хранится информация о текущем пользователе
        const response = await editComment(commentId, {
            likes: user.currentUser ? [user.currentUser] : [],
        });
        dispatch({ type: EDIT_COMMENT, payload: response });
        // Добавьте необходимые действия после успешного лайка
    } catch (error) {
        console.error('Error liking comment:', error);
    }
};

export const dislikeComment = (commentId) => async (dispatch, getState) => {
    try {
        const { user } = getState(); // Предположим, что у вас есть редюсер user, где хранится информация о текущем пользователе
        const response = await editComment(commentId, {
            dislikes: user.currentUser ? [user.currentUser] : [],
        });
        dispatch({ type: EDIT_COMMENT, payload: response });
        // Добавьте необходимые действия после успешного дизлайка
    } catch (error) {
        console.error('Error disliking comment:', error);
    }
};
//
// // Проверим и скорректируем deleteCommentAction
// export const deleteCommentAction = (commentId) => async (dispatch) => {
//     try {
//         const response = await api.deleteComment(commentId); // Предположим, что есть метод для удаления комментария
//         dispatch({ type: DELETE_COMMENT, payload: response });
//     } catch (error) {
//         console.error('Error deleting comment:', error);
//     }
// };