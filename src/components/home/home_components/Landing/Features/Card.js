import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
const Card = props => {
    return (
        <React.Fragment>
            <div className={props.isThreeColCards ? "card one-threeCol text-center" : "card one text-center"} >
                <div className={props.showInformation ? "no-flip" : "content"} >
                    <div className="front z-depth-2">
                        <div className="card-body text-dark">
                            <img src={props.imgsrc} alt="Image" className="card-img-top" />
                            <h4 className="card-title">{props.title}</h4>
                            <p className="card-text text-secondary" > {props.text}</p>
                        </div>
                    </div>
                    <div className="back z-depth-2">
                        <div className="card-body text-dark">
                            <p className="card-text text-secondary">{props.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Card;