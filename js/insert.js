var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var insertdb = function (){
    MongoClient.connect(url,function(err,db){
        if(err){
            return console.log(err);
        }
        var dbo = db.db("mydb");
        var objs = [];
        var coll = dbo.collection("products");
        coll.insertMany(objs,function(err,res){
            if(err) throw err;
            console.log("Inserted "+res.insertedCount);
        });
        db.close();
    });
}

insertdb();