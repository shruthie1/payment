/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';

function PaymentModal(props) {
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("launching");
    //         window.open("upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&pn=Girls Community&mc=5499&mode=02&orgid=000000&paytmqr=281005050101JNIRP1UEOE1Y&sign=MEQCIBVdzP1idNlw8VSOLIlxBzE7YeDQzXdB7BuybVYYqUvMAiAdI5eZhJHf3O+WhbHAOBHnto6w4C9x8e1TyaONNMJinQ==");
    //     }, 1600);
    // }, []);

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
                }} style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', }}>Pay Now!!</Button>{' '}
            </Modal>
        </div>
    );
}

export default PaymentModal;
