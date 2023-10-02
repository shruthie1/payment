import React, { useState } from "react";
import { sendUpdate } from "./App";
import './App.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProfileCard = (props) => {
    const [showPhoneNumber, setShowPhoneNumber] = useState(true);
    const profile = props.profile;
    const { user } = useParams();
    const profileImage = `../${user.replace(/\d/g, '')}.jfif`;
    return (
        <div className='card' style={{
            backdropBlur: '10px',
            borderStyle: "groove",
            margin: '4vh 0px'
        }}>

            <div style={{ display: "flex", padding: "4px" }}>
                <div style={{ width: '35%' }}>
                    <img
                        src={profileImage}
                        alt="Profile"
                        style={{
                            width: "25vw", height: "25vw", borderRadius: "100%", marginTop: '4vw',
                            boxShadow: '0 0 19px 6px #666', border: "1px solid rgb(180 180 180)"

                        }}
                    />
                </div>
                <div style={{ marginLeft: "20px", textAlign: "left" }} className='ptext'>
                    <h3 className="neon" style={{ fontWeight: "bold", fontSize: '4.5vw', color: "rgb(0 255 236)" }}>{profile.name}</h3>
                    <p style={{ marginBottom: '0px', fontSize: '3.5vw' }}>Status:  <span style={{ fontWeight: "bold" }}>Verified</span><img style={{ marginLeft: '5px', width: '5.5vw', marginTop: '-1vw' }} alt="verified batch" src="../tick.png"></img></p>
                    <p style={{ marginBottom: '0px', fontSize: '3.5vw' }}>Age:  <span style={{ fontWeight: "bold" }}>{profile.age}</span></p>
                    <p style={{ marginBottom: '0px', fontSize: '3.5vw' }}>Telegram ID: <span style={{ fontWeight: "bold" }}>{profile.telegram}</span></p>
                    <p style={{ marginBottom: '0px', fontSize: '3.5vw' }}>Location:  <span style={{ fontWeight: "bold" }}>{profile.location}</span><img style={{ marginLeft: '5px', width: '3vw', marginTop: '-1vw' }} alt="Location Icon" src="../location.svg"></img></p>
                    <p style={{ marginBottom: '0px', fontSize: '3.5vw' }}>
                        Phone:{" "}
                        <span style={{ fontWeight: "bold", color: '#cee236' }}>
                            {showPhoneNumber ? "XXX-XXX-XXX" : "PAY to Unlock"}{" "}

                            <span
                                style={{ cursor: "pointer", fontWeight: "bold" }}
                                onClick={async () => {
                                    setShowPhoneNumber(!showPhoneNumber);
                                    await sendUpdate('eyeIcon')
                                }}>
                                {showPhoneNumber ? (

                                    <img alt="view Phone number" className="svg" style={{ width: "3.8vw", marginTop: '-0.8vw' }} src="../eye-slash-fill.svg"></img>
                                ) : (
                                    <img alt="view Phone number" className="svg" style={{ width: "3.8vw", marginTop: '-0.8vw' }} src="../eye-fill.svg"></img>
                                )}
                            </span>
                        </span>
                    </p>
                    {/* <MsgBtnCombo btnName="QR Code"></MsgBtnCombo> */}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
