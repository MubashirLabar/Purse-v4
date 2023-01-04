import React from 'react';
import { Link } from "react-router-dom";
import Header from "../pages/Header";
 
class Earn extends React.Component{

	constructor(props){
		super(props);
		this.state = { 
			listData: [
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
				{
					flag: require("../images/flags/ca.svg"),
					rate: "37%",
					price: "$23.44",
					bch: "0.07969604",
					shopper: {img: "https://placeimg.com/30/30/arch", name: "Xuan"},
					rating: "915"
				},
			],
			enable: false,
			coin: 'Bitcoin',
			__coins:[
				{name: "Bitcoin", icon: require("../images/bitcion.svg")},
				{name: "Bitcoin Cash", icon: require("../images/bitcioncash.svg")},                
			],
			dropdown: false,
			country: null,
			amount: null,
		}
	}
	
	 
	render(){
		var self = this; 
		const {listData, enable, coin, __coins, dropdown, country, amount} = this.state;
	 
		return (
			<React.Fragment>
				<Header />
				<div className="earn-p">
					{/* Head Page */}
					<div className="head flex aic">
						<div className="block-l flex aic">
							<p className="fontn s15">Market Rate</p>&nbsp;&nbsp;
							<h5 className="fontb s14 cfff">$10,345.00 / BTC</h5>
						</div>
						<div className="block-r flex aic">
							<p className="fontn s15">Learn</p>&nbsp;&nbsp;
							<Link to="/" className="noul lin fontb s14 cfff">Earner 101</Link>
							<Link to="/" className="noul lin fontb s14 cfff">Levels & Limits</Link>
							<Link to="/" className="noul lin fontb s14 cfff">Fees</Link>
						</div> 
					</div>
					<div className="wraper flex flex-col">
						{/* Title Block */}
						<div className="top-head flex flex-col rel"> 
							<button className="label flex aic" onClick={e=>self.setState({dropdown: !dropdown})}>
								<h2 className="lbl fontb s38">Earn <span className="dot">{coin == "Bitcoin" ? "Bitcoin" : "Bitcoin Cash"}</span></h2>
								{coin == "Bitcoin" ? <img src={require("../images/bitcion.svg")} className="img" /> : <img src={require("../images/bitcioncash.svg")} className="img" />}
								<i className="icon-arrow_drop_down ico s38" />
							</button>
							<p className="text fontn s16">Buy orders on Amazon in exchange for Bitcoin or Bitcoin Cash. <Link to="/" className="noul link"> Learn How Earning Works</Link></p>
							
							{dropdown && 
								<div className="coins abs">
									{__coins.map(e =>{
										if(e.name === coin) return null;
										return(
											<button className="item flex aic" onClick={() => self.setState({coin: e.name, dropdown: false})}>
												<h2 className="nam fontn s16">{e.name}</h2>
												<img src={e.icon} className="img" />
											</button>
										)
									})}
								</div>
							}
						</div>
						
						{/* Available Offers List */}
						<div className="offer flex flex-col">
							<div className="hd flex aic">
								<div className="lbl flex aic">
									<p className="nam fontr b  s24 c333">Available Offers</p>
									<i className="icon-loop2 ico s20" />
								</div>
								<div className="actions flex">
									<label className="btn flex aic">
										<button className={"checkbox " + (enable && "icon-check1 check")} onClick={e=>self.setState({enable: !enable})}/>
										<p className="lbl fontb s16">Hide Unavailable </p>
									</label>
									<select className="iput fontn s16 anim" onClick={e=>self.setState({country: e.target.value})}>
										<option value="-1">Filter By Country</option>
										<option value="United States">United States</option> 
										<option value="United Kingdom">United Kingdom</option>
										<option value="Canada">Canada</option>
										<option value="Japan">Japan</option>
									</select> 
									<select className="iput fontn s16 anim" onClick={e=>self.setState({amount: e.target.value})}>
										<option value="-1">Filter By Amount</option>
										<option value="United States">0 - 100 USD</option> 
										<option value="United Kingdom">100 - 500 USD</option> 
										<option value="Canada">500 - 2000 USD</option>
										<option value="Japan">2000+ USD</option>
									</select>  
								</div>	
							</div>
							<div className="list flex flex-col">
								{/* Colums Names */}
								<div className="title flex aic">
									<div className="column-nam flex aic">
										<h5 className="lbl fontb">Country</h5>
									</div>
									<div className="column-nam flex aic">
										<h5 className="lbl fontb">Rate</h5>
										<i className="ico icon-question rel">
											<p className="msg fontn s13 cfff abs anim">% above market rate</p>
										</i>
									</div>
									<div className="column-nam flex aic">
										<h5 className="lbl fontb">Price</h5>
									</div>
									<div className="column-nam flex aic">
										<h5 className="lbl fontb">BCH Amount</h5>
									</div>
									<div className="column-nam flex aic">
										<h5 className="lbl fontb">Shopper</h5>
									</div>
									<div className="column-nam flex aic">
										<h5 className="lbl fontb">Rating</h5>
									</div>
								</div>
								{/* Colums Data */}
								<div className="row-item">
									{listData.map(e=>{
										return(
											<label className="data flex aic">
												<div className="box">
													<div  className="flag">
														<div  className="img bl noul" style={{background: "#e2e2e2 url("+ e.flag +") no-repeat center"}} ></div>
													</div>
												</div>
												<div className="entry rate flex aic">
													<h5 className="lbl fontb c333">{e.rate}</h5>
												</div>
												<div className="entry price flex aic">
													<h5 className="lbl fontn c333">{e.price}</h5>
												</div>
												<div className="entry amount flex aic">
													<h5 className="lbl fontn c333">{e.bch}</h5>
												</div>
												<div className="entry shopper flex aic">
													<div  className="dp">
														<div  className="img bl noul" style={{background: "#e2e2e2 url("+ e.shopper.img +") no-repeat center"}} ></div>
													</div>
													<h5 className="lbl fontn c333">{e.shopper.name}</h5>
												</div>
												<div className="entry stars flex aic s14 rel">
													<i className="ico icon-star-full" />
													<i className="ico icon-star-full" />
													<i className="ico icon-star-full" />
													<i className="ico icon-star-half" />
													<i className="ico icon-star-empty" />
													<h5 className="lbl fontn s12 c333">{e.rating}</h5>
													<i className="frwd icon-arrow_forward_ios s20 abs" />
													{/*<h5 className="fontb">Level up Required</h5>*/}
												</div>
											</label>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}
export default Earn
