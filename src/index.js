import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals.js';
import App from './App.js'
import RegisterNew from './RegisterNew.js'
import SideBar from './SideBar'
import './sidebar.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SideBar></SideBar>
      <div className="App-header">
        <header >
          <Link to="/">
            <h1 style={{ color: "#82ffa5", marginBottom: '5px' }}>
              <img style={{ width: "200px" }} alt='' src='../logo.svg'></img>
            </h1>
          </Link>
        </header >
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/qr">
            <App isQROpen={true} isPaymentModalOpen={false} />
          </Route>
          <Route exact path="/pay-now">
            <App isPaymentModalOpen={true} isQROpen={false} />
          </Route>
          <Route path="/login">
            <RegisterNew heading={"Login as Paid Girl"} others={false} />
          </Route>
          <Route path="/free-demo">
            <RegisterNew heading={"Login for Free Demo"} others={false} />
          </Route>
          <Route path="/register">
            <RegisterNew others={true} />
          </Route>
        </Switch>
      </div>
    </Router> </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
