import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '.';
import '@testing-library/jest-dom/extend-expect';
import { useData } from '../../hooks';


jest.mock('../../hooks', () => {
    const originalModule = jest.requireActual('../../hooks');
    return {
        ...originalModule,
        useData: jest.fn(),
    };
});

describe('Home Component', () => {
    beforeEach(() => {
        useData.mockReset(); // Скидання моку перед кожним тестом
    });

    it('should push transaction and update balance correctly', () => {
        // Мокуємо useData для повернення об'єкта зі статусом SUCCESS
        useData.mockReturnValue({
            transactions: [],
            status: 'SUCCESS',
            pushTransction: jest.fn(),
            onDelete: jest.fn(),
            onStarClick: jest.fn(),
        });

        const { getByTestId } = render(<Home />);
        const balanceElement = getByTestId('balance');
        const formInput = getByTestId('value');
        const formButton = getByTestId('save-button');

        // Simulate a transaction input
        fireEvent.change(formInput, { target: { value: '10' } });
        fireEvent.click(formButton);

        // Check if the transaction is pushed and balance is updated
        expect(balanceElement.textContent).toBe('Actual balance: 10');
    });

    it('should render the loading spinner when the status is PENDING', () => {
        // Мокуємо useData для повернення об'єкта зі статусом PENDING
        useData.mockReturnValue({
            transactions: [],
            status: 'PENDING',
            pushTransction: jest.fn(),
            onDelete: jest.fn(),
            onStarClick: jest.fn(),
        });

        const { getByTestId } = render(<Home />);

        const loadingElement = getByTestId('loading');

        expect(loadingElement).toBeInTheDocument();
    });
});