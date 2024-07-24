const express = require('express');
const dotenv = require('dotenv');


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const writeRead = require('./routes/writeRead.js');
const updateDelete = require('./routes/updateDelete');

app.use('/wr', writeRead);
app.use('/ud', updateDelete);
app.use('/', function (req, res, next) { 
    res.sendStatus(404);
});

app.get('/api/students',(req,res) => {
    res.json(student)
})

app.listen(PORT, () =>
    console.log('Server running on port: ' + PORT)
    


);