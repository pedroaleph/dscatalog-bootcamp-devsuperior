import './styles.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { ReactComponent as Menu } from 'core/assets/images/menu.svg';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [drawerActive, setDrawerActive] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

    useEffect(() => {
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    }, [location]);

const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
}

    return (
        <nav className="bg-primary main-nav">
            <Link to="/" className="nav-logo-txt">
                <h4>DS Catalog</h4>
            </Link>
            <button
                className="menu-mobile-btn"
                type="button"
                onClick={() => setDrawerActive(!drawerActive)}
            >
                <Menu />
            </button>
            <div className={ drawerActive ? "menu-mobile-container" : "menu-container"}>
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" exact onClick={() => setDrawerActive(false)}>
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" onClick={() => setDrawerActive(false)}>
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin" onClick={() => setDrawerActive(false)}>
                            ADMIN
                        </NavLink>
                    </li>
                    {drawerActive &&  (
                        <li>
                            {currentUser && (
                                <a
                                    href="#logout"
                                    className="active d-inline"
                                    onClick={event => {
                                        handleLogout(event);
                                        setDrawerActive(false);
                                    }}
                                >
                                    {`LOGOUT - ${currentUser}`}
                                </a>
                            )}
                        </li>
                    )}
                    {drawerActive && (
                        <>
                            {!currentUser && (
                                <li>
                                    <Link
                                        to="/auth/login"
                                        className="active"
                                        onClick={() => setDrawerActive(false)}
                                    >
                                        LOGIN
                                    </Link>
                                </li>
                            )}
                        </>
                    )}
                </ul>
            </div>
            <div className="user-info-dnone text-right ml-2">
                {currentUser && (
                    <>
                        {currentUser}
                        <a
                            href="#logout"
                            className="active d-inline ml-3"
                            onClick={event => {
                                handleLogout(event);
                                setDrawerActive(false);
                            }}
                        >
                            LOGOUT
                        </a>
                    </>
                )}
                {!currentUser && (
                    <Link
                        to="/auth/login"
                        className="active"
                        onClick={() => setDrawerActive(false)}
                    >
                        LOGIN
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;