




// Login validation logic
function validateLoginEmail() {
    const emailLogin = document.getElementById('emailLogin').value;
    const emailLoginError = document.getElementById('emailLoginError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailLoginError.classList.toggle('visible', !emailRegex.test(emailLogin));
}

function validateLoginPassword() {
    const loginPassword = document.getElementById('loginPassword').value.trim();
    const loginPasswordError = document.getElementById('loginPasswordError');
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    loginPasswordError.classList.toggle('visible', loginPassword === '' || !passwordRegex.test(loginPassword));
}

// Registration validation logic
function validateFullName() {
    const fullName = document.getElementById('fullName').value;
    const fullNameError = document.getElementById('fullNameError');
    fullNameError.classList.toggle('visible', fullName.trim() === '');
}

function validateRegisterEmail() {
    const emailRegister = document.getElementById('emailRegister').value;
    const emailRegisterError = document.getElementById('emailRegisterError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailRegisterError.classList.toggle('visible', !emailRegex.test(emailRegister));
}

function validateRegisterPassword() {
    const registerPassword = document.getElementById('registerPassword').value.trim();
    const registerPasswordError = document.getElementById('registerPasswordError');
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    registerPasswordError.classList.toggle('visible', registerPassword === '' || !passwordRegex.test(registerPassword));
}

function validateConfirmPassword() {
    const registerPassword = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    confirmPasswordError.classList.toggle('visible', registerPassword !== confirmPassword);
}

// Login form submission
document.getElementById('loginFormContent').addEventListener('submit', function(event) {
    event.preventDefault();
    validateLoginEmail();
    validateLoginPassword();
    const emailError = document.getElementById('emailLoginError').classList.contains('visible');
    const passwordError = document.getElementById('loginPasswordError').classList.contains('visible');

    if (!emailError && !passwordError) {
        // Submit the form using fetch
        const formData = {
            emailLogin: document.getElementById('emailLogin').value,
            loginPassword: document.getElementById('loginPassword').value
        };

        fetch('/loginData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message=="redirctHome") {
                window.location.href = '/home';
                // successAleart(data.message)
            } else {
                errorAleart(data.message)


            }
        });
    }
});

// Register form submission
document.getElementById('registerFormContent').addEventListener('submit', function(event) {
    event.preventDefault();
    validateFullName();
    validateRegisterEmail();
    validateRegisterPassword();
    validateConfirmPassword();
    const nameError = document.getElementById('fullNameError').classList.contains('visible');
    const emailError = document.getElementById('emailRegisterError').classList.contains('visible');
    const passwordError = document.getElementById('registerPasswordError').classList.contains('visible');
    const confirmPasswordError = document.getElementById('confirmPasswordError').classList.contains('visible');

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
        // Submit the form using fetch
        const formData = {
            fullName: document.getElementById('fullName').value,
            emailRegister: document.getElementById('emailRegister').value,
            registerPassword: document.getElementById('registerPassword').value
        };

        fetch('/registerData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message=="redirctHome") {
                window.location.href = '/home';

            //    successAleart(data.message)
            } else {
                errorAleart(data.message)

            }
        });
    }
});

// Toggle between login and register forms
document.getElementById('toggleForm').addEventListener('click', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const button = document.getElementById('toggleForm');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        button.textContent = 'REGISTER';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        button.textContent = 'LOGIN';
    }
});

// Show/hide password
document.getElementById('showLoginPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('loginPassword');
    passwordField.type = this.checked ? 'text' : 'password';
});

document.getElementById('showRegisterPassword').addEventListener('change', function() {
    const passwordField = document.getElementById('registerPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');
    passwordField.type = this.checked ? 'text' : 'password';
    confirmPasswordField.type = this.checked ? 'text' : 'password';
});


function successAleart(message){
Swal.fire({
icon: 'success',
title: 'Registration Successful',
text: message,
iconColor: '#FF69B4',
confirmButtonColor: '#FF1493',
showClass: {
popup: 'animate__animated animate__fadeInDown'
},
hideClass: {
popup: 'animate__animated animate__fadeOutUp'
},
customClass: {
popup: 'swal-pink-theme'
},
backdrop: `
rgba(255, 192, 203, 0.4)
`,
html: `
<style>
    .swal-pink-theme {
        background-color: #FFF0F5 !important;
        border-radius: 15px !important;
        box-shadow: 0 0 20px rgba(255, 105, 180, 0.4) !important;
    }
    .swal2-title {
        color: #C71585 !important;
        font-weight: bold !important;
    }
    .swal2-confirm {
        background-color: #FF1493 !important;
        box-shadow: 0 2px 8px rgba(255, 20, 147, 0.3) !important;
        transition: all 0.3s ease !important;
    }
    .swal2-confirm:hover {
        background-color: #FF69B4 !important;
        transform: translateY(-2px) !important;
    }
</style>
`
});
}


function errorAleart(message){

Swal.fire({
icon: 'error',
title:  message,
text: message,
iconColor: '#FF1493',
confirmButtonColor: '#FF69B4',
showClass: {
    popup: 'animate__animated animate__fadeInDown'
},
hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
},
customClass: {
    popup: 'swal-pink-error',
    title: 'swal2-title',
    htmlContainer: 'swal2-html-container'
},
backdrop: `
    rgba(255, 192, 203, 0.4)
`,
html: `
    <style>
        .swal-pink-error {
            background-color: #FFF0F5 !important;
            border-radius: 15px !important;
            box-shadow: 0 0 20px rgba(255, 20, 147, 0.4) !important;
            border-top: 4px solid #FF1493 !important;
        }
        .swal2-title {
            color: #C71585 !important;
            font-weight: bold !important;
        }
        .swal2-html-container {
            color: #DB7093 !important;
        }
        .swal2-confirm {
            background-color: #FF69B4 !important;
            box-shadow: 0 2px 8px rgba(255, 105, 180, 0.3) !important;
            transition: all 0.3s ease !important;
        }
        .swal2-confirm:hover {
            background-color: #FF1493 !important;
            transform: translateY(-2px) !important;
        }
    </style>
`
});

}

