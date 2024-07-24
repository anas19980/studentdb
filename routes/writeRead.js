'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('/students', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.email).digest('hex');
    
    connection.execute(`INSERT INTO students
     (first_name, last_name, email, major, enrollment_year)
     VALUES (?, ?, ?, ?, ?);`, [req.body.first_name, req.body.last_name, req.body.email, req.body.major, req.body.enrollment_year, mypass, ])
        .then(() => {
            console.log('ok');
            res.status(201).send('Insert Successful!')
            
        }).catch((err) => {
            console.log(err);
        });
    res.end();
});

wrRoute.get('/students', function (req, res, next) {
    connection.execute('SELECT * FROM students;')
    .then((result) => {
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
        }).catch((err) => {
            console.log(err);
            res.end();
        });
});
wrRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.email).digest("hex");

    connection.execute('SELECT * FROM students WHERE first_name=? AND email=?;',
    [req.body.first_name, mypass])
    .then((result) => {
        var data = result[0];
        console.log(data);
        if (data.length === 0) {
           res.sendStatus(200);
        } else {
           res.sendStatus(400);
        }
     }).catch((err) => {
        console.log(err);
        res.sendStatus(404);
     });
 
 });
wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = wrRoute;
