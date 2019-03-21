import React, { Component } from 'react';

class getCityWeather extends Component {
	constructor(){
		super()
		this.state = {
			cityList: []
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

        console.log(this.state.cityList)
        
    }

    render(){
    	console.log(this.state.cityList)
    	return(
    		<div>
	    		<h1>This is getCityWeather</h1>
	    		<h2>{this.state.cityList}</h2>
	    	</div>
    	)
    }
}

export default getCityWeather;


	// // function 2
	// const getCityWeather = ({cityList}) => {
	// 	console.log('')
	// 	const userCityList = cityList.map((city, i) => {
	// 		console.log(city, "From MAP in getCityWeather");
	// 		cityArray.push('city');
	// 	})
	// }
	// const cityInfo = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5cd9e29e47d5913119c8c72365de7b15`);
	// const paresed = cityInfo.json();
	