/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { } from 'react';
import { Modal } from 'reactstrap';
import PaymentOptions from './PaymentOptions';

function ConfirmModal(props) {
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("launching");
    //         window.open("upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&pn=ReddyGirls&tn=ReddyGirl", "_self");
    //     }, 2500);
    // }, []);

    const toggle = () => {
        props.setisOpen(!props.isOpen)
    }

    // const pay = () => {
    //     window.location.href = "upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&pn=ReddyGirls&tn=ReddyGirl";
    // }

    return (
        <div >
            <Modal style={{ padding: "50px 40px", display: "flex", justifyContent: "center", textAlign: "center" }} isOpen={props.isOpen} toggle={toggle} className={props.className}>
                <PaymentOptions shouldPopulateVpa={true} isPay={true}></PaymentOptions>
            </Modal>
        </div >
    );
}

export default ConfirmModal;
