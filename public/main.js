//const UUID = "670084221";

//let id = document.getElementById('UUID').value;
let connect = document.getElementById('connect');
let disconnect = document.getElementById('disconnect');

const socket = io({ auth: { token: 'FrancPerez' }, autoConnect: false});

connect.addEventListener('click', () => {
    socket.connect();
});
disconnect.addEventListener('click', () => {
    socket.disconnect();
});

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