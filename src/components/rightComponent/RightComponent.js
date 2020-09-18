import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./RightComponent.css";
import SpendingChart from "../charts/SpendingChart";
import openTab from "./images/openTab.svg";
import closeTab from "./images/closeTab.svg"

class RightComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalObject: "",
            totalAmount: "",
            monthlySpent: "",
            monthlyGained: "",
            monthYearDate: "",
            categoryObj: "",
            loading: true,
            isButtonOpen: false,
            buttonExists: false,
        };
    }
    componentDidMount = () => {
        this.getDimensions();
        window.addEventListener("resize", this.getDimensions);
        console.log("RightComponent componentDidMount");
        this.setState({
            loading: false
        })
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.getDimensions);
    };

    getDimensions = () => {
        if (window.innerWidth <= 1200 && window.innerHeight <= 1366) {
            this.setState({ buttonExists: true })
            // } else if (window.innerWidth >= 1200) {
            //     this.setState({ donutWidth:  })
            //     this.setState({ isDesktopversion: true })
        } else {
            this.setState({ buttonExists: false })
        }
    }


    render() {
        if (this.state.loading) {
            return (<div></div>);
        }
        let toggleRight;
        let arrowRight;
        if (this.state.buttonExists && this.state.isButtonOpen) {
            toggleRight = "rightbar opened-shadow";
            arrowRight = true;
        } else if (this.state.buttonExists && !this.state.isButtonOpen) {
            toggleRight = "rightbar closed";
            arrowRight = false;
        } else if (!this.state.buttonExists) {
            toggleRight = "rightbar opened";

        }
        let isTotal;
        if (this.props.history.location.pathname === "/total") {
            return (<React.Fragment>
            </React.Fragment>)
        }
        return (
            <React.Fragment>
                {isTotal}
                <div className={toggleRight} id="rightbar">

                    {this.state.buttonExists ? <button onClick={() => this.setState({
                        isButtonOpen: !this.state.isButtonOpen
                    })}
                        className="toggleButton"> <img src={arrowRight ? closeTab : openTab} className="openTab"></img> </button> : <div></div>}
                    <div className="spending">
                        <SpendingChart {...this.props}
                            monthName={this.props.monthName}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(RightComponent);