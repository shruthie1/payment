/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect } from 'react';
import { Modal } from 'reactstrap';
// import PaymentOptions from './PaymentOptions';
import PaymentSelect from './paymentSelect';

function ConfirmModal(props) {

    useEffect(() => {
        const handleBackButton = (event) => {
            event.preventDefault();
            props.setisOpen(false)
        };
        window.addEventListener('popstate', handleBackButton);
    }, [])
    const toggle = () => {
        props.setisOpen(!props.isOpen)
    }
    return (
        <div className='hella'>
            <Modal isOpen={props.isOpen} toggle={toggle} className={props.className}>
                <PaymentSelect shouldPopulateVpa={true} handleModals={props.handleModals} isPay={true} count={8}></PaymentSelect>
            </Modal>
        </div >
    );
}

export default ConfirmModal;
