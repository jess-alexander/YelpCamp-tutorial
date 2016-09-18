var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose); //make it easy, it takes the wheel and adds in mecessary methods to user

module.exports = mongoose.model("User", UserSchema);

