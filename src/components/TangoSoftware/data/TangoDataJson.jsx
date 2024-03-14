import React from 'react';
import styles from './TangoDataJson.module.css'; // Importa los estilos CSS

const TangoDataJson = () => {
    // Función para modificar los decimales de los números y agregar el signo "$"
    const modifyDecimals = (value, key) => {
        // Convertir el valor a número si es posible
        const numericValue = parseFloat(value);

        // Verificar si el valor es un número y el encabezado incluye 'importe'
        if (!isNaN(numericValue) && key.includes('importe')) {
            // Redondear el valor a dos decimales y agregar el signo "$"
            return `$ ${numericValue.toFixed(2)}`;
        }

        // Si el valor no es un número o el encabezado no incluye 'importe', devolver el valor original
        return value;
    };

    // Leer el contenido del archivo JSON generado por el script
    const tangoData = require('../../../assets/Tango_facturas/Tango_facturas.json');

    return (
        <div>
            <h1>JSON generado por el script Tango_facturas.js</h1>
            {/* Tabla */}
            <div className={styles.tableContainer}> {/* Usa la clase de contenedor de tabla */}
                <table className={styles.table}> {/* Usa la clase de tabla */}
                    <thead>
                        <tr>
                            {/* Crear encabezados de tabla basados en las claves del primer objeto del array */}
                            {Object.keys(tangoData[0]).map((key) => (
                                <th key={key} className={styles.th}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Renderizar filas de la tabla */}
                        {tangoData.map((item, index) => (
                            <tr key={index}>
                                {/* Crear celdas de tabla basadas en los valores de cada objeto */}
                                {Object.entries(item).map(([key, value], subIndex) => (
                                    <td key={subIndex} className={styles.td}>{modifyDecimals(value, key)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TangoDataJson;
