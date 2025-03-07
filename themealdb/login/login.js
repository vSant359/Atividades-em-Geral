const login = document.getElementById('submit-login')
const signUp = document.getElementById('submit-signUp')

function toggleForm() {
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}


function register(event) {
    event.preventDefault();

    const emailUser = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === emailUser)) {
        alert('Email já está cadastrado');
        return;
    }


    users.push({ email: emailUser, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso');
    toggleForm(); 
}


function verifyLogin(event) {
    event.preventDefault();

    const emailUser = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === emailUser && user.password === password);
    if (validUser) {
        window.location.href = '../index.html'
    } else {
        alert('Email ou senha incorretos!')
    }
}

login.addEventListener('click', verifyLogin)
signUp.addEventListener('click', register)