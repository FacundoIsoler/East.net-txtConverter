import React from 'react';
import styles from './TangoDataJson.module.css';
import { useLocation } from 'react-router-dom';

const TangoDataJson = () => {
    const location = useLocation();
    const jsonOutput1 = JSON.parse(location.state.jsonOutput1);
    const jsonOutput2 = JSON.parse(location.state.jsonOutput2);

    const modifyDecimals = (value, key) => {
        const numericValue = parseFloat(value);

        if (!isNaN(numericValue) && key.includes('importe')) {
            return `$ ${numericValue.toFixed(2)}`;
        }

        return value;
    };

    const renderTable = (jsonData) => {
        if (!jsonData) return null;

        return (
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {Object.keys(jsonData[0]).map((key) => (
                                <th key={key} className={styles.th}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((item, index) => (
                            <tr key={index}>
                                {Object.entries(item).map(([key, value], subIndex) => (
                                    <td key={subIndex} className={styles.td}>{modifyDecimals(value, key)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            <h1>JSON generado por el script Tango_facturas.js</h1>
            <div className={styles.section}>
                <h2>Tango_facturas</h2>
                {renderTable(jsonOutput1)}
            </div>
            <div className={styles.section}>
                <h2>Detalles_facturas</h2>
                {renderTable(jsonOutput2)}
            </div>
        </div>
    );
};

export default TangoDataJson;
