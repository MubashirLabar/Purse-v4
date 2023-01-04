import React, { useState, useEffect } from 'react';
import {
    focus,
    isValidEmail,
    keyCodes,
    keyupListener,
    getUriParams,
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
const { api } = config;

function Signin(props) {


    const [username, setUsername] = useState("em" in getUriParams() ? getUriParams().em : null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        document.title = "Sign in";
    })

    const signin = () => {
        if(username == null || !isValidEmail(username)){
            focus("._username");
            Toast.show({ html: "Please enter your email", time: 5 });
        }else if(!isValidEmail(username)){
            focus("._username");
            Toast.show({ html: "Please enter a valid email", time: 5 });
        }else if(password == null){
            focus("._password");
            Toast.show({ html: "Please enter your password", time: 5 });
        }else{
            Toast.dismisAll();
            props.setLoading(true);
            post(
                api + 'u/signin',
                {
                    email: username,
                    passw: password                    
                },
                resp => {
                    if("kind" in resp){
                        setCookie("__ha", resp.ha); //Hash
                        setCookie("__ut", resp.ut); //UT
                        setCookie("__at", resp.at); //JWT
                        setCookie("__ud", JSON.stringify(resp.me)); //UDATA
                        props.setUser(true);
                        props.go("/h");
                    }else{
                        Toast.show({html: resp.message, time: 6});
                        props.setLoading(false);
                    }
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
                <h2 className="s20 b">Sign in</h2>
                or <Link to={"/u/join"} className="noulh color">create an account</Link>
            </div>            
            <div className="form rel">								
                <input type="text" value={username} onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ signin() })}} onChange={e=>{setUsername(e.target.value === "" ? null : e.target.value)}} placeholder="Email" className="input s16 font _username" autoComplete="disabled" />
                <input type="password" onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ signin() })}} onChange={e=>{setPassword(e.target.value === "" ? null : e.target.value)}} placeholder="Password" className="input s16 font _password" autoComplete="disabled" />
                <div className="spt rel">
                    <Link to={"/u/forgot"} className="noulh color s16 font">Forgot your password?</Link>
                </div>
                <Button fontSize={16} onClick={e=>{signin()}} type="action">Sign in</Button>
            </div>				
        </React.Fragment>
    )
}

export default Signin;