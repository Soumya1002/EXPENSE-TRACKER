const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
app.use(cors());


app.post('/user/signup', (req,res)=>{
    console.log("reqesut received");
    res.send('OK');
});


app.listen(3000);