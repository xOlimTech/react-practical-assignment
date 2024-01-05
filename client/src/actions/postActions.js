// postActions.js
import {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    LIKE_POST,
    DISLIKE_POST,
    FETCH_POSTS, // Добавлен экспорт FETCH_POSTS
} from '../services/actionTypes';
import * as api from '../services/api';

export const createPost = (postData) => async (dispatch, getState) => {
    const { user } = getState();
    try {
        const response = await api.createPost(postData);
        dispatch({ type: CREATE_POST, payload: response });
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

export const editPost = (postId, postData) => async (dispatch, getState) => {
    const { user } = getState();
    try {
        const response = await api.editPost(postId, postData);
        dispatch({ type: EDIT_POST, payload: response });
    } catch (error) {
        console.error('Error editing post:', error);
    }
};

export const deletePostAction = (postId) => async (dispatch, getState) => {
    const { user } = getState();
    try {
        const response = await api.deletePost(postId);
        dispatch({ type: DELETE_POST, payload: response });
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

export const likePostAction = (postId) => async (dispatch) => {
    try {
        const response = await api.likePost(postId);
        dispatch({ type: LIKE_POST, payload: response });
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

export const dislikePostAction = (postId) => async (dispatch) => {
    try {
        const response = await api.dislikePost(postId);
        dispatch({ type: DISLIKE_POST, payload: response });
    } catch (error) {
        console.error('Error disliking post:', error);
    }
};


export const fetchPosts = (pageNumber) => async (dispatch) => {
    try {
        const response = await api.fetchPosts(pageNumber); // Обновлено использование метода api
        dispatch({ type: FETCH_POSTS, payload: response });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};