import React from 'react';
import { Link } from "react-router-dom";

function Button(props) {

    const { to, type, onClick, fontSize } = props;

    if(to){
        return (
            <Link
                to={to}
                className={
                    "font button noul anim s" + (fontSize || 15) + " " +
                    (!type || type === "cancel" ? "cancel" : "action cfff")
                }>
                {props.children || null}
            </Link>
        );
    }else{
        return (
            <button 
                onClick={onClick} 
                className={
                    "font button anim s" + (fontSize || 15) + " " +
                    (!type || type === "cancel" ? "cancel" : "action cfff")
                }>
                {props.children || null}
            </button>
        );
    }    
}

export default Button;