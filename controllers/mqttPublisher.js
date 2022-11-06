var mqttPublisher = {
  globalMqttPublisherClient: null,
  connect() {
    var nmqtt = require("mqtt");
    try {
      mqttPublisher.globalMqttPublisherClient = nmqtt.connect(
        "mqtt://services.irn2.chabokan.net:14211",
        { clientId: "mqttjs010101",clean: true,
        connectTimeout: 4000,
        username: 'james',
        password: 'IrpK4hCeNWA9eaSx',
        reconnectPeriod: 1000, });
      console.log("Mqtt publisher Successfully connected!");
    } catch (_e) {
      console.log("Mqtt publisher Failed to connect");
    }
  },
  publishMqttMsg(_topic, recievedValue) {
    mqttPublisher.globalMqttPublisherClient.publish(_topic, recievedValue);
  },
};
module.exports = mqttPublisher;
