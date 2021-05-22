import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Practice', 'Test', 'Performance'],
                datasets: [
                    {
                        label: 'Completion (%)',
                        data: [
                            80,
                            30,
                            70
                        ],
                    }
                ]
            },
            chartConfig: {
                fillShadowGradient: 'skyblue',
                fillShadowGradientOpacity: 1
            }
        }
    }
    render() {
        return (
            <div className="chart" style={{ width: "50vw" }}>
                <Bar
                    height={100}
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Overall Completion'
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        scales: {
                            y: {
                                suggestedMin: 50,
                                suggestedMax: 100
                            }
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;