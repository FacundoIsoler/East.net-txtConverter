// En Navbar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component Tests', () => {
    it('Renders the Navbar component', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        // Verifica que el componente esté renderizado correctamente
        const logoElement = screen.getByAltText('Logo');
        const inicioLink = screen.getByText(/Inicio/i);

        expect(logoElement).toBeInTheDocument();
        expect(inicioLink).toBeInTheDocument();
    });

    it('Clears local storage on "Inicio" link click', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        // Simula un clic en el enlace "Inicio"
        fireEvent.click(screen.getByText(/Inicio/i));

        // Verifica que se haya llamado a la función para limpiar el local storage
        expect(localStorage.removeItem('tangoData'))
    });
}); 
