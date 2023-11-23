// src/components/TangoSoftware/data/DataTango.jsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getDetail } from '../../../actions/actions';
import { saveTangoData } from '../../../actions/tangoActions';
import './DataTango.css';

// Componente para manejar y guardar datos de Tango
const DataTango = ({ saveTangoData }) => {
    const [inputValue, setInputValue] = useState('');
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tangoData = useSelector((state) => state.tangoData);

    // Manejar cambios en el área de entrada de texto
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Manejar cambios en la carga de archivos
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result;
            setInputValue(fileContent);
        };

        reader.readAsText(file);
    };

    // Manejar el guardado del JSON
    const handleSaveJson = () => {
        saveTangoData(inputValue);
        localStorage.setItem('tangoData', inputValue);
        setShowSavedMessage(true);

        // Redirigir a la página de gestión de Tango después de 2 segundos
        setTimeout(() => {
            setShowSavedMessage(false);
            navigate('/tableTango');
        }, 2000);

        // Actualizar detalles con el nuevo tangoData
        dispatch(getDetail(tangoData));
    };

    return (
        <div className="data-container">
            <h1>Data</h1>
            <div className="input-section">
                <label htmlFor="jsonInput" className="label">
                    Ingresa un JSON:
                </label>
                <textarea
                    id="jsonInput"
                    rows="4"
                    cols="50"
                    value={inputValue}
                    onChange={handleInputChange}
                ></textarea>
            </div>
            <div className="input-section">
                <label htmlFor="fileInput" className="label">
                    Subir archivo JSON:
                </label>
                <input
                    type="file"
                    id="fileInput"
                    accept=".json"
                    onChange={handleFileChange}
                    className="file-input"
                />
            </div>
            <div>
                <button onClick={handleSaveJson}>Guardar JSON</button>
            </div>
            {showSavedMessage && (
                <div className="success-message">
                    JSON guardado con éxito. Redireccionando a la página de gestión de Tango Software...
                </div>
            )}
        </div>
    );
};

export default connect(null, { saveTangoData })(DataTango);
