class HomePage extends React.Component{
	
	constructor(props){
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.state = {
			why: [
				{lbl:"Privacy", icon:"icon-document-locked", txt:"By properly applying end-to-end encryption, KShared achieves actual privacy by design."},
				{lbl:"Powerful", icon:"icon-cloud-add", txt:"KShared is a cloud based service which can be used from all major devices and platforms from anywhere with Internet."},
				{lbl:"Secure", icon:"icon-folder-locked", txt:"KShared is carefully engineered to achieve the highest level of security for its users."},
				{lbl:"Tarensparent", icon:"icon-certificate", txt:"Kshared client apps are Public Source. Its cryptographic architecture is specified in a comprehensive Security Whitepaper."},
				{lbl:"Reliable", icon:"icon-cloud-wind", txt:"KShared owns and operates its redundant server infrastructure directly, ensuring that your data always remains available."},
				{lbl:"Generous", icon:"icon-document-cloud", txt:"KShared is one of the most generous cloud services on the Internet, with easy ways to expand and extend your free storage."},
			]
		}
	} 
		
	componentDidMount(){
		var self = this;
		document.title = __zuz.site_name;
		zuz.global.setHeader && zuz.global.setHeader("/");
	}	
		
	onSelect(meta){
		var self = this,
		params = '?pl=' + meta.months + '&pr=' + meta.price + '&step=pmt';
		self.props.history.push("/account/signin?next=" + urlencode("/premium" + params));
	}	
	
	render(){
		var self = this;
		const {why} = self.state;
		
		return (
			<div className="home">
				{/*Home Header Section*/}
				<div className="head-sec rel" style={{background: "#e2e2e2 url("+__zuz.theme+"ui/header-bg.jpg) no-repeat center"}}>
					<div className="wrap flex aic"> 
						<div className="intro flex flex-col">
							<h1 className="slogan fontn s36"><span className="fontb s48">Secure Cloud Storage</span><br/>Made File Sharing Simple</h1>
							<p className="txt fontn s22 c333">Share any number of files in seconds. View over 200 file types online.</p>
							<div className="btns flex">
								<button className="button btn fontn s18 anim">Create Account</button>
							</div>
							
						</div>
						<div className="vector">
							<img className="img" src={__zuz.theme + "ui/header-img.png"} />
						</div>
					</div>
				</div> 
				
				{/* Section 1 */}
				<div className="section rel flex aic">
					<div className="wrapper flex aic"> 
						<div className="intro">
							<h1 className="title fontr s32">Fast Transfers and Reliable Storage</h1>
							<p className="txt fontn s18">Make secure and simple cloud storage and transfer files in easiest way. Create a free Kshared account today!</p>
							<div className="btns flex aic"><button className="button btn fontn s18 anim">Get started now!</button></div>
						</div>
						<div className="graphic">
							<img className="img" src={__zuz.theme + "ui/file-transfer.png"} />
						</div>
					</div> 
				</div>
				
				{/* File Encryption Section */}
				<div className="section ecr flex aic">
					<div className="wrapper flex aic">
						<div className="graphic">
							<img className="img" src={__zuz.theme + "ui/file-lock.svg"} /> 
						</div>
					
						<div className="intro flex flex-col">
							<h1 className="title fontr s32">End-to-End Encryption</h1>
							<p className="txt fontn s17">We want to simplify the handling of your data for you. Our security standards ensure best possible security and confidentiality. Only you have access to your data and your Kshared hard disk. We make sure that your data are available at any time.</p>
						</div>
					</div>
				</div>
				
				{/* Access Any Where Section */}
				<div className="section mobile flex aic">
					<div className="wrapper flex aic">
						<div className="intro flex flex-col">
							<h1 className="title fontr s32">When and where you want </h1>
							<p className="txt fontn s18">Once place your files on Kshared, then you can access your files from any device, from anywhere, from anytime, at home, on the move.</p>
						</div>
						{/* Graphic */}
						<div className="graphic">
							<img className="img" src={__zuz.theme + "ui/mobile.svg"} />
						</div>
					</div>
				</div>
		
				<div className="section">
					<h2 className="price-title fontr s32">No extra charge, choose your plan!</h2>
					<PriceTable onSelect={self.onSelect} />
				</div>
				
				{/* Why USe Sebshare */}
				<div className="section why rel">
					<h2 className="title fontr s32">Why Use Kshared?</h2>
					<div className="content flex aic">
						{
							why.map(item=>{
								return(
									<div className="item" key={"-" + item.lbl + "-"}>
										<div className="icon"><i className={"ico " + item.icon} /></div>
										<h5 className="lbl fontr s26 c333">{item.lbl}</h5>
										<p className="txt fontn s15 c333">{item.txt}</p>
									</div>
								)
							})
						}
					</div>
				</div>
				
				{!isUser() && <Footer />}
			</div>
		)
	}
}