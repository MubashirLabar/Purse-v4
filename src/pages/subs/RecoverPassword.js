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
    Toast,
    Loader
} from "../../ui";
import config from "../../config";
const { api, mail } = config;

function RecoverPassword(props) {

    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [repassword, setRePassword] = useState(null);    
    
    useEffect(() => {
        document.title = "Reset your password";
        if(loading){
            verify();
        }
    }, [loading])

    const verify = () => {        
        Toast.dismisAll();
        post(
            api + 'u/reset_pass',
            {
                token: props.token
            },
            resp => {
                setLoading(false);
                setMessage(resp.message);                    
                if("kind" in resp){                    
                    setVerified(true);
                    setEmail(resp.email);
                    setCookie("__ha", resp.ha);                    
                }
            },
            err => {
                console.log(err);
                Toast.show({html: null, time: 5});
                setLoading(false);
            }
        );        
    }

    const recover = () => {
        if(password == null){
            focus("._password");
            Toast.show({ html: "Please enter new password", time: 5 });
        }else if(repassword == null){
            focus("._repassword");
            Toast.show({ html: "Please retype your new password", time: 5 });
        }else if(repassword != password){
            focus("._repassword");
            Toast.show({ html: "Repeat password not matched", time: 5 });
        }else{
            Toast.dismisAll();
            props.setLoading(true);
            post(
                api + 'u/update_pass',
                {
                    token: props.token,
                    passw: repassword
                },
                resp => {
                    Toast.show({html: resp.message, time: "kind" in resp ? 15 : 6});
                    setCookie("__ha", resp.ha); //Hash                        
                    props.go("/u/signin?em=" + encodeURIComponent(email));
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
            {loading && email == null && <div className="head font c333 s16 t-c">
                <Loader width={100} height={150} />
                <h2 className="s16">Please wait</h2>                
            </div>}

            {!loading && !verified && <div className="head font c333 s16 t-c">
                <div className="ico icon-cross" />
                <h2 className="s16">{message || 'Verification token is either expired or is invalid'}</h2>                
            </div>}

            {!loading && verified && <React.Fragment>
            <div className="head font c333 s16">
                <h2 className="s20 b">Forgot your password?</h2>
                Enter a new password for your {email} account.
            </div>            
            <div className="form rel">								
                <input type="password" onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ recover() })}} onChange={e=>{setPassword(e.target.value === "" ? null : e.target.value)}} placeholder="New password" className="input s16 font _password" autoComplete="disabled" />
                <input type="password" onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{ recover() })}} onChange={e=>{setRePassword(e.target.value === "" ? null : e.target.value)}} placeholder="Retype password" className="input s16 font _repassword" autoComplete="disabled" />
                <Button fontSize={16} onClick={e=>{recover()}} type="action">Submit</Button>
            </div>				
            </React.Fragment>}
        </React.Fragment>
    )
}

export default RecoverPassword;