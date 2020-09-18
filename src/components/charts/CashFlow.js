import React, { Component, Fragment, useState, useEffect } from "react";
import "./CashFlow.css"

const CashFlow = (props) => {
    const [sStyle, setsStyle] = useState();
    const [gStyle, setgStyle] = useState();
    let sWidth = 0;
    let gWidth = 0;
    let spent = props.yearlySpent
    spent = parseFloat(spent)
    spent = spent.toFixed(2);
    let gained = props.yearlyGained
    gained = parseFloat(gained)
    gained = gained.toFixed(2);
    let netGain = gained - spent;
    netGain = netGain.toFixed(2);

    whichWidth();

    useEffect(() => {
        let isMounted = true;

        setTimeout(() => {

            const gStyle = {
                opacity: 1,
                width: `${gWidth}%`
            }
            const sStyle = {
                opacity: 1,
                width: `${sWidth}%`
            }
            if (isMounted) setgStyle(gStyle), setsStyle(sStyle)
        }, 100);
        return () => {
            isMounted = false;
        }
    })
    function whichWidth() {
        if (gained >= spent) {
            gWidth = 100;
            sWidth = (spent / gained) * 100
        } else {
            sWidth = 100;
            gWidth = (gained / spent) * 100
        }
    }
    let className;
    let absolute;
    if (netGain >= 0) {
        className = "inGreen";
        absolute = `+$${Math.abs(netGain)}`;
    } else {
        className = "inRed"
        absolute = `-$${Math.abs(netGain)}`;

    }
    return (
        <div className="cashFlow">
            <h2>
                Cash Flow
                </h2>
            <p>
                You've earned ${gained} and spent ${spent} in {props.year}.
                </p>
            <div className="progress">
                <div className="progress-gain" style={gStyle}></div>

            </div>
            {<p className={className}>{absolute}</p>}
            <div className="progress">
                <div className="progress-spent" style={sStyle}></div>
            </div>
        </div>

    )
};


export default CashFlow;
