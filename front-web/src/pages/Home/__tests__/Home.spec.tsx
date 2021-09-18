import { render, screen } from '@testing-library/react';
import history from 'core/utils/history';
import { Router } from 'react-router-dom';
import Home from '..';

test('should render Home', () => {
    render(
        <Router history={history}>
            <Home />
        </Router>
    );

    //screen.debug();

    const titleElement = screen.getByText('Conheça o melhor catálogo de produtos');
    const subTitleElement = screen.getByText(
        'Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.'
    );
    const buttonTextElement = screen.getByText(/INICIE AGORA SUA BUSCA/i);

    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
    expect(screen.getByTestId('main-image')).toBeInTheDocument();
    expect(buttonTextElement).toBeInTheDocument();
})