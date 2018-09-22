// var methods = require('./dbscript.js');
// var getProfile = methods.getPr;
// getProfile();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var deletedb = function (){
    MongoClient.connect(url,function(err,db){
        if(err){
            return console.log(err);
        }
        var dbo = db.db("mydb");
        var coll = dbo.collection("products");
        coll.ensureIndex({},{ unique:true, dropDups:true },function(err,res){
            if(err) throw err;
            console.log("successful");
            db.close();
        });
    });
}

deletedb();