// src/reducers/roelaReducer.js
import { SET_ROELA_CODREGISTRO } from '../../actions/constantes';

const initialState = {
    codRegistro: '',
};

const roelaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROELA_CODREGISTRO:
            return {
                ...state,
                codRegistro: action.payload,
            };
        default:
            return state;
    }
};

export default roelaReducer;
