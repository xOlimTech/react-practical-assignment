// postActions.js
import {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    LIKE_POST,
    DISLIKE_POST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
} from '../services/actionTypes';
import * as api from '../services/api';
// import {getAllPosts} from '../services/api';

export const createPost = (post) => async (dispatch, getState) => {
    const { username } = getState().user;
    console.log("postData", post);
    try {
        const response = await api.createPost({ ...post, username });
        dispatch({ type: CREATE_POST, payload: response });
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error creating post:', error);
    }
};


export const editPost = (postId, post) => async (dispatch, getState) => {
    // const { username } = getState();
    try {
        const response = await api.updatePost(postId, post);
        dispatch({ type: EDIT_POST, payload: response });
    } catch (error) {
        console.error('Error editing post:', error);
    }
};

export const deletePostAction = (postId) => async (dispatch, getState) => {
    // const { username } = getState();
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

export const fetchPosts = () => async (dispatch) => {
    try {
        const response = await api.getAllPosts();
        dispatch({ type: FETCH_POSTS_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
    }
};
