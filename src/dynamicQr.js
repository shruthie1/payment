import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import './dynamicQr.css'
import './App.css'
import profiles, { endpoint } from './profiles';
import { sendUpdate, } from './App';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { UpiIds } from './upidIds';

const profile = profiles[process.env.REACT_APP_USERNAME?.toLowerCase()] || profiles['shruthie'];
const userName = profile.name.replace("Ms ", "")
const links = {
    PhonePe: `upi://pay?pa=${UpiIds.bpayGen}&tn=${userName}&pn=${userName}&${endpoint}`,
    GPay: `upi://pay?pa=${UpiIds.gpay}&tn=${userName}&pn=${userName}&${endpoint}`,
    Paytm: `upi://pay?pa=${UpiIds.paytm1}&tn=${userName}&pn=${userName}&${endpoint}`,
    others: `upi://pay?pa=${UpiIds.defaultId}&tn=${userName}&pn=${userName}&${endpoint}`
}

const links2 = {
    "PhonePe": `phonepe://pay?pa=${UpiIds.bpayGen}&tn=${userName}&pn=${userName}&${endpoint}`,
    "Google-Pay": `tez://upi/pay?pa=${UpiIds.gpay}&tn=${userName}&pn=${userName}&${endpoint}`,
    "PayTm": `paytmmp://pay?pa=${UpiIds.paytm1}&tn=${userName}&pn=${userName}&${endpoint}`,
    "Any UPI": `upi://pay?pa=${UpiIds.defaultId}&tn=${userName}&pn=${userName}&${endpoint}`
}

const apps = {
    "phonpe": "PhonePe",
    "gpay": "Google-Pay",
    "paytm": "PayTm",
    "any": "Any UPI"
}

function PaymentQRCode(props) {
    const [selectedOption, setSelectedOption] = useState(apps[props.app] ? apps[props.app] : "PhonePe");
    const location = useLocation();
    const queryParams = queryString.parse(location.search);

    useEffect(() => {
        if (queryParams.app) {
            setSelectedOption(props.app ? props.app : (apps[queryParams.app] ? apps[queryParams.app] : "PhonePe"));
            if (queryParams.open === "yes") {
                window.location.href = links2[apps[queryParams.app]]
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams, props.app])

    const handleOptionChange = async (event) => {
        setSelectedOption(event.target.value);
        await sendUpdate(`QR selected - ${event.target.value}`)
    };

    const generateQRCode = () => {
        switch (selectedOption) {
            case 'PhonePe':
                return <QRCode className='Qr' size={200} value={links.PhonePe} />;
            case 'PayTm':
                return <QRCode className='Qr' size={200} value={links.Paytm} />;
            case 'Google-Pay':
                return <QRCode className='Qr' size={200} value={links.GPay} />;
            case 'Any UPI':
                return <QRCode className='Qr' size={200} value={links.others} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {selectedOption !== "Google-Pay" &&
                <div>
                    <h1>Select a Payment App</h1>
                    <div className="dropdown-container">
                        <select className='qrSelect' value={selectedOption} onChange={handleOptionChange}>
                            <option value="PhonePe">PhonePe</option>
                            <option value="Google-Pay">Google Pay</option>
                            <option value="PayTm">PayTm</option>
                            <option value="Any UPI">Others</option>
                        </select>
                    </div>
                </div>}
            <div className="qr-code">
                <h6 style={{ margin: '5px 0px 0px 0px', color: "black" }}>{selectedOption}</h6>
                {generateQRCode()}
            </div>
            <div>
                <img className='upi' style={{ marginBottom: "0px", width: "140px" }} alt='' src='./upilogo.png'></img>
                {selectedOption !== "Google-Pay" && <button className='button' style={{ width: "40%", height: '35px' }} onClick={async () => {
                    window.location.href = links2[selectedOption]
                }}>Pay Now</button>}
            </div>
        </div>
    );
}

export default PaymentQRCode;
