// postActions.js
import {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    LIKE_POST,
    DISLIKE_POST,
    FETCH_POSTS_SUCCESS,
    MAIN_URL
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

// export const fetchPosts = () => async (dispatch) => {
//     try {
//         const response = await axios.get(MAIN_URL + `post/`);
//         if (response.data.success) {
//             dispatch({
//                 type: FETCH_POSTS_SUCCESS,
//                 payload: response.data.result,
//             });
//         } else {
//             console.error('Ошибка при получении постов:', response.data.error);
//         }
//     } catch (error) {
//         console.error('Ошибка при выполнении запроса:', error.message);
//     }
// };
// export const fetchPosts = (pageNumber, postsPerPage) => async (dispatch) => {
//     try {
//         const response = await axios.get(MAIN_URL + `post/page/${pageNumber}?perPage=${postsPerPage}`);
//         if (response.data.success) {
//             dispatch({
//                 type: FETCH_POSTS_SUCCESS,
//                 payload: response.data.result,
//             });
//         } else {
//             console.error('Error when receiving posts:', response.data.error);
//         }
//     } catch (error) {
//         console.error('Error during query execution:', error.message);
//     }
// };
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
