import React,{useState} from 'react'; 
import {Link} from "react-router-dom";
import Gtrblock from './subs/Gtrblock';
import ShippingMsg from './subs/ShippingMsg';
import ShippingAddress from './subs/ShippingAddress';
import {DialogBox} from "../ui";


function CheckoutShipping(props) {

    const [address, setAddress] = useState([
        {
            ID: 1,
            name: 'Mubashir Labar',
            addr1: '',
            addr2: '',
            state: "PB",
            city: "Multan",
            zip: "60000",
            phone: "030012345678"
        },
        {
            ID: 2,
            name: 'Mubashir Labar',
            addr1: '',
            addr2: '',
            state: "PB",
            city: "Multan",
            zip: "60000",
            phone: "030012345678"
        }
    ])
    const [currentAdr, setCurrentAdr] = useState(null);

    return (
        <div className="ship-p">
            <div className="wrapper flex">
                {/* Left Side */}
                <div className="left flex flex-col">
                    <h2 className="title font b s32 c333">Select Shipping Address</h2>
                    <div className="content flex flex-col">
                        <button className="add-btn font b s16 aic" onClick={()=>{
                            DialogBox(
                                "",
                                <ShippingAddress />,                        
                                {
                                    label: "cancel"
                                }
                            )
                        }}	 	 
                        >
                            <span className="plus s18">+</span>
                            Add a New Address
                        </button>
                        {
                            address.map(item => {
                                return (
                                    <label className="blk flex" key={"addr-"+item.ID}>
                                        <button onClick={()=>setCurrentAdr(item.ID)} className={"anim rel check " + (currentAdr == item.ID ? "checked" : "")} />
                                        <div className="text"> 
                                            <h2 className="txt font b s17 c333">{item.name}</h2>
                                            <p className="txt font s16 c333">{item.addr1}</p>
                                            <p className="txt font s16 c333">{item.addr2}</p>
                                            <div className="txt font s16 c333">
                                                <span>{item.city}</span>,&nbsp;
                                                <span>{item.state}</span>,&nbsp;
                                                <span>{item.zip}</span>
                                            </div>	
                                            <p className="txt font s16 c333">{item.phone}</p>
                                        </div>
                                    </label>
                                )
                            })
                        }														
                    </div>
                </div>
                    
                {/* Right Side */} 
                <div className="cart-right right flex flex-col">
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
                        
                        {/*When purchase price lass then $25 */}
                        {<ShippingMsg />}
                                                    
                        <Link to={"/checkout/review"} className="noul button btn font b s16 anim">Ship to this Address</Link>
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
                                        <h5 className="font b s14 c333">$18.04</h5>
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

export default CheckoutShipping;