import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import MainScreen from './components/MainScreen';

const App = () => {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />}/>
                    <Route path="/" element={currentUser ? <MainScreen /> : <Navigate to="/login" />}/>
                </Routes>
            </div>
        </Router>
    );
};
export default App;