import React, { useEffect } from 'react';

/* Pages */
import Header from "../pages/Header";
import CheckoutProduct from '../pages/CheckoutProduct';
import CheckoutShipping from "../pages/CheckoutShipping";
import CheckoutReview from "../pages/CheckoutReview";
import CheckoutPayment from "../pages/CheckoutPayment";

function Checkout(props) {

    let section = props.match.params.section;

    useEffect(() => {
        section = props.match.params.section;
    }, [props.match.params.section]);

    return (
        <React.Fragment>
            <Header />
            <div className="checkout">
                <div className="head"> 
                    <div className="steps flex">
                        <div className={"step flex flex-col " + (section == "product" && "active")}>                           
                            <div className="icon font s16">1</div>
                            <div className="lbl font b s12">Discount</div>
                        </div>
                        <div className="line"></div>
                        <div className={"step flex flex-col " + (section == "shipping" && "active")}>
                            <div className="icon font s16">2</div>
                            <div className="lbl font b s12">Shipping</div>
                        </div>
                        <div className="line"></div>
                        <div className={"step flex flex-col " + (section == "review" && "active")}>
                            <div className="icon font s16">3</div>
                            <div className="lbl font b s12">Review</div>
                        </div>
                        <div className="line"></div>
                        <div className={"step flex flex-col " + (section == "payment" && "active")}>
                            <div className="icon font s16">4</div>
                            <div className="lbl font b s12">Payment</div>
                        </div>
                    </div>
                </div>

                <React.Fragment>
                    {section == "product" && <CheckoutProduct calculateDiscount={props.calculateDiscount} parsePrice={props.parsePrice} currency={props.currency} history={props.history} />} 
                    {section == "shipping" && <CheckoutShipping history={props.history} />}  
                    {section == "review" && <CheckoutReview history={props.history} />} 
                    {section == "payment" && <CheckoutPayment history={props.history} />}
                </React.Fragment>        
        </div>
        </React.Fragment>

    );
}

export default Checkout;