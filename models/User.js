var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var User = new Schema({
    userId : String,
	userNm : String,
	email : String,
	password : String,
	etc : String,
	createdAt : Date,
	modifiedAt : Date,
	thumbnail : String
});

module.exports = mongoose.model("User", User);

