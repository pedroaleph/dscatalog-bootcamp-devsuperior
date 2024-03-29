import React from 'react';
import { useHistory } from 'react-router';
import './styles.scss'

type Props = {
    title: string;
    path: string;
    children: React.ReactNode;
}

const BaseForm = ({title, path, children} : Props) => {
    const history = useHistory();
    const handleCancel = () => {
        history.replace(path);
    };

    return (
        <div className="admin-base-form card-base">
            <h1 className="base-form-title">
                {title}
            </h1>
            {children}
            <div className="base-form-actions">
                <button 
                className="btn btn-outline-danger border-radius-10 mr-3"
                onClick={handleCancel}
                >
                    CANCELAR
                </button>
                <button className="btn btn-primary border-radius-10 mr-3">
                    SALVAR
                </button>
            </div>
        </div>
    )
}

export default BaseForm;