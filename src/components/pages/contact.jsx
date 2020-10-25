import React, {Component} from 'react';
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
                                                <p>+225 08 74 59 49</p>
                                                <p>+225 08 74 59 49</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <h6>Address</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>ABC Complex,Near xyz, New York</p>
                                                <p>USA 123456</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/email.png`} alt="Generic placeholder image" />
                                                    <h6>Adresse</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Support@Shopcart.com</p>
                                                <p>info@shopcart.com</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-fax" aria-hidden="true"></i>
                                                <h6>Fax</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Support@Shopcart.com</p>
                                                <p>info@shopcart.com</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">Votre nom</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Votre nom" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Votre prénom</label>
                                            <input type="text" className="form-control" id="last-name"
                                                   placeholder="Votre prénom" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="review">Votre numero de téléphone</label>
                                            <input type="text" className="form-control" id="review"
                                                   placeholder="Votre numero de téléphone" required="" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                                   required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Votre Message</label>
                                            <textarea className="form-control" placeholder="Votre Message"
                                                      id="exampleFormControlTextarea1" rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Envoyer</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Contact