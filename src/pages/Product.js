import React, { Fragment, useState, useEffect } from 'react';
import {
    Loader
} from "../ui";
import { me, randRange } from "../core";
import { Link } from "react-router-dom";
import $ from "jquery";
import {
    getCookie,
    setCookie
} from "../core";
import Header from "./Header";
import Account from "./Account";
import Footer from "./Footer";
import config from "../config";

const { base } = config;

class Product extends React.Component{

    constructor(props){
		super(props);
		this.state = {
			loading: true,
			page: 1,
			limit: 1,
			color: null,
			style: null,
			viewCart: false,
			flag: this.props.match.params.cc.toLowerCase(),
			query: this.props.match.params.pc,
			product: null
		}
    }
    
    componentDidMount(){
        var self = this;
        const { flag, query } = self.state;
		self.props.search(flag, query, 1, 1, [], items => {
			var __cart = getCookie("__cart") ? JSON.parse(getCookie("__cart")).items : [];
            self.setState({ 
				product: items[0],
				loading: false,
				viewCart: __cart.length > 0 && __cart.findIndex(x=>x.ID == items[0].ID) > -1
			});
        });
    }    

    search(){
        var self = this;
        if(self.searching) return;
		self.searching = true;
        const { list, query, flag, page, limit } = self.state;
        self.props.search(flag, query, page, limit, list, items => {
            self.searching = false;
            self.canLoadMore = items.length > 0;            
            self.setState({ list: items.length > 0 ? items : list, loading: false });
        });
    }
    
    toCart(){
		var self = this,
		cart = getCookie("__cart") ? JSON.parse(getCookie("__cart")) : {token: -1, items: []},
		product = self.state.product;
		if(cart.items.findIndex(x=>x.ID == product.ID) == -1){
			product.qty = 1;
			cart.items.push(product);
			setCookie("__cart", JSON.stringify(cart));
		}
		self.setState({viewCart: true});		
    }
    

    holder(){
		
		var self = this;
		
		return (
            <div className="wrap flex">
                {/* left side */}
                <div className="l-side flex flex-col aic rel">
                    <div className="media placeholder" />					
                </div>
                
                {/* Right Side */} 
                <div className="r-side r--side flex flex-col">
                    <h2 className="title placeholder" />					
                    <h5 className="vendor placeholder" />
                    <div className='meta flex aic'>
                        <div className="price placeholder" />
                        <div className="discount placeholder" />							
                    </div>															
                </div>				
            </div>            
		)
    }

