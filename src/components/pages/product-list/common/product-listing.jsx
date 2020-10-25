import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


import { addToCart  } from 'actions'
import ProductListItem from "./product-list-item";

function ProductListing(props){
    const { products, addToCart, colSize } = props

    const [state, setState] = useState({
        limit: 5, 
        hasMoreItems: true
    })

    useEffect(() => {
        fetchMoreItems();
    }, [products])

    const fetchMoreItems = () => {
        if(state.limit >= products.length){
            setState(state =>({...state, hasMoreItems: false }));
            return;
        }
        
        setTimeout(() => {
            setState(state => ({
                ...state,
                limit: state.limit + 5
            }));
        }, 1000);
    }

    return (
        <div>
            <div className="product-wrapper-grid">
                <div className="container-fluid">
                    {products.length > 0 ?
                        <InfiniteScroll
                            dataLength={state.limit} //This is important field to render the next data
                            next={fetchMoreItems}
                            hasMore={state.hasMoreItems}
                            loader={<div className="loading-cls"></div>}
                            endMessage={
                                <p className="seen-cls seen-it-cls">
                                    <b>Yay! Vous avez tout vu</b>
                                </p>
                            }
                        >
                            <div className="row">
                                { products.slice(0, state.limit).map((product, index) =>
                                    <div className={`${colSize===3?'col-xl-3 col-md-6 col-grid-box':'col-lg-'+colSize}`} key={index}>
                                    
                                    <ProductListItem 
                                        product={product}
                                        onAddToCartClicked={() => addToCart(product, 1)} key={index} 
                                        key={index}
                                    />
                                    </div>)
                                }
                            </div>
                        </InfiniteScroll>
                        :
                        <div className="row">
                            <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
                                <h3>Désolé! Impossible de trouver les articles que vous cherchiez !!!    </h3>
                                <p>Veuillez vérifier si vous avez mal orthographié quelque chose ou essayez de chercher avec d'autres mots.</p>
                                <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">Continuer vos achats</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default connect( null, {addToCart})(ProductListing)