// dinsert.js

mysql = require('mysql');

var con = mysql.createConnection({

    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"insurance"

});

con.connect(function(err){

    if(err) throw err;

    console.log('connected.....');



    // AGENT 1

    var a1 = `

    INSERT INTO users(username,password,role)
    VALUES('agent','1234','agent')

    `;



   




    con.query(a1,function(err,result){

        if(err) throw err;

        console.log("agent inserted");

    });




   
});