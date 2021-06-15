import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './core/assets/styles/custom.scss'
import './App.scss';
import Routes from './Routes';
import React from 'react';
const App = () => {


    return (
        <>
            <ToastContainer />
            <Routes />
        </>
    )
}
export default App;