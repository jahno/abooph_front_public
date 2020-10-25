import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom'

import { handleFetch } from 'helpers';
import { last_articles } from 'constants/urls';
import { PUBLIC_ROUTE } from 'constants/api';

function NewProduct(){

    const [state, setState] = useState({
        newProducts: []
    })

    useEffect(() => {
        const { method, url } = last_articles
        handleFetch(method, url(), (response) => {
            setState(state => ({...state, newProducts: response.results}))
        })
    }, [])

    var arrays = [];
    while (state.newProducts.length > 0) {
        arrays.push(state.newProducts.splice(0, 3));
    }

    return (
        <div className="theme-card">
            <h5 className="title-border">derniers articles</h5>
            <Slider className="offer-slider slide-1">
                {arrays.map((products, index) =>
                    <div key={index}>
                        {products.map((product, i) =>
                            <div className="media" key={i}>
                                <Link to={`${process.env.PUBLIC_URL}/article/${product.id}`}><img className="img-fluid" src={`${PUBLIC_ROUTE}/${product.images[0].chemin}`} alt="" /></Link>
                                <div className="media-body align-self-center">
                                    <div className="rating">
                                        <i className="fa fa-star"></i> 
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                    <Link to={`${process.env.PUBLIC_URL}/article/${product.id}`}><h6>{product.nom}</h6></Link>
                                    <h4>{(product.prix)} F
                                        <del><span className="money">{product.prix} F</span></del></h4>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Slider>
        </div>
    )
}

export default NewProduct;
