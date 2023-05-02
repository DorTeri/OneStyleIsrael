import axios from "axios";
import { httpService } from "./http.service";

export const productService = {
    getProducts,
    getProductById,
    deleteProduct,
    saveProduct,
    getEmptyProduct,
    checkout,
    getBrands
}

// function sort(arr) {
//     return arr.sort((a, b) => {
//         if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
//             return -1;
//         }
//         if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
//             return 1;
//         }

//         return 0;
//     })
// }

function getProducts(filterBy = null) {
    return httpService.get('product/', filterBy)
}

function getProductById(productId) {
    return httpService.get(`product/${productId}`)
}

function getBrands() {
    return httpService.get(`product/brand`)
}

function deleteProduct(productId) {
    return httpService.delete(`product/${productId}`)
}

function _updateProduct(product) {
    return httpService.put(`product/${product._id}` , product)
}

function _addProduct(product) {
    return httpService.post(`product/` , product)
}

function saveProduct(product) {
    return product._id ? _updateProduct(product) : _addProduct(product)
}

async function checkout() {
    const url = `https://private-anon-2a8f952b74-meshulam1.apiary-mock.com/api/light/server/1.0/createPaymentProcess/?pageCode=13c71baa863b&userId=41deb6f1347ee8b2&apiKey=&sum=10.99&successUrl=https://mysite.co.il?test=1&cancelUrl=https://www.meshulam.biz&description=&paymentNum=&maxPaymentNum=&pageField=&companyCommission=&saveCardToken=&cField1=?description=Payment%20for%20a%20monthly%20subscription&pageField=%5BfullName%5D%3DJohn%20Doe%26pageField%5Bphone%5D%3D0501234567`
    const res = await axios.post(url)
    console.log('res', res)
    console.log('res.data', res.data)
}

function getEmptyProduct() {
    return {
        brand: '',
        ctg: '',
        model: '',
        type: '',
        price: 0,
        prevPrice: 0,
        url1: ``,
        url2: ``,
        url3: ``,
        url4: ``
    }
}

// function filter(term) {
//     term = term.toLocaleLowerCase()
//     return products.filter(product => {
//         return product.name.toLocaleLowerCase().includes(term) ||
//             product.phone.toLocaleLowerCase().includes(term) ||
//             product.email.toLocaleLowerCase().includes(term)
//     })
// }