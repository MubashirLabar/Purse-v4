import React, { useState, useEffect } from 'react';
import {
    focus,
    isValidEmail,
    keyCodes,
    keyupListener,
    setCookie,
    getCookie,
    post
} from "../../core";
import { Link } from "react-router-dom";
import {
    Button, 
    Toast
} from "../../ui";
import config from "../../config";
const { api, mail } = config;

function Forgot(props) {

    const [username, setUsername] = useState(null);
    
    useEffect(() => {
        document.title = "Reset your password";
    })

    const recover = () => {
        if(username == null || !isValidEmail(username)){
            focus("._username");
            Toast.show({ html: "Please enter your email", time: 5 });
        }else if(!isValidEmail(username)){
            focus("._username");
            Toast.show({ html: "Please enter a valid email", time: 5 });
        }else{
            Toast.dismisAll();
            props.setLoading(true);
            post(
                api + 'u/recover',
                {
                    email: username
                },
                resp => {
                    Toast.show({html: resp.message, time: "kind" in resp ? 15 : 6});
                    setCookie("__ha", resp.ha); //Hash                        
                    props.setLoading(false);                    
                },
                err => {
                    console.log(err);
                    Toast.show({html: null, time: 5});
                    props.setLoading(false);
                }
            );
        }
    }


    return (
        <React.Fragment>
            <div className="head font c333 s16">
                <h2 className="s20 b">Forgot your password?</h2>
                Enter your email address to reset your password.<br />You may need to check your spam folder or unblock {mail}
            </div>            
            <div className="form rel">								
                <input type="text" onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ recover() })}} onChange={e=>{setUsername(e.target.value === "" ? null : e.target.value)}} placeholder="Email" className="input s16 font _username" autoComplete="disabled" />
                <div className="sptb rel">
                    <Link to={"/u/signin"} className="noulh color s16 font">Back to signin</Link>
                </div>
                <Button fontSize={16} onClick={e=>{recover()}} type="action">Submit</Button>
            </div>				
        </React.Fragment>
    )
}

export default Forgot;