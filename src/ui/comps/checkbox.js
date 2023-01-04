import React, { useState, useEffect } from 'react';

function Checkbox(props) {

    const [checked, setChecked] = useState(props.checked || false);
    const { onChange, label } = props;

    useEffect(()=>{

    }, [checked]);

    return (
        <button onClick={()=>{
            var ic = !checked;
            setChecked(ic);
            onChange && onChange(ic);            
        }} className={"anim check-box s12 flex aic " + (checked === true ? " check-box-checked" : "")}>
            <div className={"ico" + (checked ? " icon-check" : "")} />
            <h2 className="nous anim font label s15">{label || "No label specified"}</h2>
        </button>
    )
}

export default Checkbox;