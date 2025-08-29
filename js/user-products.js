document.getElementById('newproduct').addEventListener('click', () => {
    window.location.href = "newProduct.html";
})

function loadOnTable() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let logedInUser = JSON.parse(localStorage.getItem('logedInUser'));
    if (!logedInUser) {
        alert('Please login');
        return;
    }

    let userProducts = products.filter(product => product.ownerId === logedInUser.id);

    let tableContent = "";

    userProducts.forEach(product => {
        tableContent += `
            <tr>
                <td>${product.id}</td>
                <td>${product.brand}</td>
                <td>${product.model}</td>
                <td>${product.category}</td>
                <td>
                    <img src="${product.imgUrl}" style="width:80px; height:70px; ">
                </td>
                <td>${product.price}</td>
                <td>${product.rating}</td>
                <td>
                    <button type="button" class="btn btn-primary edit-btn" data-id="${product.id}">Edit</button>
                    <button type="button" class="btn btn-danger delete-btn" data-id="${product.id}">Delete</button>
                </td>
            </tr>
        `
    });

    document.getElementById('products-tbody').innerHTML = tableContent;
}

loadOnTable();

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        let productId = e.target.getAttribute('data-id');
        console.log(productId);
        window.location.href = `newProduct.html?id=${productId}`
    }
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        let productid = e.target.getAttribute('data-id');
        console.log(productid);

        let products = JSON.parse(localStorage.getItem('products')) || [];

        if (confirm("Are you sure delete this product?")) {
            products = products.filter(product => product.id != productid);
            localStorage.setItem('products', JSON.stringify(products));
            Swal.fire({
                title: "Product delete successfully",
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
                loadOnTable();
            })
        }

    }
})