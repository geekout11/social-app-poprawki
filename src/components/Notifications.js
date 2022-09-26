import React, { useState, useEffect } from "react";
import "./Notifications.css";
import ReactDOM from 'react-dom';


function Notifications(props) {

    const [closeTimeout, setCloseTimeout] = useState(null);

    useEffect(() => {
        beginCloseTimeout();
    }, []);

    const closeSnackBar = () => {
        clearTimeout(closeTimeout);
        ReactDOM.unmountComponentAtNode(document.getElementById('snackbar-fixed-container'));
    }

    const beginCloseTimeout = () => {
        if (props.timer) {
            const timeout = setTimeout(() => closeSnackBar(), props.timer);
            setCloseTimeout(timeout);
        }
    }

    return (
        <div className="notification-container"
            onMouseEnter={() => clearTimeout(closeTimeout)}
            onMouseLeave={() => beginCloseTimeout()}>
            <div>
                <div className="notification notification-error">  {props.errorMsg || props.successMsg}
                </div>
            </div>
        </div>
    );
}

export default Notifications;