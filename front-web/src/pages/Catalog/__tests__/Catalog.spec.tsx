import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import history from 'core/utils/history';
import { Router } from 'react-router-dom';
import Catalog from '..';
import { BASE_URL } from 'core/utils/request';
import { productsResponse } from './fixtures';

const server = setupServer(
    rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
      return res(ctx.json(productsResponse))
    }),
);
  
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
beforeEach(() => {
    console.log('running a test...');
})

test('should render Catalog', async () => {
    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );

    const titleElement = screen.getByText('Catálogo de produtos');
    const loadersElements = screen.getAllByTitle('Loading...');

    expect(titleElement).toBeInTheDocument();
    expect(loadersElements).toHaveLength(3);
    
    await waitFor(() => expect(screen.getByText('Macbook Pro')).toBeInTheDocument());

    expect(screen.queryAllByTitle('Loading...')).toHaveLength(0);
    expect(screen.getByText('PC Gamer')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    //screen.debug();
});