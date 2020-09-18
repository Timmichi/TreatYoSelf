import React, { useState, useEffect, useRef, Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./Dropdown.css"

const NavItem = (props) => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState(false);
    const node = useRef();
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);
    const handleClick = e => {
        if (!node.current.contains(e.target)) {
            setOpen(false);
            setColor(false);
        }
    }
    return (
        <div ref={node}>
            <div className="nav-item">
                <button onClick={() => setOpen(!open)} onMouseDown={() => setColor(!color)} className={color ? props.opened : props.className}>
                    {props.personName}
                    <img src={props.image} className={props.imageName}></img>
                </button>
                {open && props.children}
            </div>
        </div>
    );
}

const DropdownMenu = (props) => {
    const [menuHeight, setMenuHeight] = useState(null);
    function calcHeight(el) {
        const height = el.offsetHeight + 30;
        setMenuHeight(height);
    }
    return (
        <div className="dropdown" style={{ height: menuHeight }}>
            {props.children}

            <CSSTransition
                in={props.activeMenu === "main"}
                unmountOnExit timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight} >
                <div className="menu">
                    {props.main}
                </div>
            </CSSTransition>

            <CSSTransition
                in={props.activeMenu === "settings"}
                unmountOnExit timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}>
                <div className="menu">
                    {props.settings}
                </div>
            </CSSTransition>

            <CSSTransition
                in={props.activeMenu === "help"}
                unmountOnExit timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}>
                <div className="menu">
                    {props.help}
                </div>
            </CSSTransition>
        </div>
    )
}

const DropdownItem = (props) => {
    return (
        <a className={props.className} onClick={props.onClick} style={{ cursor: "pointer" }}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
        </a>
    );
}

export { NavItem, DropdownItem, DropdownMenu }