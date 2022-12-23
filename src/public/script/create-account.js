/* eslint-disable no-undef */
console.log('loaded')
const passwordEl = document.getElementById('password')
const confirmPasswordEl = document.getElementById('confirm-password')
const createAccountBtnEl = document.getElementById('create-account-btn')

confirmPasswordEl.addEventListener('blur', () => {
    if(passwordEl.value !== confirmPasswordEl.value){
        console.log('Passwords doesn\'t matches');
        createAccountBtnEl.disabled = true
        return;
    }
    createAccountBtnEl.disabled = false
    console.log('Password matches.')
})
console.log(password)