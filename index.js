var express = require("express");
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require("express-session");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set("view engine",'ejs');
app.set('views', path.join(__dirname, 'pages'));
app.use(urlencodedParser);
app.use(session({secret:'ssshhhhh'}));

var ses;
app.get("/", function(req, res) {
    res.render("login");
});
var USERNAME = "nguyen";
var PASSWORD = "nguyen";
app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);
    if (username == USERNAME && password == PASSWORD) {
        req.session.username = username;
        req.session.password = password;
        res.render("page-main");
    } else {
        res.render("login");
    }
})

var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/pageMain", function(req, res) {
    if (req.session.username == USERNAME && req.session.username == PASSWORD) {
        res.render("page-main");
    } else {
        res.render("login");
    }
});

app.get("/logout", function(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});