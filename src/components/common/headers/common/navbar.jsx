import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navClose: { right: '0px' }
        }
    }

    componentWillMount() {
        if (window.innerWidth < 750) {
            this.setState({ navClose: { right: '-410px' } })
        }
        if (window.innerWidth < 1199) {
            this.setState({ navClose: { right: '-300px' } })
        }
    }

    openNav() {
        this.setState({ navClose: { right: '0px' } })
    }
    closeNav() {
        this.setState({ navClose: { right: '-410px' } })
    }

    onMouseEnterHandler() {
        if (window.innerWidth > 1199) {
            document.querySelector("#main-menu").classList.add("hover-unset");
        }
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensubmenu'))
            event.target.nextElementSibling.classList.remove('opensubmenu')
        else{
            document.querySelectorAll('.nav-submenu').forEach(function (value) {
                value.classList.remove('opensubmenu');
            });
            event.target.nextElementSibling.classList.add('opensubmenu')
        }
    }

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;
            
        if(event.target.parentNode.nextElementSibling.classList.contains('opensubmegamenu'))
            event.target.parentNode.nextElementSibling.classList.remove('opensubmegamenu')
        else{
            document.querySelectorAll('.menu-content').forEach(function (value) {
                value.classList.remove('opensubmegamenu');
            });
            event.target.parentNode.nextElementSibling.classList.add('opensubmegamenu')
        }
    }

    render() {
        return (
            <div>
                <div className="main-navbar">
                    <div id="mainnav" >
                        <div className="toggle-nav" onClick={this.openNav.bind(this)} >
                            <i className="fa fa-bars sidebar-bar"></i>
                        </div>
                        <ul className="nav-menu" style={this.state.navClose}>
                            <li className="back-btn" onClick={this.closeNav.bind(this)} >
                                <div className="mobile-back text-right">
                                    <span >Retour</span>
                                    <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                                </div>
                            </li>
                            <li >
                                <Link to="/" className="nav-link">
                                    Accueil
                                </Link>
                            </li>
                            <li >
                                <Link to="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    Galerie
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li>
                                        <Link to={{pathname: '/galerie', state:"homme"}}>
                                            Homme
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={{pathname: '/galerie', state:"femme"}}>
                                            Femme
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={{pathname: '/galerie', state:"enfant"}}>
                                            Enfant
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li >
                                <Link to="/contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                            <li >
                                <Link to="/a-propos" className="nav-link">
                                    A propos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar