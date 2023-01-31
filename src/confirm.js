/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';

function ConfirmModal(props) {
    useEffect(() => {
        setTimeout(() => {
            console.log("launching");
            window.open("upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&pn=ReddyGirls&tn=ReddyGirl", "_self");
        }, 2500);
    }, []);

    const toggle = () => {
        props.setisOpen(!props.isOpen)
    }

    const pay = () => {
        window.location.href = "upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&pn=ReddyGirls&tn=ReddyGirl";
    }

    return (
        <div >
            <Modal style={{ padding: "50px 40px", display: "flex", justifyContent: "center", textAlign: "center" }} isOpen={props.isOpen} toggle={toggle} className={props.className}>
                <ModalHeader toggle={toggle} style={{ display: "flex", textAlign:"left" }}>⚠️Works Only with⚠️
                    <b style={{ display: "block", fontSize: '20px', color: "steelblue" }}>
                        <span style={{ color: "steelblue" }}>Paytm</span>
                        &nbsp;/ <span style={{ color: "steelblue" }}>Google-Pay</span>
                    </b>
                    <span style={{ color: 'red', display: "flex", fontSize: '12px', marginTop: "13px" }}>
                        For Apps like&nbsp;
                        <span style={{ color: 'green' }}> PhonePe </span>
                        &nbsp;"SCAN the QR"
                    </span>
                </ModalHeader>
                {/* <ModalHeader toggle={toggle}>⚠️Works Only with<img style={{ width: '60%', paddingLeft: "20%" }} src='./gpay.png'></img></ModalHeader> */}
                <Button color="success" onClick={pay}>Pay Now!!</Button>{' '}
            </Modal>
        </div >
    );
}

export default ConfirmModal;
