// store.js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'; // Импорт вашего корневого редьюсера

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

export default store;
