import { LOGIN_USER, LOGOUT_USER } from '../services/const';

const initialState = {
    currentUser: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload.username,
            };
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
            };
        default:
            return state;
    }
};

export default userReducer;
