var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var getvalues = function (callback,username,passwd){
    MongoClient.connect(url,function(err,db){
        if(err){
            return console.log(err);
        }
        var dbo = db.db("mydb");
        var coll = dbo.collection("users");
        coll.findOne({name:username,password:passwd},{_id:0,name:1,password:1},function(err,res){
            if(err) throw err;
            db.close();
            return callback(res);
        })
    });
}

var getitems = function(callback){
    MongoClient.connect(url,function(err,db){
        if(err){
            return console.log(err);
        }
        var dbo = db.db("mydb");
        var coll = dbo.collection("products");
        coll.find({},{_id:0,name:1}).toArray(function(err,res){
            if(err) throw err;
            db.close();
            return callback(res);
        })
    });
}

var getProfile = function(callback,username){
    MongoClient.connect(url,function(err,db){
        if(err){
            return console.log(err);
        }
        var dbo = db.db("mydb");
        var coll = dbo.collection("users");
        coll.findOne({name:username},{_id:0,name:1},function(err,res){
            if(err) throw err;
            return callback(res);
            db.close();
        })
    });
}

var methodExports = {
    getval:getvalues,
    getit:getitems,
    getPr:getProfile
}
module.exports = methodExports;