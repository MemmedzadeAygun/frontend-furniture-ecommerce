function loadOnUser(){
    let logedInUser = JSON.parse(localStorage.getItem('logedInUser'));

    document.getElementById('user-name').textContent = logedInUser.name;
    document.getElementById('user-surname').textContent = logedInUser.surname;
    document.getElementById('user-email').textContent = logedInUser.email;
    document.getElementById('user-username').textContent = logedInUser.username;
}

loadOnUser();

document.getElementById('saleBtn').addEventListener('click',(e) => {
    window.location.href = "user-products.html";
})