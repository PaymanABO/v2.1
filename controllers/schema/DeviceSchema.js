var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
        device_name: String,
        device_type: String,
        device_group: String,
        device_values: Object
});
module.exports = mongoose.model('Devices', DeviceSchema);    