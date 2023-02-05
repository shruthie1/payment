/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';

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
            <Modal style={{ padding: "50px 40px" }} isOpen={props.isOpen} toggle={toggle} className={props.className}>
                <ModalHeader toggle={toggle} style={{ color: 'yellow' }}>Pay First to Unlock Whatsapp Number (Min 10₹)</ModalHeader>
                <Button color="success" onClick={() => {
                    toggle();
                    props.togglePay();
                }} style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', }}>Pay Now!! ({seconds})</Button>{' '}
            </Modal>
        </div>
    );
}

export default WhatsappModal;
