import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveTangoData } from '../../../actions/tangoActions';
import './DataTango.css';

const DataTango = ({ saveTangoData }) => {
    const [inputValue, setInputValue] = useState('');
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result;
            setInputValue(fileContent);
        };

        reader.readAsText(file);
    };

    const handleSaveJson = async() => {
        // await dispatch(saveTangoData(inputValue));

        setTimeout(() => {
            setShowSavedMessage(false);
            navigate('/tangoDataJson', { state: { jsonData: inputValue } }); // Redirige y pasa el JSON como state
        }, 2000);
    };

    return (
        <div className="data-container">
            <div className='form-section'>
                <div className="input-section">
                    <label htmlFor="jsonInput" className="label">
                        Ingresa un JSON:
                    </label>
                    <textarea
                        id="jsonInput"
                        value={inputValue}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="input-section">
                    <label htmlFor="fileInput" className="label-2">
                        Subir archivo JSON:
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                </div>

                <div>
                    <button className='button-json' onClick={handleSaveJson}>Guardar JSON</button>
                </div>
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
