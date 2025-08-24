function userSignUp() {

    let registerForm = document.querySelector("form");

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;


        document.querySelectorAll('.error').forEach(e => e.style.display = "none");

        let hasError = false;

        if (!name) {
            document.getElementById('error-name').textContent = "Ad bos ola bilmez!";
            document.getElementById('error-name').style.display = "block";
            hasError = true;
        }
        if (!surname) {
            document.getElementById('error-surname').textContent = "Soyad bos ola bilmez!";
            document.getElementById('error-surname').style.display = "block";
            hasError = true;
        }
        if (!email) {
            document.getElementById('error-email').textContent = "Email bos ola bilmez!";
            document.getElementById('error-email').style.display = "block";
            hasError = true;
        }
        if (!username) {
            document.getElementById('error-username').textContent = "Username bos ola bilmez!";
            document.getElementById('error-username').style.display = "block";
            hasError = true;
        }
        if (!password) {
            document.getElementById('error-password').textContent = "Password bos ola bilmez!";
            document.getElementById('error-password').style.display = "block";
            hasError = true;
        }

        if (hasError) {
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert("Bu istifadeci artiq movcuddur!");
            return;
        }

        const newUser = {
            id: userId,
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password
        }

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert('Register successfully');
        // localStorage.removeItem("users");

        document.getElementById('name').value = "";
        document.getElementById('surname').value = "";
        document.getElementById('email').value = "";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";

    })

}

userSignUp();