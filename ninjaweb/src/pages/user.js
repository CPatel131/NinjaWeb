import React from 'react';
import axios from 'axios';

export default class User extends React.Component {
	state = {
	  persons: []
	}
  
	componentDidMount() {
	  axios.get(`http://cs431-08.cs.rutgers.edu:3002/admin_user/`)
		.then(res => {
		  const persons = res.data;
		  this.setState({ persons });
		})
	}
  
	render() {
	  return (
		<ul>
		  {
			this.state.persons
			  .map(person =>
				<li key={person.user_id}>{person.user_id} {person.username} {person.password} {person.name} {person.IsAdmin}</li>
			  )
		  }
		</ul>
		
	  )
	}
  }
