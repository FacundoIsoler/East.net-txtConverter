// src/actions/actions.js
import { SET_TANGO_DATA } from './constantes';
import { GET_DETAILS } from './constantes';

export const setTangoData = (data) => ({
    type: SET_TANGO_DATA,
    payload: data,
});

export const getDetail = (
    vto,
    emision,
    nroComprobante,
    codCliente,
    razonSocial,
    telefono,
    importeVT,
    importeTotal1,
    importeTotal2,
    cuit,
    tipoComprobante,
    descripcion,
    periodoDesde,
    periodoHasta,
    estadoVto,
    fechaVto1,
    fechaVto2
) => ({
    type: GET_DETAILS,
    payload: {
        FECHA_VTO: vto,
        Fecha_de_emision: emision,
        Nro_comprobante: nroComprobante,
        Cod_cliente: codCliente,
        Razon_social: razonSocial,
        TELEFONO: telefono,
        IMPORTE_VT: importeVT,
        IMPORTE_TOTAL_1: importeTotal1,
        IMPORTE_TOTAL_2: importeTotal2,
        CUIT: cuit,
        Tipo_comprobante: tipoComprobante,
        Descripcion: descripcion,
        Periodo_desde: periodoDesde,
        Periodo_hasta: periodoHasta,
        ESTADO_VTO: estadoVto,
        FECHA_VTO1: fechaVto1,
        FECHA_VTO2: fechaVto2
    },
});

