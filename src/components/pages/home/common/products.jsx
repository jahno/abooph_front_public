import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from 'react-redux'

import {addToCart} from "actions/index";
import ProductItem from './product-item';

class SpecialProducts extends Component {
    render (){

        const {menNewProducts, womenNewProducts, childrenNewProducts, addToCart} = this.props
        return (
            <div>
                <div className="title1 section-t-space">
                    <h4>derniers articles</h4>
                    <h2 className="title-inner1">nos categories</h2>
                </div>

                <section className="section-b-space p-t-0">
                    <div className="container">
                        <Tabs className="theme-tab">
                            <TabList className="tabs tab-title">
                                <Tab>Homme</Tab>
                                <Tab>Femme</Tab>
                                <Tab>Enfant</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="no-slider row">
                                    { menNewProducts.map((product, index ) =>
                                        <ProductItem 
                                            product={product}
                                            onAddToCartClicked={() => addToCart(product, 1)} key={index} 
                                        /> )
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="no-slider row">
                                    { womenNewProducts.map((product, index ) =>
                                        <ProductItem 
                                            product={product}
                                            onAddToCartClicked={() => addToCart(product, 1)} key={index} 
                                        /> )
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className=" no-slider row">
                                    { childrenNewProducts.map((product, index ) =>
                                        <ProductItem 
                                            product={product}
                                            onAddToCartClicked={() => addToCart(product, 1)} key={index} 
                                        /> )
                                    }
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(null, {addToCart}) (SpecialProducts);