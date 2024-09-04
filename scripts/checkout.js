/*commented for promise exercise
import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCart } from "../data/cart.js";*/
import { renderOrderSummary } from "./checkout/orderSummary2.js";
import { renderPaymentSummary } from "./checkout/paymentSummary2.js";
import {loadCart, loadCartFetch} from "../data/cart.js";
import "../data/car.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
//import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
    try {
        await loadProductsFetch();
        /*const value = await new Promise((resolve) => {  
            loadCart(() => {  
                resolve('value3');
            });
        });*/
        await loadCartFetch();
        await Promise.all([
           loadProductsFetch(),
           loadCartFetch()
        ]);
    }  catch(error) {
        console.log('unexpected error. Please try again later.' + error);
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(), 
    new Promise((resolve) => {  
            loadCart(() => {  
                resolve();
        });
    })
]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});*/

/*new Promise((resolve) => {  
    loadProducts(() => {  
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});*/

/*loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});*/
