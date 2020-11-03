import React from 'react';

import { connect } from 'react-redux';

function Dashboard(props) {
    const { user } = props

    return (
        <>
            <div className="page-title">
                <h2>Dashboard</h2>
            </div>
            <div className="welcome-msg">
                <p>Bonjour, {user.nom} {user.prenom} !</p>
                <p>From your My Account Dashboard you have the ability to view a snapshot of
                    your recent account activity and update your account information. Select
                    a link below to view or edit information.</p>
            </div>
            <div className="box-account box-info">
                <div className="box-head">
                    <h2>Mon compte</h2>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="box">
                            <div className="box-title">
                                <h3>Informations</h3>
                                <a href="#">Modifier</a>
                            </div>
                            <div className="box-content">
                                <h6>{user.nom} {user.prenom}</h6>
                                <h6>{user.email}</h6>
                                <h6><a href="#">Modifier mot de passe</a></h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="box">
                            <div className="box-title">
                                <h3>Newsletters</h3>
                                <a href="#">Modifier</a>
                            </div>
                            <div className="box-content">
                                <p>
                                    You are currently not subscribed to any newsletter.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="box">
                        <div className="box-title">
                            <h3>Address Book</h3>
                            <a href="#">Manage Addresses</a>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <h6>Default Billing Address</h6>
                                <address>
                                    You have not set a default billing address.<br/>
                                    <a href="#">Edit Address</a>
                                </address>
                            </div>
                            <div className="col-sm-6">
                                <h6>Default Shipping Address</h6>
                                <address>
                                    You have not set a default shipping address.<br />
                                    <a href="#">Edit Address</a>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Dashboard);
