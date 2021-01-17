import pic from './pic.jpg';
import './App.css';

function App() {
  window.onload = function(){
    document.getElementById('clickButton').click();
  }

  return (
    <div className="App">
      <header className="App-header">
      <a  id="clickButton" className="button" type="button" href= "upi://pay?pa=BHARATPE09897931956@yesbankltd&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP">Click Here!!</a>
      </header>
    </div>
  );
}

export default App;
