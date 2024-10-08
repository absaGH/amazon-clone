import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
//import {cart, calculateCartQuantity, loadFromStorage} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';

describe('test suite: renderOrderSummary', () => {
    /*if these two variables are inside the beforeach hook they
       can't be accessed by other expectations because of scope. so they
       should be outside the hook */
       const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
       const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
       const deliveryOptionId = 3;

       beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
       });

        beforeEach(() => {
        
            spyOn(localStorage, 'setItem');

            document.querySelector('.js-test-container').innerHTML = `
                <div class="js-order-summary"></div>
                <div class="js-payment-summary"></div>
            `;

            /*spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([{
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }]);
            });
            
            loadFromStorage();*/
            cart.cartItems = [{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
              }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
              }];

            renderOrderSummary();
        });

        afterEach(() => {
            document.querySelector('.js-test-container').innerHTML = '';
        });

    it('displays the cart', () => {
                
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-price-${productId1}`).innerText
        ).toEqual('$10.90');
        expect(
            document.querySelector(`.js-product-price-${productId2}`).innerText
        ).toEqual('$20.95');
        expect(
            document.querySelector(`.js-product-name-${productId1}`).innerText
        ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        //document.querySelector('.js-test-container').innerHTML = '';
    });

    it('removes a product', () => {
        
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-product-name-${productId2}`).innerText
        ).toEqual('Intermediate Size Basketball');
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        //expect(cart.length).toEqual(1);
        //expect(cart[0].productId).toEqual(productId2);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId2);

        //document.querySelector('.js-test-container').innerHTML = '';
    });

    it('updating the delivery option', () => {
        document.querySelector(`.js-delivery-option-${productId1}-${deliveryOptionId}`).click();

        const checkBoxElement = document.querySelector(`.js-delivery-option-input-${productId1}-${deliveryOptionId}`);
        expect(checkBoxElement.checked).toBe(true);
        //expect(cart.length).toEqual(2);
        //expect(cart[0].productId).toEqual(productId1);

        //expect(cart[0].deliveryOptionId).toEqual('3');
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector(`.js-payment-summary-shipping`).innerText).toEqual('$14.98');
        expect(document.querySelector(`.js-payment-summary-total`).innerText).toEqual('$63.50');
    });
});