import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import { renderWithRouterAndRedux } from './helpers/renderWithRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('All tests', () => {
	it('More tests', async () => {
		render(<App />)

		await waitFor(() => {
			expect(screen.getByRole('cell', {name: /tatooine/i})).toBeInTheDocument();
		}, { timeout: 5000 })

		userEvent.click(screen.getByTestId('column-filter'));
		userEvent.click(screen.getAllByText('diameter')[0]);
		userEvent.click(screen.getByTestId(/comparison-filter/i));
		userEvent.click(screen.getByText(/menor que/i));
		userEvent.type(screen.getByTestId(/value-filter/i), '1000');
		userEvent.click(screen.getByRole('button', {
			name: /filtrar/i
		}))
		expect(screen.queryByText('table')).not.toBeInTheDocument();
	})

	it('More Tests', async () => {
		render(<App />)
	
		expect(screen.getByTestId('name-filter')).toBeInTheDocument();
		
		await waitFor(() => {
			expect(screen.getByRole('cell', {name: /tatooine/i})).toBeInTheDocument();
		}, { timeout: 5000 })
	
		userEvent.type(screen.getByRole('textbox'), 'tato');
		expect(screen.getByRole('cell', { name: /tatooine/i	})).toBeInTheDocument();
	
		userEvent.type(screen.getByRole('textbox'), '');
		userEvent.click(screen.getByTestId('column-filter'));
		userEvent.type(screen.getByRole('spinbutton'), '890');
		userEvent.click(screen.getByRole('button', {name: /filtrar/i}));
	
		userEvent.click(screen.getByTestId('column-filter'));
		userEvent.click(screen.getAllByText('orbital_period')[0]);
		userEvent.click(screen.getByTestId('comparison-filter'));
		userEvent.click(screen.getByText('igual a'));
		userEvent.type(screen.getByRole('spinbutton'), '364');
		userEvent.click(screen.getByRole('button', {name: /filtrar/i}));
		expect(screen.getByDisplayValue(/890/i)).toBeInTheDocument();
	
		userEvent.click(screen.getByRole('button', {
			name: /population/i
		}))
		userEvent.click(screen.getByRole('button', {
			name: /orbital_period/i
		}))
	
		userEvent.click(screen.getByRole('button', {
			name: /remover filtros/i
		}))
	
		userEvent.click(screen.getAllByText(/crescente/i)[0]);
		userEvent.click(screen.getByRole('button', {
			name: /ordenar/i
		}))
		userEvent.click(screen.getByText(/decrescente/i));
		userEvent.click(screen.getByRole('button', {
			name: /ordenar/i
		}))
	
		userEvent.click(screen.getByTestId('column-sort'));
		userEvent.click(screen.getAllByText('surface_water')[0]);
		userEvent.click(screen.getByRole('button', {
			name: /ordenar/i
		}))
	}, 30000);
})
