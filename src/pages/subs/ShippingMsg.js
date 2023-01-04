import React from 'react';

function ShippingMsg(){
    
    return (
        <div className="under">
            <div className="head flex aic font b">
                <h5 className="tit font b s16">Order under $25 may require an additional shipping fee.</h5>
                <i className="icon-truck s30 icon" />
            </div>
            <p className="txt font s13">We recommend adding more items or place a Buy Now order to avoid this cost.</p>
        </div>
    );
}

export default ShippingMsg;