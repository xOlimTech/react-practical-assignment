// postActions.js
import {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    FETCH_POSTS_SUCCESS,
    MAIN_URL
} from '../services/const';
import * as api from '../services/api';
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

// export const createPost = (postData) => async (dispatch, getState) => {
//     try {
//         const post = {...postData};
//         const response = await api.createPost(post);
//         dispatch({type: CREATE_POST, payload: response});
//         dispatch(fetchPosts());
//     } catch (error) {
//         console.error('Error creating post:', error);
//     }
// };
export const createPost = createAsyncThunk('posts/createPost', async ({ title, username }, { dispatch }) => {
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

// export const likePostAction = (postId) => async (dispatch) => {
//     try {
//         const response = await api.likePost(postId);
//         dispatch({type: LIKE_POST, payload: response});
//     } catch (error) {
//         console.error('Error liking post:', error);
//     }
// };
//
// export const dislikePostAction = (postId) => async (dispatch) => {
//     try {
//         const response = await api.dislikePost(postId);
//         dispatch({type: DISLIKE_POST, payload: response});
//     } catch (error) {
//         console.error('Error disliking post:', error);
//     }
// };
// postActions.js
export const likePost = (postId) => async (dispatch, getState) => {
    try {
        const { user } = getState();
        const post = await api.getPost(postId);

        let updatedLikes = post.likes ? [...post.likes] : [];

        if (updatedLikes.includes(user.currentUser)) {
            updatedLikes = updatedLikes.filter((username) => username !== user.currentUser);
        } else {
            updatedLikes.push(user.currentUser);
        }

        const response = await api.updatePost(postId, { likes: updatedLikes });

        dispatch({
            type: EDIT_POST,
            payload: response,
        });
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

export const dislikePost = (postId) => async (dispatch, getState) => {
    try {
        const { user } = getState();
        const post = await api.getPost(postId);

        let updatedDislikes = post.dislikes ? [...post.dislikes] : [];

        if (updatedDislikes.includes(user.currentUser)) {
            updatedDislikes = updatedDislikes.filter((username) => username !== user.currentUser);
        } else {
            updatedDislikes.push(user.currentUser);
        }

        const response = await api.updatePost(postId, { dislikes: updatedDislikes });

        dispatch({
            type: EDIT_POST,
            payload: response,
        });
        dispatch(fetchPosts());
    } catch (error) {
        console.error('Error disliking post:', error);
    }
};







export const uploadPostPicture = createAsyncThunk('posts/uploadPostPicture', async ({ postId, formData }, { dispatch }) => {
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
            console.error('Ошибка при получении постов:', response.data.error);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error.message);
    }
};
