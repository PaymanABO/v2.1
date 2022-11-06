var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupDetail = new Schema({
    groupName: String,
});
module.exports = mongoose.model('DeviceGroup', GroupDetail);     