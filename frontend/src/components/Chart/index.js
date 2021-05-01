import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['Practice','Test', 'Performance'],
                datasets:[
                    {
                        label: 'Completion (%)',
                        data:[
                            80,
                            30,
                            70
                        ],
                    }
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                ]
            }
        }
    }
    render(){
        return(
            <div className="chart">
                <Bar
                    data = {this.state.chartData}
                    options={{
                        title: {
                            display:true,
                            text: 'Overall Completion'
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;