import React, {useState}  from 'react';
import {connect} from "react-redux";
import { Button } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Redirect, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import Breadcrumb from "../common/breadcrumb";

import {handleFetch} from '../../helpers';
import { signIn as signInUser } from 'actions'
import { register } from 'constants/urls';

const initialState = {
    isLoading: false,
    cities: []
};

function RegisterForm({signInUser}){
    const [state, setState] = useState(initialState)

    function handleValidSubmit(event, values){
        if(values.password !== values.passwordConfirmation){
            const message = "Les mots de passe ne sont pas identiques !"
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false
            });
        }else{
            setState(state => ({...state, isLoading: true }));

            const data = {
                ...values,
                "nom":values.lastName,
                "prenom":values.firstName,
                "Adresse_geographique":values.address,
                "numero":values.tel,
                "pays":"Côte d'ivoire",
                "ville":values.city,
            };

            const { method, url } = register
            handleFetch(method, url(), 
                signInUser,
                () => setState(state => ({...state, isLoading: false})),
                data
            )
        }
    };

    return(
        <div className="theme-card">
            <AvForm className="theme-form" onValidSubmit={handleValidSubmit}>
                <div className="form-row">
                    <div className="col-md-6">
                        <AvField 
                            label="NOM"
                            name="lastName" 
                            type="text" 
                            placeholder="Votre nom" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre nom'},
                                maxLength: {value: 50, errorMessage: "Votre nom est trop long"}
                            }} 
                        />
                    </div>
                    <div className="col-md-6">
                        <AvField 
                            label="PRENOM"
                            name="firstName" 
                            type="text" 
                            placeholder="Votre prénom" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre prénom'},
                                maxLength: {value: 50, errorMessage: "Votre prénom est trop long"}
                            }} 
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6">
                        <AvField 
                            label="EMAIL"
                            name="email" 
                            type="email" 
                            placeholder="Votre email" 
                            validate={{
                                email: {value: true, errorMessage: "Votre email est invalide"},
                                minLength: {value: 10, errorMessage: "Votre email est invalide"},
                                maxLength: {value: 30, errorMessage: "Votre email est invalide"}
                            }} 
                        />
                    </div>
                    <div className="col-md-6">
                        <AvField 
                            label="TELEPHONE"
                            name="tel" 
                            type="text" 
                            placeholder="Votre téléphone" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre numéro de téléphone'},
                                pattern: {value: '^[0-9]{8}$', errorMessage: "Numéro invalide"},
                            }} 
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6">
                        <AvField 
                            label="MOT DE PASSE"
                            name="password" 
                            type="password" 
                            placeholder="Votre mot de passe" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: "Caractère non autorisé"},
                                minLength: {value: 6, errorMessage: "Votre mot de passe doit être entre 6 et 16 caractères"},
                                maxLength: {value: 16, errorMessage: "Votre mot de passe doit être entre 6 et 16 caractères"}
                            }} 
                        />
                    </div>
                    <div className="col-md-6">
                        <AvField 
                            label="CONFIRMER MOT DE PASSE"
                            name="passwordConfirmation" 
                            type="password" 
                            placeholder="Confirmer votre mot de passe" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: "Caractère non autorisé"},
                                minLength: {value: 6, errorMessage: "Votre mot de passe doit être entre 6 et 16 caractères"},
                                maxLength: {value: 16, errorMessage: "Votre mot de passe doit être entre 6 et 16 caractères"}
                            }} 
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                        <AvField 
                            label="Ville"
                            name="city" 
                            type="select" 
                            placeholder="Votre ville" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre adresse'},
                                maxLength: {value: 50, errorMessage: "Votre prénom est trop long"}
                            }} 
                        >
                            <option>Abidjan</option>
                            <option>Yamoussoukro</option>
                            <option>Daloa</option>
                            <option>Bouaké</option>
                            <option>San-Pedro</option>
                        </AvField>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                        <AvField 
                            label="ADRESSE"
                            name="address" 
                            type="textarea" 
                            placeholder="Votre adresse" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre adresse'},
                                maxLength: {value: 50, errorMessage: "Votre prénom est trop long"}
                            }} 
                        />
                    </div>
                </div>
                <div className="form-row">
                    <Button 
                        className="btn btn-solid" 
                        color="default"
                        disabled={state.isLoading}
                    >
                        {state.isLoading ? "Veuillez patienter ..." : "S'inscrire"}
                    </Button>
                </div>
            </AvForm>
        </div>
    )
}

function Register({signInUser, isAuthenticated}){
    const location = useLocation()

    const {from} = location.state || {from: {pathname: "/mon-compte"}};

    if(isAuthenticated){
        return <Redirect to={from}/>;
    } 

    return (
        <div>
            <Breadcrumb title={'créer compte'}/>
            
            {/*Regsiter section*/}
            <section className="register-page section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>création de compte</h3>
                            <RegisterForm signInUser={signInUser} />
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

export default connect(mapStateToProps, {signInUser}) (Register);
