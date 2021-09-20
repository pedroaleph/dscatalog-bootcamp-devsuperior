import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import history from 'core/utils/history';
import { BASE_URL } from 'core/utils/request';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Router } from 'react-router-dom';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import Form from '../Form';
import { categoriesResponse } from './fixtures';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        productId: 'create'
    })
}));

const server = setupServer(
    rest.get(`${BASE_URL}/categories`, (req, res, ctx) => {
      return res(ctx.json(categoriesResponse))
    }),
    rest.post(`${BASE_URL}/products`, (req, res, ctx) => {
        return res(ctx.status(201))
      }),
);
  
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render Form',  async () => {
    render(
        <Router history={history}>
            <ToastContainer />
            <Form />
        </Router>
    );

    const titleElement = screen.getByText(/cadastrar um produto/i);
    const nameInput = screen.getByTestId('name');
    const categoriesInput = screen.getByLabelText('Categorias');
    const priceInput = screen.getByLabelText('Preço');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    expect(titleElement).toBeInTheDocument();

    userEvent.type(nameInput, 'product');

    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'image.png');
    userEvent.type(descriptionInput, 'product for test');
    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());

    expect(history.location.pathname).toBe('/admin/products');
    //screen.debug();
});

test('should render invalid Form',  async () => {
    render(
        <Router history={history}>
            <Form />
        </Router>
    );
    const submitButton = screen.getByRole('button', { name: /salvar/i });
    const nameInput = screen.getByTestId('name');
    const categoriesInput = screen.getByLabelText('Categorias');
    const priceInput = screen.getByLabelText('Preço');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');

    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getAllByText('Campo obrigatório')).toHaveLength(4));

    userEvent.type(nameInput, 'product');

    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'image.png');
    userEvent.type(descriptionInput, 'product for test');

    await waitFor(() => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0));
});