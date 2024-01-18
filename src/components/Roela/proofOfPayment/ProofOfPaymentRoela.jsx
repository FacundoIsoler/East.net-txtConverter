// src/components/Roela/proofOfPayment/ProofOfPaymentRoela.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProofOfPaymentRoela.module.css';

function ProofOfPaymentRoela() {
    // Obtener el codRegistro desde el estado global de Redux
    const codRegistro = useSelector((state) => state.roela.codRegistro);

    // Verificar si codRegistro está definido antes de acceder a sus propiedades
    if (!codRegistro) {
        return <div>Cargando...</div>;
    }

    // Extraer información del CodRegistro
    const fechaPago = codRegistro.slice(0, 8);
    const fechaAcreditacion = codRegistro.slice(8, 16);
    const fechaPrimerVencimiento = codRegistro.slice(16, 24);
    const importePagado = Number(codRegistro.slice(24, 35)) / 100;
    const identificadorUsuario = codRegistro.slice(35, 43);
    const identificadorConcepto = codRegistro.slice(43, 44);
    const codigoBarra = codRegistro.slice(44, 103);
    const identificadorDeComprobante = Number(codRegistro.slice(103, 123));
    const canalDeCobro = codRegistro.slice(123, 126);
    const codigoDeRechazo = codRegistro.slice(126, 129).trim();
    const descripcionDeRechazo = codRegistro.slice(129, 149);
    const cuotas = Number(codRegistro.slice(149, 151));
    const tarjeta = codRegistro.slice(151, 166);
    const filler = codRegistro.slice(166, 226);
    const idPago = Number(codRegistro.slice(226, 236));
    const idResultado = codRegistro.slice(236, 272).trim();

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Registro de rendición</h1>
            <div className={styles.value}>Fecha de Pago: {fechaPago}</div>
            <div className={styles.value}>Fecha de Acreditación: {fechaAcreditacion}</div>
            <div className={styles.value}>Fecha 1er Vto: {fechaPrimerVencimiento}</div>
            <div className={styles.value}>Importe Pagado: ${importePagado.toFixed(2)}</div>
            <div className={styles.value}>Identificador de Usuario: {identificadorUsuario}</div>
            <div className={styles.value}>Identificador de Concepto: {identificadorConcepto}</div>
            <div className={styles.value}>Código de Barra: {codigoBarra}</div>
            <div className={styles.value}>Identificador de comprobante: {identificadorDeComprobante}</div>
            <div className={styles.value}>Canal de cobro: {canalDeCobro}</div>
            <div className={styles.value}>Código de rechazo: {codigoDeRechazo}</div>
            <div className={styles.value}>Descripción de rechazo: {descripcionDeRechazo}</div>
            <div className={styles.value}>Cuotas: {cuotas}</div>
            <div className={styles.value}>Tarjeta: {tarjeta}</div>
            <div className={styles.value}>Id de Pago: {idPago}</div>
            <div className={styles.value}>Filler: {filler}</div>
            <div className={styles.value}>Id de Resultado: {idResultado}</div>
        </div>
    );
}

export default ProofOfPaymentRoela;
