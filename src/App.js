import pic from './pic.jpg';
import './App.css';

function App() {
  window.location.href = "upi://pay?pa=BHARATPE09897931956@yesbankltd&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP";
  return (
    <div className="App">
      <header className="App-header">
      <a  class="button" type="button" href= "upi://pay?pa=BHARATPE09897931956@yesbankltd&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP">Click Here!!</a>
      </header>
    </div>
  );
}

export default App;
