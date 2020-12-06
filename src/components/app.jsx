import React, {useState, useEffect} from 'react';

import { withTranslate } from 'react-redux-multilingual'
import { useHistory } from 'react-router-dom';

import HeaderOne from './common/headers/header-one';
import FooterOne from "./common/footers/footer-one";
// import ThemeSettings from "./common/theme-settings"
import { getCategories } from 'services/api';


function App(props) {
    const history = useHistory()

    const [state, setState] = useState({
        isLoading: true, 
        categories: [],
    })

    useEffect(() => {
        getCategories((response) => {
            setState(state => ({...state, categories: response.results}))
        })
    }, [])

    return (
        <div>
            <HeaderOne history={history} categories={state.categories} logoName={'logo.png'}/>
            {props.children}
            <FooterOne logoName={'logo.png'}/>

            {/* <ThemeSettings /> */}
        </div>
    );
}

export default withTranslate(App);
