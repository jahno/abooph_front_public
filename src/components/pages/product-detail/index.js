import React, {useState, useEffect, useRef} from 'react';
import {Helmet} from 'react-helmet'
import Slider from 'react-slick';
import 'components/common/index.scss';
import {connect} from "react-redux";

// import custom Components
// import Service from "./common/service";
import NewProduct from "components/common/new-product";
import Breadcrumb from "components/common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
// import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToWishlist } from 'actions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'
import Loading from 'components/common/loading';
import { handleFetch } from 'helpers';
import { product } from 'constants/urls';


function ProductSeatil(props) {
    const { addToCart, addToCartUnsafe, match: {params}  } = props;

    const [state, setState] = useState({
        isLoading: true, 
        product: {},
        open:false,
        nav1: null,
        nav2: null
    })

    const slider1 = useRef()
    const slider2 = useRef()

    useEffect(() => {
        if(params.id){
            const { method, url } = product
            handleFetch(method, url(params.id), 
                (response) => setState(state => ({...state, isLoading: false, product: response})),
                () => setState(state => ({...state, isLoading: false}))
            )
        }
    }, [params.id])

    useEffect(() => {
        setState(state => ({
            ...state,
            nav1: slider1.current,
            nav2: slider2.current
        }))
    }, [])

    // document.getElementById('idOfElement').classList.add('newClassName');


    function filterClick() {
        document.getElementById("filter").style.left = "-15px";
    }

    function backClick() {
        document.getElementById("filter").style.left = "-365px";
    }
    
    if(state.isLoading) return <Loading/>

    var products = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        fade: true
    };
    var productsnav = {
        slidesToShow: 3,
        swipeToSlide:true,
        arrows: false,
        dots: false,
        focusOnSelect: true
    };

    return (
        <div>
            {/*SEO Support*/}
            <Helmet>
                <title>Abooph | {state.product.nom}</title>
                <meta name="description" content="Abooph couture." />
            </Helmet>
            {/*SEO Support End */}

            <Breadcrumb  parent={'Article'} title={state.product.nom} />

            {/*Section Start*/}
            {(state.product)?
            <section className="section-b-space">
                <div className="collection-wrapper">
                    <div className="container">
                        <div className="row">

                            <div className="col-sm-3 collection-filter" id="filter">
                                <div  className="collection-mobile-back pl-5">
                                    <span onClick={backClick}  className="filter-back">
                                        <i className="fa fa-angle-left" aria-hidden="true"></i> retour
                                    </span>
                                </div>
                                <br/><br/>

                                {/* <BrandBlock/> */}
                                {/* <Service/> */}
                                {/*side-bar single product slider start*/}
                                <NewProduct/>
                                {/*side-bar single product slider end*/}
                            </div>
                            <div className="col-lg-9 col-sm-12 col-xs-12">
                                <div className="">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="filter-main-btn mb-2">
                                                <span onClick={filterClick}  className="filter-btn" >
                                                    <i className="fa fa-filter" aria-hidden="true"></i> derniers articles</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 product-thumbnail">
                                            <Slider {...products} asNavFor={state.nav2} ref={slider1} className="product-slick">
                                                {state.product.images.map(image =>
                                                    <div key={image.id}>
                                                        <ImageZoom image={image} />
                                                    </div>
                                                )}
                                            </Slider>
                                            {/* {state.product.images.length > 1 && <SmallImages item={state.product} settings={productsnav} navOne={state.nav1} />} */}
                                        </div>
                                        <DetailsWithPrice item={state.product} navOne={state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe}/>
                                    </div>
                                </div>
                                {/* <DetailsTopTabs item={state.product} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section> : ''}
            {/*Section End*/}
        </div>
    )
}

export default connect(null, {addToCart, addToCartUnsafe, addToWishlist})(ProductSeatil);