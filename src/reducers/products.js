import {
    FETCH_SINGLE_PRODUCT,
    CHANGE_CURRENCY,
    RECEIVE_CATEGORIES,
    RECEIVE_PRODUCTS 
} from "../constants/ActionTypes";

const initialState = {
    products: [],
    symbol: '$',
    product_details: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return { ...state,products: action.products };
        case RECEIVE_CATEGORIES:
            return { ...state, categories: action.categories };
        case FETCH_SINGLE_PRODUCT:
            if (state.products.findIndex(product => product.id === action.productId) !== -1) {
                const singleItem = state.products.reduce((itemAcc, product) => {
                    return product
                }, [])
                return { ...state, product_details: singleItem };
            }
            return state;
        case CHANGE_CURRENCY:
            return { ...state,symbol: action.symbol };
        default:
            return state;
    }
};
export default productReducer;