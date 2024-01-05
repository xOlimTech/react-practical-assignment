// api.js
const MAIN_URL = 'http://localhost:3000'; // Замените это на ваш URL сервера

const headers = {
    'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    } else {
        const text = await response.text();
        return text;
    }
};

export const loginUser = async (username) => {
    const response = await fetch(`${MAIN_URL}/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ username }),
    });

    return handleResponse(response);
};

export const fetchPosts = async (pageNumber) => {
    const response = await fetch(`${MAIN_URL}/post/page/${pageNumber}`);
    return handleResponse(response);
};

export const createPost = async (postData) => {
    const response = await fetch(`${MAIN_URL}/post`, {
        method: 'POST',
        headers,
        body: JSON.stringify(postData),
    });

    return handleResponse(response);
};

export const editPost = async (postId, postData) => {
    const response = await fetch(`${MAIN_URL}/post/${postId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(postData),
    });

    return handleResponse(response);
};

export const deletePost = async (postId) => {
    const response = await fetch(`${MAIN_URL}/post/${postId}`, {
        method: 'DELETE',
        headers,
    });

    return handleResponse(response);
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
