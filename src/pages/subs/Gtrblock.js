import React from 'react';
import {Link} from 'react-router-dom';

function Gtrblock(props) {
    return (
        <div className="grt">
            <p className="lbl font s15">We promise fast, reliable service and your money back if anything goes wrong.</p>
            <div className="item flex aic">
                <div className="links flex flex-col">
                    <Link to={"/"} className="link noul font b s15">Learn about our Purse Guarantee</Link>
                    <Link to={"/"} className="link noul font b s15">Returns Policy</Link>
                </div>
                <img className="tag" src={require("../../images/guarantee.svg")} />
            </div>
        </div> 
    );
}

export default Gtrblock;