window.onload = function() {
    var messages = []
    ,   socket = io.connect() 
    ,   field = document.getElementById('field') 
    ,   sendButton = document.getElementById('send')
    ,   content = document.getElementById('content')
    ,   name = document.getElementById('name');

    // Message validation
    sendMessage = function() {
        var text = field.value
        ,   username = name.value;

        if (!username) {
            alert("Enter name!");  // Validate name
            return;
        } else {
            socket.emit('send', {message: text, username: username});
            field.value = "";
        }
    };
    
    // Message handling
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
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There was a problem: ", data);
        }
    });

}

//Event Handlers
$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
    $('#sendButton').click(function() {
        sendMessage();
    });
});
