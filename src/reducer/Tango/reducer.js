// src/components/TangoSoftware/reducer.js
import { SET_TANGO_DATA } from '../../actions/constantes';
import { GET_DETAILS } from '../../actions/constantes';

const initialState = {
    tangoData: [],
    proofOfPaymentData: [], // Cambiado a un array
};

const tangoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TANGO_DATA:
            return {
                ...state,
                tangoData: action.payload,
            };
        case GET_DETAILS:
            return {
                ...state,
                proofOfPaymentData: action.payload, // Agregar los nuevos datos al array
            };
        default:
            return state;
    }
};

export default tangoReducer;
