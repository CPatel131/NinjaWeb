import React from 'react';
import axios from 'axios';
import './Table.css';
import '../components/barchart/bar.css'
//This function makes the bar graphs
function BarGroup(props) {
    let barPadding = 5
    let barColour = '#348AA7'
    let widthScale = d => d * 10
  
    let width = widthScale(props.d.value)
    let yMid = props.barHeight * 0.5
    
    return <g className="bar-group">
      <text className="name-label" x="20" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
      <rect x="20" y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width/2 + 23} y={yMid} alignmentBaseline="middle" >{props.d.value >= 1 && props.d.value}</text>
    </g>
  }

export default class Route extends React.Component {

	state = {
	  route: [
	  ],
	  route2: [

	  ],
	  route3: [

	  ]
	}
//This pulls the data from the API
	componentDidMount() {
	  axios.get(`http://cs431-08.cs.rutgers.edu:3001/show_route_table2/`)
		.then(res => {
		  const route = res.data;
		  this.setState({ route });
		})
		axios.get(`http://cs431-08.cs.rutgers.edu:3001/show_route_table/`)
		.then(res => {
			const route2 = res.data;
			this.setState({ route2 });
		})
		axios.get(`http://cs431-08.cs.rutgers.edu:3001/show_route_table3/`)
		.then(res => {
		  const route3 = res.data;
		  this.setState({ route3 });
		})
	}
  
	render() {
		let barHeight = 50
          
    	let barGroups = this.state.route.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
                                                      <BarGroup d={d} barHeight={barHeight} />
                                                    </g>) 

		let barGroups2 = this.state.route3.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
														<BarGroup d={d} barHeight={barHeight} />
														</g>) 
	  return (
		  <>
		<svg style={{height : this.state.route.length * 75, width : 1000}}>
			<g className="container">
			<text className="title" x="10" y="30">Number of Routes Ran for Each Town</text>
			<g className="chart" transform="translate(100,60)">
			{barGroups}
			</g>
		</g>
		</svg>

		<svg style={{height : this.state.route3.length * 65, width : 1000}}>
			<g className="container">
			<text className="title" x="10" y="30">Distance Ran for Each Town</text>
			<g className="chart" transform="translate(100,60)">
			{barGroups2}
			</g>
		</g>
		</svg>
		<h1>Route Table</h1>
		<table>
		<tr>
			<th>Route ID</th>
			<th>Town</th>
			<th>Distance</th>
		</tr>
		{
		this.state.route2
		.map(route2 =>
		<tr key={route2.route_id }>
			<td>{route2.route_id} </td>
			<td>{route2.town}</td>
			<td> {route2.distance}</td> </tr>
		)
		}
		</table>
		</>
		
	  )

	}
  }
