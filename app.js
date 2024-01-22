const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const sequelize = require('./util/database');
const User = require('./models/user');
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.post('/user/signup', async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const saltRounds = 10; 
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const data = await User.create({ name: name, email: email, password: hash })
            res.status(201).json({ data: data });
        })
    }
    catch (err) {       
        res.status(403).json({
            error: err
        })
    }
});

app.post('/user/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({
            where: {
                email: email, 
            }
        });
        if (user) {
            bcrypt.compare(password, user.dataValues.password, (err, result) => {
                if (result) {
                    console.log('Credentials are valid');
                    res.status(201).json({ message: 'Login Successful' });
                }
                else {
                    console.log('Invalid Credentials ');
                    res.status(401).json({ message: 'Password Does Not Match' });
                }
            })
        }
        else {
            console.log('User Not Found');
            res.status(404).json({ message: 'User Not Found' });
        }
    }
    catch (err) {
        res.status(404).json({
            error: err
        })
    }
});
sequelize.sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })