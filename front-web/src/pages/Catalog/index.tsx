import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () => (
    <div className="catalog-container">
        <h1 className="catalog-title">
            Catálogo de produtos
        </h1>
        <div className="catalog-products">
            <Link to="/products/1">
                <ProductCard />
            </Link> 
        </div>
    </div>
);
export default Catalog;