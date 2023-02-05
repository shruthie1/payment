/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './App.css'



const PaymentOptions = (props) => {
    const shouldPopulateVpa = props.shouldPopulateVpa;
    const [selectedOption, setSelectedOption] = useState('PhonePe');
    const links = {
        PhonePe: `phonepe://${shouldPopulateVpa ? `pay?am=50&pa=paytmqr281005050101jnirp1ueoe1y@paytm&tn=Video%20Call%20Demo&pn=ReddyGirl` : ''}`,
        GPay: `tez://upi/${shouldPopulateVpa ? `pay?am=50&pa=BHARATPE.0851610820@icici&tn=Video%20Call%20Demo&pn=ReddyGirl` : ''}`,
        Paytm: `paytmmp://${shouldPopulateVpa ? `pay?am=50&pa=paytmqr281005050101jnirp1ueoe1y@paytm&tn=Video%20Call%20Demo&pn=ReddyGirl` : ''}`,
        others: `upi://${shouldPopulateVpa ? `pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm` : ''}`
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='paymentOption' style={{ marginLeft: '0px', marginTop: '0px' }}>
            <h6 >Select Payment option <span style={{ fontSize: '15px', display: 'none' }}>an PASTE the UPI Id</span></h6>
            <form>
                <div className='paymentform'>
                    <div>
                        <input
                            type="radio"
                            id="PhonePe"
                            value="PhonePe"
                            checked={selectedOption === 'PhonePe'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="PhonePe"><img src='./phonepe.png'></img></label>
                    </div>

                    <div>
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
                    <div>
                        <input
                            type="radio"
                            id="others"
                            value="others"
                            checked={selectedOption === 'others'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="GPay"><img src='./upi.png'></img></label>
                    </div>
                </div>


            </form >

            {/* <p>Selected option: {selectedOption}</p> */}
            <Button color='primary' style={{ marginTop: '20px' }} onClick={() => {
                window.open(links[selectedOption], '__self')
            }}>Pay Now</Button>

        </div >
    );
};

export default PaymentOptions;
