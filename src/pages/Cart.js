import React,{useState} from 'react';
import {Link} from "react-router-dom";
import Header from "./Header";
import CartSideBar from "./CartSideBar";

import {
    getCookie,
    setCookie,
    Dialog
} from "../core";

class Cart extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            products: getCookie("__cart") ? JSON.parse(getCookie("__cart")).items : [],
            saveLater: getCookie("__saved") ? JSON.parse(getCookie("__saved")) : [],
            flag: getCookie("__fl") || "uk"
        }
    }
    
    removeItem(item){
        var self = this,
        prods = self.state.products;
        prods.splice(prods.findIndex(x=>x.ID == item.ID), 1);
        var cart = JSON.parse(getCookie("__cart"));
        cart.items = prods;
        setCookie("__cart", JSON.stringify(cart));
        self.setState({products: prods});
    }

    render(){

        var self = this;
        const { flag, products, saveLater } = self.state;

        let orignalPrice = 0;
        for(let i = 0; i < products.length; i++){
            orignalPrice += parseFloat(self.props.parsePrice(products[i].price) * products[i].qty);
        }
        let discountedSum = self.props.calculateDiscount(orignalPrice);

        return (
            <React.Fragment>
                <Header />
                <div className="cart-p">
                    <div className="wrapper flex">
                        <div className="left flex flex-col"> 
                            {(products.length > 0 || saveLater.length > 0) && <h1 className="title font b s32 c333">Shopping Cart</h1>}
                            <div className="cart-list">
                            {
                                products.length == 0 && <div className="empty-cart flex flex-col">
                                    <img src={require("../images/shopping-cart.svg")} className="basket" />
                                    <p className="msg font s16">Bummer. Your cart is empty.</p>
                                    <p className="msg font s16">Discover <Link to={"/"} className="link noul font b color">curated products</Link></p>
                                </div>
                            }
                            { 
                                products.map(e=>{
                                    return(
                                        <div className="block flex">
                                            <div className="media">
                                                <img className="img" src={e.poster.large || e.poster.thumb} />
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
                                            <div className="control flex flex-col aic">
                                                <div className="btns flex">
                                                    <button className="btn minus font anim flex" onClick={evt=>{
                                                        var prods = products,
                                                        prod = prods[prods.findIndex(x=>x.ID == e.ID)];
                                                        prod.qty -= 1;
                                                        if(prod.qty > 0){
                                                            var cart = JSON.parse(getCookie("__cart"));
                                                            cart.items = prods;
                                                            setCookie("__cart", JSON.stringify(cart));
                                                            self.setState({products: prods}, () => {
                                                                self.sidebar.refresh();
                                                            });
                                                        }else{
                                                            if(window.confirm("Do you want to remove this item?")){
                                                                self.removeItem(e);
                                                                self.sidebar.refresh();
                                                            }                                                            
                                                        }
                                                    }}><span className="bit icon-minus flex font s11"></span></button>
                                                    <div className="qty font b s16 flex aic">{e.qty}</div>
                                                    <button className="btn plus font anim flex" onClick={evt=>{
                                                        var prods = self.state.products,
                                                        prod = prods[prods.findIndex(x=>x.ID == e.ID)];
                                                        prod.qty += 1;
                                                        var cart = JSON.parse(getCookie("__cart"));
                                                        cart.items = prods;
                                                        setCookie("__cart", JSON.stringify(cart));
                                                        self.setState({products: prods}, ()=>{
                                                            self.sidebar.refresh();
                                                        });
                                                    }}><span className="bit icon-plus flex font s11"></span></button>
                                                </div>
                                                <button className="save font font b s14" onClick={evt=>{
                                                    var saved = getCookie("__saved") ? JSON.parse(getCookie("__saved")) : [];
                                                    if(saved.findIndex(x=>x.ID == e.ID) == -1){
                                                        saved.push(e);
                                                        setCookie("__saved", JSON.stringify(saved));
                                                        
                                                        var prods = self.state.products;
                                                        prods.splice(prods.findIndex(x=>x.ID==e.ID), 1);
                                                        var cart = JSON.parse(getCookie("__cart"));
                                                        cart.items = prods;															
                                                        setCookie("__cart", JSON.stringify(cart));
                                                        self.setState({products: prods, saveLater: saved}, () => {
                                                            self.sidebar.refresh();
                                                        });								
                                                    }
                                                }}>Save for later</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            
                            {/* Shipping Block */} 
                            {(products.length > 0 || saveLater.length > 0) && <div className="shipping flex">
                                <div className="block flex flex-col">
                                    <h1 className="head font b s16">Shipping Outside of the United States?</h1>
                                    <i className="icon-global ico font b s32"></i>
                                    <p className="lbl font s14">Learn How:</p>
                                    <Link to={"/"} className="link noul font b s16">Import an international Wish List    »</Link>
                                </div>
                            </div>}

                            {/* Save for Later */}
                            {saveLater.length > 0 && <div className="later">
                                <h1 className="title ltr-lbl fontr b6 s18 c333">Saved For Later</h1>
                                <div className="cart-list">
                                { 
                                    saveLater.map(e=>{
                                        return(
                                            <div className="block flex">
                                                <div className="media">
                                                    <img className="img" src={e.poster.large || e.poster.thumb} />
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
                                                <div className="control flex flex-col aic">
                                                    <div className="btns latesave flex flex-col aic">
                                                        <button className="btn font b s15 anim flex" onClick={evt=>{
                                                            var prods = self.state.products;
                                                            if(prods.findIndex(x=>x.ID == e.ID) == -1){
                                                                prods.push(e);									
                                                                var saved = self.state.saveLater;
                                                                saved.splice(saved.findIndex(x=>x.ID == e.ID), 1);
                                                                setCookie("__saved", JSON.stringify(saved));
                                                                var cart = JSON.parse(getCookie("__cart"));
                                                                cart.items = prods;
                                                                setCookie("__cart", JSON.stringify(cart));
                                                                self.setState({products: prods, saveLater: saved});
                                                            }
                                                        }}>Move to cart</button>
                                                        <button className="btn font b s15 anim flex" onClick={evt=>{
                                                            var saved = getCookie("__saved") ? JSON.parse(getCookie("__saved")) : [],
                                                            inx = saved.findIndex(x=>x.ID == e.ID);
                                                            if(inx > -1){
                                                                saved.splice(inx, 1);
                                                                setCookie("__saved", JSON.stringify(saved));
                                                                self.setState({saveLater: saved});
                                                            }
                                                        }}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>}
                        </div>

                        {/* Wrapper Right Side */}
                        <CartSideBar ref={ref=>(self.sidebar=ref)} calculateDiscount={self.props.calculateDiscount} parsePrice={self.props.parsePrice} currency={self.props.currency} auth={self.props.isUser} />
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
} 

export default Cart;