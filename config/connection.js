// Dependencies
var mysql = require("mysql");

// Set up MySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
});

// Make connection
connection.connect(function(err) {
    if (err) {
        console.error("err connecting: " + err.stack);
        return;
    }
    console.log("Connected as id: " + connection.threadId);
});

// Export connection for ORM to use
module.exports = connection;