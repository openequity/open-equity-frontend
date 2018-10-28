import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Dashboard extends Component {














    
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
                        <input type="text" placeholder="Funding Goal" />
                        <input type="text" placeholder="Users To Admit" />
                        <input type="text" placeholder="Amount" />
                        <input type="text" placeholder="Sale Start" />
                        <input type="text" placeholder="Sale End" />
                        <Link to="/user">
                          <button className="last-one">Start Funding Round</button>
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