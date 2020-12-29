import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { IntlProvider } from 'react-redux-multilingual'
import { ToastContainer } from 'react-toastify';

import './index.scss';
import 'antd/dist/antd.css';

import Layout from 'components/app'
import Home from 'components/pages/home';
import ProductList from 'components/pages/product-list'
import DressmakerProductList from 'components/pages/dressmaker-product-list'
import productDetail from "components/pages/product-detail";
import AboutUs from 'components/pages/about-us'
import Contact from 'components/pages/contact'
import Login from './components/pages/login'
import Register from './components/pages/register'
import ForgetPassword from './components/pages/forget-password'
import PasswordReset from './components/pages/password-reset'
import CheckOut from './components/pages/checkout'
import Dashboard from './components/pages/dashboard'
import Cart from './components/pages/cart'
import OrderSuccess from 'components/pages/success-page';
import PrivateRoute from "./components/common/private-route"

import store from './store';
import translations from './constants/translations'


class Root extends React.Component {
    render() {
        return(
        	<Provider store={store}>
                <IntlProvider translations={translations} locale='en'>
				<BrowserRouter>
					<ScrollContext>
						<Switch>
                            <Layout>
                                <ToastContainer />

                                {/* public route */}
                                <Route exact path={`/`} component={Home}/>
                                <Route exact path={`/galerie`} component={ProductList}/>
                                <Route exact path={`/couturier/:id`} component={DressmakerProductList}/>
								<Route exact path={`/article/:id`} component={productDetail}/>
                                <Route path={`/a-propos`} component={AboutUs}/>
                                <Route path={`/contact`} component={Contact}/>
								<Route path={`/cart`} component={Cart}/>

                                {/*Auth pages*/}
                                <Route exact path={`/connexion`} component={Login}/>
                                <Route exact path={`/inscription`} component={Register}/>
                                <Route exact path={`/mot-de-passe-oublie`} component={ForgetPassword}/>
                                <Route exact path={`/nouveau-mot-de-passe/:token`} component={PasswordReset}/>

                                {/* private route */}
                                <PrivateRoute path={`/caisse`} component={CheckOut}/>
                                <PrivateRoute path={`/commande-envoyee`} component={OrderSuccess}/>
                                <PrivateRoute path={`/mon-compte`} component={Dashboard}/>
                            </Layout>
                         </Switch>
					  </ScrollContext>
					</BrowserRouter>
                </IntlProvider>
			</Provider>
    	);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


