import React,{useState} from 'react';
import {Link} from "react-router-dom";
import Header from "./Header";
import Gtrblock from './subs/Gtrblock';
import ShippingMsg from "./subs/ShippingMsg"; 

import {
    getCookie,
    setCookie,
    Dialog
} from "../core";

class CartSideBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            /*products: getCookie("__cart") ? JSON.parse(getCookie("__cart")).items : [],
            saveLater: getCookie("__saved") ? JSON.parse(getCookie("__saved")) : [],
            flag: getCookie("__fl") || "uk",*/
            refresh: 0
        }
        this.refresh = this.refresh.bind(this);
    }

    refresh(){
        this.setState({refresh: this.state.refresh + 1})
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
        //const { flag, products, saveLater } = self.state;

        let products = getCookie("__cart") ? JSON.parse(getCookie("__cart")).items : [];
        let saveLater = getCookie("__saved") ? JSON.parse(getCookie("__saved")) : [];
        let flag = getCookie("__fl") || "uk";

        let orignalPrice = 0;
        for(let i = 0; i < products.length; i++){
            orignalPrice += parseFloat(self.props.parsePrice(products[i].price) * products[i].qty);
        }
        let discountedSum = self.props.calculateDiscount(orignalPrice);

        return (
            <React.Fragment>
                {products.length > 0 && <div className="cart-right right flex flex-col">
                    <div className="block flex flex-col">
                        <div className="item flex">
                            <p className="txt font">Orignal Price</p>
                            <p className="digit font b">{self.props.currency(flag) + orignalPrice.toFixed(2)}</p>
                        </div>
                        <div className="item flex">
                            <p className="txt font">Total Saving</p>
                            <p className="digit font b">-{self.props.currency(flag) + (orignalPrice - discountedSum).toFixed(2)}</p>
                        </div>
                        <div className="item flex">
                            <p className="txt font">Order Total</p>
                            <p className="digit font b">{self.props.currency(flag) + (discountedSum.toFixed(2))}</p>
                        </div>	

                        {/* If Adress is give then display this block */}
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

                        {/* If OrignalPrice is Grater then $25 then display this  Block*/}
                        {discountedSum > 25 && <div className="disc flex aic">
                            <div className="meta">
                                <h1 className="lbl font b s16">Save even more with Name Your Discount.</h1>
                                <p className="txt font s14">Set your rate at checkout</p>
                            </div>
                            <i className="icon-percent ico s22"></i>
                        </div>}
                        {discountedSum <= 25 && <ShippingMsg /> }
                        <Link to={'/checkout/product'} className="button btn noul font b s15 anim">Proceed to Checkout</Link>
                    </div>

                    {/* Guarantee Block */}
                    <Gtrblock />
                </div>}                    
            </React.Fragment>
        )
    }
} 

export default CartSideBar;