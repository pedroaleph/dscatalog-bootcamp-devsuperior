import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from './components/Products';
import Categories from './components/Categories';
import Users from './components/Users';
import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <Navbar />
        <div className="admin-content">
            <Switch>
                <Route path="/admin/products">
                    <Products />
                </Route>
                <Route path="/admin/categories">
                    <Categories />
                </Route>
                <Route path="/admin/users">
                    <Users />
                </Route>
            </Switch>
        </div>
    </div>
);
export default Admin;