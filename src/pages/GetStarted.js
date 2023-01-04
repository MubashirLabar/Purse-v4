import React,{useState} from 'react';
import Header from "./Header";
import {Link} from "react-router-dom";

function GetStarted(props) {

    const [shopper, setShopper] = useState([
        {name:"Roger Ver", img: "http://placeimg.com/200/200/people", desg:"invester", message: "Bitcoin’s killer app may have arrived in http://www.Crypto Pros.net , Easily get huge savings on goods direct from @amazon."},
        {name:"Michelle Ray", img: "http://placeimg.com/200/200/people", desg:"Crypto-pros user", message: "Just completed my first @Crypto Pros.net order using #ETH. Thanks, @ShapeShift_io!   I am probably way more excited than I should be about this."},
		{name:"@BitcoinBelle", img:"http://placeimg.com/200/200/people", desg:"Crypto-pros user", message: "Using Bitcoin to pay for things is my thing and I can use @Crypto Pros.net to keep my btc in the community of hodlers & get your book. #winning"},
    ])

    return (
        <React.Fragment>
            <Header />
            <div className="get-started rel">
                <div className="head">
                    <div className="wrap flex aic">
                        <div className="left-b flex flex-col">
                            <h2 className="title font b s38">How it all works</h2>
                            <p className="txt font s15">Two ways to take control and pick the savings that works for you.</p>
                            <div className="detail flex">
                                <div className="item flex flex-col">
                                    <div className="meta flex aic">
                                        <div className="icon flex s32"><i className="icon-bolt"></i></div>
                                        <p className="txt fontr s22">Lightning Fast Saving</p>
                                    </div>
                                    <p className="disc font s16">When you set your discount to 5% you can expect the fastest order and delivery times possible. <span className="b6">{global.siteName + " will directly fill and manage these orders."}</span></p>
                                </div>
                                <div className="item flex flex-col">
                                    <div className="meta flex aic">
                                        <div className="icon flex s32"><i className="icon-percent"></i></div>
                                        <p className="txt fontr s22">Name your Own Discount</p>
                                    </div>
                                    <p className="disc font s16">Ready to reach for a deeper deal? Take control and set your discount according to the speed and savings you’d like to see!</p>
                                </div>
                            </div>
                        </div>
                        <div className="right-b c333">
                            <div className="block flex flex-col aic"> 
                                <div className="icon flex">
                                    <img className="img" src={require("../images/shopping-cart.svg")} />								
                                </div>
                                <p className="disc font s15 c333">{"On " + global.siteName + " , when you name your own discount, it is fulfilled by Earners- individuals who wish to exchange their Amazon gift cards for your cryptocurrency. As a shopper, you can reach for deeper discounts by trading delivery speed for savings."}</p>	
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vedio */}
                <div className="media flex">
                    <div className="block">
                        <iframe className="video" src="https://player.vimeo.com/video/375759767" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                    </div>
                </div>
                
                {/* Discount Block */}
                <div className="container flex flex-col">
                    <div className="title"><h2 className="fontr b s24 flex c333">Select a Discount</h2></div>
                    <div className="detail flex">
                        <div className="item flex flex-col aic">
                            <p className="disc font s15 c333">On the final checkout page you control your discount. For the fastest delivery, and to have  directly fill and manage your order, make sure your slider is set to 5% on the left. For more savings, move the slider right until you are satisfied. We'll help you nab the sweetest deal possible.</p>
                            <div className="gif">
                                <img className="img" src={require("../images/slider.gif")} />
                            </div>
                        </div>
                        <div className="r-item">
                            <h2 className="lbl font b s18 c333">Looking for help?</h2>
                            <p className="disc font s14 c333">Don't worry. We've got you. Here's some additional info if you're looking to learn more:</p>
                            <div className="links flex flex-col">
                                <Link to={"/"} className="link noul font b s14">Supported Countries</Link>
                                <Link to={"/"} className="link noul font b s14">Using other Tokens</Link>
                                <Link to={"/"} className="link noul font b s14">Shopper Fees</Link>
                                <Link to={"/"} className="link noul font b s14">Buying Cryptocurrency</Link>
                                <Link to={"/"} className="link noul font b s14">Levels & Limits</Link>
                                <Link to={"/"} className="link noul font b s14">Tracking & Delivery</Link>
                            </div>
                        </div>
                    </div>
                </div> 
                				
				{/*Earner Fulfillment Block*/}
				<div className="container flex flex-col">
					<div className="title"><h2 className="fontr b s24 flex c333">Earner Fulfillment</h2></div>
					<div className="detail flex">
						{/* Left Item */}
						<div className="item flex flex-col aic">
							<p className="disc font s15 c333">After you complete an order above 5%, it is listed on our Earner order books. Earners will exchange their Amazon gift cards your cryptocurrency, and do so by seeking a favorable order and funding it through Crypto-pros. Shortly after an Earner accepts, your tracking info is added to watch-for and confirm delivery.</p>
							<div className="gif graphic">
								<div className="line"></div>
								<div className="box">
									<img className="img" src={require("../images/discount.png")} />
									<p className="lbl font">Name Your Discount</p>
								</div>
								<div className="box">
									<img className="img" src={require("../images/pay.png")} />
									<p className="lbl font">Pay in Crypto to Crypto-pros</p>
								</div>
								<div className="box">
									<img className="img" src={require("../images/cart.png")} />
									<p className="lbl font">Earner Purchases Your Order</p>
								</div>
								<div className="box">
									<img className="img" src={require("../images/box.png")} />
									<p className="lbl font">Your Order Delivered</p>
								</div>
								<div className="box">
									<img className="img" src={require("../images/pay-2.png")} />
									<p className="lbl font">Crypto-pros Transfers Crypto to Earner</p>
								</div>
							</div> 
						</div>
						{/* Right Side Block*/}
						<div className="r-item">
							<h2 className="lbl font b s18 c333">Got Giftcards?</h2>
							<p className="disc font s14">Let's turn those into something much better. Here are some links to learn how!</p>
							<div className="links flex flex-col">
								<Link to={"/"} className="link noul font b s14">Earner 101</Link>
								<Link to={"/"} className="link noul font b s14">Earn Cryptocurrency</Link>
								<Link to={"/"} className="link noul font b s14">Earner Levels</Link>
							</div>
						</div>
					</div>
				</div>

                {/* Start Banner */}
				<div className="start flex flex-col aic">
					<h2 className="lbl font b s32 cfff">Ready to Start?</h2>
					<p className="txt font s16 cfff">You're only one step away from massive savings on Amazon.</p>
					<button className="button btn font b s16 anim">Start Saveing</button>
				</div>

                {/* FQA Atricals Block */}
				<div className="fqa flex flex-col">
					<div className="hd flex aic">
						<h2 className="tit font b s32">FQA</h2>
					</div>
					<div className="content flex">
						<div className="l-blk blk">
							<div className="topic">
								<h2 className="lbl font b">What is Bitcoin? Bitcoin Cash?</h2>
								<p className="txt font">Bitcoin & Bitcoin Cash are digital currency systems that enable a global, borderless financial system for exchanging funds. Bitcoin has strengths focusing on its use as a store of value, while Bitcoin Cash focuses on low-fee peer-to-peer payments. Digital assets disrupt finance in a manner similar to how email changed online communication by letting anyone message directly. At Crypto-pros, we believe that cryptocurrencies like these are the future of online commerce.</p>
							</div>
							<div className="topic">
								<h2 className="lbl font b">Why do I have to pay in Cryptocurrency?</h2>
								<p className="txt font">When you shop on Crypto-pros your order is matched with an Earner. Earners own Amazon giftcards and will complete your order in return for your cryptocurrency. Shoppers enjoy a discount for providing this opportunity while Crypto-pros ensures this process is smooth and frictionless. By paying with cryptocurrency, Shoppers get a discount and Earners cash in their gift cards.</p>
							</div>
							<div className="topic">
								<h2 className="lbl font b">I don't have any Cryptocurrency. Can I still buy on Crypto-pros?</h2>
								<p className="txt font">Unfortunately, no. Without cryptocurrency, Crypto-pros cannot match you with an Earner looking to purchase orders in exchange for coins. If you're ready to start saving and would like to like to acquire some, visit <Link to={global.basePath} className="noul font b color">New to Crypto</Link> and select a local exchange. After purchasing, simply <Link to={global.basePath} className="noul font b color">send some funds over to your Crypto-pros Wallet</Link> and start shopping!</p>
							</div>
							<div className="topic">
								<h2 className="lbl font b">Who is purchasing my Amazon orders for Name Your Discount?</h2>
								<p className="txt font">On Crypto-pros, in addition to shopping, you can earn cryptocurrency by purchasing orders with Amazon giftcards. This is the role of an Earner; Earners purchase orders for shoppers by exchanging their Amazon giftcards for cryptocurrency. Upon confirmation of delivery to the shopper, the Earner receives their cryptocurrency payout. An Earner will often trade their Amazon giftcards for below the USD value of the gift card, this is the discount that is passed on to you. In addition, discounts set to 5% will be filled and managed by Crypto-pros directly.</p>
							</div>
							<div className="topic">
								<h2 className="lbl font b">What is the difference between Buy Now and Name Your Discount?</h2>
								<p className="txt font">Buy Now is an instant 5% savings and best used for purchasing items you wish to receive as fast as possible. Crypto-pros will directly manage and fill these orders. With Name Your Discount, you may set your own discount between 6% and 33%. Name Your Discount waits for an Earner to accept and purchase your order, so it is often used for items you'd like to save big on. Setting your discount too high may mean a longer wait, or that no Earners will accept.</p>
							</div>
						</div>
						<div className="r-blk blk">
							<div className="topic">
								<h2 className="lbl font b">How do I choose the discount rate for Name Your Discount?</h2>
								<p className="txt font">Selecting the discount amount is up to you. Lower discounts often result in faster orders while higher ones may take additional time. We see average discount rates around 15 to 18%, so that may be a good place to start.</p>
							</div>
							<div className="topic">
								<h2 className="lbl font b">How long do I have to wait for an Earner to accept my Name Your Discount order?</h2>
								<p className="txt font">Once you place your Name Your Discount order it will remain on the order books until an Earner decides to accept and purchase your order. The waiting time often depends on the discount you select. For items you wish to receive more quickly, a more competitive discount is suggested.</p>
							</div>
							<div className="topic">
								<h2 className="lbl font b">What happens if no Earners accept my Name Your Discount order?</h2>
								<p className="txt font">Orders will remain listed on the order books until an Earner decides to accept it. If your order is not selected by an Earner as quickly as you'd like, try reducing the discount and re-submitting. You may modify your discount by visiting <Link to={global.basePath} className="noul font b color"> My Orders</Link> and selecting the order you wish to edit. Last, click the 'Modify Order' button and adjust accordingly.</p>
							</div>
							<div className="topic">
								<h2 className="lbl font b">What happens if there is a problem with my Discount?</h2>
								<p className="txt font">If you encounter any problems you can reach us on Crypto Pros.net by using customer support chat (Click on Contact under your Profile), or by contacting us via email: <Link to={global.basePath} className="noul font b color">support@crypto-pros.net</Link></p>
							</div>
							<div className="topic">
								<h2 className="lbl font b">What's the catch?</h2>
								<p className="txt font">There is no catch. Crypto-pros matches Amazon Gift Card holders with Shoppers. Shoppers receive a discount and Earners receive cryptocurrency.</p>
							</div>
						</div>
					</div>
				</div>

                {/* Not Shopping Block */}
				<div className="not-shopping flex flex-col aic">
					<h1 className="font b s32 title">Not Shopping</h1>
					<img src={require("../images/not-shopping.png")} className="img" />
					<h2 className="lbl font b s22">Want to Cash-in your Amazon Giftcards for Bitcoin or Bitcoin Cash?</h2>
					<p className="txt font s16">Earn some by purchasing Shopper's Amazon Wish List</p>
					<Link to={global.basePath} className="button btn noul font b s16 anim cfff">Start Earning</Link>
				</div>

                {/* What our Shopper Say */}
				<div className="shopper flex flex-col aic">
					<h1 className="font b s32 title">What our Shopper Say</h1>
					<div className="users flex aic">
						{shopper.map(e=>{
							return(
								<div className="block flex flex-col">
									<div className="meta flex aic">
										<div  className="dp">
											<div  className="img bl noul" style={{background: "#e2e2e2 url(" + e.img + ") no-repeat center"}} ></div>
										</div>
										<div className="info"> 
											<h5 className="nam font b s18">{e.name}</h5>
											<p className="desg font s16">{e.desg}</p>
											<div className="share font b">Via <i className="ico icon-twitter" /></div>
										</div>
										
									</div>
									<p className="font s16 msg">&quot;{e.message}&quot;</p>
								</div>
							)
						})}
					</div>
				</div>
            </div>
        </React.Fragment>
    );
}

export default GetStarted;