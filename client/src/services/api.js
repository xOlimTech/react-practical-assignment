// api.js
import {MAIN_URL} from "./const";

const headers = {'Content-Type': 'application/json'};

const createPost = async (post) => {
    const url = MAIN_URL + `post/`;
    const method = 'POST';
    const response = await makeRequest(url, method, post);
    return response.result;
};
// const createPost = async (formData) => {
//     const url = MAIN_URL + 'post/';
//     const method = 'POST';
//     const options = {
//         method,
//         headers,
//         body: formData,
//     };
//
//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error(`Request failed with status ${response.status}`);
//         }
//         return response.json();
//     } catch (error) {
//         throw new Error(`Error making request: ${error.message}`);
//     }
// };

const updatePost = async (postId, updatedData) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    };
    const response = await fetch(MAIN_URL + `post/${postId}`, options);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
};


const deletePost = async (postId, options) => {
    const url = MAIN_URL + `post/${postId}`;
    const method = 'DELETE';
    return makeRequest(url, method, options);
};

const filterPostsByKeyword = async (keyWord) => {
    const url = MAIN_URL + `post/search/${keyWord}`;
    const method = 'GET';
    return makeRequest(url, method);
};

const getPostsByPage = async (pageNumber) => {
    const url = MAIN_URL + `post/page/${pageNumber}`;
    const method = 'GET';
    return makeRequest(url, method);
};

// const getPostsByPage = async (pageNumber, postsPerPage) => {
//     const url = MAIN_URL + `post/page/${pageNumber}?postsPerPage=${postsPerPage}`;
//     const method = 'GET';
//     return makeRequest(url, method);
// };

const getAllPosts = async () => {
    const url = MAIN_URL + 'post/';
    const method = 'GET';
    return makeRequest(url, method);
};

const getPost = async (postId) => {
    const url = MAIN_URL + `post/${postId}`;
    const method = 'GET';
    return makeRequest(url, method);
};

const getComment = async (commentId) => {
    const url = MAIN_URL + `comment/${commentId}`;
    const method = 'GET';
    return makeRequest(url, method);
};

const getComments = async () => {
    const url = MAIN_URL + 'comment/';
    const method = 'GET';
    return makeRequest(url, method);
};

export const likePost = async (postId) => {
    const response = await fetch(MAIN_URL + `post/like/${postId}`, {
        method: 'PUT',
        headers,
    });
    return handleResponse(response);
};

export const dislikePost = async (postId) => {
    const response = await fetch(MAIN_URL + `post/dislike/${postId}`, {
        method: 'PUT',
        headers,
    });
    return handleResponse(response);
};

const uploadPostPicture = async (postId, file) => {
    const url = MAIN_URL + `post/${postId}/picture`;
    const method = 'POST';
    const formData = new FormData();
    formData.append('picture', file);
    return makeRequest(url, method, formData);
};

const createComment = async (comment) => {
    const url = MAIN_URL + 'comment/';
    const method = 'POST';
    return makeRequest(url, method, comment);
};

const updateComment = async (commentId, updates) => {
    const url = MAIN_URL + `comment/${commentId}`;
    const method = 'PUT';
    return makeRequest(url, method, updates);
};

const deleteComment = async (commentId) => {
    const url = MAIN_URL + `comment/${commentId}`;
    const method = 'DELETE';
    return makeRequest(url, method);
};

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

const makeRequest = async (url, method, body = null) => {
    const options = {
        method,
        headers: {'Content-Type': 'application/json',},
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Error making request: ${error.message}`);
    }
};

export {
    createPost,
    updatePost,
    filterPostsByKeyword,
    getPostsByPage,
    deletePost,
    uploadPostPicture,
    createComment,
    updateComment,
    deleteComment,
    getAllPosts,
    getPost,
    getComment,
    getComments,
};
