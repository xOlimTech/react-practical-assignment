// api.js
const MAIN_URL = 'http://localhost:8080/';
const headers = {'Content-Type': 'application/json'};

const createPost = async (post) => {
    const url = MAIN_URL + `post/`;
    const method = 'POST';
    return makeRequest(url, method, post);
};

const updatePost = async (postId, updates) => {
    const url = MAIN_URL + `post/${postId}`;
    const method = 'PUT';
    return makeRequest(url, method, updates);
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

const deletePost = async (postId) => {
    const url = MAIN_URL + `post/${postId}`;
    const method = 'DELETE';
    return makeRequest(url, method);
};

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
    const response = await fetch(`${MAIN_URL}/post/like/${postId}`, {
        method: 'PUT',
        headers,
    });

    return handleResponse(response);
};

export const dislikePost = async (postId) => {
    const response = await fetch(`${MAIN_URL}/post/dislike/${postId}`, {
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
};

const makeRequest = async (url, method, body) => {
    const options = {
        method,
        headers: {'Content-Type': 'application/json'},
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
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
