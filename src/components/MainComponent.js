import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import CoinSetup from './CoinSetup';
import Footer from './Footer';
import '../styles/App.css';

class MainComponent extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-first">
          <div className="img-div">
            <img src={ require('../images/main.jpg') } />
          </div>

          <p>DIY Self Funding Through Blockchain</p>
          <button>
            <Link to={{pathname:'/coinsetup'}}>Create Your Coin</Link>
          </button>
        </div>
        <div className="App-second">
          <div className="App-sub-second">
            <img src={ require("../images/coins (2).png") } />
            <p>Create your Book Pub coin</p>
          </div>
          <div className="App-sub-second">
            <img src={ require("../images/investment.png") } />
            <p>Users purchase coins to receive book and as investment</p>
          </div>
          <div className="App-sub-second">
            <img src={ require("../images/money.png") } />
            <p>You get money to publish your book</p>
          </div>
          <div className="App-sub-second">
            <img src={ require("../images/pie-chart.png") } />
            <p>Investors get portion of future sales & deals</p>
          </div>
        </div>
        {/* <Footer /> */}
          <Route path="/coinsetup" component={CoinSetup}/>
      </div>

    );
  }
}

export default MainComponent;
