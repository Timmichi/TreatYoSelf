import React, { Component } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withAlert } from 'react-alert';
import "./userForm.css"

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            loading: true,
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
        console.log("User Form mount");
        // gets the transaction by passed id, then updates state variables to transaction.
        //TESTING PLS
        axios.get(`/api/auth/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                console.log("user info", res.data)
                this.setState({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    username: res.data.username,
                    loading: false,
                });
            })
            .catch(err => {
                console.log("user info get error: " + err)
            })
    };

    // calls a put to backend, sending updated info for transaction.
    // on success, go back to all transactions.
    handleUpdate = () => {
        console.log("Update transaction ");
        const userObj = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
        };
        axios.put(`/api/auth/user/update`, userObj, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${Cookies.get("token")}`
            }
        })
            .then(res => {
                console.log("User Info Updated");
                const alert = this.props.alert;
                alert.success('User Info Updated');
                this.props.history.push("/");
                this.props.getName()
            })
            .catch(err => {
                console.log("user update error: " + err)
            })
    }


    render() {
        return (
            <div className="updateTrans">
                <h1 className="main-header">
                    Change Personal Information
            </h1>
                {this.state.loading === true ?
                    <h2>
                        Loading User Data . . .
                </h2> :
                    <div>
                        <Form className="col-sm-12">
                            <Form.Group controlId="formSource">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    defaultValue={this.state.first_name}
                                    onChange={(e) => this.handleChange(e)} />
                            </Form.Group>

                            <Form.Group controlId="formAmount">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    defaultValue={this.state.last_name}
                                    onChange={(e) => this.handleChange(e)} />
                            </Form.Group>

                            <Form.Group controlId="formDate">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    defaultValue={this.state.username}
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


export default withAlert()(UserForm);