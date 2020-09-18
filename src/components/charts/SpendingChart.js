import React, { Component, Fragment, useState, useEffect } from "react";
import "./SpendingChart.css"

const Progress = (props) => {
    const [style, setStyle] = useState();
    useEffect(() => {
        let isMounted = true;
        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${props.remainingWidth}%`
            }
            if (isMounted) setStyle(newStyle)
        }, 100);
        return () => {
            isMounted = false;
        }
    })

    return (
        <div className="progress">
            <div className={props.className} style={style}>
                {/* ${props.remaining} left */}
            </div>
        </div>
    )
};
class SpendingChart extends Component {
    constructor(props) {
        super(props);
    }
    getTotalBudget = () => {
        let categories = this.props.categoryObj;
        let totalBudget = 0;
        let isBudgetZero = true;
        for (let category in categories.expense_categories_budget) {
            totalBudget += parseFloat(categories.expense_categories_budget[category])
        }
        if (totalBudget !== 0) {
            isBudgetZero = false;
        }
        return [totalBudget, isBudgetZero]
    }


    render() {
        if (this.props.categoryObj === undefined) {
            return (<div></div>);
        }
        let budgetValues = this.getTotalBudget();
        let totalBudget = budgetValues[0];
        let isBudgetZero = budgetValues[1];
        let remaining = totalBudget - this.props.monthlySpent;

        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();

        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let remainingDays = daysInMonth - date.getDate();

        let remainingWidth = (1 - (remaining / totalBudget)) * 100
        return (
            <div className="spendingChart">
                <h2>
                    {this.props.monthName} Budget
                </h2>
                {isBudgetZero ? <p> Create an expense category budget to get started!</p> : remaining > 0 ?
                    <Fragment>
                        <p>Good job! You have ${remaining} left for the next {remainingDays} day(s).</p>
                        <Progress
                            remainingWidth={remainingWidth}
                            remaining={remaining}
                            className="progress-done">
                        </Progress>
                        <h4>Today</h4>
                    </Fragment> : <Fragment>
                        <p>Oh no! You are down ${remaining} for the next {remainingDays} day(s). Remember to add a budget for every expense!</p>
                        <Progress
                            remainingWidth={remainingWidth}
                            remaining={remaining}
                            className="progress-bad">
                        </Progress>
                        <h4>Today</h4>
                    </Fragment>}

            </div >
        )
    }
}


export default SpendingChart;
