var express = require("express")
,   server = require('http').createServer(app)
,   app = express()
,   port = process.env.PORT || 5000
,   io = require('socket.io').listen(app.listen(port))
,   routes = require('./routes.js')
,   connected = false;

//Config
app.set('port', port);
app.set('views', __dirname + '/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

//Add routes
routes(app);

//Socket.io
if (!connected) {
    io.sockets.on('connection', function(socket) {
        socket.emit('message',  {message: 'Welcome to the chat!'});
        socket.on('send', function(data) {
            io.sockets.emit('message', data);
            connected = true;
        });
    });
}

module.exports = app;
