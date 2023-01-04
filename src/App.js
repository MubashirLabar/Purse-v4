import React, { createRef, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";
import {
  encode,
  decode,
  Dialog,
  setCookie,
  getCookie,
  removeCookie,
  getKeyFromString,
  post,
  me,
  Uploadify,
  urlencode
} from "./core";
import config from "./config";
import axios from "axios";
//STYLESHEETS
import './css/App.scss';

//Pages 
import Home from "./pages/Home";
import Account from "./pages/Account";
import GetStarted from "./pages/GetStarted";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Learn from "./pages/Learn";
import ImportWishList from "./pages/ImportWishList";
import Footer from "./pages/Footer";
import WayToEarn from './pages/WayToEarn';
import Earn from "./pages/Earn";

/*import UploadManager from "./pages/UploadManager";
import DownloadFile from "./pages/Download";
import Plans from "./pages/Plans";
import Buy from "./pages/Buy";
import Thanks from "./pages/Thanks";
import Profile from "./pages/Profile";
import Help from "./pages/Help";*/

const { base, api, ENCRYPTION_KEY } = config;

global.siteName = "Crypto-pros";
global.basePath = "/";

Date.prototype.getFormated = function(){
  var mm = this.getMonth() + 1,
  dd = this.getDate(),
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
hours = this.getHours(),
minutes = this.getMinutes(),
ampm = hours >= 12 ? "pm" : "am";
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? "0"+minutes : minutes;
  return {
      day: dd < 10 ? "0"+dd : dd,
      month: mm < 10 ? "0"+mm : mm,
      monthName: months[this.getMonth()],
      year: this.getFullYear(),
      hours: hours,
      minutes: minutes,
      ampm: ampm,
      format: (dd < 10 ? "0" + dd : dd) + ' ' + months[this.getMonth()] + ' ' + this.getFullYear()
  }
}

function ForceRefreshApp(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

function App() {

  const [loaded, setLoaded] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [retry, setRetry] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [discount, setDiscount] = useState(10);

  const timer = null;
  let self = this;
  const refreshApp = ForceRefreshApp();

  useEffect(()=>{
    load();    
  }, [refresh]);

  const load = () => {
    if(loaded) return;
    const at = getCookie('__at');
    const ut = getCookie('__ut');
    const ha = getCookie("__ha");
    if(null == at || null == ha || null == ut){
      done();
    }else{
      AuthenticateUser();   
    }
  }

  const AuthenticateUser = (on) => {
    const at = getCookie('__at');
    const ut = getCookie('__ut');
    const ha = getCookie("__ha");
    post(
      api + 'u/auth',
      {
          at: encode(at),
          ut: encode(ut),
          ha: encode(ha)
      },
      resp => {
          if("kind" in resp){
            setIsUser(true);
            setCookie("__ud", JSON.stringify(resp.me));             
            on && on();
          }else{
            setIsUser(false);                
            removeCookie("__at");
            removeCookie("__ut");
            removeCookie("__ud");
          }
          done();
      },
      err => {
          console.log(err);
          done();            
      }
    ); 
  }
  const done = () => {

    setLoaded(true);
    //refreshApp();
    
  }

  const buildQuery = (flag, query, page, limit, mode) => {
    let q = {
      'us' : 'https://ws-na.amazon-adsystem.com/widgets/q?TemplateId=PubStudio&ServiceVersion=20070822&MarketPlace=US&Operation=ItemSearch&InstanceId={%instanceid}&dataType=json&Keywords={%query}&SearchIndex=All&multipageStart={%page}&multipageCount={%limit}',
      'uk' : 'https://ws-eu.amazon-adsystem.com/widgets/q?Operation=GetResults&MarketPlace=GB&Keywords={%query}&SearchIndex=All&multipageStart={%page}&InstanceId={%instanceid}&multipageCount={%limit}&TemplateId=MobileSearchResults&ServiceVersion=20070822&dataType=json',			
      'jp' : 'https://ws-fe.amazon-adsystem.com/widgets/q?Operation=GetResults&Keywords={%query}&SearchIndex=All&multipageStart={%page}&InstanceId={%instanceid}&multipageCount={%limit}&TemplateId=MobileSearchResults&ServiceVersion=20070822&MarketPlace=JP&dataType=json',
      'ca' : 'https://ws-na.amazon-adsystem.com/widgets/q?TemplateId=PubStudio&ServiceVersion=20070822&MarketPlace=CA&Operation=ItemSearch&InstanceId={%instanceid}&dataType=json&Keywords={%query}&SearchIndex=All&multipageStart={%page}&multipageCount={%limit}'
    }
    page = page || 1;
    limit = limit || 15;
		return q[flag]
				.replace("{%instanceid}", urlencode(query))
				.replace("{%query}", urlencode(query))
				.replace("{%page}", (page * limit) - limit)
				.replace("{%limit}", limit);
  }
  
  const fetchSearch = (flag, query, page, limit, list, callback) => {
    var qry = buildQuery(flag, query, page, limit);
    axios.get(qry)
		.then(resp => {
			var data = resp.data;			
			if(flag == "uk" || flag == "jp"){
        window['search_callback'] = (data) => {      
          parseSearchResult(flag, data.results, list, callback);
        }
				eval(data);
			}else{
        parseSearchResult(flag, data.results, list, callback);
			}
		})
		.catch(err => {
      console.log(err);
      callback && callback([]);
		});
  }

  const calculateDiscount = (amt) => {
		amt = parseFloat(amt);
		return amt - ( amt * discount / 100 );
  }

  const currency = (flag) => {
		var list = {
      'us': '$',
      'ca': 'CAD',
      'uk' : '£',
			'jp' : '￥'
		};
		return list[flag];
	}
  
  const parsePrice = (price) => {
    try{
      var amt = price.replace(/,/g, '').match(/\d+/)[0];
      amt += price.replace(/,/g, '').match(/\.\d+/)[0] || 0;      
    }catch(e){
      
    }
    return amt || price;
  }

  const toDiscountPrice = (flag, price) => {
    try{
      return currency(flag) + calculateDiscount(parsePrice(price)).toFixed(2);
    }catch(e){
      return currency(flag) + price;
    }
  }
  
  const parseSearchResult = (flag, results, list, callback) => {
		if(results.length == 0){
			callback && callback();
		}
		var __ = list;
		for(let i = 0; i < results.length; i++){
      __.push({
				ID: results[i].ASIN,
				flag: flag,
				title: results[i].Title,
        price: results[i].Price,
        priceDiscount: toDiscountPrice(flag, results[i].Price),
				rating: results[i].Rating,
				category: results[i].category,
				reviewCount: results[i].TotalReviews,
				isDigital: results[i].isDigital != "",
				poster: {
					thumb: results[i].ImageUrl,
					large: results[i].LargeImageUrl || null
				}
			});
    }
    callback && callback(list);			
	}

  if(!loaded){
    return (
      <div className="react-landing abs abc">
        <img src={require("./images/logo.jpg")} className="bl" style={{height: 100}} />        
      </div>
    )
  }else{
    return (
      <BrowserRouter>
        <div className="App">
            <div className={"AppContent anim rel" + (isUser ? " ucs" : " ncs")}>
              
              <Route 
                exact path="/u/:section/:token"
                render={props => isUser === false
                  ? <Account setUser={setIsUser} {...props} />
                  : <Redirect to={{pathname: '/h', state: {from: props.location}}} />}
              />

              <Route 
                exact path="/u/:section"
                render={props => isUser === false
                  ? <Account setUser={setIsUser} {...props} />
                  : <Redirect to={{pathname: '/h', state: {from: props.location}}} />}
              />
              
              <Route 
                exact path="/exit"
                render={props => {
                  removeCookie("__ut"); //UT
                  removeCookie("__at"); //JWT
                  removeCookie("__ud"); //UDATA
                  window.location = base;
                }}
              />           
              
              {/** HOME */}
              <Route 
                exact path="/" 
                render={props => <Home setUser={setIsUser} search={fetchSearch} auth={isUser} {...props} />}
              />

              {/** PRODUCT */}
              <Route 
                exact path="/product/:cc/:pc" 
                render={props => <Product setUser={setIsUser} search={fetchSearch} auth={isUser} {...props} />}
              />

              {/** Cart */}
              <Route 
                exact path="/cart" 
                render={props => <Cart setUser={setIsUser} calculateDiscount={calculateDiscount} parsePrice={parsePrice} currency={currency} auth={isUser} {...props} />}
              />

              {/** Checkout */}
              <Route 
                exact path="/checkout" 
                render={props => <Checkout setUser={setIsUser} calculateDiscount={calculateDiscount} parsePrice={parsePrice} currency={currency} auth={isUser} {...props} />}
              />
              
              {/** Checkout Section */}
              <Route 
                exact path="/checkout/:section" 
                render={props => <Checkout setUser={setIsUser} calculateDiscount={calculateDiscount} parsePrice={parsePrice} currency={currency} auth={isUser} {...props} />}
              />

              {/** SEARCH */}
              <Route 
                exact path="/search/:flag/:query" 
                render={props => <Search setUser={setIsUser} search={fetchSearch} auth={isUser} {...props} />}
              />

              {/** GET STARTED */}
              <Route 
                exact path="/get-started" 
                render={props => <GetStarted auth={isUser} {...props} /> }
              />    
                            
              {/** LEARN */}
              <Route 
                exact path="/learn" 
                render={props => <Learn auth={isUser} {...props} /> }
              />       

              {/** Import Wish List */}
              <Route 
                exact path="/import-wish-list" 
                render={props => <ImportWishList auth={isUser} {...props} /> }
              /> 

              {/**  Way To Earn */}
              <Route 
                exact path="/ways-to-earn" 
                render={props => <WayToEarn auth={isUser} {...props} /> }
              /> 
              
              {/** Earn Page */}
              <Route 
                exact path="/earn" 
                render={props => <Earn auth={isUser} {...props} /> }
              /> 

              {/* Footer */}
              <Footer />      
            </div>          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;