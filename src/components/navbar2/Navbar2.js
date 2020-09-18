import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import logo from "../navbar2/images/logo.svg";
import "./Navbar2.css";
import { Link as ScrLink } from "react-scroll";
import { ToggleButton } from "react-bootstrap";

import LoginModal from "../login/LoginModal"
import RegisterModal from "../register/RegisterModal"


class Navbar2 extends Component {
    constructor(props) {
        super(props);
        this.scrFunction = this.scrFunction.bind(this);
        this.state = {
            isButtonOpen: false,
            isNavbarScrolled: false,

            showLogin: false,
            showRegister: false,
        };
    }

    showLoginModal = () => {
        this.setState((prev) => {
            return {
                showLogin: !prev.showLogin
            }
        })
    }

    showRegisterModal = () => {
        this.setState((prev) => {
            return {
                showRegister: !prev.showRegister
            }
        })
    }



    scrFunction() {
        if (window.scrollY > 80) {
            this.setState({ isNavbarScrolled: true })
        } else {
            this.setState({ isNavbarScrolled: false })
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", this.scrFunction)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrFunction)
    }

    render() {
        let leftNavbar;
        leftNavbar = <React.Fragment>
            <ScrLink
                className="navbar-brand"
                activeClass="active"
                to="main"
                spy={true}
                smooth={true}
                offset={-200}
                duration={1000}
            ><img src={logo} className="logo" /> Treat Yo'Self</ScrLink>
        </React.Fragment>;

        let midNavbar;
        midNavbar = <React.Fragment>
            <ScrLink
                className="nav-link"
                activeClass="active"
                to="features"
                spy={true}
                smooth={true}
                offset={0}
                duration={1000}
            >Features</ScrLink>
            <ScrLink
                className="nav-link"
                activeClass="active"
                to="how"
                spy={true}
                smooth={true}
                offset={0}
                duration={1000}
            >How It Works</ScrLink>
            <ScrLink
                className="nav-link"
                activeClass="active"
                to="team"
                spy={true}
                smooth={true}
                offset={0}
                duration={1000}
            >Team</ScrLink>
            <ScrLink
                className="nav-link"
                activeClass="active"
                to="future"
                spy={true}
                smooth={true}
                offset={0}
                duration={1000}
            >Future</ScrLink>
        </React.Fragment >;
        return (
            <div className="navbar2">
                <nav className={this.state.isNavbarScrolled ? "navbar active navbar-expand-xl navbar-dark" : "navbar navbar-expand-xl navbar-dark"} >
                    <div className="container-fluid">
                        {leftNavbar}
                        <div className={this.state.isButtonOpen ? "menuButton open" : "menuButton"}
                            onClick={() => this.setState({ isButtonOpen: !this.state.isButtonOpen })}
                            data-toggle="collapse" data-target="#navbar2Nav">
                            <div className="burger"> </div>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar2Nav">
                            {midNavbar}
                            {/* <Link to="/login">
                                <button className="login">
                                    Log in
                                </button>
                            </Link> */}


                            <button
                                className="login"
                                onClick={(e) => this.showLoginModal()}>
                                Log in
                            </button>
                            <LoginModal
                                onClose={this.showLoginModal}
                                showLogin={this.state.showLogin}
                            />

                            {/* <Link to="/register" >
                                <button className="signup">
                                    Sign Up
                                </button>
                            </Link> */}

                            <button
                                className="signup"
                                onClick={(e) => this.showRegisterModal()}>
                                Sign Up
                            </button>
                            <RegisterModal
                                onClose={this.showRegisterModal}
                                showRegister={this.state.showRegister}
                                redirectTotalPage={this.props.redirectTotalPage}
                            />

                        </div>
                    </div>
                </nav >
            </div>
        )
    }
}

export default withRouter(Navbar2);