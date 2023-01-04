import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import ShippingMsg from "./subs/ShippingMsg";
import Gtrblock from './subs/Gtrblock';
import CartSideBar from "./CartSideBar";
import {
    getCookie,
    setCookie,
    Dialog
} from "../core";
import $ from "jquery";

function CheckoutProduct(props) {

    const [products, setProducts] = useState(getCookie("__cart") ? JSON.parse(getCookie("__cart")).items : [])
    React.useEffect(()=>{
        products.length == 0 && props.history.goBack();
    }, [])

    return (
        <div className="checkout">
            <div className="wrapper flex">
                {/* Left Side */}
                <div className="left flex flex-col">
                
                    {/* Set your Discount */}
                    <div className="discount flex flex-col">
                        <div className="top-b flex aic">
                            <h1 className="title font b s32 c333">Set Your Discount</h1>
                            <div className="link flex aic">
                                <i className="ico icon-info font s15"></i>
                                <Link to={"/"} className="txt noul font b s16">Learn How it Works</Link>
                            </div>
                        </div>
    
                        <p className="dis font s14">Move the slider to choose a discount. Based on current market conditions, we recommend 10 - 15%.</p>
                        
                        {/* Slider */}
                        <div className="range __ranger rel">
                            <div className="val abs font b anim s22">0%</div>
                        </div>
                        
                        {/* Discount Info Block */}
                        <div className="info flex">
                            <div className="item">
                                <h1 className="lbl font b s22">Buy Now</h1>
                                <p className="txt font">Your order will be managed by Purse, for swift fulfillment</p>
                            </div>
                            <div className="item">
                                <h1 className="lbl font b s22">2 - 4 days</h1>
                                <h5 className="title font b">Estimate Delivery Time</h5>
                                <p className="txt font">Fast 2-day shipping, when it is available.</p>
                            </div>
                            <div className="item">
                                <h1 className="lbl font b s22">$6.50</h1>
                                <h5 className="title font b">Saving</h5>
                                <p className="txt font">Savings off original Amazon price.</p>
                            </div>
                        </div>
                    </div>
                
                    {/* Shopping Cart Items Blcok*/}
                    <div className="cart-list list">
                    {
                        products.map(e=>{
                            return(
                                <div className="block flex">
                                    <div className="media">
                                        <img className="img" src={e.poster.large || e.poster.thumb} />
                                        {e.qty > 1 && <h2 className="cfff qty font b s12">Qty. {e.qty}</h2>}
                                    </div>
                                    <div className="meta flex flex-col">
                                        <p className="lbl font s16 wordwrap">{e.title}</p>
                                        <div className="prices flex">
                                            <div className="price flex flex-col">
                                                <p className="nam font s14">Orignal</p>
                                                <h2 className="rs font b s22 c333">{e.price}</h2>
                                            </div>
                                            <div className="price flex flex-col">
                                                <p className="nam font s14">Your Price</p>
                                                <h2 className="rs font b s22">{e.priceDiscount}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="control flex flex-col aic" onClick={evt=>{
                                        var saved = getCookie("__saved") ? JSON.parse(getCookie("__saved")) : [];
                                        if(saved.findIndex(x=>x.ID == e.ID) == -1){
                                            saved.push(e);
                                            setCookie("__saved", JSON.stringify(saved));
                                            var prods = products;
                                            prods.splice(prods.findIndex(x=>x.ID==e.ID), 1);
                                            var cart = JSON.parse(getCookie("__cart"));
                                            cart.items = prods;															
                                            setCookie("__cart", JSON.stringify(cart));
                                            props.history.goBack();
                                        }
                                    }}>
                                        <button className="save font b s14">Save for later</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                
                {/* Right Side */}
                <CartSideBar calculateDiscount={props.calculateDiscount} parsePrice={props.parsePrice} currency={props.currency} auth={props.isUser} />
                
            </div>
        </div>
    );
}

export default CheckoutProduct;