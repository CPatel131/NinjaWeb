import React , {useState}from 'react';
import axios from 'axios';
import './Table.css';
import '../components/barchart/bar.css'

//This function makes the bar graphs based on the data
function BarGroup(props) {
    let barPadding = 5
    let barColour = '#348AA7'
    let widthScale = d => d * 10
  
    let width = widthScale(props.d.value)/10
    let yMid = props.barHeight * 0.5
    
    return <g className="bar-group">
      <text className="name-label" x="20" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
      <rect x="20" y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label"  x={75} y={yMid} alignmentBaseline="middle" >{props.d.value >= 1 && props.d.value}</text>
    </g>

  }
  function BarGroup_1(props) {
    let barPadding = 5
    let barColour = '#348AA7'
    let widthScale = d => d * 10
  
    let width = widthScale(props.d.value)/100
    let yMid = props.barHeight * 0.5
    
    return <g className="bar-group">
      <text className="name-label" x="20" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
      <rect x="20" y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label"  x={ 75} y={yMid} alignmentBaseline="middle" >{props.d.value >= 1 && props.d.value}</text>
    </g>

  }


export default class User extends React.Component {
	//User class has
	constructor(){
		super();
	this.state = {
	  persons: [],
	  username: "",
	  password: "",
	  alert: "",
	  point:[],
	  total_distance:[],
	  total_calories:[]
	}
	}
	//THis function makes all the calls to the database and assigns the data to the corresponding variable
	componentDidMount() {
	  axios.get(`http://cs431-08.cs.rutgers.edu:3001/admin_user/`)
		.then(res => {
		  const persons = res.data;
		  this.setState({ persons });
		})
		axios.get(`http://cs431-08.cs.rutgers.edu:3001/top10_point/`)
		.then(res => {
		  const point = res.data;
		  this.setState({ point });
		})
		axios.get(`http://cs431-08.cs.rutgers.edu:3001/top10_total_distance/`)
		.then(res => {
		  const total_distance = res.data;
		  this.setState({ total_distance});
		})
		axios.get(`http://cs431-08.cs.rutgers.edu:3001/top10_total_calories/`)
		.then(res => {
		  const total_calories = res.data;
		  this.setState({ total_calories});
		})
	
	}
		
	
	render() {		
		//This creates the three charts of top10 users with points, total_distance and total_calories
		let barHeight = 50
          
    	let barGroups = this.state.total_calories.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
                                                      <BarGroup_1 d={d} barHeight={barHeight} />
                                                    </g>) 

		let barGroups2 = this.state.total_distance.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
														<BarGroup d={d} barHeight={barHeight} />
														</g>) 
		let barGroups3 = this.state.point.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
				<BarGroup d={d} barHeight={barHeight} />
				</g>) 
// Here the code shows the table, takes in a username and password and deactivate or activate an account, and shows the graph of User table in the database
	  return (	
	<div className = "User">
		<h1>User Table</h1>
		<div>
		<text>Username: </text>
		  <input value={this.state.username} type = "text" id = "username" onChange={(e)=>{this.setState({username: e.target.value})}} /> <br /><br />
        <text>Password: </text>
		<input value = {this.state.password} type = "text" id = "password" onChange={(e) =>{this.setState({password: e.target.value})}}/> <br /><br />
        <button onClick={()=>
				this.state.username+' '+ axios.get('http://cs431-08.cs.rutgers.edu:3001/deactivate/?username='+this.state.username
				+'&password='+this.state.password).then(res => {
					this.state.alert = res.data
					alert(this.state.alert)}).then(this.componentDidMount())
				} >DEACTIVATE</button>  
		<button type = "submit" onClick={()=>
				axios.get('http://cs431-08.cs.rutgers.edu:3001/activate/?username='+this.state.username
				+'&password='+this.state.password).then(res => {
					this.state.alert = res.data
					alert(this.state.alert)}).then(this.componentDidMount())
				} >ACTIVATE</button>  
			  </div>
		  <table>
			  <tbody>
				  <tr>
					  <th>User ID</th>
					  <th>Username</th>
					  <th>Password</th>
					  <th>Name</th>
					  <th>Active</th>


				  </tr>
				  {this.state.persons
					  .map(persons => <tr key={persons.user_id}>
						  <td>{persons.user_id} </td>
						  <td>{persons.username}</td>
						  <td>{persons.password}</td>
						  <td> {persons.Name}</td>
						  <td>{persons.Active}</td>

					  </tr>
					  )}
			  </tbody>
		  </table>
		  <svg style={{height : this.state.total_calories.length * 60, width : 1000}}>
			<g className="container">
			<text className="title" x="10" y="30">Top 10 User Calories Burned</text>
			<g className="chart" transform="translate(100,60)">
			{barGroups}
			</g>
		</g>
		</svg>

		<svg style={{height : this.state.total_distance.length * 60, width : 1000}}>
			<g className="container">
			<text className="title" x="10" y="30">Top 10 Users Distance Runned </text>
			<g className="chart" transform="translate(100,60)">
			{barGroups2}
			</g>
		</g>
		</svg>
		<svg style={{height : this.state.point.length * 60, width : 1000}}>
			<g className="container">
			<text className="title" x="10" y="30">Top 10 Users Points </text>
			<g className="chart" transform="translate(100,60)">
			{barGroups3}
			</g>
		</g>
		</svg>

			  </div>
	  );

  }
}
