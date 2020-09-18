import React, { Component } from "react";
import emailjs from "emailjs-com";
import { Button, Form } from "react-bootstrap";
import { withAlert } from 'react-alert';
import "./Contact.css"
import send from "./images/send.svg";

class Contact extends Component {
    constructor(props) {
        super(props);
    }

    sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('gmail', 'template_1flf15c', e.target, 'user_vbJZHXgzHOSDygmE3iWDl')
            .then((result) => {
                console.log("Email Sent");
                const alert = this.props.alert;
                alert.success('Email Sent');
                this.props.history.push("/");
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    render() {
        let header;
        let container;
        console.log(this.props.isLoggedIn)
        if (this.props.isLoggedIn) {
            header = "main-header"
            container = "none"
        } else {
            header = "contact-header"
            container = "center"
        }
        return (
            <div className="contact-container">
                <div className={container}>
                    <div className="updateTrans">
                        <h1 className={header}>
                            Contact Us
                </h1>
                        <div>
                            <form className="col-sm-12" onSubmit={this.sendEmail}>
                                <Form.Group controlId="formSource">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSource">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSource">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formNotes">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="6"
                                        name="message"
                                        placeholder="Your Message"
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    className="updateButton"
                                    variant="outline-dark"
                                    type="submit"
                                >
                                    Send <img src={send} className="paperAirplane"></img>
                                </Button>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default withAlert()(Contact);