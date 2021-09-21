import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import history from 'core/utils/history';
import { BASE_URL } from 'core/utils/request';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Router, useParams } from 'react-router-dom';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import Form from '../Form';
import { categoriesResponse, fillFormData, product } from './fixtures';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

const server = setupServer(
    rest.get(`${BASE_URL}/categories`, (req, res, ctx) => {
      return res(ctx.json(categoriesResponse))
    }),
    rest.post(`${BASE_URL}/products`, (req, res, ctx) => {
        return res(ctx.status(201))
    }),
    rest.get(`${BASE_URL}/products/:productId`, (req, res, ctx) => {
        return res(ctx.json(product))
    }),
    rest.put(`${BASE_URL}/products/:productId`, (req, res, ctx) => {
        return res(ctx.status(202))
    }),
);
  
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Creating a product', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    });

    test('should render Form and submit with success',  async () => {
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );
    
        const titleElement = screen.getByText(/cadastrar um produto/i);
        const categoriesInput = screen.getByLabelText('Categorias');
        const submitButton = screen.getByRole('button', { name: /salvar/i });
    
        expect(titleElement).toBeInTheDocument();
    
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
    
        fillFormData();
    
        userEvent.click(submitButton);
    
        await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
    
        expect(history.location.pathname).toBe('/admin/products');
        //screen.debug();
    });
    
    test('should render Form and submit with error',  async () => {
        server.use(
            rest.post(`${BASE_URL}/products`, (req, res, ctx) => {
              return res(ctx.status(500))
            }),
        );
        
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );
    
        const titleElement = screen.getByText(/cadastrar um produto/i);
        const categoriesInput = screen.getByLabelText('Categorias');
        const submitButton = screen.getByRole('button', { name: /salvar/i });
    
        expect(titleElement).toBeInTheDocument();
    
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
    
        fillFormData();
    
        userEvent.click(submitButton);
    
        await waitFor(() => expect(screen.getByText('Erro ao salvar produto!')).toBeInTheDocument());
    
        expect(history.location.pathname).toBe('/admin/products');
        //screen.debug();
    });
    
    test('should render invalid Form and show validations',  async () => {
        render(
            <Router history={history}>
                <Form />
            </Router>
        );
        const submitButton = screen.getByRole('button', { name: /salvar/i });
        const categoriesInput = screen.getByLabelText('Categorias');
    
        userEvent.click(submitButton);
    
        await waitFor(() => expect(screen.getAllByText('Campo obrigatório')).toHaveLength(4));
    
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
    
        fillFormData();
    
        await waitFor(() => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0));
    });
});

describe('Editing a product', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: '100'
        })
    });

    test('should render Form and submit with success',  async () => {
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );
    
        const titleElement = screen.getByText(/editar produto/i);
        const submitButton = screen.getByRole('button', { name: /salvar/i });

        expect(titleElement).toBeInTheDocument();

        await waitFor(() => expect(screen.getByTestId('name')).toHaveValue(product.name));

        expect(screen.getByText(product.categories[0].name)).toBeInTheDocument();
        expect(screen.getByText(product.categories[1].name)).toBeInTheDocument();
        expect(screen.getByLabelText('Preço')).toHaveValue('R$ 90,5');
        expect(screen.getByAltText(product.imgUrl)).toBeInTheDocument();
        expect(screen.getByTestId('description')).toHaveValue(product.description);

        userEvent.click(submitButton);

        await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
    
        expect(history.location.pathname).toBe('/admin/products');
        //screen.debug();
    });
});