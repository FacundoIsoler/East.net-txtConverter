// src/actions/actions.js
import { SET_TANGO_DATA } from './constantes';
import { GET_DETAILS } from './constantes';

export const setTangoData = (data) => ({
    type: SET_TANGO_DATA,
    payload: data,
});

export const getDetail = (date, nOrden, customerID, firstName, lastName, telephoneNumber, paidTotal) => ({
    type: GET_DETAILS,
    payload: {
        date: date,
        nOrden: nOrden,
        customerID: customerID,
        firstName: firstName,
        lastName: lastName,
        telephoneNumber: telephoneNumber,
        paidTotal: paidTotal,
    },
});
