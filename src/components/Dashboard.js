import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import CoinPub from '../../build/contracts/CoinPub.json'
import CoinDeployer from '../../build/contracts/CoinDeployer.json'
import Coin from    '../../build/contracts/Coin.json'
import getWeb3 from '../utils/getWeb3'
import './Dashboard.css'
import 'react-datepicker/dist/react-datepicker.css';                 
import DatePicker from 'react-datepicker';
import truffleContract from "truffle-contract";

var CoinPubContract=truffleContract(CoinPub)
var CoinD=truffleContract(CoinDeployer)
var coin=truffleContract(Coin)
class Dashboard extends Component {

    state={
        instance:'',
        web3:'',
        account:'',
        CPbinstance:'',
        FundGoal:'',
        Users:'',
        Amount:'',
        Dec:'',
        start:'',
        end:'',
        DisplayStart:'',
        DistplayEnd:'',
        initialAmount:'',
        CoinID:'',
        CoinInstance:''


            }







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

    instantiateContract(web3){
        console.log(web3)
        web3.eth.getAccounts(async(error, Accounts) => {
        CoinPubContract.setProvider(web3.currentProvider)
        CoinD.setProvider(web3.currentProvider)
        coin.setProvider(web3.currentProvider)
        var CP=await CoinPubContract.deployed()
        var CD=await CoinD.deployed()
        let id=await CP.getQueuedCoin({from:Accounts[0]})
        let Coins=await CP.getCoins(Accounts[0])
        console.log(id)
        console.log(Coins)

        
        if(Coins.length>0){
            let L=Coins.length
            L=L-1
            console.log(Coins[L].c[0])
            let address=await CD.getCoinLocation(Coins)
          
            console.log(address)
            console.log(coin)
            let CoinInst=await coin.at(address)
            console.log(CoinInst)
            this.setState({CoinInstance:CoinInst})
        }
        
       
       
      
       
        console.log(id +"****************************")
         this.setState({CPbinstance:CP,account:Accounts[0],CoinID:id})  

           })
         }
        
         handleStartDate=(data)=>{
            let temp=data.unix()
            this.setState({start:temp})
            this.setState({DisplayStart:data})
            console.log(temp)
            
            }
            handleEndDate=(data)=>{
            
            let temp1=data.unix()
            this.setState({end:temp1})
            this.setState({DisplayEnd:data})
            console.log(temp1)
            
            }
      



    handleChange = (fieldName, event) => {
        const state = {
          ...this.state,
        };
        state[fieldName] = event.target.value;
        this.setState(state);
        console.log(state)
      };


    createCoin=async()=>{
        console.log("sfhsdkjhfshfiudhiushiuhsdfiushifueheiuh")
     let instance=this.state.CPbinstance;
     let account=this.state.account
      //modifyCoinStruct(uint _CoinID,uint _goal,uint _startdate,uint _enddate,uint _eligibleCount,uint _weight, uint _weight2)
      console.log(this.state.FundGoal)
      console.log(this.state.start)
      console.log(this.state.end)
      console.log(this.state.Users)
      console.log(this.state.initialAmount)
    await instance.modifyCoinStruct(this.state.CoinID,this.state.FundGoal,this.state.start,this.state.end,this.state.Users,2,2,this.state.Dec,this.state.initialAmount,{from:account})
    }




    
  render() {

      return (
          <div>
              <div className="top-bar">
                  <p>Current Market Price XXX = $X | 7d avg inflation = -5%</p>
              </div>
              <div className="public-coin">
                  <h2>Public Coin Dashboard</h2>
                  <div className="box-1">
                    <div className="details">
                        <div>
                            <span className="the-name">Current Goal</span>
                            <span className="the-value">(none)</span>
                        </div>
                        <div>
                            <span className="the-name">Funds Raised</span>
                            <span className="the-value">(none)</span>
                        </div>
                        <div>
                            <span className="the-name">Public Coins</span>
                            <span className="the-value">150</span>
                        </div>
                        <div>
                            <span className="the-name">Operating Capital</span>
                            <span className="the-value">150</span>
                        </div>
                    </div>
                    <div className="in-buttons">
                        <input type="text" placeholder="Funding Goal"  onChange={this.handleChange.bind(this,'FundGoal')} value={this.state.FundGoal}/>
                        <input type="text" placeholder="Users To Admit" onChange={this.handleChange.bind(this,'Users')} value={this.state.Users}/>
                        <input type="text" placeholder="inital Amount" onChange={this.handleChange.bind(this,'initialAmount')} value={this.state.initialAmount}/>
                        <input type="text" placeholder="Decimal Units" onChange={this.handleChange.bind(this,'Dec')} value={this.state.Dec}/>
                        <label>
                            
                             <DatePicker
                             placeholder="Start Date"
                             selected={this.state.DisplayStart}
                             onChange={this.handleStartDate}
                             className="myDatePicker"
                             showTimeSelect
                             timeFormat="HH:mm"
                             timeIntervals={15}
                             dateFormat="LLL"
                             timeCaption="time"
                          />
                          </label>
                          <label>
                             
                             <DatePicker
                             placeholder="End Date"
                             selected={this.state.DisplayEnd}
                             onChange={this.handleEndDate}
                             className="myDatePicker"
                             showTimeSelect
                             timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="LLL"
                            timeCaption="time"
                             />
                            </label>
                        <Link to="/user">
                          <button className="last-one" onClick={this.createCoin}>Start Funding Round</button>
                        </Link>
                    </div>
                  </div>
                  <div className="out-buttons">
                      <Link to="/user">
                        <button>View Queue</button>
                      </Link>
                      <button>Configure Regulations</button>
                      <button>Buy Back Coins</button>  
                  </div> 
              </div>
              <div className="equity-ratios">
                  <h2>Equity Ratios</h2>
                  <div className="box-2">
                    <div className="equity-details">
                        <div>
                            <span className="the-name">Founder</span>
                            <span className="the-value">20%</span>
                        </div>
                        <div>
                            <span className="the-name">Co-Founder</span>
                            <span className="the-value">20%</span>
                        </div>
                        <div>
                            <span className="the-name">Public Coins</span>
                            <span className="the-value">15%</span>
                        </div>
                        <div>
                            <span className="the-name">To Be Allocated</span>
                            <span className="the-value">45%</span>
                        </div>
                    </div>
                    <div className="in-button">
                        <button>Add a Partner</button>
                        <button>Send Dividend</button>
                        <button>Allocate Coins</button>
                    </div>
                  </div>
              </div>
          </div>
      )
  }
}
export default Dashboard