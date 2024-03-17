import React from 'react';
import styles from './TablaDefinitiva.module.css';
import { useLocation } from 'react-router-dom';

const TablaDefinitiva = () => {
    const location = useLocation();
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
    
    // console.log({jsonOutput1WithRenamedKeys});
    // console.log({jsonOutput2WithRenamedKeys});
    
    const mergeData = (jsonOutput1WithRenamedKeys, jsonOutput2WithRenamedKeys) => { 
        console.log(jsonOutput1WithRenamedKeys[2])
        const mergedData = [];
    
        jsonOutput1WithRenamedKeys.forEach(obj1 => {
            jsonOutput2WithRenamedKeys.forEach(obj2 => {
                if (obj1.N_COMP === obj2.N_COMP && obj1.T_COMP === obj2.T_COMP) {
                    mergedData.push({
                        N_COMP: obj1.N_COMP,
                        T_COMP: obj1.T_COMP,
                        FECHA_EMISION: obj2.FECHA_EMISION,
                        FECHA_VTO: obj1.FECHA_VTO.slice(0,10),
                        IMPORTE_VTO: obj1.IMPORTE_VT,
                        ALTERNATIVA_1: obj1.ALTERNATIVA_1.slice(0,10),
                        IMPORTE_TOTAL_1: obj1.IMPORTE_TOTAL_1,
                        ALTERNATIVA_2: obj1.ALTERNATIVA_2.slice(0,10),
                        IMPORTE_TOTAL_2: obj1.IMPORTE_TOTAL_2,
                        COD_CLIENTE: obj2.COD_CLIENTE,
                        RAZON_SOCIAL: obj2.RAZON_SOCIAL,
                        TELEFONO: obj2.TEL,
                        // ...obj1, // Agrega todas las propiedades de obj1
                        // ...obj2, // Agrega todas las propiedades de obj2
                    });
                }
            });
        });
    
        return mergedData;
    };
    
    // Combinar los datos de jsonOutput1WithRenamedKeys y jsonOutput2WithRenamedKeys
    const mergedData = mergeData(jsonOutput1WithRenamedKeys, jsonOutput2WithRenamedKeys);
    
    console.log({mergedData: mergedData[2]});
    
    


    

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
                        </tr>
                    </thead>
                    <tbody>
                        {mergedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.N_COMP}</td>
                                <td>{item.T_COMP}</td>
                                <td>{item.FECHA_EMISION}</td>
                                <td>{item.FECHA_VTO}</td>
                                <td>{item.IMPORTE_VTO}</td>
                                <td>{item.ALTERNATIVA_1}</td>
                                <td>{item.IMPORTE_TOTAL_1}</td>
                                <td>{item.ALTERNATIVA_2}</td>
                                <td>{item.IMPORTE_TOTAL_2}</td>
                                <td>{item.COD_CLIENTE}</td>
                                <td>{item.RAZON_SOCIAL}</td>
                                <td>{item.TELEFONO}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaDefinitiva;
