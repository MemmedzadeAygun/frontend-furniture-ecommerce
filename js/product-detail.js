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

function addToCart() {
    document.getElementById('add-to-cart').addEventListener('click', () => {
        let urlParams = new URLSearchParams(window.location.search);
        const productid = Number(urlParams.get('id'));
        console.log(productid);
        // localStorage.removeItem('productOnTheCard');

        let products = JSON.parse(localStorage.getItem('products')) || [];
        let productOnTheCard = JSON.parse(localStorage.getItem('productOnTheCard')) || [];

        let findProduct = products.find(product => productid == product.id);

        if (!findProduct) {
            alert("Product can not find!");
            return;
        }

        let loginUser = JSON.parse(localStorage.getItem('logedInUser'));
        let cartId = productOnTheCard.length > 0 ? productOnTheCard[productOnTheCard.length - 1].cart_id + 1 : 1;

        let cart = {
            cart_id: cartId,
            productId: productid,
            quantity: 1,
            subTotal: findProduct.price,
            ownerId: loginUser.id
        }

        productOnTheCard.push(cart);
        // localStorage.removeItem('productOnTheCard');
        localStorage.setItem('productOnTheCard', JSON.stringify(productOnTheCard));
        alert("Product add to cart successfully");
    })
}

addToCart();