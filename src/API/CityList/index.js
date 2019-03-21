import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';

const CityList =({defaultCities}) => {
	const cityList = defaultCities.map((city, i) => {
		return (			
		    <Col xs={2} className="bg-info m-3">
		    	<h2>40°</h2> {/* because city list is just array I created */}
		    	<p>{city}</p>
		    </Col>
		)
	});
	
	return(
		<Container className="bg-info">
			<Row className="text-center bg-light d-flex justify-content-center">
			{cityList}
			</Row>
		</Container>
	)
}

export default CityList;

