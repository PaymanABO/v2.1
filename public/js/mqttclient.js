var mqtt;
    var reconnectTimeout = 2000;

    function MQTTconnect() {
	if (typeof path == "undefined") {
		path = '/mqtt';
	}
	mqtt = new Paho.MQTT.Client(
			host,
			port,
			path,
			"web_" + parseInt(Math.random() * 100, 10)
	);
        var options = {
            timeout: 3,
            useSSL: useTLS,
            cleanSession: cleansession,
            onSuccess: onConnect,
            onFailure: function (message) {
                $('#status').val("Connection failed: " + message.errorMessage + "Retrying");
                setTimeout(MQTTconnect, reconnectTimeout);
            }
        };

        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;

        if (username != null) {
            options.userName = username;
            options.password = password;
        }
        console.log("Host="+ host + ", port=" + port + ", path=" + path + " TLS = " + useTLS + " username=" + username + " password=" + password);
        mqtt.connect(options);
    }

    function onConnect() {
        console.log('connected to mqtt broker');
        $('#status').val('Connected to ' + host + ':' + port + path);
        // Connection succeeded; subscribe to our topic
        mqtt.subscribe(topic, {qos: 0});
        $('#topic').val(topic);
    }

    function onConnectionLost(response) {
        setTimeout(MQTTconnect, reconnectTimeout);
        $('#status').val("connection lost: " + responseObject.errorMessage + ". Reconnecting");

    };

    function onMessageArrived(message) {

        var topic = message.destinationName;
        var payload = message.payloadString;
        console.log('topic');
        console.log(topic);
        
        console.log('mess');
        console.log(payload);
        
        var deviceName = topic.split("/")[1];
        var deviceIo = topic.split("/")[2];
        var elementId = "#" + deviceName +"_"+ deviceIo;

        if(deviceIo==='di1' || deviceIo==='di2' || deviceIo==='do1' || deviceIo==='do2'){
            checkSwitchStatus(elementId,payload);
        }
        if(deviceIo==='ai1' || deviceIo==='ai2'){
            changeAiValue(elementId,payload);
        }
        
        
    };




    function checkSwitchStatus(elementId, value){
        if(value === 'true' || value === 'True')
            $(elementId).attr('checked', true);
        if(value === 'false' || value === 'False')
            $(elementId).attr('checked', false);
    }

    function changeAiValue(elementId, value){
        $(elementId).html(value);
    }