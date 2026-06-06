var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));


/* SESSION  */

app.use(session({

    secret:'insurance',
    resave:false,
    saveUninitialized:true

}));



/* MYSQL CONNECTION */

var con = mysql.createConnection({

    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"insurance"

});


con.connect(function(err){

    if(err) throw err;

    console.log("connected.....");

});



/* ---------------- CSS ---------------- */
var css = `

<style>

/* ==========================
   WHOLE PAGE STYLING
   Applied to entire webpage
   ========================== */
body{
    font-family:Arial, sans-serif;      /* Font used throughout application */
    background:rgb(240,242,245);        /* Light gray page background */
    margin:0;                           /* Removes default browser margin */
    padding:0;                          /* Removes default browser padding */
}

/* ==========================
   TOP NAVIGATION BAR
   Contains Home, Login, Logout links
   ========================== */
.navbar{
    background:rgb(0,102,204);          /* Blue navigation bar */
    padding:15px;                       /* Space inside navbar */
    text-align:right;                   /* Align links to right side */
}

/* Navigation links */
.navbar a{
    color:white;                        /* White text */
    text-decoration:none;               /* Removes underline */
    margin-left:15px;                   /* Gap between links */
    font-weight:bold;                   /* Bold text */
    padding:8px 12px;                   /* Button-like appearance */
    border-radius:5px;                  /* Rounded corners */
}

/* Mouse hover effect on navbar links */
.navbar a:hover{
    background:rgb(0,76,153);
}

/* ==========================
   GENERAL CONTENT CONTAINER
   Used for forms, tables, dashboards
   ========================== */
.container{
    width:800px;                        /* Fixed width */
    margin:30px auto;                   /* Center container */
    background:rgb(255,255,255);        /* White background */
    padding:20px;                       /* Inner spacing */
    border-radius:8px;                  /* Rounded corners */
    box-shadow:0px 2px 5px rgb(180,180,180);
}

/* ==========================
   LOGIN PAGE CONTAINER
   Holds Agent Login & Customer Login boxes
   ========================== */
.login-container{
    width:900px;
    margin:40px auto;                   /* Center login section */
    display:flex;                       /* Flexbox layout */
    justify-content:space-between;      /* Boxes side by side */
    gap:50px;                           /* Space between boxes */
}

/* ==========================
   LOGIN BOX DESIGN
   Used for Agent Login and Customer Login
   ========================== */
.box{
    width:45%;                          /* Each box takes 45% width */
    background:rgb(255,255,255);
    padding:20px;
    border-radius:8px;
    box-shadow:0px 2px 5px rgb(180,180,180);
}

/* Hover effect on login boxes */
.box:hover{
    box-shadow:0px 4px 10px rgb(150,150,150);
}

/* ==========================
   AGENT LOGIN BOX
   Blue top border
   ========================== */
.agent{
    border-top:4px solid rgb(0,102,204);
}

/* ==========================
   CUSTOMER LOGIN BOX
   Green top border
   ========================== */
.customer{
    border-top:4px solid rgb(0,153,76);
}

/* ==========================
   HEADINGS
   Used for page titles and section titles
   ========================== */
h1,h2,h3{
    text-align:center;
    color:rgb(50,50,50);
}

/* ==========================
   FORM INPUT FIELDS
   Textboxes and dropdowns
   ========================== */
input,select{
    width:100%;                         /* Full width */
    padding:10px;
    margin-top:10px;
    margin-bottom:10px;
    border:1px solid rgb(180,180,180);
    border-radius:5px;
    box-sizing:border-box;              /* Includes padding in width */
}

/* Focus effect when user clicks textbox */
input:focus,
select:focus{
    border:2px solid rgb(0,102,204);
    outline:none;
}

/* ==========================
   BUTTONS
   Login, Register, Apply Policy,
   Submit Claim, etc.
   ========================== */
button{
    width:100%;
    padding:10px;
    background:rgb(0,102,204);
    color:white;
    border:none;
    border-radius:5px;
    cursor:pointer;
    font-size:15px;
    font-weight:bold;
}

/* Button hover effect */
button:hover{
    background:rgb(0,76,153);
}

/* ==========================
   TABLE DESIGN
   Used for policy list, claims,
   customers, payment status, etc.
   ========================== */
table{
    width:100%;
    border-collapse:collapse;
    margin-top:20px;
}

/* Table header row */
th{
    background:rgb(0,102,204);
    color:white;
}

/* Table cells */
th,td{
    border:1px solid rgb(180,180,180);
    padding:10px;
    text-align:center;
}

/* Hover effect on table rows */
tr:hover{
    background:rgb(220,235,255);
}

/* ==========================
   MESSAGE BOX
   Used for success/error messages
   ========================== */
.message{
    width:400px;
    margin:50px auto;
    background:rgb(255,255,255);
    padding:20px;
    text-align:center;
    border-radius:8px;
    box-shadow:0px 2px 5px rgb(180,180,180);
}

/* ==========================
   FORM LABELS
   Example:
   Username:
   Password:
   Policy Name:
   ========================== */
label{
    font-weight:bold;
}

</style>

`;
/* ---------------- HOME PAGE ---------------- */

