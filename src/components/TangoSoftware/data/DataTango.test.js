// src/components/TangoSoftware/data/DataTango.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';

import DataTango from './DataTango';

const mockStore = configureStore([thunk]);

describe('DataTango Component Tests', () => {
    it('Renders the DataTango component and saves JSON', async () => {
        const initialState = {}; // Puedes proporcionar un estado inicial según tus necesidades
        const history = createMemoryHistory();
        const store = mockStore(initialState);

        history.push('/data/tango');

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DataTango />
                </MemoryRouter>
            </Provider>
        );

        // Verifica que el componente esté renderizado correctamente
        const jsonInput = screen.getByLabelText(/Ingresa un JSON:/i);
        expect(jsonInput).toBeInTheDocument();

        // Simula la entrada de datos en el área de texto
        fireEvent.change(jsonInput, { target: { value: '{"key": "value"}' } });

        // Simula un clic en el botón "Guardar JSON"
        const saveButton = screen.getByText(/Guardar JSON/i);
        fireEvent.click(saveButton);

        // Espera a que ocurra algo después del clic (ajusta según tus necesidades)
        await waitFor(() => {
            // Puedes agregar assertions adicionales aquí
            // Por ejemplo, verifica que ciertos elementos estén presentes después de guardar el JSON
            const successMessage = screen.getByText(/JSON guardado con éxito/i);
            expect(successMessage).toBeInTheDocument();
        });
    });
});
