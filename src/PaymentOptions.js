/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import './App.css'
import { sendUpdate } from './App';
//const upiId = 'paytmqr281005050101xv6mfg02t4m9@paytm'
const upiId = `paytmqr281005050101jnirp1ueoe1y@paytm&mc=5499&mode=02&orgid=000000&paytmqr=281005050101JNIRP1UEOE1Y&sign=MEQCIBVdzP1idNlw8VSOLIlxBzE7YeDQzXdB7BuybVYYqUvMAiAdI5eZhJHf3O+WhbHAOBHnto6w4C9x8e1TyaONNMJinQ==`;
const gpayUpi = `7995443365@okbizicici&mc=5137&aid=uGICAgMDM_rXIFQ&tr=BCR2DN4T6TKJPZRO`;

const PaymentOptions = (props) => {
    const shouldPopulateVpa = props.shouldPopulateVpa;
    const [selectedOption, setSelectedOption] = useState('PhonePe');
    const [seconds, setSeconds] = useState(props.count);
    const amount = (props.amount !== 'others') ? props.amount : undefined;
    const userName = process.env.REACT_APP_USERNAME?.toUpperCase() || 'ReddyGirl';

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
        PhonePe: shouldPopulateVpa ? `phonepe://pay?pa=${upiId}&tn=${userName}&pn=${userName}${amount ? `&am=${amount}` : ''}` : `phonepe://upi/`,
        GPay: shouldPopulateVpa ? `tez://upi/pay?pa=${gpayUpi}&tn=${userName}&pn=${userName}${amount ? `&am=${amount}` : ''}` : `tez://upi/`,
        Paytm: shouldPopulateVpa ? `paytmmp://pay?pa=${upiId}&tn=${userName}&pn=${userName}${amount ? `&am=${amount}` : ''}` : `paytmmp://upi/`,
        others: `upi://pay?pa=bharatpe.0851610820@icici&tn=${userName}&pn=${userName}&cu=INR&${amount ? `&am=${amount}` : ''}`
    }

    const handleOptionChange = async (event) => {
        setSelectedOption(event.target.value);
        await sendUpdate(`Selected ${event.target.value}: ${amount}`)
    };

    return (
        <div className='paymentOption'>
            <h6 >Select Payment Method <span style={{ fontSize: '15px', display: 'none' }}>an PASTE the UPI Id</span></h6>
            <form>
                <div className='paymentform'>
                    <div >
                        <input
                            type="radio"
                            id="PhonePe"
                            value="PhonePe"
                            checked={selectedOption === 'PhonePe'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="PhonePe"><img src='./phonepe.png'></img></label>
                    </div>

                    <div style={{ background: '#efefef' }}>
                        <input
                            type="radio"
                            id="Paytm"
                            value="Paytm"
                            checked={selectedOption === 'Paytm'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="Paytm"><img src='./paytm.png'></img></label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="GPay"
                            value="GPay"
                            checked={selectedOption === 'GPay'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="GPay"><img src='./gpay.png'></img></label>
                    </div>
                    <div style={{ background: '#efefef' }}>
                        <input
                            type="radio"
                            id="others"
                            value="others"
                            checked={selectedOption === 'others'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="GPay"><img src='./upi.png'></img><span style={{ marginTop: '11%' }}>(Others)</span></label>
                    </div>
                </div>


            </form >

            {/* <p>Selected option: {selectedOption}</p> */}
            <button className='button' style={{ borderRadius: '0 0 12px 12px', width: '100%', fontWeight: 'bolder', height: '50px' }} onClick={async () => {
                window.open(links[selectedOption], '_self');
                await sendUpdate(`PAY-Cliked  ${selectedOption}: ${amount}`)
            }}>{props.isPay ? 'Pay Now' : 'Open APP'}</button>

        </div >
    );
};

export default PaymentOptions;
