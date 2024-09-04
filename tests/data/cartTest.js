//import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOPtion} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to the cart', () => {
        //spyOn(localStorage, 'setItem');

        /*spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();*/

        cart.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          }];
        
        //addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //expect(cart.length).toEqual(1);
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        //expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //expect(cart[0].quantity).toEqual(2);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        //spyOn(localStorage, 'setItem');

        /*spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();*/
        cart.cartItems = [];

        //addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
        //expect(cart.length).toEqual(1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        //expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //expect(cart[0].quantity).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(1);
    });
});

describe('test suite: removeFromCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');


        /*spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
       loadFromStorage();*/
       cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];

      document.querySelector('.js-test-container').innerHTML = `
                <div class="js-order-summary"></div>
                <div class="js-payment-summary"></div>
                <div class="js-cart-item-container-${cart.cartItems[0].productId}"></div>
            `;
    });
    /*cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];*/

    it('remove a productId that is in the cart', () => {
        //removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
        //expect(cart.length).toEqual(0);
        expect(cart.cartItems.length).toEqual(0);
    });

    it('remove a productId that is not in the cart', () => {
        //removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c7');
        cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c7');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
        //expect(cart.length).toEqual(1);
        expect(cart.cartItems.length).toEqual(1);
    });
});

describe('test suite for updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        /*spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();*/
        cart.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          }];
    });
    /*cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];*/

    it('update the delivery option', () => { 
        //updateDeliveryOPtion('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
        cart.updateDeliveryOPtion('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
        //expect(cart[0].deliveryOptionId).toEqual('3');
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '3'
        }]));
    });

    it('update the delivery option of a product that is not in the cart', () => {
        //updateDeliveryOPtion('e43638ce-6aa0-4b85-b27f-e1d07eb678c67', '3');
        cart.updateDeliveryOPtion('e43638ce-6aa0-4b85-b27f-e1d07eb678c67', '3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        //expect(cart.length).toEqual(1);
        expect(cart.cartItems.length).toEqual(1);
        //expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //expect(cart[0].quantity).toEqual(1);
        //expect(cart[0].deliveryOptionId).toEqual('1');
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    })
});