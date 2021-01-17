import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

var windowName = 'userConsole'; 
var popUp = window.open("upi://pay?pa=BHARATPE09897931956@yesbankltd&pn= Shruthi Reddy&cu=INR&tn=Shruthi Reddy&tr=APP", windowName, 'width=1000, height=700, left=24, top=24, scrollbars, resizable');
if (popUp == null || typeof(popUp)=='undefined') {  
    alert('Please disable your pop-up blocker and try again.'); 
} 
else {  
    popUp.focus();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
