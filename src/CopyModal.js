/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import PaymentOptions from './PaymentOptions';

const CopyModal = (props) => {
    const toggle = () => {
        props.setIsOpen(!props.isOpen);
    }
    return (
        <div>
            <Modal style={{ padding: "10vh 15px" }} isOpen={props.isOpen} toggle={toggle} fade={true} className="special_modal">
                <ModalHeader toggle={toggle} style={{ borderBottom: '0px', display: 'block', textAlign: 'center' }}>
                    <h6 style={{ color: 'yellow' }}>UPI ID <span style={{ color: "#fff" }}>Copied</span> to Clipboard!!<img style={{ width: '30px', marginLeft: '3px' }} src='../tick.png'></img></h6>
                    <div style={{ padding: '20px' }}>
                        <div className='insideCard'>
                            <p style={{ margin: "0px" }}>Select <span style={{ color: "#fff" }}>Application</span> and Paste the UPI ID</p>
                        </div>
                        <PaymentOptions shouldPopulateVpa={false}  handleModals={props.handleModals} isPay={false} count={12}></PaymentOptions>
                    </div>
                </ModalHeader>
            </Modal>
        </div >
    );

}

export default CopyModal