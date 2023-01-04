import React, { Fragment, useState, useEffect } from 'react';
import {
    Button,
    Input
} from "../ui";
import { me, randRange } from "../core";
import { Link } from "react-router-dom";
import $ from "jquery";
import 'slick-carousel/slick/slick';


import Header from "./Header";
import Account from "./Account";
import Footer from "./Footer";
import config from "../config";
import SearchBox from "./subs/Searchbox";
import ProductItem from "./subs/ProductItem";

const { base } = config;

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            products: [
                {
                    tag: "cool",
                    title: "Cool Products",
                    items: []
                },
                {
                    tag: "books",
                    title: "Books",
                    items: []
                },
                {
                    tag: "gifts",
                    title: "Gift Cards",
                    items: []
                }
            ]
        }
    }
    
    componentDidMount(){
        this.loadProducts("cool", "us", "electronics+imac+drones");
        this.loadProducts("books", "us", "crypo+currency+books");
        this.loadProducts("gifts", "us", "gifts");
    }    

    loadProducts(mode, flag, query){
        var self = this;
        self.props.search(flag, query, 1, 15, [], items => {
            var products = self.state.products;
            var inx = products.findIndex(x=>x.tag==mode);
            for(let i = 0; i < items.length; i++) {
                products[inx].items.push(items[i]);
            }
            self.setState({ products: products }, () => {
                
                    $('.block-' + mode).slick({
                        infinite: false,
                        slidesToShow: 5,
                        slidesToScroll: 5 
                    }); 
               
            });
        });		
	}

    render(){

        var self = this;
        const { products } = self.state;
        const homeBG = require("../images/home-bg.jpg");
        const none = [1,2,3,4,5];

        return (
            <Fragment>
                <Header />
                <div className="banner rel" style={{ background: `#444 url(${homeBG}) center no-repeat` }}>
                    <div className="bcont abs abc">
                        <img src={require("../images/logo-text.png")} className="logo bl" />                    
                        <div className="sbx rel flex aic">
                            <SearchBox history={self.props.history} />
                            <Link to="/import-wish-list" className="import font b s15">Import Wishlist</Link>
                        </div>
                        <h2 className="slogan font b cfff">Buy Anything from Amazon</h2>
                        <div className="opts flex rel">
                            <div className="block">
                                <h2 className="font s18 cfff">Import your wishlist from Amazon for the fastest checkout</h2>
                                <Link to="/import-wish-list" className="font b s15 cfff">Get Started</Link>
                                <div className="icon-stackoverflow ico rel abcb" />
                            </div>
                            <div className="block">
                                <h2 className="font s18 cfff">Get great deals shopping with cryptocurrencies</h2>
                                <Link to="/get-started" className="font b s15 cfff">More Info</Link>
                                <div className="icon-tag-cord ico rel abcb" />
                            </div>
                            <div className="block">
                                <h2 className="font s18 cfff">Use your gift cards to receive cryptocurrencies</h2>
                                <Link to="/ways-to-earn" className="font b s15 cfff">Get Started</Link>
                                <div className="icon-dollar1 ico rel abcb" />
                            </div>
                        </div>
                    </div>
                </div> 

                {/**Products */}
                <div className="wrap rel">
                {
                    products.map(section => {
                        return (
                            <div className="section-product rel">
                                <h2 className="s20 font b title">{section.title}</h2>
                                {
                                    section.items.length == 0 
                                    ? <div className={"blocks block-holder flex"}> 
                                        {none.map(item => {
                                            return (
                                                <ProductItem holder={true} />
                                            )
                                        })}
                                    </div> :                                
                                    <div className={"blocks block-" + section.tag}>                                
                                    {
                                        section.items.map(item => {
                                            return (
                                                <ProductItem meta={item} />
                                            )
                                        })
                                    }
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                </div>

            </Fragment>
        )
    }
}

export default Home;