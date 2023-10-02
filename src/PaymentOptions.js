/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import './App.css'
import { sendUpdate } from './App';
// import profiles, { endpoint } from './profiles';
import { modals, } from './App';
// import { UpiIds } from './upidIds';
const PaymentOptions = (props) => {
    // const shouldPopulateVpa = props.shouldPopulateVpa;
    const [selectedOption, setSelectedOption] = useState('Paytm');
    const [seconds, setSeconds] = useState(props.count);
    const amount = (props.amount !== 'others') ? props.amount : undefined;
    // const userName = profiles[process.env.REACT_APP_USERNAME?.toLowerCase()]?.name.replace('Ms', '') || 'ReddyGirl';
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

    // const links = {
    //     PhonePe: shouldPopulateVpa ? `phonepe://pay?pa=${UpiIds.bpayGen}&tn=${userName}&pn=${userName}&${endpoint}${amount ? `&am=${amount}` : ''}` : `phonepe://upi/`,
    //     GPay: shouldPopulateVpa ? `tez://upi/pay?pa=${UpiIds.gpay}&tn=${userName}&pn=${userName}&${endpoint}${amount ? `&am=${amount}` : ''}` : `tez://upi/`,
    //     Paytm: shouldPopulateVpa ? `paytmmp://pay?pa=${UpiIds.paytm1}&tn=${userName}&pn=${userName}&${endpoint}${amount ? `&am=${amount}` : ''}` : `paytmmp://upi/`,
    //     others: `upi://pay?pa=${UpiIds.defaultId}&tn=${userName}&pn=${userName}&${endpoint}${amount ? `&am=${amount}` : ''}`
    // }

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
                        <label htmlFor="PhonePe"><img src='../phonepe.png'></img></label>
                    </div>

                    <div style={{ background: '#efefef' }}>
                        <input
                            type="radio"
                            id="Paytm"
                            value="Paytm"
                            checked={selectedOption === 'Paytm'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="Paytm"><img src='../paytm.png'></img></label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="GPay"
                            value="GPay"
                            checked={selectedOption === 'GPay'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="GPay"><img src='../gpay.png'></img></label>
                    </div>
                    <div style={{ background: '#efefef' }}>
                        <input
                            type="radio"
                            id="others"
                            value="others"
                            checked={selectedOption === 'others'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="GPay"><img src='../upi.png'></img><span style={{ marginTop: '11%' }}>(Others)</span></label>
                    </div>
                </div>


            </form >

            {/* <p>Selected option: {selectedOption}</p> */}
            <button className='button' style={{ borderRadius: '0 0 12px 12px', width: '100%', fontWeight: 'bolder', height: '50px', margin: '0px' }} onClick={async () => {
                console.log(selectedOption)
                if (props.isPay) {
                    // if (selectedOption !== "GPay" && selectedOption !== "Paytm") {
                    //     window.open(links[selectedOption], '_self');
                    //     await sendUpdate(`PAY-Cliked  ${selectedOption}: ${amount}`)
                    //     setTimeout(() => {
                    //         props.handleModals(modals.qr, 'phonepe')
                    //     }, 3000)
                    // } else {
                    // history.push('/qr?app=gpay');
                    props.handleModals(modals.qr, selectedOption.toLowerCase())
                    // }
                } else {
                    window.open("upi://", '_self');
                }
            }}>{props.isPay ? 'Pay Now' : 'Open APP'}</button>

        </div >
    );
};

export default PaymentOptions;
