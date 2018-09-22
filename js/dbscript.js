var oracledb = require('oracledb');
global.st=-1;

var validator = function(username,password){
    oracledb.getConnection(
        {
          user          : "system",
          password      : "system",
          connectString : "localhost/XE"
        },
        function(err, connection) {
          if(err){
              console.log(err);
          }
          connection.execute("SELECT * FROM users WHERE (username='abc'"+
          "AND password='abc')",function(err,result){
              if(err){
                  console.log(err);
              }
              if(result.rows.length==0){
                  global.st=0;
              }
              else{
                  global.st=1;
                  console.log(global.st);
              }
          })
      });
      return global.st;
}

//console.log(validator("abc","abc"));