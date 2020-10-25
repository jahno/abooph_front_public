import React, { Component } from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux'

import {getTrendingCollection} from 'services/index'
import {Product4, Product5} from 'services/script'
import {addToCart} from "actions/index";
import ProductItem from './product-item';

class TopCollection extends Component {

    render (){

        const {addToCart, newProducts} = this.props;

        return (
            <div>
                {/*Paragraph*/}
                <div className="title1  section-t-space">
                    <h4>offre spéciale</h4>
                    <h2 className="title-inner1">top collection</h2>
                </div>
                {/*Paragraph End*/}
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Slider {...Product4} className="product-4 product-m no-arrow">
                                    { newProducts.map((product, index ) =>
                                        <div key={index}>
                                            <ProductItem
                                                product={product} 
                                                onAddToCartClicked={() => addToCart(product, 1)} key={index} 
                                            />
                                        </div>)
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    items: getTrendingCollection(state.data.products, ownProps.type),
})

export default connect(mapStateToProps, {addToCart}) (TopCollection);