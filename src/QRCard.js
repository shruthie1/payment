import React, { useState, useEffect } from 'react';
import CopyModal from './CopyModal';
import { Modal } from 'reactstrap';
import { UpiIds } from './upidIds';
import PaymentQRCode from './dynamicQr';
import { sendUpdate } from './App';
function QRCard(props) {
    let copyId = UpiIds.defaultUpis[props.app];
    useEffect(() => {
        const handleBackButton = (event) => {
            event.preventDefault();
            props.setisOpen(false)
        };
        window.addEventListener('popstate', handleBackButton);

    }, [props])

    const toggle = () => {
        props.setisOpen(!props.isOpen);
    }

    const [isCopyOpen, setIsCopyOpen] = useState(false);

    return (
        <Modal style={{ display: "flex", justifyContent: "center", textAlign: "center" }} isOpen={props.isOpen} toggle={toggle} className={props.className}>
            <div className='card' style={{ backdropBlur: '10px' }}>
                <div style={{ color: "white", fontWeight: 'bold', padding: "0px 10px" }}>
                    <div>
                        <p style={{ marginBottom: '0px', fontWeight: "bolder" }}>
                            <a href="#top" style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} onClick={async () => {
                                navigator.clipboard.writeText(UpiIds.ppay);
                                sendUpdate("COpied")
                            }}> </a>
                            Take the
                            <a href="#top" style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} onClick={async () => {
                                navigator.clipboard.writeText(UpiIds.ppay);
                                sendUpdate("COpied")
                            }}> Screenshot </a>
                            and
                        </p>
                    </div>
                    <div>
                        <p style={{ marginBottom: '0px', fontWeight: "bolder" }}>
                            <a href="#top" style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} onClick={async () => {
                                navigator.clipboard.writeText(UpiIds.ppay);
                                sendUpdate("COpied")
                            }}>Scan </a>
                            the
                            <a href="#top" style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} onClick={async () => {
                                navigator.clipboard.writeText(UpiIds.ppay);
                                sendUpdate("COpied")
                            }}> QR </a>
                            code!!
                        </p>
                    </div>
                </div>
                <PaymentQRCode profile={props.profile} app={props.app} images={props.images} handleModals={props.handleModals}></PaymentQRCode>
                {
                    <div style={{ display: "flex", padding: "12px", height: "50px" }}>
                        <span style={{ fontWeight: "bold", marginBottom: "5px", color: "white" }}>UPI_ID:</span>
                        <input title={copyId?.split('&')[0]} readOnly value={copyId} style={{ fontSize: '17px', textOverflow: 'ellipsis', cursor: 'copy' }}></input >
                        <button title={copyId?.split('&')[0]} className='cpybutton' onClick={async () => {
                            navigator.clipboard.writeText(copyId?.split('&')[0]);
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