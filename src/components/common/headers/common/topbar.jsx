import React from 'react';
import {Link} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'

function TopBar(props){

    const {translate, auth} = props;
    return (
        <div className="top-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="header-contact">
                            <ul>
                                {/* <li>Bienvenue sur abooph</li> */}
                                <li><i className="fa fa-phone" aria-hidden="true"></i>Contacter nous:  08 74 59 49</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 text-right">
                        <ul className="header-dropdown">
                            {/* <li className="mobile-wishlist compare-mobile"><Link to={`/compare`}><i className="fa fa-random" aria-hidden="true"></i>{translate('compare')}</Link></li>
                            <li className="mobile-wishlist"><Link to={`/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li> */}
                            <li className="onhover-dropdown mobile-account">
                                {(auth && auth.isAuthenticated) ? (
                                    <Link to={`/connexion`} data-lng="en">
                                        <i className="fa fa-user" aria-hidden="true"></i> {auth.user.nom}
                                    </Link>
                                ): (
                                    <>
                                        <i className="fa fa-user" aria-hidden="true"></i> Mon compte
                                        <ul className="onhover-show-div">
                                            <li>
                                                <Link to={`/connexion`} data-lng="en">Connexion</Link>
                                            </li>
                                            <li>
                                                <Link to={`/inscription`} data-lng="en">Inscription</Link>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default withTranslate(TopBar);