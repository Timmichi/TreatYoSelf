import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HowItWorks.css";
import rectangleIMG from "../images/rectangle.png";
import step1IMG from "../images/Step 1.svg";
import step2IMG from "../images/Step 2.svg";
import step3IMG from "../images/Step 3.svg";
import step4IMG from "../images/Step 4.svg";
import pathIMG from "../images/path.svg";
import simpleStepsIMG from "../images/simpleSteps.svg";

class HowItWorks extends Component {
    constructor(props) {
        super(props)
        this.getDimensions = this.getDimensions.bind(this);
        if (window.innerWidth >= 568 && window.innerWidth <= 1200 && window.innerHeight <= 1366 && window.innerHeight > 300) {
            this.state = {
                changeRow: true,
                isDesktopversion: true,
            };
        }
        else if (window.innerWidth >= 1200) {
            this.state = {
                changeRow: true,
                isDesktopversion: true,
            };
        }
        else {
            this.state = {
                changeRow: false,
                isDesktopversion: false,
            };
        }
    }
    getDimensions() {
        console.log(window.innerWidth, window.innerHeight)
        if (window.innerWidth >= 568 && window.innerWidth <= 1200 && window.innerHeight <= 1366 && window.innerHeight > 300) {
            this.setState({ changeRow: true })
            this.setState({ isDesktopversion: true })
        } else if (window.innerWidth >= 1200) {
            this.setState({ changeRow: true })
            this.setState({ isDesktopversion: true })
        } else {
            this.setState({ changeRow: false })
            this.setState({ isDesktopversion: false })
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
            <div className="howSection" id="how">
                <img src={pathIMG} className="pathBG"></img>
                <img src={simpleStepsIMG} className="simpleStepsBG"></img>
                <div className="wrapper">
                    <article className="promo">
                        <h4>Getting started is as easy as following these simple steps</h4>
                    </article>
                    <div className={this.state.isDesktopversion ? "container" : "container-fluid"}>
                        <div className={this.state.changeRow ? "row row-cols-2" : "row row-cols-1"} >
                            <div className={this.state.isDesktopversion ? "col d-flex justify-content-center" : "col d-flex justify-content-start"} >
                                <div className="card zero text-center">
                                    <div className="card-body">
                                        <div className="pink">
                                            <svg width={this.state.isDesktopversion ? "25%" : "30%"} height={this.state.isDesktopversion ? "15%" : "30%"} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="burger" filter="url(#filter0_d)">
                                                    <g id="circle">
                                                        <path id="Vector" d="M60 106C87.6142 106 110 83.6142 110 56C110 28.3858 87.6142 6 60 6C32.3858 6 10 28.3858 10 56C10 83.6142 32.3858 106 60 106Z" fill="#F28482" />
                                                        <g id="burger">
                                                            <g id="burger 1">
                                                                <path id="Vector_2" d="M71.7969 75H48.2031C43.6804 75 40 71.3196 40 66.7969C40 66.1491 40.5241 65.625 41.1719 65.625H78.8281C79.4759 65.625 80 66.1491 80 66.7969C80 71.3196 76.3196 75 71.7969 75Z" fill="black" />
                                                                <path id="Vector_3" d="M60 35C49.0148 35 40 41.8344 40 50.2344C40 50.8821 40.5241 51.4062 41.1719 51.4062H78.8281C79.4759 51.4062 80 50.8821 80 50.2344C80 41.8344 70.9852 35 60 35ZM51.3754 44.0316L49.0316 46.3754C48.5739 46.8331 47.8323 46.8332 47.3745 46.3754C46.9168 45.9177 46.9168 45.176 47.3745 44.7183L49.7183 42.3745C50.176 41.9168 50.9177 41.9168 51.3754 42.3745C51.8331 42.8323 51.8332 43.5739 51.3754 44.0316ZM58.4848 44.0316L56.141 46.3754C55.6833 46.8331 54.9417 46.8332 54.4839 46.3754C54.0262 45.9177 54.0262 45.176 54.4839 44.7183L56.8277 42.3745C57.2854 41.9168 58.027 41.9168 58.4848 42.3745C58.9425 42.8323 58.9426 43.5739 58.4848 44.0316ZM65.516 44.0316L63.1723 46.3754C62.7145 46.8331 61.973 46.8332 61.5152 46.3754C61.0574 45.9177 61.0574 45.176 61.5152 44.7183L63.8589 42.3745C64.3166 41.9168 65.0583 41.9168 65.516 42.3745C65.9738 42.8323 65.9738 43.5739 65.516 44.0316ZM71.9743 44.0316L69.6305 46.3754C69.1728 46.8331 68.4312 46.8332 67.9734 46.3754C67.5157 45.9177 67.5157 45.176 67.9734 44.7183L70.3172 42.3745C70.7749 41.9168 71.5166 41.9168 71.9743 42.3745C72.432 42.8323 72.432 43.5739 71.9743 44.0316Z" fill="black" />
                                                                <path id="Vector_4" d="M41.1719 56.1719C41.7344 56.1719 42.2266 56.2421 42.6484 56.3593C42.483 56.8921 42.4367 57.0514 42.3438 58.703C42.0391 58.5859 41.6641 58.5156 41.1719 58.5156C40.5155 58.5156 40 57.9999 40 57.3437C40 56.6874 40.5155 56.1719 41.1719 56.1719Z" fill="black" />
                                                                <path id="Vector_5" d="M80 57.3437C80 57.9999 79.4845 58.5156 78.8281 58.5156C78.3359 58.5156 77.9609 58.5859 77.6562 58.703C77.6309 58.2532 77.6788 57.4134 77.3516 56.3593C77.7734 56.2421 78.2656 56.1719 78.8281 56.1719C79.4845 56.1719 80 56.6874 80 57.3437Z" fill="black" />
                                                                <path id="Vector_6" d="M42.6484 56.3594C43.7031 56.6173 44.4063 57.1329 44.9922 57.5782C45.7188 58.1172 46.2577 58.5157 47.4296 58.5157C48.6015 58.5157 49.1172 58.1172 49.8438 57.5781C50.6875 56.9452 51.7969 56.172 53.7422 56.172C55.7109 56.172 56.7421 56.9453 57.5859 57.5781C58.3126 58.1172 58.8281 58.5157 60 58.5157C61.1719 58.5157 61.6874 58.1172 62.4141 57.5781C63.2579 56.9452 64.2891 56.172 66.2578 56.172C68.2032 56.172 69.3126 56.9453 70.1563 57.5781C70.8828 58.1171 71.3985 58.5157 72.5704 58.5157C73.7423 58.5157 74.2813 58.1172 75.0078 57.5781C75.5938 57.1328 76.2969 56.6173 77.3516 56.3593C77.1044 55.4384 76.6925 54.5891 76.1628 53.8281H43.8372C43.3075 54.5891 42.8956 55.4384 42.6484 56.3594Z" fill="black" />
                                                                <path id="Vector_7" d="M76.1791 63.2031C77.0781 61.9202 77.6209 60.3721 77.6563 58.703C77.1875 58.8671 76.836 59.1484 76.414 59.453C75.5702 60.0859 74.539 60.8594 72.5703 60.8594C70.625 60.8594 69.5938 60.0859 68.75 59.453C68.0234 58.914 67.4296 58.5156 66.2577 58.5156C65.0859 58.5156 64.5469 58.914 63.8203 59.453C63.0001 60.0859 61.9453 60.8594 60 60.8594C58.0547 60.8594 56.9999 60.0859 56.1797 59.453C55.4531 58.914 54.9141 58.5156 53.7423 58.5156C52.5704 58.5156 51.9766 58.914 51.25 59.453C50.4063 60.0859 49.375 60.8594 47.4296 60.8594C45.4609 60.8594 44.4297 60.0859 43.5859 59.453C43.1639 59.1484 42.8124 58.8671 42.3437 58.703C42.379 60.3722 42.9219 61.9202 43.8208 63.2031H76.1791Z" fill="black" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <path id="shadow" d="M60 106C87.6142 106 110 83.6142 110 56C110 28.3858 87.6142 6 60 6C32.3858 6 10 28.3858 10 56C10 83.6142 32.3858 106 60 106Z" fill="url(#paint0_linear)" />
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                        <feOffset dy="4" />
                                                        <feGaussianBlur stdDeviation="5" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                    </filter>
                                                    <linearGradient id="paint0_linear" x1="125" y1="140.5" x2="66.5" y2="85" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#9FFFC6" />
                                                        <stop offset="0.421875" stop-color="#C4FFDB" stop-opacity="0.619792" />
                                                        <stop offset="1" stop-color="white" stop-opacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                        <h4 className="card-title"><span className='bigNumber'>1.</span> Create personalized transaction categories</h4>
                                        <Link to="">
                                            <button className="pinkButton">
                                                Learn More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.isDesktopversion ? "col d-flex justify-content-center" : "col d-flex justify-content-end"} >
                                <div className="card zero text-center">
                                    <div className="card-body">
                                        <div className="pink">
                                            <svg width={this.state.isDesktopversion ? "25%" : "30%"} height={this.state.isDesktopversion ? "15%" : "30%"} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="add" filter="url(#filter0_d)">
                                                    <g id="circle">
                                                        <path id="Vector" d="M60 106C87.6142 106 110 83.6142 110 56C110 28.3858 87.6142 6 60 6C32.3858 6 10 28.3858 10 56C10 83.6142 32.3858 106 60 106Z" fill="#F28482" />
                                                        <g id="add">
                                                            <g id="add 1">
                                                                <path id="Vector_2" d="M60 36C48.9716 36 40 44.9716 40 56C40 67.0284 48.9716 76 60 76C71.0284 76 80 67.0284 80 56C80 44.9716 71.0284 36 60 36ZM68.75 57.6666H61.6666V64.75C61.6666 65.6701 60.9201 66.4166 60 66.4166C59.0799 66.4166 58.3334 65.6701 58.3334 64.75V57.6666H51.25C50.3299 57.6666 49.5834 56.9201 49.5834 56C49.5834 55.0799 50.3299 54.3334 51.25 54.3334H58.3334V47.25C58.3334 46.3299 59.0799 45.5834 60 45.5834C60.9201 45.5834 61.6666 46.3299 61.6666 47.25V54.3334H68.75C69.6701 54.3334 70.4166 55.0799 70.4166 56C70.4166 56.9201 69.6701 57.6666 68.75 57.6666Z" fill="black" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <path id="shadow" d="M60 106C87.6142 106 110 83.6142 110 56C110 28.3858 87.6142 6 60 6C32.3858 6 10 28.3858 10 56C10 83.6142 32.3858 106 60 106Z" fill="url(#paint0_linear)" />
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                        <feOffset dy="4" />
                                                        <feGaussianBlur stdDeviation="5" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                    </filter>
                                                    <linearGradient id="paint0_linear" x1="125" y1="140.5" x2="66.5" y2="85" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#9FFFC6" />
                                                        <stop offset="0.421875" stop-color="#C4FFDB" stop-opacity="0.619792" />
                                                        <stop offset="1" stop-color="white" stop-opacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                        <h4 className="card-title"><span className='bigNumber'>2.</span> Add daily transactions and schedule payments</h4>
                                        <Link to="">
                                            <button className="pinkButton">
                                                Learn More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.isDesktopversion ? "col d-flex justify-content-center" : "col d-flex justify-content-start"} >
                                <div className="card zero text-center">
                                    <div className="card-body">
                                        <div className="pink">
                                            <svg width={this.state.isDesktopversion ? "25%" : "30%"} height={this.state.isDesktopversion ? "15%" : "30%"} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="calendar" filter="url(#filter0_d)">
                                                    <g id="circle">
                                                        <path id="Vector" d="M60 106C87.6142 106 110 83.6142 110 56C110 28.3858 87.6142 6 60 6C32.3858 6 10 28.3858 10 56C10 83.6142 32.3858 106 60 106Z" fill="#F28482" />
                                                        <g id="calendar">
                                                            <g id="Group">
                                                                <g id="Group_2">
                                                                    <path id="Vector_2" d="M50 36C49.211 36 48.5714 36.6396 48.5714 37.4286V40.2857H51.4286V37.4286C51.4286 36.6396 50.789 36 50 36Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_3">
                                                                <g id="Group_4">
                                                                    <path id="Vector_3" d="M70 36C69.211 36 68.5714 36.6396 68.5714 37.4286V40.2857H71.4285V37.4286C71.4286 36.6396 70.789 36 70 36Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_5">
                                                                <g id="Group_6">
                                                                    <path id="Vector_4" d="M75.7143 40.2857H71.4286V46C71.4286 46.789 70.789 47.4286 70 47.4286C69.211 47.4286 68.5714 46.789 68.5714 46V40.2857H51.4285V46C51.4285 46.789 50.7889 47.4286 49.9999 47.4286C49.2109 47.4286 48.5713 46.789 48.5713 46V40.2857H44.2857C41.9188 40.2857 40 42.2045 40 44.5714V71.7143C40 74.0812 41.9188 76 44.2857 76H75.7143C78.0812 76 80 74.0812 80 71.7143V44.5714C80 42.2045 78.0812 40.2857 75.7143 40.2857ZM77.1428 71.7143C77.1428 72.5033 76.5032 73.1429 75.7142 73.1429H44.2857C43.4967 73.1429 42.8571 72.5033 42.8571 71.7143V53.1428H77.1428V71.7143Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_7">
                                                                <g id="Group_8">
                                                                    <path id="Vector_5" d="M51.4285 56H48.5714C47.7824 56 47.1428 56.6396 47.1428 57.4286C47.1428 58.2176 47.7824 58.8572 48.5714 58.8572H51.4285C52.2175 58.8572 52.8571 58.2176 52.8571 57.4286C52.8571 56.6396 52.2175 56 51.4285 56Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_9">
                                                                <g id="Group_10">
                                                                    <path id="Vector_6" d="M61.4286 56H58.5715C57.7824 56 57.1429 56.6396 57.1429 57.4286C57.1429 58.2176 57.7824 58.8572 58.5715 58.8572H61.4286C62.2176 58.8572 62.8572 58.2176 62.8572 57.4286C62.8572 56.6396 62.2176 56 61.4286 56Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_11">
                                                                <g id="Group_12">
                                                                    <path id="Vector_7" d="M71.4286 56H68.5715C67.7824 56 67.1429 56.6396 67.1429 57.4286C67.1429 58.2176 67.7824 58.8572 68.5715 58.8572H71.4286C72.2176 58.8572 72.8572 58.2176 72.8572 57.4286C72.8572 56.6396 72.2175 56 71.4286 56Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_13">
                                                                <g id="Group_14">
                                                                    <path id="Vector_8" d="M51.4285 61.7143H48.5714C47.7824 61.7143 47.1428 62.3539 47.1428 63.1429C47.1428 63.9319 47.7824 64.5715 48.5714 64.5715H51.4285C52.2175 64.5715 52.8571 63.9319 52.8571 63.1429C52.8571 62.3539 52.2175 61.7143 51.4285 61.7143Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_15">
                                                                <g id="Group_16">
                                                                    <path id="Vector_9" d="M61.4286 61.7143H58.5715C57.7824 61.7143 57.1429 62.3539 57.1429 63.1429C57.1429 63.9319 57.7824 64.5715 58.5715 64.5715H61.4286C62.2176 64.5715 62.8572 63.9319 62.8572 63.1429C62.8572 62.3539 62.2176 61.7143 61.4286 61.7143Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_17">
                                                                <g id="Group_18">
                                                                    <path id="Vector_10" d="M71.4286 61.7143H68.5715C67.7824 61.7143 67.1429 62.3539 67.1429 63.1429C67.1429 63.9319 67.7824 64.5715 68.5715 64.5715H71.4286C72.2176 64.5715 72.8572 63.9319 72.8572 63.1429C72.8571 62.3539 72.2175 61.7143 71.4286 61.7143Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_19">
                                                                <g id="Group_20">
                                                                    <path id="Vector_11" d="M51.4285 67.4285H48.5714C47.7824 67.4285 47.1428 68.0681 47.1428 68.8571C47.1428 69.6461 47.7824 70.2856 48.5714 70.2856H51.4285C52.2175 70.2856 52.8571 69.646 52.8571 68.857C52.8571 68.068 52.2175 67.4285 51.4285 67.4285Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_21">
                                                                <g id="Group_22">
                                                                    <path id="Vector_12" d="M61.4286 67.4285H58.5715C57.7824 67.4285 57.1429 68.0681 57.1429 68.8571C57.1429 69.6461 57.7824 70.2857 58.5715 70.2857H61.4286C62.2176 70.2857 62.8572 69.6461 62.8572 68.8571C62.8572 68.0681 62.2176 67.4285 61.4286 67.4285Z" fill="black" />
                                                                </g>
                                                            </g>
                                                            <g id="Group_23">
                                                                <g id="Group_24">
                                                                    <path id="Vector_13" d="M71.4286 67.4285H68.5715C67.7824 67.4285 67.1429 68.0681 67.1429 68.8571C67.1429 69.6461 67.7824 70.2857 68.5715 70.2857H71.4286C72.2176 70.2857 72.8572 69.6461 72.8572 68.8571C72.8572 68.0681 72.2175 67.4285 71.4286 67.4285Z" fill="black" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <path id="shadow" d="M60 106C87.6142 106 110 83.6142 110 56C110 28.3858 87.6142 6 60 6C32.3858 6 10 28.3858 10 56C10 83.6142 32.3858 106 60 106Z" fill="url(#paint0_linear)" />
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                        <feOffset dy="4" />
                                                        <feGaussianBlur stdDeviation="5" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                    </filter>
                                                    <linearGradient id="paint0_linear" x1="125" y1="140.5" x2="66.5" y2="85" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#9FFFC6" />
                                                        <stop offset="0.421875" stop-color="#C4FFDB" stop-opacity="0.619792" />
                                                        <stop offset="1" stop-color="white" stop-opacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                        <h4 className="card-title"><span className='bigNumber'>3.</span> Set and meet spending and income goals</h4>
                                        <Link to="">
                                            <button className="pinkButton">
                                                Learn More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.isDesktopversion ? "col d-flex justify-content-center" : "col d-flex justify-content-end"} >
                                <div className="card zero text-center">
                                    <div className="card-body">
                                        <div className="pink">
                                            <svg width={this.state.isDesktopversion ? "25%" : "30%"} height={this.state.isDesktopversion ? "15%" : "30%"} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="gift">
                                                    <g id="circle" filter="url(#filter0_d)">
                                                        <path id="Vector" d="M60 106C87.6142 106 110 83.6142 110 56C110 28.3858 87.6142 6 60 6C32.3858 6 10 28.3858 10 56C10 83.6142 32.3858 106 60 106Z" fill="#F5D281" />
                                                        <g id="gift">
                                                            <path id="Vector_2" d="M42.5 56.952V71.952C42.5 73.332 43.6225 74.452 45 74.452H57.5V56.952H42.5Z" fill="black" />
                                                            <path id="Vector_3" d="M77.5 46.9519H69.59C70.1575 46.5644 70.645 46.1794 70.985 45.8344C73.0025 43.8069 73.0025 40.5069 70.985 38.4794C69.025 36.5044 65.61 36.5094 63.6525 38.4794C62.5675 39.5669 59.6925 43.9944 60.09 46.9519H59.91C60.305 43.9944 57.43 39.5669 56.3475 38.4794C54.3875 36.5094 50.9725 36.5094 49.015 38.4794C47 40.5069 47 43.8069 49.0125 45.8344C49.355 46.1794 49.8425 46.5644 50.41 46.9519H42.5C41.1225 46.9519 40 48.0744 40 49.4519V53.2019C40 53.8919 40.56 54.4519 41.25 54.4519H57.5V49.4519H62.5V54.4519H78.75C79.44 54.4519 80 53.8919 80 53.2019V49.4519C80 48.0744 78.88 46.9519 77.5 46.9519ZM57.3525 46.8694C57.3525 46.8694 57.2475 46.9519 56.89 46.9519C55.1625 46.9519 51.865 45.1569 50.7875 44.0719C49.74 43.0169 49.74 41.2969 50.7875 40.2419C51.295 39.7319 51.9675 39.4519 52.6825 39.4519C53.395 39.4519 54.0675 39.7319 54.575 40.2419C56.26 41.9369 57.935 46.2669 57.3525 46.8694ZM63.1075 46.9519C62.7525 46.9519 62.6475 46.8719 62.6475 46.8694C62.065 46.2669 63.74 41.9369 65.425 40.2419C66.4325 39.2244 68.195 39.2194 69.2125 40.2419C70.2625 41.2969 70.2625 43.0169 69.2125 44.0719C68.135 45.1569 64.8375 46.9519 63.1075 46.9519Z" fill="black" />
                                                            <path id="Vector_4" d="M62.5 56.952V74.452H75C76.38 74.452 77.5 73.332 77.5 71.952V56.952H62.5Z" fill="black" />
                                                        </g>
                                                    </g>
                                                    <path id="shadow" d="M60 106C87.6142 106 110 83.6142 110 56C110 28.3858 87.6142 6 60 6C32.3858 6 10 28.3858 10 56C10 83.6142 32.3858 106 60 106Z" fill="url(#paint0_linear)" />
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                        <feOffset dy="4" />
                                                        <feGaussianBlur stdDeviation="5" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                    </filter>
                                                    <linearGradient id="paint0_linear" x1="125" y1="140.5" x2="66.5" y2="85" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#A9772C" />
                                                        <stop offset="0.453125" stop-color="white" stop-opacity="0.572917" />
                                                        <stop offset="1" stop-color="white" stop-opacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>

                                        </div>
                                        <h4 className="card-title"><span className='bigNumber'>4.</span> Treat yo’self for exceeding your financial goals</h4>
                                        <Link to="">
                                            <button className="yellowButton">
                                                Learn More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >)
    }
}

export default HowItWorks;





