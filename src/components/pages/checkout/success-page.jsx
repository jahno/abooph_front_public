import React from 'react';

import NumberFormat from 'react-number-format'

import { PUBLIC_ROUTE } from 'constants/api';


function OrderSuccess(props){

    const { transactionId, cartItems, total, shipping } = props

    return (
        (true)?
        <div>
            <section className="section-b-space light-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="success-text">
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                                <h2>Merci</h2>
                                <p>La commande a été passée avec succès</p>
                                <p>ID de transaction : {transactionId}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product-order">
                                <h4>Les détails de votre commande</h4>
                                {cartItems.map((item, index) => {
                                    return (
                                        <div className="row product-order-detail" key={index}>
                                            <div className="col-3">
                                                <img src={`${PUBLIC_ROUTE}/${item.images[0].chemin}`} alt="" className="img-fluid" />
                                            </div>
                                            <div className="col-3 order_detail">
                                                <div>
                                                    <h4>Nom du produit</h4>
                                                    <h5>{item.nom}</h5>
                                                </div>
                                            </div>
                                            <div className="col-3 order_detail">
                                                <div>
                                                    <h4>quantité</h4>
                                                    <h5>{item.qty}</h5>
                                                </div>
                                            </div>
                                            <div className="col-3 order_detail">
                                                <div>
                                                    <h4>prix</h4>
                                                    <h5><NumberFormat value={item.prix} displayType={"text"} thousandSeparator={" "}/> F</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="total-sec">
                                    <ul>
                                        <li>Sous-total <span><NumberFormat value={total} displayType={"text"} thousandSeparator={" "}/></span></li>
                                        <li>livraison <span><NumberFormat value={shipping} displayType={"text"} thousandSeparator={" "}/></span></li>
                                    </ul>
                                </div>
                                <div className="final-total">
                                    <h3>total <span><NumberFormat value={total + parseInt(shipping)} displayType={"text"} thousandSeparator={" "}/> </span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row order-success-sec">
                                <div className="col-sm-6">
                                    <h4>Adresse de livraison</h4>
                                    <ul className="order-detail">
                                        <li>gerg harvell</li>
                                        <li>568, suite ave.</li>
                                        <li>Austrlia, 235153</li>
                                        <li>Contact No. 987456321</li>
                                    </ul>
                                </div>

                                <div className="col-sm-12 payment-mode">
                                    <br/>

                                    <h4>Mode de payement</h4>
                                    <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net
                                        banking acceptance subject to device availability.</p>
                                </div>
                                <div className="col-md-12">
                                    <div className="delivery-sec">
                                        <h3>Date de livraison</h3>
                                        <h2>30/12/2020</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
        :
        <section className="p-0">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="error-section">
                            <h1>404</h1>
                            <h2>Page non trouvée</h2>
                            <a href="/" className="btn btn-solid">de retour à la page d'accueil</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderSuccess