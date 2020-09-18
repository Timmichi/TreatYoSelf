
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Team.css";
import Card2 from "./Card2";
import questionIMG from "./images/questionBorder.svg"
import questionIMG2 from "./images/questionBorder2.svg"
import timmyIMG from "./images/timmy.png";
import darrenIMG from "./images/darren.png";
import andrewIMG from "./images/andrew.jpg";
import linkedinIMG from "./linkedin.svg";
import facebookIMG from "./facebook.svg";
import "../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Team extends Component {
    constructor(props) {
        super(props)
        this.getDimensions = this.getDimensions.bind(this);
        if (window.innerWidth >= 568 && window.innerWidth <= 1200 && window.innerHeight <= 1366 && window.innerHeight > 300) {
            this.state = {
                colType: "row row-cols-3",
            };
        }
        else if (window.innerWidth >= 1200) {
            this.state = {
                colType: "row row-cols-4",
            };
        }
        else {
            this.state = {
                colType: "row row-cols-2",
            };
        }
    }
    getDimensions() {
        console.log(window.innerWidth, window.innerHeight)
        if (window.innerWidth >= 568 && window.innerWidth <= 1200 && window.innerHeight <= 1366 && window.innerHeight > 300) {
            this.setState({ colType: "row row-cols-3" })
        } else if (window.innerWidth >= 1200) {
            this.setState({ colType: "row row-cols-4" })
        } else {
            this.setState({ colType: "row row-cols-2" })
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
            <div className="teamSection" id="team">
                <div className="wrapper">
                    <article className="promo">
                        <h4>Meet the nerds behind the creation of Treat Yo'Self</h4>
                    </article>
                    <div className="container-fluid">
                        <div className={this.state.colType}>
                            <div className="col d-flex justify-content-center" id="questionCard">
                                <div className="card question text-center">
                                    <img src={questionIMG} className="questionIMG"></img>
                                    <img src={questionIMG2} className="questionIMG2"></img>
                                    <div className="card-body">
                                        <h4 className="card-title">Have a question?</h4>
                                        <p className="card-subtitle">For any questions, concerns,
                                        or business inquiries about Treat Yo’ Self, <Link className="contactUs" to="/contact">contact us</Link>
                                        &nbsp;and we would be happy to help. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Card2
                                    imgsrc={timmyIMG}
                                    name="Timothy Simanhadi"
                                    job="Developer"
                                    facebook={facebookIMG}
                                    facebook_link="https://www.facebook.com/timothy.simanhadi"
                                    linkedin={linkedinIMG}
                                    linkedin_link="https://www.linkedin.com/in/timfsim/"
                                >
                                </Card2>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Card2
                                    imgsrc={darrenIMG}
                                    name="Darren Lim"
                                    job="Developer"
                                >
                                </Card2>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Card2
                                    imgsrc={andrewIMG}
                                    name="Andrew Kwon"
                                    job="Developer"
                                >
                                </Card2>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Team;