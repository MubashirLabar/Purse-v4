import React from 'react'; 

class ShippingAddress extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			fullname: null,
			address: null,
			optaddress: null,
			city: null,
			state: null,
			postal: null,
			phone: null,
			country: null  
		}
	}
	
	addAddress(){
		var self = this; 
		const {fullname, address, optaddress, city, state, postal, phone, country} = this.state;
		if(fullname == null){
			self.fullname.focus();
		}else if(address == null){ 
			self.address.focus();
		}else if(city == null){
			self.city.focus();
		}else if(state == null){
			self.state.focus();
		}else if(postal == null){
			self.postal.focus();
		}else if(phone == null){
			self.phone.focus();
		}else if(country == null){
			self.country.focus();
		}else{
			console.log("success");
		}	
	}
	
	render(){
		var self = this; 
		const {fullname, address, optaddress, city, state, postal, phone, country} = this.state;
		
		console.log(fullname);
		return (
			<div className="address">
				<h2 className="title fontn s28">Add New Address</h2>
				<div className="form">
					<div className="item">
						<input type="text" placeholder="Full Name" ref={ref=>{self.fullname = ref}} onChange={(e)=>{self.setState({fullname: e.target.value == "" ? null : e.target.value})}} className="iput anim fontn s16"/>
					</div>
					<div className="item">
						<input type="text" placeholder="Street Address" ref={ref=>{self.address = ref}} onChange={(e)=>{self.setState({address: e.target.value == "" ? null : e.target.value})}} className="iput anim fontn s16"/>
					</div>
					<div className="item">
						<input type="text" placeholder="Address Line 2 (Optional)" ref={ref=>{self.optaddress = ref}} onChange={(e)=>{self.setState({optaddress: e.target.value == "" ? null : e.target.value})}} className="iput anim fontn s16"/>
					</div>
					<div className="item">
						<input type="text" placeholder="City" ref={ref=>{self.city = ref}} onChange={(e)=>{self.setState({city: e.target.value == "" ? null : e.target.value})}} className="iput anim fontn s16"/>
					</div>
					<div className="item">
						<select className="iput fontn s16 anim " name="State" ref={ref=>{self.state = ref}} onChange={(e)=>{self.setState({state: e.target.value === "" ? null : e.target.value})}}>
							<option defaultValue="Select Option">Select State</option>
							<option value="Green">Alabama</option>
							<option value="Black">Alaska</option>
							<option value="Red">Arizona</option>
						</select>  
					</div>
					<div className="item">
						<input type="text" placeholder="Zip / Postal" ref={ref=>{self.postal = ref}} onChange={(e)=>{self.setState({postal: e.target.value == "" ? null : e.target.value})}} className="iput anim fontn s16"/>
					</div>
					<div className="item">
						<input type="text" placeholder="Cell Phone" ref={ref=>{self.phone = ref}} onChange={(e)=>{self.setState({phone: e.target.value == "" ? null : e.target.value})}} className="iput anim fontn s16"/>
					</div>
					<div className="item">
						<select className="iput fontn s16 anim " name="country" ref={ref=>{self.country = ref}} onChange={(e)=>{self.setState({country: e.target.value === "" ? null : e.target.value})}}>
							<option defaultValue="Select Option">Select Country</option>
							<option value="Green">Alabama</option>
							<option value="Black">Alaska</option>
							<option value="Red">Arizona</option>
						</select> 
					</div>
					<div className="item">
						<button className="button btn fontb s16 anim" onClick={()=>{self.addAddress()}}>Ship to Address</button>
					</div>
					<div className="item">
						<button onClick={this.props.close} className="button btn csl-btn fontb s16 anim">Cancel</button>
					</div>
				</div>
			</div>
		)
	}
}

export default ShippingAddress