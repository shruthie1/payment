/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './App.css'

const links = {
    PhonePe: `intent://send/sk18s@paytm#Intent;scheme=phonepe;package=com.phonepe.app;end`,
    GPay: 'tez://upi/pay?pa=sk18s@paytm&pn=RamyaReddy&tr=11426866303',
    Paytm: `intent://paytm/#Intent;scheme=paytmmp;package=net.one97.paytm;S.browser_fallback_url=https%3A%2F%2Fpaytm.com;S.vpa=sk18s@paytm;end`,
    others: 'upi://pay?pa=sk18s@paytm'
}

const PaymentOptions = () => {
    const [selectedOption, setSelectedOption] = useState('PhonePe');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='paymentOption' style={{ marginLeft: '0px', marginTop: '10px' }}>
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
            <Button color='success' onClick={() => {
                window.open(links[selectedOption], '__self')
            }}>Pay Now</Button>

        </div >
    );
};

export default PaymentOptions;