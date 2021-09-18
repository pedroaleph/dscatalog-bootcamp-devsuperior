import { render, screen } from '@testing-library/react';
import { Product } from 'core/types/Product';
import ProductCard from '../ProductCard';

test('souhld render ProductCard', () => {
    const name = 'product';
    const imgUrl = 'image.png';
    const price =  40.0;

    const product = {
        name, imgUrl, price
    } as Product;

    render(
        <ProductCard product={product} />
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByAltText(name)).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('40,00')).toBeInTheDocument();
})