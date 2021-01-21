import pic from './pic.jpg';
import './App.css';

function App() {

  window.open( "upi://pay?pa=bharatpe.0851610820@icici&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP","_self")

  return (
    <div className="App">
      <header className="App-header">
      <a  id="myButton" className="button" type="button" href= "upi://pay?pa=bharatpe.0851610820@icici&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP" target="_blank" rel="noopener noreferrer">Click Here!!</a>
      </header>
    </div>
  );
}

export default App;
