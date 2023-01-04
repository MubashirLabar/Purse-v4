import React, { useState, useEffect } from 'react'
import {
    focus,
    keyCodes,
    keyupListener,
    setCookie,
    getCookie
} from "../../core";
import { Toast } from "../../ui";

class SearchBox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            flag: getCookie("__fl") || "uk",
            choose: false, 
            query: props.query || null 
        }
    }

    componentDidMount(){
        var self = this;
        document.body.addEventListener("click", ()=>{
			self.setState({choose: false});
		})
    }

    search(){      
        const { flag, query }   = this.state;
        if(null == query){
            focus(".search-query");
        }else{
            this.props.history.push("/search/" + (flag || "uk") + "/" + (query.split(' ').join('+')));
        }
    }    

    render(){

        var self = this;
        const flags = {
            "uk" : require("../../images/flags/uk.svg"),
            "us" : require("../../images/flags/us.svg"),
            "ca" : require("../../images/flags/ca.svg"),
            "jp" : require("../../images/flags/jp.svg")
        }
        const _flags = ["uk", "us", "ca", "jp"];
        const { flag, query, choose } = this.state;

        return (
            <div className="searchbox flex aic rel">
                <button className="icon-search go abcb rel s18" />            
                <input 
                    type="text" 
                    value={query} 
                    className="search-query query s15 font" 
                    placeholder="Search for anything on Amazon"
                    onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ self.search() })}} 
                    onChange={e=>self.setState({ query: e.target.value == "" ? null : e.target.value})}
                />
                <button className="flag" style={{ background: `url(${flags[flag]}) center no-repeat` }} 
                onClick={e=>{
                    e.preventDefault();
                    e.stopPropagation();
                    self.setState({choose: true})
                }} />
                <div className={"flags abs flex" + (choose ? "" : " hide")}>
                    {
                        _flags.map(f => {
                            if(f == flag) return null;
                            return (
                                <button className="img" onClick={e=>{
                                    e.preventDefault();                                    
                                    e.stopPropagation();
                                    var cart = JSON.parse(getCookie("__cart"));
                                    if(null != cart && cart.items.length > 0 && f != self.state.flag){
                                        Toast.show({ html: "You cannot add items from diffrent stores (countries)", time: 5 });
                                    }else{
                                        self.setState({flag: f, choose: false}, ()=>{
                                            setCookie("__fl", f, 7);
                                            if(query != null){
                                                self.search();
                                            }
                                        })
                                    }
                                }}>
                                    <div className="flag" style={{background: `#e2e2e2 url(${flags[f]})`}}></div>
                                </button>
                            )
                        })
                    } 
                </div>
            </div>
        )
    }
}

export default SearchBox;
