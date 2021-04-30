const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


app.use(express.json({ extended: false }));

app.use('/api', require('./Api/Employee'));
app.use('/apipool', require('./Api/api'));

app.get('*',(req,res)=>{
    // res.status(404);
    // res.send('<h1>Page not found 404</h1>');
    res.status(404).send('<h1>Page not found 404</h1>');
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))