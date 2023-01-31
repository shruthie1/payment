/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';

function PaymentModal(props) {
    useEffect(() => {
        setTimeout(() => {
            console.log("launching");
            window.open("upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm", "_self");
        }, 1600);
    }, []);

    const toggle = () => {
        props.setisOpen(!props.isOpen)
    }

    return (
        <div>
            <Modal style={{ padding: "50px 40px" }} isOpen={props.isOpen} toggle={toggle} className={props.className}>
                <ModalHeader toggle={toggle}>Pay First to Unlock Whatsapp Number(Min 10₹)</ModalHeader>
                <Button color="success" onClick={props.fn}>Pay Now!!</Button>{' '}
            </Modal>
        </div>
    );
}

export default PaymentModal;
