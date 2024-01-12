import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from "./Home";
import * as router from 'react-router'
const navigate = jest.fn()


test('renders content', () => {

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    it('...', () => {
        expect(navigate).toHaveBeenCalledWith('/path')
    })
    const component = render(<Home />)

    console.log(component)

})