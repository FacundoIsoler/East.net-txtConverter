// src/actions/actions.js
import { SET_TANGO_DATA } from './constantes';
import { GET_DETAILS } from './constantes';

export const setTangoData = (data) => ({
    type: SET_TANGO_DATA,
    payload: data,
});

export const getDetail = (date, nComp, customerID, razonSocial,telephoneNumber, paidTotal) => ({
    type: GET_DETAILS,
    payload: {  
        date: date,
        nComp: nComp,
        customerID: customerID,
        razonSocial: razonSocial,
        telephoneNumber: telephoneNumber,
        paidTotal: paidTotal,
    },
});


