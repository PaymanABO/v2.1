const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const mongoose = require("mongoose");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

var Devices =  require('../controllers/schema/DeviceSchema');
var DeviceGroup =  require('../controllers/schema/GroupDetail');


router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect("/login?info=" + info);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.redirect("/dashboard");
    });
  })(req, res, next);
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render("pages/dashboard", { user: req.user })
);

router.get("/dashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  Devices.find({}, function (err, devices) {
    if (err) {
      console.log(err);
    } else {
      res.render("pages/dashboard", { user: req.user, devices: devices });
      console.log('----------------------------------------')
      console.log(devices)
      console.log('----------------------------------------')
    }
  });
});

router.get(
  "/add_device",
  connectEnsureLogin.ensureLoggedIn(),
  async function (req, res) {
    let groups;
    let devices;
    try {
      groups = await DeviceGroup.find();
    } catch (e) {
      console.log(e);
      groups = [];
    }
    try {
      devices = await Devices.find();
    } catch (e) {
      console.log(e);
      devices = [];
    }
    res.render("pages/add_device", {
      user: req.user,
      groups: groups,
      devices: devices,
    });
  }
);

router.post("/add_device", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  if (req.body.device_type == "P416-4DIO-2AI") {
    var _device_values = {
      do1: false,
      do2: false,
      di1: false,
      di2: false,
      ai1: "0",
      ai2: "0",
    };
  }
  if (req.body.device_type == "P414-4DO") {
    var _device_values = {
      do1: false,
      do2: false,
      do3: false,
      do4: false,
    };
  }

  const device = new Devices({
    device_name: req.body.device_name,
    device_type: req.body.device_type,
    device_group: req.body.device_group,
    device_values: _device_values,
  });
  device.save().then(res.redirect("/add_device"));
});

router.get("/add_group", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  DeviceGroup.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.render("pages/add_group", { user: req.user, groups: docs });
    }
  });
});

router.post("/add_group", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  const device_group = new DeviceGroup({ groupName: req.body.group_name });
  device_group.save().then(res.redirect("/add_group"));
});

router.get("/data_bucket", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render("pages/data_bucket", { user: req.user })
);

router.get("/settings", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render("pages/settings", { user: req.user })
);

module.exports = { router: router };