app.get('/',function(req,res){

    res.send(`

    <html>

    <head>

    <title>Insurance Policy Management</title>

    ${css}

    </head>

    <body>

    <div class="home-hero">
    <h1>&#x1F6E1; Insurance Policy Management System</h1>
    </div>

    <div class="login-container">


    <div class="box agent">

    <h2>&#x1F464; Agent Login</h2>

    <form method="POST" action="/login">

    <input type="hidden" name="role" value="agent">

    <input type="text"
    name="username"
    placeholder="Enter Agent Username"
    required>

    <input type="password"
    name="password"
    placeholder="Enter Password"
    required>

    <button type="submit">
    Agent Login
    </button>

    </form>

    </div>




    <div class="box customer">

    <h2>&#x1F468;&#x200D;&#x1F4BC; Customer Login</h2>

    <form method="POST" action="/login">

    <input type="hidden" name="role" value="customer">

    <input type="text"
    name="username"
    placeholder="Enter Customer Username"
    required>

    <input type="password"
    name="password"
    placeholder="Enter Password"
    required>

    <button type="submit">
    Customer Login
    </button>

    </form>

    <br>

    <center>

    <a href="/register">
    New Customer? Register Here
    </a>

    </center>

    </div>

    </div>

    </body>

    </html>

    `);

});



/* REGISTER PAGE */

app.get('/register',function(req,res){

    res.send(`

    <html>

    <head>

    <title>Customer Registration</title>

    ${css}

    </head>

    <body>

    <div class="container">

    <h1>&#x270D; Customer Registration</h1>

    <form method="POST" action="/registerdata">

    <label>Username</label>
    <input type="text"
    name="username"
    placeholder="Enter Username"
    required>

    <label>Password</label>
    <input type="password"
    name="password"
    placeholder="Enter Password"
    required>

    <button type="submit">
    Register
    </button>

    </form>

    <br>
    <center><a href="/">Back to Login</a></center>

    </div>

    </body>

    </html>

    `);

});



/* REGISTER DATA */

app.post('/registerdata',function(req,res){

    var username=req.body.username;
    var password=req.body.password;

    var sql=`

    INSERT INTO users(username,password,role)
    VALUES(?,?,?)

    `;

    con.query(sql,[username,password,'customer'],function(err,result){

        if(err) throw err;

        res.send(`

        <html>

        <head>

        <title>Registration Successful</title>

        ${css}

        </head>

        <body>

        <div class="message">

        <h2>&#x2705; Registration Successful</h2>

        <p>Your account has been created. Please login to continue.</p>

        <a href="/">
        <button>
        Login Now
        </button>
        </a>

        </div>

        </body>

        </html>

        `);

    });

});



/*  LOGIN  */

app.post('/login',function(req,res){

    var username=req.body.username;
    var password=req.body.password;
    var role=req.body.role;

    var sql=`

    SELECT * FROM users
    WHERE username=? AND password=? AND role=?

    `;

    con.query(sql,[username,password,role],function(err,result){

        if(err) throw err;

        if(result.length>0){

            req.session.username = username;
            req.session.role = role;

            if(role=="agent")
            {
                res.redirect('/agent');
            }
            else
            {
                res.redirect('/customer');
            }

        }

        else{

            res.send(`

            <html>

            <head>

            <title>Invalid Login</title>

            ${css}

            </head>

            <body>

            <div class="message">

            <h2>&#x274C; Invalid Login</h2>

            <p>Username or password is incorrect. Please try again.</p>

            <a href="/">
            <button>
            Try Again
            </button>
            </a>

            </div>

            </body>

            </html>

            `);

        }

    });

});



