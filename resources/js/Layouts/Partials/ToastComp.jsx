import React, { useEffect, useState } from 'react';

import {
    Toast,
    ToastHeader,
    ToastBody,

} from "reactstrap";

//import images
import logo from "../../../assets/images/logo.svg";

const ToastComp = ({toastData}) => {

    const [toast, setToast] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (toastData) {
            setMessage(toastData);
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 5000);
        }
    }, [toastData]);

    const toggleToast = () => {
        setToast(!toast);
    };


    return (
        <>
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1005" }}>
                <Toast isOpen={toast}>
                    <ToastHeader toggle={toggleToast} className="justify-between">
                        <img src={logo} alt="" className="me-3" height="18" />
                        {message.status}
                    </ToastHeader>
                    <ToastBody className="text-center">
                        {message.text}
                    </ToastBody>
                </Toast>
            </div>
        </>

    );
};
ToastComp.propTypes = {
};


export default ToastComp;
