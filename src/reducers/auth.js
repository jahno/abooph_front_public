import {API_ROUTE} from '../api/routes'
import {SIGN_IN, LOG_OUT } from "../constants/ActionTypes";

const initialState = {
    token: null,
    user: {},
    isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                token: action.token,
                user: action.user,
                isAuthenticated: true
            };
        case LOG_OUT:
            const url = `${API_ROUTE}/logout/${state.token}`;

            fetch(url,{
                method:"GET",
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${state.token}`
                },
            })

            return initialState;
        default:
            return state;
    }
}

export default authReducer;