var express = require("express")
,   app = express()
,   port = 5000
,   server = require('http').createServer(app);

app.get("/hello", function(req, res) {
    res.send("hello test");
});

app.listen(port);
console.log('testing!');

module.exports = app;
