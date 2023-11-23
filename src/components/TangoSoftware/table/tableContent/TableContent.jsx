import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import JSZip from 'jszip'; // Importa la librería JSZip
import saveTextFile from '../../../../file/File.js';
import { getDetail } from '../../../../actions/actions';
import './TableContent.css';

const TableContent = () => {
    const dispatch = useDispatch();

    // Función para manejar la descarga del archivo ZIP
    const handleDownloadZip = () => {
        const zip = new JSZip();

        if (localStorage.tangoData && JSON.parse(localStorage.tangoData).length > 0) {
            const tangoData = JSON.parse(localStorage.tangoData);

            tangoData.forEach((item, index) => {
                const content = `${item.Date} ${item.OrderID} ${item.Customer.CustomerID} ${item.Customer.FirstName} ${item.Customer.LastName} ${item.Customer.MobilePhoneNumber} ${item.PaidTotal}`;
                zip.file(`archivo${index + 1}.txt`, content);
            });

            // Genera el archivo ZIP y descárgalo
            zip.generateAsync({ type: 'blob' }).then((blob) => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'archivos.zip';
                a.click();
            });
        }
    };

    // Función para manejar el clic en el botón "Ver"
    const handleClick = (date, nOrden, customerID, firstName, lastName, telephoneNumber, paidTotal) => {
        dispatch(getDetail(date, nOrden, customerID, firstName, lastName, telephoneNumber, paidTotal));
    };

    return (
        <>
            {localStorage.tangoData && JSON.parse(localStorage.tangoData).length > 0 ? (
                JSON.parse(localStorage.tangoData).map((item, index) => {
                    const firstName = item.Customer.FirstName;
                    const lastName = item.Customer.LastName;
                    const telephoneNumber = item.Customer.MobilePhoneNumber;
                    const customerID = item.Customer.CustomerID;
                    const nOrden = item.OrderID;
                    const date = item.Date;
                    const paidTotal = item.PaidTotal;

                    return (
                        <tr key={index}>
                            <td>{date}</td>
                            <td>{nOrden}</td>
                            <td>{customerID}</td>
                            <td>{firstName + " " + lastName}</td>
                            <td>{telephoneNumber}</td>
                            <td>${paidTotal}</td>
                            <td>
                                <Link
                                    onClick={() => handleClick(date, nOrden, customerID, firstName, lastName, telephoneNumber, paidTotal)}
                                    to="/proofOfPaymentTango"
                                    className="link-button-detail"
                                >
                                    Ver
                                </Link>
                                <a href='individual' id="descargar" onClick={() => saveTextFile([date + nOrden + customerID + firstName + lastName + telephoneNumber + paidTotal], "archivo.txt")}>Descargar TXT</a>
                            </td>
                        </tr>
                    );
                })
            ) : (
                    <tr>
                        <td colSpan="7">No hay datos en localStorage</td>
                    </tr>
            )}
            {/* Agrega el botón para descargar el archivo ZIP */}
            {localStorage.tangoData ?
                <tr>
                    <td colSpan="7">
                        <button onClick={handleDownloadZip}>Descargar ZIP</button>
                    </td>
                </tr>
                : ""}
        </>
    );
};

export default TableContent;
