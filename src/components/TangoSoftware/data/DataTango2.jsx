import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DataTango2.module.css';

function DataTango2() {
    const [csvOutput1, setCsvOutput1] = useState('');
    const [jsonOutput1, setJsonOutput1] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const handleFileChange = (event, setCsvOutput, setJsonOutput) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                const csvData = event.target.result;
                const jsonData = csvToJson(csvData);
                setCsvOutput(csvData);
                setJsonOutput(JSON.stringify(jsonData, null, 2));
            };

            reader.readAsText(file);
        };

        const csvToJson = (csvData) => {
            const lines = csvData.split('\n');
            const result = [];
            const headers = lines[0].replace(/\r/g, '').split(/[,|]/).map(header => header.trim()); // Limpiar los encabezados de los caracteres no deseados y espacios en blanco
        
            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentLine = lines[i].replace(/\r/g, '').split(/[,|]/); // Limpiar la línea de caracteres no deseados y espacios en blanco
        
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentLine[j]?.trim(); // Limpiar el valor de la celda de caracteres no deseados y espacios en blanco
                }
        
                result.push(obj);
            }
        
            return result;
        };
        

        const fileInput1 = document.getElementById('csvFileInput1');
        if (fileInput1) {
            fileInput1.addEventListener('change', (event) => handleFileChange(event, setCsvOutput1, setJsonOutput1));


            // Cleanup: remove event listeners when component unmounts
            return () => {
                fileInput1.removeEventListener('change', handleFileChange);

            };
        }
    }, []); // Empty array ensures the effect runs only once on component mount

    const handleSaveJson = async () => {
        const generateJson = (csvData) => {
            const lines = csvData.split('\n');
            const result = [];
            const headers = lines[0].split(/[,|]/);

            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentLine = lines[i].split(/[,|]/);

                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentLine[j];
                }

                result.push(obj);
            }

            return JSON.stringify(result, null, 2);
        };

        try {
            const jsonOutput1 = generateJson(csvOutput1);


            navigate('/tangoDataJson', { state: { jsonOutput1 } }); // Redirect and pass JSON data as state
        } catch (error) {
            console.error('Error generating JSON:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h2>Tango_facturas</h2>
                <input type="file" id="csvFileInput1" accept=".csv"></input>
                <div className={styles.output}>
                    <h3>CSV Output</h3>
                    <div>{csvOutput1}</div>
                </div>
                <div className={styles.output}>
                    <h3>JSON Output</h3>
                    <div>{jsonOutput1}</div>
                </div>
            </div>
            <button className={styles.button} onClick={handleSaveJson}>Guardar JSON</button>
        </div>
    );
}

export default DataTango2;
