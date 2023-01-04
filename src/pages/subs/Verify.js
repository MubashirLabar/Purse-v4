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
const { api } = config;

function Verify(props) {

    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState(null);
    
    useEffect(() => {
        document.title = "Verify account";
        if(loading){
            verify();
        }
    }, [loading])

    const verify = () => {        
        Toast.dismisAll();
        post(
            api + 'u/verify',
            {
                token: props.token
            },
            resp => {
                setLoading(false);
                setMessage(resp.message);                                    
                if("kind" in resp){                    
                    setVerified(true);                                        
                }
            },
            err => {
                console.log(err);
                Toast.show({html: null, time: 5});
                setLoading(false);
            }
        );        
    }


    return (
        <React.Fragment>
            <div className="head font c333 s16 t-c">
                {loading && <React.Fragment>
                    <Loader width={100} height={150} />
                    <h2 className="s16">Verifying your account</h2>                
                </React.Fragment>}

                {!loading && !verified && <React.Fragment>
                    <div className="ico icon-cross" />
                    <h2 className="s16">{message || 'Verification token is either expired or is invalid'}</h2>                
                </React.Fragment>}

                {!loading && verified && <React.Fragment>
                    <div className="ico icon-check" />
                    <h2 className="s16">{message || 'Your account is verified now'}</h2>                
                </React.Fragment>}

                <div className="form formv rel">
                    <div className="sptb rel" />
                    <Button fontSize={16} onClick={e=>props.go("/h")} type="action">Continue</Button>
                </div>

            </div>                        
        </React.Fragment>
    )
}

export default Verify;