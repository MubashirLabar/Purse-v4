import React, { useState, useEffect } from 'react';
import Signin from "./subs/Signin";
import Signup from "./subs/Signup";
import Verify from "./subs/Verify";
import Forgot from "./subs/Forgot";
import RecoverPassword from "./subs/RecoverPassword";
import { Cover } from "../ui";
import "../css/Account.scss";
import config from "../config";
import {
    removeCookie
} from "../core";
import Header from "./Header";

function Account(props) {

    const [loading, setLoading] = useState(false);
    let section = props.section || props.match.params.section;

    if(section != "verify" && !props.section && props.auth){ props.history.push("/h") ;}
    
    useEffect(()=>{        
        section = props.section || props.match.params.section;        
    }, [section || props.match.params.section]);    

    const goto = (nxt) => {
        props.history.push(nxt);
    }

    return (
        <React.Fragment>
            {!props.section && <Header />}
            <div className="account abs abc">
                {loading && <Cover />}            
                {section == "signin" && <Signin setUser={props.setUser} go={goto} setLoading={setLoading} />}
                {section == "join" && <Signup setUser={props.setUser} go={goto} setLoading={setLoading} />}
                {section == "forgot" && <Forgot go={goto} setLoading={setLoading} />}
                {section == "verify" && <Verify go={goto} setLoading={setLoading} token={props.match.params.token} />}
                {section == "reset" && <RecoverPassword go={goto} setLoading={setLoading} token={props.match.params.token} />}            
            </div>
        </React.Fragment>
    );
}

export default Account;