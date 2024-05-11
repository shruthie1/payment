import React, { useState } from 'react';
import CopyModal from './CopyModal';
import { Modal } from 'reactstrap';
import { UpiIds } from './upidIds';
import PaymentQRCode from './dynamicQr';
import { sendUpdate } from './App';
function QRCard(props) {

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
                            <a style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} onClick={async () => {
                                navigator.clipboard.writeText(UpiIds.defaultId);
                                await sendUpdate("COpied")
                            }}> </a>
                            Take the
                            <a style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} onClick={async () => {
                                navigator.clipboard.writeText(UpiIds.defaultId);
                                await sendUpdate("COpied")
                            }}> Screenshot </a>
                            and
                        </p>
                    </div>
                    <div>
                        <p style={{ marginBottom: '0px', fontWeight: "bolder" }}>
                            <a style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} onClick={async () => {
                                navigator.clipboard.writeText(UpiIds.defaultId);
                                await sendUpdate("COpied")
                            }}>Scan </a>
                            the
                            <a style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} onClick={async () => {
                                navigator.clipboard.writeText(UpiIds.defaultId);
                                await sendUpdate("COpied")
                            }}> QR </a>
                            code!!
                        </p>
                    </div>
                </div>
                <PaymentQRCode profile={props.profile} app={props.app}></PaymentQRCode>
                {
                    <div style={{ display: "flex", padding: "12px", height: "50px" }}>
                        <span style={{ fontWeight: "bold", marginBottom: "5px", color: "white" }}>UPI_ID:</span>
                        <input title={UpiIds.defaultId?.split('&')[0]} readOnly value={UpiIds.bpayGen} style={{ fontSize: '17px', textOverflow: 'ellipsis', cursor: 'copy' }}></input >
                        <button title={UpiIds.defaultId?.split('&')[0]} className='cpybutton' onClick={async () => {
                            navigator.clipboard.writeText(UpiIds.defaultId?.split('&')[0]);
                            await sendUpdate("Copied UPI")
                            setIsCopyOpen(true);
                        }}>Copy</button>
                    </div>
                }
                {isCopyOpen && <CopyModal isOpen={isCopyOpen} handleModals={props.handleModals} setIsOpen={setIsCopyOpen}></CopyModal>}
            </div >
        </Modal>
    )
}

export default QRCard;