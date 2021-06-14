import { Switch, Route } from "react-router-dom";
import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg';
import Login from 'pages/Auth/Components/Login';
import Register from 'pages/Auth/Components/Register';
import Recover from 'pages/Auth/Components/Recover';
import './styles.scss';

const Auth = () => (
  <div className="auth-container">
    <div className="auth-info">
      <h1 className="auth-info-title">
        Divulgue seus produtos <br /> no DS Catalog
      </h1>
      <p className="auth-info-subtitle">
        Faça parte do nosso catálogo de divulgação e <br /> aumente a venda dos seus produtos.
      </p>
      <AuthImage />
    </div>
    <div className="auth-content">
      <Switch>
        <Route path="/admin/auth/login">
          <Login />
        </Route>
        <Route path="/admin/auth/register">
          <Register />
        </Route>
        <Route path="/admin/auth/recover">
          <Recover />
        </Route>
      </Switch>
    </div>
  </div>
);
export default Auth;