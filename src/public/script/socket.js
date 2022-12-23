/* eslint-disable no-undef */
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
  
const socket = io();

const messagesDiv = document.querySelector('#messages')
const messageField = document.querySelector('form #message');
const username =(document.querySelector('#username').textContent).trim()

socket.on('message', function(data) {
    appendMessage(data);
})

document.querySelector('#send-message').addEventListener('click', (ev) => {
    let message = messageField.value
    ev.preventDefault();
    if(message === ''){
        alert('Campo de mensagem não pode estar vazio')
        return;
    }
    message = `<b>${username}:</b> ${message}`
    sendMessage(message);
})

const sendMessage = (message) => {
    socket.emit('message', message);
    appendMessage(message);
    messageField.value = ''
}

const appendMessage = (message) => {
    const messagesDivContent = messagesDiv.innerHTML;
    messagesDiv.innerHTML = messagesDivContent + `<p>${message}</p><hr>`;
}