const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json);

const PublicKey = "BP7G7OBxws2hNEU0hUhg1aYtyY2ni0LTtxcv9WmWY8oW23dzz-SVnduWynAbPolhXEw77vH3BVonhlNjJpFvzac";
const PrivateKey = "GxioUvxENCuAg5zn9nbZ_mFnj6K-63uRkFYRFd71Y3I";

webpush.setVapidDetails('mailto:test@test.com', PublicKey, PrivateKey);

//subscribe route

app.post('/subscribe', (req, res) => {
    //get push subscription object

    const subscription = req.body;

    //send 201 status
    req.statusCode(201).json({});

    // create a payload

    const payload = JSON.stringify({ title: 'push test' });

    // pass object into sendNotification
    webpush.sendNotification( subscription, payload ).catch(err => console.log(err));
});

const port = 5000;

app.listen(port, ()=> console.log(`server started on port ${port}`));