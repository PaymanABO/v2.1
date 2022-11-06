var mqtt = require("mqtt");
const mongoose = require("mongoose");
var Devices = require("../controllers/schema/DeviceSchema");
var client = mqtt.connect("mqtt://services.irn2.chabokan.net:14211", { clientId: "mqtffqtjs01",clean: true,
connectTimeout: 4000,
username: 'james',
password: 'IrpK4hCeNWA9eaSx',
reconnectPeriod: 1000, });

client.on("message", async function (topic, message, packet) {
  const topicSplitArray = topic.split("/");
  console.log("recieved mqtt msg");
  var updatedValue;
  var recievedValue = message.toString();

  if (
    topicSplitArray[2] === "do1" ||
    topicSplitArray[2] === "do2" ||
    topicSplitArray[2] === "do3" ||
    topicSplitArray[2] === "do4"
  ) {
    updatedValue = recievedValue === "true";
  } else if (topicSplitArray[2] === "di1" || topicSplitArray[2] === "di2") {
    updatedValue = recievedValue === "true";
  } else {
    updatedValue = recievedValue;
  }

  try {
    Devices.findOneAndUpdate(
      { device_name: topicSplitArray[1] },
      createUpdatadField(topicSplitArray[2], updatedValue),
      { upsert: true },
      function (err, doc) {
        if (err) console.log("Error" + err);
      }
    );
  } catch (_e) {
    console.log("Update failed");
  }

  console.log("db updated");
  const app = require("../app");
  var wss = app.wss;
  var updatedElementId = topicSplitArray[1] + "_" + topicSplitArray[2] + "_";
  wss.sendWsMessage(updatedElementId, topicSplitArray[2], updatedValue);
});

client.on("connect", function () {
  console.log("Mqtt subscriber successfully connected!");
});
client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1);
});

var options = {
  retain: true,
  qos: 0,
};
client.subscribe("io/#", {
  qos: 0,
});

function createUpdatadField(field, newData) {
  switch (field) {
    case "do1":
      return { "device_values.do1": newData };
    case "do2":
      return { "device_values.do2": newData };
    case "do3":
      return { "device_values.do3": newData };
    case "do4":
      return { "device_values.do4": newData };
    case "di1":
      return { "device_values.di1": newData };
    case "di2":
      return { "device_values.di2": newData };
    case "ai1":
      return { "device_values.ai1": newData };
    case "ai2":
      return { "device_values.ai2": newData };
  }
}
Exports = mqtt;
