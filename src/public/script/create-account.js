/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const passwordEl = document.getElementById('password')
const confirmPasswordEl = document.getElementById('confirm-password')
const createAccountBtnEl = document.getElementById('create-account-btn')
const usernameEl = document.getElementById('username')
const inputsContainerEl = document.getElementById('inputs-container')

confirmPasswordEl.addEventListener('blur', () => {
    confirmPasswordsEquality();
})

passwordEl.addEventListener('blur', () => {
    confirmPasswordsEquality();
})

usernameEl.addEventListener('blur', () => {
    if(usernameEl.value !== ''){
        manipulateDOMMessage(inputsContainerEl, 'error');
        confirmPasswordsEquality();
    }
})

createAccountBtnEl.addEventListener('click', (ev) => {
    if(usernameEl.value === '' || passwordEl.value === '' || confirmPasswordEl.value === ''){
        ev.preventDefault();
        manipulateDOMMessage(inputsContainerEl, 'error', false, 'Is needed to fill all fields to proceed.');
        return;
    }
    if(!confirmPasswordsEquality()){
        return;
    }
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
        // case 'info':
        //     const infoSpan = parentElement.querySelector('span.info-span');
        //     if(infoSpan && remove){
        //         parentElement.removeChild(infoSpan)
        //         break;
        //     }
        //     if(targetElement && !remove && message){
        //         if(infoSpan){
        //             infoSpan.innerHTML =`${message}`;
        //             return
        //         }
        //         targetElement.style.border = '1px solid red';
        //         parentElement.insertAdjacentHTML(
        //                     'beforeend',
        //                     `<span class="info-span" style="color: gray; font-weight: normal; display: block;">
        //                         ${message}
        //                     </span>`
        //         )
        //         break;
        //     }
        //     break;
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