import React, {Component, useState} from 'react';

import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { toast  } from 'react-toastify';

import { sendMessage } from 'services/api'
import Breadcrumb from "../common/breadcrumb";

class Contact extends Component {

    constructor (props) {
        super (props)
    }

    render (){
        return (
            <div>
                <Breadcrumb title={'Contactez Nous'}/>
                
                
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row section-b-space">
                            <div className="col-lg-7 map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50059.12775918716!2d72.78534673554945!3d21.16564923510817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1533793756956"
                                    allowFullScreen></iframe>
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-right">
                                    <ul>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/phone.png`} alt="Generic placeholder image" />
                                                    <h6>Contact</h6>
                                            </div>
                                            <div className="media-body">
                                                {/* <p>+225 08 74 59 49</p> */}
                                                <p>+225 08 74 59 49</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <h6>Adresse</h6>
                                            </div>
                                            <div className="media-body">
                                                {/* <p>ABC Complex,Near xyz, New York</p> */}
                                                <p>2 Plateau</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/email.png`} alt="Generic placeholder image" />
                                                    <h6>Email</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>abooph@gmail.Com</p>
                                                {/* <p>info@shopcart.com</p> */}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-fax" aria-hidden="true"></i>
                                                <h6>Fixe</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>21202452</p>
                                                {/* <p>info@shopcart.com</p> */}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <ContactForm/>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

function ContactForm(){
    const [isLoading, setIsLoading ] = useState(false)

    // function handleChange(e){
    //     const {value} = e.target
    //     setState(state => ({...state, value}))
    // }

    function handleValidSubmit(e, values){
       setIsLoading(true)

       sendMessage(values, (res) => {
            toast.success(res.msg)
            setIsLoading(false)
        }, (e) => {
            toast.error("Une erreur s'est produite, veuillez réessayer")
            setIsLoading(false)
        }) 
    }

    return(
        <AvForm className="theme-form" onValidSubmit={handleValidSubmit}>
            <div className="form-row">
                <div className="col-md-6">
                    <AvField 
                        className="form-control"
                        label="Votre nom"
                        name="nom" 
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
                        className="form-control"
                        label="Votre prénom"
                        name="prenom" 
                        type="text" 
                        placeholder="Votre prénom" 
                        validate={{
                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre prénom'},
                            maxLength: {value: 50, errorMessage: "Votre prénom est trop long"}
                        }} 
                    />
                </div>
                <div className="col-md-6">
                    <AvField 
                        className="form-control"
                        label="Téléphone"
                        name="tel" 
                        type="text" 
                        placeholder="Votre téléphone" 
                        validate={{
                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre numéro de téléphone'},
                            pattern: {value: '^[0-9]{8}$', errorMessage: "Numéro invalide"},
                        }} 
                    />
                </div>
                <div className="col-md-6">
                    <AvField 
                        className="form-control"
                        label="Votre email"
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
                <div className="col-md-12">
                    <AvField 
                        className="form-control"
                        label="Votre message"
                        name="message" 
                        type="textarea" 
                        placeholder="Votre message" 
                        validate={{
                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre message'},
                        }} 
                    />
                </div>
                <div className="col-md-12">
                    <Button 
                        className="btn btn-solid" 
                        color="default"
                        disabled={isLoading}
                    >
                        {isLoading ? "Veuillez patienter ..." : "Envoyer"}
                    </Button>

                    {/* <button className="btn btn-solid" type="submit">Envoyer</button> */}
                </div>
            </div>
        </AvForm>
    )
}

export default Contact