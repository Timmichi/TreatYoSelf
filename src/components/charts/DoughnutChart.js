import React, { Component, Fragment } from "react";
import * as d3 from "d3";
import { Doughnut } from "react-chartjs-2";

import { interpolateColors } from "../../static/color_generator";
import "./DoughnutChart.css"
/**
 * Doughnut chart for monthly income spend and gain
 */

class DoughnutChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    };

    createDonutChart = () => {
        let incomeCategories = this.props.categoryObj.income_categories_monthly;
        let expenseCategories = this.props.categoryObj.expense_categories_monthly;
        let incomeDataset = [];
        let incomeLabels = [];
        let expenseDataset = [];
        let expenseLabel = [];

        let totalCatIncome = 0;
        for (let key in incomeCategories) {
            if (incomeCategories[key].hasOwnProperty(this.props.monthYearDate)) {
                incomeDataset.push(incomeCategories[key][this.props.monthYearDate]);
                incomeLabels.push(key);
                totalCatIncome += incomeCategories[key][this.props.monthYearDate];
            }
        }
        if (totalCatIncome < this.props.monthlyGained) {
            incomeDataset.push(this.props.monthlyGained - totalCatIncome);
            incomeLabels.push("Unassigned Category Transactions");
        }

        let totalCatExpense = 0;
        for (let key in expenseCategories) {
            if (expenseCategories[key].hasOwnProperty(this.props.monthYearDate)) {
                expenseDataset.push(expenseCategories[key][this.props.monthYearDate]);
                expenseLabel.push(key);
                totalCatExpense += expenseCategories[key][this.props.monthYearDate];
            }
        }
        if (totalCatExpense < this.props.monthlySpent) {
            incomeDataset.push(this.props.monthlySpent - totalCatExpense);
            incomeLabels.push("Unassigned Category Transactions");
        }

        /*
         * FOR INCOME
         */
        Chart.defaults.global.legend.labels.usePointStyle = true;
        const colorScaleIncome = d3.interpolate("white", "mediumseagreen");
        let dataLengthIncome = incomeDataset.length;
        const colorRangeInfo = {
            colorStart: 0.4,
            colorEnd: 1,
            useEndAsStart: false,
        };
        let COLORSINCOME = interpolateColors(dataLengthIncome, colorScaleIncome, colorRangeInfo);

        let incomeData = {
            datasets: [{
                data: incomeDataset,
                backgroundColor: COLORSINCOME,
                label: 'Income'
            }],
            labels: incomeLabels,
            borderWidth: 1,
        }
        let monthlyGained = parseFloat(this.props.monthlyGained)
        monthlyGained = monthlyGained.toFixed(2)
        let incomeOptions = {
            legend: {
                display: false,
            },
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            cutoutPercentage: 70,
            responsive: true,
            title: "Income",
            amount: `$ ${monthlyGained}`,
        }

        /**
         * FOR EXPENSE
         */

        const colorScaleExpense = d3.interpolate("white", "rgb(255, 27, 27)");
        let dataLengthExpense = expenseDataset.length;
        const colorRangeInfo2 = {
            colorStart: 0.3,
            colorEnd: 1,
            useEndAsStart: false,
        };
        let COLORSEXPENSE = interpolateColors(dataLengthExpense, colorScaleExpense, colorRangeInfo2);

        let expenseData = {
            datasets: [{
                data: expenseDataset,
                backgroundColor: COLORSEXPENSE,
                label: 'Expense'
            }],
            labels: expenseLabel,
            borderWidth: 1,
        }
        let monthlySpent = parseFloat(this.props.monthlySpent)
        monthlySpent = monthlySpent.toFixed(2)
        let expenseOptions = {
            legend: {
                display: false
            },
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            cutoutPercentage: 70,
            responsive: true,
            title: "Expenses",
            amount: `$ ${monthlySpent}`,
        }


        return ([
            incomeData,
            incomeOptions,
            expenseData,
            expenseOptions
        ])
    }

    render() {
        if (this.props.loading) {
            return (<div></div>)
        }

        let incomeData = {}, incomeOptions, expenseData = {}, expenseOptions;
        [incomeData, incomeOptions, expenseData, expenseOptions] = this.createDonutChart();

        return (
            <Fragment>
                <div className="doughnutGraphs">
                    <div className="doughnut" style={this.props.donut}>
                        <Doughnut
                            data={incomeData}
                            width={110}
                            height={110}
                            options={incomeOptions} />
                    </div>
                    <div className="doughnut" style={this.props.donut}>
                        <Doughnut
                            data={expenseData}
                            width={110}
                            height={110}
                            options={expenseOptions} />
                    </div>
                </div>
            </Fragment>)
    }
}


export default DoughnutChart;