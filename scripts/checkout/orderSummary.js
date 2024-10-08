//import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOPtion} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
import { calculateDeliveryDate } from '../../data/deliveryOptions.js';

function refreshCart() {
  const cartQuantity = calculateCartQuantity();

  //document.querySelector('.js-return-to-home-link')
  //  .innerHTML = `${cartQuantity} items`;
  const returnToHomeLinkElement = document.querySelector('.js-return-to-home-link');
    if (returnToHomeLinkElement) {
      returnToHomeLinkElement.innerHTML = `${cartQuantity} items`;
    }
}

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  //const cartQuantity = calculateCartQuantity();

  //document.querySelector('.js-return-to-home-link')
  //  .innerHTML = `${cartQuantity} items`;
  
  //cart.forEach((cartItem) => {
    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;
        
        const matchingProduct = getProduct(productId);
    
        const deliveryOptionId = cartItem.deliveryOptionId; 
      

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays,
          'days'
        );
        const dateString = deliveryDate.format(
          'dddd, MMMM D'
        );
    
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name js-product-name-${matchingProduct.id}">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price-${matchingProduct.id}">
                      ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity 
                        js-product-quantity-${matchingProduct.id}">
                      <span>
                        Quantity: <span class="quantity-label  js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                        Update
                      </span>
                      <input class="quantity-input js-quantity-input-${matchingProduct.id}"  data-product-id="${matchingProduct.id}">
                      <span class="save-quantity-link link-primary js-save-link"
                        data-product-id="${matchingProduct.id}">
                        Save
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                  </div>
                </div>
              </div>
        `;
      });
    //});
      
      
  
    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = '';
  
      deliveryOptions.forEach((deliveryOption) => {
        /*const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays,
          'days'
        );*/
        const deliveryDate = calculateDeliveryDate(deliveryOption);

        const dateString = deliveryDate.format(
          'dddd, MMMM D'
        );
  
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
  
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
        html += `
            <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" 
             data-product-id="${matchingProduct.id}" 
             data-delivery-option-id="${deliveryOption.id}">
              <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input js-delivery-option js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
            </div>
          `
      });
  
      return html;
    }
  
      document.querySelector('.js-order-summary')
          .innerHTML = cartSummaryHTML;
  
     
  
      document.querySelectorAll('.js-delete-link')
      .forEach((link) => {
          link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            cart.removeFromCart(productId);
            
            /*const container = document.querySelector(
              `.js-cart-item-container-${productId}`
            )
  
            container.remove();*/

            renderOrderSummary();
            renderPaymentSummary();
            
            //refreshCart();
            renderCheckoutHeader();
          });
      });
  
      document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
           element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
           
            cart.updateDeliveryOPtion(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
           });
        });
  
      document.querySelectorAll('.js-update-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
           
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
        });
        
        //renderOrderSummary();
        //refreshCart();
      });
  
      document.querySelectorAll('.js-save-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
  
          const quantityInput = document.querySelector(
            `.js-quantity-input-${productId}`
          );
          
          const newQuantity = Number(quantityInput.value);
          console.log(newQuantity);
          if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
          }
          
          cart.updateQuantity(productId, newQuantity);
  
          const container = document.querySelector(
            `.js-cart-item-container-${productId}`
          );
          container.classList.remove('is-editing-quantity');
    
          
          const quantityLabel = document.querySelector(
            `.js-quantity-label-${productId}`
          );
          quantityLabel.innerHTML = newQuantity;
          
          renderOrderSummary();
          renderPaymentSummary();
          //refreshCart();
          renderCheckoutHeader();
        });
      });
}


renderCheckoutHeader();


