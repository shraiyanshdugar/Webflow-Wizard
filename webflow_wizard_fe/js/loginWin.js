const form = document.querySelector('form');
form.addEventListener('submit', submitForm);
const alertsdiv = document.getElementById('alerts');

// e = event parameter
function submitForm(e){
    alert('Update available, pls krlo')
    console.log("as")
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value;
    const pwd = document.querySelector('#loginPassword').value;
    console.log(email);
    console.log(pwd);
    data = {
        userEmail: email,
        userPass: pwd
    }
    window.normalBuy.setLoginInfo(data);
    // location.href = "../html/menuWin.html"
}
