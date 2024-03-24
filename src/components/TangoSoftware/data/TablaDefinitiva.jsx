import React from 'react';
import styles from './TablaDefinitiva.module.css';
import lupa from '../../../assets/Logo_files/lupa.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDetail } from '../../../actions/actions.js';

const TablaDefinitiva = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { jsonOutput1 } = location.state || {};


    const formatDate = (dateStr) => {
        if (!dateStr || typeof dateStr !== 'string' || dateStr.length < 10) {
            return "{ year: '', month: '', day: '' }"; // Devuelve valores predeterminados si la cadena es inválida
        }

        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(5, 7);
        const day = dateStr.substring(8, 10);

        const date = day + "-" + month + "-" + year;
        return date;
    };

    const handleClick = (
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
        fechaVto,
        fechaVto1,
        fechaVto2
    ) => {
        dispatch(getDetail(
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
            fechaVto,
            fechaVto1,
            fechaVto2
        ));
        navigate('/proofOfPaymentTango');
    };
    

    return (
        <div className={styles.container}>
            <h1>Tabla Definitiva</h1>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nro_comprobante</th>
                            <th>Tipo_comprobante</th>
                            <th>FECHA_VTO</th>
                            <th>ID_GVA12</th>
                            <th>ID_STA11</th>
                            <th>Fecha_de_emision</th>
                            <th>Cod_cliente</th>
                            <th>Razon_social</th>
                            <th>ID_GVA14</th>
                            <th>CUIT</th>
                            <th>Cod_articulo</th>
                            <th>Descripcion</th>
                            <th>Periodo_desde</th>
                            <th>Periodo_hasta</th>
                            <th>ID_GVA46</th>
                            <th>ESTADO_VTO</th>
                            <th>FECHA_VTO</th>
                            <th>IMPORTE_VT</th>
                            <th>FECHA_VTO1</th>
                            <th>IMPORTE_TOTAL_1</th>
                            <th>FECHA_VTO2</th>
                            <th>IMPORTE_TOTAL_2</th>
                            <th>DETALLES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonOutput1.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Nro_comprobante}</td>
                                <td>{item.Tipo_comprobante}</td>
                                <td>{formatDate(item.FECHA_VTO)}</td>
                                <td>{item.ID_GVA12}</td>
                                <td>{item.ID_STA11}</td>
                                <td>{formatDate(item.Fecha_de_emision)}</td>
                                <td>{item.Cod_cliente}</td>
                                <td>{item.Razon_social}</td>
                                <td>{item.ID_GVA14}</td>
                                <td>{item.CUIT}</td>
                                <td>{item.Cod_articulo}</td>
                                <td>{item.Descripcion}</td>
                                <td>{formatDate(item.Periodo_desde)}</td>
                                <td>{formatDate(item.Periodo_hasta)}</td>
                                <td>{item.ID_GVA46}</td>
                                <td>{item.ESTADO_VTO}</td>
                                <td>{formatDate(item.FECHA_VTO)}</td>
                                <td>{item.IMPORTE_VT}</td>
                                <td>{formatDate(item.FECHA_VTO1)}</td>
                                <td>{item.IMPORTE_TOTAL_1}</td>
                                <td>{formatDate(item.FECHA_VTO2)}</td>
                                <td>{item.IMPORTE_TOTAL_2}</td>
                                <td>
                                    <button
                                        onClick={() => handleClick(
                                            item.FECHA_VTO,
                                            item.Fecha_de_emision,
                                            item.Nro_comprobante,
                                            item.Cod_cliente,
                                            item.Razon_social,
                                            item.TELEFONO,
                                            item.IMPORTE_VT,
                                            item.IMPORTE_TOTAL_1,
                                            item.IMPORTE_TOTAL_2,
                                            item.CUIT,
                                            item.Tipo_comprobante,
                                            item.Descripcion,
                                            item.Periodo_desde,
                                            item.Periodo_hasta,
                                            item.ESTADO_VTO,
                                            item.FECHA_VTO,
                                            item.FECHA_VTO1,
                                            item.FECHA_VTO2
                                        )}
                                        className="link-button-detail"
                                    >
                                        <img src={lupa} alt="Detalle" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaDefinitiva;
