import React from 'react';
import Header from "../pages/Header";
import {Link} from "react-router-dom"; 

function WayToEarn(props) {

    return (
        <React.Fragment>
            <Header />
            <div className="earn-way"> 
                <div className="wraper">
                    <div className="section flex flex-col aic">
                        <h2 className="tital fontb s28">Earning Crptocurrency on {global.siteName}</h2>
                        <div className="lbl fontb s20">Earning 101</div>
                        <div className="text font s16">Fulfill Amazon Orders, Earn Bitcoin or Bitcoin Cash</div>
                    
                        <div className="gif graphic flex aic">
                            <div className="line"></div>
                            <div className="box">
                                <img className="img" src={require("../images/pay.png")} />
                                <p className="lbl fontn">Purchase an Order</p>
                            </div>
                            <div className="box">
                                <img className="img" src={require("../images/box.png")} />
                                <p className="lbl fontn">Delivery Confirmed</p>
                            </div>
                            <div className="box">
                                <img className="img" src={require("../images/pay-2.png")} />
                                <p className="lbl fontn">Get Paid in Crptocurrency</p>
                            </div>
                        </div> 
                        <Link to={"/earn"} className="noul btn button fontb s16">Start Earning</Link>
                    </div>
                    
                    {/* Earning Tips */}
                    <div className="content">
                        <div className="tit fontb s24">Earning Tips</div>
                        <ul>
                            <li className="txt fontn s14">After Amazon has processed your Shopper’s order, <span className="b">ensure that you submit all of the tracking numbers for each individual Order ID.</span></li>
                            <li className="txt fontn s14">Once all of the packages have arrived, please give 24-hours for the Shopper to confirm receipt of their order. Pestering a shopper to confirm each individual item repeatedly will result in a bad experience for the Shopper.</li>
                            <li className="txt fontn s14"><span className="b">If at any point Amazon opts to cancel your order, remove an item from it, or delays shipping for any reason, ensure you notify the Shopper whose order your purchasing ASAP of any important details</span> This will ensure the order can be amended, returned to the orderbook and processed as quickly as possible for the Shopper.</li>
                            <li className="txt fontn s14">You can only complete orders based upon your current Earner Level, as you continue to process more orders successfully, the limits for orders you can place will increase.</li>
                            <li className="txt fontn s14">Ensure you submit all order information/tracking #’s as they become available; <span>being polite and patient with users, will increase your likelihood of receiving positive feedback and building a solid reputation</span></li>
                        </ul>
                    </div>
                    
                    {/* Earning Links */}
                    <div className="links">
                        <div className="lbl fontn s16">Earning Quick Links</div>
                        <div className="items flex aic">
                            <a href="" className="link fontb s15 anim">Levels</a>
                            <a href="" className="link fontb s15 anim">Cancellation</a>
                            <a href="" className="link fontb s15 anim">Fees</a>
                            <a href="" className="link fontb s15 anim">Tracking</a>
                            <a href="" className="link fontb s15 anim">Delivery</a>
                            <a href="" className="link fontb s15 anim">Earners 101</a>
                        </div> 
                    </div>  
                </div>
            </div>  
        </React.Fragment>
    );
}

export default WayToEarn;