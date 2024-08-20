/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import { UpiIds } from './upidIds';

const CopyModal = (props) => {
    const [isCopied, setIsCopied] = useState(false);

    const toggle = () => {
        props.setIsOpen(!props.isOpen);
    }

    const handleCopy = (upiId) => {
        navigator.clipboard.writeText(upiId).then(() => {
            setIsCopied(true);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    return (
        <div>
            <Modal style={{ padding: "10vh 15px" }} isOpen={props.isOpen} toggle={toggle} fade={true} className="special_modal">
                <ModalHeader toggle={toggle} style={{ borderBottom: '0px', display: 'block', textAlign: 'center' }}>
                    <h6 style={{ fontWeight: "bolder", color: "wheat" }}>UPI IDs</h6>
                    {isCopied ? (
                        <div className='insideCard'>
                            <h6 style={{ color: 'yellow' }}>
                                UPI ID <span style={{ color: "#fff" }}>Copied</span> to your Clipboard!!
                                <img style={{ width: '30px', marginLeft: '3px' }} src='../tick.png' />
                            </h6>
                            <p style={{ margin: "0px" }}>Open your <span style={{ color: "#fff" }}> UPI APP</span> and Paste the UPI ID</p>
                        </div>
                    ) : (
                        <div style={{ backgroundColor: '#2c2c2c', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
                            <div className='insideCard'>
                                <div style={{ display: "flex", alignItems: "center", height: "50px", justifyContent: "space-between" }}>
                                    <span style={{ fontWeight: "bold", marginBottom: "5px", color: "lime", width: "120px" }}>Google Pay:</span>
                                    <button
                                        title={UpiIds.ppay?.split('&')[0]}
                                        className='cpybutton'
                                        onClick={async () => { handleCopy(UpiIds.gpay?.split('&')[0]); }}
                                        style={{ width: "30vw" }}
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", height: "50px", justifyContent: "space-between" }}>
                                    <span style={{ fontWeight: "bold", marginBottom: "5px", color: "white", width: "120px" }}>
                                        <span style={{ color: 'rgb(207 25 255)', display: "inline-block" }}>PhonePe</span>
                                        <span style={{ color: "rgb(53 199 255)", display: "inline-block" }}>PayTm</span>
                                        <span style={{ color: "rgb(213 244 14)", display: "inline-block" }}>Others :</span>
                                    </span>
                                    <button
                                        title={UpiIds.ppay?.split('&')[0]}
                                        className='cpybutton'
                                        onClick={async () => { handleCopy(UpiIds.ppay?.split('&')[0]); }}
                                        style={{ width: "30vw" }}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>

                    )}
                </ModalHeader>
            </Modal>
        </div>
    );
}

export default CopyModal;
