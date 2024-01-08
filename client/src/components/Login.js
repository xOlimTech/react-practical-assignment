import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from "../actions/userActions";
import '../bootstrap.min.css';


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
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="inputPassword2" className="sr-only">Username: </label>
                    <input
                        type="username"
                        className="form-control"
                        id="inputPassword2"
                        placeholder="Enter your username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );

}
export default Login;