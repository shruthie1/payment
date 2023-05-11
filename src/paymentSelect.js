import React, { useState } from "react";
import './paymentSelect.css'
import './App.css'
import PaymentOptions from './PaymentOptions';

const PaymentSelect = (props) => {
    const [selectedOption, setSelectedOption] = useState("50");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div >
            <div className="card" style={{ padding: '0px', minWidth: '90%' }}>
                <div className="card-body" style={{ padding: '0px', width: "100%" }}>
                    <h6 className="card-title paymentSelectTitle">Select Service</h6>
                    <form className="paymentSelect">
                        <div className='selectAmountForm'>
                            <div>
                                <input
                                    type="radio"
                                    id="50"
                                    value="50"
                                    checked={selectedOption === '50'}
                                    onChange={handleOptionChange}
                                />
                                <label htmlFor="50">50₹ Video Call</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="25"
                                    value="25"
                                    checked={selectedOption === '25'}
                                    onChange={handleOptionChange}
                                />
                                <label htmlFor="25">25₹ Demo Pics</label>
                            </div>
                            <div >
                                <input
                                    type="radio"
                                    id="others"
                                    value="others"
                                    checked={selectedOption === 'others'}
                                    onChange={handleOptionChange}
                                />
                                <label htmlFor="others"><span>Other Service</span></label>
                            </div>
                        </div>


                    </form >
                </div>
                <div style={{ margin: '5%' }}>
                    <PaymentOptions shouldPopulateVpa={true} handleModals={props.handleModals} isPay={true} amount={selectedOption} count={15}></PaymentOptions>
                </div>
            </div>
        </div>

    );
};

export default PaymentSelect;
