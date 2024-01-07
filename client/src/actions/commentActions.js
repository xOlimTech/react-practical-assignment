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
