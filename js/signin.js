function onLogin() {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        document.querySelectorAll('.error').forEach(e => e.style.display = "none");

        let hasError = false;

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

        let existingUser = users.find(user => {
            return user.username === username && user.password === password;
        });

        if (existingUser) {
            Swal.fire({
                title: "User login  successfully",
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
                localStorage.setItem('logedInUser', JSON.stringify(existingUser));
                window.location.href = "index.html";
            })

        } else {
            Swal.fire({
                title: "Username or password incorrect",
                icon: 'error',
                width: '300px',
                position: 'bottom-end',
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f8d7da',
                color: '#721c24',
            });
        }
    })
}

onLogin();