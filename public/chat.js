window.onload = function() {
    var messages = []
    ,   socket = io.connect('http://localhost:5000') 
    ,   field = document.getElementById('field') 
    ,   sendButton = document.getElementById('send')
    ,   content = document.getElementById('content');

    //Send message on 'send' click event
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', {message: text});
    };
    
    //Message handling
    socket.on('message', function (data) {
        if (data.message) {
            var messageHTML = ''
            messages.push(data.message)
            for(var i = 0; i < messages.length; i++) {
                messageHTML += messages[i] + '<br>'
            };
            content.innerHTML = messageHTML;
        } else {
            console.log("There was a problem: ", data);
        }
    });
}

