// postReducer.js
import {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    LIKE_POST,
    DISLIKE_POST,
} from '../services/actionTypes';

const initialState = {
    posts: [],
    totalPages: 0,
    total: 0,
    page: 1,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload),
            };
        case LIKE_POST:
        case DISLIKE_POST:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        default:
            return state;
    }
};

export default postReducer;
