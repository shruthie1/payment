import React, { useState } from 'react';
import CopyModal from './CopyModal';
import { Modal } from 'reactstrap';
import { upiIds } from './profiles';
import PaymentQRCode from './dynamicQr';

function QRCard(props) {
    
    const toggle = () => {
        props.setisOpen(!props.isOpen)
    }

    const [isCopyOpen, setIsCopyOpen] = useState(false);

    return (
        <Modal style={{ display: "flex", justifyContent: "center", textAlign: "center" }} isOpen={props.isOpen} toggle={toggle} className={props.className}>
            <div className='card' style={{ backdropBlur: '10px' }}>
                <div style={{ color: "white", fontWeight: 'bold', padding: "0px 10px" }}>
                    {/* <p style={{ fontSize: "15px" }}>If "<span style={{ color: "red" }}>PAY NOW</span>" Button is Not Working!!</p> */}
                    <p style={{ marginBottom: '0px', fontWeight: "bolder" }}>Copy <p style={{ color: '#c9df3d', cursor: 'pointer', display: 'contents' }} onClick={async () => {
                        navigator.clipboard.writeText(upiIds.iciciGirls);
                    }}>UPI ID </p>or  <a style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} href='upi://pay?pa=paytmqr281005050101rgcfsaeesx4o@paytm&cu=INR&pn=Reddy%20Girl' onClick={async () => {
                        navigator.clipboard.writeText(upiIds.iciciGirls);
                    }}>Scan</a> the QR code!!</p>
                    {/* <p style={{ margin: "10px" }}> Pay to my QR Code 👇🏻👇🏻👇🏻</p> */}
                </div>
                <PaymentQRCode app={props.app}></PaymentQRCode>
                {
                    <div style={{ display: "flex", padding: "12px", height: "50px" }}>
                        <span style={{ fontWeight: "bold", marginBottom: "5px", color: "white" }}>UPI: </span>
                        <input title='paytmqr281005050101rgcfsaeesx4o@paytm' readOnly value={"PaytmQR281......@paytm"} style={{ fontSize: '17px', textOverflow: 'ellipsis', fontWeight: 'normal', cursor: 'copy' }}></input >
                        <button title='paytmqr281005050101rgcfsaeesx4o@paytm' className='cpybutton' onClick={async () => {
                            navigator.clipboard.writeText(upiIds.iciciGirls);
                            setIsCopyOpen(true);
                        }}>Copy</button>
                    </div>
                }
                {isCopyOpen && <CopyModal isOpen={isCopyOpen}  setIsOpen={setIsCopyOpen}></CopyModal>}
            </div >
        </Modal>
    )
}

export default QRCard;