/* LOGOut */

app.get('/logout',function(req,res){

    req.session.destroy();

    res.redirect('/');

});



/*  AGENT DASHBOARD  */

app.get('/agent',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    con.query("SELECT * FROM policy",function(err,result){

        if(err) throw err;

        var output=`

        <html>

        <head>

        <title>Agent Dashboard</title>

        ${css}

        </head>

        <body>


        <div class="navbar">

        <a href="/agent">Home</a>
        <a href="/addpolicypage">Add Policy</a>
        <a href="/updatepolicy">Update Policy</a>
        <a href="/viewclaims">Manage Claims</a>
        <a href="/paymentpage">Add Payment</a>
        <a href="/viewpayments">Payments</a>
        <a href="/logout">Logout</a>

        </div>


        <div class="container">

        <h1>&#x1F4CB; Welcome, ${req.session.username}</h1>

        <h2>All Policy Details</h2>

        <table>

        <tr>

        <th>ID</th>
        <th>Policy Name</th>
        <th>Policy Type</th>
        <th>Premium (&#x20B9;)</th>
        <th>Coverage (&#x20B9;)</th>

        </tr>

        `;

        result.forEach(function(p){

            output+=`

            <tr>

            <td>${p.id}</td>
            <td>${p.policy_name}</td>
            <td>${p.policy_type}</td>
            <td>${p.premium}</td>
            <td>${p.coverage}</td>

            </tr>

            `;

        });

        output+=`

        </table>

        </div>

        </body>

        </html>

        `;

        res.send(output);

    });

});



/*  ADD POLICY PAGE */

app.get('/addpolicypage',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    res.send(`

    <html>

    <head>

    <title>Add Policy</title>

    ${css}

    </head>

    <body>

    <div class="navbar">

    <a href="/agent">Home</a>
    <a href="/addpolicypage">Add Policy</a>
    <a href="/updatepolicy">Update Policy</a>
    <a href="/viewclaims">Manage Claims</a>
    <a href="/paymentpage">Add Payment</a>
    <a href="/viewpayments">Payments</a>
    <a href="/logout">Logout</a>

    </div>

    <div class="container">

    <h1>&#x2795; Add New Policy</h1>

    <form method="POST" action="/addpolicy">

    <label>Policy Name</label>
    <input type="text"
    name="policy_name"
    placeholder="Enter Policy Name"
    required>

    <label>Policy Type</label>
    <select name="policy_type" required>
    <option value="">-- Select Policy Type --</option>
    <option value="Life">Life</option>
    <option value="Health">Health</option>
    <option value="Vehicle">Vehicle</option>
    <option value="Property">Property</option>
    <option value="Travel">Travel</option>
    </select>

    <label>Premium Amount (&#x20B9;)</label>
    <input type="number"
    name="premium"
    placeholder="Enter Premium Amount"
    min="0"
    required>

    <label>Coverage Amount (&#x20B9;)</label>
    <input type="number"
    name="coverage"
    placeholder="Enter Coverage Amount"
    min="0"
    required>

    <button type="submit">
    Add Policy
    </button>

    </form>

    </div>

    </body>

    </html>

    `);

});



/*  ADD POLICY DATA  */

app.post('/addpolicy',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    var policy_name=req.body.policy_name;
    var policy_type=req.body.policy_type;
    var premium=req.body.premium;
    var coverage=req.body.coverage;

    var sql=`

    INSERT INTO policy(policy_name,policy_type,premium,coverage)
    VALUES(?,?,?,?)

    `;

    con.query(sql,[policy_name,policy_type,premium,coverage],function(err,result){

        if(err) throw err;

        res.send(`

        <html>

        <head>

        <title>Policy Added</title>

        ${css}

        </head>

        <body>

        <div class="message">

        <h2>&#x2705; Policy Added Successfully</h2>

        <p>The new insurance policy has been added to the system.</p>

        <a href="/agent">
        <button>
        Go to Dashboard
        </button>
        </a>

        </div>

        </body>

        </html>

        `);

    });

});



/*  UPDATE POLICY PAGE  */

app.get('/updatepolicy',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    con.query("SELECT * FROM policy",function(err,result){

        if(err) throw err;

        var output=`

        <html>

        <head>

        <title>Update Policy</title>

        ${css}

        </head>

        <body>

        <div class="navbar">

        <a href="/agent">Home</a>
        <a href="/addpolicypage">Add Policy</a>
        <a href="/updatepolicy">Update Policy</a>
        <a href="/viewclaims">Manage Claims</a>
        <a href="/paymentpage">Add Payment</a>
        <a href="/viewpayments">Payments</a>
        <a href="/logout">Logout</a>

        </div>

        <div class="container">

        <h1>&#x270F; Update Policy</h1>

        <form method="POST" action="/updatepolicydata">

        <label>Select Policy to Update</label>
        <select name="id" required>
        <option value="">-- Select Policy --</option>

        `;

        result.forEach(function(p){

            output+=`<option value="${p.id}">${p.id} - ${p.policy_name}</option>`;

        });

        output+=`

        </select>

        <label>New Policy Name</label>
        <input type="text"
        name="policy_name"
        placeholder="Enter New Policy Name"
        required>

        <label>New Policy Type</label>
        <select name="policy_type" required>
        <option value="">-- Select Policy Type --</option>
        <option value="Life">Life</option>
        <option value="Health">Health</option>
        <option value="Vehicle">Vehicle</option>
        <option value="Property">Property</option>
        <option value="Travel">Travel</option>
        </select>

        <label>New Premium Amount (&#x20B9;)</label>
        <input type="number"
        name="premium"
        placeholder="Enter New Premium Amount"
        min="0"
        required>

        <label>New Coverage Amount (&#x20B9;)</label>
        <input type="number"
        name="coverage"
        placeholder="Enter New Coverage Amount"
        min="0"
        required>

        <button type="submit">
        Update Policy
        </button>

        </form>

        </div>

        </body>

        </html>

        `;

        res.send(output);

    });

});



/*UPDATE POLICY DATA */

app.post('/updatepolicydata',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    var id=req.body.id;
    var policy_name=req.body.policy_name;
    var policy_type=req.body.policy_type;
    var premium=req.body.premium;
    var coverage=req.body.coverage;

    var sql=`

    UPDATE policy
    SET policy_name=?,policy_type=?,premium=?,coverage=?
    WHERE id=?

    `;

    con.query(sql,[policy_name,policy_type,premium,coverage,id],function(err,result){

        if(err) throw err;

        res.send(`

        <html>

        <head>

        <title>Policy Updated</title>

        ${css}

        </head>

        <body>

        <div class="message">

        <h2>&#x2705; Policy Updated Successfully</h2>

        <p>The insurance policy details have been updated.</p>

        <a href="/agent">
        <button>
        Go to Dashboard
        </button>
        </a>

        </div>

        </body>

        </html>

        `);

    });

});



/*  VIEW & MANAGE CLAIMS (AGENT)  */

app.get('/viewclaims',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    con.query("SELECT * FROM claims",function(err,result){

        if(err) throw err;

        var output=`

        <html>

        <head>

        <title>All Claims</title>

        ${css}

        </head>

        <body>

        <div class="navbar">

        <a href="/agent">Home</a>
        <a href="/addpolicypage">Add Policy</a>
        <a href="/updatepolicy">Update Policy</a>
        <a href="/viewclaims">Manage Claims</a>
        <a href="/paymentpage">Add Payment</a>
        <a href="/viewpayments">Payments</a>
        <a href="/logout">Logout</a>

        </div>

        <div class="container">

        <h1>&#x1F4CB; All Customer Claims</h1>

        <table>

        <tr>

        <th>ID</th>
        <th>Customer Name</th>
        <th>Policy Name</th>
        <th>Policy Type</th>
        <th>Claim Amount (&#x20B9;)</th>
        <th>Claim Status</th>
        <th>Update Status</th>

        </tr>

        `;

        result.forEach(function(c){

            var badge = c.claim_status=="Approved"
                ? `<span class="badge-approved">${c.claim_status}</span>`
                : c.claim_status=="Rejected"
                ? `<span class="badge-rejected">${c.claim_status}</span>`
                : `<span class="badge-pending">${c.claim_status}</span>`;

            output+=`

            <tr>

            <td>${c.id}</td>
            <td>${c.customer_name}</td>
            <td>${c.policy_name}</td>
            <td>${c.policy_type}</td>
            <td>${c.claim_amount}</td>
            <td>${badge}</td>
            <td>
            <form method="POST" action="/updateclaimstatus" style="display:flex;gap:6px;justify-content:center;">
            <input type="hidden" name="id" value="${c.id}">
            <select name="claim_status" style="width:130px;margin-top:0;padding:6px 8px;font-size:13px;">
            <option value="Pending" ${c.claim_status=='Pending'?'selected':''}>Pending</option>
            <option value="Approved" ${c.claim_status=='Approved'?'selected':''}>Approved</option>
            <option value="Rejected" ${c.claim_status=='Rejected'?'selected':''}>Rejected</option>
            </select>
            <button type="submit" style="width:70px;margin-top:0;padding:6px 8px;font-size:13px;">Update</button>
            </form>
            </td>

            </tr>

            `;

        });

        output+=`

        </table>

        </div>

        </body>

        </html>

        `;

        res.send(output);

    });

});



/*  UPDATE CLAIM STATUS (AGENT) */

app.post('/updateclaimstatus',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    var id=req.body.id;
    var claim_status=req.body.claim_status;

    var sql=`UPDATE claims SET claim_status=? WHERE id=?`;

    con.query(sql,[claim_status,id],function(err,result){

        if(err) throw err;

        res.send(`

        <html>

        <head>

        <title>Claim Updated</title>

        ${css}

        </head>

        <body>

        <div class="message">

        <h2>&#x2705; Claim Status Updated</h2>

        <p>The claim status has been updated successfully.</p>

        <a href="/viewclaims">
        <button>
        Back to Claims
        </button>
        </a>

        </div>

        </body>

        </html>

        `);

    });

});



/* ADD PAYMENT PAGE (AGENT)  */

app.get('/paymentpage',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    res.send(`

    <html>

    <head>

    <title>Add Payment</title>

    ${css}

    </head>

    <body>

    <div class="navbar">

    <a href="/agent">Home</a>
    <a href="/addpolicypage">Add Policy</a>
    <a href="/updatepolicy">Update Policy</a>
    <a href="/viewclaims">Manage Claims</a>
    <a href="/paymentpage">Add Payment</a>
    <a href="/viewpayments">Payments</a>
    <a href="/logout">Logout</a>

    </div>

    <div class="container">

    <h1>&#x1F4B3; Add Payment Record</h1>

    <form method="POST" action="/addpayment">

    <label>Customer Name</label>
    <input type="text"
    name="customer_name"
    placeholder="Enter Customer Name"
    required>

    <label>Policy Name</label>
    <input type="text"
    name="policy_name"
    placeholder="Enter Policy Name"
    required>

    <label>Amount Paid (&#x20B9;)</label>
    <input type="number"
    name="amount"
    placeholder="Enter Amount Paid"
    min="0"
    required>

    <label>Payment Date</label>
    <input type="date"
    name="payment_date"
    required>

    <button type="submit">
    Add Payment
    </button>

    </form>

    </div>

    </body>

    </html>

    `);

});



/* ADD PAYMENT DATA  */

app.post('/addpayment',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    var customer_name=req.body.customer_name;
    var policy_name=req.body.policy_name;
    var amount=req.body.amount;
    var payment_date=req.body.payment_date;

    var sql=`

    INSERT INTO payments(customer_name,policy_name,amount_paid,payment_date)
    VALUES(?,?,?,?)

    `;

    con.query(sql,[customer_name,policy_name,amount,payment_date],function(err,result){

        if(err) throw err;

        res.send(`

        <html>

        <head>

        <title>Payment Added</title>

        ${css}

        </head>

        <body>

        <div class="message">

        <h2>&#x2705; Payment Recorded Successfully</h2>

        <p>The payment record has been saved in the system.</p>

        <a href="/viewpayments">
        <button>
        View All Payments
        </button>
        </a>

        </div>

        </body>

        </html>

        `);

    });

});



/* VIEW PAYMENTS (AGENT) */

app.get('/viewpayments',function(req,res){

    if(req.session.role!="agent")
    {
        return res.redirect('/');
    }

    con.query("SELECT * FROM payments",function(err,result){

        if(err) throw err;

        var output=`

        <html>

        <head>

        <title>All Payments</title>

        ${css}

        </head>

        <body>

        <div class="navbar">

        <a href="/agent">Home</a>
        <a href="/addpolicypage">Add Policy</a>
        <a href="/updatepolicy">Update Policy</a>
        <a href="/viewclaims">Manage Claims</a>
        <a href="/paymentpage">Add Payment</a>
        <a href="/viewpayments">Payments</a>
        <a href="/logout">Logout</a>

        </div>

        <div class="container">

        <h1>&#x1F4B0; All Payment Records</h1>

        <table>

        <tr>

        <th>ID</th>
        <th>Customer Name</th>
        <th>Policy Name</th>
        <th>Amount (&#x20B9;)</th>
        <th>Payment Date</th>

        </tr>

        `;

        result.forEach(function(p){

            output+=`

            <tr>

            <td>${p.id}</td>
            <td>${p.customer_name}</td>
            <td>${p.policy_name}</td>
            <td>${p.amount_paid}</td>
            <td>${p.payment_date}</td>

            </tr>

            `;

        });

        output+=`

        </table>

        </div>

        </body>

        </html>

        `;

        res.send(output);

    });

});



/* CUSTOMER DASHBOARD */

app.get('/customer',function(req,res){

    if(req.session.role!="customer")
    {
        return res.redirect('/');
    }

    con.query("SELECT * FROM policy",function(err,result){

        if(err) throw err;

        var output=`

        <html>

        <head>

        <title>Customer Dashboard</title>

        ${css}

        </head>

        <body>


        <div class="navbar">

        <a href="/customer">Home</a>
        <a href="/applypage">Apply Policy</a>
        <a href="/myapplications">My Applications</a>
        <a href="/claimpage">Submit Claim</a>
        <a href="/viewclaimpage">Claim Status</a>
        <a href="/mypayments">My Payments</a>
        <a href="/logout">Logout</a>

        </div>


        <div class="container">

        <h1>&#x1F44B; Welcome, ${req.session.username}</h1>

        <h2>Available Policies</h2>

        <table>

        <tr>

        <th>ID</th>
        <th>Policy Name</th>
        <th>Policy Type</th>
        <th>Premium (&#x20B9;)</th>
        <th>Coverage (&#x20B9;)</th>

        </tr>

        `;

        result.forEach(function(p){

            output+=`

            <tr>

            <td>${p.id}</td>
            <td>${p.policy_name}</td>
            <td>${p.policy_type}</td>
            <td>${p.premium}</td>
            <td>${p.coverage}</td>

            </tr>

            `;

        });

        output+=`

        </table>

        </div>

        </body>

        </html>

        `;

        res.send(output);

    });

});



/*  APPLY POLICY PAGE*/

app.get('/applypage',function(req,res){

    if(req.session.role!="customer")
    {
        return res.redirect('/');
    }

    res.send(`

    <html>

    <head>

    <title>Apply for Policy</title>

    ${css}

    </head>

    <body>

    <div class="navbar">

    <a href="/customer">Home</a>
    <a href="/applypage">Apply Policy</a>
    <a href="/myapplications">My Applications</a>
    <a href="/claimpage">Submit Claim</a>
    <a href="/viewclaimpage">Claim Status</a>
    <a href="/mypayments">My Payments</a>
    <a href="/logout">Logout</a>

    </div>

    <div class="container">

    <h1>&#x1F4C4; Apply for Policy</h1>

    <form method="POST" action="/apply">

    <label>Policy Name</label>
    <input type="text"
    name="policy_name"
    placeholder="Enter Policy Name"
    required>

    <label>Policy Type</label>
    <select name="policy_type" required>
    <option value="">-- Select Policy Type --</option>
    <option value="Life">Life</option>
    <option value="Health">Health</option>
    <option value="Vehicle">Vehicle</option>
    <option value="Property">Property</option>
    <option value="Travel">Travel</option>
    </select>

    <button type="submit">
    Apply Policy
    </button>

    </form>

    </div>

    </body>

    </html>

    `);

});



/* APPLY  */

app.post('/apply',function(req,res){

    var username=req.session.username;
    var policy=req.body.policy_name;
    var policy_type=req.body.policy_type;

    var sql=`

    INSERT INTO applications(customer_name,policy_name,policy_type,status)
    VALUES(?,?,?,?)

    `;

    con.query(sql,[username,policy,policy_type,'Approved'],function(err,result){

        if(err) throw err;

        res.send(`

        <html>

        <head>

        <title>Application Submitted</title>

        ${css}

        </head>

        <body>

        <div class="message">

        <h2>&#x2705; Application Submitted</h2>

        <p>Your policy application has been submitted and is under review.</p>

        <a href="/customer">
        <button>
        Go to Dashboard
        </button>
        </a>

        </div>

        </body>

        </html>

        `);

    });

});



/* MY APPLICATIONS (CUSTOMER) */

app.get('/myapplications',function(req,res){

    if(req.session.role!="customer")
    {
        return res.redirect('/');
    }

    var username=req.session.username;

    var sql="SELECT * FROM applications WHERE customer_name=?";

    con.query(sql,[username],function(err,result){

        if(err) throw err;

        var output=`

        <html>

        <head>

        <title>My Applications</title>

        ${css}

        </head>

        <body>

        <div class="navbar">

        <a href="/customer">Home</a>
        <a href="/applypage">Apply Policy</a>
        <a href="/myapplications">My Applications</a>
        <a href="/claimpage">Submit Claim</a>
        <a href="/viewclaimpage">Claim Status</a>
        <a href="/mypayments">My Payments</a>
        <a href="/logout">Logout</a>

        </div>

        <div class="container">

        <h1>&#x1F4C4; My Applied Schemes</h1>

        <table>

        <tr>

        <th>ID</th>
        <th>Policy Name</th>
        <th>Policy Type</th>
        

        </tr>

        `;

        result.forEach(function(a){

            output+=`

            <tr>

            <td>${a.id}</td>
            <td>${a.policy_name}</td>
            <td>${a.policy_type}</td>
          

            </tr>

            `;

        });

        output+=`

        </table>

        </div>

        </body>

        </html>

        `;

        res.send(output);

    });

});



/* SUBMIT CLAIM PAGE (CUSTOMER)*/

app.get('/claimpage',function(req,res){

    if(req.session.role!="customer")
    {
        return res.redirect('/');
    }

    res.send(`

    <html>

    <head>

    <title>Submit Claim</title>

    ${css}

    </head>

    <body>

    <div class="navbar">

    <a href="/customer">Home</a>
    <a href="/applypage">Apply Policy</a>
    <a href="/myapplications">My Applications</a>
    <a href="/claimpage">Submit Claim</a>
    <a href="/viewclaimpage">Claim Status</a>
    <a href="/mypayments">My Payments</a>
    <a href="/logout">Logout</a>

    </div>

    <div class="container">

    <h1>&#x1F4DD; Submit a Claim</h1>

    <form method="POST" action="/addclaim">

    <label>Policy Name</label>
    <input type="text"
    name="policy_name"
    placeholder="Enter Policy Name"
    required>

    <label>Policy Type</label>
    <select name="policy_type" required>
    <option value="">-- Select Policy Type --</option>
    <option value="Life">Life</option>
    <option value="Health">Health</option>
    <option value="Vehicle">Vehicle</option>
    <option value="Property">Property</option>
    <option value="Travel">Travel</option>
    </select>

    <label>Claim Amount (&#x20B9;)</label>
    <input type="number"
    name="claim_amount"
    placeholder="Enter Claim Amount"
    min="0"
    required>

    <button type="submit">
    Submit Claim
    </button>

    </form>

    </div>

    </body>

    </html>

    `);

});



/* ADD CLAIM DATA (CUSTOMER)  */

app.post('/addclaim',function(req,res){

    if(req.session.role!="customer")
    {
        return res.redirect('/');
    }

    var customer_name=req.session.username;
    var policy_name=req.body.policy_name;
    var policy_type=req.body.policy_type;
    var claim_amount=req.body.claim_amount;

    var sql=`

    INSERT INTO claims(customer_name,policy_name,policy_type,claim_amount,claim_status)
    VALUES(?,?,?,?,?)

    `;

    con.query(sql,[customer_name,policy_name,policy_type,claim_amount,'Pending'],function(err,result){

        if(err) throw err;

        res.send(`

        <html>

        <head>

        <title>Claim Submitted</title>

        ${css}

        </head>

        <body>

        <div class="message">

        <h2>&#x2705; Claim Submitted Successfully</h2>

        <p>Your claim has been submitted and is pending review by the agent.</p>

        <a href="/viewclaimpage">
        <button>
        View Claim Status
        </button>
        </a>

        </div>

        </body>

        </html>

        `);

    });

});



/*  VIEW CLAIM PAGE (CUSTOMER)  */

app.get('/viewclaimpage',function(req,res){

    if(req.session.role!="customer")
    {
        return res.redirect('/');
    }

    var username=req.session.username;

    var sql="SELECT * FROM claims WHERE customer_name=?";

    con.query(sql,[username],function(err,result){

        if(err) throw err;

        var output=`

        <html>

        <head>

        <title>My Claim Status</title>

        ${css}

        </head>

        <body>

        <div class="navbar">

        <a href="/customer">Home</a>
        <a href="/applypage">Apply Policy</a>
        <a href="/myapplications">My Applications</a>
        <a href="/claimpage">Submit Claim</a>
        <a href="/viewclaimpage">Claim Status</a>
        <a href="/mypayments">My Payments</a>
        <a href="/logout">Logout</a>

        </div>

        <div class="container">

        <h1>&#x1F4CB; My Claim Status</h1>

        <table>

        <tr>

        <th>ID</th>
        <th>Customer</th>
        <th>Policy Name</th>
        <th>Policy Type</th>
        <th>Amount (&#x20B9;)</th>
        <th>Status</th>

        </tr>

        `;

        result.forEach(function(c){

            var badge = c.claim_status=="Approved"
                ? `<span class="badge-approved">${c.claim_status}</span>`
                : c.claim_status=="Rejected"
                ? `<span class="badge-rejected">${c.claim_status}</span>`
                : `<span class="badge-pending">${c.claim_status}</span>`;

            output+=`

            <tr>

            <td>${c.id}</td>
            <td>${c.customer_name}</td>
            <td>${c.policy_name}</td>
            <td>${c.policy_type}</td>
            <td>${c.claim_amount}</td>
            <td>${badge}</td>

            </tr>

            `;

        });

        output+=`

        </table>

        </div>

        </body>

        </html>

        `;

        res.send(output);

    });

});



/* MY PAYMENTS (CUSTOMER)*/

app.get('/mypayments',function(req,res){

    if(req.session.role!="customer")
    {
        return res.redirect('/');
    }

    var username=req.session.username;

    var sql="SELECT * FROM payments WHERE customer_name=?";

    con.query(sql,[username],function(err,result){

        if(err) throw err;

        var output=`

        <html>

        <head>

        <title>My Payment Status</title>

        ${css}

        </head>

        <body>

        <div class="navbar">

        <a href="/customer">Home</a>
        <a href="/applypage">Apply Policy</a>
        <a href="/myapplications">My Applications</a>
        <a href="/claimpage">Submit Claim</a>
        <a href="/viewclaimpage">Claim Status</a>
        <a href="/mypayments">My Payments</a>
        <a href="/logout">Logout</a>

        </div>

        <div class="container">

        <h1>&#x1F4B0; My Payment Status</h1>

        <table>

        <tr>

        <th>ID</th>
        <th>Policy Name</th>
        <th>Amount (&#x20B9;)</th>
        <th>Payment Date</th>

        </tr>

        `;

        result.forEach(function(p){

            output+=`

            <tr>

            <td>${p.id}</td>
            <td>${p.policy_name}</td>
            <td>${p.amount_paid}</td>
            <td>${p.payment_date}</td>

            </tr>

            `;

        });

        output+=`

        </table>

        </div>

        </body>

        </html>

        `;

        res.send(output);

    });

});



/* SERVER  */

app.listen(3000,function(){

    console.log("server running on port 3000");

});