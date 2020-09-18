import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { withAlert } from 'react-alert';


import "./Category.css"

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {

            categoryType: "Income",
            category_type: ["Income", "Expense"],

            income_categories: {},
            income_categories_budget: {},
            income_categories_monthly: {},

            expense_categories: {},
            expense_categories_budget: {},
            expense_categories_monthly: {},

            categories: {},
            categories_budget: {},
            categories_monthly: {},

            new_category: "",
            budget_category: "",
            delete_category: "",
            budget: 0,
            id: "",

            //This variables are for backend to know what update.
            adding: 0,
            budgeting: 0,
            deleting: 0

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleAddCategory = this.handleAddCategory.bind(this)
        this.changebudgetCategory = this.changebudgetCategory.bind(this)
        this.getBudgetAxios = this.getBudgetAxios.bind(this)
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this)
        this.updateCategoryAxios = this.updateCategoryAxios.bind(this)
    }

    componentDidMount = () => {
        console.log("Category componentDidMount2")
        axios.get("budget/category/get/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                this.setState({
                    income_categories: res.data[0].income_categories,
                    income_categories_budget: res.data[0].income_categories_budget,
                    income_categories_monthly: res.data[0].income_categories_monthly,

                    expense_categories: res.data[0].expense_categories,
                    expense_categories_budget: res.data[0].expense_categories_budget,
                    expense_categories_monthly: res.data[0].expense_categories_monthly,

                    categories: res.data[0].income_categories,
                    categories_monthly: res.data[0].income_categories_monthly,
                    categories_budget: res.data[0].income_categories_budget,
                    delete_category: Object.keys(res.data[0].income_categories)[0],
                    id: res.data[0].id
                })

            })
            .catch(err => {
                console.log("ComponentDidMount Error " + err)
            })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleTypeChange = (e) => {
        if (this.state.categoryType === "Income") {
            this.setState((prev, props) => ({
                categoryType: "Expense",
                categories: prev.expense_categories,
                categories_budget: prev.expense_categories_budget,
                categories_monthly: prev.expense_categories_monthly,

                new_category: "",
                budget_category: Object.keys(prev.expense_categories_budget)[0],
                budget: prev.expense_categories_budget[Object.keys(prev.expense_categories_budget)[0]],

                delete_category: Object.keys(prev.expense_categories)[0],
            }))
        } else {
            this.setState((prev, props) => ({
                categoryType: "Income",
                categories: prev.income_categories,
                categories_budget: prev.income_categories_budget,
                categories_monthly: prev.income_categories_monthly,

                new_category: "",
                budget_category: Object.keys(prev.income_categories_budget)[0],
                budget: prev.income_categories_budget[Object.keys(prev.income_categories_budget)[0]],

                delete_category: Object.keys(prev.income_categories)[0]
            }))
        }

    }


    handleAddCategory = (e) => {
        e.preventDefault()
        console.log("Adding New Category 6")
        if (this.state.new_category != "" && this.state.id != "" && !(this.state.new_category in this.state.categories)) {
            this.setState({
                adding: 1,
            }, this.updateCategoryAxios);
        }
    }

    changebudgetCategory = (e) => {
        e.preventDefault
        // Not using handleChange because budget of category
        // needs to be found for the placeholder
        this.setState({
            budget_category: e.target.value
        }, this.getBudgetAxios)
    }

    getBudgetAxios = () => {
        axios.get("budget/category/get/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                if (this.state.categoryType === "Income") {
                    this.setState({
                        budget: res.data[0].income_categories_budget[this.state.budget_category]
                    })
                } else {
                    this.setState({
                        budget: res.data[0].expense_categories_budget[this.state.budget_category]
                    })
                }
            })
    }

    handleAddBudget = (e) => {
        e.preventDefault
        this.setState({
            budgeting: 1
        }, this.updateCategoryAxios)
    }

    handleDeleteCategory = (e) => {
        e.preventDefault
        this.setState({
            deleting: 1,
            //Need to Update the States to match the categories
        }, this.updateCategoryAxios)
    }


    updateCategoryAxios = () => {
        console.log("Category Axios5")
        let categoryBody = {
            "categoryType": this.state.categoryType,
            "new_category": this.state.new_category,
            "budget_category": this.state.budget_category,
            "delete_category": this.state.delete_category,
            "budget": this.state.budget,
            "adding": this.state.adding,
            "budgeting": this.state.budgeting,
            "deleting": this.state.deleting,

        }
        axios.put(`budget/category/update/${this.state.id}`, categoryBody, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                const alert = this.props.alert;
                if (this.state.adding === 1) {
                    alert.success('Category Successfully Added');
                }
                else if (this.state.budgeting === 1) {
                    alert.success('Category Successfully Updated');
                }
                else if (this.state.deleting === 1) {
                    alert.success('Category Successfully Deleted');
                }
                if (this.state.categoryType === "Income") {
                    this.setState({
                        new_category: "",
                        adding: 0,
                        budgeting: 0,
                        deleting: 0,

                        income_categories: res.data.income_categories,
                        income_categories_budget: res.data.income_categories_budget,
                        income_categories_monthly: res.data.income_categories_monthly,

                        categories: res.data.income_categories,
                        categories_budget: res.data.income_categories_budget,
                        categories_monthly: res.data.income_categories_monthly,
                        budget_category: Object.keys(res.data.income_categories_budget)[0],
                        budget: res.data.income_categories_budget[Object.keys(res.data.income_categories_budget)[0]],
                        delete_category: Object.keys(res.data.income_categories_budget)[0],
                    })

                } else {
                    this.setState({
                        new_category: "",
                        adding: 0,
                        budgeting: 0,
                        deleting: 0,

                        expense_categories: res.data.expense_categories,
                        expense_categories_budget: res.data.expense_categories_budget,
                        expense_categories_monthly: res.data.expense_categories_monthly,

                        categories: res.data.expense_categories,
                        categories_budget: res.data.expense_categories_budget,
                        categories_monthly: res.data.expense_categories_monthly,
                        budget_category: Object.keys(res.data.expense_categories_budget)[0],
                        budget: res.data.expense_categories_budget[Object.keys(res.data.expense_categories_budget)[0]],
                        delete_category: Object.keys(res.data.expense_categories_budget)[0],
                    })
                }
                this.props.getCatRightComponent()
                console.log("Category has been Updated")
            })
            .catch(err => {
                console.log("Error for category added" + err)
            })

        // Need to set new_category back to empty input field
    }




    render() {
        console.log("Category Render")
        let budgetGoal;
        let type;
        let placeholder;
        if (this.state.categoryType === "Income") {
            budgetGoal = "Income Goal"
            type = "Income"
            placeholder = "e.g. \"Dividends\""
        } else {
            budgetGoal = "Expense Budget"
            type = "Expense"
            placeholder = "e.g. \"Home\""
        }
        return (
            <div className="categories">
                <h1>Categories</h1>

                <Form className="CategoryChoice  ">
                    <Form.Group controlId="formCategoryType">
                        <Form.Label><h2>Choose a Transaction Type</h2></Form.Label>
                        <Form.Control
                            as="select"
                            type="categoryType"
                            name="categoryType"
                            onChange={(e) => this.handleTypeChange(e)}>
                            {this.state.category_type.map((type) =>
                                <Fragment key={type}>
                                    <option value={type}>{type}</option>
                                </Fragment>
                            )}
                        </Form.Control>
                    </Form.Group>
                </Form>


                <Form className="AddCategory  ">
                    <Form.Group controlId="formAddCategory">
                        <Form.Label>Add {type} Category</Form.Label>
                        <Form.Control
                            type="new_category"
                            name="new_category"
                            placeholder={placeholder}
                            value={`${this.state.new_category}`}
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>
                    <Button className="categoryButton1 btn btn-success"
                        // variant="outline-primary"
                        onClick={(e) => this.handleAddCategory(e)}>
                        Add
                    </Button>
                </Form>

                <Form className="Change  ">
                    <Form.Group controlId="formCategoryBudget">
                        <Form.Label>Change {budgetGoal}</Form.Label>
                        <Form.Control
                            as="select"
                            type="budget_category"
                            name="budget_category"
                            value={this.state.budget_category}
                            onChange={(e) => this.changebudgetCategory(e)}>
                            {Object.keys(this.state.categories_budget).map((cat) =>
                                <Fragment key={cat}>
                                    <option>{cat}</option>
                                </Fragment>
                            )}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Form className="Change2 ">
                    <Form.Group controlId="formBasicBudget">
                        <Form.Control
                            type="budget"
                            name="budget"
                            value={`${this.state.budget}`}
                            onChange={(e) => this.handleChange(e)} />
                    </Form.Group>
                    <Button
                        className="categoryButton2 btn btn-dark"
                        // variant="outline-secondary"
                        onClick={(e) => this.handleAddBudget(e)}>
                        Change
                        </Button>

                </Form>

                <Form className="DeleteCategory  ">
                    <Form.Group controlId="formCategoryDelete">
                        <Form.Label>Delete {type} Category</Form.Label>
                        <Form.Control
                            as="select"
                            type="delete_category"
                            name="delete_category"
                            onChange={(e) => this.handleChange(e)}>
                            {Object.keys(this.state.categories).map((cat) =>
                                <Fragment key={cat}>
                                    <option>{cat}</option>
                                </Fragment>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Button
                        className="categoryButton3 btn btn-danger"
                        // variant="outline-danger"
                        onClick={(e) => this.handleDeleteCategory(e)}>
                        Delete
                        </Button>

                </Form>

            </div >



        )
    }
}

export default withAlert()(Category);