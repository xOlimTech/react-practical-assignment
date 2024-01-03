import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import App from './App';
import userReducer from './reducers/userReducer'; // Импортируем userReducer
import postReducer from './reducers/postReducer'; // Импортируем postReducer
import commentReducer from './reducers/commentReducer'; // Импортируем commentReducer

const rootReducer = combineReducers({
    user: userReducer, // Добавляем userReducer в корневой редюсер
    post: postReducer, // Добавляем postReducer в корневой редюсер
    comment: commentReducer, // Добавляем commentReducer в корневой редюсер
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
