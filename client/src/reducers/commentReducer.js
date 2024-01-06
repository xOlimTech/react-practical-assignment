// commentReducer.js
import {
    CREATE_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    LIKE_COMMENT,
    DISLIKE_COMMENT,
} from '../services/actionTypes';

const initialState = {
    comments: [],
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };

        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment) =>
                    comment.id === action.payload.id ? action.payload : comment
                ),
            };

        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.id !== action.payload.id),
            };

        case LIKE_COMMENT:
        case DISLIKE_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment) =>
                    comment.id === action.payload.id ? action.payload : comment
                ),
            };

        default:
            return state;
    }
};

export default commentReducer;
