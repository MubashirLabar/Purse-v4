import React from 'react';
import Header from "../pages/Header";

function ImportWishList(props) {
    return (
        <React.Fragment>
            <Header />
            <div className="import-p  rel">
                <div className="wrapper flex flex-col">
                    <div className="head">
                        <h2 className="title font b s30">Import a new or existing Amazon Wish List.</h2>
                        <p className="txt font s15">Connect your Amazon Wish List to quickly checkout. We'll keep track of items you add to the list, for easy reuse.</p>
                    </div>
                     
                    {/* Step 1 */}
                    <div className="block flex">
                        <div className="left">
                            <h2 className="tit font b s16">step 1</h2>
                            <h1 className="lbl font b s22">Add Item(s) to an Amazon Wish List</h1>
                            <p className="txt font s15"><span>1.</span>Visit Amazon and add items to your Wish List.</p>
                            <p className="txt font s15"><span>2.</span>Select an existing Wish List or create a new one.</p>
                            <p className="txt font s15"><span>3.</span>Ensure the list is set to "public".</p>
                            <a href="https://www.amazon.com/" target="_blank" className="noul button link anim font b s16 cfff">Add to wish list <i className="ico icon-external-link" /></a>
                        </div>
                        <div className="right">
                            <img src={require("../images/amazon-add-to-list.gif")} className="gif" />
                        </div>
                    </div>

                    {/* Step 2 */}
					<div className="block flex">
						<div className="left">
							<h2 className="tit font b s16">step 2</h2>
							<h1 className="lbl font b s22">Copy List URL</h1>
							<p className="txt font s15"><span>1.</span>Navigate to your Wish List on Amazon and click 'Send List to Others'.</p>
							<p className="txt font s15"><span>2.</span>Copy List link.</p>
						</div>
						<div className="right">
							<img src={require("../images/amazon-copy-list-link.gif")} className="gif" />
						</div>
					</div>
                </div>

                {/* Amazon link */}
				<div className="wishlin flex flex-col">
					<h2 className="fontb s22 color lbl">Paste Your Amazon Wish List Link Here</h2>
					<div className="feild flex rel aic anim "> 
						<input type="text" placeholder="With List URL" className="iput anim s18 fontn" />
						<button className="button btn fontb s16 cfff anim">Next</button>
					</div>
					{/*<p className="txt fontn s16 fadeIn">Please enter a valid Amazon Wish List URL</p>*/}                     
				</div>
            </div>
        </React.Fragment>

    );
}

export default ImportWishList;