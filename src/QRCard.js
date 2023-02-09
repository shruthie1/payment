import React, { useState } from 'react';
import CopyModal from './CopyModal';
import { Modal } from 'reactstrap';

function QRCard(props) {
    const toggle = () => {
        props.setisOpen(!props.isOpen)
    }

    const [isCopyOpen, setIsCopyOpen] = useState(false);

    return (
        <Modal style={{ padding: "30% 10%", display: "flex", justifyContent: "center", textAlign: "center" }} isOpen={props.isOpen} toggle={toggle} className={props.className}>
            <div className='card' style={{ backdropBlur: '10px' }}>
                <div style={{ color: "white", fontWeight: 'bold', padding: "0px 10px" }}>
                    {/* <p style={{ fontSize: "15px" }}>If "<span style={{ color: "red" }}>PAY NOW</span>" Button is Not Working!!</p> */}
                    <p style={{ marginBottom: '0px', fontWeight: "bolder" }}>Copy <p style={{ color: '#c9df3d', cursor: 'pointer', display: 'contents' }} onClick={async () => {
                        navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
                    }}>UPI ID </p>or  <a style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} href='upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&cu=INR&pn=Reddy%20Girl' onClick={async () => {
                        navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
                    }}>Scan</a> the QR code!!</p>
                    {/* <p style={{ margin: "10px" }}> Pay to my QR Code 👇🏻👇🏻👇🏻</p> */}
                </div>
                <img className='qr' title='paytmqr281005050101jnirp1ueoe1y@paytm' style={{ marginTop: "6px" }} alt='' src='./QR.jpg'></img>
                <img className='upi' style={{ marginBottom: "0px", width: "140px" }} alt='' src='./upilogo.png'></img>
                {
                    <div style={{ display: "flex", padding: "12px", height: "50px" }}>
                        <span style={{ fontWeight: "bold", marginBottom: "5px", color: "white" }}>UPI: </span>
                        <input title='paytmqr281005050101jnirp1ueoe1y@paytm' readOnly value={"PaytmQR281......@paytm"} style={{ fontSize: '17px', textOverflow: 'ellipsis', fontWeight: 'normal', cursor: 'copy' }}></input >
                        <button title='paytmqr281005050101jnirp1ueoe1y@paytm' className='cpybutton' onClick={async () => {
                            navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
                            setIsCopyOpen(true);
                        }}>Copy</button>
                    </div>
                }
                {isCopyOpen && <CopyModal isOpen={isCopyOpen} setIsOpen={setIsCopyOpen}></CopyModal>}
            </div >
        </Modal>
    )
}

export default QRCard;