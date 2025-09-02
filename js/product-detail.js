function getProductById() {
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    let existingProduct = products.find(product => product.id == productId);

    if (existingProduct) {
        let productImg = document.querySelector('.product-image img');
        if (productImg) {
            productImg.src = existingProduct.imgUrl;
        }
        productModel = document.querySelector('.right-side h2');
        productModel.textContent = existingProduct.model;
        let stars = '';
        for (let index = 0; index < existingProduct.rating; index++) {
            stars += '<i class="fa-solid fa-star"></i>';
        }
        document.getElementById('rating').innerHTML = stars;

        document.getElementById('price').textContent = existingProduct.price + "$";
        document.getElementById('brand').textContent = existingProduct.brand;
    }
}

getProductById();