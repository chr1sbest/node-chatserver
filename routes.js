var app = require('./app.js');

module.exports = function(app) {
    app = app || {}

    // Index page
    app.get('/', function(req, res) {
        res.render("index");
    });
     
    // Testing page
    app.get('/test', function(req, res) {
        res.render("index");
    });

    return app
}

