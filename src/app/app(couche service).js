import axios from "axios";

export const productsApi = axios.create({
    
    baseURL : "http://localhost:3000"
});

export const getProducts = (keyword = "", page = 1, size = 3) => {
    return productsApi.get(`/products?name=${keyword}&_page=${page}&_per_page=${size}`);
    // return productsApi.get(`/products`);
}

export const saveProduct = (product) => {
    return productsApi.post(`/products`,product);
}

export const getProduct = (id) => {
    return productsApi.get(`/products/${id}`);
}

export const updateProduct = (product) => {
    return productsApi.put(`/products/${product.id}`,{id : product.id, name : product.name, price : product.price, checked : product.checked });
}

export const deleteProduct = (id) => {
    return productsApi.delete(`/products/${id}`);
}

export const changeCheckProduct = (id,checked) => {
    return productsApi.patch(`/products/${id}`,{checked : !checked});
}
