var express = require("express")
,   server = require('http').createServer(app)
,   app = express()
,   port = process.env.PORT || 5000
,   io = require('socket.io').listen(app.listen(port))
,   routes = require('./routes.js');

//Config
app.set('port', port);
app.set('views', __dirname + '/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

//Add routes
routes(app);

//Socket.io
io.sockets.on('connection', function(socket) {
    if (!window.connected) {
        socket.emit('message',  {message: 'Welcome to the chat!'});
        socket.on('send', function(data) {
            io.sockets.emit('message', data);
        });
    }
    window.connected = true;
});


module.exports = app;
