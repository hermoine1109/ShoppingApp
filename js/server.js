var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var app = express();
var session = require('express-session');



//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({resave:true,saveUninitialized:true,
    secret: 'secret_key',cookie:{maxAge:6000}}));

    
//routes
app.get('/',function(req,res){
    if(req.session.name){
        res.sendFile(path.resolve('../views/shopping_cart/cozastore/index.html'));
    }
    else{
        res.sendFile(path.resolve('../views/Login_v4/home-index.html'));
    }
});

app.post('/doLogin',function(req,res){
    if(req.session.name){
        res.sendFile(path.resolve('../views/shopping_cart/cozastore/index.html'));
    }
    else{
        if( req.body.username == "abc" && req.body.password =="abc" ){
            req.session.name = req.body.username;
            res.sendFile(path.resolve('../views/shopping_cart/cozastore/index.html'));
        }
        else{
            res.sendFile(path.resolve('../views/Login_v4/home-index.html'));
        }
    }
});

///middleware ///////////////////////////////////////////////////////////////////////
app.use(express.static(path.resolve('../views/shopping_cart/cozastore')));
/////////////////////////////////////////////////////////////////////////////////////




//////////////////////////  temp database routes for testing //////////////////////////////
app.post('/doAddCart' , function(req,res){
    console.log( "inside do add cart  ---- "  + JSON.stringify(req.body) );
    res.send( { "code" : 200 } )
});

app.get('/doGetCart' , function(req,res){
    console.log("inside do get cart");
    var temp = 
    {
        "order" : [     { 'product_name' : "product_name_0", 'product_price' : '120' , 'product_image' : "images/product-13.jpg"  },
                        { 'product_name' : "product_name_1", 'product_price' : '4200' , 'product_image' : "images/product-13.jpg"  },
                        { 'product_name' : "product_name_2", 'product_price' : '10' , 'product_image' : "images/product-13.jpg"  } 
                 ]

    }
    console.log("ending....");
    res.send(temp);

});


//////////////////////////////////////////////////////////////////////////////////////////////







app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
        console.log(err);
        } else {
        res.redirect('/');
        }
    });
});


/*

//css routes 

app.get('/vendor/bootstrap/css/bootstrap.min.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/bootstrap/css/bootstrap.min.css')); 
});

app.get('/fonts/font-awesome-4.7.0/css/font-awesome.min.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/fonts/font-awesome-4.7.0/css/font-awesome.min.css')); 
});

app.get('/fonts/iconic/css/material-design-iconic-font.min.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/fonts/iconic/css/material-design-iconic-font.min.css')); 
});

app.get('/vendor/animate/animate.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/animate/animate.css')); 
});

app.get('/vendor/css-hamburgers/hamburgers.min.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/css-hamburgers/hamburgers.min.css')); 
});

app.get('/vendor/animsition/css/animsition.min.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/animsition/css/animsition.min.css')); 
});

app.get('/vendor/select2/select2.min.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/select2/select2.min.css')); 
});

app.get('/vendor/daterangepicker/daterangepicker.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/daterangepicker/daterangepicker.css')); 
});

app.get('/css/util.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/css/util.css')); 
});

app.get('/css/main.css', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/css/main.css')); 
});


// js routes 

app.get('/vendor/jquery/jquery-3.2.1.min.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/jquery/jquery-3.2.1.min.js')); 
});

app.get('/vendor/animsition/js/animsition.min.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/animsition/js/animsition.min.js')); 
});

app.get('/vendor/bootstrap/js/popper.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/bootstrap/js/popper.js')); 
});

app.get('/vendor/bootstrap/js/bootstrap.min.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/bootstrap/js/bootstrap.min.js')); 
});

app.get('/vendor/select2/select2.min.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/select2/select2.min.js')); 
});

app.get('/vendor/daterangepicker/moment.min.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/daterangepicker/moment.min.js')); 
});

app.get('/vendor/daterangepicker/daterangepicker.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/daterangepicker/daterangepicker.js')); 
});

app.get('/vendor/countdowntime/countdowntime.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/vendor/countdowntime/countdowntime.js')); 
});

app.get('/js/main.js', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/js/main.js')); 
});


// image and other route
app.get('/images/bg-01.jpg', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/images/bg-01.jpg')); 
});

app.get('/fonts/poppins/Poppins-Bold.ttf', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/fonts/poppins/Poppins-Bold.ttf')); 
});

app.get('/fonts/iconic/fonts/Material-Design-Iconic-Font.woff', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/fonts/iconic/fonts/Material-Design-Iconic-Font.woff')); 
});

app.get('/fonts/poppins/Poppins-Regular.ttf', function(req, res){
    res.sendFile(path.resolve('../views/Login_v4/fonts/poppins/Poppins-Regular.ttf')); 
});


*/




app.listen( 3000 , function() {
    console.log(" server started on port 3000 ");
});