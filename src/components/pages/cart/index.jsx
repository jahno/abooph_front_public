import React, {Component} from 'react';
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'


import Breadcrumb from "components/common/breadcrumb";
import {getCartTotal} from "services";
import {removeFromCart, incrementQty, decrementQty} from 'actions'
import { PUBLIC_ROUTE } from 'constants/api';

class cartComponent extends Component {
    render (){
        const {cartItems, total} = this.props;

        return (
            <div>
                {/*SEO Support*/}
                <Helmet>
                    <title>Abooph | Panier</title>
                    <meta name="description" content="Abooph - Couture sur mesure" />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb title={'Cart Page'}/>

                {cartItems.length>0 ?
                <section className="cart-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                    <tr className="table-head">
                                        <th scope="col">image</th>
                                        <th scope="col">nom</th>
                                        <th scope="col">prix</th>
                                        <th scope="col">quantité</th>
                                        <th scope="col">action</th>
                                        <th scope="col">total</th>
                                    </tr>
                                    </thead>
                                    {cartItems.map((item, index) => {
                                        return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <Link to={`${process.env.PUBLIC_URL}/article/${item.id}`}>
                                                        <img 
                                                            src={`${PUBLIC_ROUTE}/${item.images[0].chemin}`} 
                                                            alt="" 
                                                        />
                                                    </Link>
                                                </td>
                                                <td><Link to={`${process.env.PUBLIC_URL}/article/${item.id}`}>{item.nom}</Link>
                                                    <div className="mobile-cart-content row">
                                                        <div className="col-xs-3">
                                                            <div className="qty-box">
                                                                <div className="input-group">
                                                                    <input type="text" name="quantity"
                                                                           className="form-control input-number" defaultValue={item.qty} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">{item.prix} F</h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <a href="#" className="icon" onClick={() => this.props.removeFromCart(item)}>
                                                                    <i className="icon-close"></i>
                                                                </a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><h2>{item.prix} F</h2></td>
                                                <td>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                            <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-left-minus" onClick={() => this.props.decrementQty(item.id)} data-type="minus" data-field="">
                                                                 <i className="fa fa-angle-left"></i>
                                                                </button>
                                                            </span>
                                                            <input type="text" name="quantity" value={item.qty} readOnly={true} className="form-control input-number" />

                                                            <span className="input-group-prepend">
                                                            <button className="btn quantity-right-plus" onClick={() => this.props.incrementQty(item, 1)}  data-type="plus" disabled={(item.qty >= item.stock)? true : false}>
                                                            <i className="fa fa-angle-right"></i>
                                                            </button>
                                                           </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="icon" onClick={(e) => {e.preventDefault(); this.props.removeFromCart(item)}}>
                                                        <i className="fa fa-times"></i>
                                                    </a>
                                                </td>
                                                <td><h2 className="td-color">{item.sum} F</h2></td>
                                            </tr>
                                        </tbody> )
                                    })}
                                </table>
                                <table className="table cart-table table-responsive-md">
                                    <tfoot>
                                    <tr>
                                        <td>prix total:</td>
                                        <td><h2>{total} F</h2></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div className="row cart-buttons">
                            <div className="col-6">
                                <Link to={`${process.env.PUBLIC_URL}/galerie`} className="btn btn-solid">acheter</Link>
                            </div>
                            <div className="col-6">
                                <Link to={`${process.env.PUBLIC_URL}/caisse`} className="btn btn-solid">finaliser</Link>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className="cart-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/icon-empty-cart.png`} className="img-fluid mb-4" alt="" />
                                        <h3>
                                            <strong>Votre panier est vide</strong>
                                        </h3>
                                        <h4>Aller sur la liste des articles.</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cartList.cart,
    total: getCartTotal(state.cartList.cart)
})

export default connect(
    mapStateToProps,
    {removeFromCart, incrementQty, decrementQty}
)(cartComponent)