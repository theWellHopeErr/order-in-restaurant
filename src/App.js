import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainContainer from './components/MainContainer';
import PaymentGateway from './components/PaymentGateway';
import OtpForm from './components/OtpForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/order/:id">
            <PaymentGateway />
          </Route>
          <Route path="/otp">
            <OtpForm />
          </Route>
          <Route path="/">
            <MainContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
