import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Card2.css";
const Card2 = props => {
    return (
        <React.Fragment>
            <div className="card two text-center">
                <div className="imgBox">
                    <img src={props.imgsrc} className="card-img-top" />
                    <ul>
                        <a target="_blank" rel="noopener noreferrer" href={props.linkedin_link}>
                            <img src={props.linkedin} className="linkedin" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={props.facebook_link}>
                            <img src={props.facebook} className="facebook" />
                        </a>
                    </ul>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{props.name}</h4>
                    <h5 className="card-subtitle">{props.job} </h5>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Card2;