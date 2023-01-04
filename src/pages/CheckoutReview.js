import React from 'react';
import {Link} from "react-router-dom";

import ShippingMsg from "./subs/ShippingMsg";
import Gtrblock from "./subs/Gtrblock";

function CheckoutReview(props) {
    return (
        <div className="review-p">			
            <div className="wrapper flex">
                {/* Left Side */}
                <div className="left flex flex-col">
                    <h2 className="title font b s32 c333">Review Order</h2>
                    <div className="cart-list flex flex-col">
                        <div className="block flex">
                            <div className="media">
                                <img className="img" src={require("../images/1.jpg")} />
                            </div>
                            <div className="meta flex flex-col">
                                <p className="lbl font s16 wordwrap">The Sovereign Individual: Mastering the Transition to the Information</p>
                                {/*<div className="fast flex aic">
                                    <i className="ico icon-truck font24"></i>
                                    <h5 className="txt font b s14">Fast Shipping</h5>
                                </div>*/}
                                <div className="prices flex">
                                    <div className="price flex flex-col">
                                        <p className="nam font s14">Orignal</p>
                                        <h2 className="rs font b s22">$18.99</h2>
                                    </div>
                                    <div className="price flex flex-col">
                                        <p className="nam font s14">Your Price</p>
                                        <h2 className="rs font b s22">$1238.23</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="block flex">
                            <div className="media">
                                <img className="img" src={require("../images/3.jpg")} />
                            </div>
                            <div className="meta flex flex-col">
                                <p className="lbl font s16 wordwrap">The Sovereign Individual: Mastering the Transition to the Information</p>
                                <div className="prices flex">
                                    <div className="price flex flex-col">
                                        <p className="nam font s14">Orignal</p>
                                        <h2 className="rs font b s22">$18.99</h2>
                                    </div>
                                    <div className="price flex flex-col">
                                        <p className="nam font s14">Your Price</p>
                                        <h2 className="rs font b s22">$1238.23</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
                {/* Right Side */}
                <div className="cart-right flex flex-col">
                    <div className="block flex flex-col">
                        <div className="item flex">
                            <p className="txt font">Orignal Price</p>
                            <p className="digit font b">$3910.20</p>
                        </div>
                        <div className="item flex">
                            <p className="txt font">Estimated Tax</p>
                            <p className="digit font b color">-2.51</p>
                        </div>
                        <div className="item flex">
                            <p className="txt font">Total Saving</p>
                            <p className="digit font b green">-$195.51</p>
                        </div>
                        <div className="item flex">
                            <p className="txt font">Order Total</p>
                            <p className="digit font b">$3714.69</p>
                        </div>
                        <React.Fragment> 
                            <div className="item flex flex-col">
                                <p className="txt font n">Shipping To:</p>
                                <div className="meta">
                                    <h2 className="tt font b s16 c333">Mubashir Labar</h2>
                                    <p className="tt font s15 c333">us U.S. Route 66 U.S. Route 66 U.S. Route 66</p>
                                    <p className="tt font s15 c333">us U.S. Route 66</p>
                                    <div className="text font s15 c333">
                                        <span>Multan</span>,&nbsp;
                                        <span>Punjab</span>,&nbsp;
                                        <span>66000</span>
                                    </div>	
                                    <p className="tt font s14 c333">03080059035</p>
                                </div>
                            </div>
                            <div className="hr" />
                        </React.Fragment>
                        {/* Extra Fund Block */}
                        <div className="fund flex flex-col">
                            <p className="lbl font s14">Optional</p>	
                            <div className="data flex aic">
                                <h5 className="txt font b s15 c333">Extra Funds &nbsp;&nbsp; $</h5>
                                <input className="iput font b s16" type="text" placeholder="0" />
                                <div className="icon-question icon rel">
                                    <p className="msg font s13 cfff abs anim">If you know your order price is incorrect, add extra funds. Will be added to order as a shipping cost.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/*When purchase price lass then $25 */}
                        {<ShippingMsg />}
                                                                                
                        <Link to={"/checkout/payment"} className="button btn noul font b s16 anim" >Proceed to Payment</Link> 		
                    </div>
                    
                    {/* Guarantee Poster */}
                    <Gtrblock />
                </div>	 
            </div>  
        </div>
    );
}

export default CheckoutReview;