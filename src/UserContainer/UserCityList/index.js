import React, { Component } from 'react';
import { Col, Row, Container} from 'react-bootstrap';

const UserCityList =({cityList}) => {
	console.log(cityList, 'From UserCityList')
	const userCityList = cityList.map((city, i) => {
		// console.log(city, "From MAP");
		return (			
		    <li className="cityList" key={i}>
		     
		    	<p className="cityListP">{city}</p>
		    </li>
		)
	});
	console.log('USER CITY LIST AFTER MAP = ', userCityList)
	
	return(
		<div className="cityListContainer">
			
			<ul className="cityListUl">
				{userCityList}
			</ul>

			

		</div>
			
			
			
		
	)
}

export default UserCityList;