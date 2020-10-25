import React from 'react';
import {Link} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'

function TopBar(props){

    const {translate} = props;
    return (
        <div className="top-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="header-contact">
                            <ul>
                                {/*<li>{translate('topbar_title', { theme_name: ' Multikart' })}</li>*/}
                                <li>Bienvenue sur abooph</li>
                                <li><i className="fa fa-phone" aria-hidden="true"></i>{translate('call_us')}:  123 - 456 - 7890</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 text-right">
                        <ul className="header-dropdown">
                            <li className="mobile-wishlist compare-mobile"><Link to={`${process.env.PUBLIC_URL}/compare`}><i className="fa fa-random" aria-hidden="true"></i>{translate('compare')}</Link></li>
                            <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li>
                            <li className="onhover-dropdown mobile-account">
                                {/*<i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}*/}
                                <i className="fa fa-user" aria-hidden="true"></i> Mon compte
                                <ul className="onhover-show-div">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/connexion`} data-lng="en">Connexion</Link>
                                    </li>
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/inscription`} data-lng="en">Inscription</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default withTranslate(TopBar);