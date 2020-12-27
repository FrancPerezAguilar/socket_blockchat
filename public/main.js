const socket = io();

let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let action = document.getElementById("actions");

btn.addEventListener('click', function () {
    socket.emit('user_message', {
        username: username.value,
        message: message.value
    });
});

message.addEventListener('keypress', function () {
    socket.emit('user_typing', username.value);
})

socket.on('chat_message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
                            <strong>${data.username}</strong>: ${data.message}
                        </p>`
})

socket.on('typing', function(data) {
    actions.innerHTML = `<p><em>${data} is tyiping</em></p>`;
})