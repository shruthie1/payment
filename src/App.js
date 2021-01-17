import pic from './pic.jpg';
import './App.css';
import {useEffect} from 'react'

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <meta httpEquiv = "refresh" content = "0; url = upi://pay?pa=BHARATPE09897931956@yesbankltd&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP" />
      <a  className="button" type="button" href= "upi://pay?pa=BHARATPE09897931956@yesbankltd&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP">Click Here!!</a>
      </header>
    </div>
  );
}

export default App;
