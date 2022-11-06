const express = require("express");
var mqqt = require("./controllers/mqtt");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
mongoose.promise = global.Promise;
const app = express();
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "passport-tutorial",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
//utilize router
const router = require("./routes/router");
app.use(router.router);
const UserDetails = require("./controllers/schema/UserDetail");
UserDetails.register({username:'A.Ahmadi', active: false}, 'alireza');
UserDetails.register({username:'P.Abadi', active: false}, 'peyman');
UserDetails.register({username:'Dr.Molaei', active: false}, '123456');
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

var mqtt_publisher = require("./controllers/mqttPublisher");
mqtt_publisher.connect();
exports.mqttGlobalPublisher = mqtt_publisher;

//web socket
// var WebSocketServer = require('ws').Server;
// wss = new WebSocketServer({port: 40510});
var wss = require("./controllers/websocket");
wss.createWebSocket();
exports.wss = wss;

//Start Server
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
