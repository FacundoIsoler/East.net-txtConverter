import React from 'react';
import styles from './TablaDefinitiva.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import lupa from '../../../assets/Logo_files/lupa.svg';
import { useDispatch } from 'react-redux';
import { getDetail } from '../../../actions/actions.js';

const TablaDefinitiva = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { jsonOutput1, jsonOutput2 } = location.state || {};

    const renameKeys = (obj, keyMap) => {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = keyMap[key] || key;
            return { ...acc, [newKey]: obj[key] };
        }, {});
    };

    // Mapeo de nombres de claves para jsonOutput1
    const keyMapJsonOutput1 = {
        "FECHA_VTO": "FECHA_VTO",
        "N_COMP": "N_COMP",
        "T_COMP": "T_COMP",
        // Agrega más mapeos aquí según sea necesario
    };

    // Mapeo de nombres de claves para jsonOutput2
    const keyMapJsonOutput2 = {
        "Nro. comprobante": "N_COMP",
        "Raz�n social": "RAZON_SOCIAL",
        "Tipo comprobante": "T_COMP",
        "C�d. cliente": "COD_CLIENTE",
        "Tel�fono\r": "TEL",
        "Fecha de emisi�n": "FECHA_EMISION",
        // Agrega más mapeos aquí según sea necesario
    };

    // Convertir los nombres de las claves en jsonOutput1 y jsonOutput2
    const jsonOutput1WithRenamedKeys = jsonOutput1.map(item => renameKeys(item, keyMapJsonOutput1));
    const jsonOutput2WithRenamedKeys = jsonOutput2.map(item => renameKeys(item, keyMapJsonOutput2));

    const dateFormat = (date) => {
        const fechaEmision = new Date(date);
        // Formatear la fecha como DDMMYYYY
        const day = fechaEmision.getUTCDate();
        const month = fechaEmision.getUTCMonth() + 1;
        const year = fechaEmision.getUTCFullYear();
        const fechaDefinitiva = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        return fechaDefinitiva;
    };

    const fechaEmision = (date) => {
        // Fecha de emisión en formato de cadena (MM/DD/YYYY)
        const fechaEmisionStr = date;
        // Dividir la cadena en componentes de fecha
        const parts = fechaEmisionStr.split('/');
        const month = parseInt(parts[1], 10); // Mes (0-11)
        const day = parseInt(parts[0], 10);   // Día
        const year = parseInt(parts[2], 10);  // Año
        // Crear un objeto de fecha
        const fechaEmisionDate = new Date(year, month - 1, day); // Restar 1 al mes porque en Date el mes es 0-11
        return fechaEmisionDate;
    };

    const mergeData = (jsonOutput1WithRenamedKeys, jsonOutput2WithRenamedKeys) => {
        const mergedData = [];

        jsonOutput1WithRenamedKeys.forEach(obj1 => {
            jsonOutput2WithRenamedKeys.forEach(obj2 => {
                if (obj1.N_COMP === obj2.N_COMP && obj1.T_COMP === obj2.T_COMP) {
                    mergedData.push({
                        N_COMP: obj1.N_COMP,
                        T_COMP: obj1.T_COMP,
                        FECHA_EMISION: dateFormat(fechaEmision(obj2.FECHA_EMISION)),
                        FECHA_VTO: dateFormat(obj1.FECHA_VTO),
                        IMPORTE_VTO: parseInt(obj1.IMPORTE_VT),
                        ALTERNATIVA_1: dateFormat(obj1.ALTERNATIVA_1),
                        IMPORTE_TOTAL_1: parseInt(obj1.IMPORTE_TOTAL_1),
                        ALTERNATIVA_2: dateFormat(obj1.ALTERNATIVA_2),
                        IMPORTE_TOTAL_2: parseInt(obj1.IMPORTE_TOTAL_2),
                        COD_CLIENTE: obj2.COD_CLIENTE,
                        RAZON_SOCIAL: obj2.RAZON_SOCIAL,
                        TELEFONO: obj2.TEL,
                    });
                }
            });
        });

        return mergedData;
    };

    // Combinar los datos de jsonOutput1WithRenamedKeys y jsonOutput2WithRenamedKeys
    const mergedData = mergeData(jsonOutput1WithRenamedKeys, jsonOutput2WithRenamedKeys);

    const handleClick = (date, nComp, customerID, razonSocial, telephoneNumber, paidTotal) => {
        dispatch(getDetail(date, nComp, customerID, razonSocial, telephoneNumber, paidTotal));
        navigate('/proofOfPaymentTango');
    };

    return (
        <div className={styles.container}>
            <h1>Tabla Definitiva</h1>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>N_comp</th>
                            <th>T_comp</th>
                            <th>FECHA_EMISION</th>
                            <th>FECHA_VTO</th>
                            <th>IMPORTE</th>
                            <th>FECHA_1</th>
                            <th>IMPORTE_1</th>
                            <th>FECHA_2</th>
                            <th>IMPORTE_2</th>
                            <th>COD_CLIENTE</th>
                            <th>RAZON_SOCIAL</th>
                            <th>TELEFONO</th>
                            <th>DETALLES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mergedData.map((item, index) => (
                            <tr key={index}>
                                <td className={styles.centerText}>{item.N_COMP}</td>
                                <td className={styles.centerText}>{item.T_COMP}</td>
                                <td className={styles.centerText}>{item.FECHA_EMISION}</td>
                                <td className={styles.centerText}>{item.FECHA_VTO}</td>
                                <td className={`${styles.importe} ${styles.alignRight}`}>{item.IMPORTE_VTO}</td>
                                <td className={styles.centerText}>{item.ALTERNATIVA_1}</td>
                                <td className={`${styles.importe} ${styles.alignRight}`}>{item.IMPORTE_TOTAL_1}</td>
                                <td className={styles.centerText}>{item.ALTERNATIVA_2}</td>
                                <td className={`${styles.importe} ${styles.alignRight}`}>{item.IMPORTE_TOTAL_2}</td>
                                <td className={styles.centerText}>{item.COD_CLIENTE}</td>
                                <td className={styles.centerText}>{item.RAZON_SOCIAL}</td>
                                <td className={styles.centerText}>{item.TELEFONO}</td>
                                <td className='detalle'>
                                    <a
                                        onClick={() => handleClick(item.FECHA_EMISION, item.N_COMP, item.COD_CLIENTE, item.RAZON_SOCIAL, item.TELEFONO, item.IMPORTE_VTO)}
                                        to="/proofOfPaymentTango"
                                        className="link-button-detail"
                                    >
                                        <img src={lupa} className='img-lupa' alt="Detalle" />
                                    </a>
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
