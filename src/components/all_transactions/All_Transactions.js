import React, { Component, Fragment } from "react";

import Cookies from "js-cookie"
import axios from "axios";
import { withAlert } from 'react-alert';
import { Form, Button } from "react-bootstrap";

import Transaction from './Transaction';
import Pagination from './Pagination';

import "./all_Transactions.css";

class All_Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            showSuccessDeleteAlert: false,
            loading: true,
            currentPage: 1,
            transactionsPerPage: 6,
            sortOptions: ["Date", "Title", "Category", "Income", "Expense"]
        }
    }

    componentDidMount = () => {
        console.log("all transactions componentDidMount");
        axios.get(`/budget/all_transactions`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    transactions: res.data,
                    loading: false
                });
            })
            .catch(err => {
                console.log("transaction get error: " + err)
            })
        console.log(this.state.transactions);
    };

    // calls delete, passing in transaction id.
    // on success, sets state with new transaction array with the 
    // deleted transaction removed from array
    handleDelete = (id) => {
        console.log("Delete transaction ", id);
        axios.delete(`/budget/transaction/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                let arrCopy = [...this.state.transactions]
                const newTransactions = arrCopy.filter(transaction => transaction.id !== id)
                this.setState({
                    transactions: newTransactions
                })
                const alert = this.props.alert;
                alert.success('Transaction Successfully Deleted');
                this.props.getTotalAmount()
                this.props.getCatRightComponent()
            })
            .catch(err => {
                console.log("transaction delete error: " + err)
            })
    }

    // redirects user to update form, passing in transaction id as state.
    handleUpdateRedirect = (id) => {
        this.props.history.push({
            pathname: '/budget/update',
            state: {
                transactionId: id
            }
        })
    }

    handleSortChange = (e) => {
        console.log(e.target.value);
        let arrCopy = [...this.state.transactions]
        if (e.target.value === "Date") {
            arrCopy.sort((a, b) => (a.date_posted <= b.date_posted) ? 1 : -1);
            this.setState({
                transactions: arrCopy
            })
            console.log(arrCopy);
        }
        else if (e.target.value === "Title") {
            arrCopy.sort((a, b) => (a.source > b.source) ? 1 : (a.source === b.source) ? ((a.date_posted <= b.date_posted) ? 1 : -1) : -1);
            console.log(arrCopy);
            this.setState({
                transactions: arrCopy
            })
        }
        else if (e.target.value === "Category") {
            arrCopy.sort((a, b) => (a.category > b.category) ? 1 : (a.category === b.category) ? ((a.date_posted <= b.date_posted) ? 1 : -1) : -1);
            console.log(arrCopy);
            this.setState({
                transactions: arrCopy
            })
        }
        else if (e.target.value === "Income") {
            arrCopy.sort((a, b) => (a.t_type < b.t_type) ? 1 : (a.t_type === b.t_type) ? ((a.date_posted <= b.date_posted) ? 1 : -1) : -1);
            console.log(arrCopy);
            this.setState({
                transactions: arrCopy
            })
        }
        else if (e.target.value === "Expense") {
            arrCopy.sort((a, b) => (a.t_type > b.t_type) ? 1 : (a.t_type > b.t_type) ? ((a.date_posted <= b.date_posted) ? 1 : -1) : -1);
            console.log(arrCopy);
            this.setState({
                transactions: arrCopy
            })
        }
        console.log("sort transactions");
    }

    // Pagination Functions
    paginate = (pageNum) => this.setState({ currentPage: pageNum });
    nextPage = () => this.setState({ currentPage: this.state.currentPage + 1 });
    prevPage = () => this.setState({ currentPage: this.state.currentPage - 1 });


    render() {
        // have a separate page for transaction details?.

        const indexOfLastPost = this.state.currentPage * this.state.transactionsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.transactionsPerPage;
        const currentTransactions = this.state.transactions.slice(indexOfFirstPost, indexOfLastPost);
        console.log("rerender")
        return (
            <div className="alltrans">
                <h1 className="main-header">
                    All Transactions
                </h1>
                {this.state.loading === true ?
                    <h2>
                        Loading Transactions . . .
                    </h2> :
                    <div>
                        <div className="form-block row">
                            <div>Sort By:</div>
                            <Form className="form-group-sort">
                                <Form.Group controlId="formCategoryType">
                                    <Form.Control
                                        as="select"
                                        type="sortType"
                                        name="sortType"
                                        onChange={(e) => this.handleSortChange(e)}>
                                        {this.state.sortOptions.map((type) =>
                                            <Fragment key={type}>
                                                <option value={type}>{type}</option>
                                            </Fragment>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                        <ul className="list-group trans-headings row">
                            <li className="list-group-item-h col-sm">
                                Name
                            </li>
                            <li className="list-group-item-h col-sm text-center">
                                Category
                            </li>
                            <li className="list-group-item-h col-sm text-right">
                                Amount
                            </li>
                        </ul>

                        <Transaction
                            curTrans={currentTransactions}
                            handleDelete={this.handleDelete}
                            handleUpdateRedirect={this.handleUpdateRedirect} />

                        <Pagination className="pagination"
                            transactionsPerPage={this.state.transactionsPerPage}
                            totalTransactions={this.state.transactions.length}
                            currentPage={this.state.currentPage}
                            paginate={this.paginate}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage} />

                    </div>}
            </div>
        )
    }
}


export default withAlert()(All_Transactions);