import React, { Component, Fragment } from "react";
import { Bar } from "react-chartjs-2";

/**
 * Budget VS Spending Chart
 */

class BarChart2 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
    };

    createBarChart = () => {
        let incomeCatBudget = this.props.categoryObj.income_categories_budget;
        let incomeCatSpending = this.props.categoryObj.income_categories_monthly;

        let incomeBudgetLabels = Object.keys(incomeCatBudget);
        let incomeBudgets = Object.values(incomeCatBudget);

        let incomeSpending = [];
        for (let key in incomeCatSpending) {
            if (incomeCatSpending[key].hasOwnProperty(this.props.monthYearDate)) {
                incomeSpending.push(incomeCatSpending[key][this.props.monthYearDate]);
            }
            else {
                incomeSpending.push(0);
            }
        }


        let incomeBarData = {
            datasets: [{
                data: incomeBudgets,
                backgroundColor: 'rgb(79, 141, 223)',
                label: 'Goal',
            }, {
                data: incomeSpending,
                backgroundColor: "#12A874",
                label: 'Income',
            }],
            labels: incomeBudgetLabels,
            borderWidth: 1,
        }
        let barOptions = {
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
            incomeBarData,
            barOptions
        ])
    }


    render() {
        if (this.props.loading) {
            return (<div></div>)
        }
        let incomeBarData = {}, incomeBudgetOptions;
        [incomeBarData, incomeBudgetOptions] = this.createBarChart();
        return (
            <Fragment>
                <Bar
                    data={incomeBarData}
                    options={incomeBudgetOptions} />
            </Fragment>)
    }
}


export default BarChart2;
