import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

class Header extends Component {
	constructor(){
		super();
		this.state ={
			loginShow:false,
			signUpShow:false,
			username: '',
		}

	}

	componentDidMount() {
		const userName = localStorage.getItem('weatherUser');
		// console.log('USERNAME = ', userName);
		this.setState({
			username: userName
		});
	}

	render(){
	return(
		<header>
			<div>
				<Navbar bg="dark" variant="dark">
				    <Navbar.Brand href="/">Weather Now</Navbar.Brand>
				    <Nav className="mr-auto">
				        <Nav.Link href="/">Home</Nav.Link>
				        <Nav.Link href='/login'>Login/SignUp</Nav.Link>
				        
						<Nav.Link href="/users">{this.state.username}</Nav.Link>
				    </Nav>
				    <Form inline>
				      	<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				      	<Button variant="outline-info">Search</Button>
				    </Form>
				</Navbar>
  			</div>
		</header>
	)
	}
}

export default Header;