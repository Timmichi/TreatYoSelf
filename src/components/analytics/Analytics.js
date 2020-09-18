import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import DoughnutChart2 from "../charts/DoughnutChart2";
import LineChart from "../charts/LineChart";
import CashFlow from "../charts/CashFlow";
import BarChart3 from "../charts/BarChart3";
import './Analytics.css';

import dropArrow from "./images/dropArrow.svg";
import { DropdownItem, DropdownMenu, NavItem } from "../dropdown/Dropdown"
import income from "./images/income.svg";
import expense from "./images/expense.svg";

class Analytics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalObject: "",
            totalAmount: "",
            monthlySpent: "",
            monthlyGained: "",
            yearlySpent: "",
            yearlyGained: "",
            categoryObj: "",
            monthYearDate: "",
            loading: true,
            renderGraph: <div></div>,
            rendered: false,
            bar: {
                position: "relative",
                height: "",
                width: ""
            },
            donut: {
                position: "relative",
                height: "",
                width: ""
            },
        }
        this.canvas = React.createRef();

    }

    componentDidMount = () => {
        console.log("Analytics componentDidMount");
        this.getDimensions();
        window.addEventListener("resize", this.getDimensions);
        axios.get(`/api/total/get`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                let profileObj = res.data[0];
                //figure out how to get monthly to object
                let date = new Date();
                let thisMonthYear = `${date.getMonth() + 1}${date.getFullYear()}`;
                let yearlySpent = 0;
                let yearlyGained = 0;
                for (let obj in profileObj.monthly_data) {
                    let newObj = obj.toString();
                    newObj = newObj.substr(newObj.length - 4)
                    newObj = parseInt(newObj)
                    if (newObj === this.props.year) {
                        yearlyGained += parseFloat(profileObj.monthly_data[obj]["monthly_gained"]);
                        yearlySpent += parseFloat(profileObj.monthly_data[obj]["monthly_spent"]);
                    }
                }
                console.log(yearlySpent, yearlyGained)
                this.setState({
                    yearlySpent: yearlySpent,
                    yearlyGained: yearlyGained,
                    totalObject: profileObj,
                    totalAmount: profileObj.total_amount,
                    monthlySpent: profileObj.monthly_data[thisMonthYear]['monthly_spent'],
                    monthlyGained: profileObj.monthly_data[thisMonthYear]['monthly_gained'],
                    monthYearDate: parseInt(thisMonthYear)
                });
            })
            .catch(err => {
                console.log("total get error: " + err)
                this.setState({
                    loading: false,
                });
            })


        // get categories
        axios.get("budget/category/get/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                this.setState({
                    categoryObj: res.data[0],
                    loading: false,
                });
                console.log("category obj: ", res.data[0]);
            })
            .catch(err => {
                console.log("category get error: " + err)
            })

        this.chartTextSet();
        // get transactions, pass to recent transactions js
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.getDimensions);
    };

    getDimensions = () => {
        if (window.innerWidth >= 568 && window.innerWidth <= 1200 && window.innerHeight <= 1366 && window.innerHeight > 300) {
            this.setState({ bar: { position: "relative", height: "400px", width: "600px" } })
            this.setState({ donut: { position: "relative", height: "180px", width: "180px" } })

        } else if (1201 <= window.innerWidth && window.innerWidth <= 1600) {
            this.setState({ bar: { position: "relative", height: "350px", width: "600px" } })
            this.setState({ donut: { position: "relative", height: "180px", width: "180px" } })

        } else if (1601 <= window.innerWidth) {
            this.setState({ bar: { position: "relative", height: "500px", width: "700px" } })
            this.setState({ donut: { position: "relative", height: "200px", width: "200px" } })

        }
    }

    chartTextSet = () => {
        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.type !== "doughnut") {
                    return;
                }
                let width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

                chart.clear();

                ctx.restore();
                let fontSize = (height / 200).toFixed(2);
                ctx.font = fontSize + "em Quicksand";
                ctx.textBaseline = "bottom";
                ctx.fillStyle = '#000';

                let title = chart.config.options.title,
                    textX = Math.round((width - ctx.measureText(title).width) / 2),
                    textY = height / 2 - 5;
                ctx.fillText(title, textX, textY);

                let font2Size = (height / 180).toFixed(2);
                ctx.font = font2Size + "em Lato";
                ctx.textBaseline = "top";

                let amount = chart.config.options.amount,
                    text2X = Math.round((width - ctx.measureText(amount).width) / 2),
                    text2Y = height / 2;

                ctx.fillText(amount, text2X, text2Y);

                ctx.save();
            },

            afterDraw: function (chart) {
                if (chart.data.labels.length === 0) {
                    // No data is present
                    let ctx = chart.chart.ctx;
                    let width = chart.chart.width;
                    let height = chart.chart.height;
                    chart.clear();

                    ctx.save();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = "16px normal 'Helvetica Nueue'";
                    ctx.fillText('No data to display', width / 2, height / 2);
                    ctx.restore();
                }
            }
        });
    }
    handleSwitch1 = () => {
        this.setState({
            renderGraph:
                <Fragment>
                    <div className="row">
                        <h4>Income vs. Expense in {this.props.year} <span className="spendingCategory">($ Per Month)</span></h4>
                    </div>
                    <div className="row">
                        <div className="charts">
                            <div className="chartContainer" style={this.state.bar}>
                                <LineChart {...this.state}
                                    year={this.props.year} />
                            </div>
                            <div >
                                <DoughnutChart2 {...this.state} />
                            </div>
                        </div>
                    </div>

                </Fragment>
        });
    }

    handleSwitch2 = () => {

        this.setState({
            renderGraph:
                <Fragment>
                    <div className="row">
                        <h4> Total Expenses in {this.props.year} <span className="spendingCategory">($ Per Expense Category)</span></h4>
                    </div>
                    <div className="row">
                        <div className="charts">
                            <div className="chartContainer" style={this.state.bar}>
                                <BarChart3 {...this.state}
                                    year={this.props.year} />
                            </div>
                            <div >
                                <DoughnutChart2 {...this.state} />
                            </div>
                        </div>
                    </div>
                </Fragment>,
            rendered: true,
        });
    }


    render() {
        let totalText;
        if (this.state.loading) {
            totalText = <h1>Loading</h1>;
        }
        let rendered;
        if (!this.state.rendered) {
            rendered = <Fragment>
                <div className="row">
                    <h4>Income vs. Expense in {this.props.year} <span className="spendingCategory">($ Per Month)</span></h4>
                </div>
                <div className="row">
                    <div className="charts">
                        <div className="chartContainer" style={this.state.bar}>
                            <LineChart {...this.state}
                                year={this.props.year} />
                        </div>
                        <div >
                            <DoughnutChart2 {...this.state} />
                        </div>
                    </div>
                </div>

            </Fragment>
        } else {
            rendered = this.state.renderGraph;
        }
        return (
            <div className="analytics">
                <div className="row">
                    <h1>
                        Yearly Analytics
                    </h1>
                </div>
                {this.state.loading === true ?
                    <h2>
                        Loading Analytics . . .
                    </h2> :
                    <Fragment>
                        <div className="row">
                            {totalText}
                        </div>
                        <div className="row">
                            <NavItem
                                className="topButton"
                                image={dropArrow}
                                imageName="dropArrow"
                                opened="opened"
                                closeOnClick={this.state.closeOnClick}
                            >

                                <DropdownMenu>
                                    <DropdownItem
                                        className="menu-item"
                                        leftIcon={<img src={expense}></img>}
                                        onClick={this.handleSwitch1}
                                    >
                                        <p>
                                            {this.props.year} Income vs. Expense Graph
                                            </p>
                                    </DropdownItem>
                                    <DropdownItem
                                        className="menu-item"
                                        leftIcon={<img src={income}></img>}
                                        onClick={this.handleSwitch2}
                                    >
                                        <p>
                                            {this.props.year} Total Expenses Graph
                                            </p>
                                    </DropdownItem>
                                </DropdownMenu>
                            </NavItem>
                        </div>
                        {rendered}
                        <div className="row">
                            <div className="flex-fill">
                                <CashFlow {...this.state}
                                    year={this.props.year}>
                                </CashFlow>
                            </div>
                        </div>
                    </Fragment>
                }

            </div>

        )
    }
}


export default Analytics;