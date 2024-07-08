const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
}); 

xhr.open('GET', 'https://superSimplebackend.dev/products/first');
xhr.send();
xhr.response