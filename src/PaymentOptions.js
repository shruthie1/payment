/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import './App.css'
const upiId = 'paytmqr281005050101xv6mfg02t4m9@paytm'


const PaymentOptions = (props) => {
    const shouldPopulateVpa = props.shouldPopulateVpa;
    const [selectedOption, setSelectedOption] = useState('Paytm');
    const [seconds, setSeconds] = useState(props.count);

    useEffect(() => {
        if (seconds > 0) {
            const intervalId = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        } else {
            window.open(links[selectedOption], '_self');
        }
    }, [seconds]);

    const links = {
        PhonePe: shouldPopulateVpa ? `phonepe://pay?am=50&pa=${upiId}&tn=Video%20Call%20Demo&pn=ReddyGirl` : `phonepe://upi/`,
        GPay: shouldPopulateVpa ? `tez://upi/pay?am=50&pa=BHARATPE.0851610820@icici&tn=Video%20Call%20Demo&pn=ReddyGirl` : `tez://upi/`,
        Paytm: shouldPopulateVpa ? `paytmmp://pay?am=50&pa=${upiId}&tn=Video%20Call%20Demo&pn=ReddyGirl` : `paytmmp://upi/`,
        others: `upi://pay?pa=BHARATPE.0851610820@icici`
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
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
                        <label htmlFor="GPay"><img src='./upi.png'></img><span style={{ marginTop: '7px' }}>(Others)</span></label>
                    </div>
                </div>


            </form >

            {/* <p>Selected option: {selectedOption}</p> */}
            <Button color='success' style={{ marginTop: '10px', borderRadius: '0 0 12px 12px', width: '100%', fontWeight: 'bolder', height: '50px' }} onClick={() => {
                window.open(links[selectedOption], '_self');
            }}>{props.isPay ? 'Pay Now' : 'Open APP'} ({seconds})</Button>

        </div >
    );
};

export default PaymentOptions;
