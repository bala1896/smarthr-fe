var mysql = require('mysql');

var connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "labee123",
  database: "hr"
});


module.exports = connectDB;
