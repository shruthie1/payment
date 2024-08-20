/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import './App.css'
import { sendUpdate } from './App';
import profiles, { endpoint } from './profiles';
import { modals, } from './App';
import { UpiIds } from './upidIds';
import { getActiveProfile } from './profiles';
const PaymentOptions = (props) => {
    const shouldPopulateVpa = props.shouldPopulateVpa;
    const [selectedOption, setSelectedOption] = useState('paytm');
    const [seconds, setSeconds] = useState(props.count);
    const amount = (props.amount !== 'others') ? props.amount : undefined;
    const profile = profiles[getActiveProfile()]
    const username = (profile?.name.replace('Ms', '') || 'ReddyGirl').replace(/\s/g, "");
    useEffect(() => {
        if (seconds > 0) {
            const intervalId = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        } else {
            // window.open(links[selectedOption], '_self');
        }
    }, [seconds]);

    const links = {
        phonepe: shouldPopulateVpa ? `phonepe://pay?pa=${UpiIds.ppay}&tn=${username}&pn=${username}&${endpoint}${amount ? `&am=${amount}` : ``}` : `phonepe://upi/`,
        gpay: shouldPopulateVpa ? `tez://upi/pay?pa=${UpiIds.gpay}&tn=${username}&pn=${username}&${endpoint}${amount ? `&am=${amount}` : ``}` : `tez://upi/`,
        paytm: shouldPopulateVpa ? `paytmmp://pay?pa=${UpiIds.paytm1}&tn=${username}&pn=${username}&${endpoint}${amount ? `&am=${amount}` : ``}` : `paytmmp://upi/`,
        others: `upi://pay?pa=${UpiIds.defaultId}&tn=${username}&pn=${username}&${endpoint}${amount ? `&am=${amount}` : ``}`
    }

    const handleOptionChange = async (event) => {
        setSelectedOption(event.target.value);
        sendUpdate(`Selected ${event.target.value}: ${amount}`)
    };

    return (
        <div className='paymentOption'>
            <h6 >Select Payment Method <span style={{ fontSize: '15px', display: 'none' }}>an PASTE the UPI Id</span></h6>
            <form>
                <div className='paymentform'>
                    <div onClick={() => handleOptionChange({ target: { value: 'phonepe' } })}>
                        <input
                            type="radio"
                            id="phonepe"
                            value="phonepe"
                            checked={selectedOption === 'phonepe'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="phonepe"><img src='../phonepe.png'></img></label>
                    </div>

                    <div onClick={() => handleOptionChange({ target: { value: 'paytm' } })} style={{ background: '#efefef' }}>
                        <input
                            type="radio"
                            id="paytm"
                            value="paytm"
                            checked={selectedOption === 'paytm'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="paytm"><img src='../paytm.png'></img></label>
                    </div>

                    <div onClick={() => handleOptionChange({ target: { value: 'gpay' } })} >
                        <input
                            type="radio"
                            id="gpay"
                            value="gpay"
                            checked={selectedOption === 'gpay'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="gpay"><img src='../gpay.png'></img></label>
                    </div>
                    <div onClick={() => handleOptionChange({ target: { value: 'others' } })} style={{ background: '#efefef' }}>
                        <input
                            type="radio"
                            id="others"
                            value="others"
                            checked={selectedOption === 'others'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="others"><img src='../upi.png'></img><span style={{ marginTop: '11%' }}>(Others)</span></label>
                    </div>
                </div>


            </form >

            {/* <p>Selected option: {selectedOption}</p> */}
            <button className='button' style={{ borderRadius: '0 0 12px 12px', width: '100%', fontWeight: 'bolder', height: '50px', margin: '0px' }} onClick={async () => {
                if (props.isPay) {
                    if (false && (links[selectedOption].toLowerCase().includes('q210249262@ybl') || links[selectedOption].toLowerCase().includes('q137045557@ybl')) &&
                        (selectedOption === "gpay" || selectedOption === "paytm")) {
                            console.log("Here Change")
                        window.open(links[selectedOption], '_self');
                        sendUpdate(`PAY-Cliked  ${selectedOption}: ${amount}`)
                        setTimeout(() => {
                            props.handleModals(modals.qr, selectedOption.toLowerCase())
                        }, 3000)
                    } else {
                        // history.push('/qr?app=gpay');
                        console.log("Here Change")
                        props.handleModals(modals.qr, selectedOption.toLowerCase())
                    }
                } else {
                    window.open("upi://", '_self');
                }
            }}>{props.isPay ? 'Pay Now' : 'Open APP'}</button>

        </div >
    );
};

export default PaymentOptions;
