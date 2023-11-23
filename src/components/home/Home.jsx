// src/components/home/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleNavigateToTango = () => {
        navigate('/data/tango');
    };

    const handleNavigateToRoela = () => {
        navigate('/data/roela');
    };

    return (
        <div className="container">
            <h1>Home</h1>
            <div>
                <h2>Elige una opción:</h2>
                <div className="button-container">
                    <button onClick={handleNavigateToTango}>Tango Software</button>
                    <button onClick={handleNavigateToRoela}>Roela</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
