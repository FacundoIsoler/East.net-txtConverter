// src/reducer/Reducer.js
import { combineReducers } from 'redux';
import roelaReducer from './Roela/reducer'; // Asume que hay un reducer específico para Roela
import tangoReducer from './Tango/reducer'; // Asume que hay un reducer específico para TangoSoftware

const rootReducer = combineReducers({
    roela: roelaReducer,
    tango: tangoReducer,
    // Otros reducers si los tienes
});

export default rootReducer;
