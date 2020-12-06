import React from 'react';

import {connect} from "react-redux";
import { Switch, Route, Redirect, useRouteMatch, Link } from "react-router-dom";

import Breadcrumb from "components/common/breadcrumb";
import { Dashboard, OrderDetail, Orders } from './components'
import { logout } from 'actions'

function DashboardLayout(props) {
    const { path } = useRouteMatch()

    function logout(e){
        e.preventDefault()
        props.logout()
    }

    const dashboardLink = (
        <div className="block-content">
            <ul>
                {/* <li className="active"><a href={path}>Mon Copmte</a></li>
                <li><a href="#">Address Book</a></li>
                <li><a href={`${path}/commandes`}>Mes Commandes</a></li>
                <li><a href="#">My Wishlist</a></li>
                <li><a href="#">Newsletter</a></li>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Change Password</a></li>
                <li className="last"><a href="#" onClick={logout}>Se déconnecter</a></li> */}

                <li><Link to={`${path}/commandes`}>Mes Commandes</Link></li>
                <li><Link to={path}>Mon Copmte</Link></li>
                {/* <li className="last"><a href="#" onClick={logout}>Se déconnecter</a></li> */}
            </ul>
        </div>
    );

    return (
        <div>
            <Breadcrumb title={'Dashboard'}/>
            
            {/*Dashboard section*/}
            <section className="section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="account-sidebar">
                               {dashboardLink}
                            </div>
                            <div className="dashboard-left">
                                {dashboardLink}
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="dashboard-right">
                                <div className="dashboard">
                                    <Switch>
                                        {/* <Route exact path={path}>
                                            <Dashboard/>
                                        </Route> */}

                                        <Route exact path={`${path}/commandes`}>
                                            <Orders/>
                                        </Route>

                                        <Route exact path={`${path}/commandes/:id/detail`}>
                                            <OrderDetail/>
                                        </Route>

                                        <Redirect to={`${path}/commandes`}/>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default connect(null, {logout}) (DashboardLayout);
