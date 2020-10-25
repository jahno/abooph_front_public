import React, { useState } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import {connect} from "react-redux";
import { Redirect, useLocation } from 'react-router-dom';

import Breadcrumb from "../common/breadcrumb";
import { toast } from 'react-toastify';

import {handleFetch} from '../../helpers';
import { passwordEmail } from '../../services/auth'

const initialState = {
    isLoading: false,
};

function ForgetPassword({isAuthenticated}) {
    const [state, setState] = useState(initialState)
    const location = useLocation()

    const {from} = location.state || {from: {pathname: "/mon-compte"}};

    if(isAuthenticated){
        return <Redirect to={from}/>;
    } 

    function handleValidSubmit(event, values){
        setState(state => ({...state, isLoading: true }));
        
        handleFetch(passwordEmail, {email: values.email}, 
            (res) => {
                toast.success(res.msg, {autoClose: false});
                setState(state => ({...state, isLoading: false }));
            },
            () => {
                setState(state => ({...state, isLoading: false }));
            }
        )
    }

    return (
        <div>
            <Breadcrumb title={'mot de passe oubllie'}/>
            
            {/*Forget Password section*/}
            <section className="pwd-page section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <h2>Mot de passe oublie</h2>
                            <form className="theme-form">
                                <AvForm onValidSubmit={handleValidSubmit} className="form-row">
                                    <div className="col-md-12">
                                        <AvField 
                                            name="email" 
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

export default connect(mapStateToProps) (ForgetPassword);