    view(){
		
		var self = this;
		if(null == this.state.product) return null;
		const { color, style, viewCart } = this.state;
		const { ID, flag, title, price, rating, category, reviewCount, isDigital, poster } = this.state.product;
		
		return (
			<React.Fragment>
				<div className="wrap flex">
					{/* left side */}
					<div className="l-side flex flex-col aic rel">
						<div className="media"><img className="image  pointer"
							onClick={()=>{
                                /*MessageBox(
									"",
									<a href="javascript" className="product-img abs abc"><img className="img" src={poster.large || poster.thumb}/></a>,
									{
										label: "cancel"
									}
                                )*/
                            }} 
							src={poster.large || poster.thumb}/>
						</div>
						<div className="share abs">
							<p className="txt font s15">Share With</p>
							<Link to={"https://www.facebook.com/zuz.com.pk"} className="ico icon-facebook noul anim s24"></Link>
							<Link to={"https://www.twitter.com/kamranwajdani"} className="ico icon-twitter noul anim s24"></Link>
						</div>
					</div>
					
					{/* Right Side */} 
					<div className="r-side flex flex-col">
						<h2 className="title fontr s26 c333">{title}</h2>
						<div className="hd flex">
							<div className="fast flex aic">
								<i className="ico icon-truck font24"></i>
								<h5 className="txt font b s14">Fast Shipping</h5>
							</div>
							<div className="reviews flex aic font s16">
								{rating > 0 && <React.Fragment>
								<i className="icon-star-full star"></i>
								<i className="icon-star-full star"></i>
								<i className="icon-star-full star"></i>
								<i className="icon-star-full star"></i>
								<i className="icon-star-half star"></i>
								<h5 className="points font b">{rating}</h5></React.Fragment>}							
								{reviewCount > 0 && <Link to={"/"} className="num noul font b s16">{reviewCount} Reviews</Link>}
							</div>
						</div>
						<h5 className="vendor font s16">Fulfilled by Amazon</h5>					
						<div className='meta flex aic'>
							 <div className="price">
								<h2 className="amount font b s28">{price}</h2>
								<div className="seller flex aic font s16">
									<p className="nam font">Amazon price</p>
									<strike className="rs">{price}</strike>
								</div>
							 </div>
							 <div className="discount">
								<div className="title flex aic">
									<i className="icon-percent ico s22"></i>
									<p className="lbl font b s15">Save even more with Name Your Discount.</p>
								</div>
								<p className="txt font s14">Set your rate at checkout.</p>
							 </div>
						</div>
						{/*Input Feilds */}
						<div className="item flex flex-col">
							<label className="lbl font b s16 c333">Color:</label>
							<select className={"input font s16 anim " + (viewCart == false && color == null &&  "has-error")} name="color" ref={ref=>(self.color = ref)} onChange={(e)=>{self.setState({color: e.target.value})}}>
								<option value="-1">Select Option</option>
								<option value="Green">Green</option>
								<option value="Black">Back</option>
								<option value="Red">Red</option>
							</select>  
						</div> 
						<div className="item flex flex-col">
							<label className="lbl font b s16 c333">Style Name:</label>
							<select className={"input font s16 anim " + (viewCart == false && style == null &&  "has-error")} name="color" ref={ref=>(self.style = ref)} onChange={(e)=>{self.setState({style: e.target.value})}}>
								<option value="-1">Select Option</option>
								<option value="Crosshair .308">Crosshair .308</option> 
								<option value="Crosshair .308 option limited">Crosshair .308 option limited</option>
							</select> 
						</div>
						<button className={"button btn font b s16 amim flex aic cfff "} disabled={viewCart} onClick={()=>(self.toCart())}><div className="s18 icon icon-check1"/><h2 className="b">Add to cart</h2></button>
						{viewCart && <Link to={"/cart"} className="button noul btn font b s16 anim cfff " onClick={()=>(self.toCart())}>View Cart</Link>}
										 	
					</div>				
				</div>
			
				{/* Product Discription */}
                <div className="wrap flex">
                    <div className="discrp flex">
                        <div className="leftside flex flex-col">
                            <h5 className="title fontr b s22">Product Description</h5>
                            <p className="txt font s15">Includes 1 Flattop Adapter for Military style Rail (TA51) 1 3.5x35 Scopecoat (TA63) 1 Large sized Pelican Case (TA89) 1 Lenspen (LENSPEN) 1 Trijicon Logo Sticker (PR15) 1 ACOG Manual 1 Warranty Card</p>
                        </div>
                        <div className="rightside flex">
                            <button className="item noul flex aic" 
                                onClick={ ()=>{
                                    /*MessageBox(
                                        "",
                                        <Report />, 
                                        {
                                            label: "cancel"
                                        }
                                    )*/
                                }}>
                                <i className="icon-flag ico font b s15"></i>
                                <p className="nam font b s16">Report</p>
                            </button>
                            <a href={"https://www.amazon.com/dp/" + ID} target="_blank" className="item noul flex aic">
                                <i className="icon-eye ico font b s19"></i>
                                <p className="nam font b s16">View on Amazon</p>
                            </a>
                        </div>
                    </div>
                </div>
			</React.Fragment>
		)
	}
    
    

    
    

    render(){

        var self = this;
		const { loading, product } = this.state;
		
		return(
            <React.Fragment>
                <Header />
                <div className='product-detail'>
                    {loading ? self.holder() : self.view()}
                </div>
            </React.Fragment>
		)
    }
}

export default Product;