import React, {useState, useEffect} from 'react';
import { withTranslate } from 'react-redux-multilingual'

// Custom Components
import HeaderOne from './common/headers/header-one';

import FooterOne from "./common/footers/footer-one";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"
import { getCategories } from 'services/api';

function App(props) {
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
            <HeaderOne categories={state.categories} logoName={'logo.png'}/>
            {props.children}
            <FooterOne logoName={'logo.png'}/>

            {/* <ThemeSettings /> */}
        </div>
    );
}

export default withTranslate(App);
