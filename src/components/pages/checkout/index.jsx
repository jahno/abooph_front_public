import React, { useEffect, useState} from 'react';

import {Helmet} from 'react-helmet'
import { connect } from 'react-redux'
import { AvField, AvForm  } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';

import Breadcrumb from "components/common/breadcrumb";
import {removeFromWishlist, initCart} from 'actions'
import {getCartTotal} from "services";
import {getOrderDetail, getShipping} from "services/api";
import {handleFetch} from 'helpers';
import { order } from 'constants/urls';
import { useHistory } from 'react-router-dom';

const initialState = {
    shipping: 0,
    isLoading: false,
    defaultValues: {
        lastName: '',
        firstName: '',
        tel: '',
        email: '',
        city: '',
        address: '',
        addressShipping: ''
    }
}

function CheckOut(props){
    const { cartItems, total, auth, initCart } = props
    const history = useHistory()

    const [state, setState] = useState(() => {
        let defaultValues = {...initialState.defaultValues}

        if(auth.isAuthenticated){
            defaultValues = {
                ...defaultValues,
                lastName: auth.user.nom,
                firstName: auth.user.prenom,
                tel: auth.user.numero,
                email: auth.user.email,
                city: auth.user.ville,
                address: auth.user.Adresse_geographique
            }
        }

        return {...initialState, defaultValues, shippingPrices: {}}
    })

    useEffect(() => {
        getShipping((res) => {
            setState(state => ({...state, shippingPrices: res }));
        })
    }, [])

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
                adresse: values.addressShipping,
                nom:values.lastName,
                livraison: state.shipping,
                prenom:values.firstName,
                Adresse_geographique:values.address,
                numero:values.tel,
                ville:values.city,
                articles: cartItems.map(item => ({id: item.id, qte: item.qty})),
                pays:"Côte d'ivoire",
                paiement: 'cash',
                commune: 'Cocody',
                note: ''
            };

            const { method, url } = order
            handleFetch(method, url(), 
                (response) => {
                    toast.success(response.msg, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: false
                    });
                    // setState(state => ({...state, isLoading: false, newProducts: response.results}))
                    initCart()

                    getOrderDetail(response.commande, response => {
                        history.push('/commande-envoyee', {order: response})
                    })
                },
                () => setState(state => ({...state, isLoading: false})),
                data
            )
        }
    };

    function onChangeShippingValue(event) {
        const shipping = event.target.value
        setState(state => ({...state, shipping}))
    }

    return (
        <div>

            {/*SEO Support*/}
            <Helmet>
                <title>Abooph | caisse</title>
                <meta name="description" content="Abooph - Couture sur mesure" />
            </Helmet>
            {/*SEO Support End */}

            <Breadcrumb  title={'Caisse'}/>

            <section className="section-b-space">
                <div className="container padding-cls">
                    <div className="checkout-page">
                        <div className="checkout-form">
                        
                            <AvForm className="theme-form" onValidSubmit={handleValidSubmit} model={state.defaultValues}>
                                <form>
                                    <div className="checkout row">
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            {/* <div className="checkout-title">
                                                <h3>Détail de la caisse</h3>
                                            </div> */}
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-12 col-xs-12">
                                                    <div className="field-label">Nom</div>
                                                    <AvField 
                                                        name="lastName" 
                                                        type="text" 
                                                        disabled={auth.isAuthenticated}
                                                        placeholder="Votre nom" 
                                                        validate={{
                                                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre nom'},
                                                            maxLength: {value: 50, errorMessage: "Votre nom est trop long"}
                                                        }} 
                                                    />
                                                </div>
                                                <div className="form-group col-md-6 col-sm-12 col-xs-12">
                                                    <div className="field-label">Prénom</div>
                                                    <AvField 
                                                        name="firstName" 
                                                        type="text" 
                                                        disabled={auth.isAuthenticated}
                                                        placeholder="Votre prénom" 
                                                        validate={{
                                                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre prénom'},
                                                            maxLength: {value: 50, errorMessage: "Votre prénom est trop long"}
                                                        }} 
                                                    />
                                                </div>
                                                <div className="form-group col-md-6 col-sm-12 col-xs-12">
                                                    <div className="field-label">Téléphone</div>
                                                    <AvField 
                                                        name="tel" 
                                                        type="text" 
                                                        disabled={auth.isAuthenticated}
                                                        placeholder="Votre téléphone" 
                                                        validate={{
                                                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre numéro de téléphone'},
                                                            // pattern: {value: '^[0-9]{8}$', errorMessage: "Numéro invalide"},
                                                        }} 
                                                    />
                                                </div>
                                                <div className="form-group col-md-6 col-sm-12 col-xs-12">
                                                    <div className="field-label">Email</div>
                                                    <AvField 
                                                        name="email" 
                                                        type="email" 
                                                        disabled={auth.isAuthenticated}
                                                        placeholder="Votre email" 
                                                        validate={{
                                                            email: {value: true, errorMessage: "Votre email est invalide"},
                                                            minLength: {value: 10, errorMessage: "Votre email est invalide"},
                                                            maxLength: {value: 30, errorMessage: "Votre email est invalide"}
                                                        }} 
                                                    />
                                                </div>
                                                {!auth.isAuthenticated && 
                                                <>
                                                <div className="form-group col-md-6 col-sm-12 col-xs-12">
                                                    <div className="field-label">Mot de passe</div>
                                                    <AvField 
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
                                                <div className="form-group col-md-6 col-sm-12 col-xs-12">
                                                    <div className="field-label">Confirmer mot de passe</div>
                                                    <AvField 
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
                                                </>
                                                }
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Ville</div>
                                                    <AvField 
                                                        name="city" 
                                                        type="select" 
                                                        disabled={auth.isAuthenticated}
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
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Adresse</div>
                                                    <AvField 
                                                        name="address" 
                                                        type="textarea" 
                                                        disabled={auth.isAuthenticated}
                                                        placeholder="Votre adresse" 
                                                        validate={{
                                                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre adresse'},
                                                            // maxLength: {value: 50, errorMessage: "Votre prénom est trop long"}
                                                        }} 
                                                    />
                                                </div>

                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Lieu de livraison</div>
                                                    <AvField 
                                                        name="addressShipping" 
                                                        type="textarea" 
                                                        placeholder="Votre lieu de livraison" 
                                                        validate={{
                                                            required: {value: true, errorMessage: 'Svp veuillez renseigner votre lieu de livraison'},
                                                            // maxLength: {value: 50, errorMessage: "Votre lieu de livraison est trop long"}
                                                        }} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-title">
                                                <h3>Détail de la caisse</h3>
                                            </div>
                                            <div className="checkout-details">
                                                

                                                <div className="order-box">
                                                    <div className="title-box">
                                                        <div>Article <span> Total</span></div>
                                                    </div>
                                                    <ul className="qty">
                                                        {cartItems.map((item, index) => {
                                                            return <li key={index}>{item.nom} × {item.qty} <span>{item.sum} F</span></li> })
                                                        }
                                                    </ul>
                                                    <ul className="sub-total">
                                                        <li>Sous-total <span className="count">{total} F</span></li>
                                                        <li>livraison 
                                                            <div className="shipping" onChange={onChangeShippingValue}>
                                                                <div className="shopping-option">
                                                                    <input checked={state.shipping == state.shippingPrices.prix_standard} type="radio" name="shipping" id="standard-shipping" value={state.shippingPrices.prix_standard} style={{cursor: 'pointer'}}/>
                                                                        <label htmlFor="standard-shipping" style={{cursor: 'pointer'}}>Standard ({state.shippingPrices.prix_standard})</label>
                                                                </div>
                                                                <div className="shopping-option">
                                                                    <input checked={state.shipping == state.shippingPrices.prix_express} type="radio" name="shipping" id="express-shipping" value={state.shippingPrices.prix_express} style={{cursor: 'pointer'}}/>
                                                                        <label htmlFor="express-shipping" style={{cursor: 'pointer'}}>Express ({state.shippingPrices.prix_express})</label>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>

                                                    <ul className="total">
                                                        <li>Total <span className="count">{total + parseInt(state.shipping)} F</span></li>
                                                    </ul>
                                                </div>

                                                <div className="payment-box">
                                                    <div className="text-right">
                                                        {/* <button type="button" className="btn-solid btn">Commander</button> */}
                                                        <Button 
                                                            className="btn btn-solid" 
                                                            color="default"
                                                            disabled={state.isLoading}
                                                        >
                                                            {state.isLoading ? "Veuillez patienter ..." : "Commander"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*
                                    <div className="row section-t-space">
                                        <div className="col-lg-6">
                                            <div className="stripe-section">
                                                <h5>stripe js example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4242424242424242</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>2/2020</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>2222</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 m-sm-t-2">
                                            <div className="stripe-section">
                                                <h5>paypal example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4152521541244</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>11/18</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>521</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    */}
                                </form>
                            </AvForm>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: state.cartList.cart,
    // symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart),
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {removeFromWishlist, initCart}
)(CheckOut)