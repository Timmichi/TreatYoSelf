import React, {Component} from "react";
import {Form, Button} from "react-bootstrap";
import Cookies from "js-cookie"
import axios from "axios";

import Modal from "react-bootstrap/Modal"

import "./login.css"



class LoginModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            loginCheck: "",
        };


    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e)
    }
   
    handleLogin = (e) => {
        e.preventDefault()
        const loginUser = {
            username: this.state.username,
            password: this.state.password,
        }

        axios.post("api/auth/login", loginUser,{"Content-Type": "application/json"})
            .then(res => {
                Cookies.set("token", res.data.token, {expires:1})
                console.log("Login Success")
                console.log(res)
                window.location.reload(false) // Reloads page for app the render again
                this.props.onClose() //Closes Login Modal
            })
            .catch(err => {
                console.log("Login Error" + err)
                this.setState({
                    loginCheck: "Invalid Username or Password",
                })
            } )

    }

    handleChange = (e) =>{
        // Changes state with current information
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <Modal show = {this.props.showLogin} onHide = {this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className = "loginPage">
                    <Form className =  "forms col-sm-8">
                        <Form.Group controlId="formBasicName">
                            {/* <Form.Label>Username</Form.Label> */}
                            <Form.Control 
                                type="name" 
                                name = "username"
                                placeholder="Username"
                                onChange = {(e) => this.handleChange(e)} />
                        </Form.Group>
                    
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control 
                                type="password"
                                name = "password" 
                                placeholder="Password"
                                onChange = {(e) => this.handleChange(e)} />
                            </Form.Group>

                        <Button 
                            variant="outline-secondary"
                            onClick = {(e) => this.handleLogin(e)}>
                            Login
                        </Button>

                    </Form>
                </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default LoginModal;