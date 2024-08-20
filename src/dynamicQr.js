import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling-2';
import './dynamicQr.css'
import './App.css'
import { endpoint } from './profiles';
import { modals } from './App';
import { sendUpdate } from './App';
import { UpiIds } from './upidIds';

function PaymentQRCode(props) {

    const appNames = {
        phonepe: "PhonePe",
        gpay: "GooglePay",
        paytm: "PayTm",
        others: "Any UPI"
    }

    const qrCode = useRef(null);
    const qrCodeInstance = useRef(null);

    useEffect(() => {
        qrCodeInstance.current = new QRCodeStyling({
            width: 180,
            height: 180,
            dotsOptions: {
                color: "#000",
                type: "square"
            },
            backgroundOptions: {
                color: '#fff'
            },
            qrOptions: {
                typeNumber: 10,
                errorCorrectionLevel: 'L'
            },
            margin: 0,
            imageOptions: {
                crossOrigin: "anonymous",
                hideBackgroundDots: false,
                imageSize: 0.8,
            }
        });
    }, [props.images]);

    useEffect(() => {
        const profile = props.profile;
        const username = profile.name.replace("Ms ", "").replace(/\s/g, "");
        const links = {
            phonepe: `upi://pay?pa=${UpiIds.defaultUpis['phonepe']}&tn=${username}&pn=${username}&${endpoint}`,
            gpay: `upi://pay?pa=${UpiIds.defaultUpis['gpay']}&tn=${username}&pn=${username}&${endpoint}`,
            paytm: `upi://pay?pa=${UpiIds.defaultUpis['paytm']}&tn=${username}&pn=${username}&${endpoint}`,
            others: `upi://pay?pa=${UpiIds.defaultUpis['others']}&tn=${username}&pn=${username}&${endpoint}`
        };
        if (qrCodeInstance.current) {
            qrCodeInstance.current.update({
                data: links[props.app],
                image: props.images[props.app]
            });
            qrCodeInstance.current.append(qrCode.current);
        }
    }, [props]);

    const handleOptionChange = async (event) => {
        props.handleModals(modals.qr, event.target.value.toLowerCase())
        sendUpdate(`QR selected - ${event.target.value}`);
    };

    return (
        <div>
            {/* {selectedOption !== 'Google-Pay' && */
                <div style={{ margin: "3px", borderRadius: "10px", background: "#123a5d" }}>
                    <h1 style={{ paddingTop: "3px", fontSize: "13px" }}>Select Payment App</h1>
                    <div className="dropdown-container">
                        <select className='qrSelect' value={props.app} onChange={handleOptionChange}>
                            <option value="phonepe">PhonePe</option>
                            <option value="gpay">Google Pay</option>
                            <option value="paytm">PayTm</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                </div>
            }
            <div className="qr-code">
                <h6 style={{ margin: '5px 0px 0px 0px', color: "#000", fontWeight: "bolder" }}>{appNames[props.app]}</h6>
                <div className="outer-div">
                    <div className="inner-div">
                        <div style={{ display: "flex" }} ref={qrCode} />
                    </div>
                </div>
            </div>
            <div>
                <img className='upi' style={{ marginBottom: "0px", width: "140px" }} alt='' src='../upilogo.png'></img>
            </div>
            {false &&
                <div style={{ margin: "3px", borderRadius: "10px", background: "brown" }}>
                    <h1 style={{ paddingTop: "3px", fontSize: "13px" }}>Scan the QR from Another Mobile</h1>
                </div>
            }
        </div>
    );
}

export default PaymentQRCode;
