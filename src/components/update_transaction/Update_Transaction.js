import React, { Component } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withAlert } from 'react-alert';
import "./Update_Transaction.css"

class Update_Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: "",
            t_type: "",
            category: "",
            prev_category: "",
            source: "",
            amount: "",
            prev_amount: "",
            date: "",
            prev_date: "",
            notes: "",
            id: "",
            loading: true,

            expense_categories: {},
            income_categories: {},
        }

    }

    // takes care of form info
    handleChange = (e) => {
        // Changes state with current information
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount = () => {
        console.log("Create transaction mount");
        // check authentication. currently it calls this after render
        //THIS WILL GIVE AN ERROR WHEN THE USER REFRESHES
        try {
            if (this.props.isLoggedIn) {
                console.log("Authorized");
            } else {
                throw "Not Logged In";
            }
        }
        catch (err) {
            console.log(err);
        }
        // gets the transaction by passed id, then updates state variables to transaction.
        axios.get(`/budget/transaction/get/${this.props.location.state.transactionId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                console.log(res)
                this.setState({
                    transactions: res.data,
                    t_type: res.data.t_type,
                    category: res.data.category,
                    prev_category: res.data.category,
                    source: res.data.source,
                    amount: res.data.amount,
                    prev_amount: res.data.amount,
                    date: res.data.date_posted,
                    prev_date: res.data.date_posted,
                    notes: res.data.notes,
                    id: this.props.location.state.transactionId,
                    loading: false
                });
            })
            .catch(err => {
                console.log("transaction get error: " + err)
            })

        //Get categories
        axios.get("budget/category/get/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                this.setState({
                    income_categories: res.data[0].income_categories,
                    expense_categories: res.data[0].expense_categories,
                })

            })
            .catch(err => {
                console.log("Update Transaction, get Category Error " + err)
            })

    };

    // calls a put to backend, sending updated info for transaction.
    // on success, go back to all transactions.
    handleUpdate = () => {
        console.log("Update transaction ", this.state.id);
        const transactionObj = {
            category: this.state.category,
            prev_category: this.state.prev_category,
            source: this.state.source,
            amount: this.state.amount,
            prev_amount: this.state.prev_amount,
            date_posted: this.state.date,
            prev_date: this.state.prev_date,
            notes: this.state.notes,
            t_type: this.state.t_type
        };
        axios.put(`/budget/transaction/update/${this.state.id}`, transactionObj, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                console.log("transaction update success");
                const alert = this.props.alert;
                alert.success('Transaction Successfully Updated');
                this.props.history.push("/budget/all_transactions/");
                this.props.getTotalAmount()
                this.props.getCatRightComponent()
            })
            .catch(err => {
                console.log("transaction update error: " + err)
            })
    }


    render() {
        return (
            <div className="updateTrans">
                <h1 className="main-header">
                    Update Transaction
            </h1>
                {this.state.loading === true ?
                    <h2>
                        Loading Transactions . . .
                </h2> :
                    <div>
                        <h2>
                            {this.state.transactions.t_type}
                        </h2>
                        <Form className="col-sm-12">
                            <Form.Group controlId="formSource">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="source"
                                    defaultValue={this.state.source}
                                    onChange={(e) => this.handleChange(e)} />
                            </Form.Group>

                            <Form.Group controlId="formCategorySelect">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="category"
                                    value={this.state.category}
                                    onChange={(e) => this.handleChange(e)}>
                                    {this.state.t_type === "Income" ?
                                        Object.keys(this.state.income_categories).map((cat) =>
                                            <option key={cat}>{cat}</option>) :
                                        Object.keys(this.state.expense_categories).map((cat) =>
                                            <option key={cat}>{cat}</option>)
                                    }


                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formAmount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    step={"0.01"}
                                    name="amount"
                                    defaultValue={this.state.amount}
                                    onChange={(e) => this.handleChange(e)} />
                            </Form.Group>

                            <Form.Group controlId="formDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    defaultValue={this.state.date}
                                    onChange={(e) => this.handleChange(e)} />
                            </Form.Group>

                            <Form.Group controlId="formNotes">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    name="notes"
                                    defaultValue={this.state.notes}
                                    onChange={(e) => this.handleChange(e)} />
                            </Form.Group>

                            <Button
                                className="updateButton"
                                variant="outline-dark"
                                onClick={(e) => this.handleUpdate(e)}>
                                Update
                            </Button>
                        </Form>
                    </div>}
            </div>
        )
    }
}


export default withAlert()(Update_Transaction);