const express = require('express');
const os = require('os');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//const serviceAccount = require('./admin/onlineticketing-cd96f-firebase-adminsdk-5hqpa-e836e84434.json');

const app = express();

dotenv.config();
console.log('process.env.NODE_ENV : ',process.env.NODE_ENV);
let serviceAccount;
if (process.env.NODE_ENV === 'production') {
    let private_key;
    if (process.env.private_key) { private_key = process.env.private_key.replace(/\\n/g, '\n'); }
    serviceAccount = {
        type: "service_account",
        project_id: "onlineticketing-cd96f",
        private_key_id: process.env.private_key_id,
        private_key: private_key,
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        auth_uri: "auth_uri",
        token_uri: "token_uri",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.client_x509_cert_url
    };

    app.use(express.static('./client/dist'));
}
else {

    serviceAccount = require('./admin/onlineticketing-cd96f-firebase-adminsdk-5hqpa-e836e84434.json');
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onlineticketing-cd96f.firebaseio.com"
});

console.log('firebase app initialized');

//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('user over');

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

//POST
app.post('/api/u', (req, res) => {
    let user, promise, firebaseApp, properties = {};

    user = req.body;
    properties = {
        email: user.email,
        password: user.password,
        disabled: user.disabled
    };

    //console.log({properties});
    if (user.userID === "") {
        admin.auth()
            .createUser(properties)
            .then((snap) => res.send(snap))
            .catch((err) => res.send(err));
    }
    else {

        admin.auth().updateUser(user.userID, properties)
            .then((snap) => res.send(snap))
            .catch(err => res.send(err));
    }
});

//GET
app.get('/api/u', (req, res) => {
    let users = [];
    admin.auth().listUsers(1000)
        .then(listUserResult => {
            if (listUserResult.users) {
                res.send({ 'users': listUserResult.users });
            } else {
                res.send({ 'error': 'No Users found' });
            }
        })
        .catch(err => res.send(err))
});

//GET with id
app.get('/api/u/:uid', (req, res) => {
    let uid;
    uid = req.params.uid;
    admin.auth().getUser(uid)
        .then(userRecord => {
            res.send(userRecord.toJSON());
        })
        .catch(err => res.send("error : " + err));

});

//Delete
app.delete('/api/u/:uid', (req, res) => {
    let uid;
    //console.log('request recieved');
    uid = req.params.uid;
    admin.auth().deleteUser(uid)
        .then(() => res.send({ 'result': true, 'userID': uid }))
        .catch(err => res.send(err));
});

const PORT = process.env.PORT || 8080;
console.log('PORT : ',PORT);

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT.toString() + '!');
    //console.log(process.env.PORT);
});