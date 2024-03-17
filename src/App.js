// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import DataTango2 from './components/TangoSoftware/data/DataTango2';
import TangoDataJson from './components/TangoSoftware/data/TangoDataJson';
import ProofOfPayment from './components/TangoSoftware/proofOfPayment/ProofOfPaymentTango';
import TableTango from './components/TangoSoftware/table/tableTango/TableTango';
import Footer from './components/footer/Footer';
import './App.css';
import DataRoela from './components/Roela/data/DataRoela';
import ProofOfPaymentRoela from './components/Roela/proofOfPayment/ProofOfPaymentRoela';
import TablaDefinitiva from './components/TangoSoftware/data/TablaDefinitiva';
// import Clients from './components/TangoSoftware/data/clients/Clients';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* TangoSoftware */}
            <Route path="/data/tango" element={<DataTango2 />} />
            <Route path="/tangoDataJson" element={<TangoDataJson />} />
            {/* <Route path="/data/tango/clients" element={<Clients />} /> */}
            <Route path="/proofOfPaymentTango" element={<ProofOfPayment />} />
            <Route path="/tableTango" element={<TableTango />} />
            <Route path="/tablaDefinitiva" element={<TablaDefinitiva />} />


            {/* Roela */}
            <Route path="/data/roela" element={<DataRoela />} />
            <Route path="/proofOfPaymentRoela" element={<ProofOfPaymentRoela />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
