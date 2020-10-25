import React, {useEffect, useState, useRef} from 'react';
import {Helmet} from 'react-helmet'
import StickyBox from "react-sticky-box";

import Breadcrumb from "components/common/breadcrumb";
import NewProduct from "components/common/new-product";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import { all_products, categories, product } from 'constants/urls';
import Loading from 'components/common/loading';


export default function ProductList(props){
    const { history: {location} } = props;
    const maxPriceRef = useRef(0)
    const minPriceRef = useRef(0)

    const [state, setState] = useState({
        layoutColumns:3, 
        isLoading: true, 
        categories: [],
        allProducts: [],
        filteredProducts: [],
        currentParentCategory: {},
        currentChildCategories: [],
        maxPrice: 0,
        minPrice: 0
    })

    useEffect(() => {
        getAllProducts().then(response => {
            let maxPrice = maxPriceRef.current = parseInt(response[1].results[0].prix)
            let minPrice = minPriceRef.current = parseInt(response[1].results[0].prix)

            for(let product of response[1].results){
                if(parseInt(product.prix) > maxPrice){
                    maxPrice = maxPriceRef.current = parseInt(product.prix)
                }

                if(parseInt(product.prix) < minPrice){
                    minPrice = minPriceRef.current = parseInt(product.prix)
                }
            }

            setState(state => ({
                ...state, 
                isLoading: false, 
                categories: response[0].results,
                allProducts: response[1].results,
                filteredProducts: response[1].results,
                maxPrice, minPrice
            }))
        });
    }, [])

    useEffect(() => {
        if(location.state && state.categories.findIndex(cat => location.state.toLowerCase() == cat.nom.toLowerCase()) != -1){
            if(!state.currentParentCategory.nom || location.state.toLowerCase() != state.currentParentCategory.nom.toLowerCase()){

                const currentParentCategory = state.categories.filter(cat => !cat.parent_id && (location.state.toLowerCase() == cat.nom.toLowerCase()))[0]
              
                setState(state => ({
                    ...state, 
                    currentParentCategory,
                    currentChildCategories: [],
                    filteredProducts: state.allProducts.filter(product => product.categories.findIndex(cat => !cat.parent_id && (cat.id == currentParentCategory.id)) != -1)
                }))
            }
        }else{
            setState(state => ({
                ...state, 
                currentParentCategory: {}, 
                filteredProducts: state.allProducts,
                currentChildCategories: []
            }))
        }
    }, [location.state, state.categories])

    function selectParentCategory(category){
        if(category.id !== state.currentParentCategory.id){
            setState(state => ({
                ...state, 
                minPrice: minPriceRef.current, 
                maxPrice: maxPriceRef.current,
                currentParentCategory: category,
                currentChildCategories: [],
                filteredProducts: state.allProducts.filter(product => product.categories.findIndex(cat => category.id == cat.id) != -1)
            }))
        }
    }

    function selectChildCategories(category){
        setState(state => {
            if(category.parent_id != state.currentParentCategory.id) return state;

            let categories = []

            if(state.currentChildCategories.findIndex(cat => category.id == cat.id) != -1){
                categories = state.currentChildCategories.filter(cat => category.id != cat.id)
            }else{
                categories = [...state.currentChildCategories, category]
            }

            return {
                ...state,
                minPrice: minPriceRef.current, 
                maxPrice: maxPriceRef.current,
                currentChildCategories: categories,
                filteredProducts: filterProducts(categories)
            }
        })
    }

    function filterProducts(categories){
        let filteredProducts = []
        const { allProducts, currentParentCategory } = state

        for(let cat of categories){
            filteredProducts = [...filteredProducts, ...allProducts.filter(product => product.categories.findIndex(c => (c.parent_id == currentParentCategory.id) && (c.id == cat.id)) != -1)]
        }

        if(categories.length == 0){
            filteredProducts = allProducts.filter(product => product.categories.findIndex(cat => currentParentCategory.id == cat.id) != -1)
        }

        return filteredProducts
    }

    function filterPrice({value}){
        
        setState(state => {
            let filteredProducts = filterProducts(state.currentChildCategories)

            return {
                ...state,
                minPrice: value.min, 
                maxPrice: value.max,
                filteredProducts: filteredProducts.filter(product => product.prix >= value.min && product.prix <= value.max)
            }
        })
    }

    function LayoutViewClicked(colums) {
        setState(state => ({
            ...state,
            layoutColumns:colums
        }))
    }

    const openFilter = () => {
        document.querySelector(".collection-filter").style = "left: -15px";
    }
    
    if(state.isLoading) return <Loading/>

    return (
        <div>
            {/*SEO Support*/}
            <Helmet>
                <title>Abooth | Galerie</title>
                <meta name="description" content="Abooph" />
            </Helmet>
            {/*SEO Support End */}

            <Breadcrumb title={state.currentParentCategory.nom || 'galerie'}/>

            <section className="section-b-space">
                <div className="collection-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3 collection-filter">

                                <StickyBox offsetTop={20} offsetBottom={20}>
                                    <div>
                                        <Filter
                                            categories={state.categories}
                                            parentCategory={state.currentParentCategory}
                                            childCategories={state.currentChildCategories}
                                            selectParentCategory={selectParentCategory}
                                            selectChildCategories={selectChildCategories}
                                            minPrice={state.minPrice}
                                            maxPrice={state.maxPrice}
                                            initMinPrice={minPriceRef.current}
                                            initMaxPrice={maxPriceRef.current}
                                            filterPrice={filterPrice}
                                        />
                                        <NewProduct/>
                                        <div className="collection-sidebar-banner">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`} className="img-fluid" alt="" />
                                        </div>
                                    </div>
                                </StickyBox>
                                {/*side-bar banner end here*/}
                            </div>
                            <div className="collection-content col">
                                <div className="page-main-content ">
                                    <div className="">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="top-banner-wrapper">
                                                    <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/2.jpg`} className="img-fluid" alt=""/></a>
                                                    <div className="top-banner-content small-section">
                                                        <h4>mode</h4>
                                                        <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
                                                    </div>
                                                </div>
                                                <div className="collection-product-wrapper">
                                                    <div className="product-top-filter">
                                                        <div className="container-fluid p-0">
                                                            <div className="row">
                                                                <div className="col-xl-12">
                                                                    <div className="filter-main-btn">
                                                                        <span onClick={openFilter}
                                                                            className="filter-btn btn btn-theme"><i
                                                                            className="fa fa-filter"
                                                                            aria-hidden="true"></i> Filtre </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <FilterBar products={state.filteredProducts} onLayoutViewClicked={(colmuns) => LayoutViewClicked(colmuns)}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/*Products Listing Component*/}
                                                    <ProductListing 
                                                        colSize={state.layoutColumns}
                                                        products={state.filteredProducts}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

function getAllProducts(){
    return (
      Promise.all([
        fetch(categories.url(),{
          method:categories.method,
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
          },
        }),
        fetch(all_products.url(),{
            method:all_products.method,
            headers:{
              "Accept": "application/json",
              "Content-type": "application/json",
            },
          }),
      ]).then(async([res1, res2]) => {
        const a = await res1.json();
        const b = await res2.json();
        return [a, b]
      })
    )
}
