import React, { Component } from "react";
import "../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Card from "./Card";
import payment_img from "../images/payments.svg";
import visibility_img from "../images/visibility.svg";
import category_img from "../images/categories.svg";
import history_img from "../images/history.svg";
import simplicity_img from "../images/simplicity.svg";
import rewards_img from "../images/rewards.svg";
import ovalIMG from "../images/oval.svg";
import smallOvalIMG from "../images/small oval.svg";
import "./Features.css";

class Features extends Component {
    constructor(props) {
        super(props);
        this.getDimensions = this.getDimensions.bind(this);
        if (window.innerWidth >= 568 && window.innerWidth <= 1200 && window.innerHeight <= 1366 && window.innerHeight > 300) {
            this.state = {
                changeRow: true,
                threeColCards: true,
                showInformation: false,
            };
        }
        else if (window.innerWidth >= 1200) {
            this.state = {
                changeRow: true,
                threeColCards: true,
                showInformation: true,
            };
        }
        else {
            this.state = {
                changeRow: false,
                threeColCards: false,
                showInformation: false,
            };
        }
    }
    getDimensions() {
        console.log(window.innerWidth, window.innerHeight)
        if (window.innerWidth >= 568 && window.innerWidth <= 1200 && window.innerHeight <= 1366 && window.innerHeight > 300) {
            this.setState({ changeRow: true })
            this.setState({ threeColCards: true })
            this.setState({ showInformation: false })
        } else if (window.innerWidth >= 1200) {
            this.setState({ changeRow: true })
            this.setState({ threeColCards: true })
            this.setState({ showInformation: true })
        } else {
            this.setState({ changeRow: false })
            this.setState({ threeColCards: false })
            this.setState({ showInformation: false })
        }
    }
    componentDidMount() {
        window.addEventListener("resize", this.getDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.getDimensions);
    }
    render() {
        return (
            <div className="featuresSection" id="features">
                <div className="wrapper">
                    <article className="promo">
                        <h4>All the features you wished were in your banking app</h4>
                        <p>...and more</p>
                    </article>
                    <div className="container-fluid">
                        <div className={this.state.changeRow ? "row row-cols-3" : "row row-cols-2"} >
                            <div className="col d-flex justify-content-center">
                                <Card
                                    isThreeColCards={this.state.threeColCards}
                                    showInformation={this.state.showInformation}
                                    imgsrc={category_img}
                                    title="Categories"
                                    text="Create your own personalized spending and income stream categories." />
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Card
                                    isThreeColCards={this.state.threeColCards}
                                    showInformation={this.state.showInformation}
                                    imgsrc={visibility_img}
                                    title="Visibility"
                                    text="Track your spending and income with beautiful and simple graphs and charts." />
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Card
                                    isThreeColCards={this.state.threeColCards}
                                    showInformation={this.state.showInformation}
                                    imgsrc={payment_img}
                                    title="Payments"
                                    text="Never miss another payment. Schedule upcoming payments and we'll notify you before they're due." />
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Card
                                    isThreeColCards={this.state.threeColCards}
                                    showInformation={this.state.showInformation}
                                    imgsrc={history_img}
                                    title="History"
                                    text="Never assume again. All past activity is secure and saved in your account." />
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Card
                                    isThreeColCards={this.state.threeColCards}
                                    showInformation={this.state.showInformation}
                                    imgsrc={simplicity_img}
                                    title="Simplicity"
                                    text="Our seemless UI is simple to use and easy to navigate." />
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Card
                                    isThreeColCards={this.state.threeColCards}
                                    showInformation={this.state.showInformation}
                                    imgsrc={rewards_img}
                                    title="Rewards"
                                    text="We show you much you improved in spending/earning every month! 
                                    If you beat your goals, it’s time to Treat Yo’Self!" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default Features;
