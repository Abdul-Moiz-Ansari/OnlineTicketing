const express = require('express');
const os = require('os');
const admin = require('firebase-admin');
//const firebase = require('firebase');
const bodyParser = require('body-parser');

const serviceAccount = require('./admin/onlineticketing-cd96f-firebase-adminsdk-5hqpa-e836e84434.json');
const dbConfig = require('./admin/dbconfig.json');

const app = express();
//const firebaseApp = firebase.initializeApp(dbConfig);

//const rootRef = firebaseApp.database().ref();
//const userRef = rootRef.child('user');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onlineticketing-cd96f.firebaseio.com"
});


app.use(express.static('./client/dist'));

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

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

//POST
app.post('/api/u', (req, res) => {
    let user, promise, firebaseApp,properties = {};

    user = req.body;
    properties = {
        email : user.email,
        password : user.password,
        disabled : user.disabled
    };

    //console.log({properties});
    if (user.userID === "") {
        admin.auth()
            .createUser(properties)
            .then((snap) => res.send(snap))
            .catch((err) => res.send(err));
    }
    else {              

        admin.auth().updateUser(user.userID,properties)
        .then((snap) => res.send(snap))
        .catch(err => res.send(err));
    }
});

//GET
app.get('/api/u',(req,res) => {
    let users = [];
    admin.auth().listUsers(1000)
    .then(listUserResult => {
        if(listUserResult.users){
            res.send({'users' : listUserResult.users});
        }else{
            res.send({'error' : 'No Users found'});
        }
    })
    .catch(err => res.send(err))
});

//GET with id
app.get('/api/u/:uid',(req,res) => {
    let uid;
    uid = req.params.uid;
    admin.auth().getUser(uid)
    .then(userRecord => {
        res.send(userRecord.toJSON());
    })
    .catch(err => res.send("error : " + err));

});

//Delete
app.delete('/api/u/:uid',(req,res) => {
    let uid;
    //console.log('request recieved');
    uid = req.params.uid;
    admin.auth().deleteUser(uid)
        .then(() => res.send({'result':true,'userID' : uid }) )
        .catch(err => res.send(err));    
});

app.listen(8080, () => console.log('Listening on port 8080!'));