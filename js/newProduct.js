function createProduct(){
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

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product added successfully');
        form.reset();

    })
}

createProduct();