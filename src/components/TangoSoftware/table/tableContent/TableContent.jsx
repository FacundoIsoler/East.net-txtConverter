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
                    const date = item.Date.slice(0, 10);


                    //File details 

                    const formattedDate = date.replace(/-/g, ''); // Eliminar guiones de la fecha
                    const dateYear = Number(formattedDate.slice(2, 4));
                    const dateMonth = Number(formattedDate.slice(4, 6));
                    const dateDay = Number(formattedDate.slice(6, 8));
                    const formattedDate2 = [dateYear.toString().padStart(2, '0'), dateMonth.toString().padStart(2, '0'), dateDay.toString().padStart(2, '0')];

                    const dept = Number([dateMonth.toString().padStart(2, '0'), dateYear.toString().padStart(2, '0')].join(""))

                    const paidTotal = item.PaidTotal;
                    const it = item.OrderItems.map((p) => {
                        const product = p.Description;
                        // Dividir el producto en palabras y tomar las dos primeras
                        const firstTwoWords = product.split(' ').slice(0, 2).join(' ');
                        return firstTwoWords;
                    });
                    // Crear un array con las cadenas formateadas para cada elemento de it
                    const formattedProducts = it.map((product) => product);

                    // Unir todas las cadenas formateadas en una sola cadena
                    let concatenatedProducts = formattedProducts.join(' ');
                    // Limitar la longitud a 25 caracteres
                    if (concatenatedProducts.length > 25) {
                        concatenatedProducts = concatenatedProducts.slice(0, 25);
                    }

                    // Verificar que concatenatedProducts cumple con los requisitos de formato
                    const isValidFormat = /^[A-Z0-9]+$/.test(concatenatedProducts);

                    if (isValidFormat) {
                        // El formato es válido, puedes continuar con el código
                        console.log('El formato es válido:', concatenatedProducts);
                    } else {
                        // El formato no es válido, reemplazar caracteres no válidos
                        console.error('Error: El formato no es válido, se procedderá con el cambio de caracteres no válidos por uno que si lo es');

                        // Reemplazar caracteres no válidos con un carácter específico, por ejemplo, "1"
                        concatenatedProducts = concatenatedProducts.replace(/[^A-Z0-9]/g, '1');

                        // Ahora concatenatedProducts tiene solo letras mayúsculas y números
                        console.log('Formato corregido:', concatenatedProducts);
                    }


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
                                {console.log(Number("001"))}
                                <a href='individual' id="descargar" onClick={() => saveTextFile(["HRFACTURACION" + "   " + Number(formattedDate2.join("")) + Number(nOrden) + " ".repeat(104) + 0 + 0 + 3 + 2 + 0 + 0 + 0 + 1 + 12 + 23 + 34 + 45 + 56 + 78 + 89 + 98 + 76 + 5 + 241223 + 0 + Number("10000000010") + 241224 + 0 + Number("10000000050") + 241225 + 0 + Number("10000000090") + "EASTNETINTERNET" + concatenatedProducts + " ".repeat(10) + "TRFACTURACION" + 0 + 0 + 0 + 0 + 0 + 0 + 0 + 3 + 0 + 0 + 0 + 0 + 0 + 0 + 0 + Number("10000000010") + 0 + 0 + 0 + 0 + 0 + 0 + 0 + Number("10000000050") + 0 + 0 + 0 + 0 + 0 + 0 + 0 + Number("10000000090") + " ".repeat(56)], [customerID, date]
                                )}>Descargar TXT</a>
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
