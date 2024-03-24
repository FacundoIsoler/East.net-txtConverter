import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './ProofOfPaymentTango.module.css';
import logo from '../../../assets/Logo_files/Logo.png';

function I2of5(DataToEncode) {
    let DataToPrint = "";
    let OnlyCorrectData = "";

    for (let i = 0; i < DataToEncode.length; i++) {
        const currentCharNum = DataToEncode.charCodeAt(i);
        if (currentCharNum > 47 && currentCharNum < 58) {
            OnlyCorrectData += DataToEncode[i];
        }
    }

    DataToEncode = OnlyCorrectData;

    if (DataToEncode.length % 2 === 1) {
        DataToEncode = "0" + DataToEncode;
    }

    const startCode = String.fromCharCode(203);
    const stopCode = String.fromCharCode(204);

    for (let i = 0; i < DataToEncode.length; i += 2) {
        const currentCharNum = parseInt(DataToEncode.substr(i, 2), 10);

        if (currentCharNum < 94) {
            DataToPrint += String.fromCharCode(currentCharNum + 33);
        }

        if (currentCharNum > 93) {
            DataToPrint += String.fromCharCode(currentCharNum + 103);
        }
    }

    const printableString = startCode + DataToPrint + stopCode;

    return printableString;
}

const ProofOfPaymentTango = () => {
    const proofOfPaymentData = useSelector((state) => state.tango.proofOfPaymentData);
    const navigate = useNavigate();

    const handleNavigateToTango = () => {
        navigate('/TablaDefinitiva');
    };

    // const formattedDate = proofOfPaymentData ? proofOfPaymentData.date.replace(/[-/]/g, '') : '';
    // const dateYear = formattedDate.slice(2, 4);
    // const dateMonth = formattedDate.slice(4, 6);
    // const dateDay = formattedDate.slice(6, 8);
    // const barCodeDate = Number([dateYear, dateMonth, dateDay].join(""));
    const barCodeDate = proofOfPaymentData.date;

    const calculateCheckDigits = (data) => {
        const cleanedData = data.replace(/\s/g, '');

        let sum = 0;
        for (let i = 0; i < cleanedData.length; i++) {
            let multiplier = i % 2 === 0 ? 1 : 3;
            sum += parseInt(cleanedData[i], 10) * multiplier;
        }

        const firstCheckDigit = (Math.floor(sum / 10) + 1) * 10 - sum;

        const dataWithFirstDigit = `${cleanedData}${firstCheckDigit}`;
        let sumSecond = 0;
        for (let i = 0; i < dataWithFirstDigit.length; i++) {
            let multiplier = i % 2 === 0 ? 1 : 3;
            sumSecond += parseInt(dataWithFirstDigit[i], 10) * multiplier;
        }

        const secondCheckDigit = (Math.floor(sumSecond / 10) + 1) * 10 - sumSecond;

        const formattedResult = `${dataWithFirstDigit.slice(0, 4)} ${dataWithFirstDigit.slice(4, 5)} ${dataWithFirstDigit.slice(5, 13)} ${dataWithFirstDigit.slice(13, 19)} ${dataWithFirstDigit.slice(19, 26)} ${dataWithFirstDigit.slice(26, 28)} ${dataWithFirstDigit.slice(28, 35)} ${dataWithFirstDigit.slice(35, 37)} ${dataWithFirstDigit.slice(37, 44)} ${dataWithFirstDigit.slice(44, 54)} ${dataWithFirstDigit.slice(54, 55)} ${secondCheckDigit}`;

        return formattedResult;
    };

    const barcodeData = `04472${proofOfPaymentData && proofOfPaymentData.nComp ? proofOfPaymentData.nComp.padStart(8, "0") : ''}${barCodeDate}${String(proofOfPaymentData && proofOfPaymentData.paidTotal).padStart(7, "0")}0000000000000000001234567890`;


    const barcodeWithCheckDigits = calculateCheckDigits(barcodeData);

    const saveTextFile = () => {
        const content = `${proofOfPaymentData.date} ${proofOfPaymentData.Nro_comprobante} ${proofOfPaymentData.Cod_cliente} ${proofOfPaymentData.Razon_social} ${proofOfPaymentData.TELEFONO} ${proofOfPaymentData.IMPORTE_VT}`;
        const fileName = `${proofOfPaymentData.Cod_cliente}.${proofOfPaymentData.date}.txt`;
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };

    return (
        <div className={s.body}>
            <fieldset style={{ width: "43rem", height: "75rem", padding: "0rem 1rem" }}>
                {console.log(proofOfPaymentData)
                }
                <div className={s.header}>
                    <div className={s.logo}>
                        <img src={logo} alt='logo'></img>
                        <div>{proofOfPaymentData.date}</div>
                    </div>
                    <div className={s.nOrden}>
                        <div>{proofOfPaymentData.Tipo_comprobante}</div>
                        {proofOfPaymentData.Nro_comprobante}</div>
                    
                </div>
                <div className={s.company}>
                        <h3>East.net <br />
                            CUIT: {proofOfPaymentData.CUIT}<br />
                            Email: XXXXXXXXXXXXX<br />
                            Phone: XXXXXXXXXXX<br />
                            Address: XXXXXXXXXXX<br />
                        </h3>
                    </div>
                <div className={s.container}>
                    <fieldset className={s.fieldsetContainer}>
                        <div className={s.client}>
                            <table style={{ minWidth: "41.50rem", margin: ".1875rem" }}>
                                <tr className={s.odd}>
                                    <td colspan="6" >
                                        <h3 align="center">Datos del Cliente</h3>
                                    </td>
                                </tr>
                                <tr className={s.even}>
                                    <td>Cliente:</td> <td colspan="2">{proofOfPaymentData.Razon_social}</td> <td>CUIL:</td><td colspan="2"> {proofOfPaymentData.CUIT}</td>
                                </tr>
                                <tr className={s.even}>
                                    <td>Id:</td>
                                    <td> {proofOfPaymentData.Cod_cliente} </td>
                                    <td>Teléfono:</td> <td colspan="2"> {proofOfPaymentData.TELEFONO === " " ? proofOfPaymentData.TELEFONO : "NO HAY NUMERO"}</td>
                                </tr>
                            </table>
                        </div>
                    </fieldset>
                    <fieldset className={s.fieldsetContainer2} >
                        <div className={s.details}>
                            <table style={{ minWidth: "41.50rem", margin: ".1875rem" }}>
                                <tr className={s.odd}>
                                    <td colspan="4">
                                        <h3 align="center">Detalles</h3>
                                    </td>
                                </tr>
                                <tr className={s.odd}>
                                    <td>Producto</td> <td>Cantidad</td> <td>Precio</td> <td>Subtotal</td>
                                </tr>
                                <tr className={s.even}>
                                    <td>{proofOfPaymentData.Descripcion}</td> <td>xx</td> <td>${proofOfPaymentData.IMPORTE_VT}</td> <td>Pr x c</td>
                                </tr>
                                <tr className={s.even}>
                                    <td>xxxxx</td> <td>xx</td> <td>$xxxx</td> <td>Pr x c</td>
                                </tr>
                                <tr className={s.even}>
                                    <td colspan="1">
                                        <h3 align="center">Total</h3>
                                    </td>
                                    <td colspan="3" className={s.total}>
                                        <h3>${proofOfPaymentData.IMPORTE_VT}</h3>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </fieldset>
                </div>
                <div className={s.state}>{proofOfPaymentData.ESTADO_VTO === "PEN" ? "Impago" : "Pagado"}</div>
                <div className={s.backButton}>
                    <button onClick={handleNavigateToTango}>Volver</button>
                </div>
                <div className={s.downloadButton}>
                    <button href='#' id="descargar" onClick={saveTextFile}>Descargar TXT</button>
                </div>
                <div className={s.barCode} >
                    {I2of5(barcodeWithCheckDigits)}
                    <br />
                </div>
            </fieldset>
        </div>
    );
}

export default ProofOfPaymentTango;

