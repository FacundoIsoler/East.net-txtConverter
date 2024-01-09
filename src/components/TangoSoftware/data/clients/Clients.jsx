// // En Clients.jsx
// import React, { useState } from 'react';
// import './Clients.css';

// const Clients = () => {
//     const [filterValueRS, setFilterValueRS] = useState('');
//     const [filterValueCC, setFilterValueCC] = useState('');

//     if (!localStorage.tangoData || JSON.parse(localStorage.tangoData).length === 0) {
//         return <div className="no-data-message">No hay datos de clientes disponibles.</div>;
//     }

//     const tangoData = JSON.parse(localStorage.tangoData);

//     const handleFilterChangeRS = (event) => {
//         setFilterValueRS(event.target.value);
//     };

//     const handleFilterChangeCC = (event) => {
//         setFilterValueCC(event.target.value);
//     };

//     const filteredClientsRS = tangoData.filter(
//         (cliente) =>
//             cliente.RAZON_SOCIAL.toLowerCase().includes(filterValueRS.toLowerCase()) 
//     );

//     const filteredClientsCC = tangoData.filter(
//         (cliente) =>
//             cliente.COD_CLIENTE.toString().includes(filterValueCC) || filterValueCC === ''
//     );

//     return (
//         <div className="clients-container">
//             <h1>Clientes</h1>
//             <div className="filter-section">
//                 <label htmlFor="filterInputRS">Filtrar por Razón Social:</label>
//                 <input
//                     type="text"
//                     id="filterInputRS"
//                     className="filter-input"
//                     value={filterValueRS}
//                     onChange={handleFilterChangeRS}
//                 />
//                 <button className="filter-button" onClick={() => setFilterValueRS('')}>
//                     Limpiar Filtro
//                 </button>
//             </div>
//             <div className="filter-section">
//                 <label htmlFor="filterInputCC">Filtrar por Código de Cliente:</label>
//                 <input
//                     type="number"
//                     id="filterInputCC"
//                     className="filter-input"
//                     value={filterValueCC}
//                     onChange={handleFilterChangeCC}
//                 />
//                 <button className="filter-button" onClick={() => setFilterValueCC('')}>
//                     Limpiar Filtro
//                 </button>
//             </div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>COD_CLIENTE</th>
//                         <th>Razón Social</th>
//                         <th>Teléfono de Contacto</th>
//                         <th>Tipo de Documento y Número</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {(filterValueRS || filterValueCC === ''
//                         ? tangoData
//                         : filterValueRS
//                         ? filteredClientsRS
//                         : filteredClientsCC
//                     ).map((cliente, index) => (
//                         <tr key={index}>
//                             <td>{parseInt(cliente.COD_CLIENTE)}</td>
//                             <td>{cliente.RAZON_SOCIAL}</td>
//                             <td>{cliente.TELEFONO}</td>
//                             <td>{`${cliente.TIPO_DE_DOCUMENTO}: ${cliente.NUMERO}`}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Clients;
