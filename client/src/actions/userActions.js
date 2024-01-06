import { LOGIN_USER, LOGOUT_USER } from '../services/const';

export const loginUser = (username) => ({
    type: LOGIN_USER,
    payload: { username },
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});