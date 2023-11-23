// En ProofOfPaymentTango.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import s from './ProofOfPaymentTango.module.css';
import logo from '../../../assets/Logo_files/Logo.png';
import saveTextFile from '../../../file/File.js';




const ProofOfPaymentTango = () => {
    const proofOfPaymentData = useSelector((state) => state.tango.proofOfPaymentData);
    let date = proofOfPaymentData?.date.slice(0, 10)
    const navigate = useNavigate();

    const handleNavigateToTango = () => {
        navigate('/tableTango');
    };


    return (
        <div className={s.body}>
            <fieldset style={{ width: "43rem", height: "65rem", padding: "0rem 1rem" }}>
                <div className={s.header}>
                    <div className={s.logo}>
                        <img src={logo} alt='logo'></img>
                        <div >{date}</div>
                    </div>
                    <div className={s.nOrden}>{proofOfPaymentData.nOrden}</div>
                    <div className={s.company}>
                        <h3>East.net <br />
                            CUIT: XX-XXXXXXX-X<br />
                            Email: XXXXXXXXXXXXX<br />
                            Phone: XXXXXXXXXXX<br />
                            Address: XXXXXXXXXXX<br />
                        </h3>
                    </div>
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
                                    <td>Cliente:</td> <td colspan="2">{proofOfPaymentData.firstName} {proofOfPaymentData.lastName}</td> <td>CUIL:</td><td colspan="2">94-66666666</td>
                                </tr>
                                <tr className={s.even}>
                                    <td>Dirección:</td> <td> Paraná 416, Mza</td> <td>Id:</td>
                                    <td> {proofOfPaymentData.customerID} </td>
                                    <td>Teléfono:</td> <td> {proofOfPaymentData.telephoneNumber}</td>
                                </tr>
                            </table>
                        </div>
                    </fieldset>
                    <fieldset className={s.fieldsetContainer2}>
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
                                    <td>xxxxx</td> <td>xx</td> <td>$xxxx</td> <td>Pr x c</td>
                                </tr>
                                <tr className={s.even}>
                                    <td>xxxxx</td> <td>xx</td> <td>$xxxx</td> <td>Pr x c</td>
                                </tr>
                                <tr className={s.even}>
                                    <td colspan="1">
                                        <h3 align="center">Total</h3>
                                    </td>
                                    <td colspan="3" className={s.total}>
                                        <h3>${proofOfPaymentData.paidTotal}</h3>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </fieldset>
                </div>
                <div className={s.state}>Pago / Impago</div>
                <div className={s.backButton}>
                <button onClick={handleNavigateToTango}>Volver</button>
                </div>
                <div className={s.downloadButton}>
                <button href='#' id="descargar" onClick={() => saveTextFile([proofOfPaymentData.date + proofOfPaymentData.nOrden + proofOfPaymentData.customerID + proofOfPaymentData.firstName + proofOfPaymentData.lastName + proofOfPaymentData.telephoneNumber + proofOfPaymentData.paidTotal], "archivo.txt")}>Descargar TXT</button>
                </div>
            </fieldset>
        </div>
    );
}


export default ProofOfPaymentTango;