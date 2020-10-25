import { API_ROUTE } from './api'

export const last_articles = {
    url: (limit=8) => `${API_ROUTE}/article/accueil?limit=${limit}`,
    method: 'GET' 
}

export const product = {
    url: (id) => `${API_ROUTE}/article/${id}`,
    method: 'GET' 
}

export const category_last_articles = {
    url: (category, limit=4) => `${API_ROUTE}/article/accueil?category=${category}&limit=${limit}`,
    method: 'GET' 
}

export const all_products = {
    url: () => `${API_ROUTE}/article/all`,
    method: 'GET' 
}

export const categories = {
    url: () => `${API_ROUTE}/categoriearticle/children`,
    method: 'GET' 
}

export const order = {
    url: () => `${API_ROUTE}/user/commande`,
    method: 'POST'
}

export const register = {
    url: () => `${API_ROUTE}/user/register`,
    method: 'POST'
}

export const login = {
    url: () => `${API_ROUTE}/auth/login/user`,
    method: 'POST'
}

