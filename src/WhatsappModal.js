/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader } from 'reactstrap';

function WhatsappModal(props) {
    const [seconds, setSeconds] = useState(6);

    useEffect(() => {
        if (props.isOpen) {
            if (seconds > 0) {
                const intervalId = setInterval(() => {
                    setSeconds(seconds - 1);
                }, 1000);

                return () => {
                    clearInterval(intervalId);
                };
            } else {
                props.togglePay();
            }
        }
    }, [seconds, props.isOpen]);

    const toggle = () => {
        props.setisOpen(!props.isOpen)
    }

    return (
        <div>
            <Modal style={{
                padding: "50px 40px"
            }} isOpen={props.isOpen} toggle={toggle} className='whatsappModal'>
                <ModalHeader toggle={toggle} style={{ color: 'black' }}>Finish Payment to Unlock Whatsapp Number (Min 15₹)</ModalHeader>
                <button className='button' color="success" onClick={() => {
                    toggle();
                    props.togglePay();
                }} style={{ width: '100%', margin: '0px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', }}>Pay Now!! ({seconds})</button>{' '}
            </Modal>
        </div >
    );
}

export default WhatsappModal;
