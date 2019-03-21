import React, { Component } from 'react';
import Users from '../UserList';
import EditUser from '../EditUser';
import Search from '../API/Search';
import UserCityList from './UserCityList';
import {  Button } from 'react-bootstrap';
class UserContainer extends Component{
    
    constructor(){
        super();
        this.state={
            user:{},
            showModal:false,
            userToEdit:{
                username:'',
                password:'',
                _id:null
            },
            
            
        }
    }
    
    componentDidMount(){
        
        this.getUser();       
    }
    showModal = (user, e)=>{
        this.setState({
            showModal:true,
            userToEdit: user
        });      
    }

    LogOut=()=>{
      localStorage.clear();
      window.location.href='/';
    }
  
//==========================================================//
   //Edit User
    closeModalAndUpdate = async (e) => {
        e.preventDefault(); 
        console.log('close modal working')
        try {
    
          const response = await fetch(`${process.env.REACT_APP_API}/users/` + this.state.userToEdit._id, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(this.state.userToEdit),
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if(!response.ok){
            throw Error(response.statusText);
          }
    
          const parsedResponse = await response.json();
    
          console.log(parsedResponse.data,'Edit User');


          this.setState({
            showModal: false,
            // users: editedUserArray
          });   

          localStorage.clear();
          window.location.href='/';
        } catch(err){
          console.log(err);
        }
      }
      handleEditFormInput = (e) => { 
        this.setState({
          userToEdit: {
            ...this.state.userToEdit,
            [e.target.name]: e.target.value
          }
        }); 
          
      }
    //get User from back-end server 
    getUser = async () => {
        let username = localStorage.getItem('weatherUser',this.state.username);
        console.log('GETTING USER ', this.state.username)
        console.log(this.state.users)
        try {  
          const response = await fetch(`${process.env.REACT_APP_API}/users/currentuser/` + username, {
            method: 'GET',
            credentials: 'include'
          });   
          if(!response.ok){
            throw Error(response.statusText);
          }   
          const currentUserParsed = await response.json();
          console.log(currentUserParsed,'usersParsed.data in UserContainer')
          this.setState({
            user: currentUserParsed.data
          }); 
          
        } catch(err){
          console.log(err);
          return err
        }
      }
      
      getCityList = async () => {
          const userName = localStorage.getItem('weatherUser');
          // console.log(userName);
        const response = await fetch(`${process.env.REACT_APP_API}/users/` + userName + '/cities', {
          method: 'GET',
          credentials: 'include'
        });

        if(!response.ok){
          console.log('error in getCityList')
        }
        const parsedResponse = await response.json();
        console.log('User Citiy List Response = ', parsedResponse)

        this.setState({
          cityList: parsedResponse.data
        })

        // localStorage.setItem('userCityList', parsedResponse.data);
        console.log('========= HERE ==========!!!')
      }

      //Delete User
      deleteUser = async (id, e) => {
        e.preventDefault(); 
        console.log(id,'User ID')   
        try {
          const deleteUser = await fetch(`${process.env.REACT_APP_API}/users/` + id, {
            method: "DELETE",
            credentials: 'include'
          });
          const parsedResponse = await deleteUser.json()
    
          
          localStorage.clear();
          window.location.href='/';
    
          console.log(parsedResponse,'parsedResponse in Delete'); 
        } catch(err){
          console.log(err);
        }  
      }

//========================================================================================//
      
    render(){
        
        return(
            <div>
                {/* <h1>Hello {this.state.username} !!</h1> */}
                
                <Search handleSearch={this.handleSearch} /> 
                <p className="seeList" onClick={this.getCityList} >Click to see CityList</p>
                {this.state.cityList
                ? <UserCityList cityList={this.state.cityList} />
                : null}
                

                <Users user={this.state.user} deleteUser={this.deleteUser} showModal={this.showModal}/>
                {this.state.showModal ? 
                  <EditUser handleEditFormInput={this.handleEditFormInput} userToEdit={this.state.userToEdit} closeModalAndUpdate={this.closeModalAndUpdate}/>
                : null}

                <Button className="logoutBtn" onClick={this.LogOut}>LogOut</Button>

                

                
            </div>
        )
    }
}

export default UserContainer;