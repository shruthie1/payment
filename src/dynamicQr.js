import React, { useEffect, useState, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling-2';
import './dynamicQr.css'
import './App.css'
import { endpoint } from './profiles';
import { modals, apps } from './App';
import { sendUpdate } from './App';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { UpiIds } from './upidIds';

function PaymentQRCode(props) {
    const profile = props.profile;
    const username = profile.name.replace("Ms ", "").replace(/\s/g, "");

    const links = {
        PhonePe: `upi://pay?pa=${UpiIds.ppay}&tn=${username}&pn=${username}&${endpoint}`,
        GPay: `upi://pay?pa=${UpiIds.gpayid}&tn=${username}&pn=${username}&${endpoint}`,
        Paytm: `upi://pay?pa=${UpiIds.paytm1}&tn=${username}&pn=${username}&${endpoint}`,
        others: `upi://pay?pa=${UpiIds.defaultId}&tn=${username}&pn=${username}&${endpoint}`
    };

    // const [selectedOption, setSelectedOption] = useState(apps[props.app] ? apps[props.app] : "PhonePe");
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const qrCode = useRef(null);
    const qrCodeInstance = useRef(null);


    useEffect(() => {
        console.log(props.images)
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
    }, []);

    useEffect(() => {
        if (qrCodeInstance.current) {
            switch (props.app) {
                case 'phonepe':
                    qrCodeInstance.current.update({
                        data: links.PhonePe,
                        image: props.images.phonePe
                    });
                    break;
                case 'paytm':
                    qrCodeInstance.current.update({
                        data: links.Paytm,
                        image: props.images.payTm,
                    });
                    break;
                case 'gpay':
                    qrCodeInstance.current.update({
                        data: links.GPay,
                        image: props.images.gPay,
                    });
                    break;
                default:
                    qrCodeInstance.current.update({
                        data: links.others,
                        image: props.images.phonePe,
                    });
                    break;
            }
            qrCodeInstance.current.append(qrCode.current);
        }
    }, [props.app, links]);

    const handleOptionChange = async (event) => {
        console.log("Options Changes")
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
                <h6 style={{ margin: '5px 0px 0px 0px', color: "black" }}>{props.app}</h6>
                <div className="outer-div">
                    <div className="inner-div">
                        <div style={{ display: "flex" }} ref={qrCode} />
                    </div>
                </div>
            </div>
            <div>
                <img className='upi' style={{ marginBottom: "0px", width: "140px" }} alt='' src='../upilogo.png'></img>
            </div>
            {
                <div style={{ margin: "3px", borderRadius: "10px", background: "brown" }}>
                    <h1 style={{ paddingTop: "3px", fontSize: "13px" }}>Scan the QR from Another Mobile</h1>
                </div>
            }
        </div>
    );
}

export default PaymentQRCode;
