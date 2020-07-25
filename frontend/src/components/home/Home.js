import React, { Component } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import Recent_Transactions from "../recent_transactions/Recent_Transactions";


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalObject: "",
            totalAmount: "",
            totalSpent: "",
            totalGained: "",
            loading: true,
            isLoggedIn: false
        }

    }

    componentDidMount = () => {
        console.log("Home componentDidMount");
        axios.get(`/api/total/get`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                this.setState({
                    totalObject: res.data[0],
                    totalAmount: res.data[0].total_amount,
                    totalSpent: res.data[0].total_amount_spent,
                    totalGained: res.data[0].total_amount_gained,
                    loading: false,
                    isLoggedIn: true
                });
                console.log(res.data)
            })
            .catch(err => {
                console.log("total get error: " + err)
                this.setState({
                    loading: false,
                    isLoggedIn: false
                });
            })
    };

    render() {
        // we can render another component when the user is not logged in, like a front page
        // when user is logged in, we can render this or a separate home page.

        let totalText;
        if (this.state.loading && !this.state.isLoggedIn) {
            totalText = <h1>Loading</h1>;
        } else if (!this.state.loading && this.state.isLoggedIn) {
            totalText =
                <div>
                    <h1>
                        Current Balance
                            </h1>
                    <br />
                    <h2>
                        ${this.state.totalAmount}
                    </h2>
                    <br />
                    <p>
                        Total spent: ${this.state.totalSpent}
                    </p>
                    <br />
                    <p>
                        Total gained: ${this.state.totalGained}
                    </p>
                </div>;
        } else {
            totalText = <h1>Please Log In.</h1>;
        }

        return (
            <div d-flex>
                <div className="row">
                    <h1>
                        {console.log("Home Render")}
                        {console.log(this.props.username)}
                        Monthly Overview
                    </h1>
                </div>
                <div className="row">
                    {totalText}
                </div>
                <div className="row">
                    <div>
                        <h2>Spending vs. Budgeting Goal</h2>
                        Add graph component here (bar graph with budget, donut graph)
                    </div>
                </div>
                <div className="row">
                    <div className="flex-fill">
                        <h2>Recent Transactions</h2>
                        <Recent_Transactions />
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;