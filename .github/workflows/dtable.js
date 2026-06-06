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


    var users = `

    CREATE TABLE users(

    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    role VARCHAR(50)

    )

    `;



    // ================= POLICY TABLE =================

    var policy = `

    CREATE TABLE policy(

    id INT AUTO_INCREMENT PRIMARY KEY,
    policy_name VARCHAR(100),
    policy_type VARCHAR(100),
    premium INT,
    coverage INT

    )

    `;





    var claims = `

    CREATE TABLE claims(

    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    policy_name VARCHAR(100),
    policy_type VARCHAR(100),
    claim_amount INT,
    claim_status VARCHAR(50)

    )

    `;



    var payments = `

    CREATE TABLE payments(

    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    policy_name VARCHAR(100),
    amount_paid INT,
    payment_date VARCHAR(50),
    payment_status VARCHAR(50)

    )

    `;



    var applications = `

    CREATE TABLE applications(

    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    policy_name VARCHAR(100),
    policy_type VARCHAR(100),
    status VARCHAR(50)

    )

    `;



    con.query(users,function(err,result){

        if(err) throw err;

        console.log("users table created");

    });



    con.query(policy,function(err,result){

        if(err) throw err;

        console.log("policy table created");

    });



    con.query(claims,function(err,result){

        if(err) throw err;

        console.log("claims table created");

    });



    con.query(payments,function(err,result){

        if(err) throw err;

        console.log("payments table created");

    });


    con.query(applications,function(err,result){

        if(err) throw err;

        console.log("applications table created");

    });

});