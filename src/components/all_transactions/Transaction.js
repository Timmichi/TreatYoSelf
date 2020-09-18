import React, { Component, Fragment } from 'react';

class Transaction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <ul className="list-group flex-column ">
                    {this.props.curTrans.map((transaction) => (
                        <Fragment key={transaction.id}>
                            <li className="list-group-item-t flex-grow-1 align-items-stretch">
                                <div className="row one">
                                    <div className="col-sm">
                                        {transaction.source}
                                    </div>
                                    <div className="col-sm text-center">
                                        {transaction.category}
                                    </div>
                                    <div className="col-sm text-right">
                                        {transaction.t_type === "Expense" ?
                                            <h1 style={{ color: "red" }}>-${transaction.amount}</h1>
                                            :
                                            <h1 style={{ color: "#12A874" }}>+${transaction.amount}</h1>}
                                    </div>
                                </div>
                                <div className="row two">
                                    <div className="col-sm">
                                        {transaction.date_posted}
                                    </div>
                                    <div className="col-sm text-right">
                                        {transaction.t_type}
                                    </div>
                                </div>
                                <div className="row three">
                                    <div className="col-lg text-wrap">
                                        Notes: <span>{transaction.notes}</span>
                                    </div>
                                    <div className="trans-buttons">
                                        <button onClick={() => this.props.handleUpdateRedirect(transaction.id)} className="updateButton">Update</button>
                                        <button onClick={() => this.props.handleDelete(transaction.id)} className="deleteButton">Delete</button>
                                    </div>
                                </div>
                            </li>
                        </Fragment>
                    ))}
                </ul>
            </Fragment>
        )
    }
}

export default Transaction;