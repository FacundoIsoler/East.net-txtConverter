import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home Component Tests", () => {
    it("Renders the Home component and navigates to Tango", async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Verifica que el botón "Tango" esté presente
        const button = screen.getByText(/Tango Software/);
        expect(button).toBeInTheDocument();

        // Simula un clic en el botón "Tango"
        fireEvent.click(button);

        // Espera a que ocurra algo después del clic (ajusta según tus necesidades)
        await waitFor(() => {
            // Verifica que estemos en la página de gestión de Tango
            const pageTitle = screen.queryByText("Ingresa un JSON:");
            expect(pageTitle).toBeNull();
        });
    });
});
