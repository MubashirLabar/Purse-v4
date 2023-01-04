import React, { Fragment, useState, useEffect } from 'react';
import {
    Loader
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

class Search extends React.Component{

    constructor(props){
        super(props);
        const { flag, query } = this.props.match.params;
        this.state = {
            page: 1,
			limit: 20,
			loading: true,			
			flag: flag || "uk",
			query: query ? query.split("+").join(" ") : null,
			list: []
        }
        this.searching = false;
		this.canLoadMore = true;
    }
    
    componentDidMount(){
        var self = this;
		/*window['search_callback'] = (data) => {
			this.parseSearchResult(data.results);
		}*/
		window.onscroll = function(ev) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
				var btn = document.querySelector("#load-more-" + self.state.flag);
				if(btn) btn.click();
			}
		}
		this.search();
    }    

    componentDidUpdate(prevProps, prevState){
		if(this.state.query != prevState.query || this.state.flag != prevState.flag){
			this.setState({loading: true, list: [], page: 1}, () => {
				this.search();
			});			
		}
    }
    
    static getDerivedStateFromProps(props, currentState){
		return {
			flag: props.match.params.flag,
			query: props.match.params.query.split("+").join(" ")
		}
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

    render(){

        var self = this, products = [];
        const { flag, query, loading, list } = self.state;
        
        var locs = {
			'us' : 'United States',
			'uk' : 'United Kingdom',
			'jp' : 'Japan',
			'ca' : 'Canada'
        };        

        if(loading && list.length == 0){
			for(let i = 0; i < 10; i++){
				products.push(<ProductItem holder={true} />);
			}
		}else{
			if(list.length > 0){
				for(let i = 0; i < list.length; i++){
					products.push(<ProductItem meta={list[i]} />);
				}
			}else{
				products.push(<div className="empty-result flex flex-col rel aic">
						<div className="icon-search icon" />
						<p className="txt fontn s16">Your search did not match any products.</p>
					</div>);
			}
        }
        
        return (
            <Fragment>
                <Header history={self.props.history} search={true} searchQuery={query} />                
                <div className="search-results rel">                        
                    <div className="wrap">
                        {!loading && list.length > 0 && <h2 className="s18 fontn c333 title">Search Results for <span className="b">{query}</span> from <span className="b">{locs[flag]}</span></h2>}
                        {loading && list.length == 0 && <div className="title holder" />}
                        <div className="results rel flex">
                            {products}
                        </div>
                        {list.length > 0 && <div className="more flex">
                            {self.canLoadMore && !loading && list.length >= self.state.limit && <button id={"load-more-" + flag} className="button s16 cfff anim font b" onClick={e=>{
                                self.setState({loading: true, page: self.state.page + 1}, ()=>{
                                    self.search();
                                });
                            }}>Load More</button>}
                            {!self.canLoadMore && <h2 className="fontn s16 c777">No more results</h2>}
                            {loading && list.length > 0 && <Loader color='#26b0ff' />}
                        </div>}
                    </div>
                </div>               
            </Fragment>
        )
    }
}

export default Search;