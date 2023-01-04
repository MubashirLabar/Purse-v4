import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { 
    me,
    getCookie
} from "../core";
import SearchBox from "./subs/Searchbox";

function Header(props) {
    
    let u = me();
    const cartProducts = getCookie("__cart") ? JSON.parse(getCookie("__cart")).items : [];
    

    return (
        <Fragment>
            <div className="header sticky flex aic">
                <div className="wrap flex aic">
                    
                    <div className="nav-left flex aic">
                        <Link to="/" className="logo rel">
                            <img src={require("../images/logo.jpg")} className="bl" />                    
                        </Link>
                        <div className="btns">
                            <a href="https://crypto-pros.ca/" target="_blank" className="b btn noul cfff font s14 anim">Crypto services</a>
                        </div> 
                    </div>

                    <div className="nav-right flex aic">
                        <Link to="/get-started" className="nav anim s13 font b cfff">Get Started</Link>
                        <Link to="/learn" className="nav anim s13 font b cfff">Learn</Link>
                        <Link to="/u/signin" className="nav anim s13 font b cfff">Login</Link>
                        <Link to="/u/join" className="nav anim s13 font b cfff">Sign up</Link>
                        <Link to="/cart" className="nav anim s13 font b cfff flex aic">
                            <div className="ico icon-cart rel s18">
                            {cartProducts.length > 0 && <div className="counter font abs s11 b">{cartProducts.length}</div>}
                            </div>
                            <span>Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
            {props.search && <div className="head-search">
                <div className="wrap rel">
                    <SearchBox history={props.history} query={props.searchQuery || null} />
                </div>
            </div>}
        </Fragment>
    );
}

export default Header;