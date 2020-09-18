
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Copyright.css";
import piggyIMG from "./images/piggy.svg";
class Copyright extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }
    render() {
        return (
            <div className="copyrightSection" id="copyright">
                <div className="wrapper">
                    <article className="promo">
                        <img src={piggyIMG} className="piggyIMG"></img>
                        <Link to="/contact">
                            <button className="contactButton">
                                Contact us
                            </button>
                        </Link>
                        <h4>Copyright © 2020 Treat Yo'Self</h4>
                    </article>
                </div>
            </div>
        );
    }
}

export default Copyright;