import { toast  } from 'react-toastify';

import store from 'store'

export const PUBLIC_ROUTE = 'http://91.234.195.219:3333';
export const API_ROUTE = 'http://91.234.195.219:3333/v1';
export const ARTICLES_IMAGES_ROUTE =  PUBLIC_ROUTE;

const toastConfig = {
    autoClose: false
}

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const token = store.getState().auth.token
    if(token) {
        headers.append('Authorization', 'Bearer ' + token)
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            
            if(!response.ok) {
                return Promise.reject(json);
            }

            return json;
        })
    );
};

export function exeRequest(absoluteUrl, method, data, sCallBack, eCallBackr){

    let options = {
        url:absoluteUrl,
        method: method
    }

    if(data && data !== {}){
        options = Object.assign({}, {body : JSON.stringify(data)}, options);
    }

    request(options).then(response => {
      if(sCallBack) sCallBack(response);
    }).catch(error => {

        if(eCallBackr){
            eCallBackr(error)
            return;
        }

        toast.error("Une erreur s'est produite, veuillez ressayer !", toastConfig)
    });
}

export function getOrders(page,sCallBack,eCallBack){
    let url = `${API_ROUTE}/user/commande`
    if(page) url = `${API_ROUTE}/user/commande?page=${page}`
    
    exeRequest(url,"GET",null,sCallBack,eCallBack)
}

export function getOrderDetail(orderId,sCallBack,eCallBack){
    const url = `${API_ROUTE}/user/commande/${orderId}`
    exeRequest(url,"GET",null,sCallBack,eCallBack)
}

export function getDressmakerProducts(dressmakerId,sCallBack,eCallBack){
    const url = `${API_ROUTE}/user/articles/couturier/${dressmakerId}`
    exeRequest(url,"GET",null,sCallBack,eCallBack)
}