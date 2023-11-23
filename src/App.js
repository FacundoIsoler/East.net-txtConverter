// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import DataTango from './components/TangoSoftware/data/DataTango';
import ProofOfPayment from './components/TangoSoftware/proofOfPayment/ProofOfPaymentTango';
import TableTango from './components/TangoSoftware/table/tableTango/TableTango';
import Footer from './components/footer/Footer';
import './App.css';

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
            <Route path="/data/tango" element={<DataTango />} />
            <Route path="/proofOfPaymentTango" element={<ProofOfPayment />} />
            <Route path="/tableTango" element={<TableTango />} />
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
