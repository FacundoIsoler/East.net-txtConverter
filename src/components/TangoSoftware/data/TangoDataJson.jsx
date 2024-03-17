import React from 'react';
import styles from './TangoDataJson.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const TangoDataJson = () => {
    const location = useLocation();
    const jsonOutput1 = JSON.parse(location.state.jsonOutput1);
    const jsonOutput2 = JSON.parse(location.state.jsonOutput2);
    const navigate = useNavigate();

    const modifyDecimals = (value, key) => {
        const numericValue = parseFloat(value);

        if (!isNaN(numericValue) && key.includes('importe')) {
            return `$ ${numericValue.toFixed(2)}`;
        }

        return value;
    };

    const renderTable = (jsonData) => {
        if (!jsonData || !jsonData.length) return <p>No hay datos para mostrar</p>;

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

    const handleGoToTablaDefinitiva = () => {
        navigate('/TablaDefinitiva', { state: { jsonOutput1, jsonOutput2 } });
    };

    return (
        <div>
            <button onClick={handleGoToTablaDefinitiva}>Ir a Tabla Definitiva</button>
            <h1>JSON generado por el script Tango_facturas.js</h1>
            {renderTable(jsonOutput1)}
            {renderTable(jsonOutput2)}            
        </div>
    );
};

export default TangoDataJson;
