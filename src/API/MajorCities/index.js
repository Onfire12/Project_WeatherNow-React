import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';

const MajorCities =({majorCities}) => {
	const majorCitiesList = majorCities.map((defaultCity, i) => {
		return (			
		    <Col xs={2} className="bg-info m-3">
		    	<h2>40°</h2> {/* because defaultCity list is just array I created */}
		    	<p>{defaultCity}</p>
		    	<p>{defaultCity}</p>
		    </Col>
		)
	});
	
	return(
		<Container className="bg-info">
			<Row className="text-center bg-light d-flex justify-content-center">
			{majorCitiesList}
			</Row>
		</Container>
	)
}
// const MajorCities = () => {
// 	const majorCities = ['Melbourne', 'Paris', 'London', 'New York'];
// 	for (let i = 0; i < majorCities.length; i++){
// 		const weathers = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${majorCities[i]}&appid=5cd9e29e47d5913119c8c72365de7b15`);
// 		console.log(weathers);
// 	}
// }
export default MajorCities;


