import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import './dynamicQr.css'
import './App.css'
import profiles from './profiles';
import { sendUpdate } from './App';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const paytm1 = `paytmqr281005050101xv6mfg02t4m9@paytm`;
// const paytm2 = `paytmqr281005050101jnirp1ueoe1y@paytm`;
const paytm3 = `paytmqr281005050101rgcfsaeesx4o@paytm`;
// const ppay = `Q318023659@ybl`;
// const bpayGen = `bharatpe.0851610820@icici`;

const profile = profiles[process.env.REACT_APP_USERNAME?.toLowerCase()] || profiles['shruthie'];
const userName = profile.name.replace("Ms ", "")
const links = {
    PhonePe: `upi://pay?pa=${paytm3}&tn=${userName}&pn=${userName}`,
    GPay: `upi://pay?pa=${paytm3}&tn=${userName}&pn=${userName}`,
    Paytm: `upi://pay?pa=${paytm1}&tn=${userName}&pn=${userName}`,
    others: `upi://pay?pa=${paytm3}&tn=${userName}&pn=${userName}`
}

const links2 = {
    "PhonePe": `phonepe://pay?pa=${paytm3}&tn=${userName}&pn=${userName}`,
    "Google-Pay": `tez://upi/pay?pa=${paytm3}&tn=${userName}&pn=${userName}`,
    "PayTm": `paytmmp://pay?pa=${paytm1}&tn=${userName}&pn=${userName}`,
    "Any UPI": `upi://pay?pa=bharatpe.0851610820@icici&tn=${userName}&pn=${userName}`
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
            setSelectedOption(props.app ? props.app : (apps[queryParams.app] ? apps[queryParams.app] : "PhonePe"))
        }
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
            <h1>Select a Payment App</h1>
            <div className="dropdown-container">
                <select className='qrSelect' value={selectedOption} onChange={handleOptionChange}>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Google-Pay">Google Pay</option>
                    <option value="PayTm">PayTm</option>
                    <option value="Any UPI">Others</option>
                </select>
            </div>
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
