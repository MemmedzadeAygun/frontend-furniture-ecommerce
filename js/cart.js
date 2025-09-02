let productOnTheCard = JSON.parse(localStorage.getItem('productOnTheCard')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

function loadOnTable(){
    const logedInUser = JSON.parse(localStorage.getItem('logedInUser'));

    // localStorage.removeItem('productOnTheCard');

    let userProducts = productOnTheCard.filter(cart => cart.ownerId === logedInUser.id);
    tableContent = "";
    let total = 0;
    userProducts.forEach(cart => {
        total+=cart.subTotal;
        let findProduct = products.find(product => product.id === cart.productId);
        tableContent+=`
            <tr>
                <td>
                    <img src="${findProduct.imgUrl}" style="width: 80px; height: 70px; object-fit: cover;">
                    ${findProduct.model}
                </td>
                <td>${findProduct.price}$</td>
                <td>
                    <input type="number" value="${cart.quantity}" min="1" class="form-control quantity-input" data-cart-id="${cart.cart_id}" style="width: 50px;">
                </td>
                <td>${cart.subTotal}$</td>
                <td><button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${cart.cart_id}">Remove</button></td>
            </tr>
        `;
    });

    document.getElementById('tbody').innerHTML = tableContent;
    document.getElementById('sub-total').textContent = total + "$";
    document.getElementById('total').textContent = total + "$";

     document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
           let newQuantity = parseInt(e.target.value);
           let cartId = Number(e.target.getAttribute('data-cart-id'));

           let cart = productOnTheCard.find(cart => cart.cart_id === cartId);
           let findProduct = products.find(product => product.id === cart.productId);

           if (cart && findProduct) {
                let subTotal = newQuantity * findProduct.price;

                cart.quantity=newQuantity;
                cart.subTotal = subTotal;

                localStorage.setItem('productOnTheCard',JSON.stringify(productOnTheCard));

                loadOnTable();
           }
        })
    })
}

loadOnTable();

function deleteFromCart(){
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            let cartId = Number(e.target.getAttribute('data-id'));
            if (confirm("Are you sure you want to delete product from your cart?")) {
                let productOnTheCard = JSON.parse(localStorage.getItem('productOnTheCard')) || [];
                productOnTheCard = productOnTheCard.filter(cart => cart.cart_id !== cartId);
                
                localStorage.setItem('productOnTheCard',JSON.stringify(productOnTheCard));
                // loadOnTable();
                window.location.href = "cart.html";
            }
        }
    });
}

deleteFromCart();