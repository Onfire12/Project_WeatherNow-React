import React from 'react';
import './App.css';
import Login from './Login';
import UserContainer from './UserContainer';
import { Route, Switch} from 'react-router-dom';
import API from './API';
import BackGroundImg from './project3_img/bg/bg1.jpg';
import Footer from './Footer';

const Img={
	width:"100%",
	height:"1200px",
  background:`url(${BackGroundImg})`,
  backgroundSize:'cover'
}

const My404 = ()=>{
  return(
    <div>
      You are LOST!
    </div>
  )
}

const App = ()=>{
  return(
    <div className="App">
    <div style={Img}> 
    <main>
      
    
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={API}/>
        <Route exact path="/users" component={UserContainer} />
        <Route exact component={My404} />
      </Switch>
       {/*</div>*/}{/**/}{/**/}{/**/}
    </main>

    
    </div>
    </div>
  )
}


export default App;




