import React, {Component} from "react"
import {Form, Button} from "react-bootstrap";
import Cookies from "js-cookie"
import axios from "axios";

import Modal from "react-bootstrap/Modal"


class RegisterModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstname: "",
            lastname:"",
            username: "",
            email: "",
            password: "",
            password2: "",
            errorCheck: "",
        }
        
    }

    handleChange = (e) => {
        // Changes state with current information
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = (e) => {
        e.preventDefault()
        if (this.state.password !== this.state.password2) {
            this.setState({
                errorCheck: "Password does not match"
            })
        } else {
            const registerUser = {
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
            axios.post("api/auth/register", registerUser, { "Content-Type": "application/json" })
                .then(res => {
                    Cookies.set("token", res.data.token, { expires: 7 })
                    console.log("Registration Success")
                    //window.location.reload(false) // Reloads page for app the render again
                    this.props.onClose() //Closes Login Modal
                    this.props.redirectTotalPage()
                    window.location.reload(false) // Reloads page for app the render again

                })
                .catch(err => {
                    console.log("Registration Error " + err)
                    this.setState({
                        errorCheck: "Dupilcate Registration"
                    })
                })
            
            
        }


    }

    render(){
        return(
            <Modal show = {this.props.showRegister} onHide = {this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <Form className="col-sm-8">
                        <Form.Group controlId="formFirstName">
                            {/* <Form.Label>First Name</Form.Label> */}
                            <Form.Control
                                type="firstname"
                                name="firstname"
                                placeholder="First Name"
                                onChange={(e) => this.handleChange(e)} />
                        </Form.Group>
                    

                        <Form.Group controlId="formLastName">
                            {/* <Form.Label>Last Name</Form.Label> */}
                            <Form.Control
                                type="lastname"
                                name="lastname"
                                placeholder="Last Name"
                                onChange={(e) => this.handleChange(e)} />
                        </Form.Group>
            
                        <Form.Group controlId="formBasicName">
                            {/* <Form.Label>Username</Form.Label> */}
                            <Form.Control
                                type="name"
                                name="username"
                                placeholder="Username"
                                onChange={(e) => this.handleChange(e)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            {/* <Form.Label>Email</Form.Label> */}
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => this.handleChange(e)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => this.handleChange(e)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword2">
                            {/* <Form.Label>Confirm Password</Form.Label> */}
                            <Form.Control
                                type="password"
                                name="password2"
                                placeholder="Confirm Password"
                                onChange={(e) => this.handleChange(e)} />
                        </Form.Group>

                        <Button
                            variant="outline-secondary"
                            onClick={(e) => this.handleRegister(e)}>
                            Sign Up
                        </Button>
                    </Form>
                </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default RegisterModal;