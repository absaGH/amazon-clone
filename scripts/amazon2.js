import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
//import { cart } from '../data/cart-class.js';

import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

//loadProducts(renderProductsGrid);
/*loadProducts(setTimeout(()=>{
  renderProductsGrid();
}, 3000));
//});*/

function renderProductsGrid() {

  let productsHTML = '';

  const urlParams = new URLSearchParams(window.location.search);

  const filters = urlParams.get('search');

  if(!filters){
    products.forEach((product) => {
      productsHTML = productsHTML + `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
  });
  }
  else {
      const filteredProduct = products.filter((product) => {
    
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(filters.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(filters.toLowerCase());
      
    });

    filteredProduct.forEach((product) => {
      productsHTML = productsHTML + `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
  });
  }

  function filterProduct(){
    const text = document.querySelector('.js-search-bar').value;
    const baseUrl = 'http://127.0.0.1:5500/amazon.html';
    const params = {
      search: text
    };

    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
    const filteredProduct = products.filter(products => products.name.includes(text));
    
    //window.open(url, '_blank');
    window.open(url, '_self');
    
    renderProductsGrid();
  }

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelector('.js-search-button').addEventListener('click', () => {
    filterProduct();
  });

  const inputiled = document.querySelector('.js-search-bar');

  inputiled.addEventListener('keydown', (event)=> {
    if (event.key === 'Enter') {
      filterProduct();
    }
  });

  /*function refreshCart() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }*/

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;
          

          addToCart(productId);
          //cart.addToCart(productId);
          refreshCart();
        });
    });
    refreshCart();
}

loadProducts(renderProductsGrid);

function refreshCart() {
  const cartQuantity = calculateCartQuantity();
  //const cartQuantity = cart.calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}