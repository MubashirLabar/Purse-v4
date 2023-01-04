class Header extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			nav: [
				{label: "Home", slug: "/"},
				{label: "Cloude Drive", slug: "/account/signin?next=" + urlencode("/drive")},
				{label: "Premium", slug: "/premium"},
				{label: "Blog", slug: "/blog"},
			],
			rightNav: [
				{label: "Login", slug: "/account/signin"},
				{label: "Sign Up", slug: "/account/signup"},
			],
			 isTop: true,
			 tab: "/"
		}
	} 
	
	componentDidMount(){
		window.onscroll = e => {
			if(window.scrollY > 75){
				this.setState({ isTop: false });
			}else{
				this.setState({isTop: true});
			}		
		}	
		var self = this;
		zuz.global.setHeader = (tab) => {
			self.setState({tab: tab});
		}
	}

	
	render(){
		var self = this;
		const {nav,rightNav,isTop,tab} = self.state;
		const navItem = [], rightItem= [];
			
		{/* Push nav Item in navItem */}
		for(let i=0; i<nav.length; i++){
			navItem.push(
				<Link to={nav[i].slug} className={"item fontr s19 cfff noul anim " + (tab == nav[i].slug ? "on" : "")}>{nav[i].label}</Link>
			)
		}
		
		{/* Push nav Item in Right navItem */}
		for(let i=0; i<rightNav.length; i++){
			rightItem.push(
				<Link to={rightNav[i].slug} className={"noul btn  fontr s19 anim " + (rightNav[i].label == "Sign Up" && "s-btn") + (tab == rightNav[i].slug ? " on" : "")}>{rightNav[i].label}</Link>
			) 
		}
		
		return (	 
			<React.Fragment>
				<div className={"header fixed flex aic anim " + (isTop == false || tab !== '/' ? "head-bg" : "")}>	
					<div className="wrapper flex aic">
						{/* Logo */}
						<Link to={isUser() ? "/drive" : "/"} className="logo noul anim" >
							<h1 className="txt fontr b s32 cfff">KShard</h1>
						</Link>
						
						{/* Navbar */}
						<div className='nav flex aic'>
							{navItem}
						</div> 
						<div className="r-nav flex aic">
							{rightItem}
						</div>
					</div>
				</div>
				 
				{/*<div className="headclr"></div>*/}
			</React.Fragment>
		)
	}
}