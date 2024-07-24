'use strict';
const express = require('express');
const udRoute = express.Router();
const connection = require('../db');
udRoute.put('/students/:id', function (req, res, next) {

   connection.execute("UPDATE students SET first_name =?, email =? WHERE student_id=?",
    [req.body.first_name, req.body.email, req.params.uid])
     .then(() => {
       console.log('ok');
    }).catch((err) => {
       console.log(err);
    });

     res.status(200).send('Update Successfully');
});
udRoute.delete('/students/:id', function (req, res, next) {
    connection.execute("DELETE FROM students WHERE student_id=?;",
     [req.params.uid])
      .then(() => {
        console.log('ok');
     }).catch((err) => {
        console.log(err);
     });
      res.end();
 });
 
 udRoute.use('/', function (req, res, next) {
     res.sendStatus(404);
 })
 module.exports = udRoute;