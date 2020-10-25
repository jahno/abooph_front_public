import { combineReducers } from 'redux';
// import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import { IntlReducer as Intl } from 'react-redux-multilingual'

// Import custom components
import authReducer from './auth';
import productReducer from './products';
import cartReducer from './cart';
import filtersReducer from './filters';
import wishlistReducer from './wishlist';
import compareReducer from './compare';

const rootReducer = combineReducers({
    auth: authReducer,
    data: productReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    Intl
});

export default rootReducer;