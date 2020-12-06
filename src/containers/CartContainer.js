import React from 'react';

import NumberFormat from 'react-number-format'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import CartPage from 'components/common/headers/common/cart-header'
import {removeFromCart} from 'actions'
import {getCartTotal} from 'services'


const CartContainer = ({cartList, total, removeFromCart}) => (
     <li  className="onhover-div mobile-cart"><div className="cart-qty-cls">{cartList.length}</div>
        <Link to={`${process.env.PUBLIC_URL}/cart`}><img width={23} height={23} src={`${process.env.PUBLIC_URL}/assets/images/icon/cart2.png`} className="img-fluid" alt=""/>
            <i className="fa fa-shopping-cart" style={{fontSize: 25}}></i></Link>
        <ul className="show-div shopping-cart">
            { cartList.map((item,index) => (
                <CartPage key={index} item={item} total={total} removeFromCart={() => removeFromCart(item)}  />
            ))}
            {(cartList.length > 0) ?
                <div>
            <li>
                <div className="total">
                    <h5>total : <span><NumberFormat value={total} displayType={"text"} thousandSeparator={" "}/></span></h5>
                </div>
            </li>
            <li>
                <div className="buttons">
                    <Link to={`${process.env.PUBLIC_URL}/cart`} className="view-cart">panier</Link>
                    <Link to={`${process.env.PUBLIC_URL}/caisse`} className="checkout">finaliser</Link>
                </div>
            </li></div>
                    :
            <li><h5>Votre panier est vide.</h5></li>}
        </ul>

    </li>
)


function mapStateToProps(state) {
    return {
        cartList: state.cartList.cart,
        total: getCartTotal(state.cartList.cart),
    }
}

export default connect(mapStateToProps, {removeFromCart})(CartContainer);
