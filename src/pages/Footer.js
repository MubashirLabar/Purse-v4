import React,{useState} from 'react';
import { Link } from "react-router-dom";


function Footer(props) {
    
    const [ftr, setFtr] = useState([
        {block:"support", label:"Help Center", slug: "/"},
        {block:"support", label:"Affiliates", slug: "/affiliates"},
        
        {block:"company", label:"About", slug: "/about-us"},
        {block:"company", label:"Privacy Policy", slug: "/privacy-policy"},
        {block:"company", label:"Terms of service", slug: "/terms-of-service"},
        
        {block:"social", label:"Blog", icon:"icon-pencil", slug: "/"},
        {block:"social", label:"Reddit", icon:"icon-reddit-alien", slug: "/"},
        {block:"social", label:"Twitter", icon:"icon-twitter", slug: "/"},
        {block:"social", label:"Facebook", icon:"icon-facebook", slug: "/"},
    ]) 

    let support = [], company = [], social = [];
			
    /* Supports Itmes */
    ftr.filter(n=>n.block == "support").map(e=>{
        support.push(
            <Link to={e.slug} className="noul link fontn s14 anim">{e.label}</Link>
        )
    });
    
    /* Company Itmes */
    ftr.filter(n=>n.block == "company").map(e=>{
        company.push(
            <Link to={e.slug} onClick={()=>{scrollTop()}} className="noul link fontn s14 anim">{e.label}</Link>
        )
    }); 
    
    /* Social Itmes */
    ftr.filter(n=>n.block == "social").map(e=>{ 
        social.push(
            <Link to={e.slug} className="noul social-link fontn s18 c333 flex aic anim">
                <i className={"ico " + e.icon} />
            </Link>
        )
    });

    const scrollTop= ()=> {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        console.log("top");
      }

    return (
        <div className="footer flex flex-col">
            <div className="ftrwrap" style={{background: "#e2e2e2 url(" + require("../images/footer-bg.jpg") +")"}}>  
                <div className="content flex">
                    <div className="block flex flex-col aic">
                        <div className="title pwr fontb s24 cfff">Crypto-Pros</div>
                        <Link to={"/Purse/"} className="noul logo fontn s20">
                            <img src={require("../images/metal-five-star.png")} /> 
                        </Link>
                    </div> 
                
                    <div className="block flex flex-col"> 
                        <div className="title fontb s18">Get to know us</div>
                        {company}
                    </div>
                
                    <div className="block flex flex-col">
                        <div className="title fontb s18">Support</div>
                        {support}
                        <div className="icons flex aic">
                            {social} 
                        </div>
                    </div>
                </div>
                {/* Got Question ? */}
                <div className="mail flex flex-col aic">
                    <p className="lbl fontn s14">Got Questions? Contact us 24/7!</p>
                    <a href="mailto:cryptoprosmarketing@gmail.com" className="link fontn s14 cfff">cryptoprosmarketing@gmail.com</a>
                </div>
            </div>
            
            {/* Copyright Block */} 
            <div className='copy-r flex'>
                <div className="item flex aic">
                    <p className='s13 fontn txt c333'>&copy; Crypto Pros.net - All rights reserved.</p>
                    <Link to="/" className="noul">
                        <img src={require("../images/c-logo.png")} />
                    </Link>
                </div>
            </div> 
        </div>	
    );
}

export default Footer;