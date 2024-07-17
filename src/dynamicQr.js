import React, { useEffect, useState, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling-2';
import './dynamicQr.css'
import './App.css'
import { endpoint } from './profiles';
import { sendUpdate } from './App';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { UpiIds } from './upidIds';

function PaymentQRCode(props) {
    const profile = props.profile;
    const username = profile.name.replace("Ms ", "").replace(/\s/g, "");

    const links = {
        PhonePe: `upi://pay?pa=${UpiIds.ppay}&tn=${profile.product}&pn=${username}&${endpoint}`,
        GPay: `upi://pay?pa=${UpiIds.gpayid}&tn=${profile.product}&pn=${username}&${endpoint}`,
        Paytm: `upi://pay?pa=${UpiIds.paytm1}&tn=${profile.product}&pn=${username}&${endpoint}`,
        others: `upi://pay?pa=${UpiIds.defaultId}&tn=${profile.product}&pn=${username}&${endpoint}`
    };

    const apps = {
        "phonpe": "PhonePe",
        "gpay": "Google-Pay",
        "paytm": "PayTm",
        "any": "Any UPI"
    };
    const [selectedOption, setSelectedOption] = useState(apps[props.app] ? apps[props.app] : "PhonePe");
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const qrCode = useRef(null);
    const qrCodeInstance = useRef(null);

    useEffect(() => {
        if (queryParams.app) {
            setSelectedOption(props.app ? props.app : (apps[queryParams.app] ? apps[queryParams.app] : "PhonePe"));
        }
    }, [queryParams, props.app]);

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
                imageSize: 0.2,
            }
        });
    }, []);

    useEffect(() => {
        if (qrCodeInstance.current) {
            switch (selectedOption) {
                case 'PhonePe':
                    qrCodeInstance.current.update({
                        data: links.PhonePe,
                        image: props.images.phonePe
                    });
                    break;
                case 'PayTm':
                    qrCodeInstance.current.update({
                        data: links.Paytm,
                        image: props.images.payTm,
                    });
                    break;
                case 'Google-Pay':
                    qrCodeInstance.current.update({
                        data: links.GPay,
                        image:  props.images.gPay,
                    });
                    break;
                default:
                    qrCodeInstance.current.update({
                        data: links.others,
                        image:  props.images.phonePe,
                    });
                    break;
            }
            qrCodeInstance.current.append(qrCode.current);
        }
    }, [selectedOption, links]);

    const handleOptionChange = async (event) => {
        setSelectedOption(event.target.value);
        sendUpdate(`QR selected - ${event.target.value}`);
    };

    return (
        <div>
            {/* {selectedOption !== 'Google-Pay' && */
                <div style={{ margin: "3px", borderRadius: "10px", background: "#123a5d" }}>
                    <h1 style={{ paddingTop: "3px", fontSize: "13px" }}>Select Payment App</h1>
                    <div className="dropdown-container">
                        <select className='qrSelect' value={selectedOption} onChange={handleOptionChange}>
                            <option value="PhonePe">PhonePe</option>
                            <option value="Google-Pay">Google Pay</option>
                            <option value="PayTm">PayTm</option>
                            <option value="Any UPI">Others</option>
                        </select>
                    </div>
                </div>
            }
            <div className="qr-code">
                <h6 style={{ margin: '5px 0px 0px 0px', color: "black" }}>{selectedOption}</h6>
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
