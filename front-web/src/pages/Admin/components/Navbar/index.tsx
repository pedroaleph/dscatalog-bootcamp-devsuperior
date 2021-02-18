import { Link } from 'react-router-dom'
import './styles.scss'

const Navbar = () => (
    <nav className="admin-nav-container">
        <ul>
            <li>
            <Link to="" className="admin-nav-item active">Meus Produtos</Link>
            </li>
            <li>
            <Link to="" className="admin-nav-item">Minhas Categorias</Link>
            </li>
            <li>
            <Link to="" className="admin-nav-item">Meus Usuários</Link>
            </li>
        </ul>
    </nav>
);

export default Navbar;