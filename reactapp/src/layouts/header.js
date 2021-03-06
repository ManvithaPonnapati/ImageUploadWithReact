import React from "react";
import {withCookies} from "react-cookie";
import logo from "../images/earthlogo.png";
import "../styles/header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};


    }


    render() {
        return (
            <div>
                     <nav className="navbar navbar-expand-lg navbar-dark teal mb-4 pageNavHeader">
                    <a className="navbar-brand" href="#"><img className="logoImg" src={logo}/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                         <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                             <ul className="navbar-nav ml-auto">
                                 <li className="nav-item active">
                                     <a className="nav-link" href="#">Home <span
                                         className="sr-only">(current)</span></a>
                                 </li>
                                 <li className="nav-item">
                                     <a className="nav-link" href="#">Who are we ? </a>
                                 </li>
                                 <li className="nav-item">
                                     <a className="nav-link" href="#">What is this project ?</a>
                                 </li>
                                 <li className="nav-item dropdown">


                                 </li>
                             </ul>
                         </div>
                </nav>

            </div>)

    }
}

export default withCookies(Header);
