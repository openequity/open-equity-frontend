import React, { Component } from 'react'
import CoinPub from '../build/contracts/CoinPub.json'
import CoinDeployer from  '../build/contracts/CoinDeployer.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address:'',
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {

      this.setState({
        web3: results.web3
      },console.log(results.web3))

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  instantiateContract=()=> {

    const contract = require('truffle-contract')
    const CPub= contract(CoinPub)
    const CDeploy=contract(CoinDeployer)
    CPub.setProvider(this.state.web3.currentProvider)
    CDeploy.setProvider(this.state.web3.currentProvider)
    // Declaring this for later so we can chain functions on SimpleStorage.
    var coinpubInstance
    var coinInstance
    var PubAddress
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
     CPub.deployed().then((instance) => {
        coinpubInstance = instance
        PubAddress=instance.address
        console.log(PubAddress)
        // Stores a given value, 5 by default.
        return coinpubInstance.createCoinStruct(1,"MYCoin","BK","boardroom",{from:accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return coinpubInstance.modifyCoinStruct(1,100,2,4,300,10,10,{from:accounts[0]})
      }).then((result) => {
        // Update state with the result.
        return coinpubInstance.publishCoin(1,18,100000000000000, 100000 ,{from:accounts[0]})
      }).then((result) => {
        console.log(result)
        CDeploy.deployed().then((instance) => {
           coinInstance = instance
           return coinInstance.getCoinLocation(PubAddress ,{from:accounts[0]})
         }).then((result)=>{
           console.log(result)
           this.setState({address:result})
         })
    })

  })
}

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>a coin should be deployed at {this.state.address}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
