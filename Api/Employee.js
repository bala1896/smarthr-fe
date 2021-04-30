require('dotenv').config();
const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken')
const connectDB = require('../DB/Conncection');
const verifyToken = require('../DB/token')
connectDB.connect(function(err) {
  if (err) throw err;
  console.log('MySQL connected')
});

route.get('/employee',  verifyToken, (req, res) => {
    connectDB.query("SELECT * FROM employee;", function (err, rows, fields) {
        if (err) {
            res.json(err);
        };
        // console.log(rows);
        const result = Object.values(JSON.parse(JSON.stringify(rows)));
        res.json(rows);
        console.log(result);
        // rows.forEach( (row) => {
        //     console.log(row);
        // });
    });
})

route.post('/runquery',verifyToken, (req, res) => {
  const { sql } = req.body;
  // console.log(sql)
  connectDB.query(sql, function (err, rows) {
      if (err) {
          res.json(err);
      };
      console.log(rows);
      // const result = Object.values(JSON.parse(JSON.stringify(rows)));
      res.json(rows);
      // console.log(result);
  });
});
route.post('/login',   (req, res) => {
    const { user:userIn } = req.body;
    console.log(userIn)
    const sql = `SELECT * FROM user where 
      username = '${userIn['username']}';`
    connectDB.query(sql, function (err, userFound, fields) {
        if (err) {
            res.json(err);
        };
        console.log(userFound);
        const user = Object.values(JSON.parse(JSON.stringify(userFound)));
        console.log(user);
         if (user[0]) {
            if (user[0].password === userIn['password']) {
                let payload = { userId: user[0].id };
                let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
                console.log(token)
                res.status(200).send({ user: user[0], token: token });
            } else {
                res.status(401).send('Invalid User');
            }
        } else {
            res.status(401).send('Invalid User');
        }
    });
})
module.exports = route;