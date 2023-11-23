// src/store/Store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from '../reducer/Reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
