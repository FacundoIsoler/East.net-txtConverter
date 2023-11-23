// src/actions/tangoActions.js
import { setTangoData } from './actions';

export const saveTangoData = (data) => {
    return (dispatch) => {
        // Simulación de una llamada a una API para guardar los datos
        setTimeout(() => {
            // Aquí podrías realizar una llamada a una API real
            // para guardar los datos y luego dispatch setTangoData con la respuesta.
            dispatch(setTangoData(data));
        }, 1000); // Simula una demora en la llamada API (puedes ajustar el tiempo según tus necesidades)
    };
};
