import React,{useState} from 'react';
import {Link} from "react-router-dom";
import ShippingMsg from "./subs/ShippingMsg";
import Gtrblock from "./subs/Gtrblock";

function CheckoutPayment(props) {

    const [support, setSupport] = useState([
        {
            ID: 1,
            block: "support",
            icon: require("../images/bitcion.svg"),
            label: "Bitcion",
            value: "bitcion"
        },
        {
            ID: 2,
            block: "support",
            icon: require("../images/bitcioncash.svg"),
            label: "Bitcion Cash",
            value: "bitcion-cash"
        },
        {
            ID: 1,
            block: "partners",
            icon: require("../images/ethereum.png"),
            label: "Ethereum",
            value: "ethereum"
        },
        {
            ID: 2,
            block: "partners",
            icon: require("../images/litecion.svg"),
            label: "Litecion",
            value: "litecion"
        },
        {
            ID: 3,
            block: "partners",
            icon: require("../images/Zcash.png"),
            label: "Zcash",
            value: "zcash"
        },
        {
            ID: 4,
            block: "partners",
            icon: require("../images/craditcard.png"),
            label: "Cradit Card",
            value: "cradit-card" 
        },
    ])
    const [timer, setTimer] = useState(15);
    const [dropManue, setDropManue] = useState(false);
    const [gateway, setGateway] = useState("bitcion");
    const [tryAdr, setTryAdr] = useState("back");

    return (
        <div className="payment-p">	
            <div className="wrapper flex">
                {/* Left Side */}
                <div className="left flex flex-col">
                    <div className="had flex aic"> 
                        <h2 className="title font b s30 c333">Complete Payment</h2>
                        {(timer > 0) ?
                            <div className="timer font s15 c333 flex aic">
                                <i className="icon-access_time ico s16" />
                                <span>14:29</span> 
                            </div>
                            : 
                            <div className="timer end font s15 c333 flex aic">
                                <i className="icon-hourglass-3 ico s16" />
                                <span>Timed Out</span> 
                                <i className="icon-circle-o-notch circle" /> 
                            </div>
                        }
                    </div>
                    <div className="content flex flex-col">
                        {/* Payment Method Selector Block */}
                        <div className="method"> 
                            <h5 className="font b s16 c333 label">Payment Method</h5>
                            <button className={"gateway rel flex aic " + (dropManue && "drop")} onClick={()=>setDropManue(!dropManue)}>
                                {
                                    support.map(item=>{
                                        if(gateway == item.value){
                                            return(
                                                <div className="selected flex aic s16" value={item.value}>
                                                    <img src={item.icon} className="img" />
                                                    <h2 className="Bitcion font b lbl">{item.label}</h2>
                                                </div>
                                            )
                                        }else{
                                            return null;
                                        }		
                                    })										
                                } 
                                {gateway == "other-crypto" && <button className={"button other-crypto font s16 c333 " + (gateway == "other-crypto" ? "edit" : "")}>Other Cryptocurrencies</button>}
                                <div className="arrow">
                                    <img src={require("../images/down-arrow-black.svg")} className="img" />
                                </div>
                                {dropManue &&  
                                    <div className="ways flex flex-col abs">
                                        <p className="title font s14 c777">Native Support</p>
                                        {
                                            support.filter(n=>n.block == "support").map(item => {
                                                return (
                                                    <div key={'item-' + item.ID} value={item.value} onClick={()=>setGateway(item.value)} className="item flex aic s16">
                                                        <img src={item.icon} className="img" />
                                                        <h2 className="Bitcion font lbl c333">{item.label}</h2>
                                                        <i className={"ico" + (gateway == item.value ? " icon-check1" : "")}/>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="divider" />
                                        
                                        <p className="title font s14 c777">Purse Partners</p>
                                        {
                                            support.filter(n=>n.block == "partners").map(item => {
                                                return (
                                                    <div key={'item-' + item.ID} value={item.value} onClick={()=> setGateway(item.value)} className="item flex aic s16">
                                                        <img src={item.icon} className="img" />
                                                        <h2 className="Bitcion font lbl c333">{item.label}</h2>
                                                        <i className={"ico" + (gateway == item.value ? " icon-check1" : "") } />
                                                    </div>
                                                )
                                            })    
                                        }
                                        <button className="button other-crypto font s16 c333" onClick={()=> setGateway("other-crypto")}>
                                            Other Cryptocurrencies
                                            <i className={"ico" + (gateway == "other-crypto" ? " icon-check1" : "") } />
                                        </button> 
                                    </div>
                                }
                            </button>
                        </div> 
                        
                        {gateway == "zcash" || gateway == "other-crypto" || gateway == "ethereum" || gateway == "litecion" ?
                            <div className="info">
                                <p className="meta font s16">Please shift Zcash to <span className="font b">0.08441992</span> Bitcoin Cash <span className="font b">(BCH)</span> and send to this address: <span className="font b">1561zeEHRVxLXb8kDpcGJKwYie1SakTX5p</span></p>
                                <a href="https://classic.shapeshift.com" target="_blank" className="z-link font b s16 cfff flex aic noul">
                                    <img className="img" src={require("../images/zcash-icon.svg")} />
                                    <p className="txt">Pay with Zcash using shapeshift</p>
                                </a>
                                <p className="font s13 text">Use Shapeshift to pay with Ethereum, ZCash, Litecoin, and many other leading digital assets.</p>
                            </div>		
                        :
                        gateway == "cradit-card" ?
                            <div className="cradit flex flex-col aic">
                                <p className="lbl font b s16 c333">Need Bitcoin? Quickly purchase some with your credit card.</p>
                                <p className="txt font s14 c333">7.5% fee with $10 minimum will apply.</p>
                                <a className="link" href="https://buy.bitcoin.com/" target="__blank"><img src={require("../images/cradit-banner.png")} className="img" /></a>
                                <p className="msg font s14">Send Bitcoin (BTC) to your Purse wallet address:</p>
                                <div className="code flex aic font b s14"> 
                                    <i className="icon-copy ico" />
                                    <input className="number font b s14" onClick={e=>e.target.select()} value="bitcoincash:qqkdx6vuh0xeetgxu06hhwg04l02erhc8q4srvvz9z" readOnly={true} />
                                </div>
                            </div>
                        :
                            <div className="data flex flex-col aic">
                                <h5 className="msg font b s16">Send Bitcion (BTC) to this Address</h5>
                                <div className="code flex aic font b s14"> 
                                    <i className="icon-copy ico" />
                                    <input className="number font b s14" onClick={e=>e.target.select()} value="bitcoincash:qqkdx6vuh0xeetgxu06hhwg04l02erhc8q4srvvz9z" readOnly={true} />
                                </div>
                                <div className="qr-blk flex">
                                    <div className="qr"></div> 
                                    <div className="icon-question icon rel">
                                        <p className="msg font s13 cfff abs anim">Scan QR code to send funds from a mobile wallet app.</p>
                                    </div>
                                </div>
                                <div className="format flex aic">
                                    { tryAdr == "back" ?
                                        <React.Fragment>
                                            <p className="font s16">Can't send to this address? </p>&nbsp;
                                            <button className="getlin font b s16" onClick={()=> setTryAdr("dfrFormat")}>Try different address format.</button>
                                        </React.Fragment>
                                        :
                                        <div className="change-format flex flex-col aic">
                                            <p className="font s16 note"><span className="font b">Important: </span>Sending any other asset, including Bitcoin Cash (BCH), will result in permanent loss.</p>
                                            <div className="flex aic">
                                                <p className="fontn s16">Switch back to</p>
                                                <button className="getlin font b s16" onClick={()=> setTryAdr("back")}>suggested address format.</button>
                                            </div>
                                        </div>
                                    }									
                                </div>
                                <button className="button open-wallet-btn font b s16 anim flex aic">Open Desktop wallet<i className="icon-external-link icon" /></button>
                            </div>
                        }
                        <div className="crpto-blk flex aic">
                            <div className="left-blk">
                                <div className="tit font b s20">New to Cryptocurrency?</div>
                                <div className="txt font s14">If you’ve never bought cryptocurrency, like Bitcoin or Bitcoin Cash, don’t worry, we’ve got you covered. It’s not hard, but it will take a few days to purchase cheaply. We recommend starting with Coinbase.</div>
                                <a href="https://www.coinbase.com/join/Purse" target="__blank" className="button noul coinbase-btn font b s16 anim flex aic">Start with Coinbase</a>
                            </div>	
                            <div className="right-blk flex flex-col aic">
                                <Link to={"/new-to-carto"} className="font b s16 link">Learn About Crypto</Link>
                                <Link to={"/new-to-carto"} className="font b s16 link">Where To Buy</Link>
                                <img src={require("../images/convert-giftcard.svg")} className="img" />
                            </div> 
                        </div>
                    </div>
                </div>
                    
                {/* Right Side */}
                <div className="cart-right right flex flex-col">
                    <div className="block flex flex-col">	
                        <div className="due flex flex-col aic">
                            <p className="lbl font s14">Total DUE</p>
                            <h2 className="amount font b s22">0.00184543 BTC</h2>
                            <div className="buf font s13 flex aic">
                                <span>Include Buffer</span>
                                <div className="icon-question icon rel">
                                    <p className="msg font s13 cfff abs anim">To protect against market fluctuation.Unused funds are automatically refunded.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="item flex">
                            <p className="txt font">Orignal Price</p>
                            <p className="digit font">$3910.20</p>
                        </div>
                        <div className="item flex">
                            <p className="txt font">Total Saving</p>
                            <p className="digit font">-$195.51</p>
                        </div>
                        <div className="item flex">
                            <p className="txt font">Order Total</p>
                            <p className="digit font b">$3714.69</p>
                        </div>
	
                        {/* User Shipping Address */}
                        <div className="item flex flex-col">
                            <p className="txt font">Shipping To:</p>
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
                        
                        {/*When purchase price lass then $25 */}
                        {<ShippingMsg />}
                                                    
                        {/* Shipping Product */}
                        <div className="ship-pdt">
                            <div className="item flex flex-row">
                                <div className="media">
                                    <img src={require("../images/1.jpg")} className="img" />
                                </div>
                                <div className="meta">
                                    <p className="lbl font s14 wordwrap c333">The Sovereign Individual: Mastering the Transition to the Information</p>
                                    <div className="prices flex">
                                        <strike className="old font b s14">$18.99</strike>
                                        <h5 className="font s16b s14 c333">$18.04</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Guarantee Poster */}
                    <Gtrblock />
                </div>	
            </div>  
        </div>
    );
}

export default CheckoutPayment;