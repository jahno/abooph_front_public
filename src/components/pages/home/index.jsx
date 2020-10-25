import React, { useEffect, useState } from 'react';
import {Helmet} from 'react-helmet'
import 'components/common/index.scss';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';

// Import custom components
import TopCollection from './common/top-collection';
import SpecialProducts from "./common/products";
// import LogoBlock from "./common/logo-block";
import { handleFetch } from 'helpers';
import { last_articles, category_last_articles } from 'constants/urls';
import Loading from 'components/common/loading';


function Fashion(){
    const [state, setState] = useState({
        isLoading: true, 
        newProducts: [],
        menNewProducts: [],
        womenNewProducts: [],
        childrenNewProducts: [],
    })

    useEffect(() => {
        document.getElementById("color").setAttribute("href", `#` );
    }, [])

    useEffect(() => {
        const { method, url } = last_articles
        handleFetch(method, url(), 
            (response) => setState(state => ({...state, isLoading: false, newProducts: response.results})),
            () => setState(state => ({...state, isLoading: false}))
        )
    }, [])

    useEffect(() => {
        const { method, url } = category_last_articles
        handleFetch(method, url("homme"), (response) => {
            setState(state => ({...state, menNewProducts: response.results}))
        })
    }, [])

    useEffect(() => {
        const { method, url } = category_last_articles
        handleFetch(method, url("femme"), (response) => {
            setState(state => ({...state, womenNewProducts: response.results}))
        })
    }, [])

    useEffect(() => {
        const { method, url } = category_last_articles
        handleFetch(method, url("enfant"), (response) => {
            setState(state => ({...state, childrenNewProducts: response.results}))
        })
    }, [])

    if(state.isLoading) return <Loading/>

    return (
        <div>
            <Helmet>
                <title>Abooph - Couture sur mesure</title>
                <meta name="description" content="Abooph - Couture sur mesure" />
            </Helmet>
            {/*Home Slider*/}
            <section className="p-0">
                <Slider  className="slide-1 home-slider">
                    <div>
                        <div className="home home1 text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="slider-contain">
                                            <div>
                                                <h4>bienvenue sur Abooph</h4>
                                                <h1>couture sur mesure</h1>
                                                {/* <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop now</Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="home home2 text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="slider-contain">
                                            <div>
                                                <h4>bienvenue sur Abooph</h4>
                                                <h1>couture sur mesure</h1>
                                                {/* <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop now</Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </section>
            {/*Home Section End*/}

            {/*collection banner*/}
            <section className="pb-0">
                <div className="container">
                    <div className="row partition2">
                        <div className="col-md-4">
                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                <div className="collection-banner p-right text-center">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner1.jpg`} className="img-fluid" alt=""/>
                                        <div className="contain-banner">
                                            <div>
                                                <h4>30% reduction</h4>
                                                <h2>homme</h2>
                                            </div>
                                        </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                <div className="collection-banner p-right text-center">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner2.jpg`} className="img-fluid" alt=""/>
                                        <div className="contain-banner">
                                            <div>
                                                <h4>60% reduction</h4>
                                                <h2>femme</h2>
                                            </div>
                                        </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                <div className="collection-banner p-right text-center">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner2.jpg`} className="img-fluid" alt=""/>
                                        <div className="contain-banner">
                                            <div>
                                                <h4>60% reduction</h4>
                                                <h2>enfant</h2>
                                            </div>
                                        </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/*collection banner end*/}

            <TopCollection newProducts={state.newProducts}/>

            {/*Parallax banner*/}
            <section className="p-0">
                <div className="full-banner parallax-banner1 parallax text-center p-left">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="banner-contain">
                                    {/* <h2>2020</h2>
                                    <h3>fashion trends</h3>
                                    <h4>special offer</h4> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Parallax banner End*/}

            <SpecialProducts 
                menNewProducts={state.menNewProducts}
                womenNewProducts={state.womenNewProducts}
                childrenNewProducts={state.childrenNewProducts}
            />

            {/*logo section*/}
            {/* <LogoBlock /> */}
            {/*logo section end*/}

        </div>
    )
}

export default Fashion;