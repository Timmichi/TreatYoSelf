
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import bannerIMG from "../images/banner.png";
import laptopIMG from "./images/laptop.png";
import piggyIMG from "../images/piggy.svg";
import piggyPhoneIMG from "../images/piggy2.svg";
import RegisterModal from "../../../../register/RegisterModal"

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showRegister: false,
        }
    }
    showRegisterModal = () => {
        this.setState((prev) => {
            return {
                showRegister: !prev.showRegister
            }
        })
    }
    render() {
        return (
            <div className="mainSection" id="main">
                <div className="wrapper">
                    <article className="promo">
                        <h2>Treat Yo'Self</h2>
                        <h4>A simple, rewarding, and powerful budgeting tool for the casual spender</h4>
                        <h5>Professional budgeting, made <span className="simpleWord">simple </span></h5>
                        <p> Treat Yo'Self is a simple, rewarding, and powerful budgeting tool for the casual spender.</p>
                        <button className="get_started"
                            onClick={(e) => this.showRegisterModal()}>
                            Get Started Free
                            </button>
                        <RegisterModal
                            onClose={this.showRegisterModal}
                            showRegister={this.state.showRegister}
                            redirectTotalPage={this.props.redirectTotalPage}
                        />
                        <Link to="/login">
                            <button className="login">
                                Sign in
                            </button>
                        </Link>
                    </article>
                    <img src={laptopIMG} className="laptopBG"></img>
                    <img src={bannerIMG} className="bannerBG"></img>
                    <img src={piggyIMG} className="piggyBG"></img>
                    <img src={piggyPhoneIMG} className="piggyPhoneBG"></img>
                    <iframe className="video" src="https://www.youtube.com/embed/9kfS3dBtQO4"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true">

                    </iframe>

                    {/* <slider>
                        <slide> <img src="slide1.png"></img> </slide>
                        <slide></slide>
                        <slide></slide>
                        <slide></slide>
                    </slider> */}
                    <article className="promo2">
                        <h4>Take back control</h4>
                        <p>Say goodbye to cluttered receipts and hello to secure virtual transactions.
                            Our beautiful UI will allow you to keep track of your transactions and finally acheive your financial goals.</p>
                    </article>


                </div>
            </div >
        )
    }
}

export default Main;