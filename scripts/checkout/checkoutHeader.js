//import { calculateCartQuantity } from "../../data/cart.js";
import {cart} from "../../data/cart-class.js";

export function renderCheckoutHeader() {
    const cartQuantity = cart.calculateCartQuantity();

 

  const checkoutHeaderHTML = `
      <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="amazon.html">${cartQuantity}</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `;

   
    const checkoutHeaderElement = document.querySelector('.js-checkout-header');
    if (checkoutHeaderElement) {
        checkoutHeaderElement.innerHTML = checkoutHeaderHTML;
    } 
}

// Ensure that the function runs after the DOM is fully loaded
//document.addEventListener('DOMContentLoaded', renderCheckoutHeader);
