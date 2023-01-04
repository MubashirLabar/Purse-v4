import React from 'react';
import { Link } from "react-router-dom";

function ProductItem(props) {

    const holderView = () => {
        return (
            <div className="product-item rel">
                <div className="item holder anim" />
            </div>
        )
    }

    const view = () => {

        const { ID, flag, title, price, priceDiscount, rating, category, reviewCount, isDigital, poster } = props.meta;

        if(price == "") return null;

        return (
            <div className="product-item rel">
                <Link to={"/product/" + flag.toUpperCase() + "/" + ID} className="item bl noul c333 anim">
                    <img className="graphic" src={poster.large || poster.thumb} />
                    <div className="detail">
                        <div  className="txt font s14 wordwrap">{title}</div>
                        <div className="price flex aic">
                            <strike className="rs font b s14 wordwrap">{price}</strike>
                            <h1 className="seller font b s14">Amazon</h1>
                        </div>
                        <div className="cprice flex"><h1 className="num font b s22 wordwrap">{priceDiscount}</h1></div>
                    </div>
                </Link>
            </div>
        )
    }

    const { holder } = props;

    return (
        holder ? holderView() : view()   
    )
}

export default ProductItem;