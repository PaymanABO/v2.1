var wssGlobal = {
  globalWs: null,
  createWebSocket() {
    var WebSocketServer = require("ws").Server;
    wss = new WebSocketServer({ port: 40510 });
    
    wss.on("connection", function (ws) {
      wssGlobal.globalWs = ws;
      ws.on("message", function (message) {
        console.log("received: %s", message);
        try {
          const app = require("../app");
          var publisher = app.mqttGlobalPublisher;
          if (message != undefined || message != null) {
            var msgString = message + "";
            const topicArray = msgString.split("_");
            var _topic = "io/" + topicArray[0] + "/" + topicArray[1];
            var recievedValue = topicArray[2] + "";
            console.log("topic: %s msg: %s", _topic, recievedValue);
            publisher.publishMqttMsg(_topic, recievedValue);
          }
        } catch (_e) {
          console.log("error: %s", _e);
        }
      });
    });
  },
  sendWsMessage(id, ioType, value) {
    if (wssGlobal.globalWs != null) {
      console.log("messageSent");
      wssGlobal.globalWs.send(
        JSON.stringify([{ id: id, ioType: ioType, value: value }])
      );
    }
  },
};
module.exports = wssGlobal;
