import React from 'react';
import {Link} from 'react-router-dom'
import { PUBLIC_ROUTE } from 'constants/api';

const CartHeader  = ({item, removeFromCart}) => (
    <li >
        <div className="media">
            <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}><img alt="" className="mr-3" src={`${PUBLIC_ROUTE}/${item.images[0].chemin}`} /></Link>
            <div className="media-body">
                <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}><h4>{item.nom}</h4></Link>
                <h4><span>{item.qty} x {(item.prix)}</span></h4>
            </div>
        </div>
        <div className="close-circle">
            <a href={null} onClick={ removeFromCart}><i className="fa fa-times" aria-hidden="true"></i></a>
        </div>
    </li>
)

export default CartHeader;
