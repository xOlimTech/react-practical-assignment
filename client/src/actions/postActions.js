import {
    EDIT_POST,
    DELETE_POST,
    FETCH_POSTS_SUCCESS,
    MAIN_URL
} from '../services/const';
import * as api from '../services/api';
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getPost, updatePost} from "../services/api";

export const createPost = createAsyncThunk('posts/createPost', async ({title, username}, {dispatch}) => {
    const response = await fetch(MAIN_URL + `post/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            username
        })
    });
    const json = await response.json();
    return json.result;
});
export const editPost = (postId, post) => async (dispatch, getState) => {
    try {
        const response = await api.updatePost(postId, post);
        dispatch({type: EDIT_POST, payload: response});
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error editing post:', error);
    }
};

export const deletePostAction = (postId) => async (dispatch, getState) => {
    const {user} = getState();
    try {
        const response = await api.deletePost(postId, {username: user.username});
        dispatch({type: DELETE_POST, payload: response});
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

export const likePost = (postId) => async (dispatch, getState) => {
    try {
        const { user } = getState();
        const post = await api.getPost(postId);

        const isLikedByCurrentUser = post.likes && post.likes.includes(user.currentUser);
        const isDislikedByCurrentUser = post.dislikes && post.dislikes.includes(user.currentUser);

        if (isLikedByCurrentUser) {
            dispatch(editPost(postId, { likes: post.likes.filter(author => author !== user.currentUser) }));
        } else {
            dispatch(editPost(postId, {
                likes: [...(post.likes || []), user.currentUser],
                dislikes: isDislikedByCurrentUser ? post.dislikes.filter(author => author !== user.currentUser) : (post.dislikes || []),
            }));
        }

        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

export const dislikePost = (postId) => async (dispatch, getState) => {
    try {
        const { user } = getState();
        const post = await api.getPost(postId);

        const isLikedByCurrentUser = post.likes && post.likes.includes(user.currentUser);
        const isDislikedByCurrentUser = post.dislikes && post.dislikes.includes(user.currentUser);

        if (isDislikedByCurrentUser) {
            dispatch(editPost(postId, { dislikes: post.dislikes.filter(author => author !== user.currentUser) }));
        } else {
            dispatch(editPost(postId, {
                dislikes: [...(post.dislikes || []), user.currentUser],
                likes: isLikedByCurrentUser ? post.likes.filter(author => author !== user.currentUser) : (post.likes || []),
            }));
        }

        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error disliking post:', error);
    }
};

export const uploadPostPicture = createAsyncThunk('posts/uploadPostPicture', async ({postId, formData}, {dispatch}) => {
    const response = await fetch(MAIN_URL + `post/${postId}/picture`, {
        method: 'POST',
        body: formData
    });
    const json = await response.json();
    return json.result;
});

export const fetchFilteredPosts = (keyword) => async (dispatch) => {
    try {
        if (keyword.trim() === '') {
            dispatch(fetchPosts());
        } else {
            const response = await axios.get(MAIN_URL + `post/search/${keyword}`);
            if (response.data.success) {
                dispatch({
                    type: FETCH_POSTS_SUCCESS,
                    payload: response.data.result,
                });
            } else {
                console.error('Error when receiving filtered posts:', response.data.error);
            }
        }
    } catch (error) {
        console.error('Error during query execution:', error.message);
    }
};

export const fetchPosts = (pageNumber, postsPerPage) => async (dispatch) => {
    try {
        let url = MAIN_URL + `post/`;
        if (pageNumber && postsPerPage) {
            url = MAIN_URL + `post/page/${pageNumber}?perPage=${postsPerPage}`;
        }
        const response = await axios.get(url);
        if (response.data.success) {
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: response.data.result,
            });
        } else {
            console.error('Error when receiving posts:', response.data.error);
        }
    } catch (error) {
        console.error('Error during query execution:', error.message);
    }
};
