import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Header from "../pages/Header";
import $ from "jquery";
import 'slick-carousel/slick/slick';

function Learn(props) {

    const [shopper, setShopper] = useState([
        {name:"Roger Ver", img: "http://placeimg.com/200/200/people?1", desg:"invester", message: "Bitcoin’s killer app may have arrived in http://www.Crypto Pros.net , Easily get huge savings on goods direct from @amazon."},
        {name:"Michelle Ray", img: "http://placeimg.com/200/200/people?2", desg:"Crypto-pros user", message: "Just completed my first @Crypto-pros order using #ETH. Thanks, @ShapeShift_io!   I am probably way more excited than I should be about this."},
        {name:"@BitcoinBelle", img:"http://placeimg.com/200/200/people?3", desg:"Crypto-pros user", message: "Using Bitcoin to pay for things is my thing and I can use @Crypto-pros to keep my btc in the community of hodlers & get your book. #winning"},
        {name:"@BitcoinBelle", img:"http://placeimg.com/200/200/people?4", desg:"Crypto-pros user", message: "Using Bitcoin to pay for things is my thing and I can use @Crypto-pros to keep my btc in the community of hodlers & get your book. #winning"},
        {name:"@BitcoinBelle", img:"http://placeimg.com/200/200/people?5", desg:"Crypto-pros user", message: "Using Bitcoin to pay for things is my thing and I can use @Crypto-pros to keep my btc in the community of hodlers & get your book. #winning"},
        {name:"@BitcoinBelle", img:"http://placeimg.com/200/200/people?6", desg:"Crypto-pros user", message: "Using Bitcoin to pay for things is my thing and I can use @Crypto-pros to keep my btc in the community of hodlers & get your book. #winning"},
    ])

    useEffect(() => {
		$('.items-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
		});
		$('.shopper-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 3,
			autoplaySpeed: 5000,
        });
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className="learn-p"> 
                {/* top Section */}
                <div className="poster flex rel aic">
                    <div className="graphic flex">
                        <div className="meta flex flex-col">
                            <img src={require("../images/crypto-coins.svg")} className="img" />
                            <div className="title  font b s32 cfff">Why Use Cryptocurrency?</div>
                            <h3 className="font s22 cfff lbl">We’re glad you asked.</h3>
                            <p className="font s16 cfff txt">Bitcoin and Bitcoin Cash are a border-less, fast, and universal currency. No banks, low fees, entirely country-less, no forms. The same way the internet revolutionized how we communicate, cryptocurrencies are revolutionizing how we trust & transact.</p>
                            <h5 className="font b s16 cfff">Plus, it's growing fast and gaining value!</h5>
                        </div>
                    </div>
                </div>

                {/* Crypto Features */}
                <div className="features flex">
					<h3 className="lbl fontb s16 c333">Crypto Features</h3>
					<div className="block rel"> 
						<div className="items items-slider ">
							<div className="blk flex aic">
								<img src={require("../images/bitcoin-features-01.png")} className="img" />
								<p className="txt fontn s13">Borderless<br/>Ecommerce</p>
							</div>
							<div className="blk flex aic">
								<img src={require("../images/bitcoin-features-02.png")} className="img" />
								<p className="txt fontn s13">Permissionless<br/>Innovation</p>
							</div>
							<div className="blk flex aic">
								<img src={require("../images/bitcoin-features-03.png")} className="img" />
								<p className="txt fontn s13">Secured By<br/>Cryptography</p>
							</div>
							<div className="blk flex aic">
								<img src={require("../images/bitcoin-features-04.png")} className="img" />
								<p className="txt fontn s13">Limited coin<br/>Supply</p>
							</div>
							<div className="blk flex aic">
								<img src={require("../images/bitcoin-features-05.png")} className="img" />
								<p className="txt fontn s13">Independently<br/>Verifiable</p>
							</div>
							<div className="blk flex aic">
								<img src={require("../images/bitcoin-features-06.png")} className="img" />
								<p className="txt fontn s13">Digital Liquid<br/>Asset</p>
							</div>
						</div>
					</div> 
				</div>
                <div className="line" />

                				
				{/* section 1 */}
				<div className="sect1 flex">
					<div className="left">
						<h2 className="font b s32 title">We now accept Bitcoin and Bitcoin Cash</h2>
						<h5 className="font b s22 lbl">What's the Difference?</h5>
						<p className="txt font s15">Both Bitcoin and Bitcoin Cash offer a strong upgrade from the problems of modern payment networks. The two networks are very similar, with a few key differences:</p>
						<p className="txt font s15">The <span className="font b yellow">Bitcoin network</span> prioritizes conservative upgrades, and acts primarily as a store-of-value like gold.</p>
						<p className="txt font s15">The <span className="font b green">Bitcoin Cash network</span> prioritizes upgrades to improve peer-to-peer payments, which keeps fees low.</p>
						<p className="txt font s15">Ready to dive in and learn more? Learn the basics with this beautiful site from our friends at <a href={"https://bitcoincashers.org/"} target="_blank" className="font noul b blue">BitcoinCashers.org!</a></p>
					</div>
					<div className="right">
						<img src={require("../images/new-2-crypto.png")}  className="graphic"/>
					</div>
				</div>
			
				{/* Section 2 */}
				<div className="sect2">
					<div className="item flex">
						<div className="left">
							<h2 className="font b s32 lbl">Where is the best place to get some?</h2>
							<p className="font s15 txt">There's quite a few options when it comes to picking an exchange. Two of the simplest, most well-built options are Coinbase and Binance.</p>
							<p className="font s15 txt mtxt">Both Coinbase and Binance have <Link to={"/"} className="noul font b color lin">the same basic steps.</Link> First, signup and create an account. Next, connect your traditional bank account as a means to purchase cryptocurrency. Last, when you feel the timing is right, purchase some cryptocurrency!</p>
							<p className="font s15 txt">When you're ready to shop on Crypto-pros, simply send your newly acquired Bitcoin or Bitcoin Cash to the address listed in your Crypto Pros.net Wallet and start saving!</p>
						</div>
						<div className="right">
							<a href="https://www.coinbase.com/join/Purse" target="_blank" className="noul link base">					
								<img src={require("../images/coinbase.png")}  className="img"/>
							</a>
							<a href="https://www.binance.com/en" target="_blank" className="noul link">
								<img src={require("../images/binance.png")}  className="img"/>
							</a>
						</div>
					</div>
				</div>

                {/* Section 3 */} 
				<div className="sect3">
					<h2 className="title font b s32">International Options</h2>
					<div className="block flex aic">
						<div className="item flex flex-col">
							<a href="https://my.bity.com/register" target="_blank" className="noul link">
								<img src={require("../images/partner-02.png")} className="img" />
							</a> 
							<p className="nam font s12">SWITZERLAND</p>
						</div>
						<div className="item flex flex-col">
							<a href="https://www.unocoin.com/in" target="_blank" className="noul link">
								<img src={require("../images/partner-07.png")} className="img" />
							</a>
							<p className="nam font s12">INDIA</p>
						</div> 
						<div className="item flex flex-col">
							<a href="https://coinsecure.in/" target="_blank" className="noul link">
								<img src={require("../images/partner-04.png")} className="img" />
							</a>
							<p className="nam font s12">INDIA</p>
						</div>
						<div className="item flex flex-col">
							<a href="https://www.coinbase.com/" target="_blank" className="noul link">
								<img src={require("../images/partner-03.png")} className="img" />
							</a>
							<p className="nam font s12">NORTH AMERICA</p>
						</div>
						<div className="item flex flex-col">
							<a href="https://bitso.com/" target="_blank" className="noul link">
								<img src={require("../images/partner-01.png")} className="img" />
							</a>
							<p className="nam font s12">SOUTH AMERICA</p>
						</div>
						<div className="item flex flex-col">
							<a href="https://www.ripio.com/" target="_blank" className="noul link">
								<img src={require("../images/partner-06.png")} className="img" />
							</a>
							<p className="nam font s12">MEXICO</p>
						</div>
						<div className="item flex flex-col">
							<a href="https://foxbit.exchange/" target="_blank" className="noul link">
								<img src={require("../images/partner-05.png")} className="img" />
							</a>
							<p className="nam font s12">BRAZIL</p>
						</div>
					</div>
				</div>

                {/* Start Banner */}
				<div className="start flex flex-col aic">
					<h2 className="lbl font b s32 cfff">All loaded up on Crypto?</h2>
					<p className="txt font s16 cfff">You're only one step away from massive savings on Amazon.</p>
					<Link to="/" className="button noul  btn font b s16 anim">Start Saveing</Link>
				</div>

                {/* What our Shopper Say */}
				<div className="shopper flex flex-col aic">
					<h1 className="font b s32 title">What our Shopper Say</h1>
					<div className="users shopper-slider flex aic">
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

export default Learn;