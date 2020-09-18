import React, { Component, Fragment } from "react";
import { Bar } from "react-chartjs-2";

/**
 * Total Yearly Spending Chart
 */

class BarChart3 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
    };

    createBarChart = () => {
        let expenseCatSpending = this.props.categoryObj.expense_categories_monthly;
        let expenseSpendingLabels = [];

        let year = this.props.monthYearDate.toString().slice(-4);

        let expenseDataset = [];
        for (let key in expenseCatSpending) {
            let catSum = 0;
            for (let month in expenseCatSpending[key]) {
                if (month.includes(year)) {
                    catSum += expenseCatSpending[key][month];
                }
            }
            expenseDataset.push(catSum);
            expenseSpendingLabels.push(key);
        }

        let expenseSpending = [];
        for (let key in expenseCatSpending) {
            if (expenseCatSpending[key].hasOwnProperty(this.props.monthYearDate)) {
                expenseSpending.push(expenseCatSpending[key][this.props.monthYearDate]);
            }
            else {
                expenseSpending.push(0);
            }
        }


        let expenseBarData = {
            datasets: [{
                data: expenseDataset,
                backgroundColor: "#FFBE5B",
                label: 'Spending',
            }],
            labels: expenseSpendingLabels,
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
            expenseBarData,
            barOptions
        ])
    }


    render() {
        if (this.props.loading) {
            return (<div></div>)
        }
        let expenseBarData = {}, expenseBudgetOptions;
        [expenseBarData, expenseBudgetOptions] = this.createBarChart();
        let year = this.props.monthYearDate.toString().slice(-4);
        return (
            <Fragment>
                <Bar
                    data={expenseBarData}
                    options={expenseBudgetOptions} />
            </Fragment>)
    }
}


export default BarChart3;
