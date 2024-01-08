import {MAIN_URL} from "./const";

const updatePost = async (postId, updatedData) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
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

const getPost = async (postId) => {
    const url = MAIN_URL + `post/${postId}`;
    const method = 'GET';
    return makeRequest(url, method);
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
export const likeComment = async (commentId) => {
    try {
        const response = await fetch(MAIN_URL + `comment/like/${commentId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error liking comment:', error);
        throw error;
    }
};

export const dislikeComment = async (commentId) => {
    try {
        const response = await fetch(MAIN_URL + `comment/dislike/${commentId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error disliking comment:', error);
        throw error;
    }
};

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
    updatePost,
    deletePost,
    updateComment,
    deleteComment,
    getPost,
};
