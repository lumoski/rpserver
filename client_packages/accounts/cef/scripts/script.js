function showLogin() {
    resError();
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "block";
};

function showRegister() {
    resError();
    document.getElementById("register").style.display = "block";
    document.getElementById("login").style.display = "none";
};

function loginAttempt() {
    resError();
    const login = document.getElementById('log-login').value;
    const password = document.getElementById('log-password').value;

    if (!login) {
        return showError('Input login');
    }

    if (!password) {
        return showError('Input password');
    }

    mp.trigger('loginAttempt', JSON.stringify({login: login, password: password}));
}

function showError(message) {
    const errBlock = document.getElementById('error');
    errBlock.innerText = message;
    errBlock.style.display = 'block';
}

function resError() {
    const errBlock = document.getElementById('error');
    errBlock.style.display = 'none';
}