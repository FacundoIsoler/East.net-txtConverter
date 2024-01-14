// En Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer Component Tests', () => {
    it('Renders the Footer component', () => {
        render(<Footer />);

        // Verifica que el componente esté renderizado correctamente
        const footerElement = screen.getByText(/© 2023 FacuTech. Todos los derechos reservados./i);
        expect(footerElement).toBeInTheDocument();
    });
});
