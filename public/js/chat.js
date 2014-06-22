window.onload = function() {
    var messages = []
    ,   socket = io.connect('http://localhost:5000') 
    ,   field = document.getElementById('field') 
    ,   sendButton = document.getElementById('send')
    ,   content = document.getElementById('content')
    ,   name = document.getElementById('name');

    //Send message on 'send' click event
    sendButton.onclick = function() {
        var text = field.value;
        var username = name.value;
        if (!username) {alert("Enter name!"); return;}
        socket.emit('send', {message: text, username: username});
    };
    
    //Message handling
    socket.on('message', function (data) {
        if (data.message) {
            var messageHTML = ''
            messages.push(data)
            for(var i = 0; i < messages.length; i++) {
                var chatter = messages[i].username ? messages[i].username : 'Server'
                ,   msgcontent = messages[i].message;
                
                messageHTML += '<b>' + chatter + ': </b>' + msgcontent + '<br>';
            };
            content.innerHTML = messageHTML;
        } else {
            console.log("There was a problem: ", data);
        }
    });
}

