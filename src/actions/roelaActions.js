// src/actions/roelaActions.js
import { SET_ROELA_CODREGISTRO } from './constantes';

export const setRoelaCodRegistro = (codRegistro) => ({
    type: SET_ROELA_CODREGISTRO,
    payload: codRegistro,
});
