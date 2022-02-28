loginButton = document.getElementById('login')
submitButton = document.getElementById('send')

let socket = null

// .emit -- sending
// .on -- receiving

loginButton.addEventListener('click', function(){
    socket = io('http://localhost:3000');

    username = document.getElementById('username').value
    messages = document.getElementById('messages')

    // messages.innerHTML = username + ' has logged in.';
    socket.emit('login', {'username' : username})
    alert('You have successfully logged in')

    // receiver
    socket.on('login-user', function(msg){
        messages.innerHTML = messages.innerHTML + "<br/>" + msg.username + ' has logged in.';
    })

    socket.on('message-user', function(msg){
        formattedMessage = msg.username + ": " + msg.message
        messages.innerHTML = messages.innerHTML + "<br/>" + formattedMessage;
    })
})

submitButton.addEventListener('click', function(){
    username = document.getElementById('username').value
    message = document.getElementById('message').value

    // .emit -- sending
    // .on -- receiving
    if (socket == null) {
        alert('You are not connected to the server yet.')
    }

    else {
        formattedMessage = username + ": " + message
        messages.innerHTML = messages.innerHTML + "<br/>" + formattedMessage;
        socket.emit('message', {'username' : username, 'message' : message})
    }
})

