import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';

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
                ]
            },
            chartConfig:{
                fillShadowGradient:'skyblue',
                fillShadowGradientOpacity:1,
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