import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import { Button } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Redirect, useLocation, Link } from 'react-router-dom';

import Breadcrumb from "../common/breadcrumb";

import {handleFetch} from '../../helpers';
import { signIn } from '../../services/auth'
import { signIn as signInUser } from '../../actions'
import { login } from 'constants/urls';

const initialState = {
    isLoading: false,
};

function LoginForm({signInUser}) {
    const [state, setState] = useState(initialState)

    function handleValidSubmit(event, values){
        setState(state => ({...state, isLoading: true }));

        const { method, url } = login
        handleFetch(method, url(), 
            signInUser,
            () => setState(state => ({...state, isLoading: false})),
            values.login
        )
    }

    return (
        <Fragment>
            <AvForm className="theme-form" onValidSubmit={handleValidSubmit}>
                <div className="form-group">
                    <AvField 
                        label="EMAIL"
                        name="login[email]" 
                        type="email" 
                        placeholder="Votre email" 
                        validate={{
                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre email'},
                            email: {value: true, errorMessage: "Votre email est invalide"},
                            minLength: {value: 10, errorMessage: "Votre email est invalide"},
                            maxLength: {value: 30, errorMessage: "Votre email est invalide"}
                        }} 
                    />
                </div>
                <div className="form-group">
                    <AvField 
                        label="MOT DE PASSE"
                        name="login[password]" 
                        type="password" 
                        placeholder="Votre mot de passe" 
                        validate={{
                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                            // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: ""},
                            minLength: {value: 6, errorMessage: "Votre mot de passe doit être entre 6 et 16 caractères"},
                            maxLength: {value: 16, errorMessage: "Votre mot de passe doit être entre 6 et 16 caractères"}
                        }} 
                    />
                </div>
                <div style={{marginBottom: 10}}>
                    <Link to='/mot-de-passe-oublie'>Mot de passe oublié</Link>
                </div>
                <Button 
                    className="btn btn-solid" 
                    color="default"
                    disabled={state.isLoading}
                >
                    {state.isLoading ? "Veuillez patienter ..." : "Se connecter"}
                </Button>
            </AvForm>
        </Fragment>
    )
}

function Login({signInUser, isAuthenticated}){
    const location = useLocation()

    const {from} = location.state || {from: {pathname: "/mon-compte"}};

    if(isAuthenticated){
        return <Redirect to={from}/>;
    } 

    return (
        <div>
            <Breadcrumb title={'Login'}/>
            
            {/*Login section*/}
            <section className="login-page section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3>Connexion</h3>
                            <div className="theme-card">
                                <LoginForm signInUser={signInUser} />
                            </div>
                        </div>
                        
                        <div className="col-lg-6 right-login">
                            <h3>Nouveau client</h3>
                            <div className="theme-card authentication-right">
                                <h6 className="title-font">Créer un compte</h6>
                                <p>Sign up for a free account at our store. Registration is quick and easy. It
                                    allows you to be able to order from our shop. To start shopping click
                                    register.</p>
                                <Link to="/inscription" className="btn btn-solid">Créer un compte</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {signInUser}) (Login);
