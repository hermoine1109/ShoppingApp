var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var app = express();
var session = require('express-session');
var dbmethods = require('./dbscript.js');
var getvalues = dbmethods.getval;
var getProducts = dbmethods.getit;
var getProfile = dbmethods.getPr;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({resave:true,saveUninitialized:true,
    secret: 'secret_key',cookie:{maxAge:30000}}));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve('../views/home')));

//routes
app.get('/',function(req,res){
    if(req.session.name){
        getProducts(function(products){
            res.render(path.resolve('../views/home/index'),{prods:products});
        });
    }
    else{
        res.sendFile(path.resolve('../views/home/login.html'));
    }
});

app.post('/doLogin',function(req,res){
    getvalues(function(items){
        if(items){
            req.session.name = req.body.username;
            getProducts(function(products){
                res.render(path.resolve('../views/home/index'),{prods:products});
            });
        }
        else{
            res.sendFile(path.resolve('../views/home/login.html'));
        }
    },req.body.username,req.body.password);
});

app.get('/Profile',function(req,res){
    getProfile(function(items){
        console.log(items);
        res.render(path.resolve('../views/profile'),{profile:items});
    },req.session.name);
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
        console.log(err);
        } else {
        res.redirect('/');
        }
    });
});


app.listen( 3000 , function() {
    console.log(" server started on port 3000 ");
});