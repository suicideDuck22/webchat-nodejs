/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const passwordEl = document.getElementById('password')
const confirmPasswordEl = document.getElementById('confirm-password')
const createAccountBtnEl = document.getElementById('create-account-btn')
const usernameEl = document.getElementById('username')
const nameEl = document.getElementById('name')
const inputsContainerEl = document.getElementById('inputs-container')

// const test = async () => {
//     const response = await fetch('http://localhost:3000/account/validate')
//     console.log(await response.text())
// }
// test()

nameEl.addEventListener('blur', () => {
    if(usernameEl.value !== ''){
        manipulateDOMMessage(inputsContainerEl, 'error');
        confirmPasswordsEquality();
    }
})

usernameEl.addEventListener('blur', () => {
    if(usernameEl.value !== ''){
        manipulateDOMMessage(inputsContainerEl, 'error');
        confirmPasswordsEquality();
    }
})

passwordEl.addEventListener('blur', () => {
    if(!confirmPasswordsEquality()) return;
    isValidPassword(passwordEl.value);
})

confirmPasswordEl.addEventListener('blur', () => {
    if(!confirmPasswordsEquality()) return;
    isValidPassword(confirmPasswordEl.value);
})

createAccountBtnEl.addEventListener('click', async () => {
    if(usernameEl.value === '' || passwordEl.value === '' || confirmPasswordEl.value === ''){
        manipulateDOMMessage(inputsContainerEl, 'error', false, 'Is needed to fill all fields to proceed.');
        return;
    }
    if(!confirmPasswordsEquality()){
        return;
    }
    if(!isValidPassword(passwordEl.value) || !isValidPassword(confirmPasswordEl.value)){
        return;
    }
    const validateResponse = await fetch(`http://localhost:3000/account/validate-username?username=${usernameEl.value}'`);
    const parsedResponse = await validateResponse.text();
    if(response !== 'Username free to use.'){
        manipulateDOMMessage(inputsContainerEl, 'error', false, parsedResponse)
        return;
    }
    document.getElementById('create-user-form').submit();
})

const manipulateDOMMessage = (targetElement, type, remove = true, message = '') => {
    switch(type){
        case 'error':
            const errorElement = targetElement.querySelector('.error');
            if(targetElement && remove && errorElement){
                targetElement.removeChild(errorElement);
            }
            if(targetElement && !remove && message){
                targetElement.value = '';
                if(errorElement){
                    errorElement.innerHTML =`${message}`;
                    return
                }
                targetElement.insertAdjacentHTML(
                            'beforeend',
                            `<div class="error"><p>${message}</p></div>`
                )
                break;
            }
            break;
    }
}

const confirmPasswordsEquality = () => {
    if(passwordEl.value !== '' && confirmPasswordEl.value !== ''){
        if(passwordEl.value !== confirmPasswordEl.value){
            createAccountBtnEl.disabled = true;
            manipulateDOMMessage(inputsContainerEl, 'error', false, 'Password and Confirm Password need be equals.');
            return false;
        }
    }
    createAccountBtnEl.disabled = false;
    manipulateDOMMessage(inputsContainerEl, 'error');
    return true;
}

const isValidPassword = (password) => {
    const message = 'Password need to have least one '
    const upperLetterPattern = /[A-Z]/g
    const lowerLetterPattern = /[a-z]/g
    const symbolPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g
    if(!password.match(upperLetterPattern)){
        manipulateDOMMessage(inputsContainerEl, 'error', false, message + 'uppercase letter.')
        createAccountBtnEl.disabled = true;
        return false
    }
    if(!password.match(lowerLetterPattern)){
        manipulateDOMMessage(inputsContainerEl, 'error', false, message + 'lowercase letter.')
        createAccountBtnEl.disabled = true;
        return false
    }
    if(!password.match(symbolPattern)){
        manipulateDOMMessage(inputsContainerEl, 'error', false, message + 'special symbol character.')
        createAccountBtnEl.disabled = true;
        return false
    }
    createAccountBtnEl.disabled = false;
    manipulateDOMMessage(inputsContainerEl, 'error')
    return true;
}