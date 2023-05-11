/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

const SideBar = () => {
    const [isopen, setisOpen] = useState(false);
    const handleOnOpen = () => {
        setisOpen(true)
    }
    const handleOnClose = () => {
        setisOpen(false)
    }
    const toggleNav = () => {
        setisOpen(!isopen)
    }

    return (
        <div onClick={toggleNav}>
            <Menu isOpen={isopen} onOpen={handleOnOpen} onClose={handleOnClose} >
                <Link className="menu-item" to="/">Home</Link>
                <Link className="menu-item" to="/free-demo">Free Demo</Link>
                <Link className="menu-item" to="/login">Login as Paid Girl</Link>
                <Link className="menu-item" to="/register">Register as Paid Girl</Link>
            </Menu >
        </div>
    );
};

export default SideBar
