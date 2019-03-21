import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Login from '../Login';
import UserContainer from '../UserContainer';


class API extends Component {

	constructor() {
	    super();
	    this.state = {
	      error: null,
	      weathers: [],
	      loading: true,
	      'san francisco': [],
	      tokyo: [],
	      beijing: [],
	      london: [],
	      defaultCities: ['Melbourne', 'Paris', 'London', 'New York'],
	      keyword: '',
	      username: '',
		  logged:false
	    };
	    // this.handleRedirect = this.handleRedirect.bind(this)
	}

	componentDidMount(){

	    this.getTokyo();
	    this.getSanFrancisco();
	    this.getBeijing();
	    this.getLondon();
	    console.log(this.state.username);
	    
	    const userName = localStorage.getItem('weatherUser');
		// console.log('USERNAME = ', userName);
		this.setState({
			username: userName
		});
	}


  


  	getWeathers = async (city) => {

	    try {
	    	// console.log(city);
	      	
	      	const weathers = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5cd9e29e47d5913119c8c72365de7b15`);
	      	
	      	if(!weathers.ok){
	        	
	        	throw Error(weathers.statusText);
	    	}

		    // console.log(weathers, ' this is just weathers')

		    const weathersParsedJson = await weathers.json();

		    // console.log(weathersParsedJson, ' parsed weathers')
		    
		    this.setState({
		       	loading: false,
		       	[city]: weathersParsedJson
	    	});

	    } catch(err){
	      console.log(err, 'error in catch block');
	      return err
	    }
  	}

  	getTokyo = () => {
		this.getWeathers('tokyo')  		
  	}
  	getSanFrancisco = () => {
		this.getWeathers('san francisco')  		
  	}
    getBeijing = () => {
		this.getWeathers('beijing')  		
  	} 
    getLondon = () => {
		this.getWeathers('london')  		
  	} 	

  	handleSearch = keyword =>{
  		console.log('handleSubmit is working')
  		this.setState({
  			keyword: keyword
  		})
  	}

	handleLogin =()=>{
		this.setState({
			logged:true
		})
	}


  	render() {
  		// console.log(this.state.username, '=========== USER NAME ===========')
  		// console.log(this.state.cityList, '=========== CITY LIST ===========')
		// console.log(this.props)
		
  		// if user is logged three major city

  		return(
			  
			
  			<div >
				<h2 className="title">Weather Now</h2>
  				{/* <h3 className="heading">{this.state.username} page</h3> */}
  				<Container className="container">
					  <Row className="text-center  d-flex justify-content-center">
					    <Col xs={2} className="m-3 weatherSquare">
					    	<h2>{this.state['san francisco'].main ? Math.floor(this.state['san francisco'].main.temp - 273.15) : null}°</h2>
					    	<p>{this.state['san francisco'].name}</p>
					    	<p>{this.state['san francisco'].main ? this.state['san francisco'].weather[0].description : null}</p>

					    </Col>
					    <Col xs={2} className="m-3 weatherSquare">
						    <h2>{this.state.beijing.main ? Math.floor(this.state.beijing.main.temp - 273.15) : null}°</h2>
					    	<p>{this.state.beijing.name}</p>
					    	<p>{this.state.beijing.main ? this.state.beijing.weather[0].description : null}</p>
					    </Col>
					    <Col xs={2} className="m-3 weatherSquare">
						    <h2>{this.state.tokyo.main ? Math.floor(this.state.tokyo.main.temp - 273.15) : null}°</h2>
					    	<p>{this.state.tokyo.name}</p>
					    	<p>{this.state.tokyo.main ? this.state.tokyo.weather[0].description : null}</p>
					    </Col>
					    <Col xs={2} className="m-3 weatherSquare">
						    <h2>{this.state.london.main ? Math.floor(this.state.london.main.temp - 273.15) : null}°</h2>
					    	<p>{this.state.london.name}</p>
					    	<p>{this.state.london.main ? this.state.london.weather[0].description : null}</p>
					    </Col>
					 </Row>
					 {/* <Search handleSearch={this.handleSearch} /> */}

				</Container>

		

				{this.state.logged ? <UserContainer/>:<Login handleLogin={this.handleLogin}/>}
  			</div>


  		)

    }
}


export default API;













