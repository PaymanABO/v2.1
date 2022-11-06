var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://root:jTnckHsD7kMfBVsp@services.irn2.chabokan.net:11448',
//mongoose.connect('mongodb://localhost:27017',
  { useNewUrlParser: true, useUnifiedTopology: true });
  
var UserDetail = new Schema({
   username: String,
   password: String
});
UserDetail.plugin(passportLocalMongoose);
module.exports = mongoose.model('userInfo', UserDetail, 'userInfo');     