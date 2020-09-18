import React, { Component, Fragment } from "react";
import { Line } from "react-chartjs-2";

/**
 * Total spent over one year? chart
 */

class LineChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
    };

    createLineChart = () => {
        let monthlyData = this.props.totalObject.monthly_data;
        let monthLabels = [], monthlySpent = [], monthlyGained = [];
        let monthCount = 0;
        console.log(monthlyData)
        for (let key in monthlyData) {
            let newObj = key.toString();
            newObj = newObj.substr(newObj.length - 4)
            newObj = parseInt(newObj)
            if (this.props.year === newObj) {
                let splitIndex = key.length - 4;
                console.log("splitindex", key, splitIndex)
                monthLabels.push(key.substring(0, splitIndex) + "/" + key.substring(splitIndex));

                let gain = monthlyData[key]['monthly_gained']
                gain = parseFloat(gain)
                gain = gain.toFixed(2)
                monthlyGained.push(gain);

                let spent = monthlyData[key]['monthly_spent']
                spent = parseFloat(spent)
                spent = spent.toFixed(2)
                monthlySpent.push(spent);

                monthCount += 1;
                if (monthCount > 11) {
                    break;
                }
            }
        }


        let totalLineData = {
            datasets: [{
                data: monthlySpent,
                borderColor: "red",
                fill: false,
                backgroundColor: "red",
                label: 'Expenses',
                pointRadius: 5,
                pointHitRadius: 5
            }, {
                data: monthlyGained,
                borderColor: "#12A874",
                fill: false,
                backgroundColor: "#12A874",
                label: 'Income',
                pointRadius: 5,
                pointHitRadius: 5
            }],
            labels: monthLabels,
            borderWidth: 1,
        }
        let lineOptions = {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: "black",
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        beginAtZero: true,
                        maxTicksLimit: 10,
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "black",

                    }
                }]
            },
            maintainAspectRatio: false,
            aspectRatio: 2.5,
            responsive: true,
            title: {
                display: false,
            }
        }

        return ([
            totalLineData,
            lineOptions
        ])
    }


    render() {
        if (this.props.loading) {
            return (<div></div>)
        }
        let totalLineData = {}, totalLineOptions;
        [totalLineData, totalLineOptions] = this.createLineChart();

        return (
            <Fragment>
                <Line
                    data={totalLineData}
                    options={totalLineOptions} />
            </Fragment>)
    }
}


export default LineChart;
