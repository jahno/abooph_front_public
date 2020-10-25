import React, { useState } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { useHistory,  useParams, useLocation, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

import Breadcrumb from "../common/breadcrumb";
import { toast } from 'react-toastify';

import {handleFetch} from '../../helpers';
import { passwordReset } from '../../services/auth'

const initialState = {
    isLoading: false,
};

function PasswordRset({isAuthenticated}) {
    const [state, setState] = useState(initialState)
    const history = useHistory()
    const params = useParams()
    const location = useLocation()

    const {from} = location.state || {from: {pathname: "/mon-compte"}};

    if(isAuthenticated){
        return <Redirect to={from}/>;
    } 

    function handleValidSubmit(event, values){
        if(values.password !== values.passwordConfirmation){
            toast.error("Vos mots de passe ne sont pas identiques", {
                autoClose: false
            });
        }else{
            setState(state => ({...state, isLoading: true }));

            const data = {...values, token: params.token}

            handleFetch(passwordReset, data, 
                () => {
                    history.push('/connexion')
                },
                () => {
                    setState(state => ({...state, isLoading: false }));
                }
            )
        }
    };

    return (
        <div>
            <Breadcrumb title={'nouveau mot de passe'}/>
            
            {/*Forget Password section*/}
            <section className="pwd-page section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <h2>Nouveau mot de passe</h2>
                            <form className="theme-form">
                                <AvForm onValidSubmit={handleValidSubmit} className="form-row">
                                    <div className="col-md-12">
                                        <AvField 
                                            name="email" 
                                            type="email"
                                            placeholder="Email" 
                                            validate={{
                                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre email'},
                                                email: {value: true, errorMessage: "Votre email est invalide"},
                                                minLength: {value: 10, errorMessage: "Votre email est invalide"},
                                                maxLength: {value: 30, errorMessage: "Votre email est invalide"}
                                            }} 
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <AvField 
                                            name="password" 
                                            type="password" 
                                            placeholder="Mot de passe" 
                                            validate={{
                                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                                // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Votre mot de passe doit être composé uniquement de lettres et de chiffres'},
                                                minLength: {value: 6, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                                                maxLength: {value: 30, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                                            }} 
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <AvField 
                                            name="passwordConfirmation" 
                                            type="password" 
                                            placeholder="Confirmer mot de passe" 
                                            validate={{
                                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                                // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Votre mot de passe doit être composé uniquement de lettres et de chiffres'},
                                                minLength: {value: 6, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                                                maxLength: {value: 30, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                                            }} 
                                        />
                                    </div>
                                    <Button 
                                        className="btn btn-solid" 
                                        color="default"
                                        disabled={state.isLoading}
                                    >
                                        {state.isLoading ? "Veuillez patienter ..." : "Valider"}
                                    </Button>
                                </AvForm>
                            </form>
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

export default connect(mapStateToProps) (PasswordRset);