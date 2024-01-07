import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from "../actions/userActions";


const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        if (username.trim() !== '') {
            dispatch(loginUser(username));
        } else {
            alert('Please enter a valid username');
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
export default Login;