import React from 'react';
import { withStorageListener } from './withStorageListener';
import './notification.css';

function ChangeAlert({ show, toggleShow }) {
    if (show === true) {
        return (
            <div className="notification">
                <div className="container">
                    <button 
                        className="rectangle"
                        onClick={() => toggleShow(false)}
                    >
                        <div className="notification-text">
                            <span>Se han realizado cambios en tu espacio de trabajo...</span>
                        </div>
                    </button>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);


export { ChangeAlertWithStorageListener };