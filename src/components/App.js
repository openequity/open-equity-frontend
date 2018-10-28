import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import MainComponent from './MainComponent';
import CoinSetup from './CoinSetup';
import Dashboard from './Dashboard';
import User from './User';
import '../styles/App.css';

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <div>
        <Route exact path="/" component={MainComponent}/>
        <Route path="/coinsetup" component={CoinSetup}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/user" component={User}/>
      </div>
    </MuiThemeProvider> 
  </BrowserRouter>
);

export default App;
