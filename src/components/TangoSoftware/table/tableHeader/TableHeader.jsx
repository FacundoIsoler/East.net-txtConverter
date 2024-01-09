// src/components/TangoSoftware/table/tableHeader/TableHeader.jsx
import React, { useState } from 'react';
import TableContent from '../tableContent/TableContent';
import { useNavigate } from 'react-router-dom';
import './TableHeader.css';

const TableHeader = () => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleClearLocalStorage = () => {
    localStorage.removeItem('tangoData');
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      navigate('/');
    }, 3000);
  };

  return (
    <div className="table-header">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th className='th-n°'>Numero de Factura</th>
            <th>Cliente</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Pago Total</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          <TableContent />
        </tbody>
        {localStorage.tangoData ?
          <tfoot>
            <tr>
              <td colSpan="7">
                <button onClick={handleClearLocalStorage}>Borrar Datos del localStorage</button>
              </td>
            </tr>
          </tfoot>
          : ""
        }
      </table>
      {showAlert && <div className="alert">Datos eliminados. Redireccionando a la página de inicio...</div>}
    </div>
  );
};

export default TableHeader;
