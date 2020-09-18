import React, { Component, Fragment } from "react";
import * as d3 from "d3";
import { Doughnut } from "react-chartjs-2";

import { interpolateColors } from "../../static/color_generator";
import "./DoughnutChart.css"
/**
 * Doughnut chart for YEARLY spend and gain
 */

class DoughnutChart2 extends Component {
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

        let year = this.props.monthYearDate.toString().slice(-4);

        let totalCatIncome = 0;
        // get total income from each category for the year
        for (let key in incomeCategories) {
            let catSum = 0;
            for (let month in incomeCategories[key]) {
                if (month.includes(year)) {
                    catSum += incomeCategories[key][month];
                }
            }
            incomeDataset.push(catSum);
            incomeLabels.push(key);
            totalCatIncome += catSum;
        }

        //check if total for year matches total income from monthly data
        //if not, assign the remaining as unassigned categories.
        let incomeTotalYear = 0;
        for (let key in this.props.totalObject.monthly_data) {
            if (key.includes(year)) {
                incomeTotalYear += this.props.totalObject.monthly_data[key]["monthly_gained"];
            }
        }
        incomeTotalYear = incomeTotalYear.toFixed(2)
        if (totalCatIncome < incomeTotalYear) {
            incomeDataset.push(incomeTotalYear - totalCatIncome);
            incomeLabels.push("Unassigned Category Transactions");
        }

        // expense
        let totalCatExpense = 0;
        for (let key in expenseCategories) {
            let catSum = 0;
            for (let month in expenseCategories[key]) {
                if (month.includes(year)) {
                    catSum += expenseCategories[key][month];
                }
            }
            expenseDataset.push(catSum);
            expenseLabel.push(key);
            totalCatExpense += catSum;
        }
        let expenseTotalYear = 0;
        for (let key in this.props.totalObject.monthly_data) {
            if (key.includes(year)) {
                expenseTotalYear += this.props.totalObject.monthly_data[key]["monthly_spent"];
            }
        }
        expenseTotalYear = expenseTotalYear.toFixed(2)
        if (totalCatExpense < expenseTotalYear) {
            incomeDataset.push(expenseTotalYear - totalCatExpense);
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
                label: 'Yearly Income'
            }],
            labels: incomeLabels,
            borderWidth: 1,
        }
        let incomeOptions = {
            legend: {
                display: false,
            },
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            cutoutPercentage: 70,
            responsive: true,
            title: `${year} Income`,
            amount: `$ ${incomeTotalYear}`,
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
                label: 'Yearly Expense'
            }],
            labels: expenseLabel,
            borderWidth: 1,
        }
        let expenseOptions = {
            legend: {
                display: false
            },
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            cutoutPercentage: 70,
            responsive: true,
            title: `${year} Expenses`,
            amount: `$ ${expenseTotalYear}`,
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


export default DoughnutChart2;