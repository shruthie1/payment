/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Modal } from 'reactstrap';
import PaymentOptions from './PaymentOptions';

function ConfirmModal(props) {

    const toggle = () => {
        props.setisOpen(!props.isOpen)
    }


    return (
        <div >
            <Modal style={{ padding: "50% 14%", display: "flex", justifyContent: "center", textAlign: "center" }} isOpen={props.isOpen} toggle={toggle} className={props.className}>
                <PaymentOptions shouldPopulateVpa={true} isPay={true} count={6}></PaymentOptions>
            </Modal>
        </div >
    );
}

export default ConfirmModal;
