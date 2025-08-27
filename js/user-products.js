document.getElementById('newproduct').addEventListener('click', () => {
    window.location.href = "newProduct.html";
})

function loadOnTable(){
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
            </tr>
        `
    });

    document.getElementById('products-tbody').innerHTML = tableContent;
}

loadOnTable();