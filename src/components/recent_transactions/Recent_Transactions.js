import React, { Component, Fragment } from "react";
import "./Recent_Transactions.css"
class Recent_Transactions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // have a separate page for transaction details?.
        if (this.props.loading) {
            return (<div></div>)
        }

        let recentFiveTransactions = this.props.transactions.slice(0, 5);

        return (
            <Fragment>
                <ul className="list-group flex-column">
                    {recentFiveTransactions.map((transaction) => (
                        <Fragment key={transaction.id}>
                            <li className="list-group-item flex-grow-1 align-items-stretch">
                                <div className="row one">
                                    <div className="col-sm">
                                        {transaction.source}
                                    </div>
                                    <div className="col-sm text-center">
                                        {transaction.category}
                                    </div>
                                    <div className="col-sm text-right">
                                        {transaction.t_type === "Expense" ?
                                            <h1 style={{ color: "red" }}>- ${transaction.amount}</h1>
                                            :
                                            <h1 style={{ color: "#12A874" }}>+ ${transaction.amount}</h1>}
                                    </div>
                                </div>
                                <div className="row two">
                                    <div className="col-sm text">
                                        {transaction.date_posted}
                                    </div>
                                    <div className="col-sm text-right">
                                        {transaction.t_type}
                                    </div>
                                </div>
                            </li>
                        </Fragment>
                    ))}
                </ul>
            </Fragment>)
    }
}


export default Recent_Transactions;
