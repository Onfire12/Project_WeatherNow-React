import React, { Component } from 'react';
import { Form, FormControl, Button,Modal, Container, Col, Row} from 'react-bootstrap';
import { withRouter } from 'react-router';
import BackGroundImg from '../../project3_img/rainy_project3/rainy1.jpg';


const Img={
	width:"100%",
	height:"100%",
	background:`url(${BackGroundImg})`
}

class Search extends Component {
	constructor(){
		super();
		this.state = {
			keyword: '',
			object: [],
			city: null,
			detailShow:false
		}
		this.toggleDetailShow=this.toggleDetailShow.bind(this)
	}

	toggleDetailShow(){
		if(this.state.detailShow === false){
    		console.log('show login BTN')
    		this.setState({ detailShow: true });
    	} else {
    		this.setState({ detailShow: false });
    	}
	}
	handleChange = (e) =>{
		this.setState({
			[e.target.name]: e.target.value 
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		console.log('handleSubmitSearch Weather')
		try { // 9000/auth should be 9000/city/
			const searchResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.keyword}&appid=5cd9e29e47d5913119c8c72365de7b15`);
			if(!  searchResponse.ok){
	        	
	        	throw Error(searchResponse.statusText);
	    	}

		    console.log(searchResponse, ' this is just searchResponse')

		    const searchResponseParsedJson = await searchResponse.json();

		    console.log(searchResponseParsedJson, ' parsed searchResponse')
		    
		    this.setState({
		       	object: searchResponseParsedJson,
		       	city: searchResponseParsedJson.name

	    	});
		} catch(err) {
			console.log(err);
		}
	}


	addCity = async (e) => {
		e.preventDefault();
		console.log('addCity is working', this.state.object.name)

		try {
			const cityListResponse = await fetch(`${process.env.REACT_APP_API}/users/city`, {
				method: 'POST',
				body: JSON.stringify({ keyword: this.state.object.name }),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			console.log('Here')
			if(!cityListResponse.ok){			
				throw Error('addCity error', cityListResponse.statusText)
			} else {
				console.log('add city success');
			}
			const parsedResponse = await cityListResponse.json();

			console.log(this.props.history)
			if(parsedResponse.data === 'added city!!!'){
				this.props.history.push('/');
				// this.props.handleRedirect();
				console.log(parsedResponse.data,"addCity: the parsedRsponseData")
			}
			console.log(parsedResponse, ' this is addCity response from express api');

		} catch(err) {
			console.log(err);
		}
	}


	render(){
		console.log(this.props, '==================')
		console.log(this.state.object.name,'the objectName')
		return(
			
			
				<div>
			    	<div>
			    		{this.state.city !== null ? 
			    		<div className="searched">
	

			    			<div className="weatherBrief">
				    			<div className="tempAndName">
					    			<h1 >{this.state.object.main ? Math.floor(this.state.object.main.temp - 273.15) : null}° 
									</h1>
									<h5>{this.state.object.name}</h5>
								</div>

								
								<div className="detailAndAdd">
									<form className="detail">
										<Button onClick={this.toggleDetailShow}>Detail</Button>
									</form>
						    		<form onSubmit={this.addCity}>
						    			<Button type="submit" variant="outline-primary" className="m-3">Add to your list</Button>
						    		</form>
					    		</div>
					    		


			    			</div>

				    		

							<Modal show={this.state.detailShow} onHide={this.toggleDetailShow} >
				    		<ul >
				    			<li>{this.state.object.main ? this.state.object.weather[0].main : null}</li>
				    			<li>{this.state.object.main ? this.state.object.weather[0].description : null}</li>
				    			<li>clouds : {this.state.object.main ? this.state.object.clouds.all : null}</li>
				    			<li>Humidity : {this.state.object.main ? this.state.object.main.humidity : null}</li>
				    			<li>temp_max : {this.state.object.main ? Math.floor(this.state.object.main.temp_max - 273.15) : null}</li>
				    			<li>temp_min : {this.state.object.main ? Math.floor(this.state.object.main.temp_min - 273.15) : null}</li>
				    			<li>wind speed : {this.state.object.main ? this.state.object.wind.speed : null}</li>
				    			<li>wind degree : {this.state.object.main ? this.state.object.wind.deg : null}</li>
				    		</ul>
							</Modal>
							
							

			    		</div>
			    		: null
								}



			    	</div>
					<div className="searchBar d-flex justify-content-center">
						<Form inline onSubmit={this.handleSubmit}>
					      	<FormControl type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} placeholder="Search Cities" className="mr-sm-2" />
					      	<Button  type="submit" variant="dark">Search</Button>
					    </Form>
			    	</div>




			    </div>

	    	
		)
	}
}

export default withRouter(Search);


