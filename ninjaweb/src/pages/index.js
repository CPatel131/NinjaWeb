import React from 'react';

const data = "Welcome to NinjaWeb!"

const Home = (props) => {
return (
	<div
	style={{
		display: 'flex',
		justifyContent: 'Left',
		alignItems: 'Right',
		height: '100vh'
	}}
	>
	<h1>{data}</h1>
	</div>
);
};

export default Home;
