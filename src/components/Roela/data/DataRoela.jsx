// src/components/Roela/data/DataRoela.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRoelaCodRegistro } from '../../../actions/roelaActions';
import   './DataRoela.css';

function DataRoela() {
  const [codRegistro, setCodRegistro] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setCodRegistro(content);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    dispatch(setRoelaCodRegistro(codRegistro));
    navigate('/proofOfPaymentRoela');
  };

  return (
    <div className="dataContainer">
      <div className="formSection">
        <input type="file" className='fileInput' onChange={handleFileChange} />
        <button className="buttonJson" onClick={handleUploadClick}>
          Cargar Archivo
        </button>
        {/* Resto del contenido... */}
      </div>
    </div>
  );
}

export default DataRoela;
