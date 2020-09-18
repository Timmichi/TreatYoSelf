import React, { useState, useEffect, useRef, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation } from 'react-router-dom'

import logo from "./images/logo.svg";
import homeIMG from "./images/home.svg";
import transactionsIMG from "./images/transactions.svg";
import categoryIMG from "./images/category.svg";
import analyticsIMG from "./images/analytics.svg";

import gHomeIMG from "./images/gHome.svg";
import gTransactionsIMG from "./images/gTransactions.svg";
import gCategoryIMG from "./images/gCategory.svg";
import gAnalyticsIMG from "./images/gAnalytics.svg";

import pfp from "./images/profilePic.svg";
import bell from "./images/bell.svg";
import dropArrow from "./images/dropArrow.svg";

import rightArrow from "./images/rightArrow.svg";
import leftArrow from "./images/leftArrow.svg";
import change from "./images/change.svg";
import contact from "./images/contact.svg";
import faq from "./images/faq.svg";
import logout from "./images/logout.svg";
import settings from "./images/settings.svg";
import help from "./images/help.svg";

import { DropdownItem, DropdownMenu, NavItem } from "../dropdown/Dropdown"
import "./Navbar.css"



class Navbar extends Component {
    constructor(props) {
        super(props);
        this.setOpen = this.setOpen.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.getPage = this.getPage.bind(this);
        this.state = {
            loading: true,
            whichPage: 1,
            open: false,
            activeMenu: "main",
        };
    }
    getPage = () => {
        if (this.props.history.location.pathname === "/") {
            console.log("home")
            this.setState({ whichPage: 1 })
        } else if (this.props.history.location.pathname === "/analytics") {
            console.log("analytics")
            this.setState({ whichPage: 2 })

        } else if (this.props.history.location.pathname === "/budget/all_transactions/") {
            console.log("transactions")
            this.setState({ whichPage: 3 })
        } else if (this.props.history.location.pathname === "/category") {
            console.log("category")
            this.setState({ whichPage: 4 })
        }
    }

    // getTotalAmount = () => {
    //     axios.get(`/api/total/get`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${Cookies.get("token")}`
    //         }
    //     })
    //         .then(res => {
    //             let profileObj = res.data[0];
    //             this.setState({
    //                 totalAmount: profileObj.total_amount,
    //                 loading: false,
    //             });
    //         })
    //         .catch(err => {
    //             console.log("total get error: " + err)
    //             this.setState({
    //                 loading: false,
    //             });
    //         })
    // }

    componentDidMount = () => {
        console.log("Navbar componentDidMount");
        this.getPage();
        window.addEventListener("hashchange", this.getPage);
        this.setState({
            loading: false
        })


    }
    componentWillUnmount = () => {
        window.removeEventListener("hashchange", this.getPage);
    }

    handleLogout = () => {
        Cookies.remove("token");
        this.props.deleteLogin();
        this.props.history.push("/")
        window.location.reload();
    };

    setOpen = () => {
        this.setState({ open: !this.state.open })
    }

    setActiveMenu = (menu) => {
        this.setState({ activeMenu: menu })
    }

    handleAccountRedirect = () => {
        this.props.history.push({
            pathname: '/account',
        })
    }

    handleContactRedirect = () => {
        this.props.history.push({
            pathname: '/contact',
        })
    }

    render() {
        let header;

        header =
            <div className="sidebar-header">
                <h4>
                    Balance
                    </h4>
                <p>
                    $ {this.props.totalAmount}
                </p>
                <Link to="/budget/create/">
                    <button className="tranButtonStyling btn btn-outline-dark">
                        New Transaction
                            </button>
                </Link>
            </div>;


        let whichHome;
        if (this.state.whichPage === 1) {
            whichHome = gHomeIMG;
        } else {
            whichHome = homeIMG;
        }
        let whichAnalytics;
        if (this.state.whichPage === 2) {
            whichAnalytics = gAnalyticsIMG;
        } else {
            whichAnalytics = analyticsIMG;
        }
        let whichTransactions;
        if (this.state.whichPage === 3) {
            whichTransactions = gTransactionsIMG;
        } else {
            whichTransactions = transactionsIMG;
        }
        let whichCategories;
        if (this.state.whichPage === 4) {
            whichCategories = gCategoryIMG;
        } else {
            whichCategories = categoryIMG;
        }
        let isTotal;
        if (this.props.history.location.pathname === "/total") {
            return (<React.Fragment>
            </React.Fragment>)
        }
        return (

            <React.Fragment>
                {isTotal}
                <div className="topbar">
                    <nav className="navbar navbar-expand-xl navbar-dark" >
                        <div className="container-fluid">
                            <Link to="/" className="navbar-brand" >
                                <img src={logo} className="logo" /> Treat Yo'Self
                            </Link>
                            <ul className="navbar-nav ml-auto">
                                <NavItem
                                    className="profile"
                                    image={pfp}
                                    imageName="pfp"
                                    personName={this.props.firstname}
                                    opened="profile"
                                    closeOnClick
                                >
                                </NavItem>
                                <NavItem
                                    className="topButton"
                                    image={bell}
                                    imageName="bell"
                                    opened="opened"
                                >
                                    <DropdownMenu>

                                    </DropdownMenu>
                                </NavItem>
                                <NavItem
                                    className="topButton"
                                    image={dropArrow}
                                    imageName="dropArrow"
                                    opened="opened"
                                >
                                    <DropdownMenu
                                        activeMenu={this.state.activeMenu}
                                        main={
                                            <React.Fragment>
                                                <DropdownItem
                                                    className="big-menu-item">
                                                    <img className="bigPfp" src={pfp}></img>
                                                    <h2>{this.props.firstname + " " + this.props.lastname}</h2>
                                                </DropdownItem>
                                                <DropdownItem
                                                    className="menu-item"
                                                    leftIcon={<img src={settings}></img>}
                                                    rightIcon={<img src={rightArrow}></img>}
                                                    onClick={() => this.setActiveMenu("settings")}
                                                    goToMenu="settings">
                                                    <p>
                                                        Settings &amp; Privacy
                                            </p>
                                                </DropdownItem>
                                                <DropdownItem
                                                    className="menu-item"
                                                    leftIcon={<img src={help}></img>}
                                                    rightIcon={<img src={rightArrow}></img>}
                                                    onClick={() => this.setActiveMenu("help")}
                                                    goToMenu="help">
                                                    <p>
                                                        Help &amp; Support
                                            </p>
                                                </DropdownItem>
                                                <DropdownItem
                                                    className="menu-item"
                                                    leftIcon={<img src={logout}></img>}
                                                    onClick={this.handleLogout}>
                                                    <p>
                                                        Logout
                                            </p>
                                                </DropdownItem>
                                            </React.Fragment>}
                                        settings={
                                            <React.Fragment>
                                                <DropdownItem
                                                    className="menu-item"
                                                    leftIcon={<img src={leftArrow}></img>}
                                                    onClick={() => this.setActiveMenu("main")}
                                                    goToMenu="main">
                                                    <p>
                                                        Back to Main Menu
                                                    </p>
                                                </DropdownItem>
                                                <DropdownItem
                                                    className="menu-item"
                                                    leftIcon={<img src={change}></img>}
                                                    onClick={this.handleAccountRedirect}
                                                >
                                                    <p>
                                                        Change Account Information
                                                    </p>
                                                </DropdownItem>
                                            </React.Fragment>
                                        }
                                        help={
                                            <React.Fragment>
                                                <DropdownItem
                                                    className="menu-item"
                                                    leftIcon={<img src={leftArrow}></img>}
                                                    onClick={() => this.setActiveMenu("main")}
                                                    goToMenu="main">
                                                    <p>
                                                        Back to Main Menu
                                                    </p>
                                                </DropdownItem>
                                                <DropdownItem
                                                    className="menu-item"
                                                    leftIcon={<img src={faq}></img>}
                                                // onClick={}
                                                >
                                                    <p>
                                                        FAQs
                                                    </p>
                                                </DropdownItem>
                                                <DropdownItem
                                                    className="menu-item"
                                                    leftIcon={<img src={contact}></img>}
                                                    onClick={this.handleContactRedirect}
                                                >
                                                    <p>
                                                        Contact us
                                                    </p>
                                                </DropdownItem>
                                            </React.Fragment>
                                        }
                                    />
                                </NavItem>

                            </ul>
                        </div>
                    </nav>
                </div>
                <nav className="sidebar" id="sidebar">
                    <div className="wrapper">
                        {header}
                        <ul className="list-unstyled components">
                            <li className={this.state.whichPage === 1 ? "active" : "homePage"}>

                                <Link to="/" className="nav-link">
                                    <img src={whichHome} className="homeIMG" /> Home
                                </Link>
                            </li>
                            <li className={this.state.whichPage === 2 ? "active" : "analyticsPage"}>
                                <Link to="/analytics" className="nav-link">
                                    <img src={whichAnalytics} className="homeIMG" /> Analytics
                                </Link>
                            </li>
                            <li className={this.state.whichPage === 3 ? "active" : "transactionsPage"}>
                                <Link to="/budget/all_transactions/" className="nav-link">
                                    <img src={whichTransactions} className="homeIMG" /> Transactions
                                </Link>
                            </li>
                            <li className={this.state.whichPage === 4 ? "active" : "categoriesPage"}>
                                <Link to="/category" className="nav-link">
                                    <img src={whichCategories} className="categoryIMG" /> Categories
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment >
        )
    }

}

export default withRouter(Navbar);