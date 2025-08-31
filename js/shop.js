function getAllCategory() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const uniqueCategory = new Set();

    products.forEach(product => {
        uniqueCategory.add(product.category);
    });

    console.log(uniqueCategory);

    uniqueCategory.forEach(category => {
        let p = document.createElement('p');
        p.textContent = category;
        p.style.cursor = "pointer";
        p.setAttribute('data-category', category);
        document.querySelector('.shop').appendChild(p);
    })

}

getAllCategory();

function getAllProduct() {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    displayProduct(products);

}

getAllProduct();

function displayProduct(products) {

    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    products.forEach(element => {
        const product = document.createElement('div');
        product.classList.add('product');
        product.setAttribute('data-id', element.id);

        const product_img = document.createElement('div');
        product_img.classList.add('product-img');

        const img = document.createElement('img');
        img.src = element.imgUrl;

        const product_detail = document.createElement('div');
        product_detail.classList.add('product-detail');

        const model = document.createElement('p');
        model.classList.add('model');
        model.textContent = element.model;

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = element.price + '$';

        const rate = document.createElement('p');
        let stars = '';
        for (let i = 0; i < element.rating; i++) {
            stars += '<i class="fa-solid fa-star"></i>';
        }
        rate.innerHTML = stars;

        const btn = document.createElement('button');
        btn.textContent = "Add to Cart";
        btn.setAttribute('data-id', element.id);

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let productId = parseInt(btn.getAttribute('data-id'));
            console.log(productId);
            addToCart(productId);
        });

        product.appendChild(product_img);
        product_img.appendChild(img);
        product.appendChild(product_detail);
        product_detail.appendChild(model);
        product_detail.appendChild(price);
        product_detail.appendChild(rate);
        product.appendChild(btn);
        productsContainer.appendChild(product);

    });
}

function filterProductsByCategory() {

    document.querySelector('.shop').addEventListener('click', (e) => {

        let products = JSON.parse(localStorage.getItem('products')) || [];
        // let productsContainer = document.querySelector('.products');
        // productsContainer.innerHTML = '';

        if (e.target.tagName === "P") {
            let selectedCategory = e.target.getAttribute('data-category');
            console.log(selectedCategory);

            let filteredProducts = products.filter(product => selectedCategory === product.category);
            displayProduct(filteredProducts);
        }
    })
}

filterProductsByCategory();

function filterProductsByRating() {
    document.querySelectorAll('.rate p').forEach((rateP, index) => {
        rateP.addEventListener('click', () => {
            let starCount = 5 - index;
            console.log(starCount);

            let products = JSON.parse(localStorage.getItem('products')) || [];
            let filterByRating = products.filter(product => product.rating == starCount);
            displayProduct(filterByRating);
        })
    })
}

filterProductsByRating();

document.getElementById('all-products-btn').addEventListener('click', () => {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    displayProduct(products)
})

function searchProducts() {
    let searchInput = document.getElementById('searchInput');
    let searchText = searchInput.value.trim().toLowerCase();

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    let filterProducts = products.filter(
        product => product.model.toLowerCase().includes(searchText)
    );

    displayProduct(filterProducts);
}

document.getElementById('sortSelect').addEventListener('change', () => {
    function sortProduct() {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let copyList = [...products];

        let selectedValue = document.getElementById('sortSelect').value;

        if (selectedValue == 'priceAsc') {
            copyList.sort((a,b) => a.price - b.price);
        }else if(selectedValue == 'priceDesc'){
            copyList.sort((a,b) => b.price -a.price);
        }

        displayProduct(copyList);
    }

    sortProduct();
})