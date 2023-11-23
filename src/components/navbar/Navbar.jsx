// src/components/navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/Logo_files/Logo.svg'

const Navbar = () => {

  const handleClearLocalStorage = () => {
    localStorage.removeItem('tangoData');
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav  >
        <ul className='nav-list'>
          <li className='nav-item'><Link to="/" className='nav-link' onClick={handleClearLocalStorage}>Inicio</Link></li>
          <li className='nav-item'><Link to="/data/tango" className='nav-link'>Data Tango</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
