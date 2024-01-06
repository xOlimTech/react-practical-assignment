// postActions.js
import {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    LIKE_POST,
    DISLIKE_POST,
    FETCH_POSTS_SUCCESS,
} from '../services/const';
import * as api from '../services/api';
import axios from "axios";

export const createPost = (postData) => async (dispatch, getState) => {
    try {
        const post = {...postData};
        const response = await api.createPost(post);

        dispatch({type: CREATE_POST, payload: response});
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

export const editPost = (postId, post) => async (dispatch, getState) => {
    // const { username } = getState();
    try {
        const response = await api.updatePost(postId, post);
        dispatch({type: EDIT_POST, payload: response});
    } catch (error) {
        console.error('Error editing post:', error);
    }
};

export const deletePostAction = (postId) => async (dispatch, getState) => {
    const {user} = getState();

    try {
        // Передаем username в запрос для проверки авторства
        const response = await api.deletePost(postId, {username: user.username});
        dispatch({type: DELETE_POST, payload: response});
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

export const likePostAction = (postId) => async (dispatch) => {
    try {
        const response = await api.likePost(postId);
        dispatch({type: LIKE_POST, payload: response});
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

export const dislikePostAction = (postId) => async (dispatch) => {
    try {
        const response = await api.dislikePost(postId);
        dispatch({type: DISLIKE_POST, payload: response});
    } catch (error) {
        console.error('Error disliking post:', error);
    }
};

export const fetchPosts = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8080/post');
        if (response.data.success) {
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: response.data.result,
            });
        } else {
            console.error('Ошибка при получении постов:', response.data.error);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error.message);
    }
};