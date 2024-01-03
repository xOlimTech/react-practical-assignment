// api.js
const MAIN_URL = 'localhost:3000'; // Замените 'your_server_base_url' на базовый URL вашего сервера

const headers = {
    'Content-Type': 'application/json',
    // Добавьте другие необходимые заголовки, такие как авторизация, если необходимо
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
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

// Добавьте другие методы для взаимодействия с сервером в соответствии с вашими требованиями
