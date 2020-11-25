import * as types from '../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { PUBLIC_ROUTE } from 'api/routes'

import { getArticles } from '../services/article'

export function signIn (data){
    return dispatch => {
        toast.success(`Bienvenue sur abooph`);
        dispatch({
            type: types.SIGN_IN,
            token: data.token, 
            user: data.user
        })
    }
} 

export function logout (){
    return dispatch => {
        dispatch({
            type: types.LOG_OUT
        })
    }
} 

export const fetchProductsBegin = () => ({
    type: types.FETCH_PRODUCTS_BEGIN,
});

export const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products
})

export const receiveCategories = categories => ({
    type: types.RECEIVE_CATEGORIES,
    categories
})

export const getAllProducts = () => dispatch => {
    getArticles().then(response => {
        let products = [];

        if(response){
            products = response[0].results.map(product => ({
                ...product,
                name: product.nom,
                price: product.prix,
                salePrice: product.prix_barre,
                pictures: product.images.map(a => `${PUBLIC_ROUTE}${a.chemin}`),
                description: product.description,
                description: product.description,
                tags: product.categories.map(a => a.nom),
                sale: true,
                category: product.categories.map(a => a.nom),
            }))
        }
        dispatch(receiveProducts(products));
        dispatch(receiveCategories(response[1].results));
        return products;
    });
}

export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
})

//it seems that I should probably use this as the basis for "Cart"
// export const addToCart = (product,qty) => (dispatch) => {
//     toast.success("Article ajouté au panier");
//     dispatch(addToCartUnsafe(product, qty))
// }

export function addToCart (product,qty){
    return dispatch => {
        toast.success("Article ajouté au panier");
        dispatch(addToCartUnsafe(product, qty))
    }
} 

export function initCart (){
    return dispatch => {
        dispatch({
            type: types.INIT_CART
        })
    }
} 

export const addToCartAndRemoveWishlist = (product,qty) => (dispatch) => {
    toast.success("Article ajouté au panier");
    dispatch(addToCartUnsafe(product, qty));
    dispatch(removeFromWishlist(product));
}

export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});

export const removeFromCart = product_id => (dispatch) => {
    toast.error("Article supprimé du panier");
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};

export const incrementQty = (product,qty) => (dispatch) => {
    toast.success("Article ajouté au panier");
    dispatch(addToCartUnsafe(product, qty))

}

export const decrementQty = productId => (dispatch) => {
    toast.warn("Article supprimé du panier");

    dispatch({
    type: types.DECREMENT_QTY,
    productId})
};

//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
    toast.success("Item Added to Wishlist");
    dispatch(addToWishlistUnsafe(product))
}

export const addToWishlistUnsafe = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});

export const removeFromWishlist = product_id => (dispatch) => {
    toast.error("Item Removed from Wishlist");
    dispatch({
        type: types.REMOVE_FROM_WISHLIST,
        product_id
    })
};

//Compare Products
export const addToCompare = (product) => (dispatch) => {
    toast.success("Item Added to Compare");
    dispatch(addToCompareUnsafe(product))

}

export const addToCompareUnsafe= (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});

export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});

// Filters
export const filterBrand = (brand) => ({
    type: types.FILTER_BRAND,
    brand
});

export const filterCategory = (category) => ({
    type: types.FILTER_CATEGORY,
    category
});

export const filterColor = (color) => ({
    type: types.FILTER_COLOR,
    color
});

export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});

export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});

// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});
