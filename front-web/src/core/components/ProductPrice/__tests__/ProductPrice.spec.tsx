import { render, screen } from '@testing-library/react';
import ProductPrice from '..';

test('should render productPrice', () => {
  //ARRANGE
  const price = 1200;
  //ACT
  render(
    <ProductPrice price={price} />
  )
  //ASSERT
  const currencyElement = screen.getByText('R$');
  const priceElement = screen.getByText('1.200,00');

  expect(currencyElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
  //screen.debug();
});

test('should render productPrice with price equals zero', () => {
  render(
    <ProductPrice price={0} />
  );
  const currencyElement = screen.getByText('R$');
  const priceElement = screen.getByText('0,00');

  expect(currencyElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});

test('should render productPrice without thousand separator', () => {
  render(
    <ProductPrice price={100} />
  );
  const currencyElement = screen.getByText('R$');
  const priceElement = screen.getByText('100,00');

  expect(currencyElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});