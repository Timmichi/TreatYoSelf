import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withAlert } from 'react-alert';

class Create_Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionType: "Income",
            t_type: ["Income", "Expense"],
            category: "",
            source: "",
            amount: "",
            date: "",
            notes: "",
            
            income_categories: {},
            expense_categories: {},
            categories: {},
            categories_monthly: {},
        }

    }

    // takes care of form info
    handleChange = (e) => {
        // Changes state with current information
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleTypeChange = (e) => {
        if (this.state.transactionType === "Income"){
            this.setState((prev,props) => ({
                transactionType: "Expense",
                categories: prev.expense_categories,
                category: Object.keys(prev.expense_categories)[0],
            }))
        } else {
            this.setState((prev,props) => ({
                transactionType: "Income",
                categories: prev.income_categories,
                category: Object.keys(prev.income_categories)[0],
            }))
        }
    }

    handleCreate = (e) => {
        e.preventDefault();

        const headerObj = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        }
        const transactionObj = {
            t_type: this.state.transactionType,
            category: this.state.category,
            source: this.state.source,
            amount: this.state.amount,
            date_posted: this.state.date,
            notes: this.state.notes
        };
        axios.post(`/budget/create/${this.state.transactionType.toLowerCase()}/`, transactionObj, headerObj)
            .then(res => {
                console.log("transaction success");
                const alert = this.props.alert;
                alert.success('Successfully created income transaction');
                this.props.history.push("/budget/all_transactions/")
            })
            .catch(err => {
                console.log("transaction post error: " + err)
            });

    };


    componentDidMount = () => {
        console.log("Create_Transaction ComoponentDidMount");
        // check authentication. currently it calls this after render
        try {
            if (Cookies.get("token")) {
                console.log("Authorized");
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
                            
                            categories: res.data[0].income_categories,
                            categories_monthly: res.data[0].income_categories_monthly,
                            category: Object.keys(res.data[0].income_categories)[0]
                        })


                    })
            } else {
                throw "Not Logged In";
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div>
                <h1>
                    Create A Transaction
                </h1>
                <h2>
                    {this.props.transactionType}
                </h2>
                <Form className="col-sm-8">
                    <Form.Group controlId="formSource">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="source"
                            placeholder="title"
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Form.Group controlId="formTypeSelect">
                        <Form.Label>Transaction Type</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => this.handleTypeChange(e)}>
                            {this.state.t_type.map((type) =>
                                <Fragment key={type}>
                                    <option value={type}>{type}</option>
                                </Fragment>
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formCategorySelect">
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                                as="select"
                                type = "category"
                                name = "category"
                                onChange={(e) => this.handleChange(e)} >
                            {Object.keys(this.state.categories).map((cat) =>
                                <Fragment key={cat}>
                                    <option>{cat}</option>
                                </Fragment>
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            step={"0.01"}
                            name="amount"
                            placeholder="amount"
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            placeholder="date"
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Form.Group controlId="formNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            name="notes"
                            placeholder="notes"
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>

                    <Button
                        variant="outline-secondary"
                        onClick={(e) => this.handleCreate(e)}>
                        Create
                    </Button>
                </Form>
            </div>
        )
    }
}


export default withAlert()(Create_Transaction);