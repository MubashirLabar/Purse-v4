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
    Checkbox,
    Toast 
} from "../../ui";
import config from "../../config";
const { api } = config;

function Signup(props) {

    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);    
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [agree, setAgree] = useState(false);

    useEffect(() => {
        document.title = "Sign up";
    })

    const signup = () => {
        if(firstname == null){
            focus("._firstname");
            Toast.show({ html: "Please enter your name", time: 5 });
        }else if(lastname == null){
            focus("._lastname");
            Toast.show({ html: "Please enter your last name", time: 5 });
        }else if(username == null){
            focus("._username");
            Toast.show({ html: "Please enter your email", time: 5 });
        }else if(!isValidEmail(username)){
            focus("._username");
            Toast.show({ html: "Please enter a valid email", time: 5 });
        }else if(password == null){
            focus("._password");
            Toast.show({ html: "Please enter your password", time: 5 });
        }else if(agree == false){
            Toast.show({ html: "Please agree to the terms of service", time: 5 });
        }else{
            Toast.dismisAll();
            props.setLoading(true);
            post(
                api + 'u/create',
                {
                    name: firstname + '@@@@' + lastname,
                    email: username,
                    passw: password,
                    ref: getCookie("__reu") || "unknown"
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
                <h2 className="s20 b">Sign up</h2>
                or <Link to={"/u/signin"} className="noulh color">sign in to your account</Link>
            </div>            
            <div className="form rel">								
                <input type="text" onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ signup() })}} onChange={e=>{setFirstname(e.target.value === "" ? null : e.target.value)}} placeholder="First name" className="input s16 font _firstname" autoComplete="disabled" />
                <input type="text" onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ signup() })}} onChange={e=>{setLastname(e.target.value === "" ? null : e.target.value)}} placeholder="Last name" className="input s16 font _lastname" autoComplete="disabled" />
                <input type="text" onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ signup() })}} onChange={e=>{setUsername(e.target.value === "" ? null : e.target.value)}} placeholder="Email" className="input s16 font _username" autoComplete="disabled" />
                <input type="password" onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ signup() })}} onChange={e=>{setPassword(e.target.value === "" ? null : e.target.value)}} placeholder="Password" className="input s16 font _password" autoComplete="disabled" />
                <div className="sptb rel">
                    <Checkbox onChange={e=>setAgree(e)} label={<span>I agree to the <Link to="/terms" className="font color noulh">terms</Link></span>} />
                </div>
                <Button fontSize={16} onClick={e=>{signup()}} type="action">Sign up</Button>
            </div>				
        </React.Fragment>
    )
}

export default Signup;