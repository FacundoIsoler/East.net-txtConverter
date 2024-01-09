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
            <div className='subcontainer'>
                <div className='button-zone'>
                    <div className="button-container">
                        <button className='button-home' onClick={handleNavigateToTango}>Tango Software</button>
                        <button className='button-home' onClick={handleNavigateToRoela}>Roela</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
