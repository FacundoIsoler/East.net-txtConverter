// En Clientes.jsx
import React from 'react';

const Clients = () => {
    // console.log(JSON.parse(localStorage.tangoData)[0], "clients");
    // console.log(JSON.parse(localStorage.tangoData).length);

    if (!localStorage.tangoData || JSON.parse(localStorage.tangoData).length === 0) {
        // Manejar el caso en que jsonData esté vacío o no sea un array
        return <div>No hay datos de clientes disponibles.</div>;
    }
    const tangoData = JSON.parse(localStorage.tangoData);

    return (
        <div>
            <h1>Clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>COD_CLIENTE</th>
                        <th>Razón Social</th>
                        <th>Teléfono de Contacto</th>
                        <th>Tipo de Documento y Número</th>
                    </tr>
                </thead>
                <tbody>
                    {tangoData.map((cliente, index) => (
                        <tr key={index}>
                            <td>{cliente.COD_CLIENTE}</td>
                            <td>{cliente.RAZON_SOCIAL}</td>
                            <td>{cliente.TELEFONO}</td>
                            <td>{`${cliente.TIPO_DE_DOCUMENTO}: ${cliente.NUMERO}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clients;
