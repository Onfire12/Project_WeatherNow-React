import React, { Component } from 'react';
import { Form, Button, Modal} from 'react-bootstrap';

class Login extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			username: '',
			password: '',
			loginShow: false,
			signUpShow: false,
			logged:false
		}	      	
      	this.toggleLoginShow = this.toggleLoginShow.bind(this);
      	this.toggleSignUpShow = this.toggleSignUpShow.bind(this);
	}

	// toggle for login modal 
    toggleLoginShow() {

    	if(this.state.loginShow === false){
    		console.log('show login BTN')
    		this.setState({ loginShow: true });
    	} else {
    		this.setState({ loginShow: false });
    	}
    }

    // toggle for sign up modal
    toggleSignUpShow() {

    	if(this.state.signUpShow === false){
    		console.log('show Sign Up')
    		this.setState({ signUpShow: true });
    	} else {
    		this.setState({ signUpShow: false });
    	}
    }

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		});
	}

	handleSubmitLogin = async (e) => {
		e.preventDefault();
		console.log('click submitLogin BTN')
		try {
			const loginResponse = await fetch(`${process.env.REACT_APP_API}/users/login`, {
				method: 'POST',
				body: JSON.stringify(this.state),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if(!loginResponse.ok){			
				throw Error('login error', loginResponse.statusText)
			}
			const parsedResponse = await loginResponse.json();
			if(parsedResponse.data === 'Login successful'){
				localStorage.setItem('weatherUser', this.state.username);
				this.props.handleLogin(this.state.username);
				console.log(parsedResponse.data,"the parsedRsponseData")
			}
			console.log(parsedResponse, ' this is login response from express api');
			console.log(this.state.username)
		} catch(err) {
			console.log(err);
		}
	}

	handleSubmitSignUp = async (e) => {
		e.preventDefault();
		console.log('click submitSignUp BTN')
		try {
			const SignUpResponse = await fetch(`${process.env.REACT_APP_API}/users/signup`, {
				method: 'POST',
				body: JSON.stringify(this.state),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if(!SignUpResponse.ok){			
				throw Error('SignUp error', SignUpResponse.statusText)
			}
			const parsedResponse = await SignUpResponse.json();
			if(parsedResponse.data === 'SignUp successful'){
				localStorage.setItem('weatherUser', this.state.username);
				this.props.handleLogin(this.state.username);
				console.log(parsedResponse.data,"SignUp: the parsedRsponseData")
				console.log('this state username:', this.state.username)
			}
			console.log(parsedResponse, ' this is SignUp response from express api');
		} catch(err) {
			console.log(err);
		}
	}



	render(){
		// console.log(this.state.password);
		return(
			<div>

				<Button className="loginBtn"  onClick={this.toggleLoginShow}  size="lg">
				Login
				</Button>
				<Button className="signupBtn" onClick={this.toggleSignUpShow}  size="lg">
				Sign up
				</Button>

		    	{/* Login Modal */}
		        <Modal show={this.state.loginShow} onHide={this.toggleLoginShow}>
		          	<Modal.Header closeButton>
		            <Modal.Title>Log in</Modal.Title>
		          	</Modal.Header>
		          	<Modal.Body>

			        	<Form onSubmit={this.handleSubmitSignUp}>
						  	<Form.Group className="mt-3">				  			
						    	<Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
						  	</Form.Group>

						  	<Form.Group>			    
						    	<Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
						  	</Form.Group>					  	
						</Form>

		          </Modal.Body>

		          <Modal.Footer>
		            <Button variant="secondary" onClick={this.toggleLoginShow}>
		              Close
		            </Button>
		            <Button variant="primary" onClick={this.handleSubmitLogin} type="submit">Submit</Button>
		          </Modal.Footer>
		        </Modal>

		        {/* Sign Up Modal */}

		        <Modal show={this.state.signUpShow} onHide={this.toggleSignUpShow}>
		         	<Modal.Header closeButton>
		            	<Modal.Title>Sign up</Modal.Title>
		         	</Modal.Header>

		          	<Modal.Body>

			        	<Form onSubmit={this.handleSubmitSignUp}>
						  	<Form.Group className="mt-3" >				  		
						    	<Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
						  	</Form.Group>

						  	<Form.Group >			    
						    	<Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
						  	</Form.Group>					  	
						</Form>
			        </Modal.Body>

		          	<Modal.Footer>
			            <Button variant="secondary" onClick={this.toggleSignUpShow}>Close</Button>
			            <Button variant="primary" onClick={this.handleSubmitSignUp} type="submit">Submit</Button>
		          	</Modal.Footer>
		        </Modal>
			</div>
		)
	}
}

export default Login;




