function createProduct() {
    let form = document.getElementById('add-product');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const logedInUser = JSON.parse(localStorage.getItem('logedInUser'));
        if (!logedInUser) {
            alert("Istifadeci login olmayib");
            return;
        }

        let brand = document.getElementById('brand').value;
        let model = document.getElementById('model').value;
        let category = document.getElementById('category').value;
        let description = document.getElementById('description').value;
        let price = document.getElementById('price').value;
        let rating = document.getElementById('rating').value;
        let imgUrl = document.getElementById('img-url').value;

        document.querySelectorAll('.error').forEach(e => e.style.display = "none");

        let hasError = false;

        if (!brand) {
            document.getElementById('error-brand').textContent = "Brand bos ola bilmez!";
            document.getElementById('error-brand').style.display = "block";
            hasError = true;
        }
        if (!model) {
            document.getElementById('error-model').textContent = "Model bos ola bilmez!";
            document.getElementById('error-model').style.display = "block";
            hasError = true;
        }
        if (!category) {
            document.getElementById('error-category').textContent = "Category bos ola bilmez!";
            document.getElementById('error-category').style.display = "block";
            hasError = true;
        }
        if (!description) {
            document.getElementById('error-description').textContent = "Description bos ola bilmez!";
            document.getElementById('error-description').style.display = "block";
            hasError = true;
        }
        if (!price) {
            document.getElementById('error-price').textContent = "Price bos ola bilmez!";
            document.getElementById('error-price').style.display = "block";
            hasError = true;
        }
        if (!rating) {
            document.getElementById('error-rating').textContent = "Rating bos ola bilmez!";
            document.getElementById('error-rating').style.display = "block";
            hasError = true;
        }
        if (!imgUrl) {
            document.getElementById('error-img').textContent = "ImgUrl bos ola bilmez!";
            document.getElementById('error-img').style.display = "block";
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const products = JSON.parse(localStorage.getItem('products')) || [];
        const productId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = {
            id: productId,
            brand: brand,
            model: model,
            category: category,
            description: description,
            price: price,
            rating: rating,
            imgUrl: imgUrl,
            ownerId: logedInUser.id
        };

        let product_id = localStorage.getItem('productId');
        if (product_id !== null) {
            updateProduct(parseInt(product_id, 10), newProduct);
            localStorage.removeItem('productId');
        }
        else {
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            alert('Product added successfully');
            window.location.href = "user-products.html";
            form.reset();
        }


    })
}

createProduct();

function editProduct() {
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');
    localStorage.setItem('productId', productId);
    
    if (productId) {
        document.querySelector('form button').textContent = "Update";
        document.querySelector('.sub-main h3').textContent = "Update Product";
        let products = JSON.parse(localStorage.getItem('products')) || [];

        let existingProduct = products.find(product => product.id == productId);

        if (existingProduct) {
            document.getElementById('brand').value = existingProduct.brand;
            document.getElementById('model').value = existingProduct.model;
            document.getElementById('category').value = existingProduct.category;
            document.getElementById('description').value = existingProduct.description;
            document.getElementById('price').value = existingProduct.price;
            document.getElementById('rating').value = existingProduct.rating;
            document.getElementById('img-url').value = existingProduct.imgUrl;
        }
    }

}

editProduct();

function updateProduct(productid, product) {

    let products = JSON.parse(localStorage.getItem('products')) || [];

    let existingProduct = products.find(product => product.id == productid);

    if (existingProduct) {
        existingProduct.brand = product.brand;
        existingProduct.model = product.model;
        existingProduct.category = product.category;
        existingProduct.description = product.description;
        existingProduct.price = product.price;
        existingProduct.rating = product.rating;
        existingProduct.imgUrl = product.imgUrl;

        localStorage.setItem('products', JSON.stringify(products));
        Swal.fire({
            title: "Product update successfully",
            icon: "success",
            width: '300px',
            position: 'bottom-end',
            toast: true,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: '#d4edda',
            color: '#155724',
        }).then(() => {
            window.location.href = "user-products.html";
        })
    }
}