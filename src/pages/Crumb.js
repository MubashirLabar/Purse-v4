import React, {useState, useEffect} from 'react';
import {
    randit,
    getExtension,    
    me,
    getDownloadUrl,
    post,
    encode,
    getCookie,
    sessionExpired,
    formatSize
} from "../core";
import { Link } from "react-router-dom";

class Crumb extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            refresh: 0
        }
    }

    refresh(){
        this.setState({refresh: this.state.refresh + 1});
    }

    render(){

        const { title, disk, search, alerts, user, crumb } = this.props;
        const { pro, alarms } = me();        
        let alertCount = alarms.length > 0 ? alarms.filter(x=>x.status==0).length : 0;
        let bread = [];
        if(crumb && crumb.length && crumb.length > 0){
            bread.push(<Link to={"/h"} className="color noulh fonta s14">Files</Link>);
            bread.push(<div className="icon-chevron-right chevron" />);
            for(let c = 0; c < crumb.length; c++){
                const { ID, label } = crumb[c];
                bread.push(
                    c < crumb.length - 1 ? <React.Fragment>
                            <Link to={"/h/" + ID} className="color noulh fonta s14">{label}</Link>
                            <div className="icon-chevron-right chevron" />
                        </React.Fragment>
                        : <h2 className="noulh fonta s14">{label}</h2>
                );
            }
        }

        return (
            <div className="header crumb rel">
                <div className="flex aic rel">
                    <div className="rel s18 fonta">{title}</div>
                    <div className="actions abs flex aic">
                        {disk && <div className="disk flex aic" title="Disk space">
                            <div className="icon-cloud ico s24" />
                            <h2 className="s14 font c333">{formatSize(me().dsk.cons)} / {formatSize(me().dsk.avl)}</h2>                        
                            {pro && <h2 className="s14 b6 c333 font">({pro.plan.name})</h2>}
                            {(!pro || pro.id != 'pro-2') && <Link to="/p" className="color s14 font noulh">Upgrade account</Link>}
                        </div>}
                        {search && <div className="search flex aic">
                            <div className="icon-search ico s20" />
                            <input type="text" placeholder="Search" className="s15 font c333 query" />
                        </div>}
                        {alerts && <button className={"alarms s26 rel icon-" + (alertCount > 0 ? "bell" : "bell-o")}>
                            {alertCount > 0 && <div className="counter font abs cfff s12 b6">{alertCount > 20 ? '20+' : alertCount}</div>}
                        </button>}
                        {user && <Link to="/account" className="user rel">
                            <div className="naam abs abc b6 cfff s14">{me().name.first.charAt(0)}{me().name.last.charAt(0)}</div>
                        </Link>}
                    </div>
                </div>
                <div className="flex aic rel bread">
                    {
                        bread
                    }
                </div>
            </div>
        );

    }
}

export default Crumb;