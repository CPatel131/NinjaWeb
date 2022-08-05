import React from 'react';
import axios from 'axios';
import './Table.css';
//This function makes the bar graphs
function BarGroup(props) {
    let barPadding = 5
    let barColour = '#348AA7'
    let widthScale = d => d * 10
  
    let width = widthScale(props.d.value)
    let yMid = props.barHeight * 0.5
    
    return <g className="bar-group">
      <text className="name-label" x="20" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
      <rect x="20" y={barPadding * 0.5} width={width+100} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width/2 + 123} y={yMid} alignmentBaseline="middle" >{props.d.value >= 1 && props.d.value}</text>
    </g>
  }

export default class Follow extends React.Component {
	state = {
	  follow : [],
	  follow2 : [],
	  follow3 : []
	}
//This pulls the data from the API
	componentDidMount() {
		axios.get(`http://cs431-08.cs.rutgers.edu:3001/show_follower_table/`)
		.then(res => {
			const follow = res.data;
			this.setState({ follow });
		})
		axios.get(`http://cs431-08.cs.rutgers.edu:3001/show_follow_count/`)
		.then(res => {
			const follow2 = res.data;
			this.setState({ follow2 });
		})
		axios.get(`http://cs431-08.cs.rutgers.edu:3001/show_follow_count2/`)
		.then(res => {
			const follow3 = res.data;
			this.setState({ follow3 });
		})
	}
  
	render() {
		let barHeight = 50
          
    	let barGroups = this.state.follow2.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
                                                      <BarGroup d={d} barHeight={barHeight} />
                                                    </g>)
		let barGroups2 = this.state.follow3.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
														<BarGroup d={d} barHeight={barHeight} />
													</g>)
	  return (
		<>
		<svg style={{height : this.state.follow2.length * 75, width : 1000}}>
			<g className="container">
			<text className="title" x="10" y="30">Follower Count for each User</text>
			<g className="chart" transform="translate(100,60)">
			{barGroups}
			</g>
		</g>
		</svg>
		<svg style={{height : this.state.follow3.length * 75, width : 1000}}>
			<g className="container">
			<text className="title" x="10" y="30">Following Counts for Users</text>
			<g className="chart" transform="translate(100,60)">
			{barGroups2}
			</g>
		</g>
		</svg>
		<h1>Follower Table</h1>
		<table>
			  <tr>
				  <th>User ID</th>
				  <th>Username</th>
				  <th>Follow ID</th>
				  <th>Follow Username</th>
  </tr>
		  {
			this.state.follow
			  .map(follow =>
				<tr key={follow.user_id & follow.follow_id}>
					<td>{follow.user_id} </td>
					<td>{follow.username}</td>
					<td> {follow.follow_id}</td> 
					<td> {follow.follow_username}</td> </tr>
			  )
		  }
		</table>
		</>
	  )

	}
  }
