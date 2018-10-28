import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import truffleContract from "truffle-contract";
import CoinPub from '../../build/contracts/CoinPub.json'
import getWeb3 from '../utils/getWeb3'
var Contract=truffleContract(CoinPub)
class CoinSetup extends Component {
    state = {
      value: 1,
      secondSlider: 50,
      coinName:'',
      coinSym:'',
      web3:'',
      instance:'',
      account:'',
      customership:'',
      governance:'default'
    };

    handleChange2 = (event, index, value) => this.setState({value});

    instantiateContract(web3){
        console.log(web3)
        Contract.setProvider(web3.currentProvider)
        web3.eth.getAccounts((error, Accounts) => {
          Contract.deployed().then((Instance) => {
            console.log(Instance)
            console.log(Accounts)
            this.setState({instance:Instance,account:Accounts},()=>console.log(this.state))
           
           })
         })
    }
      
    
    handleChange = (fieldName, event) => {
      const state = {
        ...this.state,
      };
      state[fieldName] = event.target.value;
      this.setState(state);
      console.log(state)
    };
    handleSecondSlider = (event, value) => {
      this.setState({secondSlider: value});
    };
    componentDidMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.
       console.log(this.props + "props")
       console.log(this.props.location.pathname.slice(14))
        getWeb3
        .then(results => {
          this.setState({
            web3: results.web3
          })
      
          // Instantiate contract once web3 provided.
          this.instantiateContract(results.web3)
        })
        .catch(() => {
          console.log('Error finding web3.')
        })
      }
     

      handleSubmit=()=>{
        let CoinPb=this.state.instance;
        let account=this.state.account[0]
        console.log(account)
        console.log(CoinPb.address)
        console.log(this.state.coinSym)
        console.log(this.state.governance)
        
        CoinPb.createCoinStruct(1,this.state.coinName,this.state.coinSym,"default",{from:account}).then((result)=>{
          console.log(result)
      })
        
        //console.log(result)
      }
    render() {
        return (
            <div className="coin-setup">
                <h2>Coin Setup</h2>
                <div>
                    <div className="coin-inputs">
                      <TextField hintText="Coin Name (i.e. Ether)" onChange={this.handleChange.bind(this,'coinName')} value={this.state.coinName}/><br />
                    </div>
                    <div className="coin-inputs">
                      <TextField hintText="Coin Acronym (i.e. ETH)" onChange={this.handleChange.bind(this,'coinSym')} value={this.state.coinSym}/><br />
                    </div>
                    <div className="public-equity"> 
                        <p>
                            <span>{'Public Equity Offering '}</span>
                            <span className="sub-label">{'Ownership stake that public will be able to buy in coins' }</span>
                            <span className="equity-percentage">{this.state.secondSlider}{' %'}</span>
                        </p>    
                        <Slider
                            min={0}
                            max={100}
                            step={1}
                            value={this.state.secondSlider}
                            onChange={this.handleSecondSlider}
                        />
                    </div>
                    <div className="gov">
                        <p>Governance</p>
                        <SelectField
                        value={this.state.value}
                        onChange={this.handleChange2}
                        >
                            <MenuItem value={'Boardroom Integration'} primaryText="Board Room Integration" />
                            <MenuItem value={'Traditional Equity Based'} primaryText="Traditional Equity Based" />
                        </SelectField>
                        <br />
                    </div>
                  
                </div>
                <Link to="/dashboard">
                  <button type="button"onClick={this.handleSubmit}>Create</button>
                </Link>
            </div>
        )
    }
}

export default CoinSetup